
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Dashboard Profile",
    description: "Cloudinator Application",
};

export default function DashboardPage() {
    return (
        <>
            <div className="w-full h-screen grid place-content-center">
                <h1>This is Dashboard Overview Profile</h1>
            </div>
        </>
    );
}
