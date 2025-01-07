"use client";

import React, { useState, useEffect, lazy, Suspense, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Database,
  Layout,
  MoreVertical,
  Server,
  Share2,
  User2,
  Plus,
  Search,
  GitBranch,
  Globe,
  ExternalLink,
  Folder,
  Terminal,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useDeleteServiceDeploymentMutation,
  useDeleteSubWorkSpaceMutation,
  useGetServiceDeploymentQuery,
  useGetSubWorkspacesQuery,
  useGetWorkspacesQuery,
} from "@/redux/api/projectApi";
import { useRouter } from "next/navigation";
import { Breadcrumbs } from "../../Breadcrumbs";
import { useToast } from "@/hooks/use-toast";
import Loading from "@/components/Loading";

const CreateProjectContent = lazy(
  () => import("@/components/profiledashboard/workspace/CreateProjectContent"),
);

type ServiceType = {
  name: string;
  gitUrl: string;
  branch: string;
  subdomain: string;
  status: boolean;
  type: "all" | "frontend" | "backend" | "database" | "subworkspace";
  createdAt: string;
  updatedAt: string;
};

export type ServiceDeploymentResponse = {
  next: boolean;
  previous: boolean;
  total: number;
  totalElements: number;
  results: ServiceType[];
};

type SubWorkspaceType = {
  name: string;
  type: "subworkspace";
  uuid: string;
  gitUrl: string;
  branch: string;
  subdomain: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

type SubWorkSpaceResponse = {
  next: boolean;
  previous: boolean;
  total: number;
  totalElements: number;
  results: SubWorkspaceType[];
};

interface ErrorResponse {
  status?: string;
  originalStatus?: number;
  data?: {
    message?: string;
  };
}

function getServiceIcon(type: ServiceType["type"]) {
  switch (type) {
    case "all":
      return <Folder className="w-5 h-5 text-yellow-500" />;
    case "frontend":
      return <Layout className="w-5 h-5 text-purple-600" />;
    case "backend":
      return <Server className="w-5 h-5 text-pink-600" />;
    case "database":
      return <Database className="w-5 h-5 text-orange-600" />;
    case "subworkspace":
      return <Share2 className="w-5 h-5 text-blue-600" />;
  }
}

export default function Service() {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredServices, setFilteredServices] = useState<ServiceType[]>([]);
  const [selectedType, setSelectedType] = useState<ServiceType["type"] | "all">(
    "all",
  );
  const [deleteServiceDeployment] = useDeleteServiceDeploymentMutation();
  const [deleteSubWorkspace] = useDeleteSubWorkSpaceMutation();

  const { toast } = useToast();

  const { data: workspacesData } = useGetWorkspacesQuery();
  const workspaces = workspacesData || [];

  const [selectedWorkspace, setSelectedWorkspace] = useState(
    workspaces.length > 0 ? workspaces[0].name : "",
  );

  const { data: servicesData, refetch: data1 } = useGetServiceDeploymentQuery({
    workspaceName: selectedWorkspace,
    size: 10,
    page: 0,
  }) as unknown as { data: ServiceDeploymentResponse; refetch: () => void };

  const { data: subWorkspace, refetch: data2 } = useGetSubWorkspacesQuery({
    workspaceName: selectedWorkspace,
    size: 10,
    page: 0,
  }) as unknown as { data: SubWorkSpaceResponse; refetch: () => void };

  const combinedResults = useMemo(() => {
    const services = servicesData?.results || [];
    const subWorkspaces = subWorkspace?.results || [];

    // Combine and sort by `updatedAt` in descending order (latest first)
    return [...services, ...subWorkspaces].sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [servicesData, subWorkspace]);

  console.log(combinedResults);

  useEffect(() => {
    if (combinedResults) {
      const filtered = combinedResults.filter(
        (service: ServiceType | SubWorkspaceType) =>
          service.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedType === "all" || service.type === selectedType),
      );
      setFilteredServices(filtered);
    }
  }, [searchTerm, selectedType, combinedResults]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<ServiceType | null>(
    null,
  );
  const [subWorkspaceToDelete, setSubWorkspaceToDelete] =
    useState<SubWorkspaceType | null>(null);
  const [deleteConfirmationName, setDeleteConfirmationName] = useState("");

  const handleDeleteClick = (service: ServiceType | SubWorkspaceType) => {
    if (service.type === "subworkspace") {
      setSubWorkspaceToDelete(service as SubWorkspaceType);
    } else {
      setServiceToDelete(service as ServiceType);
    }
    setIsDeleteModalOpen(true);
    setDeleteConfirmationName("");
  };

  const confirmDelete = async () => {
    if (serviceToDelete && deleteConfirmationName === serviceToDelete.name) {
      try {
        await deleteServiceDeployment({ name: serviceToDelete.name }).unwrap();

        toast({
          title: "Success",
          description: `Service "${serviceToDelete.name}" has been deleted successfully.`,
          variant: "success",
          duration: 3000,
        });

        data1();
        data2();
      } catch (err) {
        const error = err as ErrorResponse;

        if (
          error?.status === "PARSING_ERROR" &&
          error?.originalStatus === 200
        ) {
          toast({
            title: "Success",
            description:
              error?.data?.message ||
              `Service "${serviceToDelete.name}" has been deleted successfully.`,
            variant: "success",
            duration: 3000,
          });

          data1();
          data2();
        } else {
          toast({
            title: "Error",
            description:
              error?.data?.message ||
              "Failed to delete service. Please try again.",
            variant: "error",
            duration: 5000,
          });
        }
        console.log("Delete service response:", error);
      } finally {
        setIsDeleteModalOpen(false);
        setServiceToDelete(null);
        setDeleteConfirmationName("");
      }
    }
  };

  const confirmDeleteSubWorkspace = async () => {
    if (
      subWorkspaceToDelete &&
      deleteConfirmationName === subWorkspaceToDelete.name
    ) {
      try {
        await deleteSubWorkspace({ name: subWorkspaceToDelete.name }).unwrap();

        // Success toast - this will show for successful deletion (status 200)
        toast({
          title: "Success",
          description: `Subworkspace "${subWorkspaceToDelete.name}" has been deleted successfully.`,
          variant: "default",
          duration: 3000,
        });

        // Refresh data and close modal
        data1();
        data2();
      } catch (err) {
        const error = err as ErrorResponse;

        // Handle different error cases
        if (
          error?.status === "PARSING_ERROR" &&
          error?.originalStatus === 200
        ) {
          // This is actually a success case with non-JSON response
          toast({
            title: "Success",
            description:
              error?.data?.message ||
              `Subworkspace "${subWorkspaceToDelete.name}" has been deleted successfully.`,
            variant: "success",
            duration: 3000,
          });

          // Refresh data since deletion was successful
          data1();
          data2();
        } else {
          // Real error case
          toast({
            title: "Error",
            description:
              error?.data?.message ||
              "Failed to delete subworkspace. Please try again.",
            variant: "destructive",
            duration: 5000,
          });
        }
        console.log("Delete subworkspace response:", error);
      } finally {
        // Clean up state
        setIsDeleteModalOpen(false);
        setSubWorkspaceToDelete(null);
        setDeleteConfirmationName("");
      }
    }
  };

  const EmptyState = ({
    type,
    onCreateProject,
  }: {
    type: string;
    onCreateProject: () => void;
  }) => {
    return (
      <div className="w-full h-[500px] flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700">
        <Folder className="w-12 h-12 text-purple-500 mb-4" />
        <h3 className="text-lg font-semibold text-purple-500 mb-2">
          No {type} Projects Found
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
          You do not have any {type} projects yet. Create one to get started!
        </p>
        <Button
          onClick={onCreateProject}
          className="bg-purple-500 hover:bg-purple-700 text-white w-[300px]"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create {type} Project
        </Button>
      </div>
    );
  };

  const projectCounts = useMemo(() => {
    const counts = {
      all: combinedResults.length,
      frontend: combinedResults.filter((service) => service.type === "frontend")
        .length,
      backend: combinedResults.filter((service) => service.type === "backend")
        .length,
      database: combinedResults.filter((service) => service.type === "database")
        .length,
      subworkspace: combinedResults.filter(
        (service) => service.type === "subworkspace",
      ).length,
    };
    return counts;
  }, [combinedResults]);

  if (!workspacesData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row items-center justify-between pb-6 space-y-4 sm:space-y-0"
      >
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <div className="flex justify-between items-center w-full">
            <Breadcrumbs title="Workspace Page" titleIcon={Terminal} />
            <DialogTrigger asChild>
              <Button className=" bg-purple-500 hover:bg-purple-700 focus:ring-2 focus:ring-purple-700 focus:ring-offset-2">
                <Plus className="mr-2 h-5 w-5" />
                Create Project
              </Button>
            </DialogTrigger>
          </div>
          <DialogContent className="p-0 bg-white dark:bg-gray-950 max-w-[90vw] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] w-full h-[90vh] sm:h-auto">
            <DialogTitle className="sr-only">Create New Project</DialogTitle>
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-64">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Database className="w-12 h-12 text-purple-500" />
                  </motion.div>
                </div>
              }
            >
              <CreateProjectContent
                onClose={() => setIsDialogOpen(false)}
                selectedWorkspace={selectedWorkspace}
                data1={data1}
                data2={data2}
              />
            </Suspense>
          </DialogContent>
        </Dialog>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-md"
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <Select
            defaultValue={selectedWorkspace}
            onValueChange={(value) => {
              setSelectedWorkspace(value);
            }}
          >
            <SelectTrigger className="w-full sm:w-[200px] text-purple-500 focus:ring-purple-500">
              <User2 className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select Workspace" />
            </SelectTrigger>
            <SelectContent className="text-purple-500">
              {workspaces.map((workspace) => (
                <SelectItem key={workspace.uuid} value={workspace.name}>
                  {workspace.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative w-full sm:w-auto flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
            <Input
              type="text"
              placeholder="Search Projects..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-sm font-bold text-purple-500 dark:text-purple-500">
            Filter By:
          </h2>
        </div>
        {/* filter type of service */}
        <div className="flex flex-wrap gap-3">
          {(
            ["all", "frontend", "backend", "database", "subworkspace"] as const
          ).map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              className={`bg-white text-purple-500 dark:bg-gray-800 capitalize dark:text-gray-200 hover:text-purple-700 hover:bg-gray-100 focus:ring-500 border border-1 transition-all ease-in-out ${
                selectedType === type ? "ring-2 ring-purple-500" : ""
              }`}
              onClick={() => setSelectedType(type)}
            >
              <div className="flex items-center">
                <span className="inline-block w-5 h-5">
                  {getServiceIcon(type)}
                </span>
                <span className="ml-2">
                  {type} ({projectCounts[type]})
                </span>
              </div>
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Service Card */}
      <AnimatePresence>
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6"
        >
          {filteredServices.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="col-span-full"
            >
              <EmptyState
                type={selectedType === "all" ? "project" : selectedType}
                onCreateProject={() => setIsDialogOpen(true)}
              />
            </motion.div>
          ) : (
            filteredServices.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between">
                  {/* Service Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getServiceIcon(service.type)}
                      <h3 className="font-semibold text-lg text-purple-600 dark:text-purple-400">
                        {service.name}
                      </h3>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={(e) => e.preventDefault()}
                        >
                          <MoreVertical className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={(e) => {
                            e.preventDefault();
                            const path =
                              service.type === "subworkspace"
                                ? `/workspace/sub-workspace/${service.name}`
                                : `/workspace/${service.name}`;
                            router.push(path);
                          }}
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={(e) => {
                            e.preventDefault();
                            handleDeleteClick(service);
                          }}
                          className="text-red-600"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Service Details */}
                  <div className="space-y-4 text-sm">
                    {/* Git URL */}
                    {service.gitUrl ? (
                      <a
                        href={service.gitUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <GitBranch className="w-4 h-4 mr-2 flex-shrink-0 text-purple-500" />
                        <span className="truncate">{service.gitUrl}</span>
                      </a>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">
                        Git URL not available
                      </span>
                    )}

                    {/* Subdomain or Subworkspace Description */}
                    {service?.type === "subworkspace" ? (
                      <span className="text-gray-500 dark:text-gray-400">
                        This is a sub-workspace where you can manage your
                        microservices.
                      </span>
                    ) : service.subdomain ? (
                      <a
                        href={`https://${service.subdomain}.cloudinator.cloud`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-green-600 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Globe className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{`https://${service.subdomain}.cloudinator.cloud`}</span>
                        <ExternalLink className="w-3 h-3 ml-1 flex-shrink-0" />
                      </a>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">
                        Subdomain not available
                      </span>
                    )}
                  </div>

                  {/* Service Footer */}
                  <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    {service.type !== "subworkspace" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className={`text-purple-600 border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900 w-full sm:w-auto ${
                          !service.status ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          if (service.status) {
                            // Determine the path based on service.type
                            const path =
                              service.type === "subworkspace"
                                ? `/workspace/sub-workspace/${service.name}`
                                : `/workspace/${service.name}`;
                            router.push(path); // Navigate to the determined path
                          }
                        }}
                        disabled={!service.status} // Disable the button if status is false
                      >
                        {service.status ? "View Details" : "Not Available"}
                      </Button>
                    )}
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                      <GitBranch className="w-3 h-3 mr-1 flex-shrink-0 text-purple-500" />
                      <span className="truncate">
                        {service?.type === "subworkspace"
                          ? "Sub Workspace"
                          : service.branch}
                      </span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </AnimatePresence>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogTitle className="text-purple-500">
            Confirm Deletion
          </DialogTitle>
          <p>
            Please type the name of the service to confirm deletion:{" "}
            <strong className="text-purple-500">{serviceToDelete?.name}</strong>
          </p>
          <Input
            value={deleteConfirmationName}
            onChange={(e) => setDeleteConfirmationName(e.target.value)}
            placeholder="Type service name here"
          />
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            {serviceToDelete?.type === "subworkspace" ||
            subWorkspaceToDelete ? (
              <Button
                onClick={confirmDeleteSubWorkspace}
                disabled={
                  (!serviceToDelete && !subWorkspaceToDelete) ||
                  deleteConfirmationName !==
                    (serviceToDelete?.name || subWorkspaceToDelete?.name)
                }
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Confirm Delete
              </Button>
            ) : (
              <Button
                onClick={confirmDelete}
                disabled={
                  !serviceToDelete ||
                  deleteConfirmationName !== serviceToDelete.name
                }
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Confirm Delete
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
