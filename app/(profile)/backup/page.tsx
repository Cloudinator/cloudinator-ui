
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Backup Profile",
    description: "Cloudinator Application",
};

export default function BackupPage() {
    return (
        <>
            <div className="w-full h-screen grid place-content-center">
                <h1>This is Backup Profile</h1>
            </div>
        </>
    );
}
