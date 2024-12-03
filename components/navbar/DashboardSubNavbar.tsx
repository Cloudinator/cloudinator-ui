"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Use usePathname instead of useRouter

const DashboardSubNavbar = () => {
    const pathname = usePathname(); // Get the current path
    const navItems = [
        { name: 'Account', href: '/setting/account' },
        { name: 'Notification', href: '/setting/notification' },
        { name: 'Billing', href: '/setting/billing' },
        { name: 'Team', href: '/setting/team' },
        { name: 'Integration', href: '/setting/integration' },
    ];

    return (
        <div className="border-b bg-white">
            <div className="flex items-center justify-between px-8 py-3">
                <nav className="flex items-center space-x-8">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <button
                                className={`font-medium ${
                                    pathname === item.href ? 'text-purple-500' : 'text-gray-600'
                                }`}
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