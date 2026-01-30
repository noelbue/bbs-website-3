import React from "react";
import * as styles from "./PassionCard.module.css";

const PassionCard = ({ icon, title, description }) => {
  return (
    <div className={styles.passionCard}>
      <div className={styles.iconBox}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default PassionCard;
