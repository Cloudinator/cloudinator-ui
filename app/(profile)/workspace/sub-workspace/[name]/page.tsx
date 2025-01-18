"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  FileText,
  ChevronDown,
  MoreVertical,
  Sparkles,
  Code,
  ArrowRight,
  GripVertical,
  FolderOpen,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ERDDiagram from "@/components/profiledashboard/workspace/service/ERDDiagram";
import { SpringInitializer } from "@/components/profiledashboard/workspace/service/SpringInitializer";
import {
  useBuildSpringServiceMutation,
  useCreateExistingProjectMutation,
  useDeleteSpringProjectMutation,
  useGetBuildNumberInFolderQuery,
  useGetProjectsQuery,
} from "@/redux/api/projectApi";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion, AnimatePresence } from "framer-motion";
import { GitCommandModal } from "@/components/profiledashboard/workspace/GitCommandModal";
import { useGetMeQuery } from "@/redux/api/userApi";
import Breadcrumbs from "@/components/Breadcrumb2";
import { useToast } from "@/hooks/use-toast";

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

type SpringProjectType = {
  uuid: string;
  name: string;
  folder: string;
  group: string;
  dependencies: string[];
  branch: string;
  namespace: string;
  git: string;
};

export type SpringProjectResponse = {
  next: boolean;
  previous: boolean;
  total: number;
  totalElements: number;
  results: SpringProjectType[];
};

type BuildHistoryItem = {
  buildNumber: number;
  status: "BUILDING" | "SUCCESS" | "FAILURE";
};

