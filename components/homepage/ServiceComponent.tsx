'use client'

import deploy from '@/public/cloud2.json'
import dynamic from "next/dynamic"
import { motion } from 'framer-motion'
import cd from '@/public/cd.json'
import infra from '@/public/infrastructure.json'
import cloud from '@/public/cloud1.json'

const Lottie = dynamic(() => import('react-lottie'), { ssr: false })

const deployAnimation = {
    loop: true,
    autoplay: true,
    animationData: deploy,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
    style: { width: '100%', height: '100%' }
}

const cloudAnimation = {
    loop: true,
    autoplay: true,
    animationData: cloud,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
    style: { width: '100%', height: '100%' }
}

const infraAnimation = {
    loop: true,
    autoplay: true,
    animationData: infra,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
    style: { width: '100%', height: '100%' }
}

const cdAnimation = {
    loop: true,
    autoplay: true,
    animationData: cd,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
    style: { width: '100%', height: '100%' }
}

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
}

export default function ServiceComponent() {
    return (
        <div className="container mx-auto">
            <section className="py-4 md:py-24">
                <div>
                    <motion.div className="text-center space-y-6 max-w-3xl mx-auto" {...fadeInUp}>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Explore Our Services
                        </h2>
                    </motion.div>
                </div>
            </section>

            <section className="py-4 md:py-24">
                <div className="container mx-auto">
                    <div className="space-y-24">
                        {/* First service */}
                        <motion.div className="grid md:grid-cols-2 gap-12 items-center" {...fadeInUp}>
                            <div className="relative order-2 md:order-1">
                                <Lottie options={deployAnimation} width={500} height={500}/>
                            </div>
                            <div className="space-y-6 order-1 md:order-2">
                                <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Full Service Deployment
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Say goodbye to manual and error-prone deployment processes. Our Service
                                    automates the deployment of frontend code, backend service, database, and all
                                    other components of your application stack.
                                </p>
                                <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                                    See More
                                </button>
                            </div>
                        </motion.div>

                        {/* Second service */}
                        <motion.div className="grid md:grid-cols-2 gap-12 items-center" {...fadeInUp}>
                            <div className="space-y-6">
                                <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    Continuous Integration
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Streamline your development workflow with our robust CI/CD pipeline.
                                    Automatically build, test, and deploy your code changes with confidence,
                                    ensuring high-quality releases every time.
                                </p>
                                <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                                    See More
                                </button>
                            </div>
                            <div className="relative order-2 md:order-1">
                                <Lottie options={cdAnimation} width={400} height={400}/>
                            </div>
                        </motion.div>

                        {/* Third service */}
                        <motion.div className="grid md:grid-cols-2 gap-12 items-center" {...fadeInUp}>
                            <div className="relative order-2 md:order-1">
                                <Lottie options={infraAnimation} width={400} height={400}/>
                            </div>
                            <div className="space-y-6 order-1 md:order-2">
                                <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                    Scalable Infrastructure
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Build and manage your applications on our cutting-edge cloud infrastructure.
                                    Designed for high performance and seamless scalability, our platform adapts
                                    to your needs, from startups to enterprise-level operations.
                                </p>
                                <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                                    See More
                                </button>
                            </div>
                        </motion.div>

                        {/* Fourth service */}
                        <motion.div className="grid md:grid-cols-2 gap-12 items-center" {...fadeInUp}>
                            <div className="space-y-6">
                                <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">
                                    24/7 Monitoring & Support
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Rest easy knowing your applications are in good hands. Our round-the-clock
                                    monitoring and expert support team ensure optimal performance, quick issue
                                    resolution, and proactive maintenance for your peace of mind.
                                </p>
                                <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                                    See More
                                </button>
                            </div>
                            <div className="relative order-2 md:order-1">
                                <Lottie options={cloudAnimation} width={500} height={500}/>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}