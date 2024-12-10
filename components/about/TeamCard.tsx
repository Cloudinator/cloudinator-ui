'use client'

import Image from "next/image"
import { motion } from "framer-motion"
import { type LucideIcon } from 'lucide-react'

interface SocialLink {
    icon: LucideIcon;
    href: string;
}

interface ArtisticProfileProps {
    name: string,
    role: string,
    quote: string,
    imageSrc: string,
    socialLinks: SocialLink[],
    isReversed: boolean,
}

export function ArtisticProfile({
                                    name,
                                    role,
                                    quote,
                                    imageSrc,
                                    socialLinks,
                                    isReversed,
                                }: ArtisticProfileProps) {
    return (
        <motion.div
            className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 p-8 relative overflow-hidden`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="relative w-64 h-64 flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-300 to-purple-600 rounded-full opacity-50" // Updated gradient colors
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
                <div className="relative w-64 h-64 rounded-full overflow-hidden">
                    <Image
                        src={imageSrc}
                        alt={`Profile picture of ${name}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={100}
                        priority
                    />
                </div>
            </motion.div>

            <div className={`flex flex-col text-center ${isReversed ? 'md:text-right' : 'md:text-left'} max-w-2xl`}>
                <motion.h1
                    className="text-4xl font-bold mb-2 tracking-tight text-purple-500" // Updated text color to purple
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {name}
                </motion.h1>
                <motion.h2
                    className="text-2xl text-gray-400 font-medium mb-6" // Changed to a lighter gray for contrast
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    {role}
                </motion.h2>
                <motion.div
                    className="relative mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <span
                        className={`absolute ${isReversed ? '-right-8' : '-left-8'} -top-6 text-8xl text-purple-200 opacity-50`} // Updated quote color to purple
                        aria-hidden="true"
                    >
                        &quot;
                    </span>
                    <p className="text-lg px-4 leading-relaxed italic text-gray-500 dark:text-white tracking-wide">
                        {quote}
                    </p>
                    <span
                        className={`absolute ${isReversed ? '-left-4' : '-right-4'} -bottom-6 text-8xl text-purple-200 opacity-50`} // Updated quote color to purple
                        aria-hidden="true"
                    >
                        &quot;
                    </span>
                </motion.div>
                <motion.div
                    className={`flex ${isReversed ? 'justify-end' : 'justify-start'} space-x-6`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {socialLinks.map((link, index) => (
                        <SocialIcon key={index} icon={link.icon} href={link.href} />
                    ))}
                </motion.div>
            </div>
            <motion.div
                className={`absolute -bottom-16 ${isReversed ? '-left-16' : '-right-16'} w-64 h-64 bg-purple-100 rounded-full opacity-40 dark:opacity-20`} // Background color changed to light purple
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 20, 0],
                    y: [0, -20, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />
        </motion.div>
    )
}

function SocialIcon({ icon: Icon, href }: { icon: LucideIcon; href: string }) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-purple-500 transition-colors" // Hover color changed to purple
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
        >
            <Icon size={28} />
        </motion.a>
    )
}