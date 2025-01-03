'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, Cloud, GitBranch, Globe, Home, Zap } from 'lucide-react'
import DeploymentOverview from "@/components/profiledashboard/dashboard/DeploymentOverview"
import RecentDeployments, {ServiceDeployment} from "@/components/profiledashboard/dashboard/RecentDeployments"
import { CreateWorkspaceModal } from "@/components/profiledashboard/workspace/CreateWorkspaceModal"
import { Breadcrumbs } from "@/components/profiledashboard/Breadcrumbs"
import {
    useCountServiceQuery,
    useCountSubworkspacesQuery,
    useCountWorkspaceQuery, useGetBuildAnalyticQuery, useGetServiceDeploymentQuery,
    useGetWorkspacesQuery
} from "@/redux/api/projectApi";
import {ServiceDeploymentResponse} from "@/components/profiledashboard/workspace/service/Service";


export default function DashboardPage() {

    const {data} = useGetWorkspacesQuery()

    const {data:buildAnalytic} = useGetBuildAnalyticQuery();


    const {data:countWorkspace} = useCountWorkspaceQuery();


    const {data:countSubWorkspace} = useCountSubworkspacesQuery(
        {
            name: data ? data[0]?.name : "",
        }
    );

    const {data:countServices} = useCountServiceQuery(
        {
            name: data ? data[0]?.name : "",
        }
    )


    const {data: servicesData, } = useGetServiceDeploymentQuery({
        workspaceName: data ? data[0]?.name : "",
        size: 10,
        page: 0,
    }) as unknown as { data: ServiceDeploymentResponse};


    const totalBuildAnalytic = Number(buildAnalytic?.fail) + Number(buildAnalytic?.success)

    const successRate = Number(buildAnalytic?.success) * 100 / totalBuildAnalytic;

    console.log("Total Number",successRate)


    const projects = Number(countSubWorkspace) + Number(countServices)

    const services: ServiceDeployment[] = servicesData?.results;




    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <Breadcrumbs />
            <div className="flex items-center justify-between space-y-2">
                <div className="flex items-center space-x-2">
                    <Home className="h-8 w-8 text-purple-500" />
                    <h2 className="text-3xl font-bold tracking-tight text-purple-500">
                        Deployment Dashboard
                    </h2>
                </div>
                <div className="flex items-center space-x-2">
                    <CreateWorkspaceModal />
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-md font-medium text-purple-500">
                            Total Workspace
                        </CardTitle>
                        <Cloud className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{countWorkspace}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-md text-purple-500 font-medium">
                            Totals Projects
                        </CardTitle>
                        <GitBranch className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{projects}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-md text-purple-500 font-medium">Success Rate</CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{successRate ? successRate : 0} %</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-md text-purple-500 font-medium">Successful Deployment</CardTitle>
                        <Globe className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{buildAnalytic?.success ? buildAnalytic?.success : 0} </div>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <div className="flex items-center space-x-2 text-md text-purple-500">
                            <Zap className="h-6 w-6 text-purple-500" />
                            <CardTitle>Deployment Overview</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <DeploymentOverview success={buildAnalytic ? buildAnalytic?.success : 0} failure={buildAnalytic ? buildAnalytic?.fail : 0} />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <div className="flex items-center space-x-2 text-md text-purple-500">
                            <Zap className="h-6 w-6 text-purple-500" />
                            <CardTitle>Recent Deployments</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <RecentDeployments services={services} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}