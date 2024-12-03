import Workspace from "@/components/profiledashboard/workspace/Workspace";
import type {Metadata} from "next";

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
