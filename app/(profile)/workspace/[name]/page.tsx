"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Rocket,
  RotateCcw,
  StopCircle,
  ExternalLink,
  CheckCircle,
  Github,
  Code,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  BuildNumber,
  useBuildServiceMutation,
  useGetBuildInfoByNameQuery,
  useGetServiceByNameQuery,
  useStartServiceDeploymentMutation,
  useStopServiceDeploymentMutation,
} from "@/redux/api/projectApi";
import WebsitePreview from "@/components/profiledashboard/deployment/WebsitePreview";
import Link from "next/link";
import RollbackModal from "@/components/profiledashboard/workspace/RollbackModal";
import { StreamingLog } from "@/components/profiledashboard/workspace/StreamingLog";
import Loading from "@/components/Loading";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export type PropsParams = {
  params: Promise<{ name: string }>;
};

interface ErrorResponse {
  status?: string;
  originalStatus?: number;
  data?: {
    message?: string;
  };
}

export default function ProjectDetailPage({ params }: PropsParams) {
  const [projectName, setProjectName] = useState<string>("");
  const [buildNumber, setBuildNumber] = useState<BuildNumber[]>([]);
  const [isRollbackModalOpen, setIsRollbackModalOpen] = useState(false);
  const [isStopDialogOpen, setIsStopDialogOpen] = useState(false);
  const [isRestartDialogOpen, setIsRestartDialogOpen] = useState(false);
  const [isDeployDialogOpen, setIsDeployDialogOpen] = useState(false);

  const [buildService] = useBuildServiceMutation();
  const [stopServiceDeployment] = useStopServiceDeploymentMutation();
  const [startServiceDeployment] = useStartServiceDeploymentMutation();
  const { toast } = useToast();

  const {
    data: projects,
    refetch,
    isLoading: isProjectsLoading,
  } = useGetServiceByNameQuery(
    { name: projectName },
    {
      skip: !projectName,
      refetchOnMountOrArgChange: true,
    },
  );

  const { data: builds, isLoading: isBuildsLoading } =
    useGetBuildInfoByNameQuery(
      { name: projectName },
      {
        skip: !projectName,
        refetchOnMountOrArgChange: true,
      },
    );

  useEffect(() => {
    params.then(({ name }) => setProjectName(name));
  }, [params]);

  useEffect(() => {
    if (Array.isArray(builds)) {
      setBuildNumber(builds);
    }
  }, [builds]);

  const handleBuildService = async () => {
    setIsDeployDialogOpen(false);

    const newBuild = {
      buildNumber: buildNumber.length + 1,
      status: "BUILDING",
    };

    setBuildNumber((prevBuilds) => [newBuild, ...prevBuilds]);

    try {
      const result = await buildService({ name: projectName }).unwrap();

      setBuildNumber((prevBuilds) =>
        prevBuilds.map((build) =>
          build.buildNumber === newBuild.buildNumber
            ? {
                ...build,
                status:
                  typeof result.status === "string"
                    ? result.status
                    : "BUILDING",
              }
            : build,
        ),
      );

      toast({
        title: "Success",
        description: `Service "${projectName}" build initiated successfully.`,
        variant: "success",
        duration: 3000,
      });
    } catch (err) {
      const error = err as ErrorResponse;

      if (error?.status === "PARSING_ERROR" && error?.originalStatus === 200) {
        toast({
          title: "Success",
          description:
            error?.data?.message ||
            `Service "${projectName}" build initiated successfully.`,
          variant: "success",
          duration: 3000,
        });
      } else {
        toast({
          title: "Error",
          description:
            error?.data?.message ||
            "Failed to initiate service build. Please try again.",
          variant: "error",
          duration: 5000,
        });
      }
    }
  };

  const handleStopService = async () => {
    try {
      await stopServiceDeployment({
        name: projectName,
      }).unwrap();
      setIsStopDialogOpen(false);
      toast({
        title: "Success",
        description: `Service "${projectName}" stopped successfully.`,
        variant: "success",
        duration: 3000,
      });
      refetch();
    } catch (err) {
      const error = err as ErrorResponse;

      if (error?.status === "PARSING_ERROR" && error?.originalStatus === 200) {
        toast({
          title: "Success",
          description:
            error?.data?.message ||
            `Service "${projectName}" stopped successfully.`,
          variant: "success",
          duration: 3000,
        });
        refetch();
      } else {
        toast({
          title: "Error",
          description:
            error?.data?.message || "Failed to stop service. Please try again.",
          variant: "destructive",
          duration: 5000,
        });
      }
      console.log("Failed to stop service:", error);
    }
  };

  const handleRestartService = async () => {
    try {
      await startServiceDeployment({ name: projectName }).unwrap();
      setIsRestartDialogOpen(false);
      toast({
        title: "Success",
        description: `Service "${projectName}" started successfully.`,
        variant: "success",
        duration: 3000,
      });
      refetch();
    } catch (err) {
      const error = err as ErrorResponse;

      if (error?.status === "PARSING_ERROR" && error?.originalStatus === 200) {
        toast({
          title: "Success",
          description:
            error?.data?.message ||
            `Service "${projectName}" started successfully.`,
          variant: "success",
          duration: 3000,
        });
        refetch();
      } else {
        toast({
          title: "Error",
          description:
            error?.data?.message ||
            "Failed to start service. Please try again.",
          variant: "destructive",
          duration: 5000,
        });
      }
      console.log("Failed to restart service:", error);
    }
  };

  const handleRollback = async (version: number) => {
    try {
      console.log(`Rolling back to version ${version}`);
      // Implement your rollback logic here
      // await rollbackService({ name: projectName, version });
      // After successful rollback, you may want to refresh the build history
      // await refetch();
    } catch (error) {
      console.error("Failed to rollback:", error);
    }
  };

  const successfulBuilds = buildNumber.filter(
    (build) => build.status === "SUCCESS",
  );

  if (isProjectsLoading || isBuildsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
          <Loading />
        </div>
      </div>
    );
  }

  if (!projectName || !projects || !builds) {
    return null;
  }

  const url = `https://${projects.subdomain}.cloudinator.cloud`;

  return (
    <div className="px-12 py-6 w-full">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          {/* Header section */}
          <div className="flex items-center gap-8">
            <h1 className="text-3xl font-bold text-purple-500">
              {projects.name}
            </h1>
            <Badge
              variant="outline"
              className="text-green-500 border-green-500"
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              {projects.status ? "Running" : "Stopped"}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
            <Button
              onClick={() => setIsDeployDialogOpen(true)}
              className="flex items-center gap-2 bg-purple-500 hover:bg-purple-700 text-white focus:ring-2 focus:ring-purple-700 focus:ring-offset-2"
            >
              <Rocket className="w-4 h-4" />
              Deploy
            </Button>
            <Button
              onClick={() => setIsRollbackModalOpen(true)}
              variant="outline"
              className="flex items-center gap-2 bg-white border-purple-200 border text-purple-500 hover:bg-purple-100 hover:text-purple-700 focus:ring-2 focus:ring-purple-700 focus:ring-offset-2"
              disabled={successfulBuilds.length === 0}
            >
              <RotateCcw className="w-4 h-4" />
              Rollback
            </Button>
            {projects.status ? (
              <Button
                onClick={() => setIsStopDialogOpen(true)}
                variant="destructive"
                className="flex items-center gap-2 focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
              >
                <StopCircle className="w-4 h-4" />
                Stop
              </Button>
            ) : (
              <Button
                onClick={() => setIsRestartDialogOpen(true)}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange focus:ring-2 focus:ring-orange-700 focus:ring-offset-2"
              >
                <Rocket className="w-4 h-4" />
                Start
              </Button>
            )}
            <Button
              variant="secondary"
              className="flex text-purple-500 items-center gap-2 focus:ring-2 focus:ring-purple-700 focus:ring-offset-2"
            >
              <ExternalLink className="w-4 h-4" />
              <a href={url} target="_blank" rel="noopener noreferrer">
                Visit Site
              </a>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="mt-6 w-full">
          <TabsList className="mb-4 w-full">
            <TabsTrigger
              value="overview"
              className="w-full text-purple-500 bg-white bg-opacity-20 py-2 px-4 data-[state=active]:bg-purple-500 data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="builds"
              className="w-full text-purple-500 bg-white bg-opacity-20 py-2 px-4 data-[state=active]:bg-purple-500 data-[state=active]:text-white"
            >
              Build History
            </TabsTrigger>
            <TabsTrigger
              value="logs"
              className="w-full text-purple-500 bg-white bg-opacity-20 py-2 px-4 data-[state=active]:bg-purple-500 data-[state=active]:text-white"
            >
              Build Logs
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                <CardHeader className="border-b border-purple-100">
                  <CardTitle className="text-xl text-purple-500 font-bold flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Project Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <dl className="space-y-4">
                    {/* Build Status */}
                    <div className="flex flex-col gap-1 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <dt className="font-semibold text-gray-600 text-sm uppercase tracking-wide">
                        Build Status
                      </dt>
                      <dd className="font-medium text-lg flex items-center gap-2">
                        {buildNumber.length > 0 ? (
                          buildNumber[0].status === "BUILDING" ? ( // Use the first build in the array (most recent)
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                              <span className="text-blue-500">Building...</span>
                            </>
                          ) : buildNumber[0].status === "FAILED" ? (
                            <>
                              <AlertCircle className="w-4 h-4 text-red-500" />
                              <span className="text-red-500">Build Failed</span>
                            </>
                          ) : buildNumber[0].status === "SUCCESS" ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-green-500">
                                Build Successful
                              </span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-500">
                                Build Status Unknown
                              </span>
                            </>
                          )
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-500">
                              No Builds Available
                            </span>
                          </>
                        )}
                      </dd>
                    </div>

                    {/* Service Status */}
                    <div className="flex flex-col gap-1 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <dt className="font-semibold text-gray-600 text-sm uppercase tracking-wide">
                        Service Status
                      </dt>
                      <dd
                        className={`${
                          projects.status ? "text-green-500" : "text-red-500"
                        } font-medium text-lg flex items-center gap-2`}
                      >
                        {projects.status ? (
                          <>
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Running
                          </>
                        ) : (
                          <>
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            Stopped
                          </>
                        )}
                      </dd>
                    </div>

                    {/* URL */}
                    <div className="flex flex-col gap-1 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <dt className="font-semibold text-gray-600 text-sm uppercase tracking-wide">
                        URL
                      </dt>
                      <dd>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-700 hover:underline flex items-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          {url}
                        </a>
                      </dd>
                    </div>

                    {/* Repository */}
                    <div className="flex flex-col gap-1 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <dt className="font-semibold text-gray-600 text-sm uppercase tracking-wide">
                        Repository
                      </dt>
                      <dd>
                        <a
                          href={projects.gitUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-700 hover:underline flex items-center gap-2"
                        >
                          <Github className="w-4 h-4" />
                          {projects.gitUrl.split("/").slice(-2).join("/")}
                        </a>
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
              <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                <CardHeader className="border-b border-purple-100">
                  <CardTitle className="text-xl text-purple-500 font-bold flex items-center gap-2">
                    <ExternalLink className="w-5 h-5" />
                    Project Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <WebsitePreview url={url} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="builds" className="w-full">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-purple-500">Build History</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {buildNumber.map((build: BuildNumber) => (
                    <li
                      key={build.buildNumber}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <Badge
                          variant={
                            build.status === "SUCCESS"
                              ? "outline"
                              : build.status === "BUILDING"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {build.status}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {projectName}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Code className="w-4 h-4" />
                        <Link
                          href={`/workspace/${projectName}/${build.buildNumber}`}
                        >
                          View Details
                        </Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="logs" className="w-full">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Build Logs</CardTitle>
              </CardHeader>
              <CardContent>
                {buildNumber.length > 0 && (
                  <StreamingLog
                    name={projectName}
                    buildNumber={buildNumber[0].buildNumber}
                  />
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

      <AlertDialog
        open={isDeployDialogOpen}
        onOpenChange={setIsDeployDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deploy Service</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to deploy {projectName}? This will initiate
              a new build and may take a few minutes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBuildService}
              className="bg-purple-500 hover:bg-purple-700"
            >
              Deploy Service
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isStopDialogOpen} onOpenChange={setIsStopDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Stop Service</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to stop {projectName}? The service will be
              unavailable until restarted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleStopService}
              className="bg-red-500 hover:bg-red-700"
            >
              Stop Service
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={isRestartDialogOpen}
        onOpenChange={setIsRestartDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Start Service</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to start {projectName}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRestartService}
              className="bg-orange-500 hover:bg-orange-700"
            >
              Start Service
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
