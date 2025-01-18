"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Leaf, Search, X, Plus, Check } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  SpringProject,
  useCreateProjectMutation,
  useGetMetadataQuery,
} from "@/redux/api/projectApi";
import { useToast } from "@/hooks/use-toast";

interface Dependency {
  name?: string;
  description?: string;
  artifactId: string;
  groupId: string;
  scope: string;
}

interface SpringInitializerProps {
  isOpen: boolean;
  onClose: () => void;
  folder: string;
  springProjects: SpringProject[];
  refetch: () => void;
}

interface ErrorResponse {
  status?: string;
  originalStatus?: number;
  data?: {
    message?: string;
  };
}

interface MetadataResponse {
  dependencies: Record<string, Dependency>;
}

export function SpringInitializer({
  isOpen,
  onClose,
  folder,
  springProjects,
  refetch,
}: SpringInitializerProps) {
  const [projectName, setProjectName] = useState("demo");
  const [groupId, setGroupId] = useState("com.example");
  const [selectedDependencies, setSelectedDependencies] = useState<string[]>(
    [],
  );
  const [selectedProjectTypes, setSelectedProjectTypes] = useState<string[]>(
    [],
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [createProject] = useCreateProjectMutation();
  const [openProjectTypes, setOpenProjectTypes] = useState(false);
  const [dependencies, setDependencies] = useState<Record<string, Dependency>>(
    {},
  );
  const { toast } = useToast();

  const { data } = useGetMetadataQuery() as {
    data: MetadataResponse | undefined;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "b") {
        e.preventDefault();
        setIsModalOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (data) {
      setDependencies(data.dependencies);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await createProject({
        name: projectName,
        group: groupId,
        folder: folder,
        servicesNames: selectedProjectTypes,
        dependencies: selectedDependencies,
      }).unwrap();

      // Show success toast
      toast({
        title: "Success",
        description: "Project created successfully.",
        variant: "success",
        duration: 3000,
      });

      console.log("Project created successfully:", result);

      // Close the dialog and refetch data
      onClose();
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
            "Project created successfully (parsing error).",
          variant: "success",
          duration: 3000,
        });

        // Close the dialog and refetch data
        onClose();
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

        // Close the dialog and refetch data
        onClose();
        refetch();
      }
    }
  };

  const toggleDependency = (dep: Dependency) => {
    setSelectedDependencies((prev) => {
      let adjustedScope = dep.scope;
      if (dep.scope === "runtime") {
        adjustedScope = "runtimeOnly";
      } else if (dep.scope === "compile") {
        adjustedScope = "compileOnly";
      }
      const depString = `${adjustedScope} '${dep.groupId}:${dep.artifactId}'`;
      return prev.includes(depString)
        ? prev.filter((d) => d !== depString)
        : [...prev, depString];
    });
  };

  const toggleProjectType = (value: string) => {
    setSelectedProjectTypes((prev) =>
      prev.includes(value)
        ? prev.filter((type) => type !== value)
        : [...prev, value],
    );
  };

  const filteredDependencies = Object.entries(dependencies).filter(
    ([name, dep]) =>
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dep.artifactId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dep.groupId.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const groupedDependencies = filteredDependencies.reduce(
    (acc, [name, dep]) => {
      const category = dep.scope.toUpperCase();
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push({ name, ...dep });
      return acc;
    },
    {} as Record<string, (Dependency & { name: string })[]>,
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0">
        <VisuallyHidden>
          <DialogTitle>Spring Initializer</DialogTitle>
        </VisuallyHidden>
        <div className="flex flex-col min-h-[90vh]">
          {/* header of spring initializer */}
          <header className="bg-gradient-to-r from-purple-700 to-purple-800 text-white py-6 px-6 rounded-t-xl">
            <div className="flex items-center gap-3">
              <Leaf className="h-8 w-8" aria-hidden="true" />
              <div>
                <h1 className="text-2xl font-bold">Spring Initializer</h1>
                <p className="text-purple-100 text-sm">
                  Bootstrap your application
                </p>
              </div>
            </div>
          </header>

          <main className="flex-grow px-6 py-8 overflow-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-md">
                <div>
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input
                    id="projectName"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="demo"
                  />
                </div>

                <div>
                  <Label htmlFor="groupId">Group</Label>
                  <Input
                    id="groupId"
                    value={groupId}
                    onChange={(e) => setGroupId(e.target.value)}
                    placeholder="com.example"
                  />
                </div>

                <div className="col-span-2">
                  <Label>
                    Please select the service depend on please if it have
                  </Label>
                  <Popover
                    open={openProjectTypes}
                    onOpenChange={setOpenProjectTypes}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openProjectTypes}
                        className="w-full justify-between"
                      >
                        {selectedProjectTypes.length > 0
                          ? `${selectedProjectTypes.length} selected`
                          : "Select Service please..."}
                        <Check className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search project types..."
                          className="h-9"
                        />
                        <CommandEmpty>No Service found.</CommandEmpty>
                        <CommandGroup>
                          {springProjects.map((project) => (
                            <CommandItem
                              key={project.name}
                              onSelect={() => toggleProjectType(project.name)}
                            >
                              {project.name}
                              <Check
                                className={`ml-auto h-4 w-4 ${
                                  selectedProjectTypes.includes(project.name)
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-lg font-semibold">Dependencies</Label>
                  <Button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="bg-purple-500 hover:bg-purple-700 text-white "
                  >
                    ADD DEPENDENCIES
                  </Button>
                </div>

                {selectedDependencies.length === 0 ? (
                  <p className="text-gray-500 italic">No dependency selected</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {selectedDependencies.map((dep) => (
                      <Badge
                        key={dep}
                        variant="secondary"
                        className="flex items-center gap-1 px-3 py-1"
                      >
                        {dep}
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedDependencies((prev) =>
                              prev.filter((d) => d !== dep),
                            )
                          }
                          className="ml-1 hover:text-red-500"
                          aria-label={`Remove ${dep} dependency`}
                        >
                          <X className="h-3 w-3" aria-hidden="true" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-500 hover:bg-purple-700"
              >
                Generate Project
              </Button>
            </form>
          </main>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-600" aria-hidden="true" />
                Add Dependencies
              </DialogTitle>
            </DialogHeader>

            <div className="relative">
              <Search
                className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
              <Input
                placeholder="Search dependencies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <ScrollArea className="flex-1 mt-4">
              <div className="space-y-6">
                {Object.entries(groupedDependencies).map(([category, deps]) => (
                  <div key={category}>
                    <h3 className="text-sm font-semibold bg-green-500 text-white px-2 py-1 mb-2">
                      {category}
                    </h3>
                    <div className="space-y-2">
                      {deps.map((dep, index) => {
                        const depString = `${dep.scope === "runtime" ? "runtimeOnly" : dep.scope === "compile" ? "compileOnly" : dep.scope} '${dep.groupId}:${dep.artifactId}'`;
                        const isSelected =
                          selectedDependencies.includes(depString);
                        return (
                          <div
                            key={`${dep.scope}-${dep.groupId}-${dep.artifactId}-${index}`}
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${
                              isSelected ? "bg-primary/10" : "hover:bg-muted"
                            }`}
                            onClick={() => toggleDependency(dep)}
                            role="checkbox"
                            aria-checked={isSelected}
                            tabIndex={0}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">
                                {dep.name || `${dep.groupId}:${dep.artifactId}`}
                              </span>
                              <Plus
                                className={`h-4 w-4 ${
                                  isSelected
                                    ? "text-green-500 rotate-45"
                                    : "text-gray-400"
                                }`}
                                aria-hidden="true"
                              />
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              {dep.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1 font-mono">
                              {dep.scope === "runtime"
                                ? "runtimeOnly"
                                : dep.scope === "compile"
                                  ? "compileOnly"
                                  : dep.scope}{" "}
                              &#39;{dep.groupId}:{dep.artifactId}&#39;
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}
