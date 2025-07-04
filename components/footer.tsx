'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  ArrowRight,
  Shield,
  Award,
  Clock,
  Star
} from 'lucide-react'

const footerLinks = {
  services: [
    { name: 'Document Translation', href: '/translation-services/document' },
    { name: 'Website Localization', href: '/translation-services/website' },
    { name: 'Certified Translation', href: '/translation-services/certified' },
    { name: 'Business Writing', href: '/services/business-writing' },
    { name: 'Academic Writing', href: '/services/academic-writing' },
    { name: 'Content Creation', href: '/services/content-writing' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press Kit', href: '/press' },
    { name: 'Partners', href: '/partners' },
    { name: 'Blog', href: '/blog' },
  ],
  support: [
    { name: 'Help Center', href: '/support' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Live Chat', href: '/chat' },
    { name: 'Status Page', href: '/status' },
    { name: 'API Docs', href: '/api' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR Compliance', href: '/gdpr' },
    { name: 'Security', href: '/security' },
    { name: 'Certifications', href: '/certifications' },
  ]
}

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com/prismwriting', icon: Facebook },
  { name: 'Twitter', href: 'https://twitter.com/prismwriting', icon: Twitter },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/prismwriting', icon: Linkedin },
  { name: 'Instagram', href: 'https://instagram.com/prismwriting', icon: Instagram },
]

const certifications = [
  { name: 'ISO 17100', icon: Award },
  { name: 'GDPR Compliant', icon: Shield },
  { name: '24/7 Support', icon: Clock },
  { name: '99.8% Satisfaction', icon: Star },
]

export function Footer() {
  return (
    <footer className="bg-slate-50/80 backdrop-blur-sm border-t border-border">
      {/* Newsletter Section */}
      <div className="border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Stay Updated with Translation Insights
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Get expert tips, industry news, and exclusive offers delivered to your inbox. 
              Join 10,000+ professionals who trust our insights.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 h-12 shadow-sm border-border/50 focus:border-primary"
              />
              <Button type="submit" className="sm:w-auto h-12 px-6 hover:shadow-lg transition-all duration-300">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-4">
              No spam. Unsubscribe at any time. Read our{' '}
              <Link href="/privacy" className="text-primary hover:underline transition-colors">{' '}
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-blue-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                <span className="text-white font-bold">P</span>
              </div>
              <span className="text-2xl font-bold gradient-text bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">Prism Writing</span>
            </Link>
            
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Professional translation and writing services trusted by global companies. 
              We bridge language barriers and create compelling content that drives business growth.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm group">
                <MapPin className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                <span>123 Business Plaza, Global City, GC 12345</span>
              </div>
              <div className="flex items-center space-x-3 text-sm group">
                <Phone className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm group">
                <Mail className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                <span>hello@prismwriting.com</span>
              </div>
            </div>

            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert) => (
              <div key={cert.name} className="flex items-center space-x-3 text-sm">
                <cert.icon className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">{cert.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2025 Prism Writing. All rights reserved.
            </div>
            
            <div className="flex flex-wrap items-center gap-6 text-sm">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
