'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

interface BackButtonProps {
  href?: string
  label?: string
}

export function BackButton({ href, label = 'Back' }: BackButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (href) {
      router.push(href)
    } else {
      router.back()
    }
  }

  return (
    <Button
      variant="ghost"
      className="mb-4"
      onClick={handleClick}
    >
      <ChevronLeft className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )
} 