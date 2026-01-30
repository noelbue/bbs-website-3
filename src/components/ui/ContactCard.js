import React from "react";
import * as styles from "./ContactCard.module.css";

const ContactCard = ({ icon, title, value, href, description }) => {
  const content = (
    <>
      <div className={styles.iconBox}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.value}>{value}</p>
      <p className={styles.description}>{description}</p>
    </>
  );

  if (href) {
    return (
      <a href={href} className={styles.contactCard}>
        {content}
      </a>
    );
  }

  return <div className={styles.contactCard}>{content}</div>;
};

export default ContactCard;
