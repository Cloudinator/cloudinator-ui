'use client'

import { useEffect, useState } from 'react'
import { Cloud, Code, Rocket, Settings } from 'lucide-react'
import { motion, useAnimation } from 'framer-motion'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax'
import dynamic from 'next/dynamic'
import TypeHeading from '@/components/homepage/TypeHeading'
import hero from '@/public/hero.json'
import Link from "next/link";
import { useGetMeQuery } from '@/redux/api/userApi'

const Lottie = dynamic(() => import('react-lottie'), { ssr: false })

const serverAnimation = {
    loop: true,
    autoplay: true,
    animationData: hero,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
}

export default function HeroSection() {
    const [isHovered, setIsHovered] = useState(false)
    const controls = useAnimation()
    const { data: userData, error, isLoading } = useGetMeQuery();
    const [timeOfDay, setTimeOfDay] = useState('')

    useEffect(() => {
        const hour = new Date().getHours()
        if (hour < 12) setTimeOfDay('Morning')
        else if (hour < 18) setTimeOfDay('Afternoon')
        else if (hour < 20) setTimeOfDay('Evening')
        else setTimeOfDay('Night')
    }, [])

    const handleHover = () => {
        setIsHovered(!isHovered)
        controls.start({
            scale: isHovered ? 1 : 1.05,
            transition: { duration: 0.3 },
        })
    }

    const getGreeting = () => {
        if (isLoading) return "Welcome"
        if (error) return "Hello there"
        const firstName = userData?.firstName ?? ''
        const lastName = userData?.lastName ?? ''
        return `Good ${timeOfDay}, ${firstName + lastName || 'bro'}`
    }
    
    return (
        <ParallaxProvider>
            <div className="min-h-screen flex justify-center bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 relative overflow-hidden">
                {/* Animated Background Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#303030_1px,transparent_1px),linear-gradient(to_bottom,#303030_1px,transparent_1px)] bg-[size:4rem_4rem] animate-grid"
                />
                <motion.div
                    className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(200,210,255,0.3),transparent)] dark:bg-[radial-gradient(circle_800px_at_100%_200px,rgba(80,80,120,0.3),transparent)]"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.1 }}
                    transition={{ repeat: Infinity, duration: 5, repeatType: 'reverse' }}
                />

                {/* Floating Icons with Parallax */}
                <Parallax speed={-10} className="absolute top-10 left-10">
                    <Cloud className="w-10 h-10 text-blue-400 dark:text-blue-600 opacity-70 animate-bounce-slow" />
                </Parallax>
                <Parallax speed={15} className="absolute top-1/2 right-10">
                    <Code className="w-8 h-8 text-purple-400 dark:text-purple-600 opacity-60 animate-spin-slow" />
                </Parallax>
                <Parallax speed={-5} className="absolute bottom-10 left-1/4">
                    <Settings className="w-12 h-12 text-green-400 dark:text-green-600 opacity-50 animate-pulse" />
                </Parallax>

                {/* Content */}
                <div className="relative z-10 w-full">
                    <main className="container mx-auto px-4 py-16">
                        <div className="flex flex-col md:flex-row items-center">
                            {/* Left Content */}
                            <div className="md:w-1/2 mb-8 md:mb-0 flex flex-col items-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <TypeHeading
                                        texts={[
                                            { text: getGreeting() },
                                            { text: 'Say Goodbye To Manual' },
                                            {
                                                text: 'Say Hello To Automation!',
                                                style: { color: 'rgb(168,85,247)' },
                                            },
                                        ]}
                                        typingSpeed={70}
                                        delayBetweenTexts={1500}
                                    />
                                </motion.div>
                                <p className="mb-6 text-gray-600 dark:text-gray-300 text-center max-w-md">
                                    At{' '}
                                    <span className="font-semibold text-purple-500 dark:text-purple-400">
                    Cloudinator
                  </span>
                                    , we are on a mission to revolutionize the way you work. Say goodbye to manual
                                    tasks and hello to automation.
                                </p>
                                <Link href="/start-building">
                                    <motion.button
                                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white px-6 py-3 rounded-md font-semibold transition-transform transform hover:scale-105"
                                        whileHover={{scale: 1.05}}
                                        whileTap={{scale: 0.95}}
                                    >
                                        <Rocket className="w-5 h-5"/>
                                        Start Deploy
                                    </motion.button>
                                </Link>
                            </div>

                            {/* Right Content */}
                            <motion.div
                                className="md:w-1/2 relative"
                                onMouseEnter={handleHover}
                                onMouseLeave={handleHover}
                                onTouchStart={handleHover}
                                animate={controls}
                                initial={{opacity: 0, x: 100}}
                                whileInView={{opacity: 1, x: 0}}
                                transition={{ duration: 0.7 }}
                                viewport={{ once: true }}
                            >
                                <Lottie options={serverAnimation} />
                            </motion.div>
                        </div>
                    </main>
                </div>

                {/* CSS for Animated Grid Background */}
                <style jsx>{`
                    @keyframes grid-animation {
                        0% {
                            background-size: 4rem 4rem;
                        }
                        100% {
                            background-size: 5rem 5rem;
                        }
                    }

                    .animate-grid {
                        animation: grid-animation 8s linear infinite alternate;
                    }

                    @media (prefers-reduced-motion: reduce) {
                        .animate-grid {
                            animation: none;
                        }
                    }
                `}</style>
            </div>
        </ParallaxProvider>
    )
}

