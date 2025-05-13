"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, ExternalLink, Github } from "lucide-react"
import { SectionTitle } from "@/components/shared/SectionTitle"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { resumeData } from "@/data/resume"
import { Badge } from "@/components/ui/badge"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  
  // Get featured projects
  const featuredProjects = resumeData.projects
    .filter(project => project.featured)
    .slice(0, 3)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Animate project cards
      gsap.from(".project-card", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-muted/30"
    >
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle 
          title="Featured Projects" 
          subtitle="A selection of my recent work in AI and machine learning"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {featuredProjects.map((project, index) => (
            <div 
              key={project.id}
              className="project-card group relative bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
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
                      key={`tech-${index}-${techIndex}`}
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
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button asChild className="group">
            <Link href="/projects">
              View All Projects
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}