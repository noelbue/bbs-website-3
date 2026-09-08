import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import * as styles from "./ThemeToggle.module.css";

const STORAGE_KEY = "bbs-theme";

const currentTheme = () => {
  if (typeof document === "undefined") return "light";
  const explicit = document.documentElement.dataset.theme;
  if (explicit === "dark" || explicit === "light") return explicit;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

/**
 * Hell/Dunkel-Schalter. Die Wahl landet als data-theme auf <html> und in
 * localStorage; gatsby-ssr.js setzt sie vor dem ersten Paint wieder.
 */
const ThemeToggle = ({ className = "" }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setTheme(currentTheme());
    // Solange keine explizite Wahl getroffen wurde, folgt das CSS der
    // Systemeinstellung. Der Button muss diesem Wechsel folgen, sonst zeigt er
    // nach einem Systemwechsel die falsche Beschriftung an.
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      if (!document.documentElement.dataset.theme) setTheme(currentTheme());
    };
    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, []);

  const toggle = () => {
    // Vom tatsächlich wirksamen Modus ausgehen, nicht vom zuletzt gerenderten.
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch (error) {
      // Speicher nicht verfügbar (privater Modus): Wahl gilt nur für diese Seite
    }
    setTheme(next);
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={`${styles.toggle} ${className}`}
      onClick={toggle}
      aria-label={isDark ? "Helles Design aktivieren" : "Dunkles Design aktivieren"}
      aria-pressed={isDark}
      title={isDark ? "Hell" : "Dunkel"}
    >
      <span className={styles.icon} aria-hidden="true">
        {isDark ? <Sun size={17} /> : <Moon size={17} />}
      </span>
    </button>
  );
};

export default ThemeToggle;
