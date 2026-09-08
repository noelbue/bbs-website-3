import React from "react";
import Layout from "../components/layout/Layout";
import Seo from "../components/Seo";
import PageHero from "../components/layout/PageHero";
import ServiceNav from "../components/layout/ServiceNav";
import ServiceSection from "../components/layout/ServiceSection";
import Cta from "../components/layout/Cta";
import SectionTitle from "../components/ui/SectionTitle";
import FactTile from "../components/ui/FactTile";
import SupportCard from "../components/ui/SupportCard";
import ServiceCta from "../components/layout/ServiceCta";
import ProjectSizeCard from "../components/ui/ProjectSizeCard";
import Faq from "../components/ui/Faq";
import { getIcon } from "../components/ui/icons";
import servicesData from "../data/services.json";
import faqData from "../data/faq.json";
import site from "../data/site";
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
        title="Services"
        subtitle="Spezialisierte Lösungen für Publishing-Workflows, Web-Entwicklung und Web-Apps, System-Integration sowie KI-Einsatz und KI-Schulungen"
      />

      <ServiceNav />

      {servicesData.sections.map((section) => (
        <ServiceSection
          key={section.id}
          id={section.id}
          category={section.category}
          title={section.title}
          subtitle={section.subtitle}
          offerings={section.offerings}
          techInfo={section.techInfo}
          cta={section.cta}
        />
      ))}

      {/* Arbeitsweise */}
      <section className={styles.workingStyle} id="arbeitsweise">
        <div className="container">
          <SectionTitle
            eyebrow="Zusammenarbeit"
            subtitle={servicesData.workingStyle.subtitle}
            align="left"
          >
            {servicesData.workingStyle.title}
          </SectionTitle>
          <div className={styles.tiles}>
            {servicesData.workingStyle.items.map((item) => (
              <FactTile
                key={item.title}
                icon={getIcon(item.icon, 24)}
                title={item.title}
                text={item.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Typische Projektgrössen */}
      <section className={styles.projectSizes} id="projektgroessen">
        <div className="container">
          <SectionTitle
            eyebrow="Rahmen"
            subtitle={servicesData.projectSizes.subtitle}
            align="left"
          >
            {servicesData.projectSizes.title}
          </SectionTitle>
          <div className={styles.sizes}>
            {servicesData.projectSizes.items.map((item) => (
              <ProjectSizeCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Support & Wartung */}
      <section className={styles.support} id="support">
        <div className="container">
          <SectionTitle
            eyebrow="Danach"
            subtitle={servicesData.support.subtitle}
            align="left"
          >
            {servicesData.support.title}
          </SectionTitle>
          <div className={styles.supportGrid}>
            {servicesData.support.items.map((item) => (
              <SupportCard
                key={item.title}
                icon={getIcon(item.icon, 24)}
                title={item.title}
                description={item.description}
                points={item.points}
              />
            ))}
          </div>
          {servicesData.support.cta && (
            <ServiceCta
              hook={servicesData.support.cta.hook}
              subject={servicesData.support.cta.subject}
              note={servicesData.support.cta.note}
            />
          )}
        </div>
      </section>

      {/* Häufige Fragen */}
      <section className={styles.faq} id="faq">
        <div className="container">
          <SectionTitle
            eyebrow="FAQ"
            subtitle="Die Fragen, die im Erstgespräch am häufigsten kommen."
            align="left"
          >
            {faqData.title}
          </SectionTitle>
          <Faq items={faqData.items} />
        </div>
      </section>

      <Cta
        title="Bereit für Ihr Projekt?"
        description="Lassen Sie uns gemeinsam die perfekte Lösung für Ihre Anforderungen finden."
        primaryButton={{ text: "PROJEKT BESPRECHEN", href: "/kontakt" }}
        secondaryButton={{ text: "MEHR ÜBER MICH", href: "/ueber-mich" }}
      />
    </Layout>
  );
};

export default ServicesPage;

const SITE_URL = site.siteUrl;

const servicesSchema = [
  ...servicesData.sections.map((section) => ({
    "@type": "Service",
    "@id": `${SITE_URL}/services/#${section.id}`,
    name: section.category,
    serviceType: section.category,
    description: `${section.title}. ${section.subtitle}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: ["CH", "DE", "AT", "LI"],
    url: `${SITE_URL}/services/#${section.id}`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: section.category,
      itemListElement: section.offerings.map((offering) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: offering.title,
          description: offering.description,
        },
      })),
    },
  })),
  {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/services/#faq`,
    mainEntity: faqData.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  },
];

export const Head = () => (
  <Seo
    title="Services – Bürgler Business Solutions"
    description="Publishing-Automatisierung, Websites und Web-Apps, System-Integration, KI-Workflows und KI-Schulungen. Alles aus einer Hand, alles selbst gebaut."
    pathname="/services"
    schema={servicesSchema}
  />
);
