'use client';

import Navigation from '../../components/layout/Navigation';
import EnhancedFooter from '../../components/layout/EnhancedFooter';
import Link from 'next/link';
import { useState } from 'react';

export default function FAQ() {
  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          id: 1,
          question: "What types of technical documentation do you create?",
          answer: "We specialize in API documentation, user guides, standard operating procedures (SOPs), training materials, process documentation, and onboarding guides. Whether you need comprehensive developer documentation or user-friendly guides for your customers, we create content that drives results."
        },
        {
          id: 2,
          question: "How do you ensure the documentation matches our brand and voice?",
          answer: "We start every project with a discovery phase where we learn about your brand, audience, and existing style guidelines. We'll work with your team to establish the right tone and ensure all documentation feels like a natural extension of your brand."
        },
        {
          id: 3,
          question: "What's your typical project timeline?",
          answer: "Project timelines vary based on scope and complexity. Simple user guides typically take 2-3 weeks, comprehensive API documentation takes 4-6 weeks, and larger projects like complete documentation overhauls can take 8-12 weeks. We always provide realistic timelines upfront and keep you updated throughout the process."
        }
      ]
    },
    {
      category: "Process & Collaboration",
      questions: [
        {
          id: 4,
          question: "How do you work with our existing development team?",
          answer: "We integrate seamlessly with your existing workflows. We can work with your developers through Slack, participate in sprint planning, review pull requests, and use whatever project management tools your team prefers. Our goal is to enhance your team's capabilities, not disrupt your processes."
        },
        {
          id: 5,
          question: "Do you provide ongoing maintenance and updates?",
          answer: "Yes! We offer maintenance packages for ongoing documentation updates, quarterly reviews, and content optimization. Many of our clients find this especially valuable for API documentation that changes frequently or SOPs that need regular updates."
        },
        {
          id: 6,
          question: "Can you work with our existing documentation tools and platforms?",
          answer: "Absolutely. We're experienced with popular documentation platforms like GitBook, Notion, Confluence, Read the Docs, and custom developer portals. We can also help you choose the right platform if you're starting fresh."
        }
      ]
    },
    {
      category: "Quality & Results",
      questions: [
        {
          id: 7,
          question: "How do you ensure documentation accuracy?",
          answer: "We use a rigorous review process that includes technical validation with your team, user testing when possible, and multiple rounds of editing. For API documentation, we test every endpoint. For user guides, we follow every step ourselves to ensure accuracy."
        },
        {
          id: 8,
          question: "What kind of results can we expect?",
          answer: "Our clients typically see 40-60% reduction in support tickets, faster user onboarding, improved developer adoption rates, and higher customer satisfaction scores. We can provide specific case studies and metrics based on your industry and documentation type."
        },
        {
          id: 9,
          question: "Do you help with documentation strategy and information architecture?",
          answer: "Yes, absolutely. We don't just write content – we help you structure information logically, prioritize content based on user needs, and create documentation that scales with your product. Many clients find our strategic input as valuable as the writing itself."
        }
      ]
    },
    {
      category: "Pricing & Contracts",
      questions: [
        {
          id: 10,
          question: "How do you price your services?",
          answer: "We offer both project-based and retainer pricing. Most projects are quoted based on scope, complexity, and timeline. We provide detailed estimates upfront with no surprises. Retainer clients get priority access and discounted rates for ongoing work."
        },
        {
          id: 11,
          question: "Do you offer rush or emergency documentation services?",
          answer: "Yes, we can accommodate urgent projects when possible. Rush jobs typically include a premium fee and may require additional resources, but we understand that sometimes documentation needs to be delivered quickly for product launches or compliance deadlines."
        },
        {
          id: 12,
          question: "What's included in your project pricing?",
          answer: "All our project quotes include research, writing, editing, formatting, and reasonable revisions. We also include project management, regular check-ins, and final delivery in your preferred format. Additional rounds of major revisions may incur extra fees, but we always discuss this upfront."
        }
      ]
    },
    {
      category: "Industries & Specializations",
      questions: [
        {
          id: 13,
          question: "Do you work with companies in regulated industries?",
          answer: "Yes, we have experience with healthcare, financial services, manufacturing, and other regulated industries. We understand compliance requirements and can create documentation that meets regulatory standards while remaining user-friendly."
        },
        {
          id: 14,
          question: "Can you handle highly technical or niche subjects?",
          answer: "Our team includes writers with backgrounds in software engineering, data science, and various technical fields. We're comfortable learning new technologies and working with subject matter experts to ensure accuracy in specialized domains."
        },
        {
          id: 15,
          question: "Do you work with startups or only established companies?",
          answer: "We work with companies of all sizes, from early-stage startups to Fortune 500 enterprises. We understand that startups have different needs and constraints, and we offer flexible packages and pricing to accommodate growing companies."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navigation currentPage="/faq" />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Get answers to common questions about our technical writing services, process, and how we can help improve your documentation.
          </p>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Don&apos;t see your question answered below?
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
          >
            Get in touch for a personalized answer
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 pb-4 border-b-2 border-indigo-200 dark:border-indigo-800">
                {category.category}
              </h2>
              <div className="space-y-6">
                {category.questions.map((faq) => (
                  <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-blue-600">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Still Have Questions?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            We&apos;re here to help! Schedule a free consultation to discuss your specific documentation needs and how we can help achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="inline-flex items-center bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition duration-300"
            >
              Schedule Free Consultation
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </Link>
            <Link 
              href="mailto:hello@prismwriting.com"
              className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-3 rounded-lg font-semibold text-lg transition duration-300"
            >
              Email Us Directly
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <EnhancedFooter />
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <button
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
          {question}
        </h3>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}
