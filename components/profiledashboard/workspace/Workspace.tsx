'use client'

import React, { useState } from 'react'
import { GitCommit, Database, Server, Monitor, FolderTree, X, Plus, Globe, Clock, Folder } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Project = {
    id: number
    name: string
    status: string
    url: string
    lastDeployed: string
    services: string[]
    subWorkspaces: string[]
    env: Record<string, string>
}

type FrontendService = {
    framework?: string;
    deploymentUrl?: string;
};

type BackendService = {
    language?: string;
    port?: string;
};

type DatabaseService = {
    type?: string;
    connectionString?: string;
};

type ServiceData = {
    frontend?: FrontendService;
    backend?: BackendService;
    database?: DatabaseService;
};

const initialProjects: Project[] = [
    {
        id: 1,
        name: 'E-commerce Platform',
        status: 'Production',
        url: 'https://ecommerce.example.com',
        lastDeployed: '2 hours ago',
        services: ['frontend', 'backend', 'database'],
        subWorkspaces: ['Staging', 'Development'],
        env: {
            API_KEY: '****',
            DATABASE_URL: '****'
        }
    },
    {
        id: 2,
        name: 'Blog API',
        status: 'Development',
        url: 'https://api-dev.example.com',
        lastDeployed: '1 day ago',
        services: ['backend', 'database'],
        subWorkspaces: ['Testing'],
        env: {
            PORT: '3000',
            NODE_ENV: 'development'
        }
    }
]

