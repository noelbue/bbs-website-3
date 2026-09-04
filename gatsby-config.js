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
        // Eigene Header statt Plugin-Defaults; Caching-Header für Bundles setzt das Plugin
        mergeSecurityHeaders: false,
        headers: {
          "/*": [
            "Strict-Transport-Security: max-age=63072000; includeSubDomains; preload",
            "Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests",
            "X-Frame-Options: DENY",
            "X-Content-Type-Options: nosniff",
            "X-XSS-Protection: 1; mode=block",
            "Referrer-Policy: strict-origin-when-cross-origin",
            "Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()",
          ],
          "/images/*": ["Cache-Control: public, max-age=604800"],
          "/llms.txt": [
            "Content-Type: text/plain; charset=utf-8",
            "Cache-Control: public, max-age=3600",
          ],
        },
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
