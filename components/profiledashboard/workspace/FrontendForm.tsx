'use client'

import React, { useState } from 'react'
import {AutomationToggle, FormField} from './FormField'

import { Button } from "@/components/ui/button"
import { useCreateServiceDeploymentMutation } from "@/redux/api/projectApi"
import { Code, GitBranch, Globe } from 'lucide-react'

interface FrontendFormProps {
    onClose: () => void
    selectedWorkspace: string
    data1 : () => void;
}

export function FrontendForm({ onClose,selectedWorkspace ,data1}: FrontendFormProps) {
    const [createServiceDeployment] = useCreateServiceDeploymentMutation()
    const [projectFields, setProjectFields] = useState({
        name: '',
        branch: '',
        gitUrl: '',
        subdomain: '',
        automate: false,
        token: '',
        type: 'frontend'
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
                type: 'frontend'
            }).unwrap()
            console.log('Frontend service2 deployment created:', result)

        } catch (error) {
            console.log('Failed to create frontend service2 deployment:', error)
            data1()
            onClose()
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
            <Button type="submit" className="w-full">Create Frontend Project</Button>
        </form>
    )
}

