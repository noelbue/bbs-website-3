import React from "react";
import CardGrid from "../ui/CardGrid";
import OfferingCard from "../ui/Offeringcard";
import TechInfoBox from "../ui/Techinfobox";
import * as styles from "./ServiceSection.module.css";

const ServiceSection = ({ category, title, subtitle, offerings, techInfo }) => {
  return (
    <section className={styles.serviceSection}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <p className={styles.category}>{category}</p>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        {/* Was ich anbiete */}
        {offerings && offerings.length > 0 && (
          <div className={styles.offerings}>
            <h3 className={styles.offeringsTitle}>Was ich anbiete</h3>
            <CardGrid columns={3}>
              {offerings.map((offering, index) => (
                <OfferingCard
                  key={index}
                  title={offering.title}
                  description={offering.description}
                />
              ))}
            </CardGrid>
          </div>
        )}

        {/* Technologien & Lösungen */}
        {techInfo && (
          <div className={styles.techInfo}>
            <CardGrid columns={2}>
              {techInfo.map((box, index) => (
                <TechInfoBox key={index} title={box.title} items={box.items} />
              ))}
            </CardGrid>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceSection;
