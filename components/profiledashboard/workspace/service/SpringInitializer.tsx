'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Leaf, Search, X, Plus, Check } from 'lucide-react'
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {SpringProject, useCreateProjectMutation} from "@/redux/api/projectApi";

type Dependency = {
    id: string
    name: string
    description: string
    category: string
}

const dependencies: Dependency[] = [
    {
        id: 'web',
        name: 'Spring Web',
        description: 'Build web, including RESTful, applications using Spring MVC',
        category: 'Web'
    },
    {
        id: 'data-jpa',
        name: 'Spring Data JPA',
        description: 'Persist data in SQL stores with Java Persistence API using Spring Data and Hibernate',
        category: 'SQL'
    },
    {
        id: 'security',
        name: 'Spring Security',
        description: 'Highly customizable authentication and access-control framework',
        category: 'Security'
    },
    {
        id: 'devtools',
        name: 'Spring Boot DevTools',
        description: 'Provides fast application restarts, LiveReload, and configurations for enhanced development experience',
        category: 'Developer Tools'
    },
    {
        id: 'actuator',
        name: 'Spring Boot Actuator',
        description: 'Supports built in (or custom) endpoints that let you monitor and manage your application',
        category: 'Ops'
    },
    {
        id: 'websocket',
        name: 'WebSocket',
        description: 'Build WebSocket applications with SockJS and STOMP',
        category: 'Web'
    },
    { id: 'validation', name: 'Validation', description: 'Bean Validation with Hibernate validator', category: 'Web' },
    { id: 'mongodb', name: 'MongoDB', description: 'Store data in flexible, JSON-like documents', category: 'NoSQL' },
    { id: 'redis', name: 'Redis', description: 'Advanced key-value store', category: 'NoSQL' },
    {
        id: 'postgresql',
        name: 'PostgreSQL Driver',
        description: 'A JDBC and R2DBC driver that allows Java programs to connect to a PostgreSQL database',
        category: 'SQL'
    },
]

const projectTypes = [
    { value: 'maven', label: 'Maven Project' },
    { value: 'gradle', label: 'Gradle Project' },
    { value: 'ant', label: 'Ant Project' },
]

type SpringInitializerProps = {
    isOpen: boolean
    onClose: () => void
    folder: string
}

