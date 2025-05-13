"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, Check } from "lucide-react"
import { SectionTitle } from "@/components/shared/SectionTitle"
import { Progress } from "@/components/ui/progress"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { resumeData } from "@/data/resume"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function SkillsSection() {
  const { skills } = resumeData
  const sectionRef = useRef<HTMLElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Animate section entrance
      gsap.from(".skill-card", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      })

      // Animate progress bars after they're visible
      const progressBars = document.querySelectorAll(".skill-progress-bar")
      progressBars.forEach(bar => {
        const value = parseInt(bar.getAttribute("data-value") || "0")
        
        gsap.from(bar, {
          width: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 90%",
            toggleActions: "play none none none"
          },
          onUpdate: () => {
            // @ts-ignore
            bar.style.width = `${gsap.getProperty(bar, "width") / bar.parentElement.offsetWidth * 100}%`
          },
          onComplete: () => {
            // @ts-ignore
            bar.style.width = `${value}%`
          }
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Select featured skills from each category
  const featuredSkills = skills.map(category => {
    const topSkills = category.skills
      .sort((a, b) => b.level - a.level)
      .slice(0, 2)
    
    return {
      category: category.category,
      skills: topSkills
    }
  })

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle 
          title="My Skills" 
          subtitle="My technical expertise in AI/ML and software development"
        />

        <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {featuredSkills.map((category, catIndex) => (
            <div 
              key={`category-${catIndex}`}
              className="skill-card bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
              
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={`skill-${catIndex}-${skillIndex}`} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="skill-progress-bar h-full bg-primary rounded-full" 
                        style={{ width: "0%" }}
                        data-value={skill.level}
                      ></div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {skill.keywords.slice(0, 3).map((keyword, kwIndex) => (
                        <span 
                          key={`kw-${catIndex}-${skillIndex}-${kwIndex}`}
                          className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-primary/10 text-primary-foreground"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button asChild className="group">
            <Link href="/skills">
              View All Skills
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}