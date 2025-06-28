import React from 'react';
import { Metadata } from 'next';
import { 
  ModernCard, 
  ModernSectionHeader, 
  ModernStats 
} from '@/components/ui/ModernComponents';
import { 
  Users, 
  Target, 
  Heart, 
  Lightbulb, 
  Code, 
  Briefcase, 
  BookOpen, 
  Shield, 
  Palette, 
  Edit,
  Zap,
  Globe,
  Check,
  Award
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - Prism Writing',
  description: 'Learn about Prism Writing\'s mission, values, and cooperative approach to technical writing and documentation services.',
  keywords: 'about, technical writing cooperative, mission, values, team',
};

export default function AboutPage() {
  const cooperativeAdvantages = [
    {
      icon: Users,
      title: "Shared Expertise",
      description: "Multiple writers collaborate on complex projects, bringing diverse perspectives and specialized knowledge."
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Peer review ensures consistent high standards and catches issues before delivery."
    },
    {
      icon: Heart,
      title: "Fair Practices",
      description: "Transparent pricing and ethical business model that values both writers and clients."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Collective knowledge drives innovative solutions to complex documentation challenges."
    }
  ];

  const expertiseAreas = [
    {
      icon: Code,
      title: "Software Development",
      description: "Former developers and engineers who understand code, APIs, and software architecture from the inside out.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Briefcase,
      title: "Business & Strategy",
      description: "MBAs and business analysts who excel at translating technical capabilities into business value.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: BookOpen,
      title: "Education & Training",
      description: "Instructional designers and educators who specialize in learning-focused documentation and training materials.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Shield,
      title: "Compliance & Regulatory",
      description: "Legal and compliance experts who navigate complex regulatory requirements across industries.",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: Palette,
      title: "User Experience",
      description: "UX researchers and designers who ensure documentation serves real user needs and workflows.",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: Edit,
      title: "Content Strategy",
      description: "Marketing and content strategists who understand how documentation fits into broader customer journeys.",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const coreValues = [
    {
      icon: Zap,
      title: "Clarity First",
      description: "We prioritize clear, concise communication over technical jargon. If users can't understand it, we haven't done our job."
    },
    {
      icon: Users,
      title: "Collaborative Excellence",
      description: "We work closely with your team to understand context, goals, and user needs. The best documentation comes from partnership."
    },
    {
      icon: Target,
      title: "User-Centered Design",
      description: "Every document we create is designed with the end user in mind. We consider their context, skills, and goals at every step."
    },
    {
      icon: Globe,
      title: "Continuous Improvement",
      description: "We measure the success of our documentation through user feedback and analytics, constantly refining our approach."
    }
  ];

  const companyStats = [
    { label: "Years of Experience", value: 10, suffix: "+" },
    { label: "Projects Completed", value: 500, suffix: "+" },
    { label: "Client Satisfaction", value: 98, suffix: "%" },
    { label: "Industries Served", value: 25, suffix: "+" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 ml-3">
                Prism Writing
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              We&apos;re a technical writing cooperative dedicated to transforming complex technical concepts 
              into clear, accessible documentation that empowers users and drives adoption.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-sm font-medium text-blue-700 border border-blue-200">
                <Check className="w-4 h-4 mr-2" />
                Cooperative Model
              </div>
              <div className="inline-flex items-center px-4 py-2 bg-purple-50 rounded-full text-sm font-medium text-purple-700 border border-purple-200">
                <Check className="w-4 h-4 mr-2" />
                Expert Team
              </div>
              <div className="inline-flex items-center px-4 py-2 bg-green-50 rounded-full text-sm font-medium text-green-700 border border-green-200">
                <Check className="w-4 h-4 mr-2" />
                Quality Focused
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModernStats stats={companyStats} />
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <ModernSectionHeader
                title="Our Mission"
                subtitle="Bridging the gap between innovative technology and successful user adoption"
              />
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  At Prism Writing, we believe that great documentation is the bridge between innovative technology 
                  and successful user adoption. Our mission is to make complex technical information accessible, 
                  actionable, and engaging for diverse audiences.
                </p>
                <p>
                  As a cooperative, we bring together experienced technical writers who share a commitment to 
                  excellence, collaboration, and continuous learning. This structure allows us to offer specialized 
                  expertise while maintaining the agility and personal attention of a boutique firm.
                </p>
                <p>
                  Our cooperative model ensures fair compensation for our writers while delivering exceptional 
                  value to our clients through collaborative expertise and shared accountability.
                </p>
              </div>
            </div>
            <div className="lg:pl-8">
              <ModernCard className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 border-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Users className="w-6 h-6 mr-3 text-blue-600" />
                  Why Choose a Cooperative?
                </h3>
                <div className="space-y-4">
                  {cooperativeAdvantages.map((advantage, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <advantage.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{advantage.title}</h4>
                        <p className="text-gray-600 text-sm">{advantage.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ModernCard>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModernSectionHeader
            title="Our Expertise"
            subtitle="Our cooperative brings together writers with diverse backgrounds and specialized knowledge across industries and technologies"
            centered
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {expertiseAreas.map((area, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${area.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <area.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{area.title}</h3>
                <p className="text-gray-600 leading-relaxed">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModernSectionHeader
            title="Our Values"
            subtitle="These principles guide everything we do, from how we work together to how we serve our clients"
            centered
          />
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {coreValues.map((value, index) => (
              <div key={index} className="flex items-start space-x-4 group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how our cooperative approach can transform your technical documentation.
          </p>
          <a 
            href="/contact"
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
          >
            Start a Conversation
          </a>
        </div>
      </section>
    </div>
  );
}
