import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import * as styles from "./Navigation.module.css";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img
            src="/images/bbs-logo.svg"
            alt="Bürgler Business Solutions"
            width="48"
            height="48"
          />
        </Link>

        <ul className={styles.menu}>
          <li>
            <Link
              to="/"
              className={styles.menuLink}
              activeClassName={styles.active}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className={styles.menuLink}
              activeClassName={styles.active}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/ueber-mich"
              className={styles.menuLink}
              activeClassName={styles.active}
            >
              Über mich
            </Link>
          </li>
          <li>
            <Link
              to="/kontakt"
              className={styles.menuLink}
              activeClassName={styles.active}
            >
              Kontakt
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
