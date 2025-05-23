import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import fs from 'fs/promises'
import path from 'path'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email || !process.env.ADMIN_EMAILS?.includes(session.user.email)) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const dirPath = searchParams.get('path') || '/'

  try {
    const fullPath = path.join(process.cwd(), dirPath)
    const entries = await fs.readdir(fullPath, { withFileTypes: true })

    const files = await Promise.all(
      entries.map(async (entry) => {
        const fullEntryPath = path.join(fullPath, entry.name)
        const stats = await fs.stat(fullEntryPath)
        return {
          name: entry.name,
          type: entry.isDirectory() ? 'directory' : 'file',
          path: path.join(dirPath, entry.name),
          size: stats.size,
          modified: stats.mtime,
        }
      })
    )

    return NextResponse.json(files)
  } catch (error) {
    console.error('Error reading directory:', error)
    return new NextResponse('Error reading directory', { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email || !process.env.ADMIN_EMAILS?.includes(session.user.email)) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const { path: filePath } = await request.json()
    const fullPath = path.join(process.cwd(), filePath)

    await fs.unlink(fullPath)
    return new NextResponse('File deleted successfully', { status: 200 })
  } catch (error) {
    console.error('Error deleting file:', error)
    return new NextResponse('Error deleting file', { status: 500 })
  }
} 