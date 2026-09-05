import React, { useEffect, useMemo, useState } from "react";
import { usePageVisible, useReducedMotion } from "../../hooks/motion";
import * as styles from "./WorkflowDiagram.module.css";

/**
 * Publishing-Workflows als Inline-SVG. Jedes Szenario beschreibt Ebenen
 * (Quellen → Engine → Ausgaben, beliebig viele Knoten). Die Szenarien
 * wechseln im Loop, Hover pausiert, reduced-motion zeigt nur das erste.
 * Über onChange erfährt die Umgebung (Hero-Headline) den Wechsel.
 */
export const SCENARIOS = [
  {
    title: "Content-First Publishing",
    headline: "Publishing, das |von selbst| läuft.",
    caption: "BEST OF BREED · JEDES SYSTEM MACHT, WAS ES AM BESTEN KANN",
    // `to` verbindet einen Knoten nur mit bestimmten Knoten der nächsten Ebene
    // (Index), sonst mit allen. InDesign Server liefert nur Print.
    layers: [
      [{ tag: "QUELLE", name: "Headless CMS" }, { tag: "QUELLE", name: "DAM-System" }],
      [{ tag: "MIDDLEWARE", name: "Content-Hub", hot: true }],
      [
        { tag: "PRINT", name: "InDesign Server", to: [0] },
        { tag: "DIGITAL", name: "GraphQL / REST", to: [1] },
      ],
      [{ tag: "OUTPUT", name: "Print-PDF" }, { tag: "OUTPUT", name: "Web & App" }],
    ],
  },
  {
    title: "Website & App",
    headline: "Websites und Apps aus |einer| Quelle.",
    caption: "EIN INHALT · VIELE KANÄLE · PER API",
    layers: [
      [{ tag: "QUELLE", name: "Headless CMS" }],
      [{ tag: "API", name: "GraphQL / REST", hot: true }],
      [{ tag: "OUTPUT", name: "Website" }, { tag: "OUTPUT", name: "Mobile App" }],
    ],
  },
  {
    title: "Katalog-Automation",
    headline: "Kataloge in |Minuten| statt Tagen.",
    caption: "PRODUKTDATEN REIN · FERTIGER KATALOG RAUS",
    layers: [
      [{ tag: "QUELLE", name: "PIM-Daten" }, { tag: "QUELLE", name: "Bilder (DAM)" }],
      [{ tag: "ENGINE", name: "EasyCatalog", hot: true }],
      [{ tag: "OUTPUT", name: "Katalog-PDF" }],
    ],
  },
  {
    title: "Redaktion & Druck",
    headline: "Druckdaten, die sich |selbst| prüfen.",
    caption: "ENFOCUS SWITCH ORCHESTRIERT · 24/7",
    layers: [
      [{ tag: "QUELLE", name: "Redaktion K4" }],
      [{ tag: "WORKFLOW", name: "Enfocus Switch", hot: true }],
      [{ tag: "SCHRITT", name: "Preflight" }],
      [{ tag: "OUTPUT", name: "Druckerei" }],
    ],
  },
  {
    title: "KI im Publishing",
    headline: "KI, die Dokumente |lesbar| macht.",
    caption: "DATENSCHUTZKONFORM · NACH NDSG GEPRÜFT",
    layers: [
      [{ tag: "QUELLE", name: "Dokumente" }, { tag: "QUELLE", name: "Aufnahmen" }],
      [{ tag: "KI", name: "OCR, Whisper & LLM", hot: true }],
      [
        { tag: "OUTPUT", name: "Metadaten" },
        { tag: "OUTPUT", name: "Volltext" },
        { tag: "OUTPUT", name: "Übersetzung" },
      ],
    ],
  },
  {
    title: "System-Integration",
    headline: "Systeme, die |miteinander| reden.",
    caption: "VOM FORMULAR BIS ZUM DRUCK-JOB · OHNE HANDARBEIT",
    layers: [
      [{ tag: "QUELLE", name: "ERP / CRM" }, { tag: "QUELLE", name: "Web-Formular" }],
      [{ tag: "API", name: "Middleware", hot: true }],
      [{ tag: "ENGINE", name: "InDesign Srv." }],
      [{ tag: "OUTPUT", name: "Druck-Jobs" }],
    ],
  },
  {
    title: "Beratung & Projektleitung",
    headline: "Beratung, die selbst |mit anpackt|.",
    caption: "VON DER ANFORDERUNG BIS ZUM GO-LIVE",
    layers: [
      [{ tag: "START", name: "Anforderung" }],
      [{ tag: "KONZEPT", name: "Spezifikation", hot: true }],
      [{ tag: "SPRINTS", name: "Umsetzung" }],
      [{ tag: "ZIEL", name: "Go-Live" }],
    ],
  },
];

export const INTERVAL_MS = 6500;

