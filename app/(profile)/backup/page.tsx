
import type {Metadata} from "next";
import {ServiceDropdown} from "@/components/profiledashboard/workspace/ServiceDropdown";

export const metadata: Metadata = {
    title: "Backup Profile",
    description: "Cloudinator Application",
};

export default function BackupPage() {
    return (
        <>
            <div className="min-h-screen bg-background p-4 md:p-8">
                <div className="mx-auto max-w-2xl space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold">Select Services</h1>
                        <p className="text-muted-foreground">
                            Choose the services you want to use
                        </p>
                    </div>
                    <ServiceDropdown/>
                </div>
            </div>
        </>
    );
}
