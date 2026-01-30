import React from "react";
import { Zap, Layers, Network, Brain, Briefcase } from "lucide-react";
import * as styles from "./ServiceNav.module.css";

const ServiceNav = () => {
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
        <p className={styles.navTitle}>Schnell zum richtigen Service</p>
        <div className={styles.navWrapper}>
          {navItems.map((item, index) => (
            <a key={index} href={item.href} className={styles.navItem}>
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