export default function SubWorkspacePage(props: PropsParams) {
  const [params, setParams] = useState<{ name: string } | null>(null);
  const [isCreateProjectDialogOpen, setIsCreateProjectDialogOpen] =
    useState(false);
  const [isSpringInitializerOpen, setIsSpringInitializerOpen] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [isDeployDialogOpen, setIsDeployDialogOpen] = useState(false);
  const [buildSpringService] = useBuildSpringServiceMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] =
    useState<SpringProjectType | null>(null);
  const [deleteConfirmationName, setDeleteConfirmationName] = useState("");
  const [deleteConfirmationError, setDeleteConfirmationError] = useState("");
  const [existingProjectName, setExistingProjectName] = useState<string | null>(
    null,
  );
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [createExistingProject] = useCreateExistingProjectMutation();

  const [deleteSpringProject] = useDeleteSpringProjectMutation();
  const [isGitCommandModalOpen, setIsGitCommandModalOpen] = useState(false);

  const { toast } = useToast();

  const { data: profile } = useGetMeQuery();

  console.log(profile);

  useEffect(() => {
    props.params.then(setParams);
  }, [props.params]);

  useEffect(() => {
    if (params) {
      console.log(params.name);
    }
  }, [params]);

  const { data, refetch } = useGetProjectsQuery({
    subWorkspace: params?.name ?? "",
    page: 0,
    size: 10,
  }) as unknown as { data: SpringProjectResponse; refetch: () => void };

  const springProjects = data?.results ?? [];

  const { data: buildNumber, refetch: build } = useGetBuildNumberInFolderQuery({
    folder: params?.name ?? "",
    name: params?.name ?? "",
  });

  const handleDeployProject = () => {
    console.log("Deploying projects:", selectedProjects);
    setIsDeployDialogOpen(false);
  };

  const handleBuildProject = () => {
    try {
      buildSpringService({
        folder: params?.name ?? "",
        name: params?.name ?? "",
        serviceName: selectedProjects,
      });
      setIsDeployDialogOpen(false);
    } catch (error) {
      console.log(error);
      build();
    }
  };

  const handleDeleteSpringProject = async (project: SpringProjectType) => {
    try {
      const result = await deleteSpringProject({
        folder: params?.name ?? "",
        name: project.name,
      });

      // Show success toast
      toast({
        title: "Success",
        description: "Project deleted successfully.",
        variant: "success",
      });

      console.log(result);
    } catch (error) {
      // Show error toast
      toast({
        title: "Error",
        description: "Failed to delete the project.",
        variant: "error",
      });
      console.log(error);
    } finally {
      refetch();
      setIsDeleteDialogOpen(false);
    }
  };

  const handleDeleteProject = (project: SpringProjectType) => {
    setProjectToDelete(project);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirmationNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDeleteConfirmationName(e.target.value);
    setDeleteConfirmationError("");
  };

  const confirmDeleteProject = () => {
    if (projectToDelete && projectToDelete.name === deleteConfirmationName) {
      handleDeleteSpringProject(projectToDelete);
      setProjectToDelete(null);
      setDeleteConfirmationName("");
      setDeleteConfirmationError("");
    } else if (
      projectToDelete &&
      projectToDelete.name !== deleteConfirmationName
    ) {
      setDeleteConfirmationError("Project name does not match");
    }
  };

  const handleCreateProject = (option: "new" | "existing") => {
    if (option === "new") {
      setIsSpringInitializerOpen(true);
      setIsCreateProjectDialogOpen(false);
    } else if (option === "existing") {
      setExistingProjectName(""); // Reset the name
    }
  };

  const handleCreateExistingProject = async (name: string) => {
    try {
      const result = await createExistingProject({
        folder: params?.name ?? "",
        name: name,
        servicesNames: selectedServices,
      }).unwrap();

      // Show success toast
      toast({
        title: "Success",
        description: `Project "${name}" created successfully.`,
        variant: "success",
        duration: 3000,
      });

      console.log("Project created successfully:", result);

      // Reset state and close the dialog
      setIsCreateProjectDialogOpen(false);
      setSelectedServices([]);

      // Refetch data
      refetch();
    } catch (err) {
      const error = err as ErrorResponse;

      console.log("Failed to create project:", error);

      // Handle parsing error or other errors
      if (error?.status === "PARSING_ERROR" && error?.originalStatus === 200) {
        // Show success toast for parsing error with 200 status
        toast({
          title: "Success",
          description:
            error?.data?.message ||
            `Project "${name}" created successfully (parsing error).`,
          variant: "success",
          duration: 3000,
        });

        // Reset state and close the dialog
        setIsCreateProjectDialogOpen(false);
        setSelectedServices([]);

        // Refetch data
        refetch();
      } else {
        // Show error toast for other errors
        toast({
          title: "Error",
          description:
            error?.data?.message ||
            "Failed to create the project. Please try again.",
          variant: "error",
          duration: 5000,
        });

        // Open Git Command Modal for fallback
        setIsGitCommandModalOpen(true);
      }
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSelectedServices((items) => {
        const oldIndex = items.indexOf(active.id.toString());
        const newIndex = items.indexOf(over.id.toString());

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  function SortableItem(props: { id: string }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: props.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <motion.li
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-primary text-primary-foreground px-4 py-2 rounded-md flex justify-between items-center mb-2 cursor-move"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
      >
        <span className="flex items-center">
          <GripVertical className="mr-2 h-4 w-4" />
          {props.id}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            setSelectedServices(selectedServices.filter((s) => s !== props.id))
          }
          className="text-primary-foreground hover:text-primary-foreground/80"
        >
          <X className="h-4 w-4" />
        </Button>
      </motion.li>
    );
  }

  if (!profile) {
    return null;
  }

  const gitCommands = [
    "git init --initial-branch=main",
    `git remote add origin https://git.cloudinator.cloud/group-${profile.username}/${existingProjectName}.git`,
    "git add .",
    'git commit -m "message"',
    "git push --set-upstream origin main",
  ];

  return (
    <div className="flex-1 space-y-6 p-8">
      <Breadcrumbs />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        {/* <div>
          <h1 className="text-3xl font-bold tracking-tight text-purple-500">
            Spring Microservices
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage Spring microservice projects and their relationships
          </p>
        </div> */}

        <div className="flex justify-between items-center w-full bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg shadow-gray-200/20 dark:shadow-purple-500/10">
          {/* Workspace Title */}
          <div className="flex items-center gap-4">
            <div>
              <Plus className="w-8 h-8 text-purple-500" />
            </div>
            <div>
              <h1 className="text-purple-500 bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 font-bold text-4xl">
                Spring Microservices
              </h1>
              
            </div>
            <p className="text-lg text-muted-foreground">Manage Spring Microservice projects and their relationships</p>
          </div>


          <div className="flex space-x-2">
            <Dialog
              open={isDeployDialogOpen}
              onOpenChange={setIsDeployDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-purple-500 hover:bg-purple-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Deploy/Build
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-purple-500">
                    Select Services
                  </DialogTitle>
                  <DialogDescription>
                    Choose the services you want to use
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <div className="p-4 border rounded-lg space-y-4">
                    <div className="text-sm text-muted-foreground">
                      Selected services:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProjects.map((projectName) => {
                        const project = springProjects.find(
                          (p) => p.name === projectName,
                        );
                        return project ? (
                          <Badge
                            key={project.name}
                            variant="secondary"
                            className="bg-purple-100 text-purple-700 hover:bg-purple-200"
                          >
                            {project.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                  <Collapsible className="mt-4">
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border p-4 text-left text-sm font-medium hover:bg-gray-100">
                      {selectedProjects.length} services selected
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                      <div className="rounded-lg border p-4 space-y-3">
                        {springProjects.map((project) => (
                          <div
                            key={project.name}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={project.name}
                              checked={selectedProjects.includes(project.name)}
                              onCheckedChange={(checked) => {
                                setSelectedProjects(
                                  checked
                                    ? [...selectedProjects, project.name]
                                    : selectedProjects.filter(
                                      (name) => name !== project.name,
                                    ),
                                );
                              }}
                              className="border-purple-500 text-purple-500"
                            />
                            <label
                              htmlFor={project.name}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {project.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
                <DialogFooter className="mt-6 space-x-2">
                  <Button onClick={handleBuildProject} variant="outline">
                    Build
                  </Button>
                  <Button
                    onClick={handleDeployProject}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Deploy
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog
              open={isCreateProjectDialogOpen}
              onOpenChange={setIsCreateProjectDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  className="bg-purple-500 hover:bg-purple-700"
                  onClick={() => setIsCreateProjectDialogOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Spring Project
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-center text-purple-500">
                    Create Your Spring Project
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    Choose your preferred method to kickstart your Spring project
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card
                      className="cursor-pointer transition-all duration-300 hover:border-purple-500 hover:shadow-md"
                      onClick={() => handleCreateProject("new")}
                    >
                      <CardHeader className="flex flex-col items-center">
                        <Sparkles className="h-12 w-12 text-purple-500 mb-2" />
                        <CardTitle className="text-purple-500">
                          Create New Project
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-center text-sm text-muted-foreground">
                          Start fresh with a new Spring project using our
                          initializer
                        </p>
                      </CardContent>
                    </Card>
                    <Card
                      className="cursor-pointer transition-all duration-300 hover:border-purple-500 hover:shadow-md"
                      onClick={() => handleCreateProject("existing")}
                    >
                      <CardHeader className="flex flex-col items-center">
                        <Code className="h-12 w-12 text-purple-500 mb-2" />
                        <CardTitle className="text-purple-500">
                          Use Existing Code
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-center text-sm text-muted-foreground">
                          Import your existing Spring project code
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  {existingProjectName !== null && (
                    <div className="space-y-4 p-6 bg-muted rounded-lg">
                      <Label
                        htmlFor="existing-project-name"
                        className="text-lg font-semibold"
                      >
                        Project Name
                      </Label>
                      <Input
                        id="existing-project-name"
                        value={existingProjectName}
                        onChange={(e) => setExistingProjectName(e.target.value)}
                        placeholder="Enter your project name"
                        className="w-full"
                      />
                      <div className="space-y-2">
                        <Label
                          htmlFor="service-select"
                          className="text-lg font-semibold"
                        >
                          Select Services
                        </Label>
                        <div className="flex space-x-2 flex-wrap">
                          {springProjects.map((project) => (
                            <Button
                              key={project.uuid}
                              variant={
                                selectedServices.includes(project.name)
                                  ? "secondary"
                                  : "outline"
                              }
                              className="mb-2"
                              onClick={() => {
                                setSelectedServices((prevSelected) =>
                                  prevSelected.includes(project.name)
                                    ? prevSelected.filter(
                                      (item) => item !== project.name,
                                    )
                                    : [...prevSelected, project.name],
                                );
                              }}
                            >
                              {project.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4">
                        <Label className="text-lg font-semibold mb-2 block">
                          Selected Services (Drag to reorder)
                        </Label>
                        <DndContext
                          sensors={sensors}
                          collisionDetection={closestCenter}
                          onDragEnd={handleDragEnd}
                        >
                          <SortableContext
                            items={selectedServices}
                            strategy={verticalListSortingStrategy}
                          >
                            <AnimatePresence>
                              {selectedServices.map((service) => (
                                <SortableItem key={service} id={service} />
                              ))}
                            </AnimatePresence>
                          </SortableContext>
                        </DndContext>
                      </div>
                      <Button
                        onClick={() =>
                          handleCreateExistingProject(existingProjectName)
                        }
                        className="w-full bg-purple-500 hover:bg-purple-700"
                        disabled={!existingProjectName} // Disable if existingProjectName is empty
                      >
                        Create Project
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>


      <Tabs defaultValue="spring-projects" className="space-y-4 w-full">
        <TabsList className="w-full flex">
          <TabsTrigger
            value="spring-projects"
            className="flex-1 data-[state=active]:bg-purple-500 data-[state=active]:text-white"
          >
            Spring Projects
          </TabsTrigger>
          <TabsTrigger
            value="erd"
            className="flex-1 data-[state=active]:bg-purple-500 data-[state=active]:text-white"
          >
            Project Relationships
          </TabsTrigger>
          <TabsTrigger
            value="build-history"
            className="flex-1 data-[state=active]:bg-purple-500 data-[state=active]:text-white"
          >
            Build History
          </TabsTrigger>
        </TabsList>

        {/* Spring Projects Tab */}
        <TabsContent value="spring-projects" className="space-y-4">
          {springProjects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {springProjects.map((project) => (
                <motion.div
                  key={project.uuid} // Ensure key is added to the motion.div
                  initial={{ opacity: 0, y: 20 }} // Initial animation state
                  animate={{ opacity: 1, y: 0 }} // Animate to this state
                  transition={{ duration: 0.3, ease: "easeOut" }} // Smooth transition
                  whileHover={{ scale: 1.02 }} // Scale up on hover
                  whileTap={{ scale: 0.98 }} // Scale down on tap
                >
                  <Link
                    href={`/workspace/sub-workspace/${params?.name}/${project.name}`}
                  >
                    <Card className="transition-all duration-300 hover:shadow-lg relative bg-white dark:bg-black/20 backdrop-blur-md dark:backdrop-blur-md border border-gray-200 dark:border-white/20 rounded-xl hover:border-purple-500/50 hover:shadow-purple-500/20 dark:hover:border-purple-500/50 dark:hover:shadow-purple-500/20 cursor-pointer">
                      {/* Card Header */}
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-medium truncate max-w-[70%] text-purple-500 dark:text-white">
                          {project.name}
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full"
                                onClick={(e) => e.stopPropagation()} // Prevent card click when dropdown is clicked
                              >
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4 text-gray-900 dark:text-white" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="w-48 bg-white dark:bg-black/80 backdrop-blur-md dark:backdrop-blur-md border border-gray-200 dark:border-white/20 rounded-lg"
                            >
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/workspace/sub-workspace/${params?.name}/${project.name}`}
                                  className="w-full flex items-center text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10"
                                >
                                  <span>Go to Detail</span>
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.preventDefault(); // Prevent default behavior
                                  e.stopPropagation(); // Stop event propagation
                                  handleDeleteProject(project); // Handle delete action
                                }}
                                className="text-red-500 hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-500"
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>

                      {/* Card Content */}
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Branch:
                            </span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {project.branch}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Namespace:
                            </span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {project.namespace}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Git:</span>
                            <span className="font-medium text-gray-900 dark:text-white truncate max-w-[150px]">
                              {project.git}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center items-center h-64"
            >
              <div className="text-center space-y-2">
                <FolderOpen className="h-8 w-8 text-muted-foreground mx-auto" />{" "}
                {/* Add an icon for empty state */}
                <p className="text-muted-foreground">
                  No Spring Projects available.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateProjectDialogOpen(true)}
                  className="mt-2 bg-purple-500 hover:bg-purple-700 text-white hover:text-white"
                >
                  Create New Project
                </Button>
              </div>
            </motion.div>
          )}
        </TabsContent>

        {/* Project Relationships Tab */}
        <TabsContent value="erd" className="space-y-4">
          {springProjects.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Microservices Relationship Diagram</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[600px] border rounded-md">
                  <ERDDiagram projects={springProjects} />
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-muted-foreground">
                No projects available to show relationships.
              </p>
            </div>
          )}
        </TabsContent>

        {/* Build History Tab */}
        <TabsContent value="build-history" className="space-y-4">
          {Array.isArray(buildNumber) && buildNumber.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Build History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Name</TableHead>
                      <TableHead>Build #</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {buildNumber.map((build: BuildHistoryItem) => (
                      <TableRow key={build.buildNumber}>
                        <TableCell>{params?.name}</TableCell>
                        <TableCell>{build.buildNumber}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              build.status === "SUCCESS"
                                ? "default"
                                : build.status === "FAILURE"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {build.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            <Link
                              href={`/workspace/sub-workspace/${params?.name}/${params?.name}/${build?.buildNumber}`}
                            >
                              View Log
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-muted-foreground">
                No build history available.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <SpringInitializer
        isOpen={isSpringInitializerOpen}
        onClose={() => {
          setIsSpringInitializerOpen(false);
          setExistingProjectName("");
        }}
        folder={params?.name ?? ""}
        springProjects={springProjects}
        refetch={refetch}
      />

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold text-purple-500">
              Are you sure you want to delete this project?
            </AlertDialogTitle>
            <AlertDialogDescription className="mt-2 text-gray-600">
              This will permanently delete the project &quot;
              <span className="text-purple-500">{projectToDelete?.name}</span>
              &quot; and remove all of its data. To confirm, please enter the
              project name below.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-6">
            <input
              type="text"
              value={deleteConfirmationName}
              onChange={handleDeleteConfirmationNameChange}
              onPaste={(e) => {
                e.preventDefault(); // Prevent pasting
                setDeleteConfirmationError(
                  "To ensure accuracy, please type the project name manually.",
                );
              }}
              placeholder="Enter project name to confirm"
              className={`w-full p-3 border ${deleteConfirmationError ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 ${deleteConfirmationError
                  ? "focus:ring-red-500"
                  : "focus:ring-blue-500"
                } transition-colors`}
            />
            {deleteConfirmationError && (
              <p className="text-red-500 text-sm mt-2">
                {deleteConfirmationError}
              </p>
            )}
          </div>
          <AlertDialogFooter className="flex justify-end space-x-4">
            <AlertDialogCancel
              onClick={() => {
                setDeleteConfirmationName("");
                setDeleteConfirmationError("");
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteProject}
              disabled={deleteConfirmationName !== projectToDelete?.name} // Disable if input doesn't match
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 ${deleteConfirmationName === projectToDelete?.name
                ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                : "bg-red-300 cursor-not-allowed" // Disabled state styling
                }`}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <GitCommandModal
        isOpen={isGitCommandModalOpen}
        onClose={() => setIsGitCommandModalOpen(false)}
        commands={gitCommands}
        clear={() => setExistingProjectName(null)}
      />
    </div>
  );
}
