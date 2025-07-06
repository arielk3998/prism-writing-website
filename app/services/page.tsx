'use client';

import React from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { 
  FileText, 
  Edit3, 
  Globe, 
  BookOpen, 
  Target, 
  Users,
  ArrowRight,
  CheckCircle,
  Star,
  Clock,
  Shield,
  Award,
  Sparkles,
  TrendingUp,
  Zap
} from 'lucide-react';

const writingServices = [
  {
    icon: FileText,
    title: 'Business Writing',
    description: 'Transform your business communications with enterprise-grade writing that commands attention and drives results',
    features: ['Executive Reports', 'Strategic Proposals', 'White Papers', 'Case Studies'],
    startingPrice: '$299',
    popular: false,
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    icon: BookOpen,
    title: 'Academic Writing',
    description: 'Scholarly excellence meets rigorous research standards. Publications that advance knowledge and careers',
    features: ['Research Papers', 'Dissertations', 'Literature Reviews', 'Academic Articles'],
    startingPrice: '$399',
    popular: true,
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    icon: Target,
    title: 'Content Creation',
    description: 'Magnetic content that captivates audiences and converts visitors into customers across all channels',
    features: ['Premium Blog Posts', 'Website Copy', 'Marketing Content', 'Social Media Strategy'],
    startingPrice: '$199',
    popular: false,
    gradient: 'from-emerald-500 to-teal-600'
  },
  {
    icon: Edit3,
    title: 'Editing & Proofreading',
    description: 'Precision editing that elevates your message from good to extraordinary with meticulous attention to detail',
    features: ['Developmental Editing', 'Copy Editing', 'Proofreading', 'Style Guide Compliance'],
    startingPrice: '$149',
    popular: false,
    gradient: 'from-orange-500 to-red-600'
  }
];

const benefits = [
  {
    icon: Star,
    title: 'World-Class Expertise',
    description: 'Elite writers with advanced degrees and 10+ years of industry experience delivering exceptional results'
  },
  {
    icon: Clock,
    title: 'Lightning Fast Delivery',
    description: 'Premium 12-24 hour turnaround with real-time project tracking and instant communication'
  },
  {
    icon: Shield,
    title: 'Ironclad Guarantee',
    description: 'Unlimited revisions, 100% satisfaction guarantee, and full money-back protection'
  },
  {
    icon: Award,
    title: 'Enterprise Excellence',
    description: 'Fortune 500 standards with ISO-certified processes and premium quality assurance'
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {/* Hero Section - Apple-inspired with Stripe elegance */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 dark:from-gray-950 dark:via-blue-950/30 dark:to-indigo-950/20">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
          <div className="relative container py-24 lg:py-32">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-blue-50 text-safe-accent ring-1 ring-blue-700/10 dark:bg-blue-950/50 dark:text-blue-300 dark:ring-blue-300/20 mb-8">
                <Sparkles className="w-4 h-4 mr-2" />
                World-Class Writing Excellence
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-safe mb-8">
                Transform Ideas Into 
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"> Impact</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-safe-muted max-w-3xl mx-auto leading-relaxed mb-12">
                Elite writing services that elevate your message, amplify your voice, and deliver 
                measurable results across every medium and market.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="/translation-quote">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Start Your Project
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold rounded-xl border-2 hover:shadow-lg transition-all duration-300">
                    <Award className="w-5 h-5 mr-2" />
                    View Portfolio
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Services Grid - Figma-inspired cards */}
        <div className="py-24">
          <div className="container">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold text-safe mb-6">
                Elite Writing Solutions
              </h2>
              <p className="text-xl text-safe-muted max-w-3xl mx-auto">
                Choose from our comprehensive suite of premium writing services, each crafted to 
                deliver exceptional results and measurable impact.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {writingServices.map((service, index) => (
                <Card key={service.title} className={`relative overflow-hidden border-0 bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 ${service.popular ? 'ring-2 ring-blue-500 ring-offset-4 dark:ring-offset-gray-950' : ''}`}>
                  {service.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient || 'from-gray-50 to-gray-100'} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <CardHeader className="relative p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient || 'from-blue-500 to-indigo-600'} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                          <service.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-safe mb-2">{service.title}</h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-safe-muted">Starting at</span>
                            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{service.startingPrice}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-lg text-safe-muted leading-relaxed">{service.description}</p>
                  </CardHeader>
                  
                  <CardContent className="relative p-8 pt-0">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-safe mb-4 flex items-center">
                          <CheckCircle className="w-5 h-5 text-safe-success mr-2" />
                          What's Included:
                        </h4>
                        <ul className="space-y-3">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-safe-muted">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Link href="/translation-quote" className="block">
                        <Button className={`w-full bg-gradient-to-r ${service.gradient || 'from-blue-600 to-indigo-600'} hover:from-blue-700 hover:to-indigo-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5`}>
                          <Zap className="w-5 h-5 mr-2" />
                          Start {service.title} Project
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Translation Services CTA - Stripe-inspired */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 py-24">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.6),transparent)] dark:bg-grid-slate-700/25"></div>
          <div className="relative container text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
              <Globe className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-safe mb-6">
              Global Translation Excellence
            </h2>
            <p className="text-xl text-safe-muted max-w-3xl mx-auto mb-10">
              Break down language barriers with our premium translation services. 
              Native speakers, certified quality, and lightning-fast delivery in 80+ languages.
            </p>
            <Link href="/translation-services">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                <Globe className="w-5 h-5 mr-2" />
                Explore Translation Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Premium Benefits Section - Apple-inspired */}
        <div className="py-24 bg-white dark:bg-gray-950">
          <div className="container">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold text-safe mb-6">
                The Prism Writing Advantage
              </h2>
              <p className="text-xl text-safe-muted max-w-3xl mx-auto">
                Experience the difference that premium quality, enterprise-grade processes, 
                and world-class expertise make in every project.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={benefit.title} className="group text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <benefit.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-safe mb-4">{benefit.title}</h3>
                  <p className="text-safe-muted leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Premium CTA Section - Figma-inspired */}
        <div className="relative overflow-hidden bg-gray-900 dark:bg-black py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-600/20"></div>
          <div className="absolute inset-0 bg-grid-slate-700/25 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.3),transparent)]"></div>
          <div className="relative container text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to Transform Your Message?
            </h2>
            <p className="text-xl text-safe-muted max-w-3xl mx-auto mb-12">
              Join thousands of satisfied clients who trust Prism Writing to deliver 
              exceptional results that drive success and exceed expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/translation-quote">
                <Button size="lg" className="bg-white text-safe hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Start Your Project Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-safe px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300">
                <Users className="w-5 h-5 mr-2" />
                Speak with an Expert
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}