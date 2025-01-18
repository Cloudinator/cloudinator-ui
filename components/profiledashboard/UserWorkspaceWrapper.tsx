"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useGetWorkspacesQuery } from "@/redux/api/projectApi";
import Loading from "../Loading";
import Lottie from "lottie-react";
import LoadingMissile from "@/public/LoadingMissile.json";
// import { useToast } from "@/hooks/use-toast";

export default function UserWorkspaceWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isLoading } = useGetWorkspacesQuery();
  const router = useRouter();
  //   const {toast} = useToast();

  // Redirect logic for no workspaces
  useEffect(() => {
    if (!isLoading && data && data.length === 0) {
      // Show a toast notification
      //   toast({
      //     title: "No Workspace Found",
      //     description: "You must create a workspace before accessing this page.",
      //     variant: "destructive", // Use a destructive variant for emphasis
      //     duration: 5000, // Display for 5 seconds
      //   });
      router.push("/no-workspace");
    }
  }, [data, isLoading, router]);

  // Show a loading state while fetching user data
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          {/* Replace Loader2 with Lottie animation */}
          <Lottie
            animationData={LoadingMissile} // Pass the JSON animation
            loop={true} // Make the animation loop
            style={{ width: 64, height: 64 }} // Set the size of the animation
          />
          <Loading />
        </div>
      </div>
    );
  }

  // Render children if user data is available and has workspaces
  return <>{children}</>;
}