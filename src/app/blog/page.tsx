'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ModernButton,
  ModernNavigation,
} from '@/components/ui/ModernComponents';
import EnhancedFooter from '@/components/layout/EnhancedFooter';
import { DarkModeToggle } from '@/components/ui/DarkModeToggle';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { 
  Calendar,
  Clock,
  User,
  ArrowRight,
  BookOpen,
  Search,
  Tag,
  TrendingUp,
  Eye,
  MessageCircle
} from 'lucide-react';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Navigation items
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Resources', href: '/resources' },
    { label: 'Blog', href: '/blog', isActive: true },
    { label: 'About', href: '/about' },
  ];

  const categories = [
    { id: 'all', label: 'All Posts', count: 12 },
    { id: 'api-documentation', label: 'API Documentation', count: 4 },
    { id: 'compliance', label: 'Compliance', count: 3 },
    { id: 'sops', label: 'SOPs & Procedures', count: 2 },
    { id: 'best-practices', label: 'Best Practices', count: 3 },
  ];

  const featuredPost = {
    id: 'featured',
    title: "The Future of Technical Documentation: AI-Assisted Writing and Beyond",
    excerpt: "Explore how artificial intelligence is transforming the technical writing landscape while maintaining the human touch that makes documentation truly effective.",
    date: "2024-12-20",
    category: "Industry Trends",
    readTime: "8 min read",
    author: "Dr. Sarah Chen",
    authorRole: "Lead Technical Writer",
    image: "/api/placeholder/600/300",
    tags: ["AI", "Future Trends", "Technical Writing"],
    views: "2.4k",
    comments: 15,
    featured: true
  };

  const blogPosts = [
    {
      id: 1,
      title: "The Art of API Documentation: Making Technical Content Accessible",
      excerpt: "Learn how to create API documentation that developers actually want to use, with practical tips and real-world examples from successful tech companies.",
      date: "2024-12-15",
      category: "API Documentation",
      readTime: "5 min read",
      author: "Michael Rodriguez",
      authorRole: "Senior API Writer",
      image: "/api/placeholder/400/250",
      tags: ["API", "Documentation", "Developer Experience"],
      views: "1.8k",
      comments: 12
    },
    {
      id: 2,
      title: "HIPAA Compliance in Technical Documentation: What You Need to Know",
      excerpt: "Navigate the complex world of HIPAA compliance for healthcare technical documentation with our comprehensive guide covering all essential requirements.",
      date: "2024-12-10",
      category: "Compliance",
      readTime: "7 min read",
      author: "Jennifer Park",
      authorRole: "Compliance Specialist",
      image: "/api/placeholder/400/250",
      tags: ["HIPAA", "Healthcare", "Compliance"],
      views: "2.1k",
      comments: 8
    },
    {
      id: 3,
      title: "Standard Operating Procedures: Best Practices for Manufacturing",
      excerpt: "Discover how to create SOPs that improve efficiency, ensure compliance, and reduce training time in manufacturing environments with proven methodologies.",
      date: "2024-12-05",
      category: "SOPs",
      readTime: "6 min read",
      author: "David Kim",
      authorRole: "Manufacturing Documentation Lead",
      image: "/api/placeholder/400/250",
      tags: ["SOPs", "Manufacturing", "Process Improvement"],
      views: "1.5k",
      comments: 6
    },
    {
      id: 4,
      title: "Writing for Global Audiences: Localization in Technical Documentation",
      excerpt: "Master the art of creating technical documentation that transcends cultural and language barriers while maintaining clarity and precision.",
      date: "2024-11-28",
      category: "Best Practices",
      readTime: "9 min read",
      author: "Elena Vasquez",
      authorRole: "Localization Expert",
      image: "/api/placeholder/400/250",
      tags: ["Localization", "Global", "Translation"],
      views: "1.2k",
      comments: 4
    },
    {
      id: 5,
      title: "The Psychology of User Manuals: How to Write Instructions People Follow",
      excerpt: "Understand the cognitive science behind effective instruction writing and apply psychological principles to create user manuals that actually get used.",
      date: "2024-11-20",
      category: "Best Practices",
      readTime: "7 min read",
      author: "Dr. Alex Thompson",
      authorRole: "UX Writing Researcher",
      image: "/api/placeholder/400/250",
      tags: ["UX Writing", "Psychology", "User Experience"],
      views: "3.2k",
      comments: 18
    },
    {
      id: 6,
      title: "Cybersecurity Documentation: Protecting Your Organization's Knowledge",
      excerpt: "Learn how to create comprehensive cybersecurity documentation that keeps your organization safe while remaining accessible to all stakeholders.",
      date: "2024-11-15",
      category: "Compliance",
      readTime: "6 min read",
      author: "Robert Chen",
      authorRole: "Security Documentation Specialist",
      image: "/api/placeholder/400/250",
      tags: ["Cybersecurity", "Risk Management", "Security"],
      views: "1.9k",
      comments: 11
    }
  ];

  // Filter posts
  const filteredPosts = blogPosts.filter(post => {
    if (selectedCategory !== 'all' && !post.category.toLowerCase().includes(selectedCategory.replace('-', ' '))) {
      return false;
    }
    if (searchTerm && !post.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Modern Navigation */}
      <ModernNavigation
        logo={
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Prism Writing
            </span>
          </Link>
        }
        navItems={navItems}
        actions={
          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            <Link href="/contact">
              <ModernButton variant="outline" size="sm">
                Get Quote
              </ModernButton>
            </Link>
            <Link href="/portal">
              <ModernButton variant="primary" size="sm">
                Client Portal
              </ModernButton>
            </Link>
          </div>
        }
      />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-gray-900 dark:text-white">Technical Writing</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block mt-2">
                Insights & Expertise
              </span>
            </motion.h1>
            <motion.p
              className="text-xl text-muted-contrast max-w-3xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Stay ahead of the curve with expert insights, industry best practices, and practical strategies 
              for creating documentation that drives results.
            </motion.p>

            {/* Search and Filter Bar */}
            <motion.div
              className="flex flex-col lg:flex-row gap-4 items-center justify-center max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-contrast-high"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white dark:bg-gray-800 text-muted-contrast hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    {category.label} ({category.count})
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Featured Article */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="h-64 md:h-full bg-gradient-to-br from-blue-500 to-purple-600 relative">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-4 text-sm text-muted-contrast mb-4">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">
                      {featuredPost.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-contrast-high mb-3">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-contrast mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-contrast-high">{featuredPost.author}</p>
                        <p className="text-sm text-muted-contrast">{featuredPost.authorRole}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-muted-contrast">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {featuredPost.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {featuredPost.comments}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link href={`/blog/${featuredPost.id}`}>
                      <ModernButton variant="primary" className="group">
                        Read Article
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </ModernButton>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-contrast-high">Latest Articles</h2>
            <div className="flex items-center gap-2 text-muted-contrast">
              <TrendingUp className="w-5 h-5" />
              <span>{filteredPosts.length} articles found</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <Link href={`/blog/${post.id}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:-translate-y-1">
                      {/* Article Image */}
                      <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                            {post.category}
                          </span>
                        </div>
                        <div className="absolute bottom-4 right-4 flex gap-2">
                          {post.tags.slice(0, 2).map((tag, i) => (
                            <span key={i} className="bg-black/50 text-white px-2 py-1 rounded text-xs">
                              <Tag className="w-3 h-3 inline mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Article Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-muted-contrast mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-contrast-high mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-muted-contrast mb-4 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-contrast-high text-sm">{post.author}</p>
                              <p className="text-xs text-muted-contrast">{post.authorRole}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-muted-contrast text-sm">
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {post.views}
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              {post.comments}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <ModernButton variant="outline" size="lg" className="group">
              <BookOpen className="w-5 h-5 mr-2" />
              Load More Articles
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </ModernButton>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-contrast-high mb-6">
            Stay Updated with Prism Writing
          </h2>
          <p className="text-lg text-muted-contrast mb-8 max-w-2xl mx-auto">
            Get the latest insights on technical writing, documentation best practices, and industry compliance delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-contrast-high"
            />
            <ModernButton variant="primary">
              Subscribe
            </ModernButton>
          </div>
        </div>
      </section>

      <ScrollToTop />
      <EnhancedFooter />
    </div>
  );
}
