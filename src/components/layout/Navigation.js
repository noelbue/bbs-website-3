import { useState, useEffect } from "react";
import { Link } from "gatsby";
import * as styles from "./Navigation.module.css";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

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

        <button
          className={`${styles.hamburger} ${mobileMenuOpen ? styles.open : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul
          className={`${styles.menu} ${mobileMenuOpen ? styles.mobileOpen : ""}`}
        >
          <li>
            <Link
              to="/"
              className={styles.menuLink}
              activeClassName={styles.active}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className={styles.menuLink}
              activeClassName={styles.active}
              onClick={closeMobileMenu}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/ueber-mich"
              className={styles.menuLink}
              activeClassName={styles.active}
              onClick={closeMobileMenu}
            >
              Über mich
            </Link>
          </li>
          <li>
            <Link
              to="/kontakt"
              className={styles.menuLink}
              activeClassName={styles.active}
              onClick={closeMobileMenu}
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