const W = 470;
const H = 236;
const PAD_X = 6;
const NODE_H = 44;
const GAP_Y = 14;
const CAPTION_SPACE = 28;

/** Berechnet Positionen für Ebenen und Knoten sowie die Verbindungen. */
const layout = (layers) => {
  const cols = layers.length;
  const colW = (W - PAD_X * 2) / cols;
  const nodeW = Math.min(colW - 12, 138);
  const nodes = layers.map((layer, li) => {
    const total = layer.length * NODE_H + (layer.length - 1) * GAP_Y;
    const y0 = (H - CAPTION_SPACE - total) / 2;
    const x = PAD_X + li * colW + (colW - nodeW) / 2;
    return layer.map((node, ni) => ({
      ...node,
      x,
      y: y0 + ni * (NODE_H + GAP_Y),
      w: nodeW,
    }));
  });
  const edges = [];
  const lastLayer = nodes.length - 1;
  for (let li = 0; li < lastLayer; li += 1) {
    nodes[li].forEach((from) => {
      nodes[li + 1].forEach((to, ti) => {
        if (from.to && !from.to.includes(ti)) return;
        const x1 = from.x + from.w;
        const y1 = from.y + NODE_H / 2;
        const x2 = to.x;
        const y2 = to.y + NODE_H / 2;
        const dx = (x2 - x1) / 2;
        edges.push({
          d: `M${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`,
          out: li + 1 === lastLayer,
        });
      });
    });
  }
  const flat = nodes.flatMap((layer, li) =>
    layer.map((node) => ({ ...node, out: li === lastLayer }))
  );
  return { nodes: flat, edges, small: nodeW < 110 };
};

const WorkflowDiagram = ({ onChange }) => {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPicked, setUserPicked] = useState(false);
  const reduceMotion = useReducedMotion();
  const pageVisible = usePageVisible();
  const paused = hovered || focused || !pageVisible;

  useEffect(() => {
    if (paused || reduceMotion) return undefined;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % SCENARIOS.length),
      INTERVAL_MS
    );
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion]);

  useEffect(() => {
    if (onChange) onChange(SCENARIOS[index], index);
  }, [index, onChange]);

  const scenario = SCENARIOS[index];
  const { nodes, edges, small } = useMemo(() => layout(scenario.layers), [scenario]);

  return (
    // Hover/Fokus pausieren nur den Szenario-Wechsel, keine Aktion – daher zulässig.
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <figure
      className={styles.figure}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={(event) => {
        // Nur Tastaturfokus pausiert; ein Mausklick auf einen Punkt soll den Loop nicht stoppen
        if (event.target.matches(":focus-visible")) setFocused(true);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <svg
        className={styles.svg}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-labelledby="workflow-title"
      >
        <title id="workflow-title">
          {`${scenario.title}: ${scenario.layers
            .map((layer) => layer.map((n) => n.name).join(" und "))
            .join(" → ")}.`}
        </title>

        <g key={`scene-${index}`} className={styles.swap}>
          {edges.map((edge) => (
            <path key={`rail-${edge.d}`} className={styles.rail} d={edge.d} />
          ))}
          {edges.map((edge) => (
            <path
              key={`flow-${edge.d}`}
              className={`${styles.flow} ${edge.out ? styles.flowOut : ""}`}
              d={edge.d}
            />
          ))}
          {nodes.map((node) => (
            <g key={`${node.tag}-${node.name}`}>
              <rect
                className={`${styles.node} ${node.hot ? styles.hot : ""} ${node.out ? styles.out : ""}`}
                x={node.x}
                y={node.y}
                width={node.w}
                height={NODE_H}
                rx="8"
              />
              <text
                className={`${styles.label} ${node.out ? styles.labelOut : ""}`}
                x={node.x + 10}
                y={node.y + 18}
              >
                {node.tag}
              </text>
              <text
                className={`${styles.name} ${small ? styles.nameSmall : ""}`}
                x={node.x + 10}
                y={node.y + 33}
              >
                {node.name}
              </text>
            </g>
          ))}
          <text className={styles.caption} x={PAD_X + 4} y={H - 6}>
            {scenario.caption}
          </text>
        </g>
      </svg>

      <figcaption className={styles.legend}>
        <span className={styles.legendTitle} aria-live={userPicked ? "polite" : "off"}>
          {scenario.title}
        </span>
        <span className={styles.dots} role="group" aria-label="Workflow-Szenarien">
          {SCENARIOS.map((item, i) => (
            <button
              key={item.title}
              type="button"
              className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
              aria-label={`${item.title} anzeigen`}
              aria-pressed={i === index}
              onClick={() => {
                setUserPicked(true);
                setIndex(i);
              }}
            />
          ))}
        </span>
      </figcaption>
    </figure>
  );
};

export default WorkflowDiagram;
