import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    // Check if user is authenticated as admin
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user as any)?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get all emails from Redis or your database
    // For now, we'll return a message about checking localStorage
    return NextResponse.json({
      message: 'To view logged-in emails, check the browser\'s localStorage for the "userEmail" key',
      instructions: [
        'Open browser developer tools (F12)',
        'Go to Application tab',
        'Select Local Storage on the left',
        'Look for "userEmail" key'
      ]
    })
  } catch (error) {
    console.error('Error fetching emails:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 