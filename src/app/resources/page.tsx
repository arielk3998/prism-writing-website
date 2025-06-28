import Navigation from '../../components/layout/Navigation';
import EnhancedFooter from '../../components/layout/EnhancedFooter';
import Link from 'next/link';

export default function Resources() {
  const resourceCategories = [
    {
      title: "Healthcare & Life Sciences",
      description: "Compliance standards for healthcare, medical devices, and life sciences documentation",
      icon: "🏥",
      color: "bg-green-100 dark:bg-green-900",
      iconColor: "text-green-600 dark:text-green-400",
      resources: [
        {
          name: "HIPAA (Health Insurance Portability and Accountability Act)",
          description: "Privacy and security standards for protected health information",
          url: "https://www.hhs.gov/hipaa/",
          authority: "U.S. Department of Health & Human Services",
          relevance: "Essential for healthcare documentation and training materials"
        },
        {
          name: "FDA 21 CFR Part 820 (Quality System Regulation)",
          description: "Quality management systems for medical device manufacturers",
          url: "https://www.fda.gov/medical-devices/postmarket-requirements-devices/quality-system-qs-regulationmedical-device-good-manufacturing-practices",
          authority: "U.S. Food and Drug Administration",
          relevance: "Critical for medical device documentation and SOPs"
        },
        {
          name: "ISO 13485 (Medical Devices Quality Management)",
          description: "International standard for quality management systems in medical devices",
          url: "https://www.iso.org/standard/59752.html",
          authority: "International Organization for Standardization",
          relevance: "Global standard for medical device documentation systems"
        },
        {
          name: "GxP Guidelines (Good Practice Guidelines)",
          description: "Quality guidelines for pharmaceutical and medical device industries",
          url: "https://www.fda.gov/drugs/pharmaceutical-quality-resources/facts-about-current-good-manufacturing-practices-cgmps",
          authority: "FDA and International Regulatory Bodies",
          relevance: "Essential for pharmaceutical documentation and training"
        }
      ]
    },
    {
      title: "Manufacturing & Industrial",
      description: "Safety, quality, and operational standards for manufacturing environments",
      icon: "🏭",
      color: "bg-blue-100 dark:bg-blue-900",
      iconColor: "text-blue-600 dark:text-blue-400",
      resources: [
        {
          name: "OSHA (Occupational Safety and Health Administration)",
          description: "Workplace safety and health standards and regulations",
          url: "https://www.osha.gov/",
          authority: "U.S. Department of Labor",
          relevance: "Mandatory for all workplace safety documentation and training"
        },
        {
          name: "ISO 9001 (Quality Management Systems)",
          description: "International standard for quality management systems",
          url: "https://www.iso.org/iso-9001-quality-management.html",
          authority: "International Organization for Standardization",
          relevance: "Foundation for quality documentation and process control"
        },
        {
          name: "ISO 45001 (Occupational Health and Safety)",
          description: "International standard for occupational health and safety management",
          url: "https://www.iso.org/iso-45001-occupational-health-and-safety.html",
          authority: "International Organization for Standardization",
          relevance: "Global framework for safety management documentation"
        },
        {
          name: "ANSI (American National Standards Institute)",
          description: "Coordinates U.S. voluntary consensus standards system",
          url: "https://www.ansi.org/",
          authority: "American National Standards Institute",
          relevance: "Source for industry-specific technical standards and documentation"
        }
      ]
    },
    {
      title: "Financial Services",
      description: "Regulatory compliance for financial institutions and fintech companies",
      icon: "🏦",
      color: "bg-purple-100 dark:bg-purple-900",
      iconColor: "text-purple-600 dark:text-purple-400",
      resources: [
        {
          name: "SOX (Sarbanes-Oxley Act)",
          description: "Financial reporting and corporate governance requirements",
          url: "https://www.sec.gov/about/laws/soa2002.pdf",
          authority: "U.S. Securities and Exchange Commission",
          relevance: "Critical for financial documentation and audit procedures"
        },
        {
          name: "GDPR (General Data Protection Regulation)",
          description: "Data protection and privacy regulation for EU operations",
          url: "https://gdpr.eu/",
          authority: "European Union",
          relevance: "Essential for data handling procedures and privacy documentation"
        },
        {
          name: "PCI DSS (Payment Card Industry Data Security Standard)",
          description: "Security standards for credit card data protection",
          url: "https://www.pcisecuritystandards.org/",
          authority: "PCI Security Standards Council",
          relevance: "Required for payment processing documentation and procedures"
        },
        {
          name: "FFIEC Guidelines",
          description: "Federal financial institutions examination guidelines",
          url: "https://www.ffiec.gov/",
          authority: "Federal Financial Institutions Examination Council",
          relevance: "Banking and financial institution compliance documentation"
        }
      ]
    },
    {
      title: "Technology & Software",
      description: "Standards for software development, cybersecurity, and IT operations",
      icon: "💻",
      color: "bg-indigo-100 dark:bg-indigo-900",
      iconColor: "text-indigo-600 dark:text-indigo-400",
      resources: [
        {
          name: "NIST Cybersecurity Framework",
          description: "Framework for improving critical infrastructure cybersecurity",
          url: "https://www.nist.gov/cyberframework",
          authority: "National Institute of Standards and Technology",
          relevance: "Foundation for cybersecurity documentation and procedures"
        },
        {
          name: "ISO 27001 (Information Security Management)",
          description: "International standard for information security management systems",
          url: "https://www.iso.org/isoiec-27001-information-security.html",
          authority: "International Organization for Standardization",
          relevance: "Global standard for information security documentation"
        },
        {
          name: "ITIL (Information Technology Infrastructure Library)",
          description: "Best practices for IT service management",
          url: "https://www.axelos.com/best-practice-solutions/itil",
          authority: "AXELOS",
          relevance: "Framework for IT operations and service management documentation"
        },
        {
          name: "WCAG (Web Content Accessibility Guidelines)",
          description: "Guidelines for making web content accessible to people with disabilities",
          url: "https://www.w3.org/WAI/WCAG21/quickref/",
          authority: "World Wide Web Consortium (W3C)",
          relevance: "Essential for accessible documentation and user interface design"
        }
      ]
    },
    {
      title: "Environmental & Safety",
      description: "Environmental protection and workplace safety standards",
      icon: "🌱",
      color: "bg-green-100 dark:bg-green-900",
      iconColor: "text-green-600 dark:text-green-400",
      resources: [
        {
          name: "EPA (Environmental Protection Agency)",
          description: "Environmental regulations and compliance requirements",
          url: "https://www.epa.gov/",
          authority: "U.S. Environmental Protection Agency",
          relevance: "Required for environmental compliance documentation"
        },
        {
          name: "ISO 14001 (Environmental Management Systems)",
          description: "International standard for environmental management systems",
          url: "https://www.iso.org/iso-14001-environmental-management.html",
          authority: "International Organization for Standardization",
          relevance: "Global framework for environmental management documentation"
        },
        {
          name: "OSHA Hazard Communication Standard",
          description: "Requirements for chemical hazard communication in the workplace",
          url: "https://www.osha.gov/hazcom/",
          authority: "Occupational Safety and Health Administration",
          relevance: "Critical for safety data sheets and chemical handling procedures"
        },
        {
          name: "RCRA (Resource Conservation and Recovery Act)",
          description: "Federal law governing disposal of solid and hazardous waste",
          url: "https://www.epa.gov/rcra",
          authority: "U.S. Environmental Protection Agency",
          relevance: "Essential for waste management and disposal documentation"
        }
      ]
    }
  ];

  const documentationStandards = [
    {
      name: "IEEE Standards for Documentation",
      description: "Professional standards for technical documentation",
      url: "https://standards.ieee.org/",
      category: "Technical Writing"
    },
    {
      name: "Society for Technical Communication (STC)",
      description: "Professional organization advancing technical communication",
      url: "https://www.stc.org/",
      category: "Professional Development"
    },
    {
      name: "Plain Language Guidelines",
      description: "Federal guidelines for clear government communication",
      url: "https://www.plainlanguage.gov/",
      category: "Writing Standards"
    },
    {
      name: "API Documentation Standards",
      description: "OpenAPI Specification for API documentation",
      url: "https://swagger.io/specification/",
      category: "Technical Standards"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navigation currentPage="/resources" />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Compliance & Standards Resources
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Official standards, regulations, and guidelines that inform our documentation practices. 
            We ensure all deliverables meet or exceed industry compliance requirements.
          </p>
        </div>
      </section>

      {/* Compliance Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Compliance Matters
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              In regulated industries, documentation isn&apos;t just about usability—it&apos;s about legal compliance, 
              safety, and risk management. Our team stays current with all relevant standards to ensure your 
              documentation meets regulatory requirements.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚖️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Legal Compliance</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ensure your documentation meets all regulatory requirements and legal standards for your industry.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Risk Mitigation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Proper documentation reduces liability and helps prevent costly compliance violations.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Audit Readiness</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Well-documented processes and procedures make audits smoother and more successful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Standards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Industry-Specific Standards
          </h2>
          
          <div className="space-y-12">
            {resourceCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className={`${category.color} px-6 py-4`}>
                  <div className="flex items-center">
                    <span className="text-3xl mr-4">{category.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {category.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {category.resources.map((resource, resourceIndex) => (
                      <div key={resourceIndex} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                            {resource.name}
                          </h4>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 ml-2 flex-shrink-0"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                          {resource.description}
                        </p>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                          <strong>Authority:</strong> {resource.authority}
                        </div>
                        <div className="text-xs text-indigo-600 dark:text-indigo-400">
                          <strong>Relevance:</strong> {resource.relevance}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Standards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Professional Documentation Standards
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {documentationStandards.map((standard, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900 px-2 py-1 rounded-full">
                    {standard.category}
                  </span>
                  <a
                    href={standard.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  {standard.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {standard.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Apply These Standards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              How We Apply These Standards
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our team doesn&apos;t just reference these standards—we actively incorporate them into every project.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Compliance Assessment
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We start every project by identifying applicable standards and compliance requirements for your industry.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Standard Integration
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We build compliance requirements directly into our documentation structure and content strategy.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Ongoing Monitoring
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We stay current with regulatory changes and update documentation to maintain compliance over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-indigo-600 dark:bg-indigo-700">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Need Compliant Documentation?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Let our experts ensure your documentation meets all relevant industry standards and regulatory requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="inline-flex items-center bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition duration-300"
            >
              Discuss Your Compliance Needs
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              href="/services"
              className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-3 rounded-lg font-semibold text-lg transition duration-300"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <EnhancedFooter />
    </div>
  );
}
