
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "User Profile",
    description: "Cloudinator Application",
};

export default function UserPage() {
    return (
        <>
            <div className="w-full h-screen grid place-content-center">
                <h1>This is User Profile</h1>
            </div>
        </>
    );
}
