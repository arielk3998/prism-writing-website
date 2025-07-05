import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/src/components/providers/ThemeProvider'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Prism Writing - Professional Translation & Writing Services',
    template: '%s | Prism Writing'
  },
  description: 'Professional translation services in 95+ languages and expert writing services for global businesses. Fast, accurate, and culturally adapted content with 99.8% satisfaction rate.',
  keywords: [
    'translation services',
    'professional translation',
    'document translation',
    'website localization',
    'certified translation',
    'business writing',
    'content writing',
    'multilingual services',
    'global communication'
  ],
  authors: [{ name: 'Prism Writing Team' }],
  creator: 'Prism Writing',
  publisher: 'Prism Writing',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://prismwriting.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'es-ES': '/es-ES',
      'fr-FR': '/fr-FR',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://prismwriting.com',
    title: 'Prism Writing - Professional Translation & Writing Services',
    description: 'Professional translation services in 95+ languages. Fast, accurate, and culturally adapted content for global businesses.',
    siteName: 'Prism Writing',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Prism Writing - Professional Translation Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prism Writing - Professional Translation & Writing Services',
    description: 'Professional translation services in 95+ languages. Fast, accurate, and culturally adapted content for global businesses.',
    images: ['/og-image.jpg'],
    creator: '@prismwriting',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={`${inter.variable} ${jetBrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider
          defaultTheme="system"
          storageKey="prism-writing-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
