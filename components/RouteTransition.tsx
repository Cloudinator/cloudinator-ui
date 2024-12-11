"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const RouteTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial="initialState"
                animate="animateState"
                exit="exitState"
                transition={{
                    duration: 0.25,
                }}
                variants={{
                    initialState: {
                        opacity: 0,
                        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                    },
                    animateState: {
                        opacity: 1,
                        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                    },
                    exitState: {
                        clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
                    },
                }}
                className="w-full h-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

const ScrollProgressBar: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsVisible(scrollPosition > 100); // Show after 100px of scrolling
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-purple-500 z-50"
                style={{
                    scaleX,
                    transformOrigin: "0%",
                    opacity: isVisible ? 1 : 0,
                    transition: "opacity 0.3s ease-in-out",
                }}
            />
        </>
    );
};

export { ScrollProgressBar, RouteTransition };