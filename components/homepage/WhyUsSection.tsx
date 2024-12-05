'use client'

import { motion } from 'framer-motion'

type FeatureProps = {
    title: string
    description: string
    delay: number
}

const Feature = ({ title, description, delay }: FeatureProps) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        className="p-6"
    >
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
)

export default function WhyUsSection() {
    const features = [
        {
            title: "Expertise",
            description: "Our team of experienced experts have the knowledge and expertise to deliver innovative IT solutions that meet your unique needs.",
        },
        {
            title: "Tech",
            description: "We stay up to date with the latest trends and technologies in the IT industry, so you can get the most advanced solutions available.",
        },
        {
            title: "Solutions",
            description: "We take a personalized approach to every project, working closely with you to understand your business and create specific solutions.",
        },
        {
            title: "Results",
            description: "Our track record speaks for itself — we helped businesses of all sizes and industries achieve their goals with our IT solutions.",
        },
    ]

    return (
        <section className="py-20 px-4 max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="md:col-span-1"
                >
                    <h2 className="text-5xl font-bold text-orange-500">
                        Why Us ?
                    </h2>
                </motion.div>

                <div className="md:col-span-2 grid sm:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <Feature
                            key={feature.title}
                            title={feature.title}
                            description={feature.description}
                            delay={index * 0.2}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}