exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type HeroJson implements Node @dontInfer {
      en: HeroContent
      de: HeroContent
    }
    type HeroContent {
      welcome: String
      title: String
      subtitle: String
      description: String
      cta: String
      ctaLink: String
    }
    
    type ServicesJson implements Node @dontInfer {
      en: ServicesContent
      de: ServicesContent
    }
    type ServicesContent {
      title: String
      services: [ServiceItem]
    }
    type ServiceItem {
      title: String
      description: String
      tags: [String]
    }
    
    type ProcessJson implements Node @dontInfer {
      en: ProcessContent
      de: ProcessContent
    }
    type ProcessContent {
      title: String
      steps: [ProcessStep]
    }
    type ProcessStep {
      number: String
      title: String
      description: String
    }
    
    type ProjectsJson implements Node @dontInfer {
      en: ProjectsContent
      de: ProjectsContent
    }
    type ProjectsContent {
      title: String
      projects: [ProjectItem]
    }
    type ProjectItem {
      title: String
      client: String
      description: String
      technologies: [String]
      links: ProjectLinks
    }
    type ProjectLinks {
      website: String
      websitetitle: String
      oldtitle: String
      newtitle: String
      old: String
      new: String
    }
    
    type PartnersJson implements Node @dontInfer {
      en: PartnersContent
      de: PartnersContent
    }
    type PartnersContent {
      title: String
      partners: [PartnerItem]
    }
    type PartnerItem {
      name: String
      company: String
      description: String
      link: String
    }
    
    type ContactJson implements Node @dontInfer {
      en: ContactContent
      de: ContactContent
    }
    type ContactContent {
      title: String
      heading: String
      description: String
      cta: String
    }

    type NavigationJson implements Node @dontInfer {
      en: NavigationContent
      de: NavigationContent
    }
    type NavigationContent {
      logo: LogoContent
      menu: [MenuItem]
    }
    type LogoContent {
      dark: String
      light: String
      alt: String
      href: String
    }
    type MenuItem {
      title: String
      href: String
    }

  type FooterJson implements Node @dontInfer {
    en: FooterContent
    de: FooterContent
  }
  type FooterContent {
    logo: FooterLogoContent
    company: FooterCompanyContent
    links: [FooterLinkContent]
  }
  type FooterLogoContent {
    dark: String
    light: String
    alt: String
    description: String
  }
  type FooterCompanyContent {
    name: String
    registration: String
  }
  type FooterLinkContent {
    title: String
    href: String
  }
  type HeroAnimationJson implements Node @dontInfer {
    v: String
    fr: Int
    ip: Int
    op: Int
    w: Int
    h: Int
    nm: String
    ddd: Int
    assets: [JSON]
    layers: [JSON]
    meta: JSON
  } 
  `;
  createTypes(typeDefs);
};

exports.onCreateNode = async ({ node, actions }) => {
  const { createNode, createParentChildLink } = actions;

  if (node.internal.type === 'File' && node.sourceInstanceName === 'data' && node.ext === '.json') {
    try {
      const content = JSON.parse(node.internal.content);

      createNode({
        ...content,
        id: `${node.name}Json`,
        parent: node.id,
        children: [],
        internal: {
          type: `${node.name.charAt(0).toUpperCase() + node.name.slice(1)}Json`,
          contentDigest: node.internal.contentDigest,
        },
      });
    } catch (error) {
      console.error(`Error processing ${node.relativePath}:`, error);
    }
  }
};