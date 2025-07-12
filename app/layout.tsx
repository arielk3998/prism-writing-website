import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Prism Writing - Professional Translation & Writing Services',
  description: 'Professional translation services in 80+ languages and expert writing services for global businesses. Get accurate, culturally-sensitive translations delivered fast.',
  keywords: 'professional translation, writing services, localization, multilingual content, document translation, website localization',
  authors: [{ name: 'Prism Writing Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Prism Writing - Professional Translation & Writing Services',
    description: 'Professional translation services in 80+ languages and expert writing services for global businesses.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prism Writing - Professional Translation & Writing Services',
    description: 'Professional translation services in 80+ languages and expert writing services for global businesses.',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
