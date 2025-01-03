"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { useCreateSubWorkspaceMutation } from "@/redux/api/projectApi";
import { Share2 } from "lucide-react";
import { FormField } from "@/components/profiledashboard/workspace/FormField";
import {useToast} from "@/hooks/use-toast";

interface SubworkspaceFormProps {
  onClose: () => void;
  selectedWorkspace: string;
  data2: () => void;
}

interface ErrorResponse {
  status?: string;
  originalStatus?: number;
  data?: {
    message?: string;
  };
}

export function SubworkspaceForm({
  onClose,
  selectedWorkspace,
  data2,
}: SubworkspaceFormProps) {
  const {toast} = useToast();
  const [createSubWorkspace] = useCreateSubWorkspaceMutation();
  const [projectFields, setProjectFields] = useState({
    name: "",
  });

  // Helper function to sanitize input for consistency
  const sanitizeInput = (value: string) => {
    return value.replace(/\s+/g, "-").toLowerCase(); // Replace spaces with hyphens and convert to lowercase
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Sanitize the input before setting state
    const sanitizedValue = sanitizeInput(value);

    setProjectFields((prev) => ({ ...prev, [name]: sanitizedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSubWorkspace({
        name: projectFields.name,
        workspaceName: selectedWorkspace,
      }).unwrap();

      toast({
        title: "Success",
        description: `Subworkspace "${projectFields.name}" created successfully!`,
        variant: "success",
        duration: 3000,
      });

      data2();
      onClose();

    } catch (err) {

      const error = err as ErrorResponse

      if (error?.status === 'PARSING_ERROR' && error?.originalStatus === 200) {

        toast({
          title: "Success",
          description: error?.data?.message  || `Subworkspace "${projectFields.name}" created successfully!`,
          variant: "success",
          duration: 3000,
        });

        data2();
        onClose();
      } else {

        toast({
          title: "Error",
          description: error?.data?.message || "Failed to create subworkspace. Please try again.",
          variant: "error",
          duration: 5000,
        });
      }
      console.log("Create subworkspace response:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-2 py-2 text-purple-600">
      <FormField
        icon={Share2}
        label="Subworkspace Name"
        name="name"
        value={projectFields.name}
        onChange={handleInputChange}
        className={""}
      />
      <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-700 focus:ring-2 focus:ring-purple-700 focus:ring-offset-2">
        Create Subworkspace
      </Button>
    </form>
  );
}
