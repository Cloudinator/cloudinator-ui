"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Cog, LayoutDashboard, Plus } from 'lucide-react';
import { cn } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetMeQuery } from "@/redux/api/userApi";
import { useGetWorkspacesQuery } from "@/redux/api/projectApi";

type NavItem = {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
};

interface MainNavProps {
    isCollapsed: boolean;
}

export function MainNav({ isCollapsed }: MainNavProps) {
    const pathname = usePathname();
    const params = useParams();
    const { data: userData } = useGetMeQuery();
    const username = params?.username || userData?.username;

    const { data: workspaces } = useGetWorkspacesQuery();
    const hasWorkspace = workspaces && workspaces.length > 0;

    const navItems: NavItem[] = [
        { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { title: "Workspace", href: "/workspace", icon: Plus },
        { title: "Settings", href: `/setting/${username}`, icon: Cog },
    ];

    return (
        <TooltipProvider delayDuration={0}>
            <nav className="flex flex-col gap-2 p-2">
                {navItems.map((item, index) => {
                    // Disable non-Dashboard links if no workspace exists
                    const isDisabled = item.href === "/workspace" && !hasWorkspace;

                    return (
                        <Tooltip key={index}>
                            <TooltipTrigger asChild>
                                <Link
                                    href={isDisabled ? "#" : item.href} // Disable link if no workspace
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                                        pathname === item.href
                                            ? "bg-purple-600 text-white" // Active state
                                            : "text-gray-700 dark:text-gray-100 hover:bg-purple-500 hover:text-white", // Default and hover state
                                        isCollapsed ? "justify-center" : "justify-start",
                                        isDisabled && "opacity-50 cursor-not-allowed" // Reduce opacity and disable pointer events if no workspace
                                    )}
                                    onClick={(e) => {
                                        if (isDisabled) {
                                            e.preventDefault(); // Prevent navigation if disabled
                                        }
                                    }}
                                >
                                    <item.icon className={cn("flex-shrink-0", isCollapsed ? "h-6 w-6" : "h-5 w-5")} />
                                    {!isCollapsed && (
                                        <span className="flex-grow">{item.title}</span>
                                    )}
                                </Link>
                            </TooltipTrigger>
                            {isCollapsed && (
                                <TooltipContent side="right" className="flex items-center gap-4 bg-purple-500">
                                    {item.title}
                                </TooltipContent>
                            )}
                            {isDisabled && (
                                <TooltipContent side="right" className="bg-purple-500 text-white">
                                    Create a workspace to access this page.
                                </TooltipContent>
                            )}
                        </Tooltip>
                    );
                })}
            </nav>
        </TooltipProvider>
    );
}