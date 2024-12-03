import type {Metadata} from "next";
import Workspace from "@/components/profiledashboard/workspace/Workspace";

export const metadata: Metadata = {
    title: "Workspace Profile",
    description: "Cloudinator Application",
};

export default function WorkspacePage() {
    return (
        <>
            <Workspace />
        </>
    );
}
