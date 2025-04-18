'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Achievements from '@/components/Achievements';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section id="home" className="pt-8">
        <Hero />
      </section>
      
      {/* About Section Preview */}
      <section id="about" className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              About <span className="text-blue-400">Me</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              AI & Data Science enthusiast with a passion for using technology to solve impactful, real-world challenges.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <About />
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link 
              href="/about"
              className="inline-block bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Read More
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Projects Preview */}
      <section id="projects" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured <span className="text-blue-400">Projects</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A selection of my recent work in AI and Data Science.
            </p>
          </motion.div>
          
          <div className="max-w-6xl mx-auto">
            <Projects limit={3} />
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link 
              href="/projects"
              className="inline-block bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              View All Projects
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Skills & <span className="text-blue-400">Expertise</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A comprehensive overview of my technical abilities and professional competencies.
            </p>
          </motion.div>
          
          <div className="max-w-6xl mx-auto">
            <Skills />
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link 
              href="/skills"
              className="inline-block bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              View All Skills
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Achievements & Certifications Section */}
      <section id="achievements" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Achievements & <span className="text-blue-400">Certifications</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Recognition of my expertise and continuous learning.
            </p>
          </motion.div>
          
          <div className="max-w-6xl mx-auto">
            <Achievements />
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
      
      {/* Chatbot */}
      <Chatbot />
    </main>
  );
} 