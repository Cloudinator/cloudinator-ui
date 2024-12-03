"use client"

import { BarChart, Globe, Home, Settings, Terminal, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Workspace', href: '/workspace', icon: Terminal },
    { name: 'Backup', href: '/backup', icon: BarChart },
    { name: 'Domain', href: '/domain', icon: Globe },
    { name: 'User', href: '/user', icon: User },
    { name: 'Deployment', href: '/deployment', icon: Globe },
    { name: 'Setting', href: '/setting/account', icon: Settings },
]

export function SidebarDashboardProfile() {
    const pathname = usePathname()

    return (
        <Sidebar>
            <SidebarHeader className="border-b p-4">
                <Link href="/" className="flex items-center gap-2 font-semibold text-purple-500">
                    <Terminal className="h-6 w-6 text-purple-500" />
                    <span>Cloudinator</span>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    {/* <SidebarGroupLabel>Navigation</SidebarGroupLabel> */}
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
                                            className={`flex items-center gap-2 ${
                                                pathname === item.href
                                                    ? 'text-purple-500 font-bold'
                                                    : 'text-gray-700'
                                            }`}
                                        >
                                            <item.icon
                                                className={`h-4 w-4 ${
                                                    pathname === item.href
                                                        ? 'text-purple-500'
                                                        : 'text-gray-700 '
                                                }`}
                                            />
                                            <span>{item.name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
