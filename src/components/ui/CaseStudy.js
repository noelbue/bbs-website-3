import React from "react";
import Button from "./Button";
import Chip from "./Chip";
import * as styles from "./CaseStudy.module.css";

/**
 * Success Story: Ausgangslage, Vorgehen, Ergebnis für ein Kundenprojekt.
 * Wird nur gerendert, wenn in den Daten enabled: true steht (Freigabe des Kunden).
 */
const CaseStudy = ({ data }) => {
  if (!data || !data.enabled) return null;
  return (
    <section className={styles.section} id="success-story">
      <div className="container">
        <div className={styles.card} data-reveal>
          <div className={styles.head}>
            <span className={styles.eyebrow}>{data.eyebrow}</span>
            <span className={styles.client}>
              {data.client}
              {data.via && <span className={styles.via}> · {data.via}</span>}
            </span>
          </div>
          <h2 className={styles.title}>{data.title}</h2>
          <ol className={styles.blocks}>
            {data.blocks.map((block, index) => (
              <li key={block.label} className={styles.block}>
                <span className={styles.step}>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className={styles.blockTitle}>{block.label}</h3>
                  <p className={styles.blockText}>{block.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className={styles.foot}>
            <div className={styles.tags}>
              {data.tags.map((tag) => (
                <Chip key={tag} tone="soft">
                  {tag}
                </Chip>
              ))}
            </div>
            <div className={styles.actions}>
              {data.note && <span className={styles.note}>{data.note}</span>}
              <Button href={data.cta.href} variant="primary" icon>
                {data.cta.text}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
