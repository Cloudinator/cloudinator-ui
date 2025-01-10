"use client"

import { Home, Settings, Terminal, Menu, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
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
import Image from "next/image"
import { useGetWorkspacesQuery } from "@/redux/api/projectApi"
import { useGetMeQuery } from "@/redux/api/userApi"
import { ModeToggle } from '../ModeToggle'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useState, useEffect } from 'react'

export function SidebarDashboardProfile() {
    const pathname = usePathname()
    const { data: userData } = useGetMeQuery()
    const params = useParams()
    const username = params?.username || userData?.username
    const [isOpen, setIsOpen] = useState(false) // For mobile sidebar
    const [isSidebarOpen, setIsSidebarOpen] = useState(true) // For desktop sidebar

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: Home },
        { name: 'Workspace', href: '/workspace', icon: Terminal },
        { name: 'Setting', href: `/setting/${username}`, icon: Settings },
    ]

    const { data } = useGetWorkspacesQuery()

    console.log(data)

    // Persist sidebar state in localStorage
    useEffect(() => {
        const savedState = localStorage.getItem('sidebarOpen')
        if (savedState !== null) {
            setIsSidebarOpen(savedState === 'true')
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('sidebarOpen', isSidebarOpen.toString())
    }, [isSidebarOpen])

    return (
        <>
            {/* Mobile Sidebar Toggle */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" className="fixed top-4 left-4 z-50 lg:hidden">
                        <Menu className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                    <Sidebar className="flex flex-col h-full w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700">
                        <SidebarHeader className="border-b p-4">
                            <Link href="/" className="flex items-center gap-3 font-semibold text-purple-500">
                                {/* Hide image on mobile */}
                                <div className="sm:hidden">
                                    <Image
                                        src="/logo.png"
                                        alt="cloudinator logo"
                                        width={50}
                                        height={50}
                                    />
                                </div>
                                <span>Cloudinator</span>
                            </Link>
                        </SidebarHeader>
                        <SidebarContent className="flex-grow justify-between p-3">
                            <SidebarGroup>
                                <SidebarGroupLabel className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Dashboard Features
                                </SidebarGroupLabel>
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
                                                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${pathname === item.href
                                                                ? 'text-purple-500 font-bold bg-gray-100 dark:bg-gray-700'
                                                                : 'text-gray-700 hover:bg-gray-100 hover:dark:bg-gray-700'
                                                            }`}
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        <item.icon
                                                            className={`h-5 w-5 ${pathname === item.href
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
                            {/* Centered ModeToggle */}
                            <div className="flex justify-center p-4">
                                <ModeToggle />
                            </div>
                        </SidebarContent>
                    </Sidebar>
                </SheetContent>
            </Sheet>

            {/* Desktop Sidebar */}
            <div className="hidden lg:flex">
                {/* Sidebar */}
                <div
                    className={`flex flex-col h-full bg-white dark:bg-gray-800 border-r dark:border-gray-700 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'
                        }`}
                >
                    <SidebarHeader className="border-b p-3">
                        <div className="flex items-center justify-between">
                            <Link href="/" className="flex items-center gap-2 font-semibold text-purple-500">
                                <Image
                                    src="/logo.png"
                                    alt="cloudinator logo"
                                    width={50}
                                    height={50}
                                />
                                {isSidebarOpen && <span>Cloudinator</span>}
                            </Link>
                            {/* Toggle Button */}
                            <Button
                                variant="outline"
                                size="sm"
                                className="p-2"
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            >
                                <ChevronLeft className={`h-4 w-4 transition-transform ${isSidebarOpen ? '' : 'rotate-180'}`} />
                            </Button>
                        </div>
                    </SidebarHeader>
                    <SidebarContent className="flex-grow justify-between p-2">
                        <SidebarGroup>
                            {isSidebarOpen}
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
                                                    className={`flex items-center gap-4 p-3 rounded-lg transition-colors duration-200 mb-2 ${pathname === item.href
                                                            ? 'text-purple-500 font-bold bg-gray-100 dark:bg-gray-700'
                                                            : 'text-gray-700 hover:bg-gray-100 hover:dark:bg-gray-700'
                                                        }`}
                                                >
                                                    <item.icon
                                                        className={`h-5 w-5 ${pathname === item.href
                                                                ? 'text-purple-500'
                                                                : 'text-gray-700 dark:text-gray-300'
                                                            }`}
                                                    />
                                                    {isSidebarOpen && (
                                                        <span className="text-lg dark:text-gray-300">{item.name}</span>
                                                    )}
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>

                    </SidebarContent>
                    <div className="flex justify-center p-4">
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </>
    )
}