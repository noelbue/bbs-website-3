import React from "react";
import site from "./src/data/site";

// Setzt das gespeicherte Theme vor dem ersten Paint, damit nichts flackert.
const themeScript = `
(function () {
  try {
    var t = localStorage.getItem("bbs-theme");
    if (t === "dark" || t === "light") document.documentElement.setAttribute("data-theme", t);
  } catch (e) {}
})();
`;

export const onRenderBody = ({ setHtmlAttributes, setPreBodyComponents }) => {
  setHtmlAttributes({ lang: site.lang });
  setPreBodyComponents([
    <script key="bbs-theme" dangerouslySetInnerHTML={{ __html: themeScript }} />,
  ]);
};
