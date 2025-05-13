"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Calendar } from "lucide-react"
import { SectionTitle } from "@/components/shared/SectionTitle"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { resumeData } from "@/data/resume"
import { format, parseISO } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Format date from YYYY-MM to display format
function formatDate(dateString: string): string {
  if (dateString === "Present") return "Present"
  
  try {
    return format(parseISO(`${dateString}-01`), "MMM yyyy")
  } catch (error) {
    return dateString
  }
}

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  
  // Get latest 2 work experiences
  const recentExperiences = resumeData.work.slice(0, 2)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Animate timeline items
      gsap.from(".timeline-item", {
        x: -30,
        opacity: 0,
        stagger: 0.3,
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
      className="py-16 md:py-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle 
          title="Work Experience" 
          subtitle="My professional journey and career highlights"
        />

        <div className="mt-12 relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px">
            <div className="sticky top-24 h-10 w-10 rounded-full bg-primary/20 border-4 border-card -translate-x-1/2 md:hidden"></div>
          </div>
          
          <div className="space-y-12 relative">
            {recentExperiences.map((job, index) => (
              <div key={index} className="timeline-item relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Date column for desktop */}
                  <div className="hidden md:flex justify-end items-start">
                    <div className="px-4 py-2 bg-card rounded-lg border border-border shadow-sm max-w-xs">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>
                          {formatDate(job.startDate)} — {formatDate(job.endDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <Card className="relative md:ml-0">
                    {/* Timeline dot (desktop) */}
                    <div className="hidden md:block absolute top-6 left-0 h-5 w-5 rounded-full bg-primary border-4 border-card -translate-x-1/2"></div>
                    
                    {/* Timeline dot (mobile) */}
                    <div className="md:hidden absolute top-6 left-4 h-5 w-5 rounded-full bg-primary border-4 border-card -translate-x-1/2"></div>
                    
                    <CardContent className="p-6">
                      {/* Date for mobile */}
                      <div className="md:hidden mb-3 text-sm text-muted-foreground flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>
                          {formatDate(job.startDate)} — {formatDate(job.endDate)}
                        </span>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="hidden sm:block flex-shrink-0 w-16 h-16 relative bg-muted rounded-lg overflow-hidden">
                          {job.logo ? (
                            <Image
                              src={job.logo}
                              alt={job.company}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full w-full bg-primary/10 text-primary">
                              {job.company.substring(0, 2)}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-grow">
                          <h3 className="text-xl font-semibold">{job.position}</h3>
                          <p className="text-primary font-medium">{job.company}</p>
                          <p className="text-muted-foreground mt-2 mb-4">
                            {job.summary}
                          </p>
                          
                          <Separator className="my-4" />
                          
                          <ul className="space-y-2">
                            {job.highlights.slice(0, 3).map((highlight, hIndex) => (
                              <li key={hIndex} className="flex items-start">
                                <div className="mr-2 mt-1 flex-shrink-0 h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                                </div>
                                <span className="text-sm">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <Button asChild className="group">
            <Link href="/experience">
              View Full Experience
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}