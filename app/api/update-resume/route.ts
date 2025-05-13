import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate admin authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const token = authHeader.split(' ')[1]
    if (token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Write to resumeData.ts
    const filePath = join(process.cwd(), 'data', 'resumeData.ts')
    const fileContent = `export const resumeData = ${JSON.stringify(data, null, 2)}`
    
    await writeFile(filePath, fileContent, 'utf-8')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating resume data:', error)
    return NextResponse.json(
      { error: 'Failed to update resume data' },
      { status: 500 }
    )
  }
} 