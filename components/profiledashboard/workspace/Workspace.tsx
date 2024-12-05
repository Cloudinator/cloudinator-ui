import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {ChevronDown, Filter, Terminal} from 'lucide-react'
import { ProjectCard } from "@/components/profiledashboard/workspace/ProjectCard";

const projects = Array(12).fill({
    name: "Voluminous Luisa",
    updatedAt: "26 minutes ago",
    progress: 75,
    tag: "frontend",
    teamSize: 3,
})

export default function Workspace() {
    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">

                <div className="flex items-center space-x-2">
                    <Terminal className="h-8 w-8 text-purple-500"/>
                    <h1 className="text-3xl font-bold tracking-tight text-purple-500">
                        Workspace
                    </h1>
                </div>

                <Button className="bg-purple-500 text-white hover:bg-purple-400">
                    <span className="mr-2">+</span>
                    Add Workspace
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <Button variant="outline"
                        className="flex items-center gap-2 border-purple-500 text-purple-500 hover:bg-purple-100">
                    <span>Personal Workspace</span>
                    <ChevronDown className="h-4 w-4" />
                </Button>

                <Button variant="outline" className="flex items-center gap-2 border-purple-500 text-purple-500 hover:bg-purple-100">
                    <Filter className="h-4 w-4" />
                    <span>Filter project</span>
                </Button>

                <div className="flex-1">
                    <Input
                        type="text"
                        placeholder="Search projects..."
                        className="w-full border-purple-500 focus:border-purple-500 focus:ring focus:ring-purple-200"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </div>
        </div>
    )
}