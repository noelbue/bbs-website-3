import * as styles from "./SkillsGrid.module.css";

const SkillsGrid = ({ categories }) => {
  return (
    <div className={styles.skillsGrid}>
      {categories.map((category, index) => (
        <div key={index} className={styles.category}>
          <h3 className={styles.categoryTitle}>{category.title}</h3>
          <ul className={styles.skillsList}>
            {category.skills.map((skill, skillIndex) => (
              <li key={skillIndex} className={styles.skill}>
                {skill}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SkillsGrid;
