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
  Award
} from 'lucide-react';

const writingServices = [
  {
    icon: FileText,
    title: 'Business Writing',
    description: 'Professional content for reports, proposals, and corporate communications',
    features: ['Executive Reports', 'Business Proposals', 'White Papers', 'Case Studies'],
    startingPrice: '$150'
  },
  {
    icon: BookOpen,
    title: 'Academic Writing',
    description: 'Research papers, dissertations, and scholarly content',
    features: ['Research Papers', 'Dissertations', 'Literature Reviews', 'Academic Articles'],
    startingPrice: '$200'
  },
  {
    icon: Target,
    title: 'Content Creation',
    description: 'Engaging content for websites, blogs, and marketing materials',
    features: ['Blog Posts', 'Website Copy', 'Marketing Content', 'Social Media'],
    startingPrice: '$100'
  },
  {
    icon: Edit3,
    title: 'Editing & Proofreading',
    description: 'Professional editing and proofreading for all document types',
    features: ['Copy Editing', 'Proofreading', 'Style Guide Compliance', 'Quality Assurance'],
    startingPrice: '$75'
  }
];

const benefits = [
  {
    icon: Star,
    title: 'Expert Writers',
    description: 'Native speakers with industry expertise and advanced degrees'
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    description: '24-48 hour delivery for most projects with express options available'
  },
  {
    icon: Shield,
    title: 'Quality Guarantee',
    description: '100% satisfaction guarantee with unlimited revisions'
  },
  {
    icon: Award,
    title: 'Professional Standards',
    description: 'Following industry best practices and style guides'
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 section-padding">
          <div className="container">
            <div className="text-center section-header">
              <h1 className="heading-1 text-foreground mb-4">
                Professional Writing Services
              </h1>
              <p className="body-large text-muted max-w-3xl mx-auto">
                Expert writing and editing services for businesses, academics, and organizations. 
                Native English writers with industry expertise deliver exceptional content.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link href="/translation-quote">
                  <Button size="lg" className="hover:shadow-lg transition-all duration-300">
                    Get Custom Quote
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button variant="outline" size="lg" className="hover:shadow-md transition-all duration-300">
                    View Portfolio
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="section-padding">
          <div className="container">
            <div className="text-center section-header">
              <h2 className="heading-2 text-foreground mb-4">Our Writing Services</h2>
              <p className="body-large text-muted max-w-2xl mx-auto">
                Choose from our comprehensive range of professional writing and editing services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {writingServices.map((service, index) => (
                <Card key={service.title} className="hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <service.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
                          <p className="text-sm text-muted mt-1">{service.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-muted">Starting at</span>
                        <div className="text-xl font-bold text-primary">{service.startingPrice}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground">Includes:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-muted">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Link href="/translation-quote">
                        <Button variant="outline" className="w-full mt-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                          Get Quote for {service.title}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Translation Services CTA */}
        <div className="bg-gradient-to-r from-primary/5 to-blue-50 section-padding">
          <div className="container">
            <div className="text-center">
              <Globe className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="heading-2 text-foreground mb-4">Need Translation Services?</h2>
              <p className="body-large text-muted max-w-2xl mx-auto mb-8">
                Professional translation in 80+ languages with certified native speakers
              </p>
              <Link href="/translation-services">
                <Button size="lg" className="hover:shadow-lg transition-all duration-300">
                  Explore Translation Services
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="section-padding">
          <div className="container">
            <div className="text-center section-header">
              <h2 className="heading-2 text-foreground mb-4">Why Choose Our Services?</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div key={benefit.title} className="text-center card-white hover:shadow-lg transition-all duration-300">
                  <benefit.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-foreground text-background section-padding">
          <div className="container">
            <div className="text-center">
              <h2 className="heading-2 mb-4">Ready to Get Started?</h2>
              <p className="body-large mb-8 max-w-2xl mx-auto opacity-90">
                Get a custom quote for your project and connect with our expert writers today
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/translation-quote">
                  <Button size="lg" variant="secondary" className="hover:shadow-lg transition-all duration-300">
                    Get Custom Quote
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-foreground transition-all duration-300">
                  <Users className="w-4 h-4 mr-2" />
                  Contact Our Team
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}