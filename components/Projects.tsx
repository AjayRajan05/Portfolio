'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { resumeData } from '@/config/resume';

interface ProjectsProps {
  limit?: number;
}

const Projects: React.FC<ProjectsProps> = ({ limit }) => {
  const projects = limit ? resumeData.projects.slice(0, limit) : resumeData.projects;

  // Map project titles to image files
  const getProjectImage = (title: string) => {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('weather')) return '/images/projects/weather.jpg';
    if (titleLower.includes('task') || titleLower.includes('todo')) return '/images/projects/taskmanager.jpg';
    if (titleLower.includes('portfolio')) return '/images/projects/portfolio.jpg';
    
    // Default to numbered project images
    const projectNumber = projects.indexOf(projects.find(p => p.title === title) || projects[0]) + 1;
    return `/images/projects/project${projectNumber}.jpg`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col group"
        >
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={getProjectImage(project.title)}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="p-6 flex-grow flex flex-col">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{project.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
            {project.highlights && (
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1 mb-4">
                {project.highlights.map((highlight, highlightIndex) => (
                  <li key={highlightIndex}>{highlight}</li>
                ))}
              </ul>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                View Project
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Projects; 