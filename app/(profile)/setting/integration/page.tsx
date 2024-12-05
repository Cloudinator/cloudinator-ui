
import type {Metadata} from "next";
import Integrations from "@/components/profiledashboard/setting/Integration";

export const metadata: Metadata = {
    title: "Billing Profile",
    description: "Cloudinator Application",
};

export default function IntegrationsPage() {
    return (
        <>
            <Integrations />
        </>
    );
}
