
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Setting Profile",
    description: "Cloudinator Application",
};

export default function SettingPage() {
    return (
        <>
            <div className="w-full h-screen grid place-content-center">
                <h1>This is Setting Profile</h1>
            </div>
        </>
    );
}
