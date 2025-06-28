export const siteConfig = {
  company: {
    name: "Prism Writing Technical Writing Cooperative",
    shortName: "Prism Writing",
    tagline: "Professional Technical Writing Services",
    description: "Prism Writing Technical Writing Cooperative delivers clear, comprehensive documentation that transforms complex technical concepts into accessible, actionable content.",
    domain: "prismwriting.com",
    url: "https://prismwriting.com", // Production URL
    email: "hello@prismwriting.com",
    phone: "+1 (555) 123-4567",
    businessHours: "Mon-Fri, 9AM-6PM EST",
    responseTime: "We typically respond within 24 hours",
    consultationDuration: "30-minute"
  },

  services: [
    {
      id: "api-documentation",
      title: "API Documentation",
      description: "Clear, comprehensive API guides with examples, endpoints, and integration instructions that developers actually want to use.",
      icon: "document",
      features: [
        "REST & GraphQL APIs",
        "Interactive examples",
        "SDKs and libraries",
        "Authentication guides",
        "Error handling documentation",
        "Rate limiting guidelines"
      ],
      startingPrice: 2500,
      category: "development"
    },
    {
      id: "user-manuals",
      title: "User Manuals",
      description: "Step-by-step user documentation that transforms complex software into accessible, easy-to-follow guides.",
      icon: "book",
      features: [
        "Getting started guides",
        "Feature documentation",
        "Troubleshooting guides",
        "Video tutorials",
        "FAQ sections",
        "Screenshots and diagrams"
      ],
      startingPrice: 1800,
      category: "user-focused"
    },
    {
      id: "training-materials",
      title: "Training Materials",
      description: "Educational content and tutorials that help teams learn new technologies and processes effectively.",
      icon: "academic",
      features: [
        "Course curricula",
        "Interactive workshops",
        "Assessment materials",
        "Certification guides",
        "Learning paths",
        "Progress tracking"
      ],
      startingPrice: 3200,
      category: "education"
    },
    {
      id: "standard-operating-procedures",
      title: "Standard Operating Procedures",
      description: "Detailed SOPs that ensure consistency, compliance, and efficiency across your organization's processes.",
      icon: "clipboard",
      features: [
        "Process documentation",
        "Compliance procedures",
        "Quality assurance",
        "Safety protocols",
        "Workflow optimization",
        "Audit preparation"
      ],
      startingPrice: 2200,
      category: "operations"
    },
    {
      id: "technical-specifications",
      title: "Technical Specifications",
      description: "Detailed technical specifications and architecture documentation for complex systems and software.",
      icon: "code",
      features: [
        "System architecture",
        "Database schemas",
        "Integration guides",
        "Performance specs",
        "Security requirements",
        "Deployment guides"
      ],
      startingPrice: 3800,
      category: "development"
    },
    {
      id: "content-strategy-editing",
      title: "Content Strategy & Editing",
      description: "Comprehensive content strategy, editing, and optimization services to improve your existing documentation.",
      icon: "edit",
      features: [
        "Content audits",
        "Style guide development",
        "Documentation restructuring",
        "SEO optimization",
        "Information architecture",
        "User research"
      ],
      startingPrice: 1500,
      category: "strategy"
    }
  ],

  packages: [
    {
      id: "starter",
      name: "Starter Package",
      priceRange: { min: 1500, max: 2500 },
      features: [
        "Single deliverable",
        "2 rounds of revisions",
        "2-week delivery",
        "Basic SEO optimization"
      ],
      popular: false
    },
    {
      id: "professional",
      name: "Professional Package",
      priceRange: { min: 3500, max: 6000 },
      features: [
        "Multiple deliverables",
        "Unlimited revisions",
        "3-4 week delivery",
        "Advanced SEO & analytics",
        "Content strategy consultation"
      ],
      popular: true
    },
    {
      id: "enterprise",
      name: "Enterprise Package",
      priceRange: { min: 8000, max: null },
      features: [
        "Complete documentation suite",
        "Ongoing maintenance",
        "Priority support",
        "Team training included",
        "Custom integrations"
      ],
      popular: false
    }
  ],

  industries: [
    {
      id: "software-saas",
      title: "Software & SaaS",
      description: "APIs, platforms, applications, developer tools",
      icon: "chip"
    },
    {
      id: "healthcare-tech",
      title: "Healthcare Tech",
      description: "Medical devices, compliance, patient systems",
      icon: "heart"
    },
    {
      id: "fintech",
      title: "FinTech",
      description: "Financial platforms, security, payment systems",
      icon: "currency"
    },
    {
      id: "manufacturing",
      title: "Manufacturing",
      description: "Equipment manuals, safety procedures, processes",
      icon: "beaker"
    }
  ],

  features: [
    {
      id: "expert-quality",
      title: "Expert Quality",
      description: "Professional technical writers with industry experience",
      icon: "check-circle"
    },
    {
      id: "fast-delivery",
      title: "Fast Delivery",
      description: "Quick turnaround times without compromising quality",
      icon: "clock"
    },
    {
      id: "collaborative",
      title: "Collaborative",
      description: "Worker cooperative model ensures fair practices and quality",
      icon: "users"
    }
  ],

  navigation: [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" }
  ],

  cta: {
    primary: {
      text: "Get Started Today",
      href: "/contact"
    },
    secondary: {
      text: "View Our Services",
      href: "/services"
    }
  },

  social: {
    twitter: "https://twitter.com/prismwriting",
    linkedin: "https://linkedin.com/company/prismwriting",
    github: "https://github.com/prismwriting"
  },

  meta: {
    title: "Prism Writing - Professional Technical Writing Services",
    description: "Expert technical writing services including API documentation, user manuals, training materials, and more. Transform complex concepts into clear, actionable content.",
    keywords: [
      "technical writing",
      "API documentation",
      "user manuals",
      "technical documentation",
      "content strategy",
      "software documentation",
      "technical communication"
    ]
  }
};

// Helper functions for formatting
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

export const formatPriceRange = (min: number, max: number | null): string => {
  if (max === null) {
    return `${formatPrice(min)}+`;
  }
  return `${formatPrice(min)} - ${formatPrice(max)}`;
};

export const getServiceByCategory = (category: string) => {
  return siteConfig.services.filter(service => service.category === category);
};

export const getServiceById = (id: string) => {
  return siteConfig.services.find(service => service.id === id);
};
