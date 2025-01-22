/*************  ✨ Codeium Command 🌟  *************/
"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Cog, LayoutDashboard, Plus } from "lucide-react";
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

    // Function to check if the current path matches the item's href
    const isActive = (href: string) => {
        return pathname.startsWith(href); // Check if the pathname starts with the href
    };

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
                                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors group", // Added `group` for parent hover state
                                        isActive(item.href)
                                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" // Active state with gradient
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500", // Default and hover state with gradient
                                        isCollapsed ? "justify-center" : "justify-start",
                                        isDisabled && "opacity-50 cursor-not-allowed" // Reduce opacity and disable pointer events if no workspace
                                    )}
                                    onClick={(e) => {
                                        if (isDisabled) {
                                            e.preventDefault(); // Prevent navigation if disabled
                                        }
                                    }}
                                >
                                    <item.icon
                                        className={cn(
                                            "flex-shrink-0",
                                            isCollapsed ? "h-6 w-6" : "h-5 w-5",
                                            isActive(item.href)
                                                ? "text-white" // Active icon color
                                                : "text-purple-500 dark:text-purple-400 group-hover:text-white group-hover:transition-all group-hover:duration-300 group-hover:ease-in-out" // Default icon color with group hover effect
                                        )}
                                    />
                                    {!isCollapsed && (
                                        <span className="flex-grow group-hover:text-white">
                      {item.title}
                    </span>
                                    )}
                                </Link>
                            </TooltipTrigger>
                            {isCollapsed && (
                                <TooltipContent
                                    side="right"
                                    className="flex items-center gap-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                                >
                                    {item.title}
                                </TooltipContent>
                            )}
                            {isDisabled && (
                                <TooltipContent
                                    side="right"
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                                >
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