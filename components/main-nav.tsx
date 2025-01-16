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

    const navItems: NavItem[] = [
        { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { title: "Workspace", href: "/workspace", icon: Plus },
        { title: "Settings", href: `/setting/${username}`, icon: Cog },
    ];

    return (
        <TooltipProvider delayDuration={0}>
            <nav className="flex flex-col gap-2 p-2">
                {navItems.map((item, index) => (
                    <Tooltip key={index}>
                        <TooltipTrigger asChild>
                            <Link
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                                    pathname === item.href
                                        ? "bg-purple-600 text-white" // Custom purple background and white text for active state
                                        : "text-gray-700 hover:bg-purple-500 hover:text-white", // Custom purple hover state
                                    isCollapsed ? "justify-center" : "justify-start"
                                )}
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
                    </Tooltip>
                ))}
            </nav>
        </TooltipProvider>
    );
}