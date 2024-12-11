'use client'

import React, { useState } from 'react'

import { Button } from "@/components/ui/button"
import { useCreateServiceDeploymentMutation } from "@/redux/api/projectApi"
import { Share2 } from 'lucide-react'
import {FormField} from "@/components/profiledashboard/workspace/FormField";

interface SubworkspaceFormProps {
    onClose: () => void
}

export function SubworkspaceForm({ onClose }: SubworkspaceFormProps) {
    const [createServiceDeployment] = useCreateServiceDeploymentMutation()
    const [projectFields, setProjectFields] = useState({
        name: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setProjectFields(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const result = await createServiceDeployment({
                type: 'subworkspace',
                ...projectFields
            }).unwrap()
            console.log('Subworkspace service2 deployment created:', result)
            onClose()
        } catch (error) {
            console.error('Failed to create subworkspace service2 deployment:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <FormField icon={Share2} label="Subworkspace Name" name="name" value={projectFields.name} onChange={handleInputChange} />
            <Button type="submit" className="w-full">Create Subworkspace</Button>
        </form>
    )
}

