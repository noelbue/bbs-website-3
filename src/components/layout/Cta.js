import Button from "../ui/Button";
import * as styles from "./CTA.module.css";

const CTA = ({ title, description, primaryButton, secondaryButton }) => {
  return (
    <section className={styles.cta}>
      <div className="container">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className={styles.ctaButtons}>
          <Button href={primaryButton.href} variant="primary">
            {primaryButton.text}
          </Button>
          <Button href={secondaryButton.href} variant="secondary">
            {secondaryButton.text}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
