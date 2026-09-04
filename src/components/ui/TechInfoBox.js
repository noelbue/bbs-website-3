import React from "react";
import Chip from "./Chip";
import * as styles from "./TechInfoBox.module.css";

/**
 * variant "chips": Tech-Stack als Chip-Zeile.
 * variant "note": kompakte Hinweisbox mit Akzentkante.
 */
const TechInfoBox = ({ title, items = [], variant = "note" }) => {
  if (variant === "chips") {
    return (
      <div className={styles.chips} data-reveal>
        <span className={styles.label}>{title}</span>
        <div className={styles.chipList}>
          {items.map((item) => (
            <Chip key={item} tone="soft">
              {item}
            </Chip>
          ))}
        </div>
      </div>
    );
  }

  return (
    <aside className={styles.note} data-reveal>
      <span className={styles.noteTitle}>{title}</span>
      <ul className={styles.noteList}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
};

export default TechInfoBox;
