"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DashboardSubNavbar = () => {
    const pathname = usePathname();
    const navItems = [
        { name: 'Account', href: '/setting/account' },
        { name: 'Notification', href: '/setting/notification' },
        { name: 'Billing', href: '/setting/billing' },
        { name: 'Team', href: '/setting/team' },
        { name: 'Integration', href: '/setting/integration' },
    ];

    return (
        <div className="border-b bg-white dark:bg-gray-800">
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
        </div>
    );
};

export default DashboardSubNavbar;