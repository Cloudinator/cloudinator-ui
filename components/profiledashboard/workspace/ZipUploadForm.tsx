'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUploadZipMutation } from "@/redux/api/file"
import { useDeployZipServiceMutation } from "@/redux/api/projectApi"

interface ZipUploadFormProps {
    onClose: () => void
    selectedWorkspace: string
}

export function ZipUploadForm({ onClose, selectedWorkspace }: ZipUploadFormProps) {
    const [file, setFile] = useState<File | null>(null)
    const [projectName, setProjectName] = useState('')
    const [uploadZip, { isLoading }] = useUploadZipMutation()
    const [deployZipService] = useDeployZipServiceMutation()

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null
        setFile(selectedFile)
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        if (!file) {
            alert('Please select a file.')
            return
        }

        try {

            const uploadResponse = await uploadZip({ file }).unwrap()
            const deployResponse = await deployZipService({
                name: projectName,
                workspaceName: selectedWorkspace,
                gitUrl: file.name,
                type: 'frontend',
                token: '',
                branch: 'main',
            }).unwrap()

            console.log("Upload successful:", uploadResponse)
            console.log("Project created:", deployResponse)

            alert('Project created successfully!')
            onClose()
        } catch (err) {
            console.log("Error during project creation:", err)
            alert('An error occurred while creating the project.')
        }
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
            <Button type="submit" disabled={isLoading}>
                {isLoading ? "Processing..." : "Create Project"}
            </Button>
        </form>
    )
}