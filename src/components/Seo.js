import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({ title, description, pathname = "", image, article = false }) => {
  const siteMetadata = {
    title: "Bürgler Business Solutions",
    description:
      "Publishing-Technologie Experte aus der Schweiz. Spezialisiert auf Publishing-Automatisierung, Web-Entwicklung und IT-Beratung.",
    siteUrl: "https://b-business-solutions.ch",
    author: "Noel Bürgler",
    image: "/og-image.png",
    lang: "de-CH",
  };

  const seo = {
    title: title || siteMetadata.title,
    description: description || siteMetadata.description,
    url: `${siteMetadata.siteUrl}${pathname}`,
    image: `${siteMetadata.siteUrl}${image || siteMetadata.image}`,
  };

  return (
    <Helmet htmlAttributes={{ lang: "de-CH" }}>
      {/* Primary Meta */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="author" content={siteMetadata.author} />
      <link rel="canonical" href={seo.url} />

      {/* Open Graph */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:locale" content="de_CH" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {/* Viewport & Theme */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#4844F5" />
    </Helmet>
  );
};

export default SEO;
