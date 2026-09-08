import React, { useEffect, useRef, useState } from "react";
import { Clock, Check } from "lucide-react";
import { usePageVisible, useReducedMotion } from "../../hooks/motion";
import * as styles from "./ProcessFlow.module.css";

const AUTO_MS = 4000;

/**
 * Interaktiver Ablauf: Schritte als Stepper mit Fortschrittslinie, Details
 * darunter. Läuft automatisch weiter, bis der Besucher selbst klickt.
 */
const ProcessFlow = ({ steps = [] }) => {
  const [active, setActive] = useState(0);
  const [userPicked, setUserPicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reduceMotion = useReducedMotion();
  const pageVisible = usePageVisible();
  const tabRefs = useRef([]);
  // Tastaturfokus stoppt die Rotation wie Hover: sonst wandert der aktive Tab
  // unter dem fokussierten Element weg.
  const auto = !userPicked && !hovered && !focused && pageVisible;

  useEffect(() => {
    if (!auto || reduceMotion || steps.length < 2) return undefined;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % steps.length),
      AUTO_MS
    );
    return () => window.clearInterval(timer);
  }, [auto, reduceMotion, steps.length]);

  const select = (index) => {
    setUserPicked(true);
    setActive(index);
  };

  const handleKeyDown = (event) => {
    const forward = ["ArrowRight", "ArrowDown"].includes(event.key);
    const backward = ["ArrowLeft", "ArrowUp"].includes(event.key);
    if (!forward && !backward) return;
    event.preventDefault();
    const next = (active + (forward ? 1 : -1) + steps.length) % steps.length;
    select(next);
    tabRefs.current[next]?.focus();
  };

  const step = steps[active];
  if (!step) return null;
  const progress = steps.length > 1 ? (active / (steps.length - 1)) * 100 : 100;

  return (
    // Hover stoppt nur den Auto-Wechsel, löst keine Aktion aus – daher zulässig.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={styles.flow}
      data-reveal
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div className={styles.rail} aria-hidden="true">
        <span className={styles.railFill} style={{ width: `${progress}%` }} />
      </div>
      <div className={styles.steps} role="tablist" aria-label="Ablauf">
        {steps.map((item, index) => {
          const isActive = index === active;
          const isDone = index < active;
          return (
            <button
              key={item.number}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`process-tab-${index}`}
              aria-selected={isActive}
              aria-controls="process-panel"
              tabIndex={isActive ? 0 : -1}
              className={`${styles.step} ${isActive ? styles.stepActive : ""} ${isDone ? styles.stepDone : ""}`}
              onClick={() => select(index)}
              onKeyDown={handleKeyDown}
            >
              <span className={styles.marker}>
                {isDone ? <Check size={14} aria-hidden="true" /> : item.number}
              </span>
              <span className={styles.stepTitle}>{item.title}</span>
              {item.duration && (
                <span className={styles.stepMeta}>{item.duration}</span>
              )}
            </button>
          );
        })}
      </div>

      <div
        key={active}
        className={styles.panel}
        role="tabpanel"
        id="process-panel"
        aria-labelledby={`process-tab-${active}`}
        tabIndex={0}
      >
        <span className={styles.panelNumber}>{step.number}</span>
        <div className={styles.panelBody}>
          <h3 className={styles.panelTitle}>{step.title}</h3>
          <p className={styles.panelText}>{step.description}</p>
          <div className={styles.panelMeta}>
            {step.duration && (
              <span>
                <Clock size={14} aria-hidden="true" />
                {step.duration}
              </span>
            )}
            {step.outcome && (
              <span>
                <Check size={14} aria-hidden="true" />
                {step.outcome}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessFlow;
