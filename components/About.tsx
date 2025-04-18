'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { resumeData } from '@/config/resume';

const About = () => {
  const frontendSkills = resumeData.skills.technical.slice(0, 5);

  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative h-80 w-80 mx-auto"
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
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Who am I?</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            I am {resumeData.personalInfo.name}, a {resumeData.personalInfo.title} based in {resumeData.personalInfo.location}. 
            I am passionate about creating innovative solutions using cutting-edge technologies.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">My Journey</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            With a strong foundation in {resumeData.education[0].degree} from {resumeData.education[0].institution}, 
            I have developed expertise in {frontendSkills.join(', ')}. My journey in tech has been driven by a 
            continuous desire to learn and grow.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Technical Skills</h3>
          <div className="space-y-4">
            {frontendSkills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                  <span className="text-gray-500 dark:text-gray-400">90%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '90%' }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-blue-500 h-2.5 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About; 