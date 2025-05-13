"use client"

import { useState } from "react";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { resumeData } from "@/data/resume";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

type ProjectCategory = 'all' | 'ai' | 'ml' | 'data' | 'web' | 'research' | 'cv' | 'nlp';

export default function ProjectsPage() {
  const [filter, setFilter] = useState<ProjectCategory>('all');
  const { projects } = resumeData;

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const categories: { value: ProjectCategory; label: string }[] = [
    { value: 'all', label: 'All Projects' },
    { value: 'ai', label: 'AI' },
    { value: 'ml', label: 'Machine Learning' },
    { value: 'data', label: 'Data Science' },
    { value: 'cv', label: 'Computer Vision' },
    { value: 'nlp', label: 'NLP' },
    { value: 'research', label: 'Research' },
    { value: 'web', label: 'Web' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <SectionTitle
        title="My Projects"
        subtitle="Explore my work in AI, machine learning, and more"
      />

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mt-8 mb-10">
        {categories.map((category) => (
          <Button
            key={category.value}
            variant={filter === category.value ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(category.value)}
            className="rounded-full"
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Projects grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            className="group bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            variants={item}
          >
            {/* Project image */}
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
              
              {/* Technology badges */}
              <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                {project.technologies.slice(0, 3).map((tech, techIndex) => (
                  <Badge
                    key={`tech-${project.id}-${techIndex}`}
                    variant="secondary"
                    className="text-xs bg-black/50 backdrop-blur-sm text-white border-none"
                  >
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 3 && (
                  <Badge
                    variant="secondary"
                    className="text-xs bg-black/50 backdrop-blur-sm text-white border-none"
                  >
                    +{project.technologies.length - 3}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="p-5 space-y-3">
              <h3 className="text-xl font-semibold line-clamp-1">{project.name}</h3>
              <p className="text-muted-foreground line-clamp-2">{project.shortDescription}</p>
              
              <div className="pt-3 flex items-center justify-between">
                <Link href={`/projects/${project.id}`} className="text-primary text-sm font-medium hover:underline flex items-center group/link">
                  View Details
                  <ChevronRight className="ml-1 h-3 w-3 transition-transform group-hover/link:translate-x-1" />
                </Link>
                
                <div className="flex items-center space-x-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full hover:bg-muted transition-colors"
                    aria-label="View source code on GitHub"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full hover:bg-muted transition-colors"
                    aria-label="View live demo"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium mb-2">No projects found</h3>
          <p className="text-muted-foreground">Try selecting a different category</p>
        </div>
      )}
    </div>
  );
}