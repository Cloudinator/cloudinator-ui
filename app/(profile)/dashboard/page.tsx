import type {Metadata} from "next";
import DashboardPage from "@/components/profiledashboard/dashboard/DashboardPage";
import Loading from "@/components/Loading";
import { Suspense } from "react";
import UserDataWrapper from "@/components/profiledashboard/UserDataWrapper";

export const metadata: Metadata = {
    title: "Dashboard Profile",
    description: "Cloudinator Application",
};

export default function Dashboards() {
    return (
        <>
            <Suspense fallback={<Loading />}>
              <UserDataWrapper>
                  <DashboardPage />
              </UserDataWrapper>
            </Suspense>
        </>
    );
}
