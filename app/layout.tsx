import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'Amudh - AI Engineer',
  description: 'Portfolio website showcasing my skills, projects, and achievements as an AI Engineer.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-900 text-gray-100">
        <Navigation />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
} 