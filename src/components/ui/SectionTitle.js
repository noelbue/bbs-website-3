import React from "react";
import * as styles from "./SectionTitle.module.css";

const SectionTitle = ({
  children,
  eyebrow,
  subtitle,
  align = "center",
  className = "",
  id,
  as: Tag = "h2",
}) => {
  return (
    <div
      className={`${styles.wrap} ${align === "left" ? styles.left : styles.center} ${className}`}
      data-reveal
    >
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <Tag className={styles.sectionTitle} id={id}>
        {children}
      </Tag>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;
