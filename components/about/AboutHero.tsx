'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Cloud, Cog, Zap } from 'lucide-react'
import CloudParticles from "@/components/about/CloudParticles";
import { AnimatedGradientText } from '../AnimatedGradientText'

export default function AboutHero() {
    const [isDeploying, setIsDeploying] = useState(false)

    const startDeployment = () => {
        setIsDeploying(true)
        setTimeout(() => setIsDeploying(false), 3000) // Reset after 3 seconds
    }

    return (
        <section className="container px-4 py-24 mx-auto relative overflow-hidden">
            <CloudParticles />
            <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
                <motion.h1
                    className="text-4xl font-bold tracking-tight text-purple-500 sm:text-5xl"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <AnimatedGradientText className="text-4xl text-center md:text-5xl w-full font-extrabold mb-4 inline-block">
                    Welcome to Cloudinator
                    </AnimatedGradientText>
                   
                </motion.h1>

                

                <motion.p
                    className="text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    At Cloudinator, we are a catalyst in revolutionizing the way businesses operate by harnessing the power of automation to find pivotal areas requiring attention. In this process, we believe in identifying solutions.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Button
                        className="bg-purple-500 hover:bg-[#5B32C7] text-white px-8 py-2 rounded-md"
                        onClick={startDeployment}
                        disabled={isDeploying}
                    >
                        {isDeploying ? 'Deploying...' : 'Deploy to Cloud'}
                    </Button>
                </motion.div>
            </div>
            <DevOpsAnimation isDeploying={isDeploying} />
        </section>
    )
}

function DevOpsAnimation({ isDeploying }: { isDeploying: boolean }) {
    return (
        <div className="absolute inset-0 pointer-events-none">
            <motion.div
                className="absolute top-10 left-10"
                animate={{
                    x: isDeploying ? [0, 100, 0] : 0,
                    opacity: isDeploying ? [1, 0.5, 1] : 1,
                }}
                transition={{ duration: 3, ease: "easeInOut", repeat: isDeploying ? Infinity : 0 }}
            >
                <Cloud className="text-purple-300 w-16 h-16" />
            </motion.div>
            <motion.div
                className="absolute top-20 right-20"
                animate={{
                    rotate: isDeploying ? 360 : 0,
                }}
                transition={{ duration: 3, ease: "linear", repeat: isDeploying ? Infinity : 0 }}
            >
                <Cog className="text-purple-400 w-12 h-12" />
            </motion.div>
            <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                animate={{
                    y: isDeploying ? [-10, 10, -10] : 0,
                    opacity: isDeploying ? [0.5, 1, 0.5] : 0.5,
                }}
                transition={{ duration: 2, ease: "easeInOut", repeat: isDeploying ? Infinity : 0 }}
            >
                <Zap className="text-yellow-400 w-10 h-10" />
            </motion.div>
        </div>
    )
}

