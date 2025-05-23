'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PlusIcon, TrashIcon } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  imageUrl: string
  liveUrl: string
  githubUrl: string
}

export function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    description: '',
    technologies: [],
    imageUrl: '',
    liveUrl: '',
    githubUrl: '',
  })
  const { toast } = useToast()

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      })

      if (!response.ok) throw new Error('Failed to add project')

      const addedProject = await response.json()
      setProjects([...projects, addedProject])
      setNewProject({
        title: '',
        description: '',
        technologies: [],
        imageUrl: '',
        liveUrl: '',
        githubUrl: '',
      })

      toast({
        title: 'Success',
        description: 'Project added successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add project',
        variant: 'destructive',
      })
    }
  }

  const handleDeleteProject = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete project')

      setProjects(projects.filter(project => project.id !== id))
      toast({
        title: 'Success',
        description: 'Project deleted successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete project',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddProject} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="title">Title</label>
                <Input
                  id="title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="technologies">Technologies (comma-separated)</label>
                <Input
                  id="technologies"
                  value={newProject.technologies?.join(', ')}
                  onChange={(e) => setNewProject({
                    ...newProject,
                    technologies: e.target.value.split(',').map(tech => tech.trim())
                  })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="description">Description</label>
              <Textarea
                id="description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="imageUrl">Image URL</label>
                <Input
                  id="imageUrl"
                  value={newProject.imageUrl}
                  onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="liveUrl">Live URL</label>
                <Input
                  id="liveUrl"
                  value={newProject.liveUrl}
                  onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="githubUrl">GitHub URL</label>
                <Input
                  id="githubUrl"
                  value={newProject.githubUrl}
                  onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                />
              </div>
            </div>
            <Button type="submit">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-semibold">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteProject(project.id)}
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