import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '../components/providers/ThemeProvider'
import { PasswordProtection } from '../components/auth/PasswordProtection'
import { AuthProvider } from '../hooks/useAuth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://prismwriting.com'),
  title: 'Prism Writing - Technical Writing Cooperative',
  description: 'Professional technical writing services from a worker-owned cooperative. Clear documentation that gets used.',
  keywords: 'technical writing, documentation, API docs, user guides, cooperative',
  authors: [{ name: 'Prism Writing Cooperative' }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.svg', sizes: '32x32', type: 'image/svg+xml' },
      { url: '/favicon-16x16.svg', sizes: '16x16', type: 'image/svg+xml' }
    ],
    apple: '/logo-icon.svg',
    shortcut: '/favicon-32x32.svg',
  },
  openGraph: {
    title: 'Prism Writing - Technical Writing Cooperative',
    description: 'Professional technical writing services from a worker-owned cooperative.',
    type: 'website',
    url: 'https://prismwriting.com',
    images: [
      {
        url: '/logo.svg',
        width: 200,
        height: 80,
        alt: 'Prism Writing Logo',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Additional favicon links for maximum compatibility */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/svg+xml" sizes="16x16" href="/favicon-16x16.svg" />
        <link rel="icon" type="image/svg+xml" sizes="32x32" href="/favicon-32x32.svg" />
        <link rel="apple-touch-icon" href="/logo-icon.svg" />
        <link rel="shortcut icon" href="/favicon-32x32.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('prism-writing-theme') === 'dark' || 
                    (!localStorage.getItem('prism-writing-theme') && 
                     window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          defaultTheme="system"
          storageKey="prism-writing-theme"
        >
          <AuthProvider>
            <PasswordProtection>
              {children}
            </PasswordProtection>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
