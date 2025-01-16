
import type {Metadata} from "next";
import Deployments from "@/components/profiledashboard/deployment/DeploymentPage";

export const metadata: Metadata = {
    title: "Deployment Profile",
    description: "Cloudinator Application",
};

export default function DeploymentPage() {
    return (
        <>
            <Deployments />
        </>
    );
}
