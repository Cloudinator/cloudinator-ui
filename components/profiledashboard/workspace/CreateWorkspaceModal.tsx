"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Zap, Loader2 } from 'lucide-react';
import { useCreateWorkspaceMutation, useGetWorkspacesQuery } from "@/redux/api/projectApi";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface ErrorResponse {
    status?: string;
    originalStatus?: number;
    data?: {
        message?: string;
    };
}

export function CreateWorkspaceModal() {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [workspaceName, setWorkspaceName] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const { data } = useGetWorkspacesQuery();

    const [createWorkspace] = useCreateWorkspaceMutation();

    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus();
        }
    }, [open]);

    const handleCreateWorkspace = async () => {
        // Early return if workspace name is empty
        if (!workspaceName.trim()) {
            return;
        }
    
        setIsCreating(true);
        const formattedWorkspaceName = workspaceName.trim().replace(/\s+/g, '-');
    
        try {
            // Attempt to create the workspace
            const results = await createWorkspace({ name: formattedWorkspaceName }).unwrap();
    
            // Show success toast
            toast({
                title: "Success",
                description: `Workspace "${formattedWorkspaceName}" created successfully!`,
                variant: "default", // shadcn uses "default" for success
                duration: 3000,
            });
    
            console.log(results);
        } catch (err) {
            const error = err as ErrorResponse;
    
            console.error("Error creating workspace:", error);
    
            // Handle specific parsing error case
            if (error?.status === "PARSING_ERROR" || error?.originalStatus === 200) {
                toast({
                    title: "Success",
                    description: `Workspace "${formattedWorkspaceName}" created successfully!`,
                    variant: "success", // shadcn uses "default" for success
                    duration: 3000,
                });
            } else {
                // Show error toast for other errors
                toast({
                    title: "Error",
                    description: error?.data?.message || "Failed to create workspace. Please try again.",
                    variant: "error", // shadcn uses "destructive" for errors
                    duration: 5000,
                    action: (
                        <ToastAction altText="Try again" onClick={() => handleCreateWorkspace()}>
                            Try again
                        </ToastAction>
                    ), // Optional: Add a retry action
                });
            }
        } finally {
            // Reset state
            setWorkspaceName("");
            setOpen(false);
            setIsCreating(false);
        }
    };

    if (!data) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className="bg-purple-500 text-primary-foreground hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={data && data.length > 0}
                >
                    <Zap className="mr-2 h-4 w-4" />
                    Create Workspace
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Workspace</DialogTitle>
                    <DialogDescription>
                        Enter a name for your new workspace and bring your ideas to life.
                    </DialogDescription>
                </DialogHeader>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="py-4"
                >
                    <Input
                        ref={inputRef}
                        value={workspaceName}
                        onChange={(e) => setWorkspaceName(e.target.value)}
                        className="w-full"
                        placeholder="My Awesome Workspace"
                    />
                    <AnimatePresence>
                        {workspaceName && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-2 text-sm text-muted-foreground"
                            >
                                Great name! Your workspace is going to be amazing.
                            </motion.p>
                        )}
                    </AnimatePresence>
                </motion.div>
                <DialogFooter>
                    <Button
                        onClick={handleCreateWorkspace}
                        className="w-full bg-purple-500 hover:bg-purple-800"
                        disabled={!workspaceName.trim() || isCreating}
                    >
                        {isCreating ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            <>
                                <Zap className="mr-2 h-4 w-4" />
                                Create Workspace
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}