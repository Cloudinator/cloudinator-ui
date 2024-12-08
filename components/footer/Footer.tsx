'use client'

import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Separator } from "@/components/ui/separator"

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

const sponsors = [
    { name: 'MPTC', src: '/mptc.png' },
    { name: 'CBRD', src: '/cbrd.png' },
    { name: 'ISTAD', src: '/istad.png' },
]

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-800">
            <Container fullWidth>
                <div className=" container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-12">
                        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
                            {/* Logo */}
                            <div className="col-span-2 md:col-span-1">
                                <h2 className="text-purple-500 text-xl font-bold mb-4">Cloudinator</h2>
                                <Image
                                    src="/logo.png"
                                    alt="Cloudinator Logo"
                                    width={150}
                                    height={150}
                                    className="h-28 w-auto"
                                />
                            </div>

                            {/* Navigation Links */}
                            {Object.entries(navigation).map(([category, items]) => (
                                <div key={category} className="col-span-1">
                                    <h3 className="text-sm font-semibold text-purple-600 dark:text-purple-300 mb-4 capitalize">
                                        {category}
                                    </h3>
                                    <ul className="space-y-2">
                                        {items.map((item) => (
                                            <li key={item.name}>
                                                <Link
                                                    href={item.href}
                                                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
                                                >
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}

                            {/* Sponsors */}
                            <div className="col-span-2 md:col-span-1">
                                <h3 className="text-sm font-semibold text-purple-600 dark:text-purple-300 mb-4">
                                    Our Sponsors
                                </h3>
                                <div className="flex flex-wrap gap-4 items-center">
                                    {sponsors.map((sponsor) => (
                                        <Image
                                            key={sponsor.name}
                                            src={sponsor.src}
                                            alt={`${sponsor.name} logo`}
                                            width={100}
                                            height={40}
                                            className="h-8 w-auto"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator className="my-8" />

                    {/* Copyright */}
                    <div className="py-8">
                        <p className="text-sm text-gray-600 text-center dark:text-gray-300">
                            © {new Date().getFullYear()} Your DevOps Platform by CSTAD. All rights reserved.
                        </p>
                    </div>
                </div>
            </Container>
        </footer>
    )
}

