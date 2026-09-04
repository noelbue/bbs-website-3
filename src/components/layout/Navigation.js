import React from "react";
import { useState, useEffect } from "react";
import { Link } from "gatsby";
import Button from "../ui/Button";
import ThemeToggle from "../ui/ThemeToggle";
import * as styles from "./Navigation.module.css";

const menuItems = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/ueber-mich", label: "Über mich" },
  { to: "/kontakt", label: "Kontakt" },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <nav className={styles.container} aria-label="Hauptnavigation">
        <Link to="/" className={styles.logo}>
          <img
            src="/images/bbs-logo.svg"
            alt="Bürgler Business Solutions"
            width="48"
            height="48"
            className={styles.logoLight}
          />
          <img
            src="/images/bbs-logo-dark.svg"
            alt=""
            width="48"
            height="48"
            className={styles.logoDark}
            aria-hidden="true"
          />
        </Link>

        <button
          className={`${styles.hamburger} ${mobileMenuOpen ? styles.open : ""}`}
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Menü schliessen" : "Menü öffnen"}
          aria-expanded={mobileMenuOpen}
          aria-controls="main-menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul
          id="main-menu"
          className={`${styles.menu} ${mobileMenuOpen ? styles.mobileOpen : ""}`}
        >
          {menuItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={styles.menuLink}
                activeClassName={styles.active}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className={styles.themeItem}>
            <ThemeToggle />
          </li>
          <li className={styles.ctaItem}>
            <Button href="/kontakt" variant="primary" size="sm" icon>
              Projekt besprechen
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
