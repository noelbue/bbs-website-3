import React from "react";
import * as styles from "./TrustStrip.module.css";

/**
 * Kunden- und Partnerlogos als Endlos-Laufband (rechts nach links).
 * Hover pausiert, Logos verlinken auf die Firmenwebsite. Bei reduced-motion
 * steht das Band still und bricht um.
 */
const TrustStrip = ({ label = "Vertraut von", items = [], note }) => {
  const renderMark = (item, copy) =>
    item.logo ? (
      <img
        src={item.logo}
        alt={copy > 0 ? "" : item.name}
        className={styles.logo}
        style={item.height ? { height: `${item.height}px` } : undefined}
        loading="lazy"
      />
    ) : (
      <span className={styles.wordmark}>{item.name}</span>
    );

  const renderItem = (item, copy) => (
    <li key={`${copy}-${item.name}`} className={styles.item}>
      {item.url ? (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          title={`${item.name} (öffnet in neuem Tab)`}
          tabIndex={copy > 0 ? -1 : undefined}
        >
          {renderMark(item, copy)}
        </a>
      ) : (
        renderMark(item, copy)
      )}
    </li>
  );

  return (
    <div className={styles.strip} data-reveal>
      <div className={styles.head}>
        <span className={styles.label}>{label}</span>
        {note && <span className={styles.note}>{note}</span>}
      </div>
      <div className={styles.marquee}>
        <div className={styles.track}>
          {[0, 1, 2, 3].map((copy) => (
            <ul
              key={copy}
              className={styles.copy}
              aria-hidden={copy > 0 ? "true" : undefined}
            >
              {items.map((item) => renderItem(item, copy))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustStrip;
