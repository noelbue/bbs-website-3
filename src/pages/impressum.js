import React from "react";
import Layout from "../components/layout/Layout";
import Seo from "../components/Seo";
import SectionTitle from "../components/ui/SectionTitle";
import * as styles from "./impressum.module.css";

const ImpressumPage = () => {
  return (
    <Layout>
      <div className={styles.impressum}>
        <div className="container">
          <SectionTitle as="h1">Impressum</SectionTitle>

          <div className={styles.content}>
            <section className={styles.section}>
              <h2>Angaben gemäss Art. 8 UWG</h2>
              <p>
                <strong>Bürgler Business Solutions</strong>
              </p>
              <p>Noel Bürgler</p>
              <p>
                Himmelrichstrasse 3<br />
                9326 Horn
                <br />
                Schweiz
              </p>
            </section>

            <section className={styles.section}>
              <h2>Kontakt</h2>
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
              <h2>Unternehmensangaben</h2>
              <p>
                Einzelunternehmen
                <br />
                UID: CHE-258.321.787
              </p>
            </section>

            <section className={styles.section}>
              <h2>Haftungsausschluss</h2>

              <h3>Inhalt der Website</h3>
              <p>
                Die Inhalte dieser Website wurden mit grösstmöglicher Sorgfalt
                erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität
                der Inhalte kann jedoch keine Gewähr übernommen werden. Als
                Diensteanbieter bin ich gemäss Art. 8 UWG für eigene Inhalte auf
                diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
              </p>

              <h3>Externe Links</h3>
              <p>
                Diese Website enthält Links zu externen Webseiten Dritter, auf
                deren Inhalte ich keinen Einfluss habe. Für die Inhalte der
                verlinkten Seiten ist stets der jeweilige Anbieter oder
                Betreiber der Seiten verantwortlich. Eine permanente inhaltliche
                Kontrolle der verlinkten Seiten ist ohne konkrete Anhaltspunkte
                einer Rechtsverletzung nicht zumutbar.
              </p>

              <h3>Urheberrecht</h3>
              <p>
                Die durch mich erstellten Inhalte und Werke auf dieser Website
                unterliegen dem schweizerischen Urheberrecht. Die
                Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                Verwertung ausserhalb der Grenzen des Urheberrechtes bedürfen
                meiner schriftlichen Zustimmung.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Datenschutz</h2>
              <p>
                Informationen zum Datenschutz finden Sie in unserer{" "}
                <a href="/datenschutz" className={styles.link}>
                  Datenschutzerklärung
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ImpressumPage;

export const Head = () => (
  <Seo
    title="Impressum – Bürgler Business Solutions"
    description="Impressum und rechtliche Informationen von Bürgler Business Solutions, Noel Bürgler."
    pathname="/impressum"
  />
);
