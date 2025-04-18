'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { resumeData } from '@/config/resume';

export default function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center bg-gray-900 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
              Hi, I'm <span className="text-blue-400">{resumeData.personalInfo.name}</span>
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-4 md:mb-6">
              {resumeData.personalInfo.title}
            </h2>
            <p className="text-base md:text-lg text-gray-400 mb-6 md:mb-8 max-w-2xl mx-auto lg:mx-0">
              {resumeData.personalInfo.summary}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
              <Link
                href="/contact"
                className="bg-blue-500 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-md hover:bg-blue-600 transition-colors duration-300 text-center"
              >
                Contact Me
              </Link>
              <Link
                href="/projects"
                className="bg-gray-700 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-md hover:bg-gray-600 transition-colors duration-300 text-center"
              >
                View Projects
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative w-full max-w-[280px] md:max-w-[320px] lg:max-w-md mx-auto lg:mx-0 order-1 lg:order-2 mb-8 lg:mb-0"
          >
            <div className="relative w-full aspect-square rounded-full overflow-hidden ring-4 ring-blue-500/20">
              <Image
                src="/images/profile.jpg"
                alt={resumeData.personalInfo.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 280px, (max-width: 1200px) 320px, 400px"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 md:w-24 md:h-24 bg-blue-500 rounded-full opacity-20 animate-pulse" />
          </motion.div>
        </div>
      </div>
    </section>
  );
} 