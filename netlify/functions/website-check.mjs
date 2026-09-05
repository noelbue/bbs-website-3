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
  "Ergebnissen kontaktieren darf. Die Analyse führt ProspectHub (Schweiz) im Auftrag von Bürgler Business Solutions " +
  "durch; für die Ladezeitmessung wird die Website-Adresse an die Google PageSpeed API übermittelt. Die Daten werden " +
  "in der Schweiz beziehungsweise der EU gespeichert und auf Anfrage an nb@b-business-solutions.ch gelöscht.";

const json = (body, status, extra = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...extra },
  });

const error = (code, message, status) => json({ error: { code, message } }, status);

const clientIpOf = (request) =>
  request.headers.get("x-nf-client-connection-ip") ??
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
  "";

async function forward(target, init, clientIp) {
  const res = await fetch(target, {
    ...init,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      ...(clientIp ? { "X-Forwarded-For-Client": clientIp } : {}),
    },
  });
  const text = await res.text();
  const retry = res.headers.get("retry-after");
  return new Response(text, {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
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

  if (request.method === "POST" && action === "send-report") {
    if (!UUID.test(id)) return error("VALIDATION_ERROR", "Ungültige Check-ID.", 422);
    return forward(`${API}/checks/${id}/send-report`, { method: "POST" }, clientIp);
  }

  if (request.method === "POST") {
    const form = await request.json().catch(() => null);
    if (!form) return error("VALIDATION_ERROR", "Ungültige Anfrage.", 422);
    // Honeypot: echte Besucher lassen das versteckte Feld leer
    if (form.website) return json({ id: null, status: "ignored" }, 202);
    if (form.consent !== true) {
      return error("VALIDATION_ERROR", "Bitte stimme der Analyse zu.", 422);
    }
    const body = {
      url: String(form.url ?? "").trim(),
      email: String(form.email ?? "").trim(),
      ...(form.name ? { name: String(form.name).slice(0, 120) } : {}),
      ...(form.company ? { company: String(form.company).slice(0, 200) } : {}),
      consent: true,
      consentText: CONSENT_TEXT,
      locale: "de-CH",
      utm: {
        source: "bbs-website",
        medium: "website-check",
        campaign: String(form.campaign ?? "website-check").slice(0, 100),
      },
    };
    return forward(`${API}/checks`, { method: "POST", body: JSON.stringify(body) }, clientIp);
  }

  return error("NOT_FOUND", "Nicht gefunden.", 404);
};

export const config = { path: "/api/website-check" };
