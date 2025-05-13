'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'

const ALLOWED_DOMAINS = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com', 'icloud.com']

export function EmailGate() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    setIsMounted(true)
    // Check if user has already entered email
    const storedEmail = localStorage.getItem('userEmail')
    if (storedEmail) {
      setIsVerified(true)
    }
  }, [])

  const validateEmail = (email: string) => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) return false
      
      const domain = email.split('@')[1]?.toLowerCase()
      return ALLOWED_DOMAINS.includes(domain)
    } catch {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (!email || !validateEmail(email)) {
        toast({
          title: 'Invalid Email',
          description: 'Please enter a valid email address from an allowed domain.',
          variant: 'destructive',
        })
        setIsLoading(false)
        return
      }

      // Store email in localStorage
      localStorage.setItem('userEmail', email)
      setIsVerified(true)
      toast({
        title: 'Success',
        description: 'Email verified successfully!',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Don't render anything until after mount to avoid hydration issues
  if (!isMounted) {
    return null
  }

  if (isVerified) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome to My Portfolio</h1>
        <p className="text-muted-foreground text-center mb-6">
          Please enter your email address to continue
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
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
            Allowed email domains: {ALLOWED_DOMAINS.join(', ')}
          </p>
        </form>
      </div>
    </div>
  )
}