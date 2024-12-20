'use client'
import {useEffect, useState} from "react";
import {
    Activity,
    AlertCircle, BarChart,
    CheckCircle,
    ChevronRight, Clock,
    Code,
    GitBranch,
    Package,
    Settings,
    XCircle
} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";
import {useGetBuildNumberInFolderQuery, useGetProjectByNameQuery} from "@/redux/api/projectApi";

import Link from "next/link";


export type PropsParams = {
    params: Promise<{ jobName: string }>;
};


type BuildHistory = {
    status: string;
    buildNumber:number
};

const ProjectDetailPage = (props: PropsParams) =>{
    const [params, setParams] = useState<{ jobName: string } | null>(null);

    const jobName = params?.jobName + '-pipeline'

    console.log(jobName)

    const {data:projects} = useGetProjectByNameQuery({
        name:params?.jobName || ''
    })

    const {data:buildNumber} = useGetBuildNumberInFolderQuery({
        folder: projects?.namespace ?? '' ,
        name : jobName ?? ''
    });



    useEffect(() => {
        props.params.then(setParams);
    }, [props.params]);

    useEffect(() => {
        if (params) {
            console.log(params.jobName);
        }
    }, [params]);



    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case 'success':
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'failure':
                return <XCircle className="h-5 w-5 text-red-500" />;
            case 'in-progress':
                return <AlertCircle className="h-5 w-5 text-yellow-500" />;
            default:
                return <AlertCircle className="h-5 w-5 text-gray-500" />;
        }
    };

    console.log(buildNumber)


    if (!projects) return null;

    return(
        <div className="container mx-auto py-10 px-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
                <Link href={'/workspace'}>Workspace</Link>
                <ChevronRight className="h-4 w-4"/>
                <Link href={`/workspace/sub-workspace/${projects.namespace}`}>{projects.namespace}</Link>
                <ChevronRight className="h-4 w-4"/>
                <span className="font-medium text-foreground">{projects.name}</span>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">{projects.name}</CardTitle>
                        {/*<CardDescription className="text-lg">{projects.description}</CardDescription>*/}
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="flex items-center">
                                <Code className="h-5 w-5 mr-2 text-blue-500"/>
                                <span className="text-sm font-medium">Namespace:</span>
                                <span className="ml-2 text-sm bg-gray-100 px-2 py-1 rounded">{projects.namespace}</span>
                            </div>
                            <div className="flex items-center">
                                <GitBranch className="h-5 w-5 mr-2 text-green-500"/>
                                <span className="text-sm font-medium">Branch:</span>
                                <span className="ml-2 text-sm bg-gray-100 px-2 py-1 rounded">{projects.branch}</span>
                            </div>
                            <div className="flex items-center">
                                <Package className="h-5 w-5 mr-2 text-purple-500"/>
                                <span className="text-sm font-medium">Git:</span>
                                <a href={projects.git} target="_blank" rel="noopener noreferrer"
                                   className="ml-2 text-sm text-blue-500 hover:underline truncate">{projects.git}</a>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <Button className="w-full bg-blue-500 hover:bg-blue-600">
                            <Settings className="mr-2 h-4 w-4"/> Configure Project
                        </Button>
                        <Button className="w-full bg-green-500 hover:bg-green-600">
                            <Activity className="mr-2 h-4 w-4"/> View Logs
                        </Button>
                        <Button className="w-full bg-purple-500 hover:bg-purple-600">
                            <BarChart className="mr-2 h-4 w-4"/> Performance Metrics
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="dependencies" className="mt-8">
                <TabsList className="grid w-full grid-cols-2 rounded-xl bg-muted p-1">
                    <TabsTrigger value="dependencies" className="rounded-lg transition-all">Dependencies</TabsTrigger>
                    <TabsTrigger value="build-history" className="rounded-lg transition-all">Build History</TabsTrigger>
                </TabsList>
                <TabsContent value="dependencies">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl font-semibold">Project Dependencies</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Version</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {/*{project.dependencies.map((dep: Dependency) => (*/}
                                    {/*    <TableRow key={dep.name}>*/}
                                    {/*        <TableCell className="font-medium">{dep.name}</TableCell>*/}
                                    {/*        <TableCell>*/}
                                    {/*            <Badge variant="secondary">{dep.version}</Badge>*/}
                                    {/*        </TableCell>*/}
                                    {/*    </TableRow>*/}
                                    {/*))}*/}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="build-history">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl font-semibold">Build History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Project Name</TableHead>
                                        <TableHead>Build Number</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Report</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Array.isArray(buildNumber) && buildNumber.map((build: BuildHistory) => (
                                        <TableRow key={build.buildNumber}>
                                            <TableCell>{params?.jobName}</TableCell>
                                            <TableCell>{build.buildNumber}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    {getStatusIcon(build.status)}
                                                    <Badge
                                                        variant={build.status.toLowerCase() === 'success' ? 'default' : build.status.toLowerCase() === 'failure' ? 'destructive' : 'secondary'}
                                                        className="ml-2"
                                                    >
                                                        {build.status}
                                                    </Badge>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <Clock className="h-4 w-4 mr-2 text-muted-foreground"/>
                                                    <Link href={`/workspace/sub-workspace/${projects.namespace}/${params?.jobName}/${build?.buildNumber}`}>
                                                        view log
                                                    </Link>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default ProjectDetailPage;