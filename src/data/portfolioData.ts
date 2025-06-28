// Portfolio data for sample documents
export interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  tags: string[];
  pages: number;
  year: number;
  color: {
    from: string;
    to: string;
    accent: string;
  };
  icon: string;
  sampleContent: {
    excerpt: string;
    highlights: string[];
    metrics?: {
      label: string;
      value: string;
    }[];
  };
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "paymentpro-api",
    title: "PaymentPro API Guide",
    subtitle: "Complete REST API Documentation",
    description: "Comprehensive REST API documentation for a fintech payment platform. Includes authentication flows, endpoint references, error handling, and SDKs for Python, JavaScript, and PHP with interactive examples.",
    category: "API Documentation",
    tags: ["REST API", "OpenAPI 3.0", "Fintech", "SDKs"],
    pages: 147,
    year: 2024,
    color: {
      from: "blue-500",
      to: "indigo-600",
      accent: "indigo"
    },
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    sampleContent: {
      excerpt: "The PaymentPro API enables secure, real-time payment processing for modern applications. Our RESTful API follows industry standards and provides comprehensive error handling, webhook notifications, and multi-currency support.",
      highlights: [
        "Complete OpenAPI 3.0 specification with interactive examples",
        "Authentication guide with OAuth 2.0 and API key methods",
        "Error handling documentation with detailed error codes",
        "SDK examples in Python, JavaScript, PHP, and cURL",
        "Webhook implementation guide with security best practices",
        "Rate limiting and pagination documentation"
      ],
      metrics: [
        { label: "API Endpoints", value: "47" },
        { label: "Code Examples", value: "120+" },
        { label: "Developer Adoption", value: "95%" },
        { label: "Support Tickets Reduced", value: "68%" }
      ]
    }
  },
  {
    id: "projectflow-guide",
    title: "ProjectFlow Platform Guide",
    subtitle: "Comprehensive User Documentation",
    description: "User-friendly guide for a project management SaaS platform. Features step-by-step tutorials, workflow examples, troubleshooting sections, and annotated screenshots for maximum clarity.",
    category: "User Guide",
    tags: ["User Guide", "SaaS", "Interactive", "Tutorials"],
    pages: 89,
    year: 2024,
    color: {
      from: "green-500",
      to: "teal-600",
      accent: "green"
    },
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    sampleContent: {
      excerpt: "ProjectFlow transforms how teams collaborate. This comprehensive guide walks users through every feature, from basic project setup to advanced automation workflows, ensuring maximum productivity from day one.",
      highlights: [
        "Interactive onboarding tutorial with progress tracking",
        "Visual workflow examples for common project types",
        "Advanced features guide with real-world use cases",
        "Troubleshooting section with searchable solutions",
        "Integration guides for popular tools (Slack, GitHub, etc.)",
        "Mobile app usage instructions with screenshots"
      ],
      metrics: [
        { label: "User Onboarding Time", value: "-45%" },
        { label: "Feature Adoption", value: "78%" },
        { label: "User Satisfaction", value: "4.8/5" },
        { label: "Support Ticket Reduction", value: "52%" }
      ]
    }
  },
  {
    id: "cloudtech-runbook",
    title: "CloudTech DevOps Runbook",
    subtitle: "Complete Operations Manual",
    description: "Detailed CI/CD pipeline documentation including deployment procedures, rollback strategies, monitoring setup, and incident response protocols for a cloud-native application architecture.",
    category: "Process Documentation",
    tags: ["DevOps", "CI/CD", "Kubernetes", "Monitoring"],
    pages: 203,
    year: 2024,
    color: {
      from: "purple-500",
      to: "pink-600",
      accent: "purple"
    },
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
    sampleContent: {
      excerpt: "This runbook provides CloudTech's engineering team with standardized procedures for deployment, monitoring, and incident response. Built for reliability and rapid problem resolution in production environments.",
      highlights: [
        "Automated CI/CD pipeline configuration and troubleshooting",
        "Kubernetes deployment strategies with zero-downtime procedures",
        "Comprehensive monitoring setup with alerting thresholds",
        "Incident response playbooks with escalation procedures",
        "Rollback strategies and disaster recovery protocols",
        "Performance optimization guidelines and capacity planning"
      ],
      metrics: [
        { label: "Deployment Frequency", value: "+300%" },
        { label: "MTTR Reduction", value: "67%" },
        { label: "Incident Prevention", value: "84%" },
        { label: "Team Efficiency", value: "+156%" }
      ]
    }
  },
  {
    id: "microcommerce-architecture",
    title: "MicroCommerce Architecture",
    subtitle: "Technical System Specification",
    description: "Technical architecture documentation for an e-commerce microservices platform. Includes system diagrams, database schemas, API contracts, security protocols, and scalability considerations.",
    category: "Technical Specifications",
    tags: ["Architecture", "Microservices", "E-commerce", "Security"],
    pages: 156,
    year: 2024,
    color: {
      from: "orange-500",
      to: "red-600",
      accent: "orange"
    },
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
    sampleContent: {
      excerpt: "MicroCommerce represents a modern approach to e-commerce architecture. This specification details a scalable, secure microservices platform designed to handle millions of transactions while maintaining flexibility and reliability.",
      highlights: [
        "Service-oriented architecture with clear boundaries and contracts",
        "Database per service pattern with eventual consistency strategies",
        "API gateway configuration with rate limiting and authentication",
        "Security implementation including OAuth 2.0 and data encryption",
        "Monitoring and observability with distributed tracing",
        "Deployment architecture with auto-scaling and load balancing"
      ],
      metrics: [
        { label: "Service Response Time", value: "<100ms" },
        { label: "System Availability", value: "99.9%" },
        { label: "Concurrent Users", value: "500K+" },
        { label: "Development Velocity", value: "+280%" }
      ]
    }
  },
  {
    id: "securebank-training",
    title: "SecureBank Compliance Training",
    subtitle: "Interactive Learning Materials",
    description: "Comprehensive training program for financial compliance procedures. Includes interactive modules, scenario-based exercises, assessment tools, and certification tracking for regulatory requirements.",
    category: "Training Materials",
    tags: ["Training", "Compliance", "Banking", "Interactive"],
    pages: 134,
    year: 2024,
    color: {
      from: "amber-500",
      to: "yellow-600",
      accent: "amber"
    },
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    sampleContent: {
      excerpt: "SecureBank's compliance training ensures all staff understand and follow critical financial regulations. The interactive format combines theoretical knowledge with practical scenarios for effective learning and retention.",
      highlights: [
        "Interactive compliance scenarios with branching decision trees",
        "Video-based training modules with expert interviews",
        "Self-assessment tools with immediate feedback",
        "Certification tracking and renewal management",
        "Real-world case studies from industry incidents",
        "Mobile-responsive design for flexible learning"
      ],
      metrics: [
        { label: "Training Completion", value: "96%" },
        { label: "Knowledge Retention", value: "+89%" },
        { label: "Compliance Score", value: "99.2%" },
        { label: "Time to Competency", value: "-34%" }
      ]
    }
  },
  {
    id: "datastream-sdk",
    title: "DataStream Analytics SDK",
    subtitle: "Developer Integration Guide",
    description: "Complete SDK documentation for real-time analytics platform. Features code examples, integration patterns, performance optimization guides, and troubleshooting for multiple programming languages.",
    category: "SDK Documentation",
    tags: ["SDK", "Analytics", "Python", "JavaScript", "Real-time"],
    pages: 178,
    year: 2024,
    color: {
      from: "cyan-500",
      to: "blue-600",
      accent: "cyan"
    },
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    sampleContent: {
      excerpt: "The DataStream SDK empowers developers to integrate powerful real-time analytics into any application. This comprehensive guide covers everything from basic setup to advanced customization and optimization.",
      highlights: [
        "Multi-language SDK support (Python, JavaScript, Java, Go)",
        "Real-time data streaming with WebSocket examples",
        "Custom dashboard creation with widget libraries",
        "Performance optimization techniques and best practices",
        "Error handling and debugging guides with common solutions",
        "Advanced analytics features including machine learning models"
      ],
      metrics: [
        { label: "Integration Time", value: "-60%" },
        { label: "Developer Satisfaction", value: "4.9/5" },
        { label: "SDK Adoption", value: "87%" },
        { label: "API Success Rate", value: "99.8%" }
      ]
    }
  },
  {
    id: "meditech-procedures",
    title: "MediTech Clinical Procedures",
    subtitle: "Medical Device Documentation",
    description: "FDA-compliant documentation for medical device operations. Includes safety protocols, calibration procedures, maintenance schedules, and regulatory compliance checklists for healthcare environments.",
    category: "Regulatory Documentation",
    tags: ["Medical", "FDA", "Compliance", "Safety", "Healthcare"],
    pages: 267,
    year: 2024,
    color: {
      from: "emerald-500",
      to: "green-600",
      accent: "emerald"
    },
    icon: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5",
    sampleContent: {
      excerpt: "MediTech's clinical procedures documentation ensures safe, compliant operation of critical medical devices. Every procedure is meticulously documented to meet FDA requirements while prioritizing patient safety and staff efficiency.",
      highlights: [
        "FDA 21 CFR Part 820 compliant procedures and documentation",
        "Step-by-step safety protocols with risk assessment matrices",
        "Calibration and maintenance schedules with tracking systems",
        "Incident reporting procedures and corrective action protocols",
        "Staff training requirements and competency assessments",
        "Regulatory audit preparation and documentation management"
      ],
      metrics: [
        { label: "FDA Compliance Score", value: "100%" },
        { label: "Safety Incidents", value: "-92%" },
        { label: "Audit Success Rate", value: "100%" },
        { label: "Staff Training Time", value: "-45%" }
      ]
    }
  },
  {
    id: "smartcity-installation",
    title: "SmartCity IoT Installation",
    subtitle: "Field Operations Manual",
    description: "Comprehensive installation and maintenance guide for IoT sensor networks. Covers hardware setup, network configuration, data collection protocols, and troubleshooting for smart city infrastructure.",
    category: "Installation Guide",
    tags: ["IoT", "Smart City", "Installation", "Sensors", "Infrastructure"],
    pages: 198,
    year: 2024,
    color: {
      from: "violet-500",
      to: "purple-600",
      accent: "violet"
    },
    icon: "M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z",
    sampleContent: {
      excerpt: "SmartCity IoT infrastructure requires precise installation and maintenance procedures. This manual provides field technicians with clear, visual instructions for deploying and maintaining sensor networks across urban environments.",
      highlights: [
        "Visual installation guides with detailed diagrams and photos",
        "Network configuration procedures for LoRaWAN and cellular connectivity",
        "Environmental sensor calibration and data validation protocols",
        "Preventive maintenance schedules and inspection checklists",
        "Troubleshooting guides with common issues and solutions",
        "Safety procedures for working in urban infrastructure environments"
      ],
      metrics: [
        { label: "Installation Success Rate", value: "98.7%" },
        { label: "Sensor Uptime", value: "99.4%" },
        { label: "Field Technician Efficiency", value: "+67%" },
        { label: "Maintenance Cost Reduction", value: "43%" }
      ]
    }
  },
  {
    id: "quantum-research",
    title: "QuantumLab Research Protocols",
    subtitle: "Scientific Documentation",
    description: "Detailed research protocols and methodologies for quantum computing experiments. Includes experimental procedures, data analysis techniques, safety protocols, and peer review documentation standards.",
    category: "Research Documentation",
    tags: ["Quantum Computing", "Research", "Scientific", "Protocols", "Analysis"],
    pages: 289,
    year: 2024,
    color: {
      from: "rose-500",
      to: "pink-600",
      accent: "rose"
    },
    icon: "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 14.5M14.25 3.104c.251.023.501.05.75.082M19.8 14.5l-2.436 2.436a2.25 2.25 0 01-1.591.659h-3.546a2.25 2.25 0 01-1.591-.659L8.2 14.5m11.6 0V16.5a2.25 2.25 0 01-2.25 2.25h-6a2.25 2.25 0 01-2.25-2.25V14.5",
    sampleContent: {
      excerpt: "QuantumLab's research protocols establish rigorous standards for quantum computing experimentation. These procedures ensure reproducible results, maintain safety standards, and facilitate peer review in cutting-edge quantum research.",
      highlights: [
        "Quantum state preparation and measurement protocols",
        "Error correction and noise mitigation procedures",
        "Statistical analysis methods for quantum data interpretation",
        "Safety protocols for cryogenic and high-voltage equipment",
        "Data documentation standards for reproducible research",
        "Peer review and collaboration guidelines for multi-institutional projects"
      ],
      metrics: [
        { label: "Experimental Reproducibility", value: "94%" },
        { label: "Safety Incidents", value: "0" },
        { label: "Publication Success Rate", value: "89%" },
        { label: "Collaboration Efficiency", value: "+145%" }
      ]
    }
  },
  {
    id: "retail-migration",
    title: "RetailMax System Migration",
    subtitle: "Change Management Guide",
    description: "Complete migration guide for transitioning from legacy retail systems to modern cloud architecture. Includes timeline, risk mitigation, staff training, and business continuity planning documentation.",
    category: "Change Management",
    tags: ["Migration", "Retail", "Change Management", "Cloud", "Business Continuity"],
    pages: 156,
    year: 2024,
    color: {
      from: "indigo-500",
      to: "blue-600",
      accent: "indigo"
    },
    icon: "M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z",
    sampleContent: {
      excerpt: "RetailMax's system migration represents a transformational shift to modern retail technology. This comprehensive guide ensures smooth transition with minimal business disruption while maximizing the benefits of cloud-native architecture.",
      highlights: [
        "Phased migration strategy with rollback procedures at each stage",
        "Comprehensive staff training program with role-based modules",
        "Business continuity planning with disaster recovery protocols",
        "Data migration procedures with validation and integrity checks",
        "Performance monitoring and optimization during transition",
        "Stakeholder communication plan and change management strategies"
      ],
      metrics: [
        { label: "Migration Timeline", value: "6 months" },
        { label: "Business Continuity", value: "99.9%" },
        { label: "Staff Adoption Rate", value: "91%" },
        { label: "Performance Improvement", value: "+234%" }
      ]
    }
  }
];

// Helper function to get portfolio item by ID
export function getPortfolioItem(id: string): PortfolioItem | undefined {
  return portfolioItems.find(item => item.id === id);
}
