import React from "react";
import Layout from "../components/layout/Layout";
import PageHero from "../components/layout/PageHero";
import ServiceSection from "../components/layout/ServiceSection";
import Button from "../components/ui/Button";
import * as styles from "./services.module.css";

const ServicesPage = () => {
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
  ];

  return (
    <Layout>
      <PageHero
        breadcrumbItems={breadcrumbItems}
        title="Unsere Services"
        subtitle="Spezialisierte Lösungen für Publishing-Workflows und Content-Management"
      />

      {/* Content Management & Web-Entwicklung */}
      <ServiceSection
        category="Content Management & Web-Entwicklung"
        title="Moderne Content-Lösungen und Web-Entwicklung"
        subtitle="Vom klassischen CMS bis zu modernen Headless-Architekturen und Eigenentwicklung"
        offerings={[
          {
            title: "Headless CMS Implementierung",
            description:
              "Für moderne Anforderungen implementiere ich Headless CMS Lösungen wie Strapi oder Contentful und kümmere mich um die entsprechende API-Integration in Ihre bestehenden Systeme.",
          },
          {
            title: "Custom Web-Entwicklung",
            description:
              "Bei der Custom Web-Entwicklung setze ich auf Next.js für performante Anwendungen und entwickle React-basierte Lösungen für spezielle Anforderungen.",
          },
          {
            title: "WordPress Development",
            description:
              "Ich erstelle individuelle Themes und Plugins, optimiere die Performance bestehender Websites und übernehme die Wartung sowie Updates für einen reibungslosen Betrieb.",
          },
        ]}
        techInfo={[
          {
            title: "Technologien",
            items: [
              "CMS: WordPress, Drupal, Craft CMS",
              "Headless: Strapi, Contentful",
              "Entwicklung: Next.js, React, PHP, JavaScript",
              "DAM: Sharedien, pixx.io",
            ],
          },
          {
            title: "Wann macht welche Lösung Sinn?",
            items: [
              "WordPress: Einfache Bedienung, schnelle Umsetzung",
              "Headless CMS: Flexibilität, Multi-Channel Publishing",
              "Custom Development: Spezielle Anforderungen, maximale Kontrolle",
            ],
          },
        ]}
      />

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className="container">
          <h2>Bereit für Ihr Projekt?</h2>
          <p>
            Lassen Sie uns gemeinsam die perfekte Lösung für Ihre Anforderungen
            finden.
          </p>
          <div className={styles.ctaButtons}>
            <Button href="/kontakt" variant="primary">
              PROJEKT BESPRECHEN
            </Button>
            <Button href="/ueber-mich" variant="secondary">
              MEHR ÜBER MICH
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;

export const Head = () => (
  <>
    <title>Services – Bürgler Business Solutions</title>
    <meta
      name="description"
      content="Spezialisierte Lösungen für Publishing-Workflows und Content-Management. Von Automatisierung bis KI-Integration."
    />
  </>
);
