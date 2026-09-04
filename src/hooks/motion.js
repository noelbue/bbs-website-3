import { useEffect, useState } from "react";

/** true, wenn der Besucher reduzierte Bewegung wünscht. */
export const useReducedMotion = () => {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduce;
};

/** false, solange der Tab im Hintergrund ist – spart Intervalle und Animationen. */
export const usePageVisible = () => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const update = () => setVisible(document.visibilityState !== "hidden");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  return visible;
};
