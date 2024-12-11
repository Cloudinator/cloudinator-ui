'use client'

import React, { useState } from 'react'

import { Button } from "@/components/ui/button"
import { useCreateServiceDeploymentMutation } from "@/redux/api/projectApi"
import { Code, GitBranch, Globe } from 'lucide-react'
import {AutomationToggle, FormField} from "@/components/profiledashboard/workspace/FormField";

interface BackendFormProps {
    onClose: () => void
    selectedWorkspace: string
}

export function BackendForm({ onClose ,selectedWorkspace}: BackendFormProps) {
    const [createServiceDeployment] = useCreateServiceDeploymentMutation()
    const [projectFields, setProjectFields] = useState({
        name: '',
        branch: '',
        gitUrl: '',
        subdomain: '',
        automate: false,
        token: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setProjectFields(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const result = await createServiceDeployment({
                name: projectFields.name,
                gitUrl:projectFields.gitUrl,
                branch:projectFields.branch,
                subdomain:projectFields.subdomain,
                workspaceName: selectedWorkspace,
                token: projectFields.token,
                type: 'backend'
            }).unwrap()
            console.log('Backend service2 deployment created:', result)
            onClose()
        } catch (error) {
            console.error('Failed to create backend service2 deployment:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <FormField icon={Code} label="Project Name" name="name" value={projectFields.name} onChange={handleInputChange} />
            <FormField icon={GitBranch} label="Branch" name="branch" value={projectFields.branch} onChange={handleInputChange} />
            <FormField icon={Globe} label="Git URL" name="gitUrl" value={projectFields.gitUrl} onChange={handleInputChange} />
            <FormField icon={Globe} label="Subdomain" name="subdomain" value={projectFields.subdomain} onChange={handleInputChange} />
            <AutomationToggle
                checked={projectFields.automate}
                onCheckedChange={(checked) => setProjectFields(prev => ({ ...prev, automate: checked }))}
                token={projectFields.token}
                onTokenChange={handleInputChange}
            />
            <Button type="submit" className="w-full">Create Backend Project</Button>
        </form>
    )
}

