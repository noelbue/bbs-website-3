import React from "react";
import { Check } from "lucide-react";
import * as styles from "./SupportCard.module.css";

const SupportCard = ({ icon, title, description, points = [] }) => {
  return (
    <article className={styles.card} data-reveal>
      <div className={styles.head}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <div>
          <h3 className={styles.title}>{title}</h3>
          {description && <p className={styles.text}>{description}</p>}
        </div>
      </div>
      {points.length > 0 && (
        <ul className={styles.points}>
          {points.map((point) => (
            <li key={point}>
              <Check size={15} aria-hidden="true" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};

export default SupportCard;
