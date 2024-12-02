"use client";

import dynamic from "next/dynamic";
import server from "@/public/hero.json";
import { Cloud, Code, Settings } from "lucide-react";

import { motion } from "framer-motion";
import TypeHeading from "@/components/homepage/TypeHeading";

const Lottie = dynamic(() => import("react-lottie"), { ssr: false });

const serverAnimation = {
    loop: true,
    autoplay: true,
    animationData: server,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
};

const HeroSection = () => {
    const handleHover = () => {
        console.log("Animation Hovered!");
    };

    return (
        <div className="min-h-screen flex justify-center bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 relative overflow-hidden">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#303030_1px,transparent_1px),linear-gradient(to_bottom,#303030_1px,transparent_1px)] bg-[size:4rem_4rem] animate-grid" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(200,210,255,0.3),transparent)] dark:bg-[radial-gradient(circle_800px_at_100%_200px,rgba(80,80,120,0.3),transparent)]" />

            {/* Floating Icons */}
            <div className="absolute top-10 left-10 animate-bounce-slow">
                <Cloud className="w-10 h-10 text-blue-400 dark:text-blue-600 opacity-70" />
            </div>
            <div className="absolute top-1/2 right-10 animate-spin-slow">
                <Code className="w-8 h-8 text-purple-400 dark:text-purple-600 opacity-60" />
            </div>
            <div className="absolute bottom-10 left-1/4 animate-pulse">
                <Settings className="w-12 h-12 text-green-400 dark:text-green-600 opacity-50" />
            </div>

            {/* Content */}
            <div className="relative z-10">
                <main className="container mx-auto px-4 py-16">
                    <div className="flex flex-col md:flex-row items-center">
                        {/* Left Content */}
                        <div className="md:w-1/2 mb-8 md:mb-0 flex flex-col items-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <TypeHeading
                                    texts={[
                                        { text: "Say Goodbye To Manual" },
                                        {
                                            text: "Say Hello To Automation!",
                                            style: { color: "rgb(168,85,247)" },
                                        },
                                    ]}
                                />
                            </motion.div>
                            <p className="mb-6 text-gray-600 dark:text-gray-300 text-center">
                                At{" "}
                                <span className="font-semibold text-purple-500 dark:text-purple-400">
                  Cloudinator
                </span>
                                , we are on a mission to revolutionize the way you work. Say
                                goodbye to manual tasks and hello to automation.
                            </p>
                            <div className="flex justify-center w-full">
                                <button className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white px-6 py-3 rounded-md font-semibold transition-transform transform hover:scale-105">
                                    Start Deploy
                                </button>
                            </div>
                        </div>

                        {/* Right Content */}
                        <div
                            className="md:w-1/2 relative"
                            onMouseEnter={handleHover}
                            onTouchStart={handleHover} // Add for mobile hover-like behavior
                        >
                            <Lottie options={serverAnimation} />
                        </div>
                    </div>
                </main>
            </div>

            {/* CSS for Animated Grid Background */}
            <style jsx>{`
                @keyframes grid-animation {
                    0% {
                        background-size: 4rem 4rem;
                    }
                    100% {
                        background-size: 5rem 5rem;
                    }
                }

                .animate-grid {
                    animation: grid-animation 8s linear infinite alternate;
                }
            `}</style>
        </div>
    );
};

export default HeroSection;