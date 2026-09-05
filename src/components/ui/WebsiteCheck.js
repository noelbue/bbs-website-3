import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, X, Mail, Loader2 } from "lucide-react";
import Button from "./Button";
import Chip from "./Chip";
import site from "../../data/site";
import * as styles from "./WebsiteCheck.module.css";

const ENDPOINT =
  process.env.GATSBY_WEBSITE_CHECK_ENDPOINT || "/api/website-check";

const STEPS = {
  queued: "Wir laden deine Seite.",
  analyzing: "Google misst die Ladezeit, wir prüfen Sicherheit und Rechtliches.",
  report: "Wir prüfen die KI-Bereitschaft und schreiben den Report.",
  done: "Fertig.",
  failed: "Die Analyse ist fehlgeschlagen.",
};

const EFFORT = { klein: "Kleiner Aufwand", mittel: "Mittlerer Aufwand", gross: "Grösserer Aufwand" };

const CONTACT = `Schreib mir direkt an ${site.email}, ich schaue deine Website manuell an.`;

const UNAVAILABLE = `Der Check ist gerade nicht verfügbar. Bitte versuch es in ein paar Minuten nochmals. ${CONTACT}`;

const minutesFrom = (retryAfter, fallback = 60) => {
  const seconds = Number(retryAfter);
  return Math.max(1, Math.round((Number.isFinite(seconds) && seconds > 0 ? seconds : fallback) / 60));
};

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

/**
 * Übersetzt eine Fehlerantwort des Proxys in eine verständliche Meldung.
 * Liefert optional das betroffene Feld, damit die Meldung dort erscheint.
 */
const describeError = async (res) => {
  const data = await res.json().catch(() => null);
  const code = data?.error?.code || "";
  const details = data?.error?.details || [];

  if (res.status === 429) {
    const minutes = minutesFrom(res.headers.get("Retry-After"));
    return {
      message: `Das Limit von drei Checks pro Stunde ist erreicht. Bitte versuch es in etwa ${plural(minutes, "Minute", "Minuten")} nochmals.`,
    };
  }
  if (code === "URL_BLOCKED") {
    return { field: "url", message: `Diese Adresse können wir nicht automatisch analysieren. ${CONTACT}` };
  }
  if (code === "URL_UNRESOLVABLE") {
    return { field: "url", message: "Diese Domain ist nicht erreichbar. Prüfe die Schreibweise der Adresse." };
  }
  if (code === "LEAD_BLOCKED") {
    return { message: `Für diese Adresse führen wir keinen automatischen Check durch. ${CONTACT}` };
  }
  if (code === "VALIDATION_ERROR") {
    const urlIssue = details.find((d) => d.field === "url");
    const emailIssue = details.find((d) => d.field === "email");
    if (urlIssue || /url|hostname|adresse|port|http/i.test(data?.error?.message || "")) {
      return {
        field: "url",
        message: "Bitte gib eine gültige Website-Adresse ein, zum Beispiel www.deine-website.ch.",
      };
    }
    if (emailIssue) return { field: "email", message: "Bitte gib eine gültige E-Mail-Adresse ein." };
    const other = details[0];
    return { message: other ? `${other.message}.` : "Die Eingaben sind unvollständig oder ungültig. Bitte prüfe das Formular." };
  }
  if (res.status === 404) {
    return { message: "Dieser Check wurde nicht gefunden. Bitte starte ihn nochmals." };
  }
  // 401/403/500/503, Proxy ohne Token (CONFIG), API abgeschaltet
  return { message: UNAVAILABLE };
};

const NETWORK_ERROR = {
  message: "Keine Verbindung. Prüfe deine Internetverbindung und versuch es nochmals.",
};

/** Formatfehler abfangen, bevor die Anfrage rausgeht. */
const validate = (form) => {
  const errors = {};
  const url = form.url.trim();
  const host = url.replace(/^https?:\/\//i, "").split(/[/?#]/)[0];
  if (!url) errors.url = "Bitte gib die Adresse deiner Website ein.";
  else if (/^https?:\/\//i.test(url) === false && /:\/\//.test(url)) {
    errors.url = "Wir prüfen nur http- und https-Adressen.";
  } else if (!/^[a-z0-9\u00e0-\u00ff-]+(\.[a-z0-9\u00e0-\u00ff-]+)+$/i.test(host) || /^\d+(\.\d+){3}$/.test(host)) {
    errors.url = "Bitte gib eine gültige Website-Adresse ein, zum Beispiel www.deine-website.ch.";
  }
  const email = form.email.trim();
  if (!email) errors.email = "Bitte gib eine E-Mail-Adresse für den Report ein.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = "Bitte gib eine gültige E-Mail-Adresse ein, zum Beispiel du@firma.ch.";
  }
  if (!form.consent) errors.consent = "Bitte stimme der Analyse zu, damit wir starten können.";
  return errors;
};

