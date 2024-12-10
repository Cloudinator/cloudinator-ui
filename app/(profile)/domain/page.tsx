import type { Metadata } from "next";
import { DomainStats } from "@/components/profiledashboard/domain/DomainStats";
import { DomainTable } from "@/components/profiledashboard/domain/DomainTable";
import { Globe } from "lucide-react";

export const metadata: Metadata = {
    title: "Domain Profile",
    description: "Cloudinator Application",
};

export default function DomainPage() {
    return (
        <div className="container mx-auto p-6 space-y-6 bg-white dark:bg-gray-900"> {/* Background color for light and dark mode */}
            <div className="flex items-center space-x-2">
                <Globe className="h-8 w-8 text-purple-500" />
                <h1 className="text-3xl font-bold tracking-tight text-purple-500">
                    Domains
                </h1>
            </div>

            <DomainStats />

            <div className="rounded-lg border bg-card dark:bg-gray-800"> {/* Background for the table area */}
                <DomainTable />
            </div>
        </div>
    );
}