'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { DarkModeToggle } from '@/src/components/ui/DarkModeToggle'
import { 
  Menu, 
  X, 
  ChevronDown, 
  Globe, 
  FileText, 
  Users, 
  Star,
  Phone,
  Mail,
  Shield,
  Zap,
  Award,
  Briefcase
} from 'lucide-react'

const navigationItems = [
  {
    name: 'Services',
    href: '/services',
    icon: FileText,
    description: 'Professional writing and editing services',
    submenu: [
      { name: 'Content Writing', href: '/services/content-writing', icon: FileText },
      { name: 'Academic Writing', href: '/services/academic-writing', icon: FileText },
      { name: 'Business Writing', href: '/services/business-writing', icon: FileText },
      { name: 'Creative Writing', href: '/services/creative-writing', icon: FileText },
    ]
  },
  {
    name: 'Translation',
    href: '/translation-services',
    icon: Globe,
    description: 'Expert translation in 95+ languages',
    submenu: [
      { name: 'Document Translation', href: '/translation-services/document', icon: FileText },
      { name: 'Website Translation', href: '/translation-services/website', icon: Globe },
      { name: 'Certified Translation', href: '/translation-services/certified', icon: Award },
      { name: 'Business Translation', href: '/translation-services/business', icon: Briefcase },
    ]
  },
  {
    name: 'Portfolio',
    href: '/portfolio',
    icon: Star,
    description: 'Our best work and client success stories'
  },
  {
    name: 'Resources',
    href: '/resources',
    icon: Users,
    description: 'Helpful guides and writing tips'
  }
]

interface NavigationProps {
  className?: string
}

export function Navigation({ className }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setActiveSubmenu(null)
  }, [pathname])

  const toggleSubmenu = (name: string) => {
    setActiveSubmenu(activeSubmenu === name ? null : name)
  }

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-lg" 
          : "bg-transparent",
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group transition-all duration-300">
            <div className="relative">
              <div className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-r from-primary to-blue-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                <span className="text-white font-bold text-sm md:text-base">P</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse-glow"></div>
            </div>
            <span className="text-xl md:text-2xl font-bold gradient-text">Prism Writing</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-1 text-sm font-medium transition-all duration-300 hover:text-primary px-3 py-2 rounded-md hover:bg-accent/50",
                    pathname.startsWith(item.href) ? "text-primary bg-primary/10" : "text-foreground"
                  )}
                  onMouseEnter={() => item.submenu && setActiveSubmenu(item.name)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                  {item.submenu && <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />}
                </Link>

                {/* Desktop Submenu */}
                {item.submenu && activeSubmenu === item.name && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-72 bg-background/95 backdrop-blur-lg border border-border rounded-xl shadow-xl py-2 animate-in fade-in slide-in-from-top-2 duration-200"
                    onMouseEnter={() => setActiveSubmenu(item.name)}
                    onMouseLeave={() => setActiveSubmenu(null)}
                  >
                    <div className="px-4 py-3 border-b border-border">
                      <h4 className="font-semibold text-sm">{item.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                    </div>
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="flex items-center space-x-3 px-4 py-3 text-sm hover:bg-accent transition-colors group"
                      >
                        <subItem.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="group-hover:text-foreground">{subItem.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            <DarkModeToggle />
            <Link href="/translation-quote">
              <Button variant="outline" size="sm" className="hover:shadow-md transition-all duration-300">
                <Zap className="w-4 h-4 mr-2" />
                Get Quote
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="sm" className="hover:shadow-lg transition-all duration-300">
                <Phone className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-background border-t border-border animate-in slide-in-from-top duration-300">
            <div className="px-4 py-6 space-y-4">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-2 text-sm font-medium",
                        pathname.startsWith(item.href) ? "text-primary" : "text-foreground"
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                    {item.submenu && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleSubmenu(item.name)}
                      >
                        <ChevronDown 
                          className={cn(
                            "w-4 h-4 transition-transform",
                            activeSubmenu === item.name && "rotate-180"
                          )} 
                        />
                      </Button>
                    )}
                  </div>
                  
                  {/* Mobile Submenu */}
                  {item.submenu && activeSubmenu === item.name && (
                    <div className="mt-2 ml-6 space-y-2 animate-in slide-in-from-top duration-200">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <subItem.icon className="w-3 h-3" />
                          <span>{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="pt-4 border-t border-border space-y-2">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-muted-foreground">Theme</span>
                  <DarkModeToggle />
                </div>
                <Link href="/translation-quote">
                  <Button variant="outline" size="sm" className="w-full">
                    <Zap className="w-4 h-4 mr-2" />
                    Get Instant Quote
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="sm" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
