"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Calendar, ExternalLink } from "lucide-react"
import { SectionTitle } from "@/components/shared/SectionTitle"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { resumeData } from "@/data/resume"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function CertificationsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  
  // Get featured certifications
  const featuredCertifications = resumeData.certifications
    .filter(cert => cert.featured)
    .slice(0, 2)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Animate certification cards
      gsap.from(".cert-card", {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
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
          title="Certifications" 
          subtitle="Professional certifications and achievements in AI and ML"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {featuredCertifications.map((cert, index) => (
            <div 
              key={index}
              className="cert-card group bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Certificate image */}
                <div className="sm:w-1/3 aspect-square sm:aspect-auto relative">
                  <Image
                    src={cert.image}
                    alt={cert.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                {/* Certificate details */}
                <div className="p-5 sm:w-2/3 flex flex-col">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{cert.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{cert.name}</h3>
                  <p className="text-primary font-medium mb-1">{cert.issuer}</p>
                  <p className="text-muted-foreground text-sm flex-grow mb-4">{cert.description}</p>
                  
                  <div className="mt-auto flex justify-end">
                    <Button asChild variant="outline" size="sm" className="group/btn">
                      <a href={cert.url} target="_blank" rel="noopener noreferrer">
                        View Certificate
                        <ExternalLink className="ml-1 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button asChild className="group">
            <Link href="/certifications">
              View All Certifications
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}