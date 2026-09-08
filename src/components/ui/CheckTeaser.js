import React from "react";
import { Gauge, ShieldCheck, Scale, Sparkles, ArrowRight } from "lucide-react";
import Button from "./Button";
import SmartLink from "./SmartLink";
import * as styles from "./CheckTeaser.module.css";

const ICONS = { Gauge, ShieldCheck, Scale, Sparkles };

/** Prominenter Hinweis auf den kostenlosen Website-Check auf der Startseite. */
const CheckTeaser = ({ data }) => {
  if (!data) return null;
  return (
    <section className={styles.section} id="website-check-teaser" aria-labelledby="check-teaser-title">
      <div className="container">
        <div className={styles.band} data-reveal>
          <div className={styles.text}>
            <span className={styles.eyebrow}>{data.eyebrow}</span>
            <h2 className={styles.title} id="check-teaser-title">
              {data.title}
            </h2>
            <p className={styles.lead}>{data.text}</p>
            <div className={styles.action}>
              <Button href={data.cta.href} variant="primary" icon>
                {data.cta.text}
              </Button>
              <span className={styles.note}>{data.note}</span>
            </div>
          </div>
          <SmartLink href={data.cta.href} className={styles.preview} aria-label={data.cta.text}>
            <span className={styles.previewHead}>
              <span className={styles.previewLabel}>Beispiel-Ergebnis</span>
              <span className={styles.previewScore}>
                <strong>{data.preview.score}</strong> / 100
              </span>
            </span>
            <ul className={styles.areas}>
              {data.preview.areas.map((area) => {
                const Icon = ICONS[area.icon] || Gauge;
                return (
                  <li key={area.label} className={styles.area}>
                    <span className={styles.areaIcon}>
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <span className={styles.areaLabel}>{area.label}</span>
                    <span className={`${styles.areaValue} ${area.ok ? styles.ok : styles.warn}`}>
                      {area.value}
                    </span>
                  </li>
                );
              })}
            </ul>
            <span className={styles.previewFoot}>
              Report öffnen <ArrowRight size={14} aria-hidden="true" />
            </span>
          </SmartLink>
        </div>
      </div>
    </section>
  );
};

export default CheckTeaser;
