"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "@/lib/split-text"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface AnimatedTextProps {
  text: string
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
  className?: string
  delay?: number
  staggerDelay?: number
  duration?: number
  animateOnScroll?: boolean
  threshold?: number
  as?: React.ElementType
  children?: React.ReactNode
}

export function AnimatedText({
  text,
  tag = "div",
  className,
  delay = 0,
  staggerDelay = 0.02,
  duration = 0.5,
  animateOnScroll = true,
  threshold = 0.1,
  as,
  children,
}: AnimatedTextProps) {
  const textRef = useRef<HTMLDivElement>(null)
  const Element = as || tag

  useEffect(() => {
    if (!textRef.current) return
    
    const splitText = new SplitText(textRef.current, { type: "chars,words" })
    const chars = splitText.chars
    
    gsap.set(chars, { y: 40, opacity: 0 })
    
    const animation = gsap.to(chars, {
      y: 0,
      opacity: 1,
      duration: duration,
      stagger: staggerDelay,
      ease: "power2.out",
      delay: delay,
      paused: animateOnScroll,
    })

    if (animateOnScroll) {
      ScrollTrigger.create({
        trigger: textRef.current,
        start: `top bottom-=${threshold * 100}%`,
        onEnter: () => animation.play(),
        once: true,
      })
    }

    return () => {
      if (animation) animation.kill()
      if (animateOnScroll) ScrollTrigger.getAll().forEach(t => t.kill())
      splitText.revert()
    }
  }, [text, delay, staggerDelay, duration, animateOnScroll, threshold])

  return (
    <Element ref={textRef} className={cn("inline-block", className)}>
      {text}
      {children}
    </Element>
  )
}