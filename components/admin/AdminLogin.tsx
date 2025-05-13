'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'

interface AdminLoginProps {
  onLogin: () => void
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [pin, setPin] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Check if PIN matches the one in environment variable
    if (pin === process.env.NEXT_PUBLIC_ADMIN_PIN) {
      localStorage.setItem('adminAuthenticated', 'true')
      onLogin()
    } else {
      toast({
        title: 'Invalid PIN',
        description: 'Please enter the correct admin PIN.',
        variant: 'destructive',
      })
    }
    setIsLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Enter admin PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full"
            required
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Verifying...' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  )
} 