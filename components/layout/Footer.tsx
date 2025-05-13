'use client'

import Link from "next/link"
import { Github, Linkedin, Twitter, BookOpen, Mail, LucideIcon } from "lucide-react"
import { resumeData } from "@/data/resume"
import { FC, useState } from "react"
import { Button } from '@/components/ui/button'
import { AdminLogin } from '@/components/admin/AdminLogin'
import { AdminDashboard } from '@/components/admin/AdminDashboard'

interface SocialLink {
  name: string
  url: string
  icon: LucideIcon
}

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear()
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [showAdminDashboard, setShowAdminDashboard] = useState(false)

  const handleAdminClick = () => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true'
    if (isAuthenticated) {
      setShowAdminDashboard(true)
    } else {
      setShowAdminLogin(true)
    }
  }

  const socialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      url: resumeData.socialLinks?.github || '#',
      icon: Github,
    },
    {
      name: 'LinkedIn',
      url: resumeData.socialLinks?.linkedin || '#',
      icon: Linkedin,
    },
    {
      name: 'Twitter',
      url: resumeData.socialLinks?.twitter || '#',
      icon: Twitter,
    },
    {
      name: 'Blog',
      url: resumeData.socialLinks?.blog || '#',
      icon: BookOpen,
    },
    {
      name: 'Email',
      url: `mailto:${resumeData.email}`,
      icon: Mail,
    },
  ]

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {resumeData.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{link.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleAdminClick}
              className="text-muted-foreground hover:text-foreground"
            >
              Admin Mode
            </Button>
          </div>
        </div>
      </div>

      {showAdminLogin && (
        <AdminLogin onLogin={() => {
          setShowAdminLogin(false)
          setShowAdminDashboard(true)
        }} />
      )}

      {showAdminDashboard && (
        <AdminDashboard />
      )}
    </footer>
  )
}