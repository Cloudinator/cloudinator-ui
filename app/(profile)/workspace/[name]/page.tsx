'use client'

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Rocket, RotateCcw, StopCircle, ExternalLink, CheckCircle, Github, Code, Loader2 } from 'lucide-react'
import {
    BuildNumber,
    useBuildServiceMutation,
    useGetBuildInfoByNameQuery,
    useGetServiceByNameQuery,
    useStartServiceDeploymentMutation,
    useStopServiceDeploymentMutation
} from "@/redux/api/projectApi"
import WebsitePreview from "@/components/profiledashboard/deployment/WebsitePreview"
import Link from "next/link"
import RollbackModal from "@/components/profiledashboard/workspace/RollbackModal";
import {StreamingLog} from "@/components/profiledashboard/workspace/StreamingLog";
import Loading from '@/components/Loading'


export type PropsParams = {
    params: Promise<{ name: string }>
}

export default function ProjectDetailPage({ params }: PropsParams) {
    const [projectName, setProjectName] = useState<string>('')
    const [buildNumber, setBuildNumber] = useState<BuildNumber[]>([])
    const [isRollbackModalOpen, setIsRollbackModalOpen] = useState(false)

    const [buildService] = useBuildServiceMutation()
    const [stopServiceDeployment] = useStopServiceDeploymentMutation()
    const [startServiceDeployment] = useStartServiceDeploymentMutation()

    const { data: projects, refetch, isLoading: isProjectsLoading } = useGetServiceByNameQuery(
        { name: projectName },
        {
            skip: !projectName,
            refetchOnMountOrArgChange: true
        }
    )

    const { data: builds, isLoading: isBuildsLoading } = useGetBuildInfoByNameQuery(
        { name: projectName },
        {
            skip: !projectName,
            refetchOnMountOrArgChange: true
        }
    )

    useEffect(() => {
        params.then(({ name }) => setProjectName(name))
    }, [params])

    useEffect(() => {
        if (Array.isArray(builds)) {
            setBuildNumber(builds)
        }
    }, [builds]);

    const handleBuildService = async () => {
        const newBuild = {
            buildNumber: buildNumber.length + 1,
            status: "BUILDING"
        };

        setBuildNumber(prevBuilds => [newBuild, ...prevBuilds]);

        try {
            const result = await buildService({ name: projectName }).unwrap();
            setBuildNumber(prevBuilds =>
                prevBuilds.map(build =>
                    build.buildNumber === newBuild.buildNumber
                        ? { ...build, status: typeof result.status === 'string' ? result.status : "BUILDING" }
                        : build
                )
            );
        } catch (error) {
            console.error('Failed to initiate service build:', error);
        }
    }

    const handleStopService = async () => {
        try {
           const result = await stopServiceDeployment({ name: projectName }).unwrap()

            console.log(result)

        } catch (error) {
            console.log('Failed to stop service:', error)
            refetch();
        }
    }

    const handleRestartService = async () => {
        try {
            await startServiceDeployment({ name: projectName }).unwrap()
        } catch (error) {
            console.log('Failed to restart service:', error)
            refetch();
        }
    }

    const handleRollback = async (version: number) => {
        try {
            console.log(`Rolling back to version ${version}`);
            // Implement your rollback logic here
            // await rollbackService({ name: projectName, version });
            // After successful rollback, you may want to refresh the build history
            // await refetch();
        } catch (error) {
            console.error('Failed to rollback:', error);
        }
    };

    const successfulBuilds = buildNumber.filter(build => build.status === "SUCCESS");

    if (isProjectsLoading || isBuildsLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                    <p className="text-sm text-gray-500"><Loading /></p>
                </div>
            </div>
        );
    }

    if (!projectName || !projects || !builds) {
        return null
    }

    const url = `https://${projects.subdomain}.cloudinator.cloud`

    return (
        <div className="px-12 py-6 w-full ">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    {/* Header section */}
                    <div className="flex items-center gap-8">
                        <h1 className="text-3xl font-bold text-purple-500">{projects.name}</h1>
                        <Badge variant="outline" className="text-green-500 border-green-500">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            {projects.status ? 'Running' : 'Stopped'}
                        </Badge>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
                        <Button onClick={handleBuildService} className="flex items-center gap-2 bg-purple-500 hover:bg-purple-700 text-white focus:ring-2 focus:ring-purple-700 focus:ring-offset-2">
                            <Rocket className="w-4 h-4" />
                            Deploy
                        </Button>
                        <Button
                            onClick={() => setIsRollbackModalOpen(true)}
                            variant="outline"
                            className="flex items-center gap-2"
                            disabled={successfulBuilds.length === 0}
                        >
                            <RotateCcw className="w-4 h-4" />
                            Rollback
                        </Button>
                        {projects.status ? (
                            <Button onClick={handleStopService} variant="destructive" className="flex items-center gap-2">
                                <StopCircle className="w-4 h-4" />
                                Stop
                            </Button>
                        ) : (
                            <Button onClick={handleRestartService} className="flex items-center gap-2">
                                <Rocket className="w-4 h-4" />
                                Start
                            </Button>
                        )}
                        <Button variant="secondary" className="flex items-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            <a href={url} target="_blank" rel="noopener noreferrer">Visit Site</a>
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
                                            <dd>{projects.status ? 'Running' : 'Stopped'}</dd>
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
                                                <a href={projects.gitUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
                                                    <Github className="w-4 h-4" />
                                                    {projects.gitUrl.split('/').slice(-2).join('/')}
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
                                    <WebsitePreview url={url} />
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
                                    {buildNumber.map((build: BuildNumber) => (
                                        <li key={build.buildNumber} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-4">
                                                <Badge variant={build.status === "SUCCESS" ? "outline" : build.status === "BUILDING" ? "secondary" : "destructive"}>
                                                    {build.status}
                                                </Badge>
                                                <span className="text-sm text-gray-500">{projectName}</span>
                                            </div>
                                            <Button variant="ghost" size="sm" className="flex items-center gap-2">
                                                <Code className="w-4 h-4" />
                                                <Link href={`/workspace/${projectName}/${build.buildNumber}`}>
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
                                {buildNumber.length > 0 && (
                                    <StreamingLog name={projectName} buildNumber={buildNumber[0].buildNumber} />
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
            <RollbackModal
                isOpen={isRollbackModalOpen}
                onClose={() => setIsRollbackModalOpen(false)}
                onRollback={handleRollback}
                builds={successfulBuilds}
            />
        </div>
    )
}

