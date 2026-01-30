import React from "react";
import { Link } from "gatsby";
import * as styles from "./Footer.module.css";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <p>
            © {currentYear} Bürgler Business Solutions (CHE-258.321.787)
            <br />
            <Link to="/impressum">Impressum</Link> |{" "}
            <Link to="/datenschutz">Datenschutz</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
