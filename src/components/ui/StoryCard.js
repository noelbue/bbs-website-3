import * as styles from "./StoryCard.module.css";

const StoryCard = ({ title, description }) => {
  return (
    <div className={styles.storyCard}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default StoryCard;
