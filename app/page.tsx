import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Globe2, 
  Users, 
  Clock, 
  Shield, 
  Award, 
  ArrowRight,
  CheckCircle,
  Star,
  MessageSquare
} from 'lucide-react';
import Layout from '../components/Layout';
import { TranslationServiceCard } from '../components/TranslationNavigationItems';

export const metadata: Metadata = {
  title: 'Prism Writing - Professional Writing, Editing & Translation Services',
  description: 'Expert writing, editing, and translation services for businesses and individuals. Professional translations in 100+ languages with certified translators.',
  keywords: 'writing services, editing, proofreading, translation services, professional writing, content creation'
};

export default function HomePage() {
  const services = [
    {
      icon: '✍️',
      title: 'Writing Services',
      description: 'Professional content creation, copywriting, and creative writing.',
      href: '/services'
    },
    {
      icon: '✏️',
      title: 'Editing & Proofreading',
      description: 'Expert editing and proofreading to perfect your documents.',
      href: '/services'
    },
    {
      icon: '🌍',
      title: 'Translation Services',
      description: 'Professional translation in 100+ languages by certified experts.',
      href: '/translation-services'
    }
  ];

  const stats = [
    { number: '1000+', label: 'Projects Completed' },
    { number: '100+', label: 'Languages Supported' },
    { number: '500+', label: 'Happy Clients' },
    { number: '99.8%', label: 'Accuracy Rate' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'Tech Innovations Inc.',
      text: 'Prism Writing delivered exceptional translations for our global product launch. Their attention to detail and cultural nuances was impressive.',
      rating: 5
    },
    {
      name: 'Marcus Chen',
      company: 'Healthcare Solutions',
      text: 'Fast, accurate, and professional. They handled our medical documentation translation with expertise and confidentiality.',
      rating: 5
    },
    {
      name: 'Elena Rodriguez',
      company: 'Legal Associates',
      text: 'Outstanding legal translation services. They understood the complexity and delivered certified translations on time.',
      rating: 5
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Professional Writing &<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  Translation Services
                </span>
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
                Expert writing, editing, and translation services for businesses and individuals. 
                Break language barriers with certified translators covering every language in the world.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link 
                  href="/translation-services"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center space-x-2"
                >
                  <Globe2 className="w-5 h-5" />
                  <span>Explore Translation Services</span>
                </Link>
                <Link 
                  href="/translation-quote"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Get Free Quote</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Professional writing, editing, and translation services to help you communicate 
                effectively across languages and cultures.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Link 
                  key={index}
                  href={service.href}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow group"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured: Translation Services */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Professional Translation Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Break language barriers with our expert translation services. 
                Professional translators for every language in the world.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <TranslationServiceCard />
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe2 className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">100+ Languages</h3>
                <p className="text-gray-600 text-sm">Complete coverage of world languages</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Expert Translators</h3>
                <p className="text-gray-600 text-sm">Certified native speakers</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
                <p className="text-gray-600 text-sm">24-48 hour turnaround available</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Secure & Confidential</h3>
                <p className="text-gray-600 text-sm">Enterprise-grade security</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
              <p className="text-xl text-gray-600">
                Trusted by businesses and individuals worldwide
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get professional writing, editing, and translation services today. 
              Fast, accurate, and reliable solutions for all your communication needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/translation-services"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Explore Services
              </Link>
              <Link
                href="/translation-quote"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Get Free Quote
              </Link>
            </div>
            <div className="mt-8 text-sm opacity-80">
              ✓ Free quotes ✓ Fast delivery ✓ 100% satisfaction guarantee
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
