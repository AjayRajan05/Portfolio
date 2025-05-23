import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import type { NextWebVitalsMetric } from 'next/app';
import { SessionProvider } from '@/components/providers/SessionProvider';

import { ThemeProvider } from '@/components/theme/theme-provider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ChatbotButton } from '@/components/shared/ChatbotButton';
import { Toaster } from '@/components/ui/toaster';
import { SkipLink } from '@/components/shared/SkipLink';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { ServiceWorkerRegistration } from '@/components/shared/ServiceWorkerRegistration';
import { EmailGate } from '@/components/shared/EmailGate';

// Font configuration
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap' 
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    default: 'Portfolio | AI/ML Engineer',
    template: '%s | Portfolio'
  },
  description: 'AI/ML Engineer specializing in machine learning, deep learning, and artificial intelligence solutions.',
  keywords: ['AI', 'ML', 'Machine Learning', 'Deep Learning', 'Artificial Intelligence', 'Data Science'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  publisher: 'Your Name',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Portfolio | AI/ML Engineer',
    description: 'AI/ML Engineer specializing in machine learning, deep learning, and artificial intelligence solutions.',
    url: '/',
    siteName: 'Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | AI/ML Engineer',
    description: 'AI/ML Engineer specializing in machine learning, deep learning, and artificial intelligence solutions.',
    creator: '@yourtwitterhandle',
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
    google: process.env.GOOGLE_VERIFICATION_ID,
  },
};

// Update the Google Analytics script
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://www.googletagmanager.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://api.resend.com"
          crossOrigin="anonymous"
        />
        <link
          rel="dns-prefetch"
          href="https://www.googletagmanager.com"
        />
        <link
          rel="dns-prefetch"
          href="https://api.resend.com"
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <EmailGate />
          <SkipLink />
          <div className="min-h-screen flex flex-col">
            <Header />
            <main id="main-content" className="flex-grow" tabIndex={-1}>
              {children}
            </main>
            <Footer />
            <ChatbotButton />
            <Toaster />
          </div>
          <GoogleAnalytics />
          <ServiceWorkerRegistration />
        </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  // Send to analytics
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }
}