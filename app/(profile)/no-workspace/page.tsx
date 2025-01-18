"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useGetWorkspacesQuery } from "@/redux/api/projectApi";

export default function NoWorkspacePage() {
  const router = useRouter();
  const { data, isLoading } = useGetWorkspacesQuery();

  // Redirect to dashboard if the user creates a workspace
  useEffect(() => {
    if (!isLoading && data && data.length > 0) {
      router.push("/dashboard");
    }
  }, [data, isLoading, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-purple-600 dark:text-purple-400">
          No Workspace Found
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 pb-6">
          You must create a workspace to access this page.
        </p>
        <Link href="/dashboard">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white p-6 text-md">
            Create a Workspace
          </Button>
        </Link>
      </div>
    </div>
  );
}