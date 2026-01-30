import * as styles from "./WhyUsCard.module.css";

const WhyUsCard = ({ icon, title, description, href }) => {
  const CardContent = () => (
    <>
      {icon && <div className={styles.whyUsIcon}>{icon}</div>}
      <h3>{title}</h3>
      <p>{description}</p>
    </>
  );

  if (href) {
    return (
      <a href={href} className={styles.whyUsCard}>
        <CardContent />
      </a>
    );
  }

  return (
    <div className={styles.whyUsCard}>
      <CardContent />
    </div>
  );
};

export default WhyUsCard;
