import React from "react";
import { Link } from "gatsby";
import * as styles from "./Breadcrumb.module.css";

const Breadcrumb = ({ items }) => {
  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <ol className={styles.breadcrumbList}>
        {items.map((item, index) => (
          <li key={index} className={styles.breadcrumbItem}>
            {index < items.length - 1 ? (
              <>
                <Link to={item.path} className={styles.breadcrumbLink}>
                  {item.label}
                </Link>
                <span className={styles.breadcrumbSeparator}>›</span>
              </>
            ) : (
              <span className={styles.breadcrumbCurrent}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
