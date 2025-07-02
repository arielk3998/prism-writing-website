import { ModernNavigation } from '@/components/ui/ModernComponents';
import EnhancedFooter from '../../components/layout/EnhancedFooter';
import { DarkModeToggle } from '@/components/ui/DarkModeToggle';
import ScrollToTop from '@/components/ui/ScrollToTop';
import Link from 'next/link';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "VP of Engineering",
      company: "TechFlow Solutions",
      industry: "SaaS",
      testimonial: "Prism Writing transformed our API documentation from a developer's nightmare into a user-friendly resource. Our API adoption increased by 40% within three months of the new docs going live.",
      project: "API Documentation Overhaul",
      results: "40% increase in API adoption, 60% reduction in support tickets"
    },
    {
      id: 2,
      name: "Dr. Michael Rodriguez",
      title: "Quality Assurance Director",
      company: "BioCare Medical Devices",
      industry: "Healthcare",
      testimonial: "Working with Prism Writing for our FDA submission documentation was exceptional. Their understanding of medical device regulations and ability to create compliant, clear documentation was crucial for our successful 510(k) approval.",
      project: "FDA 510(k) Submission Documentation",
      results: "Successful FDA approval, audit-ready documentation system"
    },
    {
      id: 3,
      name: "Jennifer Park",
      title: "Operations Manager",
      company: "Precision Manufacturing Corp",
      industry: "Manufacturing",
      testimonial: "The SOPs that Prism Writing created have revolutionized our training process. New employees are productive 50% faster, and we've seen a significant reduction in errors and compliance issues.",
      project: "Standard Operating Procedures",
      results: "50% faster employee training, 35% reduction in operational errors"
    },
    {
      id: 4,
      name: "David Kumar",
      title: "Compliance Officer",
      company: "SecureBank Financial",
      industry: "Financial Services",
      testimonial: "Prism Writing's expertise in financial regulations was evident from day one. They helped us create a comprehensive compliance documentation system that sailed through our audit with zero findings.",
      project: "Compliance Documentation System",
      results: "Zero audit findings, streamlined compliance processes"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      title: "Product Manager",
      company: "CloudSync Technologies",
      industry: "Enterprise Software",
      testimonial: "The user guides and training materials Prism Writing created for our enterprise software have been game-changing. Customer satisfaction scores increased dramatically, and support tickets dropped by half.",
      project: "User Guides & Training Materials",
      results: "25% increase in customer satisfaction, 50% reduction in support volume"
    },
    {
      id: 6,
      name: "Robert Hayes",
      title: "Environmental Health & Safety Manager",
      company: "GreenTech Industries",
      industry: "Environmental",
      testimonial: "Prism Writing's understanding of environmental regulations and safety protocols is impressive. They created documentation that not only meets OSHA requirements but actually improves our safety culture.",
      project: "Safety Procedures & Environmental Compliance",
      results: "100% OSHA compliance, 40% reduction in safety incidents"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <ModernNavigation
        logo={
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8">
              <svg viewBox="0 0 32 32" className="w-full h-full">
                <defs>
                  <linearGradient id="prismGradientTestimonials" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4f46e5" />
                    <stop offset="33%" stopColor="#0891b2" />
                    <stop offset="66%" stopColor="#059669" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>
                </defs>
                <path d="M 6 10 L 16 8 L 16 20 L 6 22 Z" fill="url(#prismGradientTestimonials)" opacity="0.95"/>
                <line x1="16" y1="11" x2="24" y2="9" stroke="#4f46e5" strokeWidth="2" opacity="0.9"/>
                <line x1="16" y1="14" x2="26" y2="14" stroke="#0891b2" strokeWidth="2" opacity="0.9"/>
                <line x1="16" y1="17" x2="24" y2="19" stroke="#dc2626" strokeWidth="2" opacity="0.9"/>
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Prism Writing
            </span>
          </Link>
        }
        navItems={[
          { label: 'Services', href: '/services' },
          { label: 'Portfolio', href: '/portfolio' },
          { label: 'Resources', href: '/resources' },
          { label: 'Blog', href: '/blog' },
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' }
        ]}
        actions={
          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            <Link href="/portal">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
                Portal
              </button>
            </Link>
          </div>
        }
      />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900 dark:to-blue-900">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Client Success Stories
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            See how Prism Writing has helped organizations across industries achieve their documentation goals 
            and drive measurable business results.
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">3</div>
              <div className="text-gray-600 dark:text-gray-300">Expert Team Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">15+</div>
              <div className="text-gray-600 dark:text-gray-300">Years Combined Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">8</div>
              <div className="text-gray-600 dark:text-gray-300">Specialization Areas</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">24h</div>
              <div className="text-gray-600 dark:text-gray-300">Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-4">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.title}</p>
                    <p className="text-sm text-indigo-600 dark:text-indigo-400">{testimonial.company}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="inline-block px-3 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                      {testimonial.industry}
                    </span>
                  </div>
                </div>
                
                <blockquote className="text-gray-600 dark:text-gray-300 mb-6 italic">
                  &ldquo;{testimonial.testimonial}&rdquo;
                </blockquote>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <strong>Project:</strong> {testimonial.project}
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">
                    <strong>Results:</strong> {testimonial.results}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-indigo-600 dark:bg-indigo-700">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Join Our Success Stories?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Let us help you achieve similar results with documentation that drives real business value.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="inline-flex items-center bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition duration-300"
            >
              Start Your Project
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              href="/portfolio"
              className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-3 rounded-lg font-semibold text-lg transition duration-300"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      <EnhancedFooter />
      <ScrollToTop />
    </div>
  );
}
