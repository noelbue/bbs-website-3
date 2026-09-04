import React from "react";
import SectionTitle from "../ui/SectionTitle";
import OfferingCard from "../ui/OfferingCard";
import TechInfoBox from "../ui/TechInfoBox";
import ServiceCta from "./ServiceCta";
import { getIcon } from "../ui/icons";
import * as styles from "./ServiceSection.module.css";

const ServiceSection = ({
  id,
  category,
  title,
  subtitle,
  offerings = [],
  techInfo = [],
  cta,
}) => {
  // Chip-Zeile zuerst, Hinweis daneben
  const sortedTechInfo = [...techInfo].sort(
    (a, b) =>
      (a.variant === "chips" ? 0 : 1) - (b.variant === "chips" ? 0 : 1)
  );

  return (
    <section id={id} className={styles.serviceSection}>
      <div className="container">
        <SectionTitle eyebrow={category} subtitle={subtitle} align="left">
          {title}
        </SectionTitle>

        {offerings.length > 0 && (
          <div className={styles.offerGrid}>
            <h3 className="sr-only">Was ich anbiete</h3>
            {offerings.map((offering) => (
              <OfferingCard
                key={offering.title}
                icon={getIcon(offering.icon, 20)}
                title={offering.title}
                description={offering.description}
                result={offering.result}
              />
            ))}
          </div>
        )}

        {sortedTechInfo.length > 0 && (
          <div
            className={`${styles.techRow} ${sortedTechInfo.length === 1 ? styles.single : ""}`}
          >
            {sortedTechInfo.map((box) => (
              <TechInfoBox
                key={box.title}
                title={box.title}
                items={box.items}
                variant={box.variant}
              />
            ))}
          </div>
        )}

        {cta && <ServiceCta hook={cta.hook} subject={cta.subject} note={cta.note} />}
      </div>
    </section>
  );
};

export default ServiceSection;
