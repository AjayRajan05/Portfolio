'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PlusIcon, TrashIcon } from 'lucide-react'

interface Certification {
  id: string
  title: string
  issuer: string
  date: string
  credentialUrl: string
  imageUrl: string
}

export function CertificationManager() {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [newCertification, setNewCertification] = useState<Partial<Certification>>({
    title: '',
    issuer: '',
    date: '',
    credentialUrl: '',
    imageUrl: '',
  })
  const { toast } = useToast()

  const handleAddCertification = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/admin/certifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCertification),
      })

      if (!response.ok) throw new Error('Failed to add certification')

      const addedCertification = await response.json()
      setCertifications([...certifications, addedCertification])
      setNewCertification({
        title: '',
        issuer: '',
        date: '',
        credentialUrl: '',
        imageUrl: '',
      })

      toast({
        title: 'Success',
        description: 'Certification added successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add certification',
        variant: 'destructive',
      })
    }
  }

  const handleDeleteCertification = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/certifications/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete certification')

      setCertifications(certifications.filter(cert => cert.id !== id))
      toast({
        title: 'Success',
        description: 'Certification deleted successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete certification',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Certification</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddCertification} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="title">Title</label>
                <Input
                  id="title"
                  value={newCertification.title}
                  onChange={(e) => setNewCertification({ ...newCertification, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="issuer">Issuer</label>
                <Input
                  id="issuer"
                  value={newCertification.issuer}
                  onChange={(e) => setNewCertification({ ...newCertification, issuer: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="date">Date</label>
                <Input
                  id="date"
                  type="date"
                  value={newCertification.date}
                  onChange={(e) => setNewCertification({ ...newCertification, date: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="credentialUrl">Credential URL</label>
                <Input
                  id="credentialUrl"
                  value={newCertification.credentialUrl}
                  onChange={(e) => setNewCertification({ ...newCertification, credentialUrl: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="imageUrl">Image URL</label>
              <Input
                id="imageUrl"
                value={newCertification.imageUrl}
                onChange={(e) => setNewCertification({ ...newCertification, imageUrl: e.target.value })}
                required
              />
            </div>
            <Button type="submit">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Certification
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Certifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {certifications.map((certification) => (
              <div
                key={certification.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-semibold">{certification.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {certification.issuer} - {certification.date}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteCertification(certification.id)}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 