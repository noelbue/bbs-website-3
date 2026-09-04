import "./src/styles/global.css";

const scrollToTopInstant = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
};

/**
 * Beim Wechsel auf eine andere Seite sofort nach oben springen (kein
 * Smooth-Scroll vom Seitenende). Anker-Links überlässt Gatsby dem Standard.
 */
export const shouldUpdateScroll = ({ routerProps: { location }, prevRouterProps }) => {
  if (location.hash) return true;
  const prevPath = prevRouterProps ? prevRouterProps.location.pathname : null;
  if (prevPath !== location.pathname) {
    scrollToTopInstant();
    return false;
  }
  return true;
};

export const onRouteUpdate = ({ location, prevLocation }) => {
  if (!prevLocation || location.hash) return;
  if (prevLocation.pathname !== location.pathname) scrollToTopInstant();
};
