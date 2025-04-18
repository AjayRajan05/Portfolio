'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { resumeData } from '@/config/resume';
import Link from 'next/link';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                About <span className="text-blue-400">Me</span>
              </h1>
              <Link 
                href="/"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                ← Back to Home
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative h-96 w-96 mx-auto"
              >
                <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 blur-3xl" />
                <Image
                  src="/images/profile.jpg"
                  alt={resumeData.personalInfo.name}
                  fill
                  className="rounded-full object-cover"
                  priority
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-white">Who am I?</h2>
                  <p className="text-gray-300 leading-relaxed">
                    I am {resumeData.personalInfo.name}, a {resumeData.personalInfo.title} based in {resumeData.personalInfo.location}. 
                    I am passionate about creating innovative solutions using cutting-edge technologies.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-white">My Journey</h2>
                  <p className="text-gray-300 leading-relaxed">
                    With a strong foundation in {resumeData.education[0].degree} from {resumeData.education[0].institution}, 
                    I have developed expertise in various technologies. My journey in tech has been driven by a 
                    continuous desire to learn and grow.
                  </p>
                </div>

                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download Resume
                </a>
              </motion.div>
            </div>

            <div className="bg-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-semibold mb-6 text-white">Education</h2>
              <div className="space-y-6">
                {resumeData.education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 14l9-5-9-5-9 5 9 5z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-white">{edu.degree}</h3>
                      <p className="text-gray-300">{edu.institution}, {edu.startDate} - {edu.endDate}</p>
                      {edu.highlights && edu.highlights.length > 0 && (
                        <p className="text-gray-400 mt-2">
                          {edu.highlights[0]}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About; 