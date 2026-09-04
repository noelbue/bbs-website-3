import React from "react";
import * as styles from "./Chip.module.css";

const Chip = ({ children, tone = "white", inverse = false, className = "" }) => {
  const classes = [
    styles.chip,
    tone === "soft" ? styles.soft : "",
    inverse ? styles.inverse : "",
    className,
  ]
    .join(" ")
    .trim();
  return <span className={classes}>{children}</span>;
};

export default Chip;
