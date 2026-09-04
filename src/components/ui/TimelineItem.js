import React from "react";
import Chip from "./Chip";
import * as styles from "./TimelineItem.module.css";

const TimelineItem = ({
  period,
  location,
  company,
  logo,
  url,
  title,
  description,
  tags = [],
  current = false,
}) => {
  const logoNode = logo ? (
    <img src={logo} alt="" className={styles.logo} loading="lazy" />
  ) : null;
  const companyRow = url ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.companyLink}
      title={`${company} (öffnet in neuem Tab)`}
    >
      {logoNode}
      <span className={styles.company}>{company}</span>
    </a>
  ) : (
    <span className={styles.companyLink}>
      {logoNode}
      {company && <span className={styles.company}>{company}</span>}
    </span>
  );

  return (
    <li className={`${styles.item} ${current ? styles.current : ""}`} data-reveal>
      <div className={styles.when}>
        {period && <span className={styles.period}>{period}</span>}
        {location && <span className={styles.location}>{location}</span>}
      </div>
      <div className={styles.rail} aria-hidden="true">
        <i />
      </div>
      <div className={styles.body}>
        <div className={styles.companyRow}>{companyRow}</div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.text}>{description}</p>
        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag) => (
              <Chip key={tag} tone="soft">
                {tag}
              </Chip>
            ))}
          </div>
        )}
      </div>
    </li>
  );
};

export default TimelineItem;
