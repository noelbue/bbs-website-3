import React from "react";
import Layout from "../components/layout/Layout";
import Seo from "../components/Seo";
import PageHero from "../components/layout/PageHero";
import Cta from "../components/layout/Cta";
import SectionTitle from "../components/ui/SectionTitle";
import CardGrid from "../components/ui/CardGrid";
import AboutIntro from "../components/ui/AboutIntro";
import PassionCard from "../components/ui/PassionCard";
import SkillsTabs from "../components/ui/SkillsTabs";
import TimelineItem from "../components/ui/TimelineItem";
import FactTile from "../components/ui/FactTile";
import { getIcon } from "../components/ui/icons";
import aboutContent from "../data/aboutContent.json";
import noelPortrait from "../assets/noel-buergler.png";
import * as styles from "./ueber-mich.module.css";

const UeberMichPage = () => {
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Über mich", path: "/ueber-mich" },
  ];

  return (
    <Layout>
      <PageHero
        breadcrumbItems={breadcrumbItems}
        title={aboutContent.hero.title}
        subtitle={aboutContent.hero.subtitle}
      />

      {/* Intro */}
      <section className={styles.intro}>
        <div className="container">
          <AboutIntro
            greeting={aboutContent.intro.greeting}
            subtitle={aboutContent.intro.subtitle}
            description={aboutContent.intro.description}
            image={noelPortrait}
          />
        </div>
      </section>

      {/* Mein Weg */}
      <section className={styles.journey} id="journey">
        <div className="container">
          <SectionTitle
            eyebrow="Stationen"
            subtitle={aboutContent.journey.subtitle}
            align="left"
          >
            {aboutContent.journey.title}
          </SectionTitle>
          <ol className={styles.timeline}>
            {aboutContent.journey.story.map((item) => (
              <TimelineItem
                key={item.title}
                period={item.period}
                location={item.location}
                company={item.company}
                logo={item.logo}
                url={item.url}
                title={item.title}
                description={item.description}
                tags={item.tags}
                current={/heute/i.test(item.period || "")}
              />
            ))}
          </ol>
        </div>
      </section>

      {/* Was mich antreibt */}
      <section className={styles.passion}>
        <div className="container">
          <SectionTitle eyebrow="Haltung" align="left">
            {aboutContent.passion.title}
          </SectionTitle>
          <CardGrid columns={3}>
            {aboutContent.passion.items.map((item) => (
              <PassionCard
                key={item.title}
                icon={getIcon(item.icon, 24)}
                title={item.title}
                description={item.description}
              />
            ))}
          </CardGrid>
        </div>
      </section>

      {/* Womit ich arbeite */}
      <section className={styles.expertise} id="expertise">
        <div className="container">
          <SectionTitle
            eyebrow="Werkbank"
            subtitle={aboutContent.expertise.subtitle}
            align="left"
          >
            {aboutContent.expertise.title}
          </SectionTitle>
          <SkillsTabs categories={aboutContent.expertise.categories} />
        </div>
      </section>

      {/* Ausgleich */}
      <section className={styles.personal}>
        <div className="container">
          <SectionTitle
            eyebrow="Ausgleich"
            subtitle={aboutContent.personal.subtitle}
            align="left"
          >
            {aboutContent.personal.title}
          </SectionTitle>
          <div className={styles.personalGrid}>
            {aboutContent.personal.items.map((item) => (
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

      <Cta
        title={aboutContent.cta.title}
        description={aboutContent.cta.description}
        primaryButton={aboutContent.cta.primaryButton}
        secondaryButton={aboutContent.cta.secondaryButton}
      />
    </Layout>
  );
};

export default UeberMichPage;

export const Head = () => (
  <Seo
    title="Über mich – Bürgler Business Solutions"
    description="Solution Architect, Publishing-Experte und Web-Entwickler aus der Schweiz. Über 10 Jahre Erfahrung in Publishing-Systemen, moderner Web-Entwicklung und KI-gestützter Software-Entwicklung."
    pathname="/ueber-mich"
  />
);
