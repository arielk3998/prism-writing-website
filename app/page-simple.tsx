'use client';

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      lineHeight: '1.6'
    }}>
      {/* Header */}
      <header style={{
        textAlign: 'center',
        marginBottom: '40px',
        borderBottom: '2px solid #3B82F6',
        paddingBottom: '20px'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          color: '#1F2937',
          marginBottom: '10px'
        }}>
          Prism Writing
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#6B7280'
        }}>
          Professional Writing, Editing & Translation Services
        </p>
      </header>

      {/* Navigation */}
      <nav style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '30px',
        marginBottom: '40px',
        flexWrap: 'wrap'
      }}>
        <Link href="/services" style={{
          color: '#3B82F6',
          textDecoration: 'none',
          fontSize: '1.1rem',
          fontWeight: '500'
        }}>
          Services
        </Link>
        <Link href="/translation-services" style={{
          color: '#3B82F6',
          textDecoration: 'none',
          fontSize: '1.1rem',
          fontWeight: '500'
        }}>
          Translation Services
        </Link>
        <Link href="/translation-quote" style={{
          color: '#3B82F6',
          textDecoration: 'none',
          fontSize: '1.1rem',
          fontWeight: '500'
        }}>
          Get Quote
        </Link>
        <Link href="/portfolio" style={{
          color: '#3B82F6',
          textDecoration: 'none',
          fontSize: '1.1rem',
          fontWeight: '500'
        }}>
          Portfolio
        </Link>
        <Link href="/resources" style={{
          color: '#3B82F6',
          textDecoration: 'none',
          fontSize: '1.1rem',
          fontWeight: '500'
        }}>
          Resources
        </Link>
      </nav>

      {/* Hero Section */}
      <section style={{
        textAlign: 'center',
        backgroundColor: '#F8FAFC',
        padding: '60px 40px',
        borderRadius: '12px',
        marginBottom: '40px'
      }}>
        <h2 style={{
          fontSize: '2.2rem',
          color: '#1F2937',
          marginBottom: '20px'
        }}>
          Professional Translation Services
        </h2>
        <p style={{
          fontSize: '1.3rem',
          color: '#4B5563',
          marginBottom: '30px',
          maxWidth: '800px',
          margin: '0 auto 30px'
        }}>
          Expert translation services in 95+ languages. Fast, accurate, and professional translations for businesses and individuals worldwide.
        </p>
        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link href="/translation-quote" style={{
            backgroundColor: '#3B82F6',
            color: 'white',
            padding: '15px 30px',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: '600'
          }}>
            Get Instant Quote
          </Link>
          <Link href="/translation-services" style={{
            backgroundColor: 'white',
            color: '#3B82F6',
            padding: '15px 30px',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: '600',
            border: '2px solid #3B82F6'
          }}>
            View All Services
          </Link>
        </div>
      </section>

      {/* Features */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '30px',
        marginBottom: '40px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#1F2937', fontSize: '1.3rem', marginBottom: '15px' }}>
            95+ Languages
          </h3>
          <p style={{ color: '#6B7280' }}>
            Professional translations in all major world languages with native speakers
          </p>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#1F2937', fontSize: '1.3rem', marginBottom: '15px' }}>
            Fast Turnaround
          </h3>
          <p style={{ color: '#6B7280' }}>
            Quick delivery times without compromising on quality or accuracy
          </p>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#1F2937', fontSize: '1.3rem', marginBottom: '15px' }}>
            Certified Quality
          </h3>
          <p style={{ color: '#6B7280' }}>
            Professional certified translators ensuring accuracy and cultural relevance
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        marginTop: '60px',
        paddingTop: '20px',
        borderTop: '1px solid #E5E7EB',
        color: '#6B7280'
      }}>
        <p>&copy; 2025 Prism Writing. Professional writing, editing, and translation services worldwide.</p>
      </footer>
    </div>
  );
}
