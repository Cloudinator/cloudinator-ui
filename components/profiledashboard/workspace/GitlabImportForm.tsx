'use client'

import * as React from 'react'
import { Search, GitBranch, Star, GitFork, Clock, ChevronDown, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data - replace with actual API call
const repositories = [
    { id: '1', name: 'cloudinator-api-delivery', description: 'Main API delivery service', updatedAt: '15m ago', stars: 45, forks: 12, mainBranch: 'main', language: 'TypeScript' },
    { id: '2', name: 'cloudinator-doc', description: 'Documentation and guides', updatedAt: '9h ago', stars: 23, forks: 5, mainBranch: 'master', language: 'Markdown' },
    { id: '3', name: 'cloudinator-admin', description: 'Admin panel for Cloudinator', updatedAt: '5d ago', stars: 34, forks: 8, mainBranch: 'develop', language: 'JavaScript' },
    { id: '4', name: 'cloudinator-api-identity', description: 'Identity and auth service', updatedAt: '6d ago', stars: 56, forks: 15, mainBranch: 'main', language: 'Go' },
    { id: '5', name: 'cloudinator-api-gateway', description: 'API Gateway service', updatedAt: '8d ago', stars: 67, forks: 20, mainBranch: 'main', language: 'Python' },
]

const languageColors: { [key: string]: string } = {
    TypeScript: 'bg-blue-100 text-blue-800',
    Markdown: 'bg-green-100 text-green-800',
    JavaScript: 'bg-yellow-100 text-yellow-800',
    Go: 'bg-cyan-100 text-cyan-800',
    Python: 'bg-indigo-100 text-indigo-800',
}

interface EnhancedGitImportFormProps {
    onClose: () => void
    selectedWorkspace: string
}

export default function GitlabImportForm({ onClose, selectedWorkspace }: EnhancedGitImportFormProps) {
    const [searchQuery, setSearchQuery] = React.useState('')
    const [expandedRepo, setExpandedRepo] = React.useState<string | null>(null)

    const filteredRepositories = repositories.filter(repo =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleImport = (repoId: string) => {
        console.log('Importing repository:', repoId)
        console.log('Selected workspace:', selectedWorkspace)
        onClose()
    }

    return (
        <div className="flex flex-col space-y-6 p-6 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800">Import Git Repository</h2>

            <div className="flex gap-4">
                <Select defaultValue="cloudinator">
                    <SelectTrigger className="w-[200px] bg-white border-gray-300 text-gray-700">
                        <SelectValue placeholder="Select organization" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="cloudinator">Cloudinator</SelectItem>
                        <SelectItem value="other">Other Organization</SelectItem>
                    </SelectContent>
                </Select>

                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                        className="w-full pl-10 pr-4 py-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Search repositories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-4">
                <AnimatePresence>
                    {filteredRepositories.map((repo) => (
                        <motion.div
                            key={repo.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                        >
                            <div
                                className="flex items-center justify-between p-4 cursor-pointer"
                                onClick={() => setExpandedRepo(expandedRepo === repo.id ? null : repo.id)}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl font-semibold text-gray-700">
                                        {repo.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-lg font-semibold text-gray-800">{repo.name}</span>
                                        <span className="text-sm text-gray-500">{repo.description}</span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Badge variant="secondary" className={`${languageColors[repo.language]}`}>
                                        {repo.language}
                                    </Badge>
                                    {expandedRepo === repo.id ? <ChevronDown className="h-5 w-5 text-gray-400" /> : <ChevronRight className="h-5 w-5 text-gray-400" />}
                                </div>
                            </div>
                            <AnimatePresence>
                                {expandedRepo === repo.id && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="px-4 pb-4 bg-gray-50"
                                    >
                                        <div className="flex justify-between items-center py-2 border-t border-gray-200">
                                            <div className="flex space-x-4 text-sm text-gray-500">
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <div className="flex items-center">
                                                                <Star className="h-4 w-4 mr-1" />
                                                                {repo.stars}
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Stars</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <div className="flex items-center">
                                                                <GitFork className="h-4 w-4 mr-1" />
                                                                {repo.forks}
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Forks</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <div className="flex items-center">
                                                                <GitBranch className="h-4 w-4 mr-1" />
                                                                {repo.mainBranch}
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Main branch</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <div className="flex items-center">
                                                                <Clock className="h-4 w-4 mr-1" />
                                                                {repo.updatedAt}
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Last updated</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                            <Button
                                                variant="default"
                                                className="bg-blue-500 text-white hover:bg-blue-600"
                                                onClick={() => handleImport(repo.id)}
                                            >
                                                Import
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="pt-4 border-t border-gray-200">
                <Button
                    variant="link"
                    className="text-blue-500 hover:text-blue-600 p-0"
                    onClick={() => console.log('Import third-party repository')}
                >
                    Import Third-Party Git Repository →
                </Button>
            </div>
        </div>
    )
}

