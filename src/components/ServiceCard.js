import React from "react";
import * as styles from "./ServiceCard.module.css";

const ServiceCard = ({ icon, title, subtitle, description }) => {
  return (
    <div className={styles.serviceCard}>
      {icon && <div className={styles.serviceIcon}>{icon}</div>}
      <h3>{title}</h3>
      {subtitle && <p className={styles.serviceSubtitle}>{subtitle}</p>}
      <p>{description}</p>
    </div>
  );
};

export default ServiceCard;
