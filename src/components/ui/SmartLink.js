import React from "react";
import { Link } from "gatsby";

/**
 * Rendert interne Ziele als Gatsby-Link (Client-Routing) und alles andere als
 * normales <a>. Damit laden Karten-Links die Seite nicht mehr komplett neu.
 */
const SmartLink = ({ href, children, ...rest }) => {
  const isInternal = href?.startsWith("/") && !href.startsWith("//");
  if (isInternal) {
    return (
      <Link to={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
};

export default SmartLink;
