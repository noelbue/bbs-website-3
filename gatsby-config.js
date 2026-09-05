const site = require("./src/data/site");

module.exports = {
  siteMetadata: {
    title: site.title,
    description: site.description,
    author: site.author,
    siteUrl: site.siteUrl,
    keywords: site.keywords,
    image: site.image,
    lang: site.lang,
    contact: {
      email: site.email,
      phone: site.phone,
      location: site.address.label,
    },
  },
  plugins: [
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: site.siteUrl,
        sitemap: `${site.siteUrl}/sitemap-index.xml`,
        policy: [
          { userAgent: "*", allow: "/" },
          { userAgent: "GPTBot", allow: "/" },
          { userAgent: "OAI-SearchBot", allow: "/" },
          { userAgent: "ChatGPT-User", allow: "/" },
          { userAgent: "ClaudeBot", allow: "/" },
          { userAgent: "Claude-Web", allow: "/" },
          { userAgent: "anthropic-ai", allow: "/" },
          { userAgent: "PerplexityBot", allow: "/" },
          { userAgent: "Google-Extended", allow: "/" },
          { userAgent: "Applebot-Extended", allow: "/" },
          { userAgent: "CCBot", allow: "/" },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-netlify",
      options: {
        // Security-Header stehen in netlify.toml; das Plugin liefert nur die
        // Caching-Header für content-gehashte Bundles.
        mergeSecurityHeaders: false,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: site.title,
        short_name: site.shortName,
        start_url: "/",
        background_color: "#F6F5FD",
        theme_color: "#4844F5",
        display: "minimal-ui",
        icon: "src/assets/favicon.png",
      },
    },
  ],
};
