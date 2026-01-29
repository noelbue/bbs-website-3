import React from "react";
import * as styles from "./ServiceCard.module.css";

const ServiceCard = ({ icon, title, subtitle, description, href }) => {
  const CardContent = () => (
    <>
      {icon && <div className={styles.serviceIcon}>{icon}</div>}
      <h3>{title}</h3>
      {subtitle && <p className={styles.serviceSubtitle}>{subtitle}</p>}
      <p>{description}</p>
    </>
  );

  if (href) {
    return (
      <a href={href} className={styles.serviceCard}>
        <CardContent />
      </a>
    );
  }

  return (
    <div className={styles.serviceCard}>
      <CardContent />
    </div>
  );
};

export default ServiceCard;
