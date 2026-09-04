import React, { useEffect } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import * as styles from "./Layout.module.css";

/**
 * Scroll-Reveal: Elemente mit data-reveal starten sichtbar (SSR),
 * nur was unterhalb des Viewports liegt wird kurz ausgeblendet und
 * beim Hereinscrollen gestaffelt eingeblendet.
 */
const useReveal = () => {
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return undefined;

    const elements = Array.from(document.querySelectorAll("[data-reveal]"));
    const viewportHeight = window.innerHeight;
    const pending = elements.filter(
      (el) => el.getBoundingClientRect().top > viewportHeight * 0.92
    );
    if (!pending.length) return undefined;

    pending.forEach((el) => {
      const siblings = Array.from(el.parentElement.children).filter((c) =>
        c.hasAttribute("data-reveal")
      );
      el.dataset.revealIndex = String(siblings.indexOf(el));
      el.classList.add("reveal-pending");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const index = Number(el.dataset.revealIndex || 0);
          const delay = Math.min(index, 6) * 60;
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("reveal-visible");
          observer.unobserve(el);
          // Nach dem Einblenden aufräumen, damit Hover-Transitions der Karte wieder gelten
          window.setTimeout(() => {
            el.classList.remove("reveal-pending", "reveal-visible");
            el.style.transitionDelay = "";
          }, delay + 600);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    pending.forEach((el) => observer.observe(el));

    // Sicherheitsnetz: was nach 5 s noch versteckt ist, wird sichtbar (Print, exotische Viewer)
    const safety = window.setTimeout(() => {
      pending.forEach((el) => el.classList.add("reveal-visible"));
    }, 5000);

    return () => {
      observer.disconnect();
      window.clearTimeout(safety);
    };
  }, []);
};

const Layout = ({ children }) => {
  useReveal();
  return (
    <div className={styles.layout}>
      <a href="#main" className="skip-link">
        Zum Inhalt
      </a>
      <Navigation />
      <main id="main" className={styles.main}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
