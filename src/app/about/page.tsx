import Navigation from '../../components/layout/Navigation';
import EnhancedFooter from '../../components/layout/EnhancedFooter';
import { siteConfig } from '../../config/siteConfig';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navigation currentPage="/about" />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About {siteConfig.company.shortName}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            We&apos;re a technical writing cooperative dedicated to transforming complex technical concepts 
            into clear, accessible documentation that empowers users and drives adoption.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                At {siteConfig.company.shortName}, we believe that great documentation is the bridge between innovative technology 
                and successful user adoption. Our mission is to make complex technical information accessible, 
                actionable, and engaging for diverse audiences.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                As a cooperative, we bring together experienced technical writers who share a commitment to 
                excellence, collaboration, and continuous learning. This structure allows us to offer specialized 
                expertise while maintaining the agility and personal attention of a boutique firm.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Our cooperative model ensures fair compensation for our writers while delivering exceptional 
                value to our clients through collaborative expertise and shared accountability.
              </p>
            </div>
            <div className="lg:pl-8">
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900 dark:to-blue-900 rounded-lg p-8">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Why Choose a Cooperative?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Shared Expertise</h4>
                      <p className="text-gray-600 dark:text-gray-300">Multiple writers collaborate on complex projects</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Quality Assurance</h4>
                      <p className="text-gray-600 dark:text-gray-300">Peer review ensures consistent high standards</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Fair Practices</h4>
                      <p className="text-gray-600 dark:text-gray-300">Transparent pricing and ethical business model</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Expertise</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our cooperative brings together writers with diverse backgrounds and specialized knowledge across industries and technologies.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Software Development</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Former developers and engineers who understand code, APIs, and software architecture from the inside out.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 4h6m-6 4h6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Business & Strategy</h3>
              <p className="text-gray-600 dark:text-gray-300">
                MBAs and business analysts who excel at translating technical capabilities into business value.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Education & Training</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Instructional designers and educators who specialize in learning-focused documentation and training materials.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Compliance & Regulatory</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Legal and compliance experts who navigate complex regulatory requirements in healthcare, finance, and manufacturing.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">User Experience</h3>
              <p className="text-gray-600 dark:text-gray-300">
                UX researchers and designers who ensure documentation serves real user needs and workflows.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Content Strategy</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Marketing and content strategists who understand how documentation fits into broader customer journeys.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              These principles guide everything we do, from how we work together to how we serve our clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Clarity First</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We prioritize clear, concise communication over technical jargon. If users can&apos;t understand it, we haven&apos;t done our job.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Collaborative Excellence</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We work closely with your team to understand context, goals, and user needs. The best documentation comes from partnership.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">User-Centered Design</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Every document we create is designed with the end user in mind. We consider their context, skills, and goals at every step.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Continuous Improvement</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We measure the success of our documentation through user feedback and analytics, constantly refining our approach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 dark:bg-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how our cooperative approach can transform your technical documentation.
          </p>
          <a href="/contact" className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors inline-block">
            Start a Conversation
          </a>
        </div>
      </section>

      {/* Enhanced Footer */}
      <EnhancedFooter />
    </div>
  );
}
