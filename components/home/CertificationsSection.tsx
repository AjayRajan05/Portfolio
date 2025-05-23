"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Calendar, ExternalLink } from "lucide-react"
import { SectionTitle } from "@/components/shared/SectionTitle"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { resumeData } from "@/data/resume"
import { Card, CardContent } from "@/components/ui/card"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Section: Component Definition
// Purpose: Display professional certifications with animations
export function CertificationsSection() {
  // Section: References
  // Purpose: Store reference to section element for GSAP animations
  const sectionRef = useRef<HTMLElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  
  // Get featured certifications
  const featuredCertifications = resumeData.certifications
    .filter(cert => cert.featured)
    .slice(0, 2)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!sectionRef.current || !isMounted) return

    const ctx = gsap.context(() => {
      // Animate certification cards with stagger effect
      gsap.from(".certification-card", {
        y: 40,
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
  }, [isMounted])

  // Section: Component UI
  // Purpose: Render certifications section with animated cards
  return (
    <section 
      ref={sectionRef}
      className="py-20"
    >
      <div className="container">
        <SectionTitle 
          title="Certifications" 
          subtitle="Professional certifications and achievements that validate my expertise."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {resumeData.certifications.map((cert, index) => (
            <Card key={index} className="certification-card group">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Certification Title */}
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {cert.name}
                  </h3>

                  {/* Issuing Organization */}
                  <p className="text-muted-foreground">
                    {cert.issuer}
                  </p>
                
                  {/* Date */}
                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    <span>{cert.date}</span>
                  </div>
                  
                  {/* Credential URL */}
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm inline-block"
                    >
                      View Credential
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
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