"use client"

import { useEffect, useRef, FC } from "react"
import Link from "next/link"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { SectionTitle } from "@/components/shared/SectionTitle"
import { ChevronRight } from "lucide-react"
import { AnimatedText } from "@/components/shared/AnimatedText"
import { resumeData } from "@/data/resume"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface AboutSectionProps {}

export const AboutSection: FC<AboutSectionProps> = () => {
  const { basics } = resumeData
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate content
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      })

      // Animate image with a slight delay
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Create a shortened version of the bio
  const shortBio = basics.longBio.split('\n\n').slice(0, 2).join('\n\n')

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-muted/30"
    >
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle 
          title="About Me" 
          subtitle="Learn more about my background, skills, and passion for AI and machine learning."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mt-12">
          <div ref={imageRef} className="relative group">
            <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000"
                alt="Ajay Rajan"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-4 border-primary/30 rounded-2xl hidden md:block"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-card/20 backdrop-blur-sm rounded-2xl hidden md:block"></div>
          </div>

          <div ref={contentRef} className="space-y-6">
            <AnimatedText 
              tag="h3" 
              text={basics.label} 
              className="text-xl md:text-2xl font-medium text-primary"
            />
            
            <div className="space-y-4">
              {shortBio.split('\n\n').map((paragraph: string, index: number) => (
                <p key={index} className="text-foreground/80 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="pt-4">
              <Button asChild className="group">
                <Link href="/about">
                  Read More About Me
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            <Button asChild variant="outline" className="group">
              <a href="/Resume.pdf" download>
                Download Resume
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}