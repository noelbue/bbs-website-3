import React, { useCallback, useState } from "react";
import Layout from "../components/layout/Layout";
import Seo from "../components/Seo";
import Cta from "../components/layout/Cta";
import Button from "../components/ui/Button";
import ServiceCard from "../components/ui/ServiceCard";
import WhyUsCard from "../components/ui/WhyUsCard";
import SectionTitle from "../components/ui/SectionTitle";
import CardGrid from "../components/ui/CardGrid";
import WorkflowDiagram, { SCENARIOS } from "../components/ui/WorkflowDiagram";
import TypedHeadline from "../components/ui/TypedHeadline";
import TrustStrip from "../components/ui/TrustStrip";
import { getIcon } from "../components/ui/icons";
import homeContent from "../data/homeContent.json";
import noelPortrait from "../assets/noel-buergler.png";
import * as styles from "./index.module.css";

/** Hero mit getippter Headline; nur dieser Teil rendert beim Szenario-Wechsel neu. */
const HomeHero = ({ hero, trust }) => {
  const [headline, setHeadline] = useState(SCENARIOS[0].headline);
  const handleScenario = useCallback((scenario) => {
    setHeadline(scenario.headline);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}></div>
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroText}>
          <span className={styles.eyebrow}>{hero.eyebrow}</span>
          <h1 className={styles.heroTitle}>
            <TypedHeadline text={headline} />
          </h1>
          <p className={styles.heroLead}>{hero.lead}</p>
          <div className={styles.heroCta}>
            <Button href={hero.primary.href} variant="primary" icon>
              {hero.primary.text}
            </Button>
            <Button href={hero.secondary.href} variant="secondary">
              {hero.secondary.text}
            </Button>
          </div>
          {hero.trustLine && (
            <p className={styles.heroNote}>{hero.trustLine}</p>
          )}
        </div>
        <div className={styles.heroVisual}>
          <WorkflowDiagram onChange={handleScenario} />
        </div>
        <TrustStrip
          label={trust.label}
          items={trust.items}
          note={
            <>
              <b>{trust.noteStrong}</b> {trust.noteText}
            </>
          }
        />
      </div>
    </section>
  );
};

const IndexPage = () => {
  const { hero, trust, services, whyUs } = homeContent;

  return (
    <Layout>
      <HomeHero hero={hero} trust={trust} />

      {/* Services */}
      <section className={styles.services}>
        <div className="container">
          <SectionTitle
            eyebrow={services.eyebrow}
            subtitle={services.subtitle}
            align="left"
          >
            {services.title}
          </SectionTitle>
          <div className={styles.bento}>
            {services.items.map((service) => (
              <ServiceCard
                key={service.title}
                href={service.href}
                icon={getIcon(service.icon, 24)}
                kicker={service.kicker}
                title={service.title}
                description={service.description}
                tags={service.tags}
                featured={Boolean(service.featured)}
              />
            ))}
          </div>
          <div className={styles.servicesFooter}>
            <Button href="/services" variant="secondary" icon>
              Alle Services
            </Button>
          </div>
        </div>
      </section>

      {/* Warum ich */}
      <section className={styles.whyUs}>
        <div className="container">
          <SectionTitle eyebrow={whyUs.eyebrow}>{whyUs.title}</SectionTitle>
          <CardGrid columns={3}>
            {whyUs.items.map((item) => (
              <WhyUsCard
                key={item.title}
                href={item.href}
                icon={getIcon(item.icon, 28)}
                title={item.title}
                description={item.description}
              />
            ))}
          </CardGrid>
        </div>
      </section>

      {/* Über mich */}
      <section className={styles.about}>
        <div className="container">
          <SectionTitle eyebrow="Über mich">
            Noel Bürgler – Ihr Publishing-Experte
          </SectionTitle>
          <div className={styles.aboutContent} data-reveal>
            <div className={styles.aboutImage}>
              <div className={styles.portraitWrap}>
                <div className={styles.portrait}>
                  <img
                    src={noelPortrait}
                    alt="Noel Bürgler"
                    className={styles.portraitImage}
                    width="300"
                    height="400"
                    loading="lazy"
                  />
                </div>
                <span className={`${styles.badge} ${styles.badgeTop}`}>
                  <b>10+</b> Jahre Publishing
                </span>
                <span className={`${styles.badge} ${styles.badgeBottom}`}>
                  <i className={styles.pulse} aria-hidden="true" />
                  Kapazität für neue Projekte
                </span>
              </div>
            </div>
            <div className={styles.aboutText}>
              <p>
                Über 10 Jahre in der Publishing-Branche – von der{" "}
                <a
                  href="https://www.topix.ch/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.textLink}
                >
                  <strong>Topix AG</strong>
                </a>{" "}
                bis zur{" "}
                <a
                  href="https://www.brueggli-admedia.ch/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.textLink}
                >
                  <strong>Brüggli Admedia AG</strong>
                </a>
                , wo ich heute als Solution Architect die
                Systemmodernisierung für die Schweizerische Post mitentwickle.
                Mein Fokus: Automatisierung und Integration von
                Publishing-Workflows – zunehmend mit KI-gestützter Entwicklung.
              </p>
              <p>Meine Mission: Komplexe Technologie einfach nutzbar machen.</p>
              <div className={styles.aboutButton}>
                <Button href="/ueber-mich" variant="secondary" icon>
                  Über mich
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Cta
        title="Bereit für effizientere Publishing-Prozesse?"
        description="Lassen Sie uns in einem Beratungsgespräch Ihre Herausforderungen besprechen und gemeinsam die perfekte Lösung entwickeln."
        primaryButton={{ text: "TERMIN VEREINBAREN", href: "/kontakt" }}
        secondaryButton={{ text: "PROJEKT ANFRAGEN", href: "/kontakt" }}
      />
    </Layout>
  );
};

export default IndexPage;

export const Head = () => (
  <Seo
    title="Bürgler Business Solutions – Publishing-Technologie Experte"
    description="Publishing-Workflows, die von selbst laufen. Automatisierung, Integration und KI-gestützte Entwicklung für digitale und Print-Publishing-Prozesse aus der Schweiz."
    pathname="/"
  />
);
