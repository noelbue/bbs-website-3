import React, { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "../../hooks/motion";
import * as styles from "./TypedHeadline.module.css";

/** Zerlegt "Text mit |Akzent| Wort" in Volltext und Akzentbereich. */
const parse = (raw) => {
  const parts = raw.split("|");
  let full = "";
  let accent = null;
  parts.forEach((part, i) => {
    if (i % 2 === 1) accent = [full.length, full.length + part.length];
    full += part;
  });
  return { full, accent };
};

const DELETE_MS = 14;
const TYPE_MS = 26;

/**
 * Headline, die sich bei Textwechsel wie getippt neu schreibt: gemeinsamer
 * Anfang bleibt, der Rest wird gelöscht und neu getippt. Startet immer beim
 * gerade sichtbaren Text. Serverseitig und bei reduced-motion steht der Text
 * sofort vollständig da.
 */
const TypedHeadline = ({ text }) => {
  const target = useMemo(() => parse(text), [text]);
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(target.full);
  const [accent, setAccent] = useState(target.accent);
  const [typing, setTyping] = useState(false);
  const current = useRef(target.full);

  useEffect(() => {
    if (current.current === target.full) {
      setAccent(target.accent);
      setTyping(false);
      return undefined;
    }
    if (reduce) {
      current.current = target.full;
      setShown(target.full);
      setAccent(target.accent);
      setTyping(false);
      return undefined;
    }

    let cancelled = false;
    let timer;
    setTyping(true);

    const step = () => {
      if (cancelled) return;
      const text = current.current;
      if (text.length > 0 && !target.full.startsWith(text)) {
        current.current = text.slice(0, -1);
        setShown(current.current);
        timer = window.setTimeout(step, DELETE_MS);
      } else if (text.length < target.full.length) {
        setAccent(target.accent);
        current.current = target.full.slice(0, text.length + 1);
        setShown(current.current);
        timer = window.setTimeout(step, TYPE_MS);
      } else {
        setAccent(target.accent);
        setTyping(false);
      }
    };

    timer = window.setTimeout(step, 120);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [target, reduce]);

  const [a, b] = accent || [0, 0];
  const pre = shown.slice(0, a);
  const mid = shown.slice(a, b);
  const post = shown.slice(b);

  return (
    <span className={styles.wrap}>
      {pre}
      {mid && <em className={styles.accent}>{mid}</em>}
      {post}
      <span
        className={`${styles.caret} ${typing ? styles.caretOn : ""}`}
        aria-hidden="true"
      />
    </span>
  );
};

export default TypedHeadline;
