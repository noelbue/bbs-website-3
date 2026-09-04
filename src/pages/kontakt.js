import React from "react";
import Layout from "../components/layout/Layout";
import Seo from "../components/Seo";
import PageHero from "../components/layout/PageHero";
import Cta from "../components/layout/Cta";
import Button from "../components/ui/Button";
import SectionTitle from "../components/ui/SectionTitle";
import CardGrid from "../components/ui/CardGrid";
import ContactCard from "../components/ui/ContactCard";
import FactTile from "../components/ui/FactTile";
import ProcessFlow from "../components/ui/ProcessFlow";
import SocialLink from "../components/ui/SocialLink";
import { getIcon } from "../components/ui/icons";
import site from "../data/site";
import contactContent from "../data/contactContent.json";
import * as styles from "./kontakt.module.css";

const KontaktPage = () => {
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Kontakt", path: "/kontakt" },
  ];

  return (
    <Layout>
      <PageHero
        breadcrumbItems={breadcrumbItems}
        title={contactContent.hero.title}
        subtitle={contactContent.hero.subtitle}
      />

      {/* Direkt */}
      <section className={styles.intro}>
        <div className="container">
          <div className={styles.introGrid}>
            <div className={styles.introText} data-reveal>
              <span className={styles.eyebrow}>Direkt</span>
              <h2 className={styles.introTitle}>{contactContent.intro.title}</h2>
              <p className={styles.introDescription}>
                {contactContent.intro.description}
              </p>
              <div className={styles.introActions}>
                <Button href={`mailto:${site.email}`} variant="primary" icon>
                  E-Mail schreiben
                </Button>
                <Button href={site.phoneHref} variant="secondary">
                  {site.phone}
                </Button>
              </div>
              {contactContent.intro.note && (
                <p className={styles.introNote}>{contactContent.intro.note}</p>
              )}
            </div>

            <aside className={styles.quickStart} data-reveal>
              <span className={styles.quickLabel}>
                {contactContent.quickStart.title}
              </span>
              <ol className={styles.quickList}>
                {contactContent.quickStart.items.map((item) => (
                  <li key={item.label}>
                    <div>
                      <b>{item.label}</b>
                      <span>{item.text}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </div>
      </section>

      {/* Kanäle */}
      <section className={styles.contactMethods}>
        <div className="container">
          <SectionTitle eyebrow="Kanäle" align="left">
            So erreichst du mich
          </SectionTitle>
          <CardGrid columns={3}>
            {contactContent.contactMethods.map((method) => (
              <ContactCard
                key={method.title}
                icon={getIcon(method.icon, 24)}
                title={method.title}
                value={method.value}
                href={method.href}
                description={method.description}
              />
            ))}
          </CardGrid>
        </div>
      </section>

      {/* Verfügbarkeit */}
      <section className={styles.availability}>
        <div className="container">
          <SectionTitle eyebrow="Planung" align="left">
            {contactContent.availability.title}
          </SectionTitle>
          <div className={styles.tiles}>
            {contactContent.availability.items.map((item) => (
              <FactTile
                key={item.title}
                icon={getIcon(item.icon, 24)}
                title={item.title}
                text={item.text}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Ablauf */}
      <section className={styles.process}>
        <div className="container">
          <SectionTitle
            eyebrow="Ablauf"
            subtitle={contactContent.process.subtitle}
            align="left"
          >
            {contactContent.process.title}
          </SectionTitle>
          <ProcessFlow steps={contactContent.process.steps} />
        </div>
      </section>

      {/* Netzwerk */}
      <section className={styles.social}>
        <div className="container">
          <SectionTitle eyebrow="Netzwerk" align="left">
            {contactContent.social.title}
          </SectionTitle>
          <div className={styles.socialLinks}>
            {contactContent.social.links.map((link) => (
              <SocialLink
                key={link.label}
                icon={getIcon(link.icon, 22)}
                label={link.label}
                href={link.href}
                description={link.description}
              />
            ))}
          </div>
        </div>
      </section>

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
