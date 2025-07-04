import React from 'react';
import Link from 'next/link';
import { Globe2 } from 'lucide-react';

interface NavigationItem {
  name: string;
  href: string;
  description?: string;
  subItems?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
  {
    name: 'Home',
    href: '/',
    description: 'Return to homepage'
  },
  {
    name: 'Services',
    href: '/services',
    description: 'Our writing and editing services'
  },
  {
    name: 'Translation Services',
    href: '/translation-services',
    description: 'Professional translation for 100+ languages',
    subItems: [
      {
        name: 'All Translation Services',
        href: '/translation-services',
        description: 'Comprehensive translation solutions'
      },
      {
        name: 'Get Quote',
        href: '/translation-quote',
        description: 'Instant pricing and quotes'
      },
      {
        name: 'Business Translation',
        href: '/translation-services#business',
        description: 'Corporate documents and materials'
      },
      {
        name: 'Legal Translation',
        href: '/translation-services#legal',
        description: 'Certified legal document translation'
      },
      {
        name: 'Medical Translation',
        href: '/translation-services#medical',
        description: 'Specialized medical and pharmaceutical'
      },
      {
        name: 'Technical Translation',
        href: '/translation-services#technical',
        description: 'Technical documentation and manuals'
      }
    ]
  },
  {
    name: 'About',
    href: '/about',
    description: 'Learn about our team'
  },
  {
    name: 'Contact',
    href: '/contact',
    description: 'Get in touch with us'
  }
];

export default function MainNavigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PW</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Prism Writing</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.subItems && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name === 'Translation Services' && (
                    <Globe2 className="w-4 h-4" />
                  )}
                  <span>{item.name}</span>
                  {item.subItems && (
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.subItems && openDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <div className="font-medium">{subItem.name}</div>
                        {subItem.description && (
                          <div className="text-xs text-gray-500 mt-1">{subItem.description}</div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* CTA Button */}
            <Link
              href="/translation-quote"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {navigationItems.map((item) => (
              <div key={item.name} className="space-y-2">
                <Link
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name === 'Translation Services' && (
                    <Globe2 className="w-4 h-4" />
                  )}
                  <span>{item.name}</span>
                </Link>
                
                {/* Mobile Subitems */}
                {item.subItems && (
                  <div className="ml-6 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block text-sm text-gray-600 hover:text-blue-600 px-3 py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Mobile CTA */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                href="/translation-quote"
                className="block bg-blue-600 text-white text-center px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Quote
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
