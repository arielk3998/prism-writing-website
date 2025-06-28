/**
 * Comprehensive Industry Compliance Resources
 * 
 * Detailed compliance standards, regulations, and best practices
 * for all major industries we serve.
 * 
 * @module ComplianceData
 * @version 1.0.0
 */

export interface ComplianceResource {
  name: string;
  description: string;
  url: string;
  authority: string;
  relevance: string;
  type: 'regulation' | 'standard' | 'framework' | 'guideline';
  criticality: 'high' | 'medium' | 'low';
  documentTypes: string[];
  lastUpdated?: string;
}

export interface IndustryCategory {
  id: string;
  title: string;
  description: string;
  shortDesc: string;
  iconKey: string;
  color: string;
  bgColor: string;
  darkColor: string;
  resources: ComplianceResource[];
  keyAreas: string[];
  documentationFocus: string[];
}

export const industriesData: IndustryCategory[] = [
  {
    id: 'healthcare',
    title: "Healthcare & Life Sciences",
    description: "Comprehensive compliance standards for healthcare providers, medical device manufacturers, pharmaceutical companies, and life sciences organizations",
    shortDesc: "Medical devices, pharmaceuticals, healthcare providers",
    iconKey: 'healthcare',
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    darkColor: "from-red-600 to-red-700",
    keyAreas: [
      "Patient Privacy & Data Protection",
      "Medical Device Quality Systems", 
      "Clinical Trial Documentation",
      "Pharmaceutical Manufacturing",
      "Healthcare IT Security"
    ],
    documentationFocus: [
      "HIPAA Compliance Policies",
      "Quality Management Systems",
      "Clinical SOPs",
      "Device User Manuals",
      "Training Materials"
    ],
    resources: [
      {
        name: "HIPAA (Health Insurance Portability and Accountability Act)",
        description: "Privacy and security standards for protected health information in healthcare",
        url: "https://www.hhs.gov/hipaa/",
        authority: "U.S. Department of Health & Human Services",
        relevance: "Essential for all healthcare documentation, training materials, and data handling procedures",
        type: "regulation",
        criticality: "high",
        documentTypes: ["Privacy Policies", "Training Materials", "SOPs", "Security Procedures"],
        lastUpdated: "2024"
      },
      {
        name: "FDA 21 CFR Part 820 (Quality System Regulation)",
        description: "Quality management systems requirements for medical device manufacturers",
        url: "https://www.fda.gov/medical-devices/postmarket-requirements-devices/quality-system-qs-regulationmedical-device-good-manufacturing-practices",
        authority: "U.S. Food and Drug Administration",
        relevance: "Critical for medical device documentation, SOPs, and quality management systems",
        type: "regulation",
        criticality: "high",
        documentTypes: ["Quality Manuals", "SOPs", "Risk Management", "Design Controls"],
        lastUpdated: "2024"
      },
      {
        name: "ISO 13485 (Medical Devices - Quality Management)",
        description: "International standard for quality management systems in medical device industry",
        url: "https://www.iso.org/standard/59752.html",
        authority: "International Organization for Standardization",
        relevance: "Global standard for medical device quality documentation and processes",
        type: "standard",
        criticality: "high",
        documentTypes: ["Quality Manuals", "Process Documentation", "Training Records"]
      },
      {
        name: "GxP Guidelines (Good Practice Guidelines)",
        description: "Collection of good practice guidelines for pharmaceutical and medical device industries",
        url: "https://www.fda.gov/drugs/pharmaceutical-quality-resources/facts-about-current-good-manufacturing-practices-cgmps",
        authority: "FDA, EMA, ICH",
        relevance: "Foundation for pharmaceutical manufacturing and clinical documentation",
        type: "guideline",
        criticality: "high",
        documentTypes: ["Manufacturing SOPs", "Clinical Protocols", "Validation Documentation"]
      },
      {
        name: "FDA 21 CFR Part 11 (Electronic Records)",
        description: "Requirements for electronic records and electronic signatures in healthcare",
        url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/part-11-electronic-records-electronic-signatures-scope-and-application",
        authority: "U.S. Food and Drug Administration",
        relevance: "Critical for electronic documentation systems and digital signature procedures",
        type: "regulation",
        criticality: "high",
        documentTypes: ["Electronic Records Procedures", "Validation Documentation", "Audit Trail SOPs"]
      },
      {
        name: "ISO 14155 (Clinical Investigation of Medical Devices)",
        description: "Good clinical practice for clinical investigation of medical devices for human subjects",
        url: "https://www.iso.org/standard/71690.html",
        authority: "International Organization for Standardization",
        relevance: "Essential for clinical trial documentation and medical device research protocols",
        type: "standard",
        criticality: "medium",
        documentTypes: ["Clinical Protocols", "Informed Consent", "Case Report Forms"]
      },
      {
        name: "ICH GCP Guidelines",
        description: "International harmonized guidelines for Good Clinical Practice",
        url: "https://www.ich.org/page/efficacy-guidelines",
        authority: "International Council for Harmonisation",
        relevance: "Foundation for clinical research documentation and trial conduct procedures",
        type: "guideline",
        criticality: "high",
        documentTypes: ["Clinical Trial Protocols", "Monitoring Plans", "Data Management Plans"]
      },
      {
        name: "CLIA (Clinical Laboratory Improvement Amendments)",
        description: "Federal regulatory standards for laboratory testing",
        url: "https://www.cdc.gov/clia/index.html",
        authority: "Centers for Disease Control and Prevention",
        relevance: "Critical for laboratory documentation and quality assurance procedures",
        type: "regulation",
        criticality: "medium",
        documentTypes: ["Laboratory Procedures", "Quality Control", "Personnel Training"]
      }
    ]
  },
  {
    id: 'technology',
    title: "Technology & Software",
    description: "Cybersecurity frameworks, software development standards, and IT governance requirements for technology companies and digital service providers",
    shortDesc: "Software development, cybersecurity, IT operations",
    iconKey: 'technology',
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    darkColor: "from-blue-600 to-blue-700",
    keyAreas: [
      "Cybersecurity Frameworks",
      "Software Development Lifecycle",
      "Data Privacy & Protection",
      "Cloud Security Standards",
      "IT Risk Management"
    ],
    documentationFocus: [
      "Security Policies",
      "API Documentation",
      "Development SOPs",
      "Incident Response Plans",
      "Privacy Impact Assessments"
    ],
    resources: [
      {
        name: "NIST Cybersecurity Framework",
        description: "Comprehensive framework for improving critical infrastructure cybersecurity",
        url: "https://www.nist.gov/cyberframework",
        authority: "National Institute of Standards and Technology",
        relevance: "Foundation for cybersecurity documentation, risk assessment, and security procedures",
        type: "framework",
        criticality: "high",
        documentTypes: ["Security Policies", "Risk Assessments", "Incident Response Plans"],
        lastUpdated: "2024"
      },
      {
        name: "ISO 27001 (Information Security Management)",
        description: "International standard for information security management systems",
        url: "https://www.iso.org/isoiec-27001-information-security.html",
        authority: "International Organization for Standardization",
        relevance: "Global standard for information security documentation and management systems",
        type: "standard",
        criticality: "high",
        documentTypes: ["ISMS Documentation", "Security Policies", "Risk Management"]
      },
      {
        name: "GDPR (General Data Protection Regulation)",
        description: "European regulation for data protection and privacy",
        url: "https://gdpr.eu/",
        authority: "European Union",
        relevance: "Critical for data privacy documentation and user consent procedures",
        type: "regulation",
        criticality: "high",
        documentTypes: ["Privacy Policies", "Data Processing Agreements", "User Manuals"]
      },
      {
        name: "SOC 2 (Service Organization Control 2)",
        description: "Auditing procedure for service providers storing customer data in the cloud",
        url: "https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/aicpasoc2report.html",
        authority: "American Institute of CPAs",
        relevance: "Essential for SaaS and cloud service documentation and security controls",
        type: "framework",
        criticality: "high",
        documentTypes: ["Security Controls", "Compliance Documentation", "Audit Procedures"]
      },
      {
        name: "CCPA (California Consumer Privacy Act)",
        description: "California's comprehensive data privacy law for consumer protection",
        url: "https://oag.ca.gov/privacy/ccpa",
        authority: "California Attorney General",
        relevance: "Critical for privacy documentation and user rights procedures in California",
        type: "regulation",
        criticality: "medium",
        documentTypes: ["Privacy Policies", "User Rights Procedures", "Data Mapping Documentation"]
      },
      {
        name: "OpenAPI Specification",
        description: "Industry standard for REST API documentation and design",
        url: "https://www.openapis.org/",
        authority: "OpenAPI Initiative",
        relevance: "Foundation for API documentation, developer guides, and integration procedures",
        type: "standard",
        criticality: "medium",
        documentTypes: ["API Documentation", "Developer Guides", "Integration Manuals"]
      },
      {
        name: "OWASP Top 10",
        description: "Most critical web application security risks and mitigation strategies",
        url: "https://owasp.org/www-project-top-ten/",
        authority: "Open Web Application Security Project",
        relevance: "Essential for secure coding documentation and security testing procedures",
        type: "guideline",
        criticality: "high",
        documentTypes: ["Security Guidelines", "Code Review Procedures", "Testing Documentation"]
      },
      {
        name: "ISO 25000 (Software Quality)",
        description: "International standards for software and system quality requirements and evaluation",
        url: "https://www.iso.org/standard/35733.html",
        authority: "International Organization for Standardization",
        relevance: "Foundation for software quality documentation and testing procedures",
        type: "standard",
        criticality: "medium",
        documentTypes: ["Quality Plans", "Testing Documentation", "Requirements Specifications"]
      }
    ]
  },
  {
    id: 'financial',
    title: "Financial Services",
    description: "Banking regulations, investment compliance, insurance requirements, and fintech standards for financial institutions and service providers",
    shortDesc: "Banking, insurance, investment, fintech",
    iconKey: 'financial',
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    darkColor: "from-green-600 to-green-700",
    keyAreas: [
      "Anti-Money Laundering (AML)",
      "Know Your Customer (KYC)",
      "Payment Card Industry (PCI)",
      "Capital Requirements",
      "Consumer Protection"
    ],
    documentationFocus: [
      "Compliance Policies",
      "Risk Management Documentation",
      "Audit Procedures",
      "Customer Onboarding",
      "Transaction Monitoring"
    ],
    resources: [
      {
        name: "PCI DSS (Payment Card Industry Data Security Standard)",
        description: "Security standards for organizations that handle credit card information",
        url: "https://www.pcisecuritystandards.org/pci_security/",
        authority: "PCI Security Standards Council",
        relevance: "Critical for payment processing documentation and security procedures",
        type: "standard",
        criticality: "high",
        documentTypes: ["Security Policies", "Network Documentation", "Compliance Procedures"]
      },
      {
        name: "SOX (Sarbanes-Oxley Act)",
        description: "Financial reporting and corporate governance requirements for public companies",
        url: "https://www.sec.gov/spotlight/sarbanes-oxley.htm",
        authority: "U.S. Securities and Exchange Commission",
        relevance: "Essential for financial reporting documentation and internal controls",
        type: "regulation",
        criticality: "high",
        documentTypes: ["Internal Control Documentation", "Financial Procedures", "Audit Trails"]
      },
      {
        name: "Basel III",
        description: "International regulatory framework for bank capital adequacy and risk management",
        url: "https://www.bis.org/basel_framework/",
        authority: "Basel Committee on Banking Supervision",
        relevance: "Foundation for banking risk management and capital adequacy documentation",
        type: "framework",
        criticality: "high",
        documentTypes: ["Risk Management", "Capital Adequacy Reports", "Stress Testing"]
      }
    ]
  },
  {
    id: 'manufacturing',
    title: "Manufacturing & Industrial",
    description: "Quality management systems, environmental standards, occupational safety requirements for manufacturing and industrial operations",
    shortDesc: "Quality systems, environmental compliance, safety",
    iconKey: 'manufacturing',
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    darkColor: "from-orange-600 to-orange-700",
    keyAreas: [
      "Quality Management Systems",
      "Environmental Management",
      "Occupational Health & Safety",
      "Supply Chain Management",
      "Product Safety & Compliance"
    ],
    documentationFocus: [
      "Quality Manuals",
      "Environmental Procedures",
      "Safety SOPs",
      "Training Documentation",
      "Supplier Requirements"
    ],
    resources: [
      {
        name: "ISO 9001 (Quality Management Systems)",
        description: "International standard for quality management systems across all industries",
        url: "https://www.iso.org/iso-9001-quality-management.html",
        authority: "International Organization for Standardization",
        relevance: "Foundation for quality documentation and process management across manufacturing",
        type: "standard",
        criticality: "high",
        documentTypes: ["Quality Manuals", "Process Documentation", "Training Materials"]
      },
      {
        name: "ISO 14001 (Environmental Management)",
        description: "International standard for environmental management systems",
        url: "https://www.iso.org/iso-14001-environmental-management.html",
        authority: "International Organization for Standardization",
        relevance: "Critical for environmental compliance documentation and sustainability reporting",
        type: "standard",
        criticality: "high",
        documentTypes: ["Environmental Procedures", "Compliance Documentation", "Training Materials"]
      },
      {
        name: "OSHA Standards",
        description: "Occupational safety and health standards for workplace safety",
        url: "https://www.osha.gov/laws-regs/regulations/standardnumber",
        authority: "Occupational Safety and Health Administration",
        relevance: "Essential for workplace safety documentation and training materials",
        type: "regulation",
        criticality: "high",
        documentTypes: ["Safety Procedures", "Training Documentation", "Incident Reporting"]
      },
      {
        name: "ISO 45001 (Occupational Health & Safety)",
        description: "International standard for occupational health and safety management systems",
        url: "https://www.iso.org/iso-45001-occupational-health-and-safety.html",
        authority: "International Organization for Standardization",
        relevance: "Global framework for workplace safety documentation and management systems",
        type: "standard",
        criticality: "high",
        documentTypes: ["Safety Management Systems", "Hazard Assessments", "Emergency Procedures"]
      },
      {
        name: "Six Sigma DMAIC Methodology",
        description: "Data-driven quality improvement methodology for manufacturing processes",
        url: "https://www.iassc.org/six-sigma/dmaic/",
        authority: "International Association for Six Sigma Certification",
        relevance: "Framework for process improvement documentation and quality enhancement procedures",
        type: "framework",
        criticality: "medium",
        documentTypes: ["Process Improvement Plans", "Data Analysis Reports", "Project Documentation"]
      },
      {
        name: "EPA Clean Air Act Regulations",
        description: "Federal environmental regulations for air quality and emissions control",
        url: "https://www.epa.gov/clean-air-act-overview",
        authority: "Environmental Protection Agency",
        relevance: "Critical for environmental compliance documentation and emissions reporting",
        type: "regulation",
        criticality: "medium",
        documentTypes: ["Environmental Reports", "Compliance Procedures", "Monitoring Documentation"]
      },
      {
        name: "ISO 50001 (Energy Management)",
        description: "International standard for energy management systems and efficiency",
        url: "https://www.iso.org/iso-50001-energy-management.html",
        authority: "International Organization for Standardization",
        relevance: "Framework for energy efficiency documentation and sustainability reporting",
        type: "standard",
        criticality: "medium",
        documentTypes: ["Energy Management Plans", "Efficiency Reports", "Sustainability Documentation"]
      }
    ]
  },
  {
    id: 'government',
    title: "Government & Defense",
    description: "Federal acquisition regulations, security clearance requirements, and government contracting standards for public sector and defense contractors",
    shortDesc: "Federal contracting, security clearance, public sector",
    iconKey: 'government',
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    darkColor: "from-purple-600 to-purple-700",
    keyAreas: [
      "Federal Acquisition Regulation (FAR)",
      "Defense Federal Acquisition Regulation (DFARS)",
      "Security Clearance Requirements",
      "Export Control Regulations",
      "Cybersecurity Maturity Model"
    ],
    documentationFocus: [
      "Contract Documentation",
      "Security Procedures",
      "Compliance Manuals",
      "Training Materials",
      "Export Control Documentation"
    ],
    resources: [
      {
        name: "NIST SP 800-53 (Security Controls)",
        description: "Security and privacy controls for federal information systems",
        url: "https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final",
        authority: "National Institute of Standards and Technology",
        relevance: "Foundation for federal security documentation and compliance procedures",
        type: "standard",
        criticality: "high",
        documentTypes: ["Security Controls", "Compliance Documentation", "Risk Assessments"]
      },
      {
        name: "CMMC (Cybersecurity Maturity Model Certification)",
        description: "Cybersecurity standard for defense contractors in the supply chain",
        url: "https://www.acq.osd.mil/cmmc/",
        authority: "U.S. Department of Defense",
        relevance: "Critical for defense contractor cybersecurity documentation and procedures",
        type: "framework",
        criticality: "high",
        documentTypes: ["Security Documentation", "Compliance Procedures", "Training Materials"]
      }
    ]
  },
  {
    id: 'energy',
    title: "Energy & Utilities",
    description: "Power grid security, environmental regulations, nuclear safety standards for energy production and utility service providers",
    shortDesc: "Power generation, utilities, renewable energy",
    iconKey: 'energy',
    color: "from-yellow-500 to-yellow-600",
    bgColor: "bg-yellow-50",
    darkColor: "from-yellow-600 to-yellow-700",
    keyAreas: [
      "Critical Infrastructure Protection",
      "Nuclear Safety Standards",
      "Environmental Compliance",
      "Grid Security Standards",
      "Renewable Energy Regulations"
    ],
    documentationFocus: [
      "Safety Procedures",
      "Environmental Documentation",
      "Security Controls",
      "Emergency Response Plans",
      "Compliance Reporting"
    ],
    resources: [
      {
        name: "NERC CIP (Critical Infrastructure Protection)",
        description: "Cybersecurity standards for the bulk electric system",
        url: "https://www.nerc.com/pa/Stand/Pages/CIPStandards.aspx",
        authority: "North American Electric Reliability Corporation",
        relevance: "Essential for power grid cybersecurity documentation and procedures",
        type: "standard",
        criticality: "high",
        documentTypes: ["Security Procedures", "Compliance Documentation", "Incident Response"]
      },
      {
        name: "10 CFR Part 50 (Nuclear Power Plant Licensing)",
        description: "Nuclear Regulatory Commission requirements for nuclear power plants",
        url: "https://www.nrc.gov/reading-rm/doc-collections/cfr/part050/",
        authority: "Nuclear Regulatory Commission",
        relevance: "Critical for nuclear facility safety documentation and procedures",
        type: "regulation",
        criticality: "high",
        documentTypes: ["Safety Analysis Reports", "Operating Procedures", "Emergency Plans"]
      }
    ]
  },
  {
    id: 'education',
    title: "Education & Training",
    description: "Educational standards, student privacy requirements, accessibility compliance for educational institutions and training providers",
    shortDesc: "Academic institutions, training providers, EdTech",
    iconKey: 'education',
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
    darkColor: "from-indigo-600 to-indigo-700",
    keyAreas: [
      "Student Privacy Protection",
      "Accessibility Compliance",
      "Educational Technology Standards",
      "Accreditation Requirements",
      "Research Ethics"
    ],
    documentationFocus: [
      "Privacy Policies",
      "Accessibility Documentation",
      "Curriculum Standards",
      "Assessment Procedures",
      "Research Protocols"
    ],
    resources: [
      {
        name: "FERPA (Family Educational Rights and Privacy Act)",
        description: "Federal law protecting student educational records privacy",
        url: "https://www2.ed.gov/policy/gen/guid/fpco/ferpa/index.html",
        authority: "U.S. Department of Education",
        relevance: "Essential for educational privacy documentation and data handling procedures",
        type: "regulation",
        criticality: "high",
        documentTypes: ["Privacy Policies", "Data Handling Procedures", "Student Records Management"]
      },
      {
        name: "ADA Section 508 (Accessibility)",
        description: "Federal requirements for accessible electronic and information technology",
        url: "https://www.section508.gov/",
        authority: "U.S. Access Board",
        relevance: "Critical for accessibility documentation and inclusive design procedures",
        type: "regulation",
        criticality: "high",
        documentTypes: ["Accessibility Guidelines", "Design Standards", "Testing Procedures"]
      }
    ]
  },
  {
    id: 'aerospace',
    title: "Aerospace & Defense",
    description: "Aviation safety standards, space industry regulations, defense contracting requirements for aerospace manufacturers and service providers",
    shortDesc: "Aviation, space, defense manufacturing",
    iconKey: 'aerospace',
    color: "from-cyan-500 to-cyan-600",
    bgColor: "bg-cyan-50",
    darkColor: "from-cyan-600 to-cyan-700",
    keyAreas: [
      "Aviation Safety Management",
      "Space System Standards",
      "Export Control Compliance",
      "Quality Assurance Systems",
      "Environmental Testing"
    ],
    documentationFocus: [
      "Safety Management Systems",
      "Quality Documentation",
      "Technical Specifications",
      "Testing Procedures",
      "Certification Documentation"
    ],
    resources: [
      {
        name: "AS9100 (Aerospace Quality Management)",
        description: "Quality management standard specifically for aerospace industry",
        url: "https://www.sae.org/standards/content/as9100d/",
        authority: "Society of Automotive Engineers",
        relevance: "Foundation for aerospace quality documentation and manufacturing procedures",
        type: "standard",
        criticality: "high",
        documentTypes: ["Quality Manuals", "Manufacturing Procedures", "Configuration Management"]
      },
      {
        name: "FAA Part 145 (Repair Station Certification)",
        description: "Federal Aviation Administration requirements for aircraft maintenance",
        url: "https://www.faa.gov/regulations_policies/advisory_circulars/index.cfm/go/document.information/documentid/1020264",
        authority: "Federal Aviation Administration",
        relevance: "Critical for aviation maintenance documentation and certification procedures",
        type: "regulation",
        criticality: "high",
        documentTypes: ["Maintenance Manuals", "Quality Control", "Training Documentation"]
      }
    ]
  },
  {
    id: 'biotechnology',
    title: "Biotechnology & Life Sciences",
    description: "Biotechnology research standards, genetic engineering regulations, and laboratory compliance requirements for biotech companies and research institutions",
    shortDesc: "Biotech research, genetic engineering, laboratory compliance",
    iconKey: 'biotechnology',
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
    darkColor: "from-emerald-600 to-emerald-700",
    keyAreas: [
      "Laboratory Quality Systems",
      "Genetic Engineering Compliance", 
      "Research Ethics & IRB",
      "Biosafety & Containment",
      "Intellectual Property Protection"
    ],
    documentationFocus: [
      "Research Protocols",
      "Laboratory SOPs",
      "Safety Procedures",
      "Ethics Documentation",
      "Patent Applications"
    ],
    resources: [
      {
        name: "NIH Guidelines for Research Involving Recombinant DNA",
        description: "Federal guidelines for recombinant DNA research and genetic engineering",
        url: "https://osp.od.nih.gov/biotechnology/nih-guidelines/",
        authority: "National Institutes of Health",
        relevance: "Essential for genetic engineering research documentation and safety procedures",
        type: "guideline",
        criticality: "high",
        documentTypes: ["Research Protocols", "Safety Procedures", "Containment Documentation"]
      },
      {
        name: "FDA Biological Product Regulations (21 CFR 600)",
        description: "Federal regulations for biological products and vaccines",
        url: "https://www.fda.gov/vaccines-blood-biologics/guidance-compliance-regulatory-information-biologics",
        authority: "U.S. Food and Drug Administration",
        relevance: "Critical for biologics manufacturing and clinical trial documentation",
        type: "regulation",
        criticality: "high",
        documentTypes: ["Manufacturing Procedures", "Clinical Protocols", "Quality Control"]
      },
      {
        name: "ICH Q7 Good Manufacturing Practice",
        description: "International guidelines for good manufacturing practice of active pharmaceutical ingredients",
        url: "https://www.ich.org/page/quality-guidelines",
        authority: "International Council for Harmonisation",
        relevance: "Foundation for pharmaceutical manufacturing documentation and quality systems",
        type: "guideline",
        criticality: "high",
        documentTypes: ["Manufacturing SOPs", "Quality Manuals", "Validation Documentation"]
      }
    ]
  },
  {
    id: 'telecommunications',
    title: "Telecommunications & Media",
    description: "Communications regulations, broadcasting standards, and data transmission requirements for telecom companies and media organizations",
    shortDesc: "Telecom infrastructure, broadcasting, digital media",
    iconKey: 'telecommunications',
    color: "from-rose-500 to-rose-600",
    bgColor: "bg-rose-50",
    darkColor: "from-rose-600 to-rose-700",
    keyAreas: [
      "FCC Compliance Requirements",
      "Network Security Standards",
      "Spectrum Management",
      "Emergency Communications",
      "Consumer Protection Rules"
    ],
    documentationFocus: [
      "Regulatory Filings",
      "Network Documentation",
      "Emergency Procedures",
      "Customer Service SOPs",
      "Technical Specifications"
    ],
    resources: [
      {
        name: "FCC Rules and Regulations",
        description: "Federal Communications Commission rules for telecommunications and broadcasting",
        url: "https://www.fcc.gov/wireless/bureau-divisions/technologies-systems-and-innovation-division/rules-regulations",
        authority: "Federal Communications Commission",
        relevance: "Essential for telecommunications compliance documentation and regulatory filings",
        type: "regulation",
        criticality: "high",
        documentTypes: ["Regulatory Filings", "Compliance Procedures", "Technical Documentation"]
      },
      {
        name: "ETSI Standards",
        description: "European Telecommunications Standards Institute specifications for telecom equipment",
        url: "https://www.etsi.org/standards",
        authority: "European Telecommunications Standards Institute",
        relevance: "Critical for equipment documentation and international compliance",
        type: "standard",
        criticality: "medium",
        documentTypes: ["Technical Specifications", "Testing Procedures", "Certification Documentation"]
      },
      {
        name: "NIST Privacy Framework",
        description: "Framework for managing privacy risks in telecommunications and data processing",
        url: "https://www.nist.gov/privacy-framework",
        authority: "National Institute of Standards and Technology",
        relevance: "Foundation for privacy documentation and data protection procedures",
        type: "framework",
        criticality: "high",
        documentTypes: ["Privacy Policies", "Data Protection Procedures", "Risk Assessments"]
      }
    ]
  }
];

export const getIndustryByKey = (key: string): IndustryCategory | undefined => {
  return industriesData.find(industry => industry.id === key);
};

export const getResourcesByType = (type: ComplianceResource['type']): ComplianceResource[] => {
  return industriesData.flatMap(industry => 
    industry.resources.filter(resource => resource.type === type)
  );
};

export const getResourcesByCriticality = (criticality: ComplianceResource['criticality']): ComplianceResource[] => {
  return industriesData.flatMap(industry => 
    industry.resources.filter(resource => resource.criticality === criticality)
  );
};
