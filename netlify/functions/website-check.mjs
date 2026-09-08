/**
 * Proxy für den ProspectHub Website-Check.
 * Der API-Token bleibt serverseitig (Netlify-Umgebungsvariable PROSPECTHUB_API_TOKEN),
 * der Browser spricht nur mit /api/website-check auf der eigenen Domain.
 *
 *   POST /api/website-check                      Check anlegen (Body: url, email, name?, company?, consent, campaign?)
 *   GET  /api/website-check?id=<uuid>            Status und Ergebnis
 *   POST /api/website-check?id=<uuid>&action=send-report   Report-Mail auslösen
 */
const API = process.env.PROSPECTHUB_API_URL ?? "https://app.prospecthub.ch/api/v1";
const TOKEN = process.env.PROSPECTHUB_API_TOKEN;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const CONSENT_TEXT =
  "Ich bin damit einverstanden, dass die angegebene Website technisch analysiert wird (Ladezeit, Sicherheit, " +
  "Impressum und Datenschutzerklärung, KI-Lesbarkeit) und dass Bürgler Business Solutions mich per E-Mail zu den " +
  "Ergebnissen kontaktieren darf. Die Analyse führt die von Bürgler Business Solutions betriebene Plattform " +
  "ProspectHub (Schweiz) durch; für die Ladezeitmessung wird die Website-Adresse an die Google PageSpeed API " +
  "übermittelt. Die Daten werden " +
  "in der Schweiz beziehungsweise der EU gespeichert und auf Anfrage an nb@b-business-solutions.ch gelöscht.";

// Die Headerregeln aus netlify.toml gelten nur für statische Dateien, nicht für
// Function-Antworten. Darum hier explizit setzen.
const BASE_HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

const UPSTREAM_TIMEOUT_MS = 15_000;

const json = (body, status, extra = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...BASE_HEADERS, ...extra },
  });

const error = (code, message, status) => json({ error: { code, message } }, status);

const clientIpOf = (request) =>
  request.headers.get("x-nf-client-connection-ip") ??
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
  "";

/**
 * Fremde Seiten sollen den Check nicht aus dem Browser eines Besuchers auslösen
 * können. Same-Origin-Requests des Formulars senden entweder einen passenden
 * Origin oder Sec-Fetch-Site: same-origin.
 */
const isSameOrigin = (request, selfOrigin) => {
  const site = request.headers.get("sec-fetch-site");
  if (site) return site === "same-origin" || site === "none";
  const origin = request.headers.get("origin");
  if (!origin) return true; // ältere Browser ohne beide Header
  return origin === selfOrigin;
};

async function forward(target, init, clientIp) {
  let res;
  let text;
  try {
    res = await fetch(target, {
      ...init,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
        ...(clientIp ? { "X-Forwarded-For-Client": clientIp } : {}),
      },
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
    text = await res.text();
  } catch (err) {
    const timedOut = err?.name === "TimeoutError" || err?.name === "AbortError";
    return error(
      "UPSTREAM_ERROR",
      timedOut
        ? "Der Analysedienst antwortet gerade nicht. Bitte versuche es in einer Minute nochmals."
        : "Der Analysedienst ist momentan nicht erreichbar.",
      timedOut ? 504 : 502
    );
  }
  const retry = res.headers.get("retry-after");
  return new Response(text, {
    status: res.status,
    headers: {
      ...BASE_HEADERS,
      ...(retry ? { "Retry-After": retry } : {}),
    },
  });
}

export default async (request) => {
  if (!TOKEN) return error("CONFIG", "Der Website-Check ist noch nicht konfiguriert.", 500);

  const url = new URL(request.url);
  const id = url.searchParams.get("id") ?? "";
  const action = url.searchParams.get("action") ?? "";
  const clientIp = clientIpOf(request);

  if (request.method === "GET") {
    if (!UUID.test(id)) return error("VALIDATION_ERROR", "Ungültige Check-ID.", 422);
    return forward(`${API}/checks/${id}`, { method: "GET" }, clientIp);
  }

  if (request.method === "POST" && !isSameOrigin(request, url.origin)) {
    return error("FORBIDDEN", "Anfrage von fremder Herkunft.", 403);
  }

  if (request.method === "POST" && action === "send-report") {
    if (!UUID.test(id)) return error("VALIDATION_ERROR", "Ungültige Check-ID.", 422);
    return forward(`${API}/checks/${id}/send-report`, { method: "POST" }, clientIp);
  }

  if (request.method === "POST") {
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return error("VALIDATION_ERROR", "Ungültiger Content-Type.", 415);
    }
    const form = await request.json().catch(() => null);
    if (!form || typeof form !== "object" || Array.isArray(form)) {
      return error("VALIDATION_ERROR", "Ungültige Anfrage.", 422);
    }
    // Honeypot: echte Besucher lassen das versteckte Feld leer
    if (form.website) return json({ id: null, status: "ignored" }, 202);
    if (form.consent !== true) {
      return error("VALIDATION_ERROR", "Bitte stimme der Analyse zu.", 422);
    }
    // Alles, was weitergereicht wird, muss ein String sein: String(x) läuft sonst
    // bei präparierten Objekten (etwa { toString: null }) in einen TypeError.
    const isText = (value) => typeof value === "string";
    if (!isText(form.url) || !isText(form.email)) {
      return error("VALIDATION_ERROR", "Bitte Website-Adresse und E-Mail angeben.", 422);
    }
    if (
      (form.name !== undefined && form.name !== null && !isText(form.name)) ||
      (form.company !== undefined && form.company !== null && !isText(form.company)) ||
      (form.campaign !== undefined && form.campaign !== null && !isText(form.campaign))
    ) {
      return error("VALIDATION_ERROR", "Ungültige Eingaben.", 422);
    }
    // Das Formular erlaubt die Eingabe ohne Schema ("www.beispiel.ch"); die
    // Normalisierung übernimmt der Analysedienst. Hier werden nur fremde
    // Schemata wie file: oder data: abgewiesen.
    const scanUrl = form.url.trim().slice(0, 2000);
    if (/^[a-z][a-z0-9+.-]*:/i.test(scanUrl) && !/^https?:\/\//i.test(scanUrl)) {
      return error("VALIDATION_ERROR", "Wir prüfen nur http- und https-Adressen.", 422);
    }
    const body = {
      url: scanUrl,
      email: form.email.trim().slice(0, 254),
      ...(form.name ? { name: form.name.slice(0, 120) } : {}),
      ...(form.company ? { company: form.company.slice(0, 200) } : {}),
      consent: true,
      consentText: CONSENT_TEXT,
      locale: "de-CH",
      utm: {
        source: "bbs-website",
        medium: "website-check",
        campaign: (form.campaign ?? "website-check").slice(0, 100),
      },
    };
    return forward(`${API}/checks`, { method: "POST", body: JSON.stringify(body) }, clientIp);
  }

  return error("NOT_FOUND", "Nicht gefunden.", 404);
};

export const config = { path: "/api/website-check" };
