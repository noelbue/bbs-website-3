module.exports = {
  siteMetadata: {
    title: `Bürgler Business Solutions`,
    description: `Publishing-Technologie Experte aus der Schweiz. Spezialisiert auf Publishing-Automatisierung, Web-Entwicklung und IT-Beratung. Über 10 Jahre Erfahrung mit InDesign Server, Enfocus Switch, React und modernen Web-Technologien.`,
    author: `Noel Bürgler`,
    siteUrl: `https://b-business-solutions.ch`,
    keywords: `Publishing Automatisierung, InDesign Server, Enfocus Switch, Web-Entwicklung, React, TypeScript, IT-Beratung, Schweiz, Publishing-Workflows, Content Management`,
    image: `/og-image.png`,
    lang: `de-CH`,
    contact: {
      email: `nb@b-business-solutions.ch`,
      phone: `+41 78 783 28 14`,
      location: `Horn, Schweiz`,
    },
  },
  plugins: [
    "gatsby-plugin-sitemap",
    "gatsby-plugin-robots-txt",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Bürgler Business Solutions",
        short_name: "B-Business",
        start_url: "/",
        background_color: "#F6F5FD",
        theme_color: "#4844F5",
        display: "minimal-ui",
        icon: "src/assets/favicon.png",
      },
    },
  ],
};
