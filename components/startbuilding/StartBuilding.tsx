'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Settings, Wrench, Lightbulb, Globe, ChevronDown, Code2, GitBranch, MonitorDot, Workflow } from 'lucide-react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import octopus from '@/public/Octopus.json'
import pirate from '@/public/Pirateship.json'
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import('react-lottie'), {ssr: false});

const octopusAnimation = {
    loop: true,
    autoplay: true,
    animationData: octopus,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
}


const pirateAnimation = {
    loop: true,
    autoplay: true,
    animationData: pirate,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
}



const technologies = [
    { name: 'MongoDB', logo: '/programming/mongoDB.svg' },
    { name: 'PostgreSQL', logo: '/programming/postgres.svg' },
    { name: 'SQL Server', logo: '/programming/sqlserver.svg' },
    { name: 'MySQL', logo: '/programming/mysql.svg' },
    { name: 'Spring', logo: '/programming/spring.svg' },
    { name: 'Ruby', logo: '/programming/ruby.svg' },
    { name: 'PHP', logo: '/programming/php.svg' },
    { name: 'Vue.js', logo: '/programming/vue.svg' },
    { name: 'React', logo: '/programming/react.svg' },
    { name: 'HTML5', logo: '/programming/html5.svg' },
    { name: 'JavaScript', logo: '/programming/javascript.svg' },
    { name: 'CSS3', logo: '/programming/css3.svg' },
    { name: 'Node.js', logo: '/programming/nodejs.svg' },
    { name: 'Laravel', logo: '/programming/laravel.svg' },
    { name: 'Java', logo: '/programming/java.svg' },
]

const processCards = [
    {
        title: 'Languages',
        description: 'We use a variety of programming languages to build robust and scalable systems, including Java, JavaScript, and Python.',
        icon: Code2,
    },
    {
        title: 'Automation Tools',
        description: 'A full complement of tools and utilities for testing your project code, scripts, and more.',
        icon: Workflow,
    },
    {
        title: 'Monitoring',
        description: 'We employ modern monitoring tools such as Prometheus, Grafana, and ELK stack.',
        icon: MonitorDot,
    },
    {
        title: 'Orchestration',
        description: 'Comprehensive orchestration tools for efficient, and seamless application deployment.',
        icon: GitBranch,
    },
]

const timelineSteps = [
    {
        icon: Settings,
        title: 'INITIAL SETUP',
        description: 'Configure your project environment and set up the necessary tools.',
        color: '#9333EA',
        arrowColor: '#A855F7',
        iconBg: '#F3E8FF',
    },
    {
        icon: Wrench,
        title: 'DEVELOPMENT',
        description: 'Build your application with cutting-edge technologies and best practices.',
        color: '#2979FF',
        arrowColor: '#60A5FA',
        iconBg: '#E6F2FF',
    },
    {
        icon: Lightbulb,
        title: 'OPTIMIZATION',
        description: 'Refine and enhance your project for peak performance and user experience.',
        color: '#9333EA',
        arrowColor: '#A855F7',
        iconBg: '#F3E8FF',
    },
    {
        icon: Globe,
        title: 'DEPLOYMENT',
        description: 'Launch your application to the world with robust hosting and distribution.',
        color: '#2979FF',
        arrowColor: '#60A5FA',
        iconBg: '#E6F2FF',
    },
]

const ProcessStep = ({ step, index, isLast }: { step: typeof timelineSteps[0]; index: number; isLast: boolean }) => {
    const Icon = step.icon;

    return (
        <div className="flex-1 flex flex-col items-center">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative z-10 mb-4"
            >
                <div
                    className="w-16 h-16 rounded-full border-2"
                    style={{ borderColor: step.color, backgroundColor: step.iconBg }}
                >
                    <div className="w-full h-full flex items-center justify-center">
                        <Icon className="w-8 h-8 dark:text-gray-100" style={{ color: step.color }} />
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                className="w-full h-12 relative dark:bg-gray-700"
                style={{ backgroundColor: step.arrowColor }}
            >
                <div className="h-full flex items-center justify-center text-white font-bold text-sm uppercase tracking-wider">
                    {step.title}
                </div>
                {!isLast && (
                    <div
                        className="absolute right-0 top-0 h-0 w-0 border-t-[24px] border-b-[24px] border-l-[24px]"
                        style={{
                            borderTopColor: 'transparent',
                            borderBottomColor: 'transparent',
                            borderLeftColor: step.arrowColor,
                        }}
                    />
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                className="text-center mt-4 px-2"
            >
                <p className="text-sm text-gray-600 dark:text-gray-300 max-w-[200px]">{step.description}</p>
            </motion.div>
        </div>
    );
};


const WaveBackground = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden dark:bg-gray-800">
            <svg
                className="absolute bottom-0 left-0 w-full h-full"
                viewBox="0 0 1440 400"
                xmlns="http://www.w3.org/2000/svg"
            >
                <motion.path
                    fill="#9333EA"
                    fillOpacity="0.4"
                    className="dark:fill-gray-600"
                    d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,149.3C672,160,768,224,864,229.3C960,235,1056,181,1152,170.7C1248,160,1344,192,1392,208L1440,224L1440,400L1392,400C1344,400,1248,400,1152,400C1056,400,960,400,864,400C768,400,672,400,576,400C480,400,384,400,288,400C192,400,96,400,48,400L0,400Z"
                    animate={{
                        d: [
                            "M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,149.3C672,160,768,224,864,229.3C960,235,1056,181,1152,170.7C1248,160,1344,192,1392,208L1440,224L1440,400L1392,400C1344,400,1248,400,1152,400C1056,400,960,400,864,400C768,400,672,400,576,400C480,400,384,400,288,400C192,400,96,400,48,400L0,400Z",
                            "M0,160L48,170.7C96,181,192,203,288,192C384,181,480,139,576,128C672,117,768,139,864,160C960,181,1056,203,1152,192C1248,181,1344,139,1392,117.3L1440,96L1440,400L1392,400C1344,400,1248,400,1152,400C1056,400,960,400,864,400C768,400,672,400,576,400C480,400,384,400,288,400C192,400,96,400,48,400L0,400Z",
                        ],
                    }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 20,
                        ease: "easeInOut",
                    }}
                />
            </svg>
        </div>
    );
};


