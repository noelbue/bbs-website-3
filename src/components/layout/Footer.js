import * as styles from "./Footer.module.css";

const currentYear = new Date().getFullYear();
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <p>© {currentYear} Bürgler Business Solutions (CHE-258.321.787)</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
