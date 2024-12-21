'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ZipUploadFormProps {
    onClose: () => void;
    selectedWorkspace: string;
}

export function ZipUploadForm({ onClose, selectedWorkspace }: ZipUploadFormProps) {
    const [file, setFile] = useState<File | null>(null)
    const [projectName, setProjectName] = useState('')

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0])
        }
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        // Here you would handle the file upload and project creation
        console.log('Uploading file:', file)
        console.log('Project Name:', projectName)
        console.log('Selected Workspace:', selectedWorkspace)
        // After handling the upload, you might want to close the dialog
        onClose()
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                    id="projectName"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="zipFile">Upload Zip File</Label>
                <Input
                    id="zipFile"
                    type="file"
                    accept=".zip"
                    onChange={handleFileChange}
                    required
                />
            </div>
            <Button type="submit">Create Project</Button>
        </form>
    )
}

