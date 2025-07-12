"use client";

import React from "react";
import Link from "next/link";
import { createPageUrl } from "@/src/lib/page-utils";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { ArrowRight, Globe, PenTool, FileText, Star, CheckCircle } from "lucide-react";

export default function Home() {
  const services = [
    {
      icon: FileText,
      title: "Document Translation",
      description: "Professional translation across 40+ languages with industry expertise",
      features: ["Certified translations", "Native speaker review", "Legal & medical specialization"]
    },
    {
      icon: Globe,
      title: "Website Localization",
      description: "Complete cultural adaptation for international markets",
      features: ["SEO optimization", "CMS integration", "Cultural consulting"]
    },
    {
      icon: PenTool,
      title: "Content Writing",
      description: "Native content creation that resonates with local audiences",
      features: ["Marketing copy", "Technical writing", "Social media content"]
    }
  ];

  const stats = [
    { number: "40+", label: "Languages" },
    { number: "500+", label: "Projects Completed" },
    { number: "95%", label: "Client Satisfaction" },
    { number: "24/7", label: "Support Available" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechGlobal Inc.",
      quote: "Prism Writing transformed our global expansion. Their technical translation expertise is unmatched.",
      rating: 5
    },
    {
      name: "Marco Rodriguez",
      company: "Healthcare Solutions",
      quote: "The quality and cultural sensitivity of their medical translations gave us complete confidence.",
      rating: 5
    },
    {
      name: "Li Wei",
      company: "E-commerce Plus",
      quote: "Their website localization increased our international sales by 300%. Outstanding work.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-8 bg-blue-100 text-blue-800 border-blue-200">
              Trusted by 500+ Global Companies
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Break Language Barriers,
              <span className="text-gradient block">Build Global Success</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Professional translation, localization, and content writing services that help 
              businesses expand globally with confidence and cultural authenticity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={createPageUrl("Request")}>
                <Button size="lg" className="premium-gradient hover:opacity-90 transition-opacity text-lg px-8 py-6">
                  Get Free Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href={createPageUrl("Services")}>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 hover:bg-gray-50">
                  View Services
                </Button>
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
                <div className="text-4xl font-bold text-gradient mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Professional Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive language solutions tailored to your business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover-lift border-0 shadow-lg bg-white">
                <CardContent className="p-8">
                  <div className="w-12 h-12 premium-gradient rounded-lg flex items-center justify-center mb-6">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by businesses worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 premium-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Go Global?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses that trust us with their international expansion
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={createPageUrl("Request")}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 text-lg px-8 py-6">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href={createPageUrl("Contact")}>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-white text-white hover:bg-white hover:text-blue-600">
                Talk to Expert
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .premium-gradient {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
      `}</style>
    </div>
  );
}
