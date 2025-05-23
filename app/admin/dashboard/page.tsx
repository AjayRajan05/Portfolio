"use client";

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { signOut } from 'next-auth/react'
import { BackButton } from '@/components/shared/BackButton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileManager } from '@/components/admin/FileManager'
import { ProfileEditor } from '@/components/admin/ProfileEditor'
import { ProjectManager } from '@/components/admin/ProjectManager'
import { CertificationManager } from '@/components/admin/CertificationManager'
import { SettingsManager } from '@/components/admin/SettingsManager'

export default function AdminDashboard() {
  const { data: session } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('profile')

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/admin/login')
  }

  if (!session) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <BackButton href="/" label="Back to Site" />
        <Button variant="outline" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <ProfileEditor />
            </TabsContent>

            <TabsContent value="projects">
              <ProjectManager />
            </TabsContent>

            <TabsContent value="certifications">
              <CertificationManager />
            </TabsContent>

            <TabsContent value="files">
              <FileManager />
            </TabsContent>

            <TabsContent value="settings">
              <SettingsManager />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
} 