import React from "react";
import {
  Clock,
  Target,
  MessageCircle,
  Users,
  Wrench,
  HelpCircle,
} from "lucide-react";
import Layout from "../components/layout/Layout";
import PageHero from "../components/layout/PageHero";
import ServiceNav from "../components/layout/ServiceNav";
import ServiceSection from "../components/layout/ServiceSection";
import Cta from "../components/layout/Cta";
import SectionTitle from "../components/ui/SectionTitle";
import CardGrid from "../components/ui/CardGrid";
import InfoCard from "../components/ui/InfoCard";
import ProjectSizeCard from "../components/ui/ProjectSizeCard";
import SupportCard from "../components/ui/SupportCard";
import Faq from "../components/ui/Faq";
import servicesData from "../data/services.json";
import faqData from "../data/faq.json";
import * as styles from "./services.module.css";

const ServicesPage = () => {
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
  ];

  // Icon Mapper
  const iconMap = {
    Clock: Clock,
    Target: Target,
    MessageCircle: MessageCircle,
    Users: Users,
    Wrench: Wrench,
    HelpCircle: HelpCircle,
  };

  const getIcon = (iconName, size = 32) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent size={size} /> : null;
  };

  return (
    <Layout>
      <PageHero
        breadcrumbItems={breadcrumbItems}
        title="Unsere Services"
        subtitle="Spezialisierte Lösungen für Publishing-Workflows und Content-Management"
      />

      {/* Service Navigation */}
      <ServiceNav />

      {/* Service Sections */}
      {servicesData.sections.map((section) => (
        <ServiceSection
          key={section.id}
          id={section.id}
          category={section.category}
          title={section.title}
          subtitle={section.subtitle}
          offerings={section.offerings}
          techInfo={section.techInfo}
        />
      ))}

      {/* Arbeitsweise */}
      <section className={styles.workingStyle}>
        <div className="container">
          <SectionTitle>{servicesData.workingStyle.title}</SectionTitle>
          <p className={styles.subtitle}>
            {servicesData.workingStyle.subtitle}
          </p>
          <CardGrid columns={2}>
            {servicesData.workingStyle.items.map((item, index) => (
              <InfoCard
                key={index}
                icon={getIcon(item.icon)}
                title={item.title}
                description={item.description}
              />
            ))}
          </CardGrid>
        </div>
      </section>

      {/* Typische Projektgrößen */}
      <section className={styles.projectSizes}>
        <div className="container">
          <SectionTitle>{servicesData.projectSizes.title}</SectionTitle>
          <CardGrid columns={3}>
            {servicesData.projectSizes.items.map((item, index) => (
              <ProjectSizeCard
                key={index}
                title={item.title}
                description={item.description}
              />
            ))}
          </CardGrid>
        </div>
      </section>

      {/* Support & Wartung */}
      <section className={styles.support}>
        <div className="container">
          <SectionTitle>{servicesData.support.title}</SectionTitle>
          <CardGrid columns={2}>
            {servicesData.support.items.map((item, index) => (
              <SupportCard
                key={index}
                icon={getIcon(item.icon)}
                title={item.title}
                items={item.items}
              />
            ))}
          </CardGrid>
        </div>
      </section>

      {/* Häufige Fragen */}
      <section className={styles.faq}>
        <div className="container">
          <SectionTitle>{faqData.title}</SectionTitle>
          <Faq items={faqData.items} />
        </div>
      </section>

      {/* CTA Section */}
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

export const Head = () => (
  <>
    <title>Services – Bürgler Business Solutions</title>
    <meta
      name="description"
      content="Spezialisierte Lösungen für Publishing-Workflows und Content-Management. Von Automatisierung bis KI-Integration."
    />
  </>
);
