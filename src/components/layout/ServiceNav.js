import { useState, useEffect } from "react";
import {
  Zap,
  Layers,
  Network,
  Brain,
  Briefcase,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import * as styles from "./ServiceNav.module.css";

const ServiceNav = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        setIsExpanded(false);
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const navItems = [
    {
      icon: <Zap size={20} />,
      label: "Publishing-Automatisierung",
      href: "#publishing-automation",
    },
    {
      icon: <Layers size={20} />,
      label: "Content & Web",
      href: "#content-management",
    },
    {
      icon: <Network size={20} />,
      label: "System-Integration",
      href: "#system-integration",
    },
    {
      icon: <Brain size={20} />,
      label: "KI-Publishing",
      href: "#ai-publishing",
    },
    {
      icon: <Briefcase size={20} />,
      label: "Beratung",
      href: "#consulting",
    },
  ];

  return (
    <nav className={styles.serviceNav}>
      <div className="container">
        <button
          className={styles.toggleButton}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
        >
          <span>Schnell zum richtigen Service</span>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        <div
          className={`${styles.navWrapper} ${isExpanded ? styles.expanded : styles.collapsed}`}
        >
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={styles.navItem}
              onClick={() => setIsExpanded(false)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default ServiceNav;
