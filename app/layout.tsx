import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import type { NextWebVitalsMetric } from 'next/app';

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
  title: 'Ajay Rajan - Portfolio',
  description: 'Full-stack developer specializing in React, Next.js, and modern web technologies. View my projects, skills, and get in touch for collaborations.',
  keywords: ['Ajay Rajan', 'Full Stack Developer', 'React', 'Next.js', 'TypeScript', 'Web Development', 'Portfolio'],
  authors: [{ name: 'Ajay Rajan' }],
  creator: 'Ajay Rajan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: 'Ajay Rajan - Portfolio',
    description: 'Full-stack developer specializing in React, Next.js, and modern web technologies.',
    siteName: 'Ajay Rajan Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ajay Rajan - Portfolio',
    description: 'Full-stack developer specializing in React, Next.js, and modern web technologies.',
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
    google: 'your-google-site-verification',
  },
};

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