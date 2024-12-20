'use client'

import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Separator } from "@/components/ui/separator"
import { Mail, MapPin, Phone } from 'lucide-react'

const navigation = {
    links: [
        { name: 'Home', href: '/' },
        { name: 'Service', href: 'service' },
        { name: 'Document', href: 'https://cloudinator-doc-vercel.vercel.app/' },
        { name: 'Start Building', href: '/start-building' },
        { name: 'About US', href: '/about' }
    ]
}

const contact = {
    phone: '+855978443615',
    email: 'cloudinator@gmail.com',
    address: 'No. 24, Street 562 ,Sangkat Boeung Kok, Toul Kork, Phnom Penh City.'
}

const partners = [
    {
        name: 'CBRD',
        src: '/cbrd.png',
        height: 200,
        width: 200
    },
    {
        name: 'MPTC',
        src: '/mptc.png',
        height: 200,
        width: 200
    }
]

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t">
            <Container>
                <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                        {/* Logo & Description */}
                        <div className="space-y-4">
                            <Image
                                src="/logo.png"
                                alt="cloudinator logo"
                                width={150}
                                height={50}
                            />
                        </div>

                        {/* Navigation */}
                        <div>
                            <h3 className="text-lg font-semibold text-sky-600 mb-4">Content</h3>
                            <ul className="space-y-2">
                                {navigation.links.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className="text-gray-600 hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-500 transition-colors"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="text-lg font-semibold text-sky-600 mb-4">Contact US</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start space-x-3">
                                    <Phone className="h-5 w-5 text-sky-600 mt-0.5" />
                                    <span className="text-gray-600 dark:text-gray-400">{contact.phone}</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Mail className="h-5 w-5 text-sky-600 mt-0.5" />
                                    <span className="text-gray-600 dark:text-gray-400">{contact.email}</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <MapPin className="h-5 w-5 text-sky-600 mt-0.5" />
                                    <span className="text-gray-600 dark:text-gray-400">{contact.address}</span>
                                </li>
                            </ul>
                        </div>

                        {/* Partners */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-sky-600 mb-4">Sponsor</h3>
                            <div className="grid gap-4 sm:gap-6">
                                {partners.map((partner) => (
                                    <Image
                                        key={partner.name}
                                        src={partner.src}
                                        alt={partner.name}
                                        width={partner.width}
                                        height={partner.height}
                                        className="rounded-lg"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <Separator className="my-8" />

                    {/* Copyright */}
                    <div className="text-center text-gray-600 dark:text-gray-400">
                        <p>© {new Date().getFullYear()} Copyright Cloudinator by ISTAD. All rights reserved.™</p>
                    </div>
                </div>
            </Container>
        </footer>
    )
}