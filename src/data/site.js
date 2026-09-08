/**
 * Zentrale Stammdaten der Site. CommonJS, damit gatsby-config.js und die
 * React-Komponenten dieselbe Quelle nutzen.
 */
const site = {
  title: "Bürgler Business Solutions",
  shortName: "B-Business",
  description:
    "Publishing-Technologie Experte aus der Schweiz. Spezialisiert auf Publishing-Automatisierung, Web-Entwicklung und Web-Apps, System-Integration sowie KI-Lösungen und KI-Schulungen.",
  keywords:
    "Publishing Automatisierung, InDesign Server, Enfocus Switch, Web-Entwicklung, Web-App Entwicklung, React, Next.js, TypeScript, KI-Schulung, Claude Code Workshop, IT-Beratung, Schweiz, Publishing-Workflows, Content Management",
  siteUrl: "https://b-business-solutions.ch",
  author: "Noel Bürgler",
  image: "/og-image.png",
  lang: "de-CH",
  email: "nb@b-business-solutions.ch",
  phone: "+41 78 783 28 14",
  phoneHref: "tel:+41787832814",
  uid: "CHE-258.321.787",
  address: {
    locality: "Horn",
    region: "TG",
    postalCode: "9326",
    country: "CH",
    label: "Horn, Schweiz",
  },
  sameAs: [
    "https://www.linkedin.com/in/noelbuergler/",
    "https://github.com/noelbue",
  ],
};

module.exports = site;
