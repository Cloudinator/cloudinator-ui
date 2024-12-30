'use client'

import * as React from 'react'
import { Search, GitBranch, ChevronDown, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {useCreateGitlabServiceMutation, useGetRepositoryQuery} from "@/redux/api/projectApi"

interface EnhancedGitImportFormProps {
    onClose: () => void
    selectedWorkspace: string
    data1: () => void
}

interface Repository {
    id: string
    name: string
    http_url_to_repo: string
    default_branch: string
}

export default function GitlabImportForm({ onClose, selectedWorkspace,data1 }: EnhancedGitImportFormProps) {
    const [searchQuery, setSearchQuery] = React.useState('')
    const [expandedRepo, setExpandedRepo] = React.useState<string | null>(null)
    const [createGitlabService] = useCreateGitlabServiceMutation();

    const { data, isLoading, error } = useGetRepositoryQuery()

    const handleImport = (repo: Repository) => {
        try{

            const response = createGitlabService({
                name: repo.name,
                workspaceName: selectedWorkspace,
                token: '',
                branch: repo.default_branch,
            })

            response.unwrap().then(
                () => {
                    onClose();
                    data1();
                },
                (error) => {
                    console.log(error)
                    onClose();
                    data1();
                }
            )

            console.log(response)

        }catch (error){
            console.log(error)
        }
    }

    const filteredRepos = React.useMemo(() => {
        if (!data || !Array.isArray(data)) return []; // Ensure it's an array
        const search = searchQuery.toLowerCase();
        return (data as Repository[]).filter((repo: Repository) =>
            repo.name.toLowerCase().includes(search)
        );
    }, [data, searchQuery]);

    if (isLoading) return <div className="text-center p-4">Loading repositories...</div>
    if (error) return <div className="text-center p-4 text-red-500">Error loading repositories</div>
    if (!data) return null

    return (
        <div className="flex flex-col space-y-6 p-6 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800">Import Git Repository</h2>

            <div className="flex gap-4">
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

            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                <AnimatePresence>
                    {filteredRepos.map((repo: Repository) => (
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
                                        <span className="text-sm text-gray-500">{repo.http_url_to_repo}</span>
                                        <span className="text-sm text-gray-500">{repo.default_branch}</span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
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
                                                                <GitBranch className="h-4 w-4 mr-1" />
                                                                {repo.default_branch}
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Main branch</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                            <Button
                                                variant="default"
                                                className="bg-blue-500 text-white hover:bg-blue-600"
                                                onClick={() => handleImport(repo)}
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
        </div>
    )
}

