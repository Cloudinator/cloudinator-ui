
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Workspace Profile",
    description: "Cloudinator Application",
};

export default function WorkspacePage() {
    return (
        <>
            <div className="w-full h-screen grid place-content-center">
                <h1>This is Workspace Profile</h1>
            </div>
        </>
    );
}
