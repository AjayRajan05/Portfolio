'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'

// Section: Configuration
// Purpose: Define allowed email domains and rate limiting parameters
const ALLOWED_DOMAINS = process.env.NEXT_PUBLIC_ALLOWED_DOMAINS?.split(',') || [
  'gmail.com',
  'outlook.com',
  'yahoo.com',
  'hotmail.com',
  'icloud.com',
]

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour in milliseconds
const MAX_ATTEMPTS = 5

export function EmailGate() {
  // Section: State Management
  // Purpose: Track email input, loading state, verification status, and component mount state
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Section: Initialization Effect
  // Purpose: Check for existing email verification on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail')
    const storedTimestamp = localStorage.getItem('emailVerificationTimestamp')
    
    if (storedEmail && storedTimestamp) {
      const timestamp = parseInt(storedTimestamp)
      const now = Date.now()
      
      // Check if verification has expired (24 hours)
      if (now - timestamp < 24 * 60 * 60 * 1000) {
        setIsVerified(true)
      } else {
        // Clear expired verification
        localStorage.removeItem('userEmail')
        localStorage.removeItem('emailVerificationTimestamp')
      }
    }
    setIsMounted(true)
  }, [])

  // Section: Email Validation
  // Purpose: Validate email format and check against allowed domains
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return false

    const domain = email.split('@')[1]?.toLowerCase()
    return ALLOWED_DOMAINS.includes(domain)
  }

  // Section: Rate Limiting
  // Purpose: Implement rate limiting to prevent abuse
  const checkRateLimit = () => {
    const attempts = JSON.parse(localStorage.getItem('emailAttempts') || '[]')
    const now = Date.now()
    
    // Remove old attempts outside the window
    const recentAttempts = attempts.filter(
      (timestamp: number) => now - timestamp < RATE_LIMIT_WINDOW
    )
    
    if (recentAttempts.length >= MAX_ATTEMPTS) {
      const oldestAttempt = recentAttempts[0]
      const timeLeft = RATE_LIMIT_WINDOW - (now - oldestAttempt)
      const minutesLeft = Math.ceil(timeLeft / (60 * 1000))
      
      toast({
        title: 'Too Many Attempts',
        description: `Please try again in ${minutesLeft} minutes.`,
        variant: 'destructive',
      })
      return false
    }
    
    // Add current attempt
    recentAttempts.push(now)
    localStorage.setItem('emailAttempts', JSON.stringify(recentAttempts))
    return true
  }

  // Section: Form Submission
  // Purpose: Handle email verification and storage
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!checkRateLimit()) {
      setIsLoading(false)
      return
    }

    if (!validateEmail(email)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address from an allowed domain.',
        variant: 'destructive',
      })
      setIsLoading(false)
      return
    }

    try {
      // Store email in localStorage
      localStorage.setItem('userEmail', email)
      localStorage.setItem('emailVerificationTimestamp', Date.now().toString())
      setIsVerified(true)
      
      toast({
        title: 'Success',
        description: 'Email verified successfully!',
      })
      
      // Refresh the page to show content
      window.location.reload()
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Section: Conditional Rendering
  // Purpose: Hide component if mounted and verified
  if (!isMounted || isVerified) return null

  // Section: Component UI
  // Purpose: Render email gate form
  return (
    <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h1 className="text-2xl font-bold text-center mb-4">Welcome to My Portfolio</h1>
        <p className="text-muted-foreground text-center mb-6">
          Please enter your email address to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
            required
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Verifying...' : 'Continue'}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Allowed domains: {ALLOWED_DOMAINS.join(', ')}
          </p>
        </form>
      </div>
    </div>
  )
}
