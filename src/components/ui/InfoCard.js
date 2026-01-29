import React from "react";
import * as styles from "./InfoCard.module.css";

const InfoCard = ({ icon, title, description }) => {
  return (
    <div className={styles.infoCard}>
      {icon && <div className={styles.iconBox}>{icon}</div>}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default InfoCard;
