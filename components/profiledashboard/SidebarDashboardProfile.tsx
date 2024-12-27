"use client"

import { Home, Settings, Terminal} from 'lucide-react'
import Link from 'next/link'
import {useParams, usePathname} from 'next/navigation'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import Image from "next/image";
import {useGetWorkspacesQuery} from "@/redux/api/projectApi";
import {useGetMeQuery} from "@/redux/api/userApi";
import { ModeToggle } from '../ModeToggle';

export function SidebarDashboardProfile() {
    const pathname = usePathname();
    const { data: userData } = useGetMeQuery();

    const params = useParams();
    const username = params?.username || userData?.username;

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: Home },
        { name: 'Workspace', href: '/workspace', icon: Terminal },
        { name: 'Setting', href: `/setting/${username}`, icon: Settings },
    ]

    const {data} = useGetWorkspacesQuery();

    console.log(data);

    return (
        <Sidebar className={`flex flex-col h-full w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700`}>
            <SidebarHeader className="border-b p-3">
                <Link href="/" className="flex items-center gap-2 font-semibold text-purple-500">
                    <Image
                        src="/logo.png"
                        alt="cloudinator logo"
                        width={50}
                        height={50}
                    />
                    <span>Cloudinator</span>
                </Link>
            </SidebarHeader>
            <SidebarContent className="flex-grow justify-between p-2">
                <SidebarGroup>
                    <SidebarGroupLabel>Dashboard Features</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navigation.map((item) => (
                                <SidebarMenuItem key={item.name}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.href}
                                    >
                                        <Link
                                            href={item.href}
                                            className={`flex items-center gap-4 p-3 rounded-lg transition-colors duration-200 mb-2 ${
                                                pathname === item.href
                                                    ? 'text-purple-500 font-bold bg-gray-100 dark:bg-gray-700'
                                                    : 'text-gray-700 hover:bg-gray-100 hover:dark:bg-gray-700'
                                            }`}
                                        >
                                            <item.icon
                                                className={`h-5 w-5 ${
                                                    pathname === item.href
                                                        ? 'text-purple-500'
                                                        : 'text-gray-700 dark:text-gray-300'
                                                }`}
                                            />
                                            <span className="text-lg dark:text-gray-300">{item.name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <ModeToggle />
            </SidebarContent>
        </Sidebar>
    );
}