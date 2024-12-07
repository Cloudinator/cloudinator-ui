import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import {ServiceProps} from "@/components/animation/type";
import {fadeInUp} from "@/components/animation/animate";


const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

const Service: React.FC<ServiceProps> = ({
                                             title,
                                             description,
                                             animationOptions,
                                             gradientFrom,
                                             gradientTo,
                                             reverse = false,
                                         }) => (
    <motion.div className="grid md:grid-cols-2 gap-8 items-center justify-center" {...fadeInUp}>
        <div className={`space-y-6 text-center ${reverse ? 'md:order-2' : ''}`}>
            <h2 className={`text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-${gradientFrom} to-${gradientTo} bg-clip-text text-transparent`}>
                {title}
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                {description}
            </p>
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium transition-colors">
                See More
            </button>
        </div>
        <div className={`relative flex justify-center ${reverse ? 'md:order-1' : ''}`}>
            <Lottie options={animationOptions} height={300} width={300} />
        </div>
    </motion.div>
);

export default Service;

