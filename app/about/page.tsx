"use client";

import React from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { createPageUrl } from "@/src/lib/page-utils";
import { 
  Globe, 
  Award, 
  Shield, 
  Clock, 
  ArrowRight,
  Star,
  BookOpen,
  Languages,
  Heart,
  Target
} from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Shield,
      title: "Quality First",
      description: "We maintain the highest standards through rigorous quality assurance processes and native speaker expertise."
    },
    {
      icon: Heart,
      title: "Cultural Sensitivity",
      description: "Understanding cultural nuances is at the core of our translation philosophy, ensuring authentic communication."
    },
    {
      icon: Clock,
      title: "Reliability",
      description: "On-time delivery and consistent quality you can depend on for your most critical business communications."
    },
    {
      icon: Target,
      title: "Precision",
      description: "Every word matters. We deliver translations that are not just accurate, but contextually perfect."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      expertise: "20+ years in translation industry",
      languages: "English, Spanish, French",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c08c?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Dr. Michael Chen",
      role: "Head of Quality Assurance",
      expertise: "PhD in Linguistics, Former UN Translator",
      languages: "English, Mandarin, Japanese",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Maria Rodriguez",
      role: "Director of Operations",
      expertise: "15+ years in project management",
      languages: "Spanish, English, Portuguese",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Ahmed Hassan",
      role: "Technical Lead",
      expertise: "Localization technology expert",
      languages: "Arabic, English, French",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: "ATA Certified",
      description: "American Translators Association certified professionals"
    },
    {
      icon: Globe,
      title: "ISO 17100 Compliant",
      description: "International standard for translation services"
    },
    {
      icon: Shield,
      title: "SOC 2 Certified",
      description: "Enterprise-grade security and compliance"
    },
    {
      icon: Star,
      title: "95% Client Satisfaction",
      description: "Consistently rated excellent by our clients"
    }
  ];

  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "40+", label: "Languages Supported" },
    { number: "200+", label: "Expert Translators" },
    { number: "50+", label: "Countries Served" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200">
              About Prism Writing
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Breaking Language Barriers
              <span className="text-gradient block">Since 2018</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We&apos;re a team of passionate linguists, cultural experts, and technology professionals 
              dedicated to helping businesses communicate effectively across cultures and borders.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2018, Prism Writing emerged from a simple but powerful observation: 
                  businesses were struggling to communicate authentically across cultures. 
                  Traditional translation services often missed the nuances that make communication truly effective.
                </p>
                <p>
                  Our founder, Sarah Johnson, with over 20 years of experience in the translation industry, 
                  assembled a team of world-class linguists and cultural experts. Together, we developed 
                  a methodology that goes beyond mere translation to deliver true cultural adaptation.
                </p>
                <p>
                  Today, we&apos;re proud to serve over 200 clients globally, from startups to Fortune 500 companies, 
                  helping them expand internationally with confidence and authenticity.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" 
                alt="Our team working together"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 premium-gradient rounded-full flex items-center justify-center">
                <Globe className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover-lift border-0 shadow-lg bg-white">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 premium-gradient rounded-xl flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600">
              Experienced professionals leading the way in language services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="hover-lift border-0 shadow-lg bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-3">{member.expertise}</p>
                  <div className="flex items-center justify-center">
                    <Languages className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-500 text-sm">{member.languages}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Certifications & Recognition
            </h2>
            <p className="text-xl text-gray-600">
              Industry-leading standards and certifications
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="hover-lift border-0 shadow-lg bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 premium-gradient rounded-xl flex items-center justify-center mx-auto mb-4">
                    <achievement.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{achievement.title}</h3>
                  <p className="text-gray-600 text-sm">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 premium-gradient rounded-xl flex items-center justify-center mx-auto mb-8">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            &ldquo;To empower businesses worldwide by providing exceptional translation and localization 
            services that bridge cultural divides and enable authentic global communication. 
            We believe that when language barriers disappear, possibilities are limitless.&rdquo;
          </p>
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 premium-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the businesses that trust us to help them communicate globally
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={createPageUrl("Contact")}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 text-lg px-8 py-6">
                Get In Touch
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href={createPageUrl("Services")}>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-white text-white hover:bg-white hover:text-blue-600">
                View Our Services
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
