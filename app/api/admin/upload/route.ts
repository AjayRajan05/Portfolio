import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email || !process.env.ADMIN_EMAILS?.includes(session.user.email)) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const uploadPath = formData.get('path') as string

    if (!file) {
      return new NextResponse('No file provided', { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const fullPath = path.join(process.cwd(), uploadPath, file.name)
    await writeFile(fullPath, buffer)

    return new NextResponse('File uploaded successfully', { status: 200 })
  } catch (error) {
    console.error('Error uploading file:', error)
    return new NextResponse('Error uploading file', { status: 500 })
  }
} 