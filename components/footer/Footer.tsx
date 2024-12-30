'use client'

import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Separator } from "@/components/ui/separator"
import { Mail, MapPin, Phone } from 'lucide-react'
import { headers } from "next/headers"

const navigation = {
    links: [
        { name: 'Home', href: '/' },
        { name: 'Service', href: 'service' },
        { name: 'Document', href: 'https://cloudinator-doc-vercel.vercel.app/' },
        { name: 'Start Building', href: '/start-building' },
        { name: 'About Us', href: '/about' }
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
        height: 100,
        width: 100
    },
    {
        name: 'MPTC',
        src: '/mptc.png',
        height: 100,
        width: 100
    },
    {
        name: 'ISTAD',
        src: '/istad.png',
        height: 100,
        width: 100
    }
]

export default function Footer() {
    return (
        <footer className="bg-gray-50 dark:bg-gray-900 border-t py-10">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo & Description */}
                    <div>
                        <Image
                            src="/cloudinator-v2.1.png"
                            alt="Cloudinator Logo"
                            width={150}
                            height={150}
                            className="mb-4 ml-6 h-42 w-42 "
                        />
                        <p className="text-gray-600 dark:text-gray-400 text-sm w-[200px] text-center">
                            Empowering your cloud journey with simplicity and innovation. Join us today to start building.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-sky-600 mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {navigation.links.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-sky-600 mb-4">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <Phone className="h-5 w-5 text-sky-600" />
                                <span className="text-gray-600 dark:text-gray-400 text-sm">{contact.phone}</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <Mail className="h-5 w-5 text-sky-600" />
                                <span className="text-gray-600 dark:text-gray-400 text-sm">{contact.email}</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 text-sky-600" />
                                <span className="text-gray-600 dark:text-gray-400 text-sm">{contact.address}</span>
                            </li>
                        </ul>
                    </div>

        
                    {/* Partners */}
                    <div className="space-y-4 md:mx-auto md:w-full lg:mx-0">
                        <h3 className="text-lg font-semibold text-sky-600 mb-4 text-center">Sponsor</h3>
                            <div className="grid gap-4 sm:gap-6 justify-center">
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

                {/* Footer Bottom */}
                <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        © {new Date().getFullYear()} Cloudinator by ISTAD. All rights reserved.™
                    </p>
                </div>
            </Container>
        </footer>
    )
}
