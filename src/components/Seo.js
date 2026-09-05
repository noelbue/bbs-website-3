import React from "react";
import site from "../data/site";

/**
 * SEO-Komponente für die Gatsby Head API (ohne react-helmet, damit jede Seite
 * deterministisch ihre eigenen Meta-Tags und ihr eigenes JSON-LD bekommt).
 */
const siteMetadata = site;

const pageLabels = {
  "/services": "Services",
  "/ueber-mich": "Über mich",
  "/kontakt": "Kontakt",
  "/impressum": "Impressum",
  "/datenschutz": "Datenschutz",
};

const knowsAbout = [
  "Publishing-Automatisierung",
  "Adobe InDesign Server",
  "Enfocus Switch",
  "vjoon K4",
  "EasyCatalog",
  "XMPie",
  "Headless CMS",
  "Web-Entwicklung",
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "System-Integration",
  "REST APIs",
  "Solution Architecture",
  "Requirements Engineering",
  "KI-gestützte Entwicklung",
  "Agentic Coding",
];

const buildGraph = ({ url, title, description, pathname, schema }) => {
  const { siteUrl } = siteMetadata;
  const orgId = `${siteUrl}/#organization`;
  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;
  const cleanPath = pathname.replace(/\/$/, "");

  const graph = [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": orgId,
      name: siteMetadata.title,
      legalName: siteMetadata.title,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/bbs-logo.svg`,
      },
      image: `${siteUrl}${siteMetadata.image}`,
      description: siteMetadata.description,
      email: siteMetadata.email,
      telephone: siteMetadata.phone,
      founder: { "@id": personId },
      address: {
        "@type": "PostalAddress",
        addressLocality: site.address.locality,
        addressRegion: site.address.region,
        postalCode: site.address.postalCode,
        addressCountry: site.address.country,
      },
      areaServed: ["CH", "DE", "AT", "LI"],
      identifier: {
        "@type": "PropertyValue",
        propertyID: "UID",
        value: siteMetadata.uid,
      },
      knowsAbout,
      sameAs: siteMetadata.sameAs,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: siteMetadata.email,
        telephone: siteMetadata.phone,
        availableLanguage: ["de", "en"],
        url: `${siteUrl}/kontakt`,
      },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: siteMetadata.author,
      jobTitle: "Solution Architect & Publishing-Technologie-Experte",
      url: `${siteUrl}/ueber-mich`,
      worksFor: { "@id": orgId },
      knowsAbout,
      sameAs: siteMetadata.sameAs,
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteUrl,
      name: siteMetadata.title,
      publisher: { "@id": orgId },
      inLanguage: siteMetadata.lang,
    },
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: title,
      description,
      isPartOf: { "@id": websiteId },
      about: { "@id": orgId },
      inLanguage: siteMetadata.lang,
    },
  ];

  if (cleanPath && pageLabels[cleanPath]) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: pageLabels[cleanPath],
          item: url,
        },
      ],
    });
  }

  return graph.concat(schema);
};

const SEO = ({
  title,
  description,
  pathname = "",
  image,
  article = false,
  schema = [],
  noindex = false,
  children,
}) => {
  const seo = {
    title: title || siteMetadata.title,
    description: description || siteMetadata.description,
    url: `${siteMetadata.siteUrl}${pathname}`,
    image: `${siteMetadata.siteUrl}${image || siteMetadata.image}`,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": buildGraph({ ...seo, pathname, schema }),
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="author" content={siteMetadata.author} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <link rel="canonical" href={seo.url} />
      )}

      <meta property="og:site_name" content={siteMetadata.title} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:locale" content="de_CH" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      <meta name="theme-color" content="#4844F5" />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      {children}
    </>
  );
};

export default SEO;
