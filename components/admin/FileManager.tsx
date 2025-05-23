'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { FileIcon, FolderIcon, TrashIcon, UploadIcon } from 'lucide-react'

interface FileItem {
  name: string
  type: 'file' | 'directory'
  path: string
}

export function FileManager() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [currentPath, setCurrentPath] = useState('/')
  const { toast } = useToast()

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('path', currentPath)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Upload failed')

      toast({
        title: 'Success',
        description: 'File uploaded successfully',
      })

      // Refresh file list
      fetchFiles()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload file',
        variant: 'destructive',
      })
    }
  }

  const handleDelete = async (path: string) => {
    try {
      const response = await fetch('/api/admin/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path }),
      })

      if (!response.ok) throw new Error('Delete failed')

      toast({
        title: 'Success',
        description: 'File deleted successfully',
      })

      // Refresh file list
      fetchFiles()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete file',
        variant: 'destructive',
      })
    }
  }

  const fetchFiles = async () => {
    try {
      const response = await fetch(`/api/admin/files?path=${currentPath}`)
      if (!response.ok) throw new Error('Failed to fetch files')
      const data = await response.json()
      setFiles(data)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch files',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="file"
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
        />
        <Button asChild>
          <label htmlFor="file-upload" className="cursor-pointer">
            <UploadIcon className="mr-2 h-4 w-4" />
            Upload File
          </label>
        </Button>
        <Input
          type="text"
          value={currentPath}
          onChange={(e) => setCurrentPath(e.target.value)}
          placeholder="Current path"
        />
      </div>

      <div className="border rounded-lg">
        <div className="p-4">
          <h3 className="font-semibold mb-2">Files</h3>
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.path}
                className="flex items-center justify-between p-2 hover:bg-muted rounded"
              >
                <div className="flex items-center gap-2">
                  {file.type === 'directory' ? (
                    <FolderIcon className="h-4 w-4" />
                  ) : (
                    <FileIcon className="h-4 w-4" />
                  )}
                  <span>{file.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(file.path)}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 