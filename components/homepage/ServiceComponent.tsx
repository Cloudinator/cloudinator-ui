'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Service from "@/components/animation/Service";
import {cdAnimation, cloudAnimation, deployAnimation, fadeInUp, infraAnimation} from "@/components/animation/animate";
import { AnimatedGradientText } from '../AnimatedGradientText';

const ServiceComponent: React.FC = () => {
    return (
        <div className="container mx-auto px-4">
            <section className="py-12 md:py-24">
                <motion.div className="text-center space-y-6 max-w-3xl mx-auto" {...fadeInUp}>
                    <AnimatedGradientText className="text-4xl md:text-5xl font-extrabold mb-4 inline-block">
                        Explore Our Services
                    </AnimatedGradientText>
                </motion.div>
            </section>

            <section className="py-12 md:py-24">
                <div className="space-y-24">
                    <Service
                        title="Full Service Deployment"
                        description="Say goodbye to manual and error-prone deployment processes. Our Service automates the deployment of frontend code, backend service, database, and all other components of your application stack."
                        animationOptions={deployAnimation}
                        gradientFrom="blue-600"
                        gradientTo="purple-600"
                    />

                    <Service
                        title="Continuous Integration"
                        description="Streamline your development workflow with our robust CI/CD pipeline. Automatically build, test, and deploy your code changes with confidence, ensuring high-quality releases every time."
                        animationOptions={cdAnimation}
                        gradientFrom="purple-600"
                        gradientTo="pink-600"
                        reverse
                    />

                    <Service
                        title="Scalable Infrastructure"
                        description="Build and manage your applications on our cutting-edge cloud infrastructure. Designed for high performance and seamless scalability, our platform adapts to your needs, from startups to enterprise-level operations."
                        animationOptions={infraAnimation}
                        gradientFrom="green-600"
                        gradientTo="blue-600"
                    />

                    <Service
                        title="24/7 Monitoring & Support"
                        description="Rest easy knowing your applications are in good hands. Our round-the-clock monitoring and expert support team ensure optimal performance, quick issue resolution, and proactive maintenance for your peace of mind."
                        animationOptions={cloudAnimation}
                        gradientFrom="red-600"
                        gradientTo="yellow-600"
                        reverse
                    />
                </div>
            </section>
        </div>
    );
};

export default ServiceComponent;

