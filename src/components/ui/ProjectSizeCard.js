import React from "react";
import Chip from "./Chip";
import * as styles from "./ProjectSizeCard.module.css";

const LEVELS = { S: 1, M: 2, L: 3 };

const ProjectSizeCard = ({ size, title, duration, description, examples = [] }) => {
  const level = LEVELS[size] || 1;
  return (
    <article className={styles.card} data-reveal>
      <div className={styles.top}>
        <span className={styles.size}>{size}</span>
        {duration && <span className={styles.duration}>{duration}</span>}
      </div>
      <div className={styles.meter} aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <i key={n} className={n <= level ? styles.on : ""} />
        ))}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{description}</p>
      {examples.length > 0 && (
        <div className={styles.examples}>
          {examples.map((example) => (
            <Chip key={example}>{example}</Chip>
          ))}
        </div>
      )}
    </article>
  );
};

export default ProjectSizeCard;
