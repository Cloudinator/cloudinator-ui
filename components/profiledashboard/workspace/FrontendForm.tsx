"use client";

import React, { useState } from "react";
import { AutomationToggle, FormField } from "./FormField";
import { Button } from "@/components/ui/button";
import { useCreateServiceDeploymentMutation } from "@/redux/api/projectApi";
import { Code, GitBranch, Globe, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FrontendFormProps {
  onClose: () => void;
  selectedWorkspace: string;
  data1: () => void;
}

interface ErrorResponse {
  status?: string;
  originalStatus?: number;
  data?: {
    message?: string;
  };
}

export function FrontendForm({
  onClose,
  selectedWorkspace,
  data1,
}: FrontendFormProps) {
  const { toast } = useToast();
  const [createServiceDeployment, { isLoading }] =
    useCreateServiceDeploymentMutation();

  const [projectFields, setProjectFields] = useState({
    name: "",
    branch: "main", // Default branch set to "main"
    gitUrl: "",
    subdomain: "",
    automate: false,
    token: "",
    type: "frontend",
  });

  // Helper function to sanitize input for all fields
  const sanitizeInput = (value: string) => {
    return value.replace(/\s+/g, "-").toLowerCase(); // Replace spaces with hyphens and make lowercase
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    // Apply sanitization to all fields except the branch field
    const sanitizedValue = name === "branch" ? value : sanitizeInput(value);

    setProjectFields((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : sanitizedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createServiceDeployment({
        name: projectFields.name,
        gitUrl: projectFields.gitUrl,
        branch: projectFields.branch,
        subdomain: projectFields.subdomain,
        workspaceName: selectedWorkspace,
        token: projectFields.token,
        type: "frontend",
      }).unwrap();

      // Success notification
      toast({
        title: "Success",
        description: `Frontend service deployment "${projectFields.name}" created successfully!`,
        variant: "success",
        duration: 3000,
      });

      console.log("Frontend service deployment created:", result);
      data1();
      onClose();
    } catch (err) {
      const error = err as ErrorResponse;

      console.log("Failed to create frontend service deployment:", error);

      // Error handling with toast notifications
      if (error?.status === "PARSING_ERROR" && error?.originalStatus === 200) {
        toast({
          title: "Success",
          description:
            error?.data?.message ||
            `Frontend service deployment "${projectFields.name}" created successfully!`,
          variant: "success",
          duration: 3000,
        });

        data1();
        onClose();
      } else {
        toast({
          title: "Error",
          description:
            error?.data?.message ||
            "Failed to create frontend service deployment. Please try again.",
          variant: "error",
          duration: 5000,
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 px-2 py-2 text-purple-600"
    >
      <FormField
        icon={Code}
        label="Project Name"
        name="name"
        value={projectFields.name}
        onChange={handleInputChange}
        className="border-purple-600 focus:border-purple-700"
      />

      <FormField
        icon={GitBranch}
        label="Branch"
        name="branch"
        value={projectFields.branch}
        onChange={handleInputChange}
        className="border-purple-600 focus:border-purple-700"
      />

      <FormField
        icon={Globe}
        label="Git URL"
        name="gitUrl"
        value={projectFields.gitUrl}
        onChange={handleInputChange}
        className="border-purple-600 focus:border-purple-700"
      />

      <FormField
        icon={Globe}
        label="Subdomain"
        name="subdomain"
        value={projectFields.subdomain}
        onChange={handleInputChange}
        className="border-purple-600 focus:border-purple-700"
      />

      <AutomationToggle
        checked={projectFields.automate}
        onCheckedChange={(checked) =>
          setProjectFields((prev) => ({ ...prev, automate: checked }))
        }
        token={projectFields.token}
        onTokenChange={handleInputChange}
      />

      <Button
        type="submit"
        className="w-full bg-purple-500 hover:bg-purple-700 focus:ring-2 focus:ring-purple-700 focus:ring-offset-2"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating...
          </>
        ) : (
          "Create Frontend Project"
        )}
      </Button>
    </form>
  );
}
