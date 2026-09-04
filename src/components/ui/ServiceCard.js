import React from "react";
import { ArrowUpRight } from "lucide-react";
import Chip from "./Chip";
import * as styles from "./ServiceCard.module.css";

/**
 * Service-Karte. Der Link liegt auf dem Titel und deckt per ::after die ganze
 * Karte ab – Text bleibt markierbar, Screenreader lesen den Titel.
 */
const ServiceCard = ({
  icon,
  kicker,
  title,
  description,
  tags = [],
  href,
  featured = false,
  className = "",
}) => {
  return (
    <article
      className={`${styles.card} ${featured ? styles.featured : ""} ${className}`}
      data-reveal
    >
      <div className={styles.top}>
        {icon && <span className={styles.icon}>{icon}</span>}
        {href && (
          <span className={styles.arrow} aria-hidden="true">
            <ArrowUpRight size={16} />
          </span>
        )}
      </div>
      {kicker && <span className={styles.kicker}>{kicker}</span>}
      <h3 className={styles.title}>
        {href ? (
          <a href={href} className={styles.link}>
            {title}
          </a>
        ) : (
          title
        )}
      </h3>
      <p className={styles.text}>{description}</p>
      {tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map((tag) => (
            <Chip key={tag} inverse={featured}>
              {tag}
            </Chip>
          ))}
        </div>
      )}
    </article>
  );
};

export default ServiceCard;
