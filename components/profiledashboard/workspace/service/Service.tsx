'use client'

import React, {useState, useEffect, lazy, Suspense} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
} from "@/components/ui/dialog"
import {ArrowLeft, Database, Layout, MoreVertical, Server, Share2, User2, Plus, Search} from 'lucide-react'
import Link from "next/link"
import {motion, AnimatePresence} from "framer-motion"
import {useGetServiceDeploymentQuery, useGetWorkspacesQuery} from "@/redux/api/projectApi";

const CreateProjectContent = lazy(() => import('@/components/profiledashboard/workspace/CreateProjectContent'))




type ServiceType = {
    name: string
    gitUrl: string
    branch: string
    subdomain: string
    type: 'frontend' | 'backend' | 'database' | 'subworkspace'
}


function getServiceIcon(type: ServiceType['type']) {
    switch (type) {
        case 'frontend':
            return <Layout className="w-5 h-5 text-purple-600"/>
        case 'backend':
            return <Server className="w-5 h-5 text-pink-600"/>
        case 'database':
            return <Database className="w-5 h-5 text-orange-600"/>
        case 'subworkspace':
            return <Share2 className="w-5 h-5 text-blue-600"/>
    }
}



export default function Service() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredServices, setFilteredServices] = useState<ServiceType[]>([])
    const [selectedType, setSelectedType] = useState<ServiceType['type'] | 'all'>('all')



    const {data} = useGetWorkspacesQuery();



    const workspaces = data;

    const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces && workspaces.length > 0 ? workspaces[0].name : "");



    const {data: servicesData} = useGetServiceDeploymentQuery({
        workspaceName: selectedWorkspace,
        size: 10,
        page: 0
    }) as { data: ServiceType[] };

    console.log('servicesData:', servicesData)



    useEffect(() => {
        if (servicesData) {
            const filtered = servicesData?.results?.filter((service: ServiceType) =>
                service.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (selectedType === 'all' || service.type === selectedType)
            )
            setFilteredServices(filtered)
        }
    }, [searchTerm, selectedType, servicesData])




    if (!data) return null

    return (
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
                className="flex flex-col sm:flex-row items-center justify-between pb-6 space-y-4 sm:space-y-0"
            >
                <div className="flex items-center space-x-2">
                    <Link href="/workspace">
                        <ArrowLeft className="h-8 w-8 text-purple-500"/>
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-purple-500">
                        Workspace
                    </h1>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-purple-500 hover:bg-purple-600 text-lg px-6 py-3">
                            <Plus className="mr-2 h-5 w-5"/>
                            Create Project
                        </Button>
                    </DialogTrigger>
                    <DialogContent
                        className="p-0 bg-white dark:bg-gray-950 max-w-[90vw] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] w-full h-[90vh] sm:h-auto">
                        <DialogTitle className="sr-only">Create New Project</DialogTitle>
                        <Suspense fallback={
                            <div className="flex items-center justify-center h-64">
                                <motion.div
                                    animate={{rotate: 360}}
                                    transition={{duration: 1, repeat: Infinity, ease: "linear"}}
                                >
                                    <Database className="w-12 h-12 text-purple-500"/>
                                </motion.div>
                            </div>
                        }>
                            <CreateProjectContent onClose={() => setIsDialogOpen(false)} selectedWorkspace={selectedWorkspace}/>
                        </Suspense>
                    </DialogContent>
                </Dialog>
            </motion.div>

            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5, delay: 0.2}}
                className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-md"
            >
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                    <Select
                        defaultValue={selectedWorkspace}
                        onValueChange={(value) => {
                            console.log(`Workspace changed to: ${value}`);
                            setSelectedWorkspace(value);
                        }}
                    >
                        <SelectTrigger className="w-full sm:w-[200px]">
                            <User2 className="mr-2 h-4 w-4"/>
                            <SelectValue placeholder="Select Workspace"/>
                        </SelectTrigger>
                        <SelectContent>
                            {workspaces && workspaces.map(workspace => (
                                <SelectItem key={workspace.uuid} value={workspace.name}>
                                    {workspace.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div className="relative w-full sm:w-auto flex-grow">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                        <Input
                            type="text"
                            placeholder="Search projects..."
                            className="pl-10 w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Filter By:</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                    {(['all', 'frontend', 'backend', 'database', 'subworkspace'] as const).map((type) => (
                        <Button
                            key={type}
                            variant={selectedType === type ? "default" : "outline"}
                            className={`bg-white dark:bg-gray-800 capitalize ${selectedType === type ? 'ring-2 ring-purple-500' : ''}`}
                            onClick={() => setSelectedType(type)}
                        >
                            {type !== 'all' && getServiceIcon(type)}
                            <span className="ml-2">{type}</span>
                        </Button>
                    ))}
                </div>
            </motion.div>

            <AnimatePresence>
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6"
                >
                    {filteredServices.map((service, index) => (
                        <motion.div
                            key={service.name}
                            initial={{opacity: 0, scale: 0.9}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.9}}
                            transition={{duration: 0.3, delay: index * 0.1}}
                        >
                            <Link href={`/workspace/${service.name}`}>
                                <div
                                    className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 hover:shadow-lg transition-all duration-300 h-full">
                                    <div className="flex items-center gap-3">
                                        {getServiceIcon(service.type)}
                                        <div>
                                            <h3 className="font-medium">{service.name}</h3>
                                            {/*<p className="text-sm text-gray-500 dark:text-gray-400">{service2.timeAgo}</p>*/}
                                        </div>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreVertical className="h-4 w-4"/>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Share</DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

