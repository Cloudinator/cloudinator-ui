'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, Cloud, GitBranch, Globe, Zap } from 'lucide-react'
import DeploymentOverview from "@/components/profiledashboard/dashboard/DeploymentOverview"
import RecentDeployments, { ServiceDeployment } from "@/components/profiledashboard/dashboard/RecentDeployments"
import { CreateWorkspaceModal } from "@/components/profiledashboard/workspace/CreateWorkspaceModal"
import { Breadcrumbs } from "@/components/profiledashboard/Breadcrumbs"
import {
    useCountServiceQuery,
    useCountSubworkspacesQuery,
    useCountWorkspaceQuery, useGetBuildAnalyticQuery, useGetServiceDeploymentQuery,
    useGetWorkspacesQuery
} from "@/redux/api/projectApi";
import { ServiceDeploymentResponse } from "@/components/profiledashboard/workspace/service/Service";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a Skeleton component for loading states

export default function DashboardPage() {
    // Fetch data for workspaces
    const { data: workspacesData } = useGetWorkspacesQuery();

    // Fetch build analytics
    const { data: buildAnalytic, isLoading: isLoadingBuildAnalytic } = useGetBuildAnalyticQuery();

    // Fetch count of workspaces
    const { data: countWorkspace, isLoading: isLoadingCountWorkspace } = useCountWorkspaceQuery();

    // Fetch count of sub-workspaces
    const { data: countSubWorkspace, isLoading: isLoadingCountSubWorkspace } = useCountSubworkspacesQuery({
        name: workspacesData ? workspacesData[0]?.name : "",
    });

    // Fetch count of services
    const { data: countServices, isLoading: isLoadingCountServices } = useCountServiceQuery({
        name: workspacesData ? workspacesData[0]?.name : "",
    });

    // Fetch service deployments
    const { data: servicesData } = useGetServiceDeploymentQuery({
        workspaceName: workspacesData ? workspacesData[0]?.name : "",
        size: 10,
        page: 0,
    }) as unknown as { data: ServiceDeploymentResponse };

    // Calculate derived data with NaN checks
    const totalBuildAnalytic = Number(buildAnalytic?.fail || 0) + Number(buildAnalytic?.success || 0);
    const successRate = totalBuildAnalytic > 0 ? (Number(buildAnalytic?.success || 0) * 100 / totalBuildAnalytic) : 0;
    const projects = Number(countSubWorkspace || 0) + Number(countServices || 0);
    const services: ServiceDeployment[] = servicesData?.results || [];

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            {/* Breadcrumbs and Create Workspace Button */}
            <div className="flex justify-between items-center w-full">
                <Breadcrumbs />
                <div className="flex items-center justify-between space-y-2">
                    <div className="flex items-center space-x-2">
                        <CreateWorkspaceModal />
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Total Workspace Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-md font-medium text-purple-500">
                            Total Workspace
                        </CardTitle>
                        <Cloud className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {isLoadingCountWorkspace ? (
                            <Skeleton className="h-8 w-3/4" />
                        ) : (
                            <div className="text-2xl font-bold">{countWorkspace}</div>
                        )}
                    </CardContent>
                </Card>

                {/* Total Projects Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-md text-purple-500 font-medium">
                            Totals Projects
                        </CardTitle>
                        <GitBranch className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {isLoadingCountSubWorkspace || isLoadingCountServices ? (
                            <Skeleton className="h-8 w-3/4" />
                        ) : (
                            <div className="text-2xl font-bold">{projects}</div>
                        )}
                    </CardContent>
                </Card>

                {/* Success Rate Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-md text-purple-500 font-medium">Success Rate</CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {isLoadingBuildAnalytic ? (
                            <Skeleton className="h-8 w-3/4" />
                        ) : (
                            <div className="text-2xl font-bold">{successRate.toFixed(2)} %</div>
                        )}
                    </CardContent>
                </Card>

                {/* Successful Deployment Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-md text-purple-500 font-medium">Successful Deployment</CardTitle>
                        <Globe className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {isLoadingBuildAnalytic ? (
                            <Skeleton className="h-8 w-3/4" />
                        ) : (
                            <div className="text-2xl font-bold">{buildAnalytic?.success || 0}</div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Deployment Overview and Recent Deployments */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Deployment Overview */}
                <Card className="col-span-4">
                    <CardHeader>
                        <div className="flex items-center space-x-2 text-md text-purple-500">
                            <Zap className="h-6 w-6 text-purple-500" />
                            <CardTitle>Deployment Overview</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="pl-2">
                        {isLoadingBuildAnalytic ? (
                            <Skeleton className="h-40 w-full" />
                        ) : (
                            <DeploymentOverview success={buildAnalytic?.success || 0} failure={buildAnalytic?.fail || 0} />
                        )}
                    </CardContent>
                </Card>

                {/* Recent Deployments */}
                <Card className="col-span-3">
                    <CardHeader>
                        <div className="flex items-center space-x-2 text-md text-purple-500">
                            <Zap className="h-6 w-6 text-purple-500" />
                            <CardTitle>Recent Deployments</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {isLoadingCountServices ? (
                            <Skeleton className="h-40 w-full" />
                        ) : (
                            <RecentDeployments services={services} />
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}