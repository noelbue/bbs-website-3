import * as styles from "./TechInfoBox.module.css";

const TechInfoBox = ({ title, items }) => {
  return (
    <div className={styles.techBox}>
      <h3>{title}</h3>
      <div className={styles.content}>
        {items.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </div>
  );
};

export default TechInfoBox;
