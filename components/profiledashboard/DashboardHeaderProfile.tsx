import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Search, Settings, LogOut } from 'lucide-react';
import Link from "next/link";
import Image from "next/image";

const DashboardHeaderProfile = () => {
    const profileImage = "/ben.png";

    return (
        <div className="border-b p-2 sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
            <div className="flex h-14 items-center px-4">
                {/* Search bar */}
                <div className="flex-1 flex items-center max-w-xl">
                    <div className="relative w-full">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search deployments..."
                            className="pl-8 w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200" // Background color for light and dark modes
                        />
                    </div>
                </div>

                {/* Right side items */}
                <div className="ml-auto flex items-center space-x-4">
                    {/* Notifications */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative" size="icon">
                                <Bell className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-64">
                            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <div className="flex flex-col space-y-1">
                                    <span>New deployment completed</span>
                                    <span className="text-xs text-muted-foreground">5 minutes ago</span>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <div className="flex flex-col space-y-1">
                                    <span>Traffic spike detected</span>
                                    <span className="text-xs text-muted-foreground">1 hour ago</span>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Profile */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="relative h-8 w-8 rounded-full overflow-hidden bg-gray-500">
                                <Image
                                    src={profileImage}
                                    alt="Profile"
                                    width={32}
                                    height={32}
                                    className="rounded-full object-cover"
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>User Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {/* Uncomment if you want to add a profile link */}
                            {/*<DropdownMenuItem>*/}
                            {/*    <User className="mr-2 h-4 w-4" />*/}
                            {/*    Profile*/}
                            {/*</DropdownMenuItem>*/}
                            <DropdownMenuItem asChild>
                                <Link href="/setting/account" className="flex items-center">
                                    <Settings className="mr-2 h-4 w-4" />
                                    Setting
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/logout" className="flex items-center">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
};

export default DashboardHeaderProfile;