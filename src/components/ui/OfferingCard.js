import React from "react";
import { Check } from "lucide-react";
import * as styles from "./OfferingCard.module.css";

const OfferingCard = ({ icon, title, description, result }) => {
  return (
    <article className={styles.card} data-reveal>
      <div className={styles.row}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <h3 className={styles.title}>{title}</h3>
      </div>
      <p className={styles.text}>{description}</p>
      {result && (
        <span className={styles.result}>
          <Check size={14} aria-hidden="true" />
          {result}
        </span>
      )}
    </article>
  );
};

export default OfferingCard;
