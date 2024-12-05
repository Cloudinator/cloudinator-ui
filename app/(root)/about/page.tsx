"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Twitter, Users, Rocket, Target, Zap, BookOpen } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
}

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-primary text-primary-foreground py-4">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold">About Us</h1>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 py-8">
                <motion.section className="mb-12" {...fadeIn}>
                    <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <p className="text-lg mb-4">
                                Founded in 2020, our DevOps platform was born out of a passion for simplifying the complex world of software deployment and management. We saw the challenges faced by development teams in deploying services like Vercel and managing microservices, and we knew there had to be a better way.
                            </p>
                            <p className="text-lg mb-4">
                                Our team of experienced developers and DevOps engineers came together with a shared vision: to create a platform that would empower teams to focus on building great software, not wrestling with deployment infrastructure.
                            </p>
                            <p className="text-lg">
                                Today, we are proud to offer a comprehensive DevOps solution that streamlines the entire development lifecycle, from code commit to production deployment and beyond.
                            </p>
                        </div>
                        <motion.div
                            className="relative h-64 md:h-full"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Image
                                src="/placeholder.svg?height=400&width=600"
                                alt="Team working together"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                            />
                        </motion.div>
                    </div>
                </motion.section>

                <motion.section className="mb-12" {...fadeIn}>
                    <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-4">
                                <Rocket className="h-8 w-8 text-primary" />
                                <p className="text-lg">
                                    Our mission is to democratize DevOps practices and empower development teams of all sizes to deploy, manage, and scale their applications with ease. We believe that by simplifying the deployment process and providing powerful tools for managing microservices, we can help companies innovate faster and deliver better software to their users.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.section>

                <motion.section className="mb-12" {...fadeIn}>
                    <h2 className="text-3xl font-bold mb-4">Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teamMembers.map((member, index) => (
                            <motion.div key={index} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                                <Card>
                                    <CardHeader>
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            width={100}
                                            height={100}
                                            className="rounded-full mb-4"
                                        />
                                        <CardTitle>{member.name}</CardTitle>
                                        <CardDescription>{member.role}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="mb-4">{member.bio}</p>
                                        <div className="flex space-x-4">
                                            {member.github && (
                                                <Link href={member.github} target="_blank" rel="noopener noreferrer">
                                                    <Github className="h-5 w-5" />
                                                </Link>
                                            )}
                                            {member.linkedin && (
                                                <Link href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                                    <Linkedin className="h-5 w-5" />
                                                </Link>
                                            )}
                                            {member.twitter && (
                                                <Link href={member.twitter} target="_blank" rel="noopener noreferrer">
                                                    <Twitter className="h-5 w-5" />
                                                </Link>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                <motion.section className="mb-12" {...fadeIn}>
                    <h2 className="text-3xl font-bold mb-4">Our Values</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {values.map((value, index) => (
                            <motion.div key={index} initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center space-x-2">
                                            {value.icon}
                                            <CardTitle>{value.title}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p>{value.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                <motion.section {...fadeIn}>
                    <div className="bg-muted rounded-lg p-8 text-center">
                        <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
                        <p className="text-lg mb-6">
                            We are always looking for talented individuals who are passionate about DevOps and want to make a difference. Check out our open positions and join us in shaping the future of software deployment.
                        </p>
                        <Button asChild>
                            <Link href="/careers">
                                <Users className="mr-2 h-4 w-4" />
                                View Open Positions
                            </Link>
                        </Button>
                    </div>
                </motion.section>
            </main>

            <footer className="bg-muted py-6">
                <div className="container mx-auto px-4 text-center text-muted-foreground">
                    <p>&copy; 2024 Your DevOps Platform. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

const teamMembers = [
    {
        name: "Jane Doe",
        role: "CEO & Co-founder",
        bio: "With over 15 years of experience in software development and DevOps, Jane leads our company's vision and strategy.",
        image: "/placeholder.svg?height=100&width=100",
        github: "https://github.com/janedoe",
        linkedin: "https://linkedin.com/in/janedoe",
        twitter: "https://twitter.com/janedoe",
    },
    {
        name: "John Smith",
        role: "CTO & Co-founder",
        bio: "John brings deep technical expertise in cloud infrastructure and microservices architecture to our platform.",
        image: "/placeholder.svg?height=100&width=100",
        github: "https://github.com/johnsmith",
        linkedin: "https://linkedin.com/in/johnsmith",
    },
    {
        name: "Emily Chen",
        role: "Lead DevOps Engineer",
        bio: "Emily is passionate about automating everything and ensuring our platform runs smoothly for all our users.",
        image: "/placeholder.svg?height=100&width=100",
        github: "https://github.com/emilychen",
        twitter: "https://twitter.com/emilychen",
    },
]

const values = [
    {
        title: "Innovation",
        description: "We constantly push the boundaries of what's possible in DevOps, always seeking new and better ways to solve problems.",
        icon: <Zap className="h-6 w-6 text-primary" />,
    },
    {
        title: "Simplicity",
        description: "We believe in making complex technologies accessible and easy to use for developers of all skill levels.",
        icon: <Target className="h-6 w-6 text-primary" />,
    },
    {
        title: "Reliability",
        description: "Our users trust us with their deployments, and we take that responsibility seriously by ensuring our platform is always reliable and performant.",
        icon: <Rocket className="h-6 w-6 text-primary" />,
    },
    {
        title: "Community",
        description: "We actively engage with and contribute to the DevOps community, sharing knowledge and collaborating on open-source projects.",
        icon: <BookOpen className="h-6 w-6 text-primary" />,
    },
]