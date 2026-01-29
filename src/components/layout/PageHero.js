import React from "react";
import Breadcrumb from "../ui/Breadcrumb";
import * as styles from "./PageHero.module.css";

const PageHero = ({ breadcrumbItems, title, subtitle }) => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}></div>
      <div className={styles.heroContent}>
        <Breadcrumb items={breadcrumbItems} />
        <h1 className={styles.heroTitle}>{title}</h1>
        {subtitle && <p className={styles.heroSubtitle}>{subtitle}</p>}
      </div>
    </section>
  );
};

export default PageHero;
