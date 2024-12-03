
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Domain Profile",
    description: "Cloudinator Application",
};

export default function DomainPage() {
    return (
        <>
            <div className="w-full h-screen grid place-content-center">
                <h1>This is Domain Profile</h1>
            </div>
        </>
    );
}
