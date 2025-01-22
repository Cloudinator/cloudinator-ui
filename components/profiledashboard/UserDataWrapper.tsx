"use client";

import { useGetMeQuery } from "@/redux/api/userApi";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Loading from "../Loading";
import Lottie from "lottie-react";
import LoadingMissile from "@/public/LoadingMissile.json";

export default function UserDataWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isLoading, isError } = useGetMeQuery();
  const router = useRouter();

  // Redirect logic for expired token
  useEffect(() => {
    if (!isLoading && isError) {
      // Assuming isError indicates an expired token
      router.push("/expired-token");
    }
  }, [data, isLoading, isError, router]);

  // Show a loading state while fetching user data
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <Lottie
              animationData={LoadingMissile} // Pass the JSON animation
              loop={true} // Make the animation loop
              style={{ width: 72, height: 72 }} // Set the size of the animation
          />
          <Loading />
        </div>
      </div>
    );
  }

  // Render children if user data is available
  return <>{children}</>;
}
