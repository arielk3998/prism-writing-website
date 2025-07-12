"use client";

import React from "react";
import Link from "next/link";
import { createPageUrl } from "@/src/lib/page-utils";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { 
  FileText, 
  Globe, 
  PenTool, 
  Users, 
  Shield, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Languages,
  Search,
  Smartphone,
  BookOpen,
  Briefcase,
  Heart
} from "lucide-react";

export default function Services() {
  const mainServices = [
    {
      id: "document-translation",
      icon: FileText,
      title: "Document Translation",
      subtitle: "Professional & Certified",
      description: "Accurate translation of business documents, legal papers, medical records, and technical manuals across 40+ languages.",
      features: [
        "Certified translations for official use",
        "Native speaker review and quality assurance",
        "Industry-specific expertise (legal, medical, technical)",
        "Bulk document processing capabilities",
        "Confidentiality and security guaranteed"
      ],
      industries: ["Legal", "Medical", "Technical", "Financial", "Academic"],
      pricing: "Starting at $0.12/word",
      turnaround: "24-72 hours"
    },
    {
      id: "website-localization",
      icon: Globe,
      title: "Website Localization",
      subtitle: "Cultural Adaptation",
      description: "Complete website translation and cultural adaptation to help your business succeed in international markets.",
      features: [
        "SEO optimization for international markets",
        "Content management system integration",
        "Cultural sensitivity consulting",
        "Multi-language support infrastructure",
        "User experience optimization"
      ],
      industries: ["E-commerce", "Technology", "Healthcare", "Education", "Travel"],
      pricing: "Custom quote based on scope",
      turnaround: "1-4 weeks"
    },
    {
      id: "content-writing",
      icon: PenTool,
      title: "Content Writing & Copywriting",
      subtitle: "Native & Engaging",
      description: "Native content creation that resonates with local audiences, from marketing copy to technical documentation.",
      features: [
        "Marketing copy that converts",
        "Technical writing in multiple languages",
        "Blog content and article creation",
        "Social media content localization",
        "Brand voice consistency across languages"
      ],
      industries: ["Marketing", "Technology", "Finance", "Healthcare", "Retail"],
      pricing: "Starting at $0.25/word",
      turnaround: "3-7 days"
    }
  ];

  const additionalServices = [
    {
      icon: Languages,
      title: "Interpretation Services",
      description: "Live interpretation for meetings, conferences, and business events"
    },
    {
      icon: Search,
      title: "SEO Translation",
      description: "Keyword research and SEO-optimized content for international markets"
    },
    {
      icon: Smartphone,
      title: "App Localization",
      description: "Mobile and web application translation and cultural adaptation"
    },
    {
      icon: BookOpen,
      title: "E-learning Translation",
      description: "Educational content translation with pedagogical considerations"
    }
  ];

  const qualityAssurance = [
    {
      icon: Users,
      title: "Native Speakers",
      description: "All translations by native speakers with industry expertise"
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Multi-step review process including proofreading and editing"
    },
    {
      icon: Clock,
      title: "On-Time Delivery",
      description: "98% on-time delivery rate with transparent project tracking"
    },
    {
      icon: CheckCircle,
      title: "Satisfaction Guarantee",
      description: "Unlimited revisions until you're completely satisfied"
    }
  ];

  const industries = [
    { icon: Briefcase, name: "Legal", description: "Contracts, patents, compliance documents" },
    { icon: Heart, name: "Medical", description: "Clinical trials, medical devices, patient records" },
    { icon: Globe, name: "Technology", description: "Software, user manuals, technical specifications" },
    { icon: Users, name: "Marketing", description: "Campaigns, websites, brand materials" },
    { icon: Shield, name: "Financial", description: "Reports, prospectuses, regulatory filings" },
    { icon: BookOpen, name: "Education", description: "Academic papers, course materials, certifications" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200">
              Professional Language Services
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Translation &
              <span className="text-gradient block">Content Solutions</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              From document translation to website localization, we provide end-to-end language 
              services that help businesses communicate effectively across cultures.
            </p>
            <Link href={createPageUrl("Request")}>
              <Button size="lg" className="premium-gradient hover:opacity-90 transition-opacity">
                Get Custom Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Services
            </h2>
            <p className="text-xl text-gray-600">
              Tailored solutions for your global communication needs
            </p>
          </div>

          <div className="space-y-16">
            {mainServices.map((service, index) => (
              <div key={service.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <Card className="hover-lift border-0 shadow-lg">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 premium-gradient rounded-xl flex items-center justify-center mb-6">
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <Badge className="mb-4 bg-blue-50 text-blue-700">{service.subtitle}</Badge>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                      <p className="text-gray-600 mb-6">{service.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Industries</h4>
                          <div className="flex flex-wrap gap-2">
                            {service.industries.map((industry, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {industry}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="mb-3">
                            <h4 className="font-semibold text-gray-900 mb-1">Pricing</h4>
                            <p className="text-sm text-gray-600">{service.pricing}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Turnaround</h4>
                            <p className="text-sm text-gray-600">{service.turnaround}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h4>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Additional Services
            </h2>
            <p className="text-xl text-gray-600">
              Specialized solutions for unique requirements
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => (
              <Card key={index} className="hover-lift border-0 shadow-lg bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 premium-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quality You Can Trust
            </h2>
            <p className="text-xl text-gray-600">
              Our commitment to excellence in every project
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {qualityAssurance.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 premium-gradient rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industry Expertise
            </h2>
            <p className="text-xl text-gray-600">
              Specialized knowledge across key sectors
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <Card key={index} className="hover-lift border-0 shadow-lg bg-white">
                <CardContent className="p-6">
                  <div className="w-12 h-12 premium-gradient rounded-lg flex items-center justify-center mb-4">
                    <industry.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{industry.name}</h3>
                  <p className="text-gray-600">{industry.description}</p>
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
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get a custom quote tailored to your specific needs and timeline
          </p>
          <Link href={createPageUrl("Request")}>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 text-lg px-8 py-6">
              Get Free Quote
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
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
