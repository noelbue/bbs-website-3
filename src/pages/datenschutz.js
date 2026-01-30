import React from "react";
import Layout from "../components/layout/Layout";
import Seo from "../components/Seo";
import SectionTitle from "../components/ui/SectionTitle";
import * as styles from "./datenschutz.module.css";

const DatenschutzPage = () => {
  return (
    <Layout>
      <div className={styles.datenschutz}>
        <div className="container">
          <SectionTitle>Datenschutzerklärung</SectionTitle>

          <div className={styles.content}>
            <section className={styles.section}>
              <h2>Allgemeines</h2>
              <p>
                Gestützt auf Artikel 13 der schweizerischen Bundesverfassung und
                den datenschutzrechtlichen Bestimmungen des Bundes
                (Datenschutzgesetz, DSG) hat jede Person Anspruch auf Schutz
                ihrer Privatsphäre sowie auf Schutz vor Missbrauch ihrer
                persönlichen Daten. Wir halten diese Bestimmungen ein.
                Persönliche Daten werden streng vertraulich behandelt und weder
                an Dritte verkauft noch weitergegeben.
              </p>
              <p>
                In enger Zusammenarbeit mit unseren Hosting-Providern bemühen
                wir uns, die Datenbanken so gut wie möglich vor unberechtigtem
                Zugriff, Verlust, Missbrauch oder Verfälschung zu schützen.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Verantwortliche Stelle</h2>
              <p>
                Verantwortlich für die Datenbearbeitung auf dieser Website ist:
              </p>
              <p>
                <strong>Bürgler Business Solutions</strong>
                <br />
                Noel Bürgler
                <br />
                Himmelrichstrasse 3<br />
                9326 Horn
                <br />
                Schweiz
              </p>
              <p>
                E-Mail:{" "}
                <a href="mailto:nb@b-business-solutions.ch">
                  nb@b-business-solutions.ch
                </a>
                <br />
                Telefon: <a href="tel:+41787832814">+41 78 783 28 14</a>
              </p>
            </section>

            <section className={styles.section}>
              <h2>Erhebung und Verarbeitung personenbezogener Daten</h2>
              <p>
                Diese Website erhebt derzeit keine personenbezogenen Daten
                aktiv. Es gibt kein Kontaktformular und keine
                Newsletter-Anmeldung auf dieser Website.
              </p>
              <p>
                Wenn Sie uns per E-Mail kontaktieren, werden Ihre Angaben
                inklusive der von Ihnen angegebenen Kontaktdaten zwecks
                Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei
                uns gespeichert. Diese Daten geben wir nicht ohne Ihre
                Einwilligung weiter.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Hosting</h2>
              <p>Diese Website wird gehostet bei:</p>
              <p>
                <strong>Netlify, Inc.</strong>
                <br />
                101 2nd Street
                <br />
                San Francisco, CA 94105
                <br />
                USA
              </p>
              <p>
                Netlify ist ein Hosting-Provider, den wir für das Bereitstellen
                unserer Website verwenden. Beim Besuch unserer Website werden
                durch Netlify automatisch Informationen allgemeiner Natur
                erfasst (Server-Logfiles). Diese beinhalten etwa die Art des
                Webbrowsers, das verwendete Betriebssystem, den Domainnamen
                Ihres Internet Service Providers und ähnliches. Hierbei handelt
                es sich ausschliesslich um Informationen, welche keine
                Rückschlüsse auf Ihre Person zulassen. Diese Informationen sind
                technisch notwendig, um Inhalte korrekt auszuliefern.
              </p>
              <p>
                Weitere Informationen zum Datenschutz bei Netlify finden Sie
                unter:{" "}
                <a
                  href="https://www.netlify.com/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.netlify.com/privacy/
                </a>
              </p>
            </section>

            <section className={styles.section}>
              <h2>Cookies</h2>
              <p>
                Diese Website verwendet keine Tracking-Cookies oder persistente
                Cookies für Analyse- oder Werbezwecke.
              </p>
              <p>
                Für die technische Funktion der Website (z.B.
                Session-Management, Navigation) kann der Browser temporär Daten
                im Session Storage speichern. Diese Daten werden automatisch
                gelöscht, sobald Sie den Browser schliessen, und enthalten keine
                personenbezogenen Informationen.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Webfonts</h2>
              <p>
                Diese Website verwendet lokal gehostete Schriftarten (SF Pro
                Display, SF Mono). Die Schriftarten werden direkt von unserem
                Server geladen, es erfolgt keine Verbindung zu externen Diensten
                wie Google Fonts. Dadurch werden keine Daten an Dritte
                übertragen.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Analyse-Tools und Werbung</h2>
              <p>
                Diese Website verwendet derzeit keine Analyse-Tools wie Google
                Analytics oder ähnliche Tracking-Dienste.
              </p>
              <p>
                Sollten wir in Zukunft solche Dienste einsetzen, werden wir Sie
                an dieser Stelle darüber informieren und gegebenenfalls Ihre
                Einwilligung einholen.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Social Media</h2>
              <p>
                Unsere Website enthält Links zu Social-Media-Profilen (LinkedIn,
                GitHub). Diese Links sind als einfache Hyperlinks implementiert.
                Es werden keine Daten automatisch an diese Plattformen
                übertragen, solange Sie nicht aktiv auf die Links klicken.
              </p>
              <p>
                Sobald Sie auf einen dieser Links klicken, verlassen Sie unsere
                Website und unterliegen den Datenschutzbestimmungen der
                jeweiligen Plattform.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Ihre Rechte</h2>
              <p>Sie haben jederzeit das Recht auf:</p>
              <ul>
                <li>
                  Auskunft über Ihre bei uns gespeicherten personenbezogenen
                  Daten
                </li>
                <li>Berichtigung unrichtiger oder unvollständiger Daten</li>
                <li>Löschung Ihrer bei uns gespeicherten Daten</li>
                <li>Einschränkung der Datenverarbeitung</li>
                <li>Datenübertragbarkeit</li>
                <li>Widerspruch gegen die Verarbeitung Ihrer Daten</li>
              </ul>
              <p>
                Zur Ausübung Ihrer Rechte kontaktieren Sie uns bitte unter:{" "}
                <a href="mailto:nb@b-business-solutions.ch">
                  nb@b-business-solutions.ch
                </a>
              </p>
            </section>

            <section className={styles.section}>
              <h2>Datensicherheit</h2>
              <p>
                Wir verwenden innerhalb des Website-Besuchs das verbreitete
                SSL-Verfahren (Secure Socket Layer) in Verbindung mit der
                jeweils höchsten Verschlüsselungsstufe, die von Ihrem Browser
                unterstützt wird. In der Regel handelt es sich dabei um eine
                256-Bit-Verschlüsselung.
              </p>
              <p>
                Unsere Website und alle Datenübertragungen sind über HTTPS
                verschlüsselt.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Änderungen dieser Datenschutzerklärung</h2>
              <p>
                Wir behalten uns vor, diese Datenschutzerklärung gelegentlich
                anzupassen, damit sie stets den aktuellen rechtlichen
                Anforderungen entspricht oder um Änderungen unserer Leistungen
                umzusetzen, z.B. bei der Einführung neuer Services.
              </p>
              <p>
                Für Ihren erneuten Besuch gilt dann die neue
                Datenschutzerklärung.
              </p>
              <p>
                <strong>Stand:</strong> Januar 2026
              </p>
            </section>

            <section className={styles.section}>
              <h2>Fragen zum Datenschutz</h2>
              <p>
                Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte
                eine E-Mail an:{" "}
                <a href="mailto:nb@b-business-solutions.ch">
                  nb@b-business-solutions.ch
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DatenschutzPage;

export const Head = () => (
  <Seo
    title="Datenschutzerklärung – Bürgler Business Solutions"
    description="Datenschutzerklärung und Informationen zur Datenverarbeitung auf b-business-solutions.ch"
    pathname="/datenschutz"
  />
);
