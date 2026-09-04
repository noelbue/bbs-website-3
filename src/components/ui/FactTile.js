import React from "react";
import * as styles from "./FactTile.module.css";

/** Kompakte Kachel mit grossem Icon, optionalem Titel und kurzem Text. */
const FactTile = ({ icon, title, text }) => {
  return (
    <div className={styles.tile} data-reveal>
      <span className={styles.icon}>{icon}</span>
      <div className={styles.body}>
        {title && <h3 className={styles.title}>{title}</h3>}
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
};

export default FactTile;