export default function Workspace() {
    const [projects, setProjects] = useState<Project[]>(initialProjects)
    const [activeFilters, setActiveFilters] = useState<string[]>([])
    const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false)
    const [selectedServices, setSelectedServices] = useState<string[]>([])
    const [serviceData, setServiceData] = useState<ServiceData>({})
    const [isEnvModalOpen, setIsEnvModalOpen] = useState(false)
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
    const [envVars, setEnvVars] = useState<{ key: string; value: string }[]>([])

    // Filter logic for projects
    const filteredProjects = activeFilters.length
        ? projects.filter((project) =>
            activeFilters.some((filter) => project.services.includes(filter))
        )
        : projects

    const handleFilterClick = (filter: string) => {
        setActiveFilters((prev) =>
            prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
        )
    }

    const handleServiceToggle = (service: string) => {
        setSelectedServices((prev) =>
            prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
        )
    }

    const renderServiceInputs = (service: string) => {
        if (service === 'frontend') {
            return (
                <div>
                    <Label>Frontend Framework</Label>
                    <Input
                        placeholder="React, Vue, etc."
                        value={serviceData.frontend?.framework || ''}
                        onChange={(e) =>
                            setServiceData({
                                ...serviceData,
                                frontend: { ...serviceData.frontend, framework: e.target.value }
                            })
                        }
                    />
                    <Label>Deployment URL</Label>
                    <Input
                        placeholder="https://example.com"
                        value={serviceData.frontend?.deploymentUrl || ''}
                        onChange={(e) =>
                            setServiceData({
                                ...serviceData,
                                frontend: { ...serviceData.frontend, deploymentUrl: e.target.value }
                            })
                        }
                    />
                </div>
            )
        }
        if (service === 'backend') {
            return (
                <div>
                    <Label>Backend Language</Label>
                    <Input
                        placeholder="Node.js, Python, etc."
                        value={serviceData.backend?.language || ''}
                        onChange={(e) =>
                            setServiceData({
                                ...serviceData,
                                backend: { ...serviceData.backend, language: e.target.value }
                            })
                        }
                    />
                    <Label>Port</Label>
                    <Input
                        placeholder="3000, 8080, etc."
                        value={serviceData.backend?.port || ''}
                        onChange={(e) =>
                            setServiceData({
                                ...serviceData,
                                backend: { ...serviceData.backend, port: e.target.value }
                            })
                        }
                    />
                </div>
            )
        }
        if (service === 'database') {
            return (
                <div>
                    <Label>Database Type</Label>
                    <Input
                        placeholder="PostgreSQL, MySQL, etc."
                        value={serviceData.database?.type || ''}
                        onChange={(e) =>
                            setServiceData({
                                ...serviceData,
                                database: { ...serviceData.database, type: e.target.value }
                            })
                        }
                    />
                    <Label>Connection String</Label>
                    <Input
                        placeholder="Connection string"
                        value={serviceData.database?.connectionString || ''}
                        onChange={(e) =>
                            setServiceData({
                                ...serviceData,
                                database: { ...serviceData.database, connectionString: e.target.value }
                            })
                        }
                    />
                </div>
            )
        }
        return null
    }

    const handleNewProject = (e: React.FormEvent) => {
        e.preventDefault()
        const newProject: Project = {
            id: projects.length + 1,
            name: `New Project ${projects.length + 1}`,
            status: 'Development',
            url: '',
            lastDeployed: 'N/A',
            services: selectedServices,
            subWorkspaces: [],
            env: {}
        }
        setProjects([...projects, newProject])
        setIsNewProjectModalOpen(false)
        setSelectedServices([])
        setServiceData({})
    }

    const openEnvModal = (projectId: number) => {
        setSelectedProjectId(projectId)
        const project = projects.find((p) => p.id === projectId)
        if (project) {
            setEnvVars(
                Object.entries(project.env).map(([key, value]) => ({ key, value }))
            )
        }
        setIsEnvModalOpen(true)
    }

    const handleEnvVarChange = (index: number, field: 'key' | 'value', value: string) => {
        const updatedEnvVars = [...envVars]
        updatedEnvVars[index][field] = value
        setEnvVars(updatedEnvVars)
    }

    const handleAddEnvVar = () => {
        setEnvVars([...envVars, { key: '', value: '' }])
    }

    const handleRemoveEnvVar = (index: number) => {
        setEnvVars(envVars.filter((_, i) => i !== index))
    }

    const handleSaveEnv = () => {
        if (selectedProjectId !== null) {
            setProjects((prev) =>
                prev.map((project) =>
                    project.id === selectedProjectId
                        ? {
                            ...project,
                            env: Object.fromEntries(envVars.map(({ key, value }) => [key, value]))
                        }
                        : project
                )
            )
            setIsEnvModalOpen(false)
        }
    }

    return (
        <div className="px-8 py-6">
            {/* Title and Actions */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <Folder size={28} className="text-purple-500"/>
                    <h1 className="text-2xl font-bold text-purple-500">Projects</h1>
                </div>
                <Button onClick={() => setIsNewProjectModalOpen(true)} className="bg-purple-500">
                    <Plus size={20} className="inline mr-2"/>
                    New Project
                </Button>
            </div>

            {/* Filter Section */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex flex-wrap gap-2">
                    {[
                        {id: 'frontend', icon: <Monitor size={16} /> },
                        { id: 'backend', icon: <Server size={16} /> },
                        { id: 'database', icon: <Database size={16} /> },
                        { id: 'subWorkspace', icon: <FolderTree size={16} /> }
                    ].map(({ id, icon }) => (
                        <Button
                            key={id}
                            variant={activeFilters.includes(id) ? "default" : "outline"}
                            className="inline-flex items-center px-3 py-1.5 text-sm"
                            onClick={() => handleFilterClick(id)}
                        >
                            {icon}
                            <span className="ml-2 capitalize">{id}</span>
                        </Button>
                    ))}
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                    <div key={project.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    project.status === 'Production'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                }`}>
                  {project.status}
                </span>
                            </div>

                            <div className="space-y-3">
                                <p className="text-sm text-gray-500 flex items-center">
                                    <Globe size={16} className="mr-2" />
                                    {project.url}
                                </p>
                                <p className="text-sm text-gray-500 flex items-center">
                                    <Clock size={16} className="mr-2" />
                                    {project.lastDeployed}
                                </p>

                                <div>
                                    <p className="text-sm font-medium text-gray-700 mb-2">Services</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.services.map((service) => (
                                            <span
                                                key={service}
                                                className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium"
                                            >
                        {service === 'frontend' && <Monitor size={12} className="mr-1" />}
                                                {service === 'backend' && <Server size={12} className="mr-1" />}
                                                {service === 'database' && <Database size={12} className="mr-1" />}
                                                {service}
                      </span>
                                        ))}
                                    </div>
                                </div>

                                {project.subWorkspaces.length > 0 && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-700 mb-2">Sub-workspaces</p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.subWorkspaces.map((workspace) => (
                                                <span
                                                    key={workspace}
                                                    className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium"
                                                >
                          <FolderTree size={12} className="mr-1" />
                                                    {workspace}
                        </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="border-t border-gray-100 p-4 bg-gray-50 flex justify-between items-center">
                            <button
                                onClick={() => openEnvModal(project.id)}
                                className="text-sm font-medium text-purple-600 hover:text-purple-700"
                            >
                                Environment Variables
                            </button>
                            <Button variant="default" className="inline-flex items-center px-3 py-1.5 text-sm">
                                <GitCommit size={14} className="mr-1.5" />
                                Deploy
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* New Project Modal */}
            {isNewProjectModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Create New Project</h2>
                            <button onClick={() => setIsNewProjectModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleNewProject} className="space-y-6">
                            <div className="space-y-2">
                                <Label>Services</Label>
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        { id: 'frontend', label: 'Frontend', icon: Monitor },
                                        { id: 'backend', label: 'Backend', icon: Server },
                                        { id: 'database', label: 'Database', icon: Database },
                                        { id: 'subWorkspace', label: 'SubWorkspace', icon: FolderTree }
                                    ].map(({ id, label, icon: Icon }) => (
                                        <Button
                                            key={id}
                                            type="button"
                                            variant={selectedServices.includes(id) ? "default" : "outline"}
                                            className="flex items-center justify-center gap-2 h-auto py-3"
                                            onClick={() => handleServiceToggle(id)}
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span>{label}</span>
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {selectedServices.map(service => (
                                <div key={service}>
                                    {renderServiceInputs(service)}
                                </div>
                            ))}

                            <Button type="submit" className="w-full">
                                Create Project
                            </Button>
                        </form>
                    </div>
                </div>
            )}

            {/* Environment Variables Modal */}
            {isEnvModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Environment Variables</h2>
                            <button onClick={() => setIsEnvModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            {envVars.map((envVar, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input
                                        id={`env-key-${index}`}
                                        placeholder="KEY"
                                        value={envVar.key}
                                        onChange={(e) => handleEnvVarChange(index, 'key', e.target.value)}
                                    />
                                    <Input
                                        id={`env-value-${index}`}
                                        placeholder="VALUE"
                                        value={envVar.value}
                                        onChange={(e) => handleEnvVarChange(index, 'value', e.target.value)}
                                    />
                                    <button
                                        onClick={() => handleRemoveEnvVar(index)}
                                        className="p-2 text-red-500 hover:text-red-700"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 space-y-4">
                            <Button onClick={handleAddEnvVar} variant="outline" className="w-full">
                                Add Variable
                            </Button>
                            <Button onClick={handleSaveEnv} className="w-full">
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
