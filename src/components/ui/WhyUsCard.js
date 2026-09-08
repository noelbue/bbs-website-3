import React from "react";
import SmartLink from "./SmartLink";
import * as styles from "./WhyUsCard.module.css";

const WhyUsCard = ({ icon, title, description, href }) => {
  const CardContent = () => (
    <>
      {icon && <div className={styles.whyUsIcon}>{icon}</div>}
      <h3>{title}</h3>
      <p>{description}</p>
    </>
  );

  if (href) {
    return (
      <SmartLink href={href} className={styles.whyUsCard}>
        <CardContent />
      </SmartLink>
    );
  }

  return (
    <div className={styles.whyUsCard}>
      <CardContent />
    </div>
  );
};

export default WhyUsCard;
