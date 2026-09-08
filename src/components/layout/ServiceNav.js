import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Zap,
  Layers,
  Plug,
  Sparkles,
  Compass,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import * as styles from "./ServiceNav.module.css";

const navItems = [
  { id: "publishing-automation", icon: Zap, label: "Publishing-Automatisierung" },
  { id: "content-management", icon: Layers, label: "Web & Web-Apps" },
  { id: "system-integration", icon: Plug, label: "System-Integration" },
  { id: "ai-publishing", icon: Sparkles, label: "KI & Schulungen" },
  { id: "consulting", icon: Compass, label: "Beratung" },
];

const ServiceNav = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef(null);

  // Auf Mobile ist die Liste eingeklappt: dann Links aus der Tab-Reihenfolge nehmen
  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    const closeOnHash = () => setIsExpanded(false);
    window.addEventListener("hashchange", closeOnHash);
    return () => {
      media.removeEventListener("change", update);
      window.removeEventListener("hashchange", closeOnHash);
    };
  }, []);

  // Scroll-Spy: aktiv ist die letzte Sektion, deren Oberkante unter der
  // Sprungnavigation liegt; unterhalb der letzten Sektion ist nichts aktiv.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);
    if (!sections.length) return undefined;

    const update = () => {
      const navBottom = navRef.current
        ? navRef.current.getBoundingClientRect().bottom
        : 140;
      const probe = navBottom + 24;
      let current = null;
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= probe && rect.bottom > probe) current = section.id;
      });
      setActiveId(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const collapsedOnMobile = isMobile && !isExpanded;

  return (
    <nav className={styles.serviceNav} aria-label="Service-Bereiche" ref={navRef}>
      <div className="container">
        <button
          className={styles.toggleButton}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls="service-nav-list"
        >
          <span>Schnell zum richtigen Service</span>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        <div
          id="service-nav-list"
          className={`${styles.navWrapper} ${isExpanded ? styles.expanded : styles.collapsed}`}
          aria-hidden={collapsedOnMobile ? "true" : undefined}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                aria-current={isActive ? "true" : undefined}
                tabIndex={collapsedOnMobile ? -1 : undefined}
                onClick={() => setIsExpanded(false)}
              >
                <span className={styles.navIcon}>
                  <Icon size={18} aria-hidden="true" />
                </span>
                <span className={styles.navLabel}>{item.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default ServiceNav;