const scoreTone = (value) => (value >= 70 ? styles.good : value >= 40 ? styles.mid : styles.low);

/** Formular, Fortschritt und Ergebnis-Teaser für den ProspectHub Website-Check. */
const WebsiteCheck = ({ campaign = "website-check" }) => {
  const [phase, setPhase] = useState("idle"); // idle | submitting | running | done | failed
  const [form, setForm] = useState({ url: "", email: "", name: "", company: "", consent: false, website: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [check, setCheck] = useState(null);
  const [progress, setProgress] = useState({ step: "queued", percent: 5 });
  const [mailState, setMailState] = useState("idle"); // idle | sending | sent | already | error
  const timer = useRef(0);
  const startedAt = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const update = (field) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const poll = async (id) => {
    try {
      const res = await fetch(`${ENDPOINT}?id=${encodeURIComponent(id)}`, { cache: "no-store" });
      if (!res.ok) {
        const info = await describeError(res);
        throw new Error(
          res.status === 404
            ? info.message
            : "Die Verbindung zum Check ist abgebrochen. Starte ihn einfach nochmals: derselbe Check wird innerhalb von 24 Stunden wiederverwendet."
        );
      }
      const data = await res.json();
      if (data.status === "done") {
        setCheck(data);
        setPhase("done");
        return;
      }
      if (data.status === "failed") {
        setCheck(data);
        setErrorMsg(data.error || STEPS.failed);
        setPhase("failed");
        return;
      }
      if (data.progress) setProgress(data.progress);
      const elapsed = Date.now() - startedAt.current;
      if (elapsed > 4 * 60_000) {
        setErrorMsg("Die Analyse dauert länger als erwartet. Du erhältst den Report per E-Mail, sobald er fertig ist.");
        setPhase("failed");
        return;
      }
      timer.current = window.setTimeout(() => poll(id), elapsed < 30_000 ? 3000 : 5000);
    } catch (err) {
      setErrorMsg(err instanceof TypeError ? NETWORK_ERROR.message : err.message);
      setPhase("failed");
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    setErrorMsg("");
    const errors = validate(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      const first = ["url", "email", "consent"].find((key) => errors[key]);
      event.currentTarget.querySelector(`[name="${first}"]`)?.focus();
      return;
    }
    setFieldErrors({});
    setPhase("submitting");
    try {
      let res;
      try {
        res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, campaign }),
        });
      } catch {
        throw Object.assign(new Error(NETWORK_ERROR.message), { info: NETWORK_ERROR });
      }
      if (!res.ok) {
        const info = await describeError(res);
        throw Object.assign(new Error(info.message), { info });
      }
      const data = await res.json();
      if (!data.id) throw new Error(UNAVAILABLE);
      setCheck(data);
      setMailState("idle");
      if (data.status === "done") {
        setPhase("done");
        return;
      }
      if (data.status === "failed") {
        setErrorMsg(data.error || STEPS.failed);
        setPhase("failed");
        return;
      }
      startedAt.current = Date.now();
      setProgress(data.progress || { step: "queued", percent: 5 });
      setPhase("running");
      timer.current = window.setTimeout(() => poll(data.id), 3000);
    } catch (err) {
      if (err.info?.field) {
        setFieldErrors({ [err.info.field]: err.info.message });
        window.setTimeout(() => document.querySelector(`[name="${err.info.field}"]`)?.focus(), 0);
      } else {
        setErrorMsg(err.message);
      }
      setPhase("idle");
    }
  };

  const sendReport = async () => {
    if (!check?.id) return;
    setMailState("sending");
    try {
      const res = await fetch(`${ENDPOINT}?id=${encodeURIComponent(check.id)}&action=send-report`, {
        method: "POST",
      });
      if (!res.ok) throw new Error((await describeError(res)).message);
      const data = await res.json();
      setMailState(data.alreadySent ? "already" : "sent");
    } catch (err) {
      setMailState("error");
    }
  };

  const reset = () => {
    window.clearTimeout(timer.current);
    setCheck(null);
    setErrorMsg("");
    setPhase("idle");
  };

  if (phase === "running") {
    return (
      <div className={styles.panel} aria-live="polite">
        <div className={styles.runningHead}>
          <Loader2 className={styles.spinner} size={20} aria-hidden="true" />
          <span className={styles.runningTitle}>Analyse läuft für {check?.result?.url || form.url}</span>
        </div>
        <div
          className={styles.bar}
          role="progressbar"
          aria-label="Fortschritt der Analyse"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={progress.percent}
        >
          <span style={{ width: `${progress.percent}%` }} />
        </div>
        <p className={styles.step}>{STEPS[progress.step] || STEPS.analyzing}</p>
        <p className={styles.hint}>Das dauert meist ein bis zwei Minuten. Du kannst das Fenster offen lassen.</p>
      </div>
    );
  }

  if (phase === "done" && check?.result) {
    const { scores, recommendations = [], cms } = check.result;
    const security = scores.security || {};
    const securityOk = ["https", "hsts", "csp", "xframe"].filter((k) => security[k]).length;
    const legal = scores.legal || {};
    const lcp = scores.performance?.mobileLcpMs;
    const reportActive = check.report?.status === "active" && check.report.url;
    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`Website-Check: ${check.result.url}`)}`;

    return (
      <div className={styles.panel}>
        <div className={styles.resultHead}>
          <div>
            <span className={styles.eyebrow}>Ergebnis für</span>
            <h3 className={styles.resultUrl}>{check.result.url}</h3>
          </div>
          <div className={`${styles.overall} ${scoreTone(scores.overall)}`}>
            <span className={styles.overallValue}>{scores.overall}</span>
            <span className={styles.overallLabel}>Gesamt / 100</span>
          </div>
        </div>

        <div className={styles.tiles}>
          <div className={styles.tile}>
            <span className={styles.tileLabel}>Ladezeit mobil</span>
            <span className={`${styles.tileValue} ${scoreTone(scores.performance?.mobile ?? 0)}`}>
              {lcp ? `${(lcp / 1000).toFixed(1)} s` : "–"}
            </span>
            <span className={styles.tileNote}>bis der Hauptinhalt sichtbar ist</span>
          </div>
          <div className={styles.tile}>
            <span className={styles.tileLabel}>KI-Bereitschaft</span>
            <span className={`${styles.tileValue} ${scoreTone(scores.aiReadiness?.score ?? 0)}`}>
              Note {scores.aiReadiness?.grade}
            </span>
            <span className={styles.tileNote}>{scores.aiReadiness?.score} von 100 Punkten</span>
          </div>
          <div className={styles.tile}>
            <span className={styles.tileLabel}>Sicherheit</span>
            <span className={`${styles.tileValue} ${scoreTone((securityOk / 4) * 100)}`}>{securityOk} / 4</span>
            <span className={styles.tileNote}>HTTPS, HSTS, CSP, Clickjacking-Schutz</span>
          </div>
          <div className={styles.tile}>
            <span className={styles.tileLabel}>Rechtliches</span>
            <span className={styles.tileChecks}>
              <span className={legal.impressum ? styles.ok : styles.fail}>
                {legal.impressum ? <Check size={14} /> : <X size={14} />} Impressum
              </span>
              <span className={legal.datenschutz ? styles.ok : styles.fail}>
                {legal.datenschutz ? <Check size={14} /> : <X size={14} />} Datenschutz
              </span>
            </span>
            {cms?.name && (
              <span className={styles.tileNote}>
                {cms.name}
                {cms.outdated ? ", veraltete Version" : ""}
              </span>
            )}
          </div>
        </div>

        {recommendations.length > 0 && (
          <div className={styles.recs}>
            <span className={styles.eyebrow}>Die drei wichtigsten Hebel</span>
            <ol className={styles.recList}>
              {recommendations.slice(0, 3).map((rec) => (
                <li key={rec.title} className={styles.rec}>
                  <div>
                    <strong>{rec.title}</strong>
                    <p>{rec.detail}</p>
                  </div>
                  {rec.effort && <Chip tone="soft">{EFFORT[rec.effort] || rec.effort}</Chip>}
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className={styles.actions}>
          {reportActive ? (
            <a href={check.report.url} target="_blank" rel="noopener noreferrer" className={styles.primaryLink}>
              Vollständige Auswertung öffnen <ArrowRight size={16} aria-hidden="true" />
            </a>
          ) : (
            <span className={styles.hint}>Der vollständige Report wird gerade erstellt.</span>
          )}
          <button type="button" className={styles.secondaryBtn} onClick={sendReport} disabled={mailState === "sending" || mailState === "sent"}>
            <Mail size={16} aria-hidden="true" />
            {mailState === "sent" && "Report ist unterwegs"}
            {mailState === "already" && "Report wurde bereits gesendet"}
            {mailState === "sending" && "Wird gesendet …"}
            {mailState === "error" && "Senden fehlgeschlagen, nochmals versuchen"}
            {mailState === "idle" && "Report per E-Mail erhalten"}
          </button>
        </div>

        <div className={styles.cta}>
          <div>
            <strong>Was bedeuten die Zahlen für dich?</strong>
            <p>Ich schaue mir den Report an und sage dir ehrlich, was sich lohnt und was nicht. Kostenlos, 30 Minuten.</p>
          </div>
          <Button href={mailto} variant="primary" icon>
            Ergebnisse besprechen
          </Button>
        </div>
        <button type="button" className={styles.linkBtn} onClick={reset}>
          Andere Website prüfen
        </button>
      </div>
    );
  }

  return (
    <form className={styles.panel} onSubmit={submit} noValidate>
      {phase === "failed" && (
        <div className={styles.error} role="alert">
          <strong>Die Analyse konnte nicht abgeschlossen werden.</strong> {errorMsg}
        </div>
      )}
      {phase === "idle" && errorMsg && (
        <div className={styles.error} role="alert">
          {errorMsg}
        </div>
      )}
      <div className={styles.grid}>
        <label className={`${styles.field} ${styles.wide}`}>
          <span>Website-Adresse</span>
          <input
            type="text"
            name="url"
            inputMode="url"
            placeholder="www.deine-website.ch"
            value={form.url}
            onChange={update("url")}
            required
            autoComplete="url"
            autoCapitalize="none"
            spellCheck="false"
            aria-invalid={fieldErrors.url ? "true" : undefined}
            aria-describedby={fieldErrors.url ? "wc-url-error" : undefined}
          />
          {fieldErrors.url && (
            <span className={styles.fieldError} id="wc-url-error" role="alert">
              {fieldErrors.url}
            </span>
          )}
        </label>
        <label className={styles.field}>
          <span>E-Mail für den Report</span>
          <input
            type="email"
            name="email"
            placeholder="du@firma.ch"
            value={form.email}
            onChange={update("email")}
            required
            autoComplete="email"
            aria-invalid={fieldErrors.email ? "true" : undefined}
            aria-describedby={fieldErrors.email ? "wc-email-error" : undefined}
          />
          {fieldErrors.email && (
            <span className={styles.fieldError} id="wc-email-error" role="alert">
              {fieldErrors.email}
            </span>
          )}
        </label>
        <label className={styles.field}>
          <span>Name <em>optional</em></span>
          <input type="text" value={form.name} onChange={update("name")} autoComplete="name" />
        </label>
        <label className={`${styles.field} ${styles.honeypot}`} aria-hidden="true">
          <span>Website</span>
          <input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={update("website")} />
        </label>
      </div>
      <label className={`${styles.consent} ${fieldErrors.consent ? styles.consentError : ""}`}>
        <input
          type="checkbox"
          name="consent"
          checked={form.consent}
          onChange={update("consent")}
          required
          aria-invalid={fieldErrors.consent ? "true" : undefined}
          aria-describedby={fieldErrors.consent ? "wc-consent-error" : undefined}
        />
        <span>
          Ich bin einverstanden, dass die angegebene Website technisch analysiert wird und Bürgler Business Solutions
          mich per E-Mail zu den Ergebnissen kontaktieren darf. Die Analyse führt ProspectHub (Schweiz) in unserem
          Auftrag durch, für die Ladezeitmessung wird die Adresse an die Google PageSpeed API übermittelt. Details in
          der <a href="/datenschutz#website-check">Datenschutzerklärung</a>.
          {fieldErrors.consent && (
            <span className={styles.fieldError} id="wc-consent-error" role="alert">
              {fieldErrors.consent}
            </span>
          )}
        </span>
      </label>
      <div className={styles.submitRow}>
        <Button type="submit" variant="primary" icon className={styles.submit}>
          {phase === "submitting" ? "Wird gestartet …" : "Website jetzt prüfen"}
        </Button>
        <span className={styles.hint}>Kostenlos, dauert ein bis zwei Minuten, Report 90 Tage abrufbar.</span>
      </div>
    </form>
  );
};

export default WebsiteCheck;
