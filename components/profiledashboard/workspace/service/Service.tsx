import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { PlusCircle, User2, ChevronDown, Search } from 'lucide-react'

interface Project {
    name: string
    description: string
    url: string
    timeAgo: string
    services: string[]
    subWorkspaces: string[]
    status: string
}

const projects: Project[] = [
    {
        name: "E-commerce Platform",
        description: "Descript about workspace",
        url: "https://ecommerce.example.com",
        timeAgo: "2 hours ago",
        services: ["Frontend", "Backend", "Database"],
        subWorkspaces: ["Production", "Development"],
        status: "Production"
    },
    {
        name: "Cloudinator API",
        description: "Descript about workspace",
        url: "https://ecommerce.example.com",
        timeAgo: "4 days ago",
        services: ["Backend"],
        subWorkspaces: [],
        status: "Production"
    },
    {
        name: "Cloudinator DB",
        description: "Descript about workspace",
        url: "https://ecommerce.example.com",
        timeAgo: "2 min ago",
        services: ["Database"],
        subWorkspaces: [],
        status: "Production"
    },
    {
        name: "Portfolio Website",
        description: "Descript about workspace",
        url: "https://ecommerce.example.com",
        timeAgo: "3 day ago",
        services: ["Frontend"],
        subWorkspaces: [],
        status: "Production"
    }
]

export default function Service() {
    return (
        <div className="container mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Workspace Projects</h1>
                <Button className="bg-purple-600 hover:bg-purple-700">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Workspace
                </Button>
            </div>

            <div className="flex items-center gap-4 mb-6">
                <Select defaultValue="personal">
                    <SelectTrigger className="w-[200px]">
                        <User2 className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Select Workspace" />
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="personal">Personal Workspace</SelectItem>
                        <SelectItem value="team">Team Workspace</SelectItem>
                    </SelectContent>
                </Select>

                <Select defaultValue="filter">
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filter project" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="filter">Filter project</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                </Select>

                <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search projects..." className="pl-8" />
                </div>
            </div>

            <Tabs defaultValue="frontend" className="mb-6">
                <TabsList>
                    <TabsTrigger value="frontend" className="data-[state=active]:bg-purple-600">
                        Frontend
                    </TabsTrigger>
                    <TabsTrigger value="backend">Backend</TabsTrigger>
                    <TabsTrigger value="database">Database</TabsTrigger>
                    <TabsTrigger value="subworkspace">SubWorkspace</TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">{project.name}</h2>
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    {project.status}
                                </Badge>
                            </div>
                            <p className="text-muted-foreground">{project.description}</p>
                            <a href={project.url} className="text-blue-600 hover:underline text-sm">
                                {project.url}
                            </a>
                            <p className="text-sm text-muted-foreground">{project.timeAgo}</p>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <h3 className="text-sm font-medium mb-2">Services</h3>
                                <div className="flex gap-2">
                                    {project.services.map((service, i) => (
                                        <Badge
                                            key={i}
                                            variant="secondary"
                                            className={
                                                service === "Frontend"
                                                    ? "bg-purple-100 text-purple-700"
                                                    : service === "Backend"
                                                        ? "bg-pink-100 text-pink-700"
                                                        : "bg-orange-100 text-orange-700"
                                            }
                                        >
                                            {service}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            {project.subWorkspaces.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-medium mb-2">Sub-workspaces</h3>
                                    <div className="flex gap-2">
                                        {project.subWorkspaces.map((workspace, i) => (
                                            <Badge key={i} variant="outline">
                                                {workspace}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="link" className="text-purple-600">
                                Environment Variables
                            </Button>
                            <Button className="bg-purple-600 hover:bg-purple-700">Deploy</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

