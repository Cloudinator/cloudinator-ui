import type {Metadata} from "next";
import Service from "@/components/profiledashboard/workspace/service/Service";
import UserDataWrapper from "@/components/profiledashboard/UserDataWrapper";
import UserWorkspaceWrapper from "@/components/profiledashboard/UserWorkspaceWrapper";

export const metadata: Metadata = {
    title: "Service Profile",
    description: "Cloudinator Application",
};

export default function ServicePage() {
    return (
        <>
            <UserDataWrapper>
                <UserWorkspaceWrapper>
                    <Service />
                </UserWorkspaceWrapper>
            </UserDataWrapper>
        </>
    );
}
