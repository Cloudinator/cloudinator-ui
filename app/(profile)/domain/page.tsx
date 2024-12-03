
import type {Metadata} from "next";
import Domain from "@/components/profiledashboard/domain/Domain";

export const metadata: Metadata = {
    title: "Domain Profile",
    description: "Cloudinator Application",
};

export default function DomainPage() {
    return (
        <>
            <Domain />
        </>
    );
}
