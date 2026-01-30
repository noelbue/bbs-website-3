import { useEffect, useRef } from "react";
import { Zap, Layers, Search, Brain, Code, Award, Users } from "lucide-react";
import Layout from "../components/layout/Layout";
import Seo from "../components/Seo";
import Cta from "../components/layout/Cta";
import Button from "../components/ui/Button";
import ServiceCard from "../components/ui/ServiceCard";
import WhyUsCard from "../components/ui/WhyUsCard";
import SectionTitle from "../components/ui/SectionTitle";
import CardGrid from "../components/ui/CardGrid";
import homeContent from "../data/homeContent.json";
import noelPortrait from "../assets/noel-buergler.png";
import * as styles from "./index.module.css";

const IndexPage = () => {
  const servicesRef = useRef(null);
  const whyUsRef = useRef(null);
  const aboutRef = useRef(null);

  // Icon Mapper
  const iconMap = {
    Zap: Zap,
    Layers: Layers,
    Search: Search,
    Brain: Brain,
    Code: Code,
    Award: Award,
    Users: Users,
  };

  const getIcon = (iconName, size = 40) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent size={size} /> : null;
  };

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

    const elements = [servicesRef.current, whyUsRef.current, aboutRef.current];
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
          <SectionTitle>{homeContent.services.title}</SectionTitle>
          <CardGrid columns={2}>
            {homeContent.services.items.map((service, index) => (
              <ServiceCard
                key={index}
                href={service.href}
                icon={getIcon(service.icon)}
                title={service.title}
                subtitle={service.subtitle}
                description={service.description}
              />
            ))}
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
          <SectionTitle>{homeContent.whyUs.title}</SectionTitle>
          <CardGrid columns={3}>
            {homeContent.whyUs.items.map((item, index) => (
              <WhyUsCard
                key={index}
                href={item.href}
                icon={getIcon(item.icon, 48)}
                title={item.title}
                description={item.description}
              />
            ))}
          </CardGrid>
        </div>
      </section>

      {/* About Section */}
      <section className={styles.about} ref={aboutRef}>
        <div className="container">
          <SectionTitle>Noel Bürgler – Ihr Publishing-Experte</SectionTitle>
          <div className={styles.aboutContent}>
            <div className={styles.aboutImage}>
              <div className={styles.portrait}>
                <img
                  src={noelPortrait}
                  alt="Noel Bürgler"
                  className={styles.portraitImage}
                />
              </div>
            </div>
            <div className={styles.aboutText}>
              <p>
                Nach über 10 Jahren in der Publishing-Branche und zuletzt bei
                der{" "}
                <a
                  href="https://www.topix.ch/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.textLink}
                >
                  <strong>Topix AG</strong>
                </a>{" "}
                habe ich mich auf die Automatisierung und Integration von
                Publishing-Workflows spezialisiert.
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
    description="Publishing-Technologie neu gedacht. Automatisierung. Integration. Innovation. Massgeschneiderte Lösungen für Ihre digitalen und Print-Publishing-Prozesse."
    pathname="/"
  />
);
