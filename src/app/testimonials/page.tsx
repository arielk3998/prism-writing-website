import Navigation from '../../components/layout/Navigation';
import EnhancedFooter from '../../components/layout/EnhancedFooter';
import Link from 'next/link';
import { CTA_MESSAGES } from '../../lib/constants';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "VP of Engineering",
      company: "TechFlow Solutions",
      avatar: "/images/testimonials/sarah-chen.jpg",
      content: "Prism Writing transformed our API documentation from a developer's nightmare into something our team actually enjoys using. Our integration time dropped by 60% after they rewrote our docs.",
      rating: 5,
      project: "API Documentation Overhaul"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Operations Director",
      company: "ManufacturingPro Inc.",
      avatar: "/images/testimonials/michael-rodriguez.jpg",
      content: "The SOPs that Prism Writing created for our quality control processes have been game-changing. Our compliance scores improved dramatically, and new employees can now follow procedures without constant supervision.",
      rating: 5,
      project: "Standard Operating Procedures"
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Product Manager",
      company: "CloudSync",
      avatar: "/images/testimonials/emily-watson.jpg",
      content: "Our user manual was confusing and outdated. Prism Writing created clear, visual guides that our customers love. Support tickets related to product usage dropped by 45%.",
      rating: 5,
      project: "User Manual Redesign"
    },
    {
      id: 4,
      name: "David Park",
      role: "CTO",
      company: "FinTech Innovations",
      avatar: "/images/testimonials/david-park.jpg",
      content: "Working with Prism Writing was like having an extension of our own team. They understood our complex financial algorithms and created documentation that both our developers and clients can understand.",
      rating: 5,
      project: "Technical Documentation Suite"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Training Manager",
      company: "HealthFirst Systems",
      avatar: "/images/testimonials/lisa-thompson.jpg",
      content: "The training materials Prism Writing developed for our new software rollout were exceptional. Clear, comprehensive, and perfectly structured for our diverse user base.",
      rating: 5,
      project: "Training Materials Development"
    },
    {
      id: 6,
      name: "James Mitchell",
      role: "Startup Founder",
      company: "DevTools Pro",
      avatar: "/images/testimonials/james-mitchell.jpg",
      content: "As a startup, we needed professional documentation quickly. Prism Writing delivered high-quality API docs that helped us attract enterprise customers from day one.",
      rating: 5,
      project: "Startup Documentation Package"
    }
  ];

  const stats = [
    { number: "95%", label: "Client Satisfaction Rate" },
    { number: "40%", label: "Average Reduction in Support Tickets" },
    { number: "60%", label: "Faster Developer Onboarding" },
    { number: "100+", label: "Successful Projects Delivered" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navigation currentPage="/testimonials" />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            What Our Clients Say
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what companies say about working with Prism Writing and the impact our documentation has made on their business.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <blockquote className="text-gray-600 dark:text-gray-300 mb-6 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-4">
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                    <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Project: {testimonial.project}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            See Detailed Results
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Want to see the specific strategies and results behind these testimonials? 
            Our case studies dive deep into the challenges, solutions, and measurable outcomes.
          </p>
          <Link 
            href="/case-studies"
            className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition duration-300"
          >
            View Case Studies
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Video Testimonials
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 font-medium">Sarah Chen - TechFlow Solutions</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">API Documentation Success Story</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 font-medium">Michael Rodriguez - ManufacturingPro</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">SOP Implementation Results</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-indigo-600 dark:bg-indigo-700">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Join Our Success Stories?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how Prism Writing can transform your technical documentation and drive measurable business results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="inline-flex items-center bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition duration-300"
            >
              {CTA_MESSAGES.testimonials.primary}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              href="/portfolio"
              className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-3 rounded-lg font-semibold text-lg transition duration-300"
            >
              View Our Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <EnhancedFooter />
    </div>
  );
}
