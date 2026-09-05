import React from "react";
import { Gauge, ShieldCheck, Scale, Sparkles } from "lucide-react";
import Layout from "../components/layout/Layout";
import Seo from "../components/Seo";
import PageHero from "../components/layout/PageHero";
import SectionTitle from "../components/ui/SectionTitle";
import FactTile from "../components/ui/FactTile";
import WebsiteCheck from "../components/ui/WebsiteCheck";
import site from "../data/site";
import * as styles from "./website-check.module.css";

const CHECKS = [
  { icon: <Gauge size={24} aria-hidden="true" />, title: "Ladezeit", text: "Wie schnell erscheint der Hauptinhalt auf dem Handy? Gemessen mit Google PageSpeed." },
  { icon: <ShieldCheck size={24} aria-hidden="true" />, title: "Sicherheit", text: "HTTPS, HSTS, Content-Security-Policy und Schutz vor Clickjacking." },
  { icon: <Scale size={24} aria-hidden="true" />, title: "Rechtliches", text: "Sind Impressum und Datenschutzerklärung vorhanden und verlinkt?" },
  { icon: <Sparkles size={24} aria-hidden="true" />, title: "KI-Bereitschaft", text: "Können ChatGPT, Perplexity und Co. deine Inhalte lesen und als Quelle nennen?" },
];

const FAQ = [
  {
    q: "Was passiert mit meinen Daten?",
    a: "Die Analyse führt ProspectHub (Schweiz) in meinem Auftrag durch. Gespeichert werden Website-Adresse, E-Mail, optional Name und Firma sowie das Ergebnis. Auf Wunsch lösche ich alles, eine Mail genügt.",
  },
  {
    q: "Werde ich danach angerufen oder mit Werbung zugedeckt?",
    a: "Nein. Du bekommst den Report, und ich melde mich einmal mit einer ehrlichen Einschätzung. Wenn du nichts weiter willst, bleibt es dabei.",
  },
  {
    q: "Warum fehlt eine Zahl oder der Check schlägt fehl?",
    a: "Manche Seiten blockieren automatische Zugriffe oder laden sehr langsam. Dann liefert der Check nur einen Teil. Schreib mir, ich schaue manuell nach.",
  },
];

const PAGE_URL = `${site.siteUrl}/website-check`;

const checkSchema = [
  {
    "@type": "Service",
    "@id": `${PAGE_URL}#service`,
    name: "Website-Check",
    serviceType: "Website-Analyse",
    description:
      "Kostenlose technische Analyse einer Website: Ladezeit (Google PageSpeed), Sicherheits-Header, Impressum und Datenschutzerklärung, KI-Bereitschaft. Ergebnis in zwei Minuten, Report 90 Tage abrufbar.",
    provider: { "@id": `${site.siteUrl}/#organization` },
    areaServed: ["CH", "DE", "AT", "LI"],
    url: PAGE_URL,
    offers: { "@type": "Offer", price: "0", priceCurrency: "CHF", availability: "https://schema.org/InStock" },
  },
  {
    "@type": "FAQPage",
    "@id": `${PAGE_URL}#faq`,
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  },
];

const WebsiteCheckPage = () => {
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Website-Check", path: "/website-check" },
  ];

  return (
    <Layout>
      <PageHero
        breadcrumbItems={breadcrumbItems}
        title="Website-Check"
        subtitle="In zwei Minuten wissen, wo deine Website steht: Ladezeit, Sicherheit, Rechtliches und ob KI-Assistenten sie lesen können."
      />

      <section className={styles.check} id="check">
        <div className="container">
          <div className={styles.layout}>
            <div className={styles.intro} data-reveal>
              <span className={styles.eyebrow}>Kostenlos · ohne Anmeldung</span>
              <h2 className={styles.title}>Wie schlägt sich deine Website?</h2>
              <p className={styles.lead}>
                Gib die Adresse ein, wir analysieren die Seite mit denselben Werkzeugen, die ich in Kundenprojekten
                nutze. Du siehst die wichtigsten Werte sofort und bekommst den vollständigen Report als Link.
              </p>
              <ul className={styles.facts}>
                <li>Vier Prüfbereiche, ein Gesamtwert</li>
                <li>Die drei wichtigsten Hebel, priorisiert nach Aufwand</li>
                <li>Report 90 Tage abrufbar, auch per E-Mail</li>
              </ul>
            </div>
            <div data-reveal>
              <WebsiteCheck campaign="website-check-seite" />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.what}>
        <div className="container">
          <SectionTitle
            eyebrow="Was geprüft wird"
            subtitle="Vier Bereiche, die entscheiden, ob Besucher und Suchmaschinen deine Seite ernst nehmen."
            align="left"
            className={styles.wideTitle}
          >
            Das schaut sich der Check an
          </SectionTitle>
          <div className={styles.tiles}>
            {CHECKS.map((item) => (
              <FactTile key={item.title} icon={item.icon} title={item.title} text={item.text} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.faq}>
        <div className="container">
          <SectionTitle eyebrow="Gut zu wissen" align="left">
            Fragen zum Check
          </SectionTitle>
          <dl className={styles.qa} data-reveal>
            {FAQ.map((item, index) => (
              <div key={item.q}>
                <dt>{item.q}</dt>
                <dd>
                  {item.a}
                  {index === 0 && (
                    <>
                      {" "}
                      Kontakt: <a href={`mailto:${site.email}`}>{site.email}</a>. Details in der{" "}
                      <a href="/datenschutz#website-check">Datenschutzerklärung</a>.
                    </>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </Layout>
  );
};

export default WebsiteCheckPage;

export const Head = () => (
  <Seo
    title="Website-Check – Bürgler Business Solutions"
    description="Kostenloser Website-Check in zwei Minuten: Ladezeit, Sicherheit, Impressum und Datenschutz, KI-Bereitschaft. Mit vollständigem Report und ehrlicher Einschätzung."
    pathname="/website-check"
    schema={checkSchema}
  />
);
