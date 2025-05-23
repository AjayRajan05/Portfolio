'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminEmailsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [emails, setEmails] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch('/api/admin/emails')
        if (!response.ok) {
          throw new Error('Failed to fetch emails')
        }
        const data = await response.json()
        setEmails(data.emails || [])
      } catch (error) {
        console.error('Error fetching emails:', error)
      } finally {
        setLoading(false)
      }
    }

    if (status === 'authenticated') {
      fetchEmails()
    }
  }, [status])

  if (status === 'loading' || loading) {
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Logged-in Emails</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              To view logged-in emails, check the browser's localStorage for the "userEmail" key:
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Open browser developer tools (F12)</li>
              <li>Go to Application tab</li>
              <li>Select Local Storage on the left</li>
              <li>Look for "userEmail" key</li>
            </ol>
            <Button
              onClick={() => router.push('/admin/dashboard')}
              variant="outline"
            >
              Back to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 