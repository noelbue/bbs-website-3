import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  Github,
  Briefcase,
  Zap,
  Calendar,
  Home,
  CheckCircle,
} from "lucide-react";
import Layout from "../components/layout/Layout";
import Seo from "../components/Seo";
import PageHero from "../components/layout/PageHero";
import Cta from "../components/layout/Cta";
import SectionTitle from "../components/ui/SectionTitle";
import CardGrid from "../components/ui/CardGrid";
import ContactCard from "../components/ui/ContactCard";
import ProcessStep from "../components/ui/ProcessStep";
import SocialLink from "../components/ui/SocialLink";
import contactContent from "../data/contactContent.json";
import * as styles from "./kontakt.module.css";

const KontaktPage = () => {
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Kontakt", path: "/kontakt" },
  ];

  // Icon Mapper
  const iconMap = {
    Mail: Mail,
    Phone: Phone,
    MapPin: MapPin,
    Linkedin: Linkedin,
    Globe: Globe,
    Github: Github,
    Briefcase: Briefcase,
    Zap: Zap,
    Calendar: Calendar,
    Home: Home,
    CheckCircle: CheckCircle,
  };

  const getIcon = (iconName, size = 32) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent size={size} /> : null;
  };

  return (
    <Layout>
      <PageHero
        breadcrumbItems={breadcrumbItems}
        title={contactContent.hero.title}
        subtitle={contactContent.hero.subtitle}
      />

      {/* Intro Section */}
      <section className={styles.intro}>
        <div className="container">
          <div className={styles.introContent}>
            <h2 className={styles.introTitle}>{contactContent.intro.title}</h2>
            <p className={styles.introDescription}>
              {contactContent.intro.description}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className={styles.contactMethods}>
        <div className="container">
          <CardGrid columns={3}>
            {contactContent.contactMethods.map((method, index) => (
              <ContactCard
                key={index}
                icon={getIcon(method.icon)}
                title={method.title}
                value={method.value}
                href={method.href}
                description={method.description}
              />
            ))}
          </CardGrid>
        </div>
      </section>

      {/* Availability */}
      <section className={styles.availability}>
        <div className="container">
          <SectionTitle>{contactContent.availability.title}</SectionTitle>
          <div className={styles.availabilityList}>
            {contactContent.availability.items.map((item, index) => (
              <div key={index} className={styles.availabilityItem}>
                <div className={styles.availabilityIcon}>
                  {getIcon(item.icon, 20)}
                </div>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className={styles.process}>
        <div className="container">
          <SectionTitle>{contactContent.process.title}</SectionTitle>
          <div className={styles.processSteps}>
            {contactContent.process.steps.map((step, index) => (
              <ProcessStep
                key={index}
                number={step.number}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className={styles.social}>
        <div className="container">
          <SectionTitle>{contactContent.social.title}</SectionTitle>
          <div className={styles.socialLinks}>
            {contactContent.social.links.map((link, index) => (
              <SocialLink
                key={index}
                icon={getIcon(link.icon, 24)}
                label={link.label}
                href={link.href}
                description={link.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <Cta
        title={contactContent.cta.title}
        description={contactContent.cta.description}
        primaryButton={contactContent.cta.primaryButton}
        secondaryButton={contactContent.cta.secondaryButton}
      />
    </Layout>
  );
};

export default KontaktPage;

export const Head = () => (
  <Seo
    title="Kontakt – Bürgler Business Solutions"
    description="Bereit für dein Projekt? Lass uns über Publishing-Automatisierung, Web-Entwicklung oder IT-Beratung sprechen. Kontaktiere mich per E-Mail oder Telefon."
    pathname="/kontakt"
  />
);
