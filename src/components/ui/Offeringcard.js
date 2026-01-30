import * as styles from "./OfferingCard.module.css";

const OfferingCard = ({ title, description }) => {
  return (
    <div className={styles.offeringCard}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default OfferingCard;
