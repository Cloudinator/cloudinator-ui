"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../Loading";
import { Loader2 } from "lucide-react";
import { useGetWorkspacesQuery } from "@/redux/api/projectApi";
import { useToast } from "@/hooks/use-toast";

export default function UserWorkspaceWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isLoading } = useGetWorkspacesQuery();
  const router = useRouter();
  const {toast} = useToast();

  // Redirect logic for no workspaces
  useEffect(() => {
    if (!isLoading && data && data.length === 0) {
      // Show a toast notification
      toast({
        title: "No Workspace Found",
        description: "You must create a workspace before accessing this page.",
        variant: "destructive", // Use a destructive variant for emphasis
        duration: 5000, // Display for 5 seconds
      });
      router.push("/dashboard");
    }
  }, [data, isLoading, router]);

  // Show a loading state while fetching user data
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
          <Loading />
        </div>
      </div>
    );
  }

  // Render children if user data is available and has workspaces
  return <>{children}</>;
}