export function SpringInitializer({ isOpen, onClose,folder }: SpringInitializerProps) {
    const [projectName, setProjectName] = useState('demo')
    const [groupId, setGroupId] = useState('com.example')
    const [selectedDependencies, setSelectedDependencies] = useState<Dependency[]>([])
    const [selectedProjectTypes, setSelectedProjectTypes] = useState<string[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [creatProject] = useCreateProjectMutation();
    const [openProjectTypes, setOpenProjectTypes] = useState(false)

    const filteredDependencies = dependencies.filter(dep =>
        dep.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dep.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dep.category.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const groupedDependencies = filteredDependencies.reduce((acc, dep) => {
        if (!acc[dep.category]) {
            acc[dep.category] = []
        }
        acc[dep.category].push(dep)
        return acc
    }, {} as Record<string, Dependency[]>)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault()
                setIsModalOpen(true)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()


        try {
            const result = creatProject({
                name:projectName,
                group:groupId,
                folder:folder,
                dependencies:selectedDependencies.map(dep => dep.id)
            });
            console.log(result);
            onClose()
        }catch (e) {
            console.log(e);
        }


    }

    const toggleDependency = (dependency: Dependency) => {
        setSelectedDependencies(prev =>
            prev.some(d => d.id === dependency.id)
                ? prev.filter(d => d.id !== dependency.id)
                : [...prev, dependency]
        )
    }

    const toggleProjectType = (value: string) => {
        setSelectedProjectTypes(prev =>
            prev.includes(value)
                ? prev.filter(type => type !== value)
                : [...prev, value]
        )
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0">
                <VisuallyHidden>
                    <DialogTitle>Spring Initializer</DialogTitle>
                </VisuallyHidden>
                <div className="flex flex-col min-h-[90vh]">
                    <header className="bg-gradient-to-r from-green-700 to-green-800 text-white py-6 px-6">
                        <div className="flex items-center gap-3">
                            <Leaf className="h-8 w-8" aria-hidden="true"/>
                            <div>
                                <h1 className="text-2xl font-bold">Spring Initializer</h1>
                                <p className="text-green-100 text-sm">Bootstrap your application</p>
                            </div>
                        </div>
                    </header>

                    <main className="flex-grow px-6 py-8 overflow-auto">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-md">
                                <div>
                                    <Label htmlFor="projectName">Project Name</Label>
                                    <Input
                                        id="projectName"
                                        value={projectName}
                                        onChange={(e) => setProjectName(e.target.value)}
                                        placeholder="demo"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="groupId">Group</Label>
                                    <Input
                                        id="groupId"
                                        value={groupId}
                                        onChange={(e) => setGroupId(e.target.value)}
                                        placeholder="com.example"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <Label>Project Type</Label>
                                    <Popover open={openProjectTypes} onOpenChange={setOpenProjectTypes}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={openProjectTypes}
                                                className="w-full justify-between"
                                            >
                                                {selectedProjectTypes.length > 0
                                                    ? `${selectedProjectTypes.length} selected`
                                                    : "Select project types..."}
                                                <Check className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0">
                                            <Command>
                                                <CommandInput placeholder="Search project types..." className="h-9" />
                                                <CommandEmpty>No project type found.</CommandEmpty>
                                                <CommandGroup>
                                                    {projectTypes.map((type) => (
                                                        <CommandItem
                                                            key={type.value}
                                                            onSelect={() => toggleProjectType(type.value)}
                                                        >
                                                            {type.label}
                                                            <Check
                                                                className={`ml-auto h-4 w-4 ${
                                                                    selectedProjectTypes.includes(type.value) ? "opacity-100" : "opacity-0"
                                                                }`}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <div className="flex items-center justify-between mb-4">
                                    <Label className="text-lg font-semibold">Dependencies</Label>
                                    <Button
                                        type="button"
                                        onClick={() => setIsModalOpen(true)}
                                        className="bg-black hover:bg-gray-800 text-white"
                                    >
                                        ADD DEPENDENCIES
                                    </Button>
                                </div>

                                {selectedDependencies.length === 0 ? (
                                    <p className="text-gray-500 italic">No dependency selected</p>
                                ) : (
                                    <div className="flex flex-wrap gap-2">
                                        {selectedDependencies.map((dep) => (
                                            <Badge
                                                key={dep.id}
                                                variant="secondary"
                                                className="flex items-center gap-1 px-3 py-1"
                                            >
                                                {dep.name}
                                                <button
                                                    type="button"
                                                    onClick={() => toggleDependency(dep)}
                                                    className="ml-1 hover:text-red-500"
                                                    aria-label={`Remove ${dep.name} dependency`}
                                                >
                                                    <X className="h-3 w-3" aria-hidden="true"/>
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <Button type="submit" className="w-full bg-green-700 hover:bg-green-800">
                                Generate Project
                            </Button>
                        </form>
                    </main>
                </div>

                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <Leaf className="h-5 w-5 text-green-600" aria-hidden="true"/>
                                Add Dependencies
                            </DialogTitle>
                        </DialogHeader>

                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" aria-hidden="true"/>
                            <Input
                                placeholder="Search dependencies..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9"
                            />
                        </div>

                        <ScrollArea className="flex-1 mt-4">
                            <div className="space-y-6">
                                {Object.entries(groupedDependencies).map(([category, deps]) => (
                                    <div key={category}>
                                        <h3 className="font-semibold text-sm text-gray-500 mb-2">{category}</h3>
                                        <div className="space-y-2">
                                            {deps.map((dep) => {
                                                const isSelected = selectedDependencies.some(d => d.id === dep.id)
                                                return (
                                                    <button
                                                        key={dep.id}
                                                        onClick={() => toggleDependency(dep)}
                                                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                                                            isSelected
                                                                ? 'border-green-500 bg-green-50'
                                                                : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                        type="button"
                                                        aria-pressed={isSelected}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-medium">{dep.name}</span>
                                                            <Plus
                                                                className={`h-4 w-4 ${
                                                                    isSelected ? 'text-green-500 rotate-45' : 'text-gray-400'
                                                                }`}
                                                                aria-hidden="true"
                                                            />
                                                        </div>
                                                        <p className="text-sm text-gray-500 mt-1">{dep.description}</p>
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
            </DialogContent>
        </Dialog>
    )
}

