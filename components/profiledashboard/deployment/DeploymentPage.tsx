'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {DeploymentState, GitProvider} from "@/types/deployment";
import {ProviderModal} from "@/components/profiledashboard/deployment/ProviderModal";
import {GitHubModal} from "@/components/profiledashboard/deployment/GitHubModal";
import {GitLabModal} from "@/components/profiledashboard/deployment/GitLabModal";

export default function Deployments() {
    const [open, setOpen] = useState(false)
    const [state, setState] = useState<DeploymentState>({
        step: 'provider'
    })

    const handleProviderSelect = (provider: GitProvider) => {
        setState({
            step: provider,
            gitProvider: provider
        })
    }

    const handleBack = () => {
        setState({ step: 'provider' })
    }

    const handleClose = () => {
        setOpen(false)
        setState({ step: 'provider' })
    }

    const handleGitHubDeploy = (data: {
        projectName: string
        branch: string
        gitUrl: string
        automate: boolean
        accessToken?: string
    }) => {
        console.log('Deploying GitHub project:', data)
        handleClose()
    }

    const handleGitLabDeploy = (data: { projectName: string }) => {
        console.log('Deploying GitLab project:', data)
        handleClose()
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Button onClick={() => setOpen(true)}>
                Deploy Project
            </Button>

            <ProviderModal
                open={open && state.step === 'provider'}
                onProviderSelect={handleProviderSelect}
                onClose={handleClose}
            />

            <GitHubModal
                open={open && state.step === 'github'}
                onDeploy={handleGitHubDeploy}
                onBack={handleBack}
                onClose={handleClose}
            />

            <GitLabModal
                open={open && state.step === 'gitlab'}
                onDeploy={handleGitLabDeploy}
                onBack={handleBack}
                onClose={handleClose}
            />
        </div>
    )
}

