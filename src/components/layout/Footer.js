import React from "react";
import { Link } from "gatsby";
import * as styles from "./Footer.module.css";

// Beim Build gesetzt (siehe gatsby-config.js) und in das Client-Bundle
// eingebettet: ein erst im Browser berechnetes Jahr weicht nach einem
// Jahreswechsel vom statisch gerenderten HTML ab (Hydration-Mismatch).
const currentYear = Number(process.env.GATSBY_BUILD_YEAR) || new Date().getFullYear();

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
