import React, { useEffect, useRef } from "react";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import ServiceCard from "../components/ui/ServiceCard";
import WhyUsCard from "../components/ui/Whyuscard";
import SectionTitle from "../components/ui/Sectiontitle";
import CardGrid from "../components/ui/Cardgrid";
import * as styles from "./index.module.css";

const IndexPage = () => {
  const servicesRef = useRef(null);
  const whyUsRef = useRef(null);
  const aboutRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
        }
      });
    }, observerOptions);

    const elements = [
      servicesRef.current,
      whyUsRef.current,
      aboutRef.current,
      ctaRef.current,
    ];
    elements.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Publishing-Technologie neu gedacht. Automatisierung. Integration.
            Innovation.
          </h1>
          <p className={styles.heroText}>
            Als erfahrener Publishing-Experte entwickle ich massgeschneiderte
            Lösungen für Ihre digitalen und Print-Publishing-Prozesse. Von der
            Beratung bis zur Implementierung – ich bringe Ihre Workflows auf das
            nächste Level.
          </p>
          <div className={styles.heroCta}>
            <Button href="/kontakt" variant="primary">
              PROJEKT BESPRECHEN
            </Button>
            <Button href="/services" variant="secondary">
              SERVICES ENTDECKEN
            </Button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className={styles.services} ref={servicesRef}>
        <div className="container">
          <SectionTitle>Services</SectionTitle>
          <CardGrid columns={2}>
            <ServiceCard
              href="/services"
              icon={
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                    stroke="#4844F5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              title="Publishing-Automatisierung"
              subtitle="Optimierte Workflows für maximale Effizienz"
              description="Automatisieren Sie Ihre Publishing-Prozesse mit modernen Lösungen und bewährten Tools. Ich entwickle individuelle Workflows, die Zeit sparen und Fehler reduzieren."
            />

            <ServiceCard
              href="/services"
              icon={
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="#4844F5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="#4844F5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="#4844F5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              title="Content Management & Web-Entwicklung"
              subtitle="Moderne Content-Lösungen für jeden Bedarf"
              description="Von WordPress bis Headless CMS und Eigenentwicklung – ich implementiere die perfekte Content-Strategie für Ihre Anforderungen. Inklusive Custom Plugins, Themes und DAM-Integration."
            />

            <ServiceCard
              href="/services"
              icon={
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 16L19 19M4 11C4 14.866 7.13401 18 11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4C7.13401 4 4 7.13401 4 11Z"
                    stroke="#4844F5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              title="System-Integration & Datenverarbeitung"
              subtitle="Nahtlose Verbindungen zwischen Ihren Tools"
              description="API-Entwicklung, Datenmigrationen und Schnittstellenprogrammierung. Ich sorge dafür, dass Ihre Systeme perfekt zusammenarbeiten."
            />

            <ServiceCard
              href="/services"
              icon={
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.5 2C8.67157 2 8 2.67157 8 3.5V4.5C8 5.32843 8.67157 6 9.5 6C10.3284 6 11 5.32843 11 4.5V3.5C11 2.67157 10.3284 2 9.5 2Z"
                    fill="#4844F5"
                  />
                  <path
                    d="M14.5 2C13.6716 2 13 2.67157 13 3.5V4.5C13 5.32843 13.6716 6 14.5 6C15.3284 6 16 5.32843 16 4.5V3.5C16 2.67157 15.3284 2 14.5 2Z"
                    fill="#4844F5"
                  />
                  <path
                    d="M4 9C4 7.89543 4.89543 7 6 7H18C19.1046 7 20 7.89543 20 9V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V9Z"
                    stroke="#4844F5"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 11H16M8 15H13"
                    stroke="#4844F5"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              }
              title="KI-Publishing-Lösungen"
              subtitle="Intelligente Automatisierung für die Zukunft"
              description="Nutzen Sie KI-Technologien für effizientere Publishing-Prozesse. Von automatischer Contentverarbeitung bis zu intelligenten Workflows."
            />

            <ServiceCard
              href="/services"
              icon={
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16Z"
                    stroke="#4844F5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 10L12 13L9 16"
                    stroke="#4844F5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 16H17"
                    stroke="#4844F5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              title="Beratung & Projektleitung"
              subtitle="Strategische Begleitung von A bis Z"
              description="Technische Expertise trifft auf Projektmanagement. Ich begleite Sie von der Strategie bis zur erfolgreichen Implementierung."
            />
          </CardGrid>
          <div className={styles.servicesFooter}>
            <Button href="/services" variant="secondary">
              SERVICES
            </Button>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className={styles.whyUs} ref={whyUsRef}>
        <div className="container">
          <SectionTitle>Warum Sie mit uns arbeiten sollten</SectionTitle>
          <CardGrid columns={3}>
            <WhyUsCard
              href="/ueber-mich"
              icon={
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    stroke="#4844F5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              title="Technische Tiefe"
              description="Über 10 Jahre Erfahrung in Publishing-Technologien. Von InDesign-Scripting bis zu komplexen API-Integrationen."
            />

            <WhyUsCard
              href="/ueber-mich"
              icon={
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 11L12 14L22 4"
                    stroke="#4844F5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16"
                    stroke="#4844F5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              title="Praxisorientiert"
              description="Lösungen, die wirklich funktionieren. Keine Theorie – nur bewährte Methoden aus diversen erfolgreichen Projekten."
            />

            <WhyUsCard
              href="/ueber-mich"
              icon={
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                    stroke="#4844F5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                    stroke="#4844F5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
                    stroke="#4844F5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
                    stroke="#4844F5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              title="Partnerschaftlich"
              description="Ich arbeite nicht nur für Sie, sondern mit Ihnen. Transparente Kommunikation und langfristige Partnerschaften."
            />
          </CardGrid>
        </div>
      </section>

      {/* About Section */}
      <section className={styles.about} ref={aboutRef}>
        <div className="container">
          <SectionTitle>Noel Bürgler – Ihr Publishing-Experte</SectionTitle>
          <div className={styles.aboutContent}>
            <div className={styles.aboutImage}>
              <div className={styles.portraitPlaceholder}>
                <span>PORTRAIT</span>
              </div>
            </div>
            <div className={styles.aboutText}>
              <p>
                Nach über 10 Jahren in der Publishing-Branche und zuletzt bei
                der <strong>Topix AG</strong> habe ich mich auf die
                Automatisierung und Integration von Publishing-Workflows
                spezialisiert.
              </p>
              <p>Meine Mission: Komplexe Technologie einfach nutzbar machen.</p>
              <div className={styles.aboutButton}>
                <Button href="/ueber-mich" variant="secondary">
                  ÜBER MICH
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta} ref={ctaRef}>
        <div className="container">
          <h2>Bereit für effizientere Publishing-Prozesse?</h2>
          <p>
            Lassen Sie uns in einem Beratungsgespräch Ihre Herausforderungen
            besprechen und gemeinsam die perfekte Lösung entwickeln.
          </p>
          <div className={styles.ctaButtons}>
            <Button href="/kontakt" variant="primary">
              TERMIN VEREINBAREN
            </Button>
            <Button href="/kontakt" variant="secondary">
              PROJEKT ANFRAGEN
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => (
  <>
    <title>Bürgler Business Solutions – Publishing-Technologie Experte</title>
    <meta
      name="description"
      content="Publishing-Technologie neu gedacht. Automatisierung. Integration. Innovation. Massgeschneiderte Lösungen für Ihre digitalen und Print-Publishing-Prozesse."
    />
  </>
);
