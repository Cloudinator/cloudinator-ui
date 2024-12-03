
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Deployment Profile",
    description: "Cloudinator Application",
};

export default function DeploymentPage() {
    return (
        <>
            <div className="w-full h-screen grid place-content-center">
                <h1>This is Deployment Profile</h1>
            </div>
        </>
    );
}
