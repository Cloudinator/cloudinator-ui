'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Plus, Target, Shield, Network } from 'lucide-react'
import { motion } from "framer-motion"

const values = [
    {
        icon: Plus,
        title: "Innovation",
        description: "We constantly push the boundaries of what's possible in DevOps, always seeking new and better ways to solve problems."
    },
    {
        icon: Target,
        title: "Simplicity",
        description: "We believe in making complex technologies accessible and easy to use for developers of all skill levels."
    },
    {
        icon: Shield,
        title: "Reliability",
        description: "Our users trust us with their deployments, and we take that responsibility seriously by ensuring our platform is secure, reliable, and performant."
    },
    {
        icon: Network,
        title: "Community Engagement",
        description: "We actively engage with and contribute to the DevOps community, sharing knowledge and collaborating on open-source projects."
    }
]

export default function ValuesSection() {
    return (
        <section className="py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <motion.h2
                    className="text-3xl font-bold tracking-tighter text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Our Values
                </motion.h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {values.map((value, index) => {
                        const Icon = value.icon
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="h-full transition-all duration-300 hover:shadow-lg">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col items-center text-center gap-4">
                                            <div className="rounded-full p-3 bg-purple-100 dark:bg-purple-900">
                                                <Icon className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="font-semibold text-lg">{value.title}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {value.description}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

