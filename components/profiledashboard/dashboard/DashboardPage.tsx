"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Cloud, GitBranch, Globe, LayoutDashboard, Zap } from "lucide-react";
import DeploymentOverview from "@/components/profiledashboard/dashboard/DeploymentOverview";
import RecentDeployments, {
  ServiceDeployment,
} from "@/components/profiledashboard/dashboard/RecentDeployments";
import { CreateWorkspaceModal } from "@/components/profiledashboard/workspace/CreateWorkspaceModal";
import {
  useCountServiceQuery,
  useCountSubworkspacesQuery,
  useCountWorkspaceQuery,
  useGetBuildAnalyticQuery,
  useGetServiceDeploymentQuery,
  useGetWorkspacesQuery,
} from "@/redux/api/projectApi";
import { ServiceDeploymentResponse } from "@/components/profiledashboard/workspace/service/Service";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a Skeleton component for loading states
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useGetMeQuery } from "@/redux/api/userApi";

export default function DashboardPage() {

  const { toast } = useToast();
  const searchParams = useSearchParams();

  const { data } = useGetMeQuery();

  // Fetch data for workspaces
  const { data: workspacesData } = useGetWorkspacesQuery();

  // Fetch build analytics
  const { data: buildAnalytic, isLoading: isLoadingBuildAnalytic } =
    useGetBuildAnalyticQuery();

  // Fetch count of workspaces
  const { data: countWorkspace, isLoading: isLoadingCountWorkspace } =
    useCountWorkspaceQuery();

  // Fetch count of sub-workspaces
  const { data: countSubWorkspace, isLoading: isLoadingCountSubWorkspace } =
    useCountSubworkspacesQuery({
      name: workspacesData ? workspacesData[0]?.name : "",
    });

  // Fetch count of services
  const { data: countServices, isLoading: isLoadingCountServices } =
    useCountServiceQuery({
      name: workspacesData ? workspacesData[0]?.name : "",
    });

  // Fetch service deployments
  const { data: servicesData } = useGetServiceDeploymentQuery({
    workspaceName: workspacesData ? workspacesData[0]?.name : "",
    size: 10,
    page: 0,
  }) as unknown as { data: ServiceDeploymentResponse };

  // Calculate derived data with NaN checks
  const totalBuildAnalytic =
    Number(buildAnalytic?.fail || 0) + Number(buildAnalytic?.success || 0);
  const successRate =
    totalBuildAnalytic > 0
      ? (Number(buildAnalytic?.success || 0) * 100) / totalBuildAnalytic
      : 0;
  const projects = Number(countSubWorkspace || 0) + Number(countServices || 0);
  const services: ServiceDeployment[] = servicesData?.results || [];

  useEffect(() => {
    // Check for a query parameter indicating the user was redirected
    const redirectedFromNoWorkspaces = searchParams.get("redirectedFromNoWorkspaces");

    if (redirectedFromNoWorkspaces) {
      // Show the toast notification
      toast({
        title: "No Workspaces Found",
        description: "You do not have any workspaces. Please create one to get started.",
        variant: "destructive",
        duration: 3000,
      });

      // Optionally, remove the query parameter from the URL
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("redirectedFromNoWorkspaces");
      window.history.replaceState({}, "", newUrl.toString());
    }
  }, [searchParams, toast]);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">

      <div className="flex flex-col items-center space-y-4 p-8 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-800 dark:to-indigo-800 rounded-lg shadow-lg transform transition-all hover:shadow-xl">
        <h1 className="text-5xl font-bold text-white dark:text-purple-100 text-center">
          Hi{" "}
          <span className="text-purple-200 dark:text-purple-300 bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 dark:from-purple-400 dark:to-pink-400 hover:from-purple-400 hover:to-pink-400 transition-all duration-500">
            {data?.username}
          </span>
          , Welcome to Dashboard
        </h1>
        <p className="text-lg text-purple-100 dark:text-purple-200 font-medium text-center">
          Explore your workspace and manage your projects seamlessly.
        </p>
      </div>

      <div className="flex justify-between items-center w-full bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg shadow-gray-200/20 dark:shadow-purple-500/10">
        <div className="flex items-center gap-4">
          <LayoutDashboard className="w-8 h-8 text-purple-500" />
          <h1 className="text-purple-500 bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 font-bold text-4xl">
            Dashboard
          </h1>
        </div>
        <div className="flex items-center justify-between space-y-2">
          <div className="flex items-center space-x-2">
            <CreateWorkspaceModal />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="from-purple-500/90 via-indigo-500/90 to-gray-800/90 dark:from-purple-600/90 dark:via-indigo-600/90 dark:to-gray-900/90 border border-purple-500/20 dark:border-purple-600/20 rounded-xl shadow-lg shadow-purple-500/10 dark:shadow-purple-500/20 hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-lg font-semibold text-purple-500 bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-100 dark:to-pink-100">
              Total Workspace
            </CardTitle>
            <div className="p-2 rounded-full bg-purple-500/10 dark:bg-purple-600/20 border border-purple-500/20 dark:border-purple-600/20">
              <Cloud className="h-5 w-5 text-purple-500 dark:text-purple-100" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingCountWorkspace ? (
              <Skeleton className="h-8 w-3/4 bg-gradient-to-r from-purple-500/50 to-indigo-500/50 dark:from-purple-600/50 dark:to-indigo-600/50 rounded-lg" />
            ) : (
              <div className="text-4xl font-bold text-purple-500 dark:text-white bg-clip-text bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-25 dark:to-pink-25">
                {countWorkspace}
              </div>
            )}
          </CardContent>
        </Card>
        {/* Total Projects Card */}
        <Card className="from-purple-500/90 via-indigo-500/90 to-gray-800/90 dark:from-purple-600/90 dark:via-indigo-600/90 dark:to-gray-900/90 border border-purple-500/20 dark:border-purple-600/20 rounded-xl shadow-lg shadow-purple-500/10 dark:shadow-purple-500/20 hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-md font-semibold text-purple-500 bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
              Totals Projects
            </CardTitle>
            <div className="p-2 rounded-full bg-purple-800/10 border border-purple-700/30">
              <GitBranch className="h-5 w-5 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingCountSubWorkspace || isLoadingCountServices ? (
              <Skeleton className="h-8 w-3/4 bg-gradient-to-r from-purple-800/50 to-indigo-800/50 rounded-lg" />
            ) : (
              <div className="text-3xl font-bold text-purple-500 dark:text-white bg-clip-text bg-gradient-to-r from-purple-100 to-pink-100">
                {projects}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Success Rate Card */}
        <Card className="from-purple-500/90 via-indigo-500/90 to-gray-800/90 dark:from-purple-600/90 dark:via-indigo-600/90 dark:to-gray-900/90 border border-purple-500/20 dark:border-purple-600/20 rounded-xl shadow-lg shadow-purple-500/10 dark:shadow-purple-500/20 hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-md font-semibold text-purple-500 bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
              Success Rate
            </CardTitle>
            <div className="p-2 rounded-full bg-purple-800/10 border border-purple-700/30">
              <ArrowUpRight className="h-5 w-5 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingBuildAnalytic ? (
              <Skeleton className="h-8 w-3/4 bg-gradient-to-r from-purple-800/50 to-indigo-800/50 rounded-lg" />
            ) : (
              <div className="text-3xl font-bold text-purple-500 dark:text-white bg-clip-text bg-gradient-to-r from-purple-100 to-pink-100">
                {successRate.toFixed(2) || "-"} %
              </div>
            )}
          </CardContent>
        </Card>

        {/* Successful Deployment Card */}
        <Card className="from-purple-500/90 via-indigo-500/90 to-gray-800/90 dark:from-purple-600/90 dark:via-indigo-600/90 dark:to-gray-900/90 border border-purple-500/20 dark:border-purple-600/20 rounded-xl shadow-lg shadow-purple-500/10 dark:shadow-purple-500/20 hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-md font-semibold text-purple-500 bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
              Successful Deployment
            </CardTitle>
            <div className="p-2 rounded-full bg-purple-800/10 border border-purple-700/30">
              <Globe className="h-5 w-5 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingBuildAnalytic ? (
              <Skeleton className="h-8 w-3/4 bg-gradient-to-r from-purple-800/50 to-indigo-800/50 rounded-lg" />
            ) : (
              <div className="text-3xl font-bold text-purple-500 dark:text-white bg-clip-text bg-gradient-to-r from-purple-100 to-pink-100">
                {buildAnalytic?.success || "-"}
              </div>
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
              <DeploymentOverview
                success={buildAnalytic?.success || "-"}
                failure={buildAnalytic?.fail || "-"}
              />
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
