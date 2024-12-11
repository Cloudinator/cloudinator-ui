import type {Metadata} from "next";
import Service from "@/components/profiledashboard/workspace/service/Service";

export const metadata: Metadata = {
    title: "Service Profile",
    description: "Cloudinator Application",
};

export default function ServicePage() {
    return (
        <>
            <Service />
        </>
    );
}
