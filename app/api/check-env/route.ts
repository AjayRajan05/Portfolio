import { NextResponse } from 'next/server'

export async function GET() {
  // Check if environment variables are loaded
  const envVars = {
    hasResendKey: !!process.env.RESEND_API_KEY,
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
    hasAdminEmail: !!process.env.ADMIN_EMAIL,
    hasAdminPassword: !!process.env.ADMIN_PASSWORD,
    allowedDomains: process.env.NEXT_PUBLIC_ALLOWED_DOMAINS,
  }

  return NextResponse.json(envVars)
} 