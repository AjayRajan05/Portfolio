'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { ResumeData, Education } from '@/types/resume'

// Initial data structure
const initialData: ResumeData = {
  name: '',
  title: '',
  summary: '',
  email: '',
  phone: '',
  location: {
    city: '',
    region: ''
  },
  education: [],
  skills: [],
  certifications: [],
  projects: [],
  socialLinks: {
    github: '',
    linkedin: '',
    twitter: '',
    blog: ''
  }
}

export function AdminDashboard() {
  const [data, setData] = useState<ResumeData>(initialData)
  const { toast } = useToast()

  const handleSave = async () => {
    try {
      const response = await fetch('/api/update-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to save changes')

      toast({
        title: 'Success',
        description: 'Resume data updated successfully.',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save changes. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="container max-w-4xl mx-auto p-8">
        <div className="bg-card rounded-lg shadow-lg p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Admin Dashboard</h2>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>

          {/* Profile Section */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Profile</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <Input
                  type="tel"
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Summary</label>
                <Textarea
                  value={data.summary}
                  onChange={(e) => setData({ ...data, summary: e.target.value })}
                  rows={4}
                />
              </div>
            </div>
          </section>

          {/* Location Section */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Location</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <Input
                  value={data.location.city}
                  onChange={(e) => setData({
                    ...data,
                    location: { ...data.location, city: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Region</label>
                <Input
                  value={data.location.region}
                  onChange={(e) => setData({
                    ...data,
                    location: { ...data.location, region: e.target.value }
                  })}
                />
              </div>
            </div>
          </section>

          {/* Social Links Section */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Social Links</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">GitHub</label>
                <Input
                  value={data.socialLinks?.github || ''}
                  onChange={(e) => setData({
                    ...data,
                    socialLinks: { ...data.socialLinks, github: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">LinkedIn</label>
                <Input
                  value={data.socialLinks?.linkedin || ''}
                  onChange={(e) => setData({
                    ...data,
                    socialLinks: { ...data.socialLinks, linkedin: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Twitter</label>
                <Input
                  value={data.socialLinks?.twitter || ''}
                  onChange={(e) => setData({
                    ...data,
                    socialLinks: { ...data.socialLinks, twitter: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Blog</label>
                <Input
                  value={data.socialLinks?.blog || ''}
                  onChange={(e) => setData({
                    ...data,
                    socialLinks: { ...data.socialLinks, blog: e.target.value }
                  })}
                />
              </div>
            </div>
          </section>

          {/* Education Section */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Education</h3>
            {data.education.map((edu: Education, index: number) => (
              <div key={index} className="space-y-4 p-4 border rounded-lg">
                <Input
                  value={edu.degree}
                  onChange={(e) => {
                    const newEducation = [...data.education]
                    newEducation[index] = { ...edu, degree: e.target.value }
                    setData({ ...data, education: newEducation })
                  }}
                  placeholder="Degree"
                />
                <Input
                  value={edu.school}
                  onChange={(e) => {
                    const newEducation = [...data.education]
                    newEducation[index] = { ...edu, school: e.target.value }
                    setData({ ...data, education: newEducation })
                  }}
                  placeholder="School"
                />
                <Input
                  value={edu.year}
                  onChange={(e) => {
                    const newEducation = [...data.education]
                    newEducation[index] = { ...edu, year: e.target.value }
                    setData({ ...data, education: newEducation })
                  }}
                  placeholder="Year"
                />
              </div>
            ))}
            <Button
              onClick={() =>
                setData({
                  ...data,
                  education: [
                    ...data.education,
                    { degree: '', school: '', year: '' },
                  ],
                })
              }
            >
              Add Education
            </Button>
          </section>

          {/* Skills Section */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={skill}
                    onChange={(e) => {
                      const newSkills = [...data.skills]
                      newSkills[index] = e.target.value
                      setData({ ...data, skills: newSkills })
                    }}
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      const newSkills = data.skills.filter((_: string, i: number) => i !== index)
                      setData({ ...data, skills: newSkills })
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            <Button
              onClick={() =>
                setData({ ...data, skills: [...data.skills, ''] })
              }
            >
              Add Skill
            </Button>
          </section>
        </div>
      </div>
    </div>
  )
} 