interface FloatingCardProps {
    card: typeof processCards[0]
    index: number
}

const FloatingCard: React.FC<FloatingCardProps> = ({ card, index }) => {
    const Icon = card.icon

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="relative z-10"
        >
            <motion.div
                animate={{
                    y: [0, -10, 0],
                }}
                transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 4 + index,
                    ease: "easeInOut",
                }}
            >
                <Card className="bg-white/95 backdrop-blur-sm h-full shadow-lg">
                    <CardHeader>
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                            <Icon className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-xl text-purple-600">{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-muted-foreground">{card.description}</CardDescription>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    )
}

export default function StartBuildingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-black">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 lg:py-32">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center justify-between">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="lg:w-1/4 mb-8 lg:mb-0"
                        >
                            <Lottie options={octopusAnimation} />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center lg:w-1/2"
                        >
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
                                Start Cloudinator
                            </h1>
                            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-purple-800 dark:text-purple-300">
                                Better Runtime Product
                            </h2>
                            <p className="text-lg text-muted-foreground dark:text-gray-400 mb-8">
                                Building a superior runtime product that streamlines automation, enhances performance,
                                and offers seamless integration.
                            </p>
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 dark:from-purple-400 dark:to-blue-400"
                            >
                                Get Started
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="lg:w-1/4 mt-8 lg:mt-0"
                        >
                            <Lottie options={pirateAnimation} />
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <ChevronDown className="w-8 h-8 text-purple-500 dark:text-purple-300" />
                </motion.div>
            </section>

            {/* Technologies Section */}
            <section className="py-20 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-black">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold mb-4 text-purple-600 dark:text-purple-300">
                            Project KickStarts
                        </h2>
                        <p className="text-lg text-muted-foreground dark:text-gray-400">
                            Choose from a wide range of technologies to kickstart your project
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="grid grid-cols-3 md:grid-cols-5 gap-8 justify-items-center"
                    >
                        {technologies.map((tech, index) => (
                            <motion.div
                                key={tech.name}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                whileHover={{ scale: 1.1 }}
                                className="flex flex-col items-center justify-center"
                            >
                                <Image
                                    src={tech.logo}
                                    alt={tech.name}
                                    width={40}
                                    height={40}
                                    className="mb-2"
                                />
                                <span className="text-sm text-muted-foreground dark:text-gray-300">
                        {tech.name}
                    </span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>


            {/* Process Section */}
            <section className="relative py-32 overflow-hidden">
                <WaveBackground />
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-purple-500 mb-4">
                            Our Backend Process Technology
                        </h2>
                        <p className="text-black dark:text-gray-300 text-lg max-w-2xl mx-auto">
                            Our backend process technology is designed to be scalable, reliable, and secure, floating on
                            the waves of innovation.
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {processCards.map((card, index) => (
                            <FloatingCard key={card.title} card={card} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-300 dark:to-blue-400">
                        Our Process
                    </h2>
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-6 md:gap-0">
                            {timelineSteps.map((step, index) => (
                                <ProcessStep
                                    key={index}
                                    step={step}
                                    index={index}
                                    isLast={index === timelineSteps.length - 1}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-700 dark:to-blue-700">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <h2 className="text-4xl font-bold mb-6">
                            Ready to Automate Your Runtime?
                        </h2>
                        <p className="text-xl mb-8">
                            Join us in revolutionizing the way you build and deploy applications.
                        </p>
                        <Button
                            size="lg"
                            variant="secondary"
                            className="bg-white text-purple-600 dark:bg-gray-700 dark:text-white hover:bg-purple-100 dark:hover:bg-gray-600"
                        >
                            Get Started Now
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
