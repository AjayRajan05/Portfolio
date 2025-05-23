'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ProfileEditor() {
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    bio: '',
    email: '',
    location: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
    }
  })
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/admin/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      })

      if (!response.ok) throw new Error('Failed to update profile')

      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name">Name</label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="title">Title</label>
              <Input
                id="title"
                value={profile.title}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="bio">Bio</label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="location">Location</label>
              <Input
                id="location"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="github">GitHub</label>
              <Input
                id="github"
                value={profile.socialLinks.github}
                onChange={(e) => setProfile({
                  ...profile,
                  socialLinks: { ...profile.socialLinks, github: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="linkedin">LinkedIn</label>
              <Input
                id="linkedin"
                value={profile.socialLinks.linkedin}
                onChange={(e) => setProfile({
                  ...profile,
                  socialLinks: { ...profile.socialLinks, linkedin: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="twitter">Twitter</label>
              <Input
                id="twitter"
                value={profile.socialLinks.twitter}
                onChange={(e) => setProfile({
                  ...profile,
                  socialLinks: { ...profile.socialLinks, twitter: e.target.value }
                })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button type="submit">Save Changes</Button>
    </form>
  )
} 