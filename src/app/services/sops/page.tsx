import Navigation from '../../../components/layout/Navigation';
import EnhancedFooter from '../../../components/layout/EnhancedFooter';
import Link from 'next/link';

export default function SOPs() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation currentPage="/services/sops" />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Standard Operating Procedures
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Create clear, compliant, and actionable SOPs that improve efficiency, ensure consistency, 
              and meet regulatory requirements across your organization.
            </p>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Industries We Serve
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Manufacturing",
                description: "Quality control, safety procedures, equipment operation, and compliance documentation.",
                icon: "🏭",
                color: "bg-blue-100 dark:bg-blue-900"
              },
              {
                title: "Healthcare",
                description: "Patient care protocols, medical device procedures, and HIPAA-compliant processes.",
                icon: "🏥",
                color: "bg-green-100 dark:bg-green-900"
              },
              {
                title: "Financial Services",
                description: "Risk management, compliance procedures, and audit-ready documentation.",
                icon: "🏦",
                color: "bg-purple-100 dark:bg-purple-900"
              },
              {
                title: "Food & Beverage",
                description: "HACCP procedures, food safety protocols, and FDA compliance documentation.",
                icon: "🍽️",
                color: "bg-orange-100 dark:bg-orange-900"
              }
            ].map((industry, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${industry.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-2xl">{industry.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {industry.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {industry.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOP Components */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Complete SOP Development
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Process Analysis",
                description: "We analyze your current processes, identify gaps, and map workflows for optimal efficiency.",
                icon: "🔍"
              },
              {
                title: "Compliance Integration",
                description: "Embed regulatory requirements (OSHA, FDA, ISO) directly into procedure steps.",
                icon: "✅"
              },
              {
                title: "Step-by-Step Procedures",
                description: "Clear, numbered steps with decision points, safety warnings, and quality checkpoints.",
                icon: "📝"
              },
              {
                title: "Visual Documentation",
                description: "Flowcharts, diagrams, and photos that make complex procedures easy to follow.",
                icon: "📊"
              },
              {
                title: "Training Integration",
                description: "SOPs designed to support training programs and competency assessments.",
                icon: "🎓"
              },
              {
                title: "Version Control",
                description: "Document management systems that track changes, approvals, and distribution.",
                icon: "📋"
              }
            ].map((component, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                <div className="text-3xl mb-4">{component.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {component.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {component.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our SOP Process */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Our SOP Development Process
          </h2>
          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Process Discovery",
                description: "We interview subject matter experts, observe current processes, and identify regulatory requirements.",
                details: ["Stakeholder interviews", "Process observation", "Regulatory research", "Gap analysis"]
              },
              {
                step: "02",
                title: "Documentation Planning",
                description: "We design the SOP structure, format, and approval workflow that fits your organization.",
                details: ["Information architecture", "Template design", "Approval workflows", "Distribution planning"]
              },
              {
                step: "03",
                title: "Content Development",
                description: "We write clear, accurate procedures with built-in compliance and quality checkpoints.",
                details: ["Step-by-step writing", "Visual documentation", "Safety integration", "Quality reviews"]
              },
              {
                step: "04",
                title: "Validation & Testing",
                description: "We test procedures with actual users and refine based on feedback and usability testing.",
                details: ["User testing", "Expert review", "Compliance validation", "Final refinements"]
              }
            ].map((phase, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 w-24 h-24 bg-green-600 dark:bg-green-500 text-white rounded-full flex items-center justify-center text-xl font-bold mr-8">
                  {phase.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    {phase.title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                    {phase.description}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {phase.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-50 dark:bg-green-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Benefits of Professional SOPs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                metric: "50%",
                benefit: "Faster Employee Training",
                description: "New employees become productive faster with clear, step-by-step procedures."
              },
              {
                metric: "35%",
                benefit: "Reduction in Errors",
                description: "Standardized procedures reduce variability and improve quality outcomes."
              },
              {
                metric: "100%",
                benefit: "Audit Compliance",
                description: "Properly documented SOPs ensure you're always audit-ready."
              },
              {
                metric: "60%",
                benefit: "Less Supervision Needed",
                description: "Clear procedures reduce the need for constant oversight and questions."
              },
              {
                metric: "40%",
                benefit: "Improved Safety",
                description: "Safety procedures built into every step reduce incidents and liability."
              },
              {
                metric: "25%",
                benefit: "Cost Savings",
                description: "Efficient processes and reduced errors lead to significant cost reductions."
              }
            ].map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {item.metric}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {item.benefit}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-green-600 dark:bg-green-700">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Standardize Your Operations?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Let us help you create SOPs that improve efficiency, ensure compliance, and reduce training time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="inline-flex items-center bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition duration-300"
            >
              Start Your SOP Project
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              href="/resources"
              className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 rounded-lg font-semibold text-lg transition duration-300"
            >
              View Compliance Standards
            </Link>
          </div>
        </div>
      </section>

      <EnhancedFooter />
    </div>
  );
}
