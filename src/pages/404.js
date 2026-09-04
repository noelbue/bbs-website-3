import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import { Check, X, ArrowRight } from "lucide-react";
import Layout from "../components/layout/Layout";
import Seo from "../components/Seo";
import Button from "../components/ui/Button";
import * as styles from "./404.module.css";

const SUGGESTIONS = [
  { to: "/", label: "Startseite" },
  { to: "/services", label: "Services" },
  { to: "/ueber-mich", label: "Über mich" },
  { to: "/kontakt", label: "Kontakt" },
];

/** 404 als Preflight-Report: alles läuft, nur diese eine Seite fehlt im Dokument. */
const NotFoundPage = () => {
  const [path, setPath] = useState("/diese-seite");

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.pathname) {
      setPath(window.location.pathname);
    }
  }, []);

  const checks = [
    { ok: true, label: "Server erreichbar", detail: "200 OK" },
    { ok: true, label: "Navigation geladen", detail: "4 Seiten" },
    { ok: true, label: "Publishing-Workflows", detail: "laufen von selbst" },
    { ok: false, label: "Seite im Dokument", detail: `${path} · 404` },
  ];
  const passed = checks.filter((c) => c.ok).length;

  return (
    <Layout>
      <section className={styles.notFound}>
        <div className={styles.background} aria-hidden="true" />
        <div className={`container ${styles.inner}`}>
          <div className={styles.text}>
            <span className={styles.eyebrow}>Preflight · Fehler 404</span>
            <h1 className={styles.title}>
              Diese Seite ist im <em>Preflight</em> durchgefallen.
            </h1>
            <p className={styles.description}>
              Der Link zeigt auf eine Seite, die es hier nicht gibt. Kein
              Drama: Der Rest des Workflows läuft weiter, du musst nur einmal
              umblättern.
            </p>
            <div className={styles.actions}>
              <Button href="/" variant="primary" icon>
                Zur Startseite
              </Button>
              <Button href="/kontakt" variant="secondary">
                Seite melden
              </Button>
            </div>
          </div>

          <aside className={styles.report} aria-label="Preflight-Report">
            <header className={styles.reportHead}>
              <span className={styles.reportTitle}>Preflight-Report</span>
              <span className={styles.reportMeta}>
                {checks.length} Prüfungen · {checks.length - passed} Fehler
              </span>
            </header>
            <div className={styles.meter} aria-hidden="true">
              {checks.map((check, i) => (
                <i key={i} className={check.ok ? styles.meterOk : styles.meterFail} />
              ))}
            </div>
            <ul className={styles.checks}>
              {checks.map((check) => (
                <li
                  key={check.label}
                  className={`${styles.check} ${check.ok ? "" : styles.checkFail}`}
                >
                  <span className={styles.status}>
                    {check.ok ? (
                      <Check size={14} aria-hidden="true" />
                    ) : (
                      <X size={14} aria-hidden="true" />
                    )}
                  </span>
                  <span className={styles.checkLabel}>{check.label}</span>
                  <span className={styles.checkDetail}>{check.detail}</span>
                </li>
              ))}
            </ul>
            <div className={styles.fix}>
              <span className={styles.fixLabel}>Korrektur-Vorschlag</span>
              <div className={styles.suggestions}>
                {SUGGESTIONS.map((item) => (
                  <Link key={item.to} to={item.to} className={styles.suggestion}>
                    {item.label}
                    <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
};

export default NotFoundPage;

export const Head = () => (
  <Seo
    title="404 – Seite nicht gefunden"
    description="Die gesuchte Seite konnte nicht gefunden werden."
    pathname="/404"
    noindex
  />
);
