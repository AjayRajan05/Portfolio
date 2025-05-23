"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, ExternalLink, Github } from "lucide-react"
import { SectionTitle } from "@/components/shared/SectionTitle"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { resumeData } from "@/data/resume"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Section: Component Definition
// Purpose: Display portfolio projects with animations and interactive elements
export function ProjectsSection() {
  // Section: References
  // Purpose: Store reference to section element for GSAP animations
  const sectionRef = useRef<HTMLElement>(null)
  const [projects, setProjects] = useState(resumeData.projects.filter(project => project.featured).slice(0, 3))
  
  // Section: Animation Setup
  // Purpose: Initialize GSAP animations for project cards
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
          toggleActions: "play none none reverse"
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [projects]) // Add projects as dependency

  // Section: Component UI
  // Purpose: Render projects section with animated cards
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
          {projects.map((project) => (
            <Card key={project.id} className="project-card group relative bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <div className="flex gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="View source code on GitHub"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="View live demo"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground line-clamp-2">{project.shortDescription}</p>
                
                <div className="pt-3 flex items-center justify-between">
                  <Link href={`/projects/${project.id}`} className="text-primary text-sm font-medium hover:underline flex items-center group/link">
                    View Details
                    <ChevronRight className="ml-1 h-3 w-3 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>
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