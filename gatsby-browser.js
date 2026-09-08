import "./src/styles/global.css";

/**
 * Gatsby kümmert sich selbst um die Scroll-Position: Seitenanfang bei neuer
 * Navigation, gemerkte Position bei Browser-Zurück. Wir schalten dafür nur
 * kurz das globale Smooth-Scrolling ab, damit der Wechsel nicht vom
 * Seitenende her animiert wird.
 */
export const shouldUpdateScroll = ({ routerProps: { location } }) => {
  if (location.hash) return true; // Anker-Sprünge dürfen weich scrollen
  const html = document.documentElement;
  const previous = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  window.requestAnimationFrame(() => {
    html.style.scrollBehavior = previous;
  });
  return true;
};
