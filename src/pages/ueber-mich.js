import React from "react";
import {
  Lightbulb,
  Users,
  Rocket,
  Zap,
  Target,
  Dumbbell,
  Gamepad2,
  GraduationCap,
  Mountain,
  Code,
} from "lucide-react";
import Layout from "../components/layout/Layout";
import PageHero from "../components/layout/PageHero";
import Cta from "../components/layout/Cta";
import SectionTitle from "../components/ui/SectionTitle";
import CardGrid from "../components/ui/CardGrid";
import AboutIntro from "../components/ui/AboutIntro";
import StoryCard from "../components/ui/StoryCard";
import PassionCard from "../components/ui/PassionCard";
import SkillsGrid from "../components/ui/SkillsGrid";
import aboutContent from "../data/aboutContent.json";
import noelPortrait from "../assets/noel-buergler.png";
import * as styles from "./ueber-mich.module.css";

const UeberMichPage = () => {
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Über mich", path: "/ueber-mich" },
  ];

  // Icon Mapper
  const iconMap = {
    Lightbulb: Lightbulb,
    Users: Users,
    Rocket: Rocket,
    Zap: Zap,
    Target: Target,
    Dumbbell: Dumbbell,
    Gamepad2: Gamepad2,
    GraduationCap: GraduationCap,
    Mountain: Mountain,
    Code: Code,
  };

  const getIcon = (iconName, size = 32) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent size={size} /> : null;
  };

  return (
    <Layout>
      <PageHero
        breadcrumbItems={breadcrumbItems}
        title={aboutContent.hero.title}
        subtitle={aboutContent.hero.subtitle}
      />

      {/* Intro Section */}
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

      {/* Journey Section */}
      <section className={styles.journey}>
        <div className="container">
          <SectionTitle>{aboutContent.journey.title}</SectionTitle>
          <p className={styles.subtitle}>{aboutContent.journey.subtitle}</p>
          <div className={styles.timeline}>
            {aboutContent.journey.story.map((item, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineContent}>
                  <StoryCard
                    title={item.title}
                    description={item.description}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Passion Section */}
      <section className={styles.passion}>
        <div className="container">
          <SectionTitle>{aboutContent.passion.title}</SectionTitle>
          <CardGrid columns={3}>
            {aboutContent.passion.items.map((item, index) => (
              <PassionCard
                key={index}
                icon={getIcon(item.icon)}
                title={item.title}
                description={item.description}
              />
            ))}
          </CardGrid>
        </div>
      </section>

      {/* Expertise Section */}
      <section className={styles.expertise}>
        <div className="container">
          <SectionTitle>{aboutContent.expertise.title}</SectionTitle>
          <p className={styles.subtitle}>{aboutContent.expertise.subtitle}</p>
          <SkillsGrid categories={aboutContent.expertise.categories} />
        </div>
      </section>

      {/* Personal Section */}
      <section className={styles.personal}>
        <div className="container">
          <SectionTitle>{aboutContent.personal.title}</SectionTitle>
          <div className={styles.personalList}>
            {aboutContent.personal.items.map((item, index) => (
              <div key={index} className={styles.personalItem}>
                <div className={styles.personalIcon}>
                  {getIcon(item.icon, 20)}
                </div>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
  <>
    <title>Über mich – Bürgler Business Solutions</title>
    <meta
      name="description"
      content="Publishing-Experte, Web-Entwickler und IT-Architekt aus Leidenschaft. Über 10 Jahre Erfahrung in Publishing-Systemen und moderner Web-Entwicklung."
    />
  </>
);
