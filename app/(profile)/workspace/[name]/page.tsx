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
  Terminal,
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
import { useApiErrorHandler, useToast } from "@/hooks/use-toast";
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
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/Breadcrumb2";

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
  const { handleError } = useApiErrorHandler();
  const [projectName, setProjectName] = useState<string>("");
  const [buildNumber, setBuildNumber] = useState<BuildNumber[]>([]);
  const [isRollbackModalOpen, setIsRollbackModalOpen] = useState(false);
  const [isStopDialogOpen, setIsStopDialogOpen] = useState(false);
  const [isRestartDialogOpen, setIsRestartDialogOpen] = useState(false);
  const [isDeployDialogOpen, setIsDeployDialogOpen] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isStopping, setIsStopping] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [buildStartTime, setBuildStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const { toast } = useToast();
  const [isRefetching, setIsRefetching] = useState(false);

  const [buildService] = useBuildServiceMutation();
  const [stopServiceDeployment] = useStopServiceDeploymentMutation();
  const [startServiceDeployment] = useStartServiceDeploymentMutation();

  const {
    data: projects,
    refetch: refetchProjects,
    isLoading: isProjectsLoading,
    error: projectsError,
  } = useGetServiceByNameQuery(
    { name: projectName },
    {
      skip: !projectName,
      refetchOnMountOrArgChange: true,
    },
  );

  const {
    data: builds,
    refetch: refetchBuilds,
    isLoading: isBuildsLoading,
    error: buildsError,
  } = useGetBuildInfoByNameQuery(
    { name: projectName },
    {
      skip: !projectName,
      refetchOnMountOrArgChange: true,
    },
  );

  useEffect(() => {
    if (projectsError) {
      handleError(projectsError); // Handle the error
    }
  }, [projectsError]);

  useEffect(() => {
    params.then(({ name }) => setProjectName(name));
  }, [params]);

  useEffect(() => {
    if (Array.isArray(builds)) {
      setBuildNumber(builds);
    }
  }, [builds]);

  // Real-time build status updates
  useEffect(() => {
    if (!projectName) return;

    const eventSource = new EventSource(
      `https://stream.psa-khmer.world/api/v1/jenkins/stream-log/${projectName}`,
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received build status update:", data);

      // Update the build status in the state
      setBuildNumber((prevBuilds) =>
        prevBuilds.map((build) =>
          build.buildNumber === data.buildNumber
            ? { ...build, status: data.status }
            : build,
        ),
      );

      // If the build status is "BUILDING", set the start time
      if (data.status === "BUILDING") {
        setBuildStartTime(Date.now());
        setElapsedTime(0); // Reset elapsed time
      }

      // If the build status is "SUCCESS" or "FAILED", reset the timer
      if (data.status === "SUCCESS" || data.status === "FAILED") {
        setBuildStartTime(null);
        setElapsedTime(0);
        refetchProjects(); // Refetch project data
        refetchBuilds(); // Refetch build data
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [projectName, refetchBuilds, refetchProjects]);

  // Start the timer when the build status changes to "BUILDING"
  useEffect(() => {
    if (buildNumber.length > 0 && buildNumber[0].status === "BUILDING") {
      setBuildStartTime(Date.now()); // Set the start time
      setElapsedTime(0); // Reset elapsed time
    }
  }, [buildNumber]);

  // Calculate elapsed time in seconds
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (buildStartTime !== null) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - buildStartTime) / 1000)); // Calculate elapsed time in seconds
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval); // Cleanup the interval
    };
  }, [buildStartTime]);

  useEffect(() => {
    if (buildsError) {
      handleError(buildsError);
    }
  }, [buildsError]);

  useEffect(() => {
    if (buildNumber.length > 0 && buildNumber[0].status === "BUILDING") {
      // Start the refetch process after 6 seconds
      setIsRefetching(true);
      const timer = setTimeout(() => {
        refetchProjects();
        refetchBuilds();
        setIsRefetching(false);
      }, 6000); // 6000 milliseconds = 6 seconds

      // Cleanup the timer
      return () => clearTimeout(timer);
    }
  }, [buildNumber, refetchProjects, refetchBuilds]);

  // Refetch when the build status changes to "SUCCESS" or "FAILED"
  useEffect(() => {
    if (
      buildNumber.length > 0 &&
      (buildNumber[0].status === "SUCCESS" || buildNumber[0].status === "FAILED")
    ) {
      console.log("Refetching data...");
      refetchProjects().then(() => console.log("Projects refetched"));
      refetchBuilds().then(() => console.log("Builds refetched"));
      setBuildStartTime(null); // Reset the start time
      setElapsedTime(0); // Reset elapsed time
    }
  }, [buildNumber, refetchProjects, refetchBuilds]);

  const handleBuildService = async () => {
    setIsDeploying(true); // Start loading

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
        description: `Service "${projectName}" is starting to build, be patient`,
        variant: "success",
        duration: 3000,
      });

      // Wait for 6 seconds before refetching data
      setTimeout(() => {
        refetchProjects(); // Refetch project data
        refetchBuilds(); // Refetch build data
      }, 6000); // 6000 milliseconds = 6 seconds

    } catch (err) {
      const error = err as ErrorResponse;

      if (error?.status === "PARSING_ERROR" && error?.originalStatus === 200) {
        toast({
          title: "Success",
          description:
            error?.data?.message ||
            `Service "${projectName}" is starting to build, be patient`,
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
    } finally {
      setIsDeploying(false); // Stop loading
      setIsDeployDialogOpen(false); // Close the dialog
    }
  };

  const handleStopService = async () => {
    setIsStopping(true); // Start loading

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
      refetchProjects();
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
        refetchProjects();
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
    } finally {
      setIsStopping(false); // Stop loading
    }
  };

  const handleRestartService = async () => {
    setIsStarting(true); // Start loading

    try {
      await startServiceDeployment({ name: projectName }).unwrap();
      setIsRestartDialogOpen(false);
      toast({
        title: "Success",
        description: `Service "${projectName}" started successfully.`,
        variant: "success",
        duration: 3000,
      });
      refetchProjects();
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
        refetchProjects();
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
    } finally {
      setIsStarting(false); // Stop loading
    }
  };

  const handleRollback = async (version: number) => {
    try {
      console.log(`Rolling back to version ${version}`);
      // Implement your rollback logic here
      // await rollbackService({ name: projectName, version });
      // After successful rollback, you may want to refresh the build history
      // await refetchBuilds();
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

  if (buildsError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <h1 className="text-2xl font-bold text-red-500">Server Error</h1>
          <p className="text-gray-600 dark:text-gray-300">
            An error occurred while fetching build numbers. Please try again
            later.
          </p>
          <Button
            variant="outline"
            onClick={() => refetchBuilds()} // Retry the query
            className="mt-4"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const url = `https://${projects.subdomain}.cloudinator.cloud`;

  const isDeploymentRunning = buildNumber.some(
    (build) => build.status === "BUILDING",
  );

  return (
    <div className="px-12 py-10 w-full">
      <div className="flex flex-col gap-4">
        <Breadcrumbs />
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          {/* Header section */}
          <div className="flex items-center gap-8">
            <h1 className="text-3xl font-bold text-purple-500">
              {projects.name}
            </h1>
            <Badge
              variant="outline"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300 ${projects.status
                ? "text-green-500 border-green-500 bg-green-50 hover:bg-green-100"
                : "text-red-500 border-red-500 bg-red-50 hover:bg-red-100"
                }`}
            >
              {projects.status ? (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <CheckCircle className="w-4 h-4" />
                </motion.div>
              ) : (
                <StopCircle className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">
                {projects.status ? "Running" : "Stopped"}
              </span>
            </Badge>
          </div>
          <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
            <Button
              onClick={() => setIsDeployDialogOpen(true)}
              className="flex items-center gap-2 bg-purple-500 hover:bg-purple-700 text-white focus:ring-2 focus:ring-purple-700 focus:ring-offset-2"
              disabled={isDeploymentRunning || isDeploying}
            >
              {isDeploying ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Rocket className="w-4 h-4" />
              )}
              {isDeploying ? "Deploying..." : "Deploy"}
            </Button>
            <Button
              onClick={() => setIsRollbackModalOpen(true)}
              variant="outline"
              className={`flex items-center gap-2 bg-white border-purple-200 border text-purple-500 hover:bg-purple-100 hover:text-purple-700 focus:ring-2 focus:ring-purple-700 focus:ring-offset-2 ${isDeploymentRunning ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={successfulBuilds.length === 0 || isDeploymentRunning} // Disable during deployment
            >
              <RotateCcw className="w-4 h-4" />
              Rollback
            </Button>
            {projects.status ? (
              <Button
                onClick={() => setIsStopDialogOpen(true)}
                variant="destructive"
                className={`flex items-center gap-2 focus:ring-2 focus:ring-red-700 focus:ring-offset-2 ${isDeploymentRunning ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isStopping || isDeploymentRunning} // Disable during deployment
              >
                {isStopping ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <StopCircle className="w-4 h-4" />
                )}
                {isStopping ? "Stopping..." : "Stop"}
              </Button>
            ) : (
              <Button
                onClick={() => setIsRestartDialogOpen(true)}
                className={`flex items-center gap-2 bg-orange-500 hover:bg-orange focus:ring-2 focus:ring-orange-700 focus:ring-offset-2 ${isDeploymentRunning ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isStarting || isDeploymentRunning} // Disable during deployment
              >
                {isStarting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Rocket className="w-4 h-4" />
                )}
                {isStarting ? "Starting..." : "Start"}
              </Button>
            )}
            <Button
              variant="secondary"
              className={`flex text-purple-500 items-center gap-2 focus:ring-2 focus:ring-purple-700 focus:ring-offset-2 ${isDeploymentRunning ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isDeploymentRunning} // Disable during deployment
            >
              <ExternalLink className="w-4 h-4" />
              <Link href={url} target="_blank" rel="noopener noreferrer">
                Visit Site
              </Link>
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
              Build History ({buildNumber.length})
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
              <Card className="w-full bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700 rounded-xl">
                <CardHeader className="border-b border-purple-500/20">
                  <CardTitle className="text-xl font-bold flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                    <Code className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                    Project Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <dl className="space-y-4">
                    {/* Build Status */}
                    <div className="flex flex-col gap-1 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200">
                      <dt className="font-semibold text-gray-600 dark:text-gray-400 text-sm uppercase tracking-wide">
                        Build Status
                      </dt>
                      <dd className="font-medium text-lg flex items-center gap-2">
                        {buildNumber.length > 0 ? (
                          buildNumber[0].status === "BUILDING" ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-blue-500 dark:text-blue-400" />
                              <span className="text-blue-500 dark:text-blue-400">
                                Building... ({elapsedTime}s)
                              </span>
                            </>
                          ) : buildNumber[0].status === "FAILED" ? (
                            <>
                              <AlertCircle className="w-4 h-4 text-red-500 dark:text-red-400" />
                              <span className="text-red-500 dark:text-red-400">Build Failed</span>
                            </>
                          ) : buildNumber[0].status === "SUCCESS" ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400" />
                              <span className="text-green-500 dark:text-green-400">Build Successful</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                              <span className="text-gray-500 dark:text-gray-400">Build Status Unknown</span>
                            </>
                          )
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-gray-500 dark:text-gray-400">No Builds Available</span>
                          </>
                        )}
                      </dd>
                    </div>

                    {/* Service Status */}
                    <div className="flex flex-col gap-1 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200">
                      <dt className="font-semibold text-gray-600 dark:text-gray-400 text-sm uppercase tracking-wide">
                        Service Status
                      </dt>
                      <dd
                        className={`${projects.status ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"
                          } font-medium text-lg flex items-center gap-2`}
                      >
                        {projects.status ? (
                          <>
                            <div className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400 animate-pulse" />
                            Running
                          </>
                        ) : (
                          <>
                            <div className="w-2 h-2 rounded-full bg-red-500 dark:bg-red-400" />
                            Stopped
                          </>
                        )}
                      </dd>
                    </div>

                    {/* URL */}
                    <div className="flex flex-col gap-1 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200">
                      <dt className="font-semibold text-gray-600 dark:text-gray-400 text-sm uppercase tracking-wide">
                        URL
                      </dt>
                      <dd>
                        <Link
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline flex items-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          {url}
                        </Link>
                      </dd>
                    </div>

                    {/* Repository */}
                    <div className="flex flex-col gap-1 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200">
                      <dt className="font-semibold text-gray-600 dark:text-gray-400 text-sm uppercase tracking-wide">
                        Repository
                      </dt>
                      <dd>
                        <Link
                          href={projects.gitUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline flex items-center gap-2"
                        >
                          <Github className="w-4 h-4" />
                          {projects.gitUrl.split("/").slice(-2).join("/")}
                        </Link>
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
              {/* Project Preview Card */}
              <Card className="w-full bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700 rounded-xl">
                <CardHeader className="border-b border-purple-500/20">
                  <CardTitle className="text-xl font-bold flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                    <ExternalLink className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                    Project Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 relative group">
                  {buildNumber.length > 0 && buildNumber[0].status === "SUCCESS" ? (
                    // Show the Website Preview if the build is successful
                    <div className="group-hover:blur-none transition-all duration-300">
                      <WebsitePreview url={url} />
                    </div>
                  ) : (
                    // Fallback UI for non-successful builds
                    <div className="flex flex-col items-center justify-center h-64 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      {buildNumber.length > 0 && buildNumber[0].status === "BUILDING" ? (
                        // Build in progress
                        <>
                          {isRefetching ? (
                            // Show a loading spinner while waiting for refetch
                            <>
                              <Loader2 className="w-8 h-8 animate-spin text-blue-500 dark:text-blue-400" />
                              <p className="mt-4 text-gray-600 dark:text-gray-400 text-center">
                                Refreshing build status... Please wait.
                              </p>
                            </>
                          ) : (
                            // Show the default building message
                            <>
                              <Loader2 className="w-8 h-8 animate-spin text-blue-500 dark:text-blue-400" />
                              <p className="mt-4 text-gray-600 dark:text-gray-400 text-center">
                                Build in progress... Please wait.
                              </p>
                            </>
                          )}
                        </>
                      ) : buildNumber.length > 0 && buildNumber[0].status === "FAILED" ? (
                        // Build failed
                        <>
                          <AlertCircle className="w-8 h-8 text-red-500 dark:text-red-400" />
                          <p className="mt-4 text-gray-600 dark:text-gray-400 text-center">
                            Build failed. Please check the logs and try again.
                          </p>
                        </>
                      ) : (
                        // No builds available
                        <>
                          <AlertCircle className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                          <p className="mt-4 text-gray-600 dark:text-gray-400 text-center">
                            No builds available. Start a new build to see the preview.
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="builds" className="w-full">
            <Card className="w-full dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-purple-500 dark:text-white">
                  Build History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {buildNumber.length === 0 ? (
                  // Empty state for Build History
                  <div className="flex flex-col items-center justify-center p-8 h-[500px]">
                    <Code className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      No builds available.
                    </p>
                  </div>
                ) : (
                  // Build History List
                  <ul className="space-y-4">
                    {buildNumber.map((build: BuildNumber) => (
                      <li
                        key={build.buildNumber}
                        className="flex items-center justify-between p-4 rounded-lg dark:bg-gray-700"
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
                            style={
                              build.status === "SUCCESS"
                                ? { backgroundColor: "green", color: "white" }
                                : build.status === "BUILDING"
                                  ? { backgroundColor: "#F59E0B", color: "white" }
                                  : { backgroundColor: "#DC2626", color: "white" }
                            }
                          >
                            {build.status}
                          </Badge>
                          <span className="text-sm text-gray-500 dark:text-gray-300">
                            {projectName}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-2 text-purple-500 hover:text-purple-700 dark:text-white dark:hover:text-white dark:bg-gray-700 dark:hover:bg-gray-600"
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
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="logs" className="w-full">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-purple-500 dark:text-white">
                  Build Logs
                </CardTitle>
              </CardHeader>
              <CardContent>
                {buildNumber.length === 0 ? (
                  // Empty state for Build Logs
                  <div className="flex flex-col items-center justify-center p-8 h-[500px]">
                    <Terminal className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      No build logs available.
                    </p>
                  </div>
                ) : (
                  // Build Logs Component
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
              disabled={isDeploying}
            >
              {isDeploying ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              {isDeploying ? "Deploying..." : "Deploy Service"}
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
