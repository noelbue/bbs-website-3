import React from "react";
import * as styles from "./AboutIntro.module.css";

const AboutIntro = ({ greeting, subtitle, description, image }) => {
  return (
    <div className={styles.aboutIntro}>
      <div className={styles.imageContainer}>
        <img src={image} alt={greeting} />
      </div>
      <div className={styles.content}>
        <h2 className={styles.greeting}>{greeting}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default AboutIntro;
