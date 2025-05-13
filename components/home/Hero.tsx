"use client"

import { useEffect, useRef, useState, FC } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, Download, Github, FileText } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { resumeData } from "@/data/resume"
import { AnimatedText } from "@/components/shared/AnimatedText"
import Typed from 'typed.js'

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface HeroProps {}

export const Hero: FC<HeroProps> = () => {
  const { basics } = resumeData
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const typedRef = useRef<HTMLSpanElement>(null)
  const typedInstance = useRef<Typed | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted && typedRef.current) {
      typedInstance.current = new Typed(typedRef.current, {
        strings: [
          "AI Engineer",
          "ML Engineer",
          "Computer Vision Expert",
          "NLP Specialist",
          "Data Scientist"
        ],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 1000,
        loop: true
      })

      return () => {
        if (typedInstance.current) {
          typedInstance.current.destroy()
        }
      }
    }
  }, [isMounted])

  // Animation for hero elements
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section entrance animation
      gsap.from(".hero-anim", {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2
      })

      // Parallax effect for background or image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-to-b from-background to-background/80"
    >
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-chart-1/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-chart-2/20 rounded-full filter blur-3xl"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-50 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container mx-auto px-4 md:px-6 py-10 md:py-16 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="hero-anim text-lg sm:text-xl font-medium text-primary">Hello, I'm</h2>
                <h1 className="hero-anim text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                  {basics.name}
                </h1>
                <div className="hero-anim h-12 md:h-16 flex items-center">
                  <span 
                    ref={typedRef}
                    className="text-2xl md:text-3xl font-medium text-muted-foreground"
                  ></span>
                </div>
              </div>

              <p className="hero-anim text-muted-foreground text-lg max-w-lg leading-relaxed">
                {basics.summary}
              </p>

              <div className="hero-anim flex flex-wrap gap-4 pt-4">
                <Button asChild size="lg" className="group">
                  <Link href="/projects">
                    View Projects
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="group">
                  <Link href="/contact">
                    Contact Me
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>

              <div className="hero-anim flex gap-5 items-center pt-2">
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://github.com/AjayRajan05" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="/Resume.pdf" download aria-label="Download Resume">
                    <Download className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="View Resume">
                    <FileText className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div 
            ref={imageRef}
            className="order-1 lg:order-2 relative flex justify-center items-center"
          >
            <div className="hero-anim relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-tr from-primary/20 to-chart-1/30 flex items-center justify-center shadow-xl">
              <div className="absolute inset-2 rounded-full overflow-hidden bg-card">
                <Image
                  src="/assests/logos/A.jpg"
                  alt="Ajay Rajan"
                  fill
                  sizes="(max-width: 768px) 256px, 320px"
                  priority
                  className="object-cover"
                />
              </div>
              <div className="absolute -inset-1 rounded-full border border-primary/20 opacity-50"></div>
              <div className="absolute -inset-4 rounded-full border border-primary/10 opacity-30"></div>
            </div>
            
            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 md:top-0 md:right-4 bg-card border border-border rounded-xl px-3 py-2 shadow-lg hero-anim opacity-0 animate-fadeIn" style={{animationDelay: "0.8s", animationFillMode: "forwards"}}>
              <p className="text-sm font-medium">AI Engineer</p>
            </div>
            <div className="absolute bottom-4 -left-4 md:bottom-10 md:left-0 bg-card border border-border rounded-xl px-3 py-2 shadow-lg hero-anim opacity-0 animate-fadeIn" style={{animationDelay: "1s", animationFillMode: "forwards"}}>
              <p className="text-sm font-medium">6 Months Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}