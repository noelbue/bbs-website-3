# Bürgler Business Solutions Website

Corporate website for [Bürgler Business Solutions](https://b-business-solutions.ch) built with Gatsby.

## 🎯 Overview

Professional website showcasing Publishing-Automation, Web Development and Web Apps, System Integration, AI solutions and AI trainings, plus IT consulting. Built with modern web technologies and optimized for performance, SEO, accessibility and AI readability.

## 🛠 Tech Stack

- **[Gatsby](https://www.gatsbyjs.com/)** - React-based static site generator
- **[React](https://reactjs.org/)** - UI component library
- **Gatsby Head API** - SEO, Meta-Tags und JSON-LD (kein react-helmet)
- **CSS Modules** - Component-scoped styling
- **[Lucide React](https://lucide.dev/)** - Icon library
- **SF Pro Display & SF Mono** - Custom Apple fonts (locally hosted)

## ✨ Features

- ✅ Responsive design (Mobile-first)
- ✅ SEO optimized (meta tags, Open Graph, sitemap)
- ✅ GDPR/DSGVO compliant (Impressum, Datenschutz)
- ✅ Performance optimized
- ✅ Custom 404 page
- ✅ Accessible (WCAG compliant)
- ✅ Modern design system with CSS variables (light & dark theme)
- ✅ No tracking, no cookies (privacy-first)
- ✅ `llms.txt` for AI readability
- ✅ Free website check via a Netlify Function proxy

## 📄 Pages

### Main Pages

- **Home** (`/`) - Hero, Services Overview, About Preview
- **Services** (`/services/`) - Five service areas with sticky navigation
- **Über mich** (`/ueber-mich/`) - Journey timeline, Expertise, Personal info
- **Kontakt** (`/kontakt/`) - Contact methods, Availability, Process, Social links
- **Website-Check** (`/website-check/`) - Free technical analysis (load time, security, legal pages, AI readiness)

URLs are served with a trailing slash (`trailingSlash: "always"`); canonicals,
sitemap and JSON-LD all use that same form.

### Legal Pages

- **Impressum** (`/impressum/`) - Legal information (Swiss UWG compliant)
- **Datenschutz** (`/datenschutz/`) - Privacy policy (GDPR/DSGVO compliant)

### System Pages

- **404** (`/404`) - Custom error page with helpful navigation

## 🏗 Project Structure

```
src/
├── components/
│   ├── layout/          # Layout, Navigation, Footer, Cta, ServiceNav, ServiceSection
│   ├── ui/              # Reusable UI components (Button, ServiceCard, Faq, …)
│   └── Seo.js           # SEO component (Gatsby Head API, JSON-LD)
├── data/                # JSON content files
│   ├── homeContent.json
│   ├── services.json
│   ├── aboutContent.json
│   ├── contactContent.json
│   ├── faq.json
│   └── site.js          # Shared master data (also used by gatsby-config.js)
├── fonts/              # SF Pro Display & SF Mono (local, only the faces in use)
├── hooks/              # motion.js (reduced motion, page visibility)
├── pages/              # Gatsby pages (auto-routing)
├── styles/             # Global styles & CSS variables
└── assets/             # Images, icons, favicon

netlify/functions/      # website-check.mjs (proxy, keeps the API token server-side)
static/                 # robots.txt, llms.txt, og-image, client logos
content/drafts/         # Unreleased content, gitignored (never bundled)
```

**Content that is not cleared for publication does not belong in `src/`.**
Everything under `src/data/` ends up in the client bundle, even when a flag
hides it at render time. Put drafts in `content/drafts/` instead.

## 🎨 Design System

### Colors

- **Primary:** `#4844F5` - Brand color
- **Background:** `#F6F5FD` - Light sections
- **Text:** `#272570` - Dark blue
- **White:** `#FFFFFF`

### Typography

- **Display:** SF Pro Display (400, 500, 600, 700, 900)
- **Mono:** SF Mono (400, 500)

### Spacing

CSS custom properties for consistent spacing:

- `--spacing-xs` to `--spacing-2xl`
- `--section-padding`
- `--bg-offset` for background sections

## 🚀 Development

```bash
# Install dependencies
npm install

# Start development server
gatsby develop
# → http://localhost:8000

# Build for production
gatsby build

# Serve production build locally
gatsby serve
# → http://localhost:9000

# Clean cache
gatsby clean
```

## 📦 Deployment

### Netlify (Continuous Deployment)

- Automatic builds on push to main branch
- Preview deployments for pull requests
- Custom domain: `b-business-solutions.ch`
- SSL certificate (automatic)
- CDN distribution

[![Netlify Status](https://api.netlify.com/api/v1/badges/2e91ca07-ddb8-4340-88df-6cb319a3f44c/deploy-status)](https://app.netlify.com/sites/b-business-solutions/deploys)

### Build Settings

```toml
[build]
  command = "gatsby build"
  publish = "public/"

[build.environment]
  NODE_VERSION = "22"
```

Security headers (HSTS, CSP, X-Frame-Options, nosniff, Referrer-Policy) are set
in `netlify.toml`. They only apply to static files, so the Netlify Function sets
its own headers.

## 🔍 SEO Features

- ✅ Unique meta titles & descriptions per page
- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Card tags
- ✅ Canonical URLs
- ✅ Automatic sitemap generation (`sitemap-index.xml`)
- ✅ Robots.txt
- ✅ Semantic HTML
- ✅ JSON-LD graph (Organization, Person, WebSite, WebPage, BreadcrumbList, Service, FAQPage)
- ✅ `llms.txt` describing the site for AI agents

## 🔒 Privacy & Legal

### GDPR/DSGVO Compliant

- No tracking cookies
- No analytics (privacy-first)
- No third-party scripts
- Locally hosted fonts (no Google Fonts)
- Server logs only (Netlify)
- Local storage is used for one thing only: the light/dark theme choice (`bbs-theme`)
- The website check is the only form; what it stores is documented in `/datenschutz/#website-check`

### Legal Pages

- Impressum (Swiss UWG Art. 8)
- Datenschutzerklärung (Swiss DSG + EU GDPR)
- UID: CHE-258.321.787

## 🎯 Content Management

Content is managed via JSON files in `src/data/`:

```json
// Example: services.json
{
  "sections": [
    {
      "id": "publishing-automation",
      "category": "Publishing-Automatisierung",
      "title": "...",
      "offerings": [...]
    }
  ]
}
```

**Benefits:**

- Easy content updates (no code changes)
- Structured data
- Version control friendly
- Type-safe with proper schemas

## 🧩 Key Components

### Layout

- `Layout.js` - Page shell (skip link, main landmark)
- `Navigation.js` - Sticky navigation with mobile menu and theme toggle
- `Footer.js` - Legal links & copyright
- `ServiceNav.js` - Sticky service quick navigation (collapsible, scroll spy)

### UI Components

- `Button.js` - Primary, secondary and ghost variants; internal targets use Gatsby `Link`
- `SmartLink.js` - Renders internal targets as Gatsby `Link`, everything else as `<a>`
- `ServiceCard.js`, `OfferingCard.js`, `WhyUsCard.js` - Card variants
- `WebsiteCheck.js` - Form, progress polling and result teaser
- `SectionTitle.js` - Consistent section headings

### SEO

```jsx
<Seo title="Page Title" description="Page description" pathname="/page" />
```

## 📱 Responsive Breakpoints

```css
/* Mobile First */
@media (max-width: 768px) {
  /* Mobile */
}
@media (min-width: 769px) and (max-width: 1024px) {
  /* Tablet */
}
@media (min-width: 1025px) {
  /* Desktop */
}
```

## 🎨 Design Patterns

### Background Sections

```css
/* Desktop: 2rem offset on sides */
/* Mobile: Full width (no offset) */

.section::before {
  left: var(--bg-offset-desktop); /* Desktop: 2rem */
  right: var(--bg-offset-desktop);
}

@media (max-width: 768px) {
  .section::before {
    left: 0; /* Mobile: full width */
    right: 0;
  }
}
```

### Hover Effects

Consistent transitions on all interactive elements:

- Links: Color change + underline
- Buttons: Scale + shadow
- Cards: translateY + shadow
- Icons: Rotate/scale

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📊 Performance

- Lighthouse Score: 90+ (Performance, Accessibility, Best Practices, SEO)
- Static site generation (SSG) for fast load times
- Code splitting (automatic)
- CSS Modules (no unused CSS)

Known trade-off: the seven locally hosted OTF faces total ~18 MB of source data.
Converting them to subset WOFF2 is the biggest remaining performance win.

## 🏢 Company Information

**Bürgler Business Solutions**  
Noel Bürgler  
Himmelrichstrasse 3  
9326 Horn, Schweiz

UID: CHE-258.321.787  
E-Mail: nb@b-business-solutions.ch  
Telefon: +41 78 783 28 14

**Website:** [b-business-solutions.ch](https://b-business-solutions.ch)  
**LinkedIn:** [Noel Bürgler](https://www.linkedin.com/in/noelbuergler/)  
**GitHub:** [noelbuergler](https://github.com/noelbue)

## 📚 Documentation

### Gatsby

- [Gatsby Documentation](https://www.gatsbyjs.com/docs/)
- [Gatsby Tutorial](https://www.gatsbyjs.com/docs/tutorial/)

### Deployment

- [Netlify Documentation](https://docs.netlify.com/)
- [Gatsby on Netlify](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/deploying-to-netlify/)

### React

- [React Documentation](https://react.dev/)

### Icons

- [Lucide React](https://lucide.dev/)

## 🤝 Contributing

This is a corporate website in a public repository. Do not commit unreleased
client content. For inquiries, please contact:  
**nb@b-business-solutions.ch**

## 📝 License

© 2026 Bürgler Business Solutions (CHE-258.321.787)  
All rights reserved.

---

**Built with ❤️ using Gatsby**
