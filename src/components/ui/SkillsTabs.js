import React, { useRef, useState } from "react";
import Chip from "./Chip";
import { getIcon } from "./icons";
import * as styles from "./SkillsTabs.module.css";

const TIERS = [
  { key: "core", label: "Kern", hint: "Tägliche Praxis" },
  { key: "solid", label: "Solide", hint: "Regelmässig im Einsatz" },
  { key: "basic", label: "Basis", hint: "Kenntnisse vorhanden" },
];

/**
 * "Werkbank": Kategorien als Tabs, rechts die Werkzeuge nach Tiefe gruppiert.
 * Tastatur: Pfeiltasten wechseln den Tab (WAI-ARIA Tabs Pattern).
 */
const SkillsTabs = ({ categories = [] }) => {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const current = categories[active];

  const countOf = (category) =>
    TIERS.reduce((sum, tier) => sum + (category.tiers?.[tier.key]?.length || 0), 0);

  const handleKeyDown = (event) => {
    const forward = ["ArrowDown", "ArrowRight"].includes(event.key);
    const backward = ["ArrowUp", "ArrowLeft"].includes(event.key);
    if (!forward && !backward) return;
    event.preventDefault();
    const next = (active + (forward ? 1 : -1) + categories.length) % categories.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  if (!current) return null;

  return (
    <div className={styles.skills} data-reveal>
      <div
        className={styles.tabs}
        role="tablist"
        aria-label="Kategorien"
        aria-orientation="vertical"
      >
        {categories.map((category, index) => {
          const isActive = index === active;
          return (
            <button
              key={category.title}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`skills-tab-${index}`}
              aria-selected={isActive}
              aria-controls="skills-panel"
              tabIndex={isActive ? 0 : -1}
              className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
              onClick={() => setActive(index)}
              onKeyDown={handleKeyDown}
            >
              <span className={styles.tabIcon}>{getIcon(category.icon, 16)}</span>
              <span className={styles.tabLabel}>{category.title}</span>
              <span className={styles.count}>{countOf(category)}</span>
            </button>
          );
        })}
      </div>

      <div
        className={styles.pane}
        role="tabpanel"
        id="skills-panel"
        aria-labelledby={`skills-tab-${active}`}
        // Das WAI-Tabs-Pattern verlangt tabindex=0 auf einem Tabpanel ohne
        // fokussierbare Kinder, sonst führt Tab aus dem Widget heraus.
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
      >
        <h3 className={styles.paneTitle}>{current.title}</h3>
        {current.description && (
          <p className={styles.paneDesc}>{current.description}</p>
        )}
        {TIERS.map((tier, index) => {
          const items = current.tiers?.[tier.key] || [];
          if (!items.length) return null;
          return (
            <div
              key={tier.key}
              className={`${styles.tier} ${styles[`tier${index}`]}`}
            >
              <span className={styles.tierLabel}>
                <i aria-hidden="true" />
                <span>{tier.label}</span>
                <small>{tier.hint}</small>
              </span>
              <div className={styles.chips}>
                {items.map((item) => (
                  <Chip key={item} tone="soft">
                    {item}
                  </Chip>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsTabs;
