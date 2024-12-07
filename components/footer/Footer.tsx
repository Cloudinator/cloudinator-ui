"use client";

import Image from "next/image"
import Link from "next/link"

export default function Footer() {
    const navigation = {
        service: [
            { name: 'Cloud Storage', href: '#' },
            { name: 'Private Git Server', href: '#' },
            { name: 'Auto Deploy', href: '#' },
            { name: 'Microservice', href: '#' },
        ],
        deployment: [
            { name: 'Frontend', href: '#' },
            { name: 'Backend', href: '#' },
            { name: 'Database', href: '#' },
            { name: 'Microservice', href: '#' },
        ],
        explore: [
            { name: 'Technical Service', href: '#' },
            { name: 'Documentation', href: 'https://cloudinator-doc-vercel.vercel.app/' },
            { name: 'Tool Building', href: '#' },
            { name: 'About Us', href: '/about' },
        ],
    }

    return (
        <footer className="bg-white dark:bg-gray-800">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">

                    {/* Logo */}
                    <div className="lg:col-span-1">
                        <h1 className="text-purple-500 text-xl">Cloudinator</h1>
                        <Image
                            src="/logo.png"
                            alt="Company Logo"
                            width={150}
                            height={150}
                            className="h-28 w-auto"
                        />
                    </div>

                    {/* Service Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-purple-600 dark:text-purple-300">Service</h3>
                        <ul role="list" className="mt-4 space-y-2">
                            {navigation.service.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 hover:dark:text-gray-100">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Deployment Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-purple-600 dark:text-purple-300">Deployment</h3>
                        <ul role="list" className="mt-4 space-y-2">
                            {navigation.deployment.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 hover:dark:text-gray-100">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Explore Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-purple-600 dark:text-purple-300">Explore</h3>
                        <ul role="list" className="mt-4 space-y-2">
                            {navigation.explore.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 hover:dark:text-gray-100">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Sponsors */}
                    <div>
                        <h3 className="text-sm font-semibold text-purple-600 dark:text-purple-300">Our Sponsor</h3>
                        <div className="mt-4 flex flex-col space-y-4">
                            {/* Different images for each sponsor */}
                            <Image
                                src="/mptc.png" // First sponsor image
                                alt="Sponsor 1"
                                width={100}
                                height={40}
                                className="h-8 w-auto mx-auto"
                            />
                            <Image
                                src="/cbrd.png" // Second sponsor image
                                alt="Sponsor 2"
                                width={100}
                                height={40}
                                className="h-8 w-auto mx-auto"
                            />
                            <Image
                                src="/istad.png" // Third sponsor image
                                alt="Sponsor 3"
                                width={100}
                                height={40}
                                className="h-8 w-auto mx-auto"
                            />
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
                    <p className="text-sm text-gray-600 text-center dark:text-gray-300">
                        © 2024 Your DevOps Platform by CSTAD. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}