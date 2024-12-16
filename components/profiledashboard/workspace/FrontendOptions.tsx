import React from 'react'
import { motion } from 'framer-motion'
import { Github, GitlabIcon as GitlabLogo } from 'lucide-react'
import { ProjectTypeCard } from './ProjectTypeCard'

const frontendOptions = [
    {
        type: 'github',
        icon: Github,
        color: 'text-gray-800',
        bgColor: 'bg-gray-100',
        label: 'GitHub',
        description: 'Import your project from GitHub, the world\'s leading software development platform.'
    },
    {
        type: 'gitlab',
        icon: GitlabLogo,
        color: 'text-orange-600',
        bgColor: 'bg-orange-100',
        label: 'GitLab',
        description: 'Import your project from GitLab, a complete DevOps platform.'
    },
] as const

export type FrontendOptionType = typeof frontendOptions[number]['type']

interface FrontendOptionsProps {
    selectedOption: FrontendOptionType | null
    onOptionSelect: (option: FrontendOptionType) => void
}

export const FrontendOptions: React.FC<FrontendOptionsProps> = React.memo(({ selectedOption, onOptionSelect }) => (
    <motion.div
        key="frontend-options"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
    >
        <h3 className="text-xl font-semibold mb-4">Choose a Git provider:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {frontendOptions.map((option) => (
                <ProjectTypeCard
                    key={option.type}
                    {...option}
                    isSelected={selectedOption === option.type}
                    onClick={() => onOptionSelect(option.type)}
                />
            ))}
        </div>
    </motion.div>
))

FrontendOptions.displayName = 'FrontendOptions'

