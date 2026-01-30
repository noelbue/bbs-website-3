import React from "react";
import * as styles from "./ProcessStep.module.css";

const ProcessStep = ({ number, title, description }) => {
  return (
    <div className={styles.processStep}>
      <div className={styles.number}>{number}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default ProcessStep;
