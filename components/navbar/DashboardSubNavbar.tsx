"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import SignOutModal from "@/components/profiledashboard/setting/SignOutModal";


const DashboardSubNavbar = () => {
    const pathname = usePathname();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navItems = [
        { name: 'Account', href: '/setting/account' },
        { name: 'Notification', href: '/setting/notification' },
        { name: 'Billing', href: '/setting/billing' },
        { name: 'Team', href: '/setting/team' },
        { name: 'Integration', href: '/setting/integration' },
    ];

    return (
        <>
            <div className="flex justify-between border-b bg-white dark:bg-gray-800">
                <div className="flex items-center justify-between px-8 py-3">
                    <nav className="flex items-center space-x-8 py-3">
                        {navItems.map((item) => (
                            <Link key={item.href} href={item.href}>
                                <button
                                    className={`font-medium ${
                                        pathname === item.href ? 'text-purple-500 dark:text-purple-300' : 'text-gray-600 dark:text-gray-200'
                                    } hover:text-purple-700 dark:hover:text-purple-400 transition duration-200`}
                                >
                                    {item.name}
                                </button>
                            </Link>
                        ))}
                    </nav>
                </div>
                {/* Logout Button */}
                <div className="flex px-8 py-5">
                    <Button
                        className="bg-red-500 hover:bg-red-700"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Logout
                    </Button>
                </div>
            </div>

            {/* Sign Out Modal */}
            <SignOutModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default DashboardSubNavbar;