'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

interface Settings {
  siteName: string
  siteDescription: string
  emailGateEnabled: boolean
  allowedDomains: string[]
  analyticsEnabled: boolean
  analyticsId: string
}

export function SettingsManager() {
  const [settings, setSettings] = useState<Settings>({
    siteName: '',
    siteDescription: '',
    emailGateEnabled: true,
    allowedDomains: [],
    analyticsEnabled: false,
    analyticsId: '',
  })
  const { toast } = useToast()

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      })

      if (!response.ok) throw new Error('Failed to save settings')

      toast({
        title: 'Success',
        description: 'Settings saved successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings',
        variant: 'destructive',
      })
    }
  }

  return (
    <form onSubmit={handleSaveSettings} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Site Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="siteName">Site Name</Label>
            <Input
              id="siteName"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="siteDescription">Site Description</Label>
            <Input
              id="siteDescription"
              value={settings.siteDescription}
              onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Gate Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="emailGate">Enable Email Gate</Label>
            <Switch
              id="emailGate"
              checked={settings.emailGateEnabled}
              onCheckedChange={(checked) => setSettings({ ...settings, emailGateEnabled: checked })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="allowedDomains">Allowed Email Domains (comma-separated)</Label>
            <Input
              id="allowedDomains"
              value={settings.allowedDomains.join(', ')}
              onChange={(e) => setSettings({
                ...settings,
                allowedDomains: e.target.value.split(',').map(domain => domain.trim())
              })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Analytics Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="analytics">Enable Analytics</Label>
            <Switch
              id="analytics"
              checked={settings.analyticsEnabled}
              onCheckedChange={(checked) => setSettings({ ...settings, analyticsEnabled: checked })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="analyticsId">Analytics ID</Label>
            <Input
              id="analyticsId"
              value={settings.analyticsId}
              onChange={(e) => setSettings({ ...settings, analyticsId: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Button type="submit">Save Settings</Button>
    </form>
  )
} 