'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card"
import {
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Layout, Server, Database, Share2 } from 'lucide-react'
import {FrontendForm} from "@/components/profiledashboard/workspace/FrontendForm";
import {BackendForm} from "@/components/profiledashboard/workspace/BackendForm";
import {DatabaseForm} from "@/components/profiledashboard/workspace/DatabaseForm";
import {SubworkspaceForm} from "@/components/profiledashboard/workspace/Subworkspaceform";


interface CreateProjectContentProps {
    onClose: () => void;
    selectedWorkspace: string;
}

const projectTypes = [
    { type: 'frontend', icon: Layout, color: 'text-purple-600', bgColor: 'bg-purple-100', label: 'Frontend' },
    { type: 'backend', icon: Server, color: 'text-pink-600', bgColor: 'bg-pink-100', label: 'Backend' },
    { type: 'database', icon: Database, color: 'text-orange-600', bgColor: 'bg-orange-100', label: 'Database' },
    { type: 'subworkspace', icon: Share2, color: 'text-blue-600', bgColor: 'bg-blue-100', label: 'Subworkspace' },
] as const

type ProjectType = typeof projectTypes[number]['type']

export default function CreateProjectContent({ onClose,selectedWorkspace }: CreateProjectContentProps) {
    const [selectedType, setSelectedType] = useState<ProjectType | null>(null)

    console.log('selectedWorkspace', selectedWorkspace)

    const renderProjectForm = () => {
        if (!selectedType) return null

        switch (selectedType) {
            case 'frontend':
                return <FrontendForm onClose={onClose} selectedWorkspace={selectedWorkspace}/>
            case 'backend':
                return <BackendForm onClose={onClose} selectedWorkspace={selectedWorkspace} />
            case 'database':
                return <DatabaseForm onClose={onClose} />
            case 'subworkspace':
                return <SubworkspaceForm onClose={onClose} />
            default:
                return null
        }
    }

    return (
        <div className="flex flex-col h-full max-h-[80vh]">
            <DialogHeader className="px-6 py-4 border-b">
                <DialogTitle className="text-2xl font-bold">Create New Project</DialogTitle>
                <DialogDescription className="text-base">
                    Choose a project type and enter the required information.
                </DialogDescription>
            </DialogHeader>

            <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {projectTypes.map(({ type, icon: Icon, color, bgColor, label }) => (
                            <Card
                                key={type}
                                className={`cursor-pointer transition-all ${
                                    selectedType === type ? 'ring-2 ring-purple-500' : ''
                                }`}
                                onClick={() => setSelectedType(type)}
                            >
                                <CardContent className="p-2">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex flex-col items-center justify-center text-center"
                                    >
                                        <div className={`p-2 rounded-lg ${bgColor} mb-1`}>
                                            <Icon className={`w-4 h-4 ${color}`} />
                                        </div>
                                        <CardTitle className="text-xs font-medium">{label}</CardTitle>
                                    </motion.div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {selectedType && (
                            <motion.div
                                key={selectedType}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                {renderProjectForm()}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </ScrollArea>
        </div>
    )
}

