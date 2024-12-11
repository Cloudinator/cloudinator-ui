'use client'

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {Rocket, RotateCcw, StopCircle, ExternalLink, CheckCircle, Github, Code} from 'lucide-react'
import {useGetBuildInfoByNameQuery, useGetServiceByNameQuery} from "@/redux/api/projectApi";

import WebsitePreview from "@/components/profiledashboard/deployment/WebsitePreview";
import Link from "next/link";

export type PropsParams = {
    params: Promise<{ name: string }>;
};

export default function ProjectDetailPage(props: PropsParams) {
    const [params, setParams] = useState<{ name: string } | null>(null);

    useEffect(() => {
        props.params.then(setParams);
    }, [props.params]);

    useEffect(() => {
        if (params) {
            console.log(params.name);
        }
    }, [params]);

    const {data} = useGetServiceByNameQuery({name: params?.name || ''})

    const {data:builds} = useGetBuildInfoByNameQuery({name: params?.name || ''})

    console.log(builds);

    const project = data;

    console.log(data);

    if (!params || !project || !builds) {
        return null;
    }

    const url = `https://${project.subdomain}.psa-khmer.world`;



    return (
        <div className="container mx-auto px-4 py-6 max-w-6xl">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">{project.name}</h1>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-green-500 border-green-500">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                {/*{project.status}*/}
                            </Badge>
                            {/*{project.technologies.map((tech, index) => (*/}
                            {/*    <Badge key={index} variant="secondary">{tech}</Badge>*/}
                            {/*))}*/}
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
                        <Button className="flex items-center gap-2">
                            <Rocket className="w-4 h-4" />
                            Deploy
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                            <RotateCcw className="w-4 h-4" />
                            Rollback
                        </Button>
                        <Button variant="destructive" className="flex items-center gap-2">
                            <StopCircle className="w-4 h-4" />
                            Stop
                        </Button>
                        <Button variant="secondary" className="flex items-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            Visit Site
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="overview" className="mt-6">
                    <TabsList className="mb-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="builds">Build History</TabsTrigger>
                        <TabsTrigger value="logs">Build Logs</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Project Details</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <dl className="space-y-2">
                                        <div>
                                            <dt className="font-semibold">Status</dt>
                                            {/*<dd>{project.status}</dd>*/}
                                        </div>
                                        <div>
                                            <dt className="font-semibold">Last Deployed</dt>
                                            {/*<dd>{project.lastDeployed || 'N/A'}</dd>*/}
                                        </div>
                                        <div>
                                            <dt className="font-semibold">Environment</dt>
                                            {/*<dd>{project.environment || 'Production'}</dd>*/}
                                        </div>
                                        <div>
                                            <dt className="font-semibold">Latest Build</dt>
                                            {/*<dd>{project.builds[0]?.timestamp || 'N/A'}</dd>*/}
                                        </div>
                                        <div>
                                            <dt className="font-semibold">URL</dt>
                                            <dd>
                                                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                    {url}
                                                </a>
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="font-semibold">Repository</dt>
                                            <dd>
                                                <a href={project.gitUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
                                                    <Github className="w-4 h-4" />
                                                    {project.gitUrl.split('/').slice(-2).join('/')}
                                                </a>
                                            </dd>
                                        </div>
                                    </dl>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Project Preview</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <WebsitePreview url={url}/>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                    <TabsContent value="builds">
                        <Card>
                            <CardHeader>
                                <CardTitle>Build History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4">
                                    {builds?.map((build) => (
                                        <li key={build.buildNumber} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-4">
                                                <Badge variant={build.status === "SUCCESS" ? "success" : "destructive"}>
                                                    {build.status}
                                                </Badge>
                                                <span className="text-sm text-gray-500">{params.name}</span>
                                            </div>
                                            <Button variant="ghost" size="sm" className="flex items-center gap-2">
                                                <Code className="w-4 h-4" />
                                                <Link href={`/workspace/${params.name}/${build.buildNumber}`}>
                                                    View Details
                                                </Link>
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="logs">
                        <Card>
                            <CardHeader>
                                <CardTitle>Build Logs</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                  {/*<pre className="text-sm">*/}
                  {/*  {project.currentBuildLog}*/}
                  {/*</pre>*/}
                                </ScrollArea>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}