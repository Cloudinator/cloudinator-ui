import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Cloud, GitBranch, Globe, Home, Zap } from "lucide-react";
import DeploymentOverview from "@/components/profiledashboard/dashboard/DeploymentOverview";
import RecentDeployments from "@/components/profiledashboard/dashboard/RecentDeployments";

export default function DashboardPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6 bg-white dark:bg-gray-900"> {/* Background color for light and dark mode */}
            <div className="flex items-center justify-between space-y-2">
                <div className="flex items-center space-x-2">
                    <Home className="h-8 w-8 text-purple-500" />
                    <h2 className="text-3xl font-bold tracking-tight text-purple-500">Deployment Dashboard</h2>
                </div>
                <div className="flex items-center space-x-2">
                    <Button className="bg-purple-500 hover:bg-purple-700 text-white">
                        <Zap className="mr-2 h-4 w-4" />
                        New Deployment
                    </Button>
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-white dark:bg-gray-800"> {/* Card background for light and dark mode */}
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-md font-medium text-purple-500">Total Deployments</CardTitle>
                        <Cloud className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card className="bg-white dark:bg-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-md text-purple-500 font-medium">Active Projects</CardTitle>
                        <GitBranch className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">18</div>
                        <p className="text-xs text-muted-foreground">+5 new projects this week</p>
                    </CardContent>
                </Card>
                <Card className="bg-white dark:bg-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-md text-purple-500 font-medium">Success Rate</CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">99.9%</div>
                        <p className="text-xs text-muted-foreground">+0.2% from last week</p>
                    </CardContent>
                </Card>
                <Card className="bg-white dark:bg-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-md text-purple-500 font-medium">Total Traffic</CardTitle>
                        <Globe className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1.2K</div>
                        <p className="text-xs text-muted-foreground">+38% since last month</p>
                    </CardContent>
                </Card>
            </div>

            {/* Overview and Recent Deployments Section */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 bg-white dark:bg-gray-800">
                    <CardHeader>
                        <div className="flex items-center space-x-2 text-md text-purple-500">
                            <Zap className="h-6 w-6 text-purple-500" />
                            <CardTitle>Deployment Overview</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="pl-2">
                        {/* Assuming DeploymentOverview is a valid component */}
                        <DeploymentOverview />
                    </CardContent>
                </Card>

                <Card className="col-span-3 bg-white dark:bg-gray-800">
                    <CardHeader>
                        <div className="flex items-center space-x-2 text-md text-purple-500">
                            <Zap className="h-6 w-6 text-purple500" />
                            <CardTitle>Recent Deployments</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {/* Assuming RecentDeployments is a valid component */}
                        <RecentDeployments />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}