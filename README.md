# Bürgler Business Solutions Website

Corporate website for [Bürgler Business Solutions](https://b-business-solutions.ch) built with Gatsby.

## 🎯 Overview

Professional website showcasing Publishing-Automation, Web Development, and IT Consulting services. Built with modern web technologies and optimized for performance, SEO, and user experience.

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
- ✅ Modern design system with CSS variables
- ✅ No tracking, no cookies (privacy-first)

## 📄 Pages

### Main Pages

- **Home** (`/`) - Hero, Services Overview, About Preview
- **Services** (`/services`) - Detailed service offerings with sticky navigation
- **Über mich** (`/ueber-mich`) - Journey timeline, Expertise, Personal info
- **Kontakt** (`/kontakt`) - Contact methods, Availability, Process, Social links

### Legal Pages

- **Impressum** (`/impressum`) - Legal information (Swiss UWG compliant)
- **Datenschutz** (`/datenschutz`) - Privacy policy (GDPR/DSGVO compliant)

### System Pages

- **404** (`/404`) - Custom error page with helpful navigation

## 🏗 Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer, Navigation, CTA, ServiceNav
│   ├── ui/              # Reusable UI components (Button, Card, etc.)
│   └── Seo.js           # SEO component (Gatsby Head API, JSON-LD)
├── data/                # JSON content files
│   ├── homeContent.json
│   ├── services.json
│   ├── aboutContent.json
│   ├── contactContent.json
│   └── faq.json
├── fonts/              # SF Pro Display & SF Mono (local)
├── pages/              # Gatsby pages (auto-routing)
├── styles/             # Global styles & CSS variables
└── assets/             # Images, icons, favicon
```

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
  NODE_VERSION = "18"
```

## 🔍 SEO Features

- ✅ Unique meta titles & descriptions per page
- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Card tags
- ✅ Canonical URLs
- ✅ Automatic sitemap generation (`sitemap-index.xml`)
- ✅ Robots.txt
- ✅ Semantic HTML
- ✅ Structured data ready

## 🔒 Privacy & Legal

### GDPR/DSGVO Compliant

- No tracking cookies
- No analytics (privacy-first)
- No third-party scripts
- Locally hosted fonts (no Google Fonts)
- Server logs only (Netlify)

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

- `Header.js` - Sticky navigation with mobile menu
- `Footer.js` - Legal links & copyright
- `ServiceNav.js` - Sticky service quick navigation (collapsible)

### UI Components

- `Button.js` - Primary, Secondary, Tertiary variants
- `Card.js` - ServiceCard, InfoCard, WhyUsCard, etc.
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
- Image optimization (Gatsby Image)
- Code splitting (automatic)
- CSS Modules (no unused CSS)

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

This is a private corporate website. For inquiries, please contact:  
**nb@b-business-solutions.ch**

## 📝 License

© 2026 Bürgler Business Solutions (CHE-258.321.787)  
All rights reserved.

---

**Built with ❤️ using Gatsby**
