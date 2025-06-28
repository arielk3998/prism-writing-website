import Navigation from '../../components/layout/Navigation';
import EnhancedFooter from '../../components/layout/EnhancedFooter';
import Link from 'next/link';

export default function FAQ() {
  const faqs = [
    {
      category: "Services & Pricing",
      questions: [
        {
          question: "What types of technical documentation do you create?",
          answer: "We specialize in API documentation, user guides, standard operating procedures (SOPs), training materials, compliance documentation, and technical blog content. Our expertise spans healthcare, manufacturing, financial services, and technology sectors."
        },
        {
          question: "How do you determine pricing for projects?",
          answer: "Pricing depends on project complexity, timeline, and scope. We offer fixed-price projects for defined deliverables and hourly rates for ongoing support. Contact us for a custom quote based on your specific needs."
        },
        {
          question: "What is your typical project timeline?",
          answer: "Standard projects typically take 3-4 weeks. Rush jobs can be completed in 1-2 weeks with premium pricing. Larger, comprehensive documentation projects may take 1-3 months depending on scope and complexity."
        }
      ]
    },
    {
      category: "Process & Quality",
      questions: [
        {
          question: "How do you ensure compliance with industry standards?",
          answer: "Our team stays current with industry-specific regulations including HIPAA, ISO standards, OSHA requirements, and more. We incorporate compliance requirements into our documentation structure and review processes."
        },
        {
          question: "What is your revision and feedback process?",
          answer: "We provide drafts for review at key milestones, incorporate feedback iteratively, and offer unlimited revisions during the project period. Our collaborative portal allows real-time feedback and tracking."
        },
        {
          question: "Do you provide ongoing maintenance and updates?",
          answer: "Yes, we offer maintenance retainers for keeping documentation current with product updates, regulatory changes, and user feedback. This ensures your documentation remains accurate and valuable over time."
        }
      ]
    },
    {
      category: "Cooperative Model",
      questions: [
        {
          question: "What is a technical writing cooperative?",
          answer: "A cooperative is a business owned and operated by its members. Our writers share ownership, decision-making, and profits. This structure ensures fair compensation for writers while maintaining competitive pricing for clients."
        },
        {
          question: "How does the cooperative model benefit clients?",
          answer: "You get access to diverse expertise from multiple specialized writers, collaborative quality assurance, and the personal attention of a boutique firm with the resources of a larger team."
        },
        {
          question: "Who will work on my project?",
          answer: "Projects are assigned based on expertise and availability. You'll have a primary writer and access to our collaborative review process. For larger projects, multiple writers may contribute their specialized knowledge."
        }
      ]
    },
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I get started with Prism Writing?",
          answer: "Contact us through our contact form or portal. We'll schedule a consultation to understand your needs, provide a detailed proposal, and outline the project timeline and deliverables."
        },
        {
          question: "What information do you need to start a project?",
          answer: "We need project goals, target audience, existing materials, timeline, compliance requirements, and access to subject matter experts. The more context you provide, the better we can serve your needs."
        },
        {
          question: "Do you work with remote teams?",
          answer: "Absolutely! We're experienced in remote collaboration and work with distributed teams worldwide. Our digital-first processes ensure seamless communication and project management regardless of location."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation currentPage="/faq" />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900 dark:to-blue-900">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Find answers to common questions about our services, process, and cooperative model.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
                {category.category}
              </h2>
              <div className="space-y-6">
                {category.questions.map((faq, faqIndex) => (
                  <div key={faqIndex} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-indigo-600 dark:bg-indigo-700">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Still Have Questions?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            We&apos;re here to help! Contact us for personalized answers to your specific questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="inline-flex items-center bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition duration-300"
            >
              Contact Us
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              href="/portal"
              className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-3 rounded-lg font-semibold text-lg transition duration-300"
            >
              Access Portal
            </Link>
          </div>
        </div>
      </section>

      <EnhancedFooter />
    </div>
  );
}
