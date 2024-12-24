'use client'

import React, { useState } from 'react'

import { Button } from "@/components/ui/button"
import { useCreateSubWorkspaceMutation } from "@/redux/api/projectApi"
import { Share2 } from 'lucide-react'
import { FormField } from "@/components/profiledashboard/workspace/FormField"

interface SubworkspaceFormProps {
    onClose: () => void
    selectedWorkspace: string
    data2: () => void
}

export function SubworkspaceForm({ onClose, selectedWorkspace, data2 }: SubworkspaceFormProps) {
    const [createSubWorkspace] = useCreateSubWorkspaceMutation()
    const [projectFields, setProjectFields] = useState({
        name: ''
    })

    // Helper function to sanitize input for consistency
    const sanitizeInput = (value: string) => {
        return value.replace(/\s+/g, '-').toLowerCase() // Replace spaces with hyphens and convert to lowercase
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        // Sanitize the input before setting state
        const sanitizedValue = sanitizeInput(value)

        setProjectFields((prev) => ({ ...prev, [name]: sanitizedValue }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const result = await createSubWorkspace({
                name: projectFields.name,
                workspaceName: selectedWorkspace
            }).unwrap()
            console.log('Subworkspace service deployment created:', result)
        } catch (error) {
            console.log('Failed to create subworkspace service deployment:', error)
            data2()
            onClose()
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
                icon={Share2}
                label="Subworkspace Name"
                name="name"
                value={projectFields.name}
                onChange={handleInputChange}
            />
            <Button type="submit" className="w-full">Create Subworkspace</Button>
        </form>
    )
}