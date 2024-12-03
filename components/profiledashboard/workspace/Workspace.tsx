// pages/workspace/index.js or wherever your Workspace component is located
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { MoreVertical, Plus, Search, Terminal } from 'lucide-react'
import Link from 'next/link' // Import Link for navigation

export default function Workspace() {
    const projects = [
        {
            id: 1,
            title: "Website Redesign",
            timestamp: "Updated 10 mins ago",
            progress: 40,
        },
        {
            id: 2,
            title: "API Development",
            timestamp: "Updated 30 mins ago",
            progress: 70,
        },
        {
            id: 3,
            title: "Mobile App Launch",
            timestamp: "Updated 1 hour ago",
            progress: 85,
        },
        {
            id: 4,
            title: "Database Migration",
            timestamp: "Updated 15 mins ago",
            progress: 60,
        },
        {
            id: 5,
            title: "User Feedback Implementation",
            timestamp: "Updated 5 mins ago",
            progress: 20,
        },
        {
            id: 6,
            title: "Performance Optimization",
            timestamp: "Updated 2 hours ago",
            progress: 90,
        },
        {
            id: 7,
            title: "Security Audit",
            timestamp: "Updated 45 mins ago",
            progress: 50,
        },
        {
            id: 8,
            title: "New Feature Development",
            timestamp: "Updated 3 hours ago",
            progress: 75,
        },
        {
            id: 9,
            title: "Documentation Update",
            timestamp: "Updated 20 mins ago",
            progress: 30,
        },
    ];

    return (
        <div className="container mx-auto py-6 px-8">
            <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Terminal className="w-8 h-8 text-purple-500"/>
                    <h1 className="text-2xl font-semibold text-purple-500">Workspace</h1>
                </div>
                <Button className="bg-purple-500">
                    <Plus className="mr-2 h-4 w-4"/>
                    New Workspace
                </Button>
            </div>

            <div className="mb-6 flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search workspaces..." className="pl-8" />
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <Link key={project.id} href={`/workspace/${project.id}`}>
                        <Card className="cursor-pointer hover:bg-gray-100 transition duration-200">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div className="flex items-center space-x-2">
                                    <div className="h-8 w-8 rounded-full bg-gray-100" />
                                    <div>
                                        <h3 className="font-medium">{project.title}</h3>
                                        <p className="text-sm text-muted-foreground">{project.timestamp}</p>
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreVertical className="h-4 w-4" />
                                            <span className="sr-only">Open menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>View details</DropdownMenuItem>
                                        <DropdownMenuItem>Edit workspace</DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive">Delete workspace</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <Progress value={project.progress} className="h-2" />
                                    <span className="ml-2 text-sm text-muted-foreground">{project.progress}%</span>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}