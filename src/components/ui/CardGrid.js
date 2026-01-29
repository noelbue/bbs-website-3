import React from "react";
import * as styles from "./CardGrid.module.css";

const CardGrid = ({ children, columns = "auto", className = "" }) => {
  const gridClass =
    columns === 2
      ? styles.gridTwo
      : columns === 3
        ? styles.gridThree
        : styles.gridAuto;

  return (
    <div className={`${styles.cardGrid} ${gridClass} ${className}`}>
      {children}
    </div>
  );
};

export default CardGrid;
