
import type {Metadata} from "next";
import ProjectDetail from "@/components/profiledashboard/deployment/DeploymentDetail";

export const metadata: Metadata = {
    title: "Deployment Profile",
    description: "Cloudinator Application",
};

export default function DeploymentPage() {
    return (
        <>
            <ProjectDetail />
        </>
    );
}
