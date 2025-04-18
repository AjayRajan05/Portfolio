'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '@/config/resume';
import Link from 'next/link';

interface Skill {
  name: string;
  level: number;
}

interface Category {
  title: string;
  skills: Skill[];
}

const Skills = () => {
  // Create skill categories from resumeData
  const categories: Category[] = [
    {
      title: 'Technical Skills',
      skills: resumeData.skills.technical.map(skill => ({ name: skill, level: 90 })),
    },
    {
      title: 'Tools & Technologies',
      skills: resumeData.skills.tools.map(skill => ({ name: skill, level: 85 })),
    },
    {
      title: 'Soft Skills',
      skills: resumeData.skills.soft.map(skill => ({ name: skill, level: 95 })),
    },
  ];

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
                My <span className="text-blue-400">Skills</span>
              </h1>
              <Link 
                href="/"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                ← Back to Home
              </Link>
            </div>

            <div className="space-y-12">
              {categories.map((category: Category, categoryIndex: number) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  className="bg-gray-800 rounded-lg shadow-lg p-6"
                >
                  <h2 className="text-2xl font-semibold mb-6 text-white">
                    {category.title}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.skills.map((skill: Skill, skillIndex: number) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: skillIndex * 0.05 }}
                        className="bg-gray-700 p-4 rounded-lg"
                      >
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-200">{skill.name}</span>
                          <span className="text-blue-400">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2.5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: skillIndex * 0.05 }}
                            className="bg-blue-500 h-2.5 rounded-full"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Skills; 