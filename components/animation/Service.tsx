import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import {ServiceProps} from "@/components/animation/type";
import {fadeInUp} from "@/components/animation/animate";
import Link from 'next/link';
import { Button } from '../ui/button';


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
            <p className="text-gray-600 text-base md:text-lg leading-relaxed dark:text-gray-400">
                {description}
            </p>
            <Button className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:text-white px-8 py-4"> 
                <Link href="/service">
                    See More
                </Link>
            </Button>
        </div>
        <div className={`relative flex justify-center ${reverse ? 'md:order-1' : ''}`}>
            <Lottie options={animationOptions} height={300} width={300} />
        </div>
    </motion.div>
);

export default Service;

