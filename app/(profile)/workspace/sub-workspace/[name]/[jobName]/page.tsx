"use client";

import { useEffect, useState } from "react";
import { Activity, AlertCircle, CheckCircle, Clock, Code, GitBranch, Loader2, Package, Rocket, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    useDeploySpringServiceMutation,
    useGetBuildNumberInFolderQuery,
    useGetProjectByNameQuery,
    useGetProjectsQuery
} from "@/redux/api/projectApi";

import Link from "next/link";
import { ConfigureProjectModal } from "@/components/profiledashboard/workspace/service/ConfigureProjectModal";
import { SpringProjectResponse } from "@/app/(profile)/workspace/sub-workspace/[name]/page";
import Breadcrumbs from "@/components/Breadcrumb2";
import { useToast } from "@/hooks/use-toast";

export type PropsParams = {
    params: Promise<{ jobName: string }>;
};

type BuildHistory = {
    status: string;
    buildNumber?: number;
};

interface ErrorResponse {
    status?: string;
    originalStatus?: number;
    data?: {
        message?: string;
    };
}

const ProjectDetailPage = (props: PropsParams) => {
    const [params, setParams] = useState<{ jobName: string } | null>(null);
    const [deploySpringService] = useDeploySpringServiceMutation();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false); // Add loading state

    const jobName = params?.jobName + '-pipeline';

    // Fetch project data
    const { data: projects, refetch: getdata } = useGetProjectByNameQuery({
        name: params?.jobName || ''
    });

    // Fetch build number data
    const { data: buildNumber, refetch: refetchBuildNumber } = useGetBuildNumberInFolderQuery({
        folder: projects?.namespace ?? '',
        name: jobName ?? ''
    }) as { data: BuildHistory[] | undefined, error: ErrorResponse, refetch: () => void };

    const { data } = useGetProjectsQuery({
        subWorkspace: projects?.namespace ?? '',
        page: 0,
        size: 10,
    }) as unknown as { data: SpringProjectResponse };

    const service = data?.results || [];

    useEffect(() => {
        props.params.then(setParams);
    }, [props.params]);

    useEffect(() => {
        if (params) {
            console.log(params.jobName);
        }
    }, [params]);

    const handleBuildService = async () => {
        setIsLoading(true); // Set loading to true when deployment starts
        try {
            const res = await deploySpringService({
                folder: projects?.namespace ?? "",
                name: jobName ?? "",
            }).unwrap(); // Use unwrap() to handle potential parsing errors

            // Show success toast
            toast({
                title: "Success",
                description: "Service deployed successfully.",
                variant: "success",
                duration: 3000,
            });

            console.log("Deployment result:", res);
        } catch (err) {
            const error = err as ErrorResponse;

            console.log("Failed to deploy service:", error);

            // Handle parsing error or other errors
            if (error?.status === "PARSING_ERROR" && error?.originalStatus === 200) {
                // Show success toast for parsing error with 200 status
                toast({
                    title: "Success",
                    description:
                        error?.data?.message || "Service deployed successfully",
                    variant: "success",
                    duration: 3000,
                });
            } else {
                // Show error toast for other errors
                toast({
                    title: "Error",
                    description:
                        error?.data?.message || "Failed to deploy the service. Please try again.",
                    variant: "error",
                    duration: 5000,
                });
            }
        } finally {
            setIsLoading(false); // Set loading to false when deployment finishes
            refetchBuildNumber();
            getdata();
        }
    };

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

    if (!projects) return null;

    return (
        <div className="container mx-auto py-8 px-2">
            <Breadcrumbs />

            <div className="grid gap-6 md:grid-cols-3 mt-6">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-purple-500">{projects.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="flex items-center">
                                <Code className="h-5 w-5 mr-2 text-blue-500" />
                                <span className="text-sm font-medium">Namespace:</span>
                                <span className="ml-2 text-sm bg-gray-100 px-2 py-1 rounded dark:text-black">{projects.namespace}</span>
                            </div>
                            <div className="flex items-center">
                                <GitBranch className="h-5 w-5 mr-2 text-green-500" />
                                <span className="text-sm font-medium">Branch:</span>
                                <span className="ml-2 text-sm bg-gray-100 px-2 py-1 rounded dark:text-black">{projects.branch}</span>
                            </div>
                            <div className="flex items-center">
                                <Package className="h-5 w-5 mr-2 text-purple-500" />
                                <span className="text-sm font-medium">Git:</span>
                                <a href={projects.git} target="_blank" rel="noopener noreferrer"
                                    className="ml-2 text-sm text-blue-500 hover:underline truncate">{projects.git}</a>
                            </div>
                            <div className="flex items-center">
                                <Package className="h-5 w-5 mr-2 text-purple-500" />
                                <span className="text-sm font-medium">Domain:</span>
                                <a href={`https://${projects.name}.cloudinator.cloud`} target="_blank" rel="noopener noreferrer"
                                    className="ml-2 text-sm text-blue-500 hover:underline truncate">{projects.name}.cloudinator.cloud</a>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <ConfigureProjectModal services={service} folder={projects.namespace} name={projects.name} />
                        <Link href={`/workspace/sub-workspace/${projects.namespace}/${params?.jobName}/${buildNumber && buildNumber[0]?.buildNumber ? buildNumber[0].buildNumber : ''}`}>
                            <Button className="w-full flex items-center gap-2 bg-green-500 hover:bg-green-700 text-white focus:ring-2 focus:ring-green-700 focus:ring-offset-2">
                                <Activity className="mr-2 h-4 w-4" /> View Logs
                            </Button>
                        </Link>

                        <Button
                            onClick={() => handleBuildService()}
                            className="flex items-center gap-2 bg-purple-500 hover:bg-purple-700 text-white focus:ring-2 focus:ring-purple-700 focus:ring-offset-2"
                            disabled={isLoading} // Disable the button while loading
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deploying...
                                </>
                            ) : (
                                <>
                                    <Rocket className="mr-2 h-4 w-4" /> Deploy now
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold text-purple-500 font-bold">Build History</CardTitle>
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
                                {Array.isArray(buildNumber) && buildNumber.length > 0 ? (
                                    buildNumber.map((build: BuildHistory) => (
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
                                                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                                    <Link href={`/workspace/sub-workspace/${projects.namespace}/${params?.jobName}/${build?.buildNumber}`}>
                                                        view log
                                                    </Link>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-8">
                                            <div className="flex flex-col items-center h-[400px] justify-center space-y-2">
                                                <Package className="h-8 w-8 text-gray-400" />
                                                <span className="text-gray-500">No build history available yet.</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ProjectDetailPage;