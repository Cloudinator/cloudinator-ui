import React from 'react'
import { Github, Gitlab, File } from 'lucide-react'
import { ProjectTypeCard } from './ProjectTypeCard'

export type FrontendOptionType = 'github' | 'gitlab' | 'zipUpload'

interface FrontendOptionsProps {
    selectedOption: FrontendOptionType | null
    onOptionSelect: (option: FrontendOptionType) => void
}

const frontendOptions = [
    {
        type: 'github' as const,
        icon: Github,
        color: 'text-black',
        bgColor: 'bg-gray-100',
        label: 'GitHub',
        description: 'Import a project from GitHub'
    },
    {
        type: 'gitlab' as const,
        icon: Gitlab,
        color: 'text-orange-600',
        bgColor: 'bg-orange-100',
        label: 'GitLab',
        description: 'Import a project from GitLab'
    },
    {
        type: 'zipUpload' as const,
        icon: File,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        label: 'Upload Zip',
        description: 'Upload a zip file to create a new project'
    }
]

export function FrontendOptions({ selectedOption, onOptionSelect }: FrontendOptionsProps) {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Select a frontend option:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {frontendOptions.map((option) => (
                    <ProjectTypeCard
                        key={option.type}
                        {...option}
                        isSelected={selectedOption === option.type}
                        onClick={() => onOptionSelect(option.type)}
                    />
                ))}
            </div>
        </div>
    )
}

