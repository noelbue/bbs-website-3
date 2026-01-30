import * as styles from "./SectionTitle.module.css";

const SectionTitle = ({ children, className = "" }) => {
  return <h2 className={`${styles.sectionTitle} ${className}`}>{children}</h2>;
};

export default SectionTitle;
