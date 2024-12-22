"use client"

import { useEffect, useState } from "react"
import { ChevronRight, Plus, FileText, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import ERDDiagram from "@/components/profiledashboard/workspace/service/ERDDiagram"
import { SpringInitializer } from "@/components/profiledashboard/workspace/service/SpringInitializer"
import {
    useBuildSpringServiceMutation,
    useGetBuildNumberInFolderQuery,
    useGetProjectsQuery
} from "@/redux/api/projectApi"
import Link from "next/link";

export type PropsParams = {
    params: Promise<{ name: string }>;
};

type SpringProjectType = {
    uuid: string;
    name: string;
    folder: string;
    group: string;
    dependencies: string[];
    branch: string;
    namespace: string;
    git: string;
}

type SpringProjectResponse = {
    next: boolean;
    previous: boolean;
    total: number;
    totalElements: number;
    results: SpringProjectType[];
};

type BuildHistoryItem = {
    buildNumber: number;
    status: 'BUILDING' | 'SUCCESS' | 'FAILURE';
};

export default function SubWorkspacePage(props: PropsParams) {
    const [params, setParams] = useState<{ name: string } | null>(null);
    const [isSpringInitializerOpen, setIsSpringInitializerOpen] = useState(false)
    const [selectedProjects, setSelectedProjects] = useState<string[]>([])
    const [isDeployDialogOpen, setIsDeployDialogOpen] = useState(false)
    const [buildSpringService] = useBuildSpringServiceMutation()

    useEffect(() => {
        props.params.then(setParams);
    }, [props.params]);

    useEffect(() => {
        if (params) {
            console.log(params.name);
        }
    }, [params]);

    const { data,refetch } = useGetProjectsQuery({
        subWorkspace: params?.name ?? '',
        page: 0,
        size: 10,
    }) as unknown as { data: SpringProjectResponse,refetch:()=>void };

    const springProjects = data?.results ?? [];

    const {data:buildNumber} = useGetBuildNumberInFolderQuery({
        folder: params?.name ?? '',
        name : params?.name ?? ''
    });


    const handleDeployProject = () => {
        console.log("Deploying projects:", selectedProjects)
        setIsDeployDialogOpen(false)
        // Implement deployment logic here
    }

    const handleBuildProject = () => {
        try {
            buildSpringService({
                folder: params?.name ?? '',
                name: params?.name ?? '',
                serviceName: selectedProjects
            });
            setIsDeployDialogOpen(false)
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div className="flex-1 space-y-6 p-8">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Link href={'/workspace'}>Workspace</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="font-medium text-foreground">{params?.name}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Spring Microservices</h1>
                    <p className="text-lg text-muted-foreground">Manage Spring microservice projects and their relationships</p>
                </div>
                <div className="flex space-x-2">
                    <Dialog open={isDeployDialogOpen} onOpenChange={setIsDeployDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Deploy/Build
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle className="text-2xl">Select Services</DialogTitle>
                                <DialogDescription>
                                    Choose the services you want to use
                                </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4">
                                <div className="p-4 border rounded-lg space-y-4">
                                    <div className="text-sm text-muted-foreground">Selected services:</div>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProjects.map((projectName) => {
                                            const project = springProjects.find(p => p.name === projectName)
                                            return project ? (
                                                <Badge
                                                    key={project.name}
                                                    variant="secondary"
                                                    className="bg-purple-100 text-purple-700 hover:bg-purple-200"
                                                >
                                                    {project.name}
                                                </Badge>
                                            ) : null
                                        })}
                                    </div>
                                </div>
                                <Collapsible className="mt-4">
                                    <CollapsibleTrigger
                                        className="flex w-full items-center justify-between rounded-lg border p-4 text-left text-sm font-medium hover:bg-gray-100">
                                        {selectedProjects.length} services selected
                                        <ChevronDown className="h-4 w-4"/>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="mt-2">
                                        <div className="rounded-lg border p-4 space-y-3">
                                            {springProjects.map((project) => (
                                                <div key={project.name} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={project.name}
                                                        checked={selectedProjects.includes(project.name)}
                                                        onCheckedChange={(checked) => {
                                                            setSelectedProjects(
                                                                checked
                                                                    ? [...selectedProjects, project.name]
                                                                    : selectedProjects.filter((name) => name !== project.name)
                                                            )
                                                        }}
                                                        className="border-purple-500 text-purple-500"
                                                    />
                                                    <label
                                                        htmlFor={project.name}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        {project.name}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>
                            </div>
                            <DialogFooter className="mt-6 space-x-2">
                                <Button onClick={handleBuildProject} variant="outline">Build</Button>
                                <Button
                                    onClick={handleDeployProject}
                                    className="bg-purple-600 hover:bg-purple-700"
                                >
                                    Deploy
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Button onClick={() => setIsSpringInitializerOpen(true)}>
                        <Plus className="mr-2 h-4 w-4"/>
                        Create Spring Project
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="spring-projects" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="spring-projects">Spring Projects</TabsTrigger>
                    <TabsTrigger value="erd">Project Relationships</TabsTrigger>
                    <TabsTrigger value="build-history">Build History</TabsTrigger>
                </TabsList>
                <TabsContent value="spring-projects" className="space-y-4">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {springProjects.map((project) => (
                                <Card key={project.uuid}>
                                    <Link href={`/workspace/sub-workspace/${params?.name}/${project.name}`}>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                {project.name}
                                            </CardTitle>
                                            <Avatar className="h-9 w-9">
                                                <AvatarFallback>{project.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Branch:</span>
                                                    <span>{project.branch}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Namespace:</span>
                                                    <span>{project.namespace}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Git:</span>
                                                    <span className="truncate max-w-[150px]">{project.git}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Link>
                                </Card>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="erd" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Microservices Relationship Diagram</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[600px] border rounded-md">
                                <ERDDiagram projects={springProjects} />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="build-history" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Build History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Project Name</TableHead>
                                        <TableHead>Build #</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Array.isArray(buildNumber) && buildNumber.map((build: BuildHistoryItem) => (
                                        <TableRow key={build.buildNumber}>
                                            <TableCell>{params?.name}</TableCell>
                                            <TableCell>{build.buildNumber}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={build.status === 'SUCCESS' ? 'default' : build.status === 'FAILURE' ? 'destructive' : 'secondary'}
                                                >
                                                    {build.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <FileText className="h-4 w-4 mr-2" />
                                                    <Link href={`/workspace/sub-workspace/${params?.name}/${params?.name}/${build?.buildNumber}`}>
                                                    View Log
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <SpringInitializer
                isOpen={isSpringInitializerOpen}
                onClose={() => setIsSpringInitializerOpen(false)}
                folder={params?.name ?? ''}
                springProjects={springProjects}
                refetch={refetch}
            />
        </div>
    )
}

