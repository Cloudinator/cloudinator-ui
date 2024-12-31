"use client";

import Image from "next/image";
import { AnimatedGradientText } from "../AnimatedGradientText";

export default function AboutSections() {
    return (
        <div className="container mx-auto px-4 py-16 space-y-24">
            {/* History Section */}
            <section className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4 text-center md:text-left">
                    <div className="relative  text-center py-2 rounded-lg">
                        <AnimatedGradientText className="text-4xl md:text-5xl font-extrabold mb-4 inline-block">
                            Our History
                        </AnimatedGradientText>
                    </div>

                    <ul className="space-y-4 list-disc text-gray-600 dark:text-white pl-6">
                        <li>
                            <span className="text-purple-500 font-semibold">Throughout 2024</span>, our team of passionate individuals set out prepared to identify the first success point of artificial intelligence and after observing the way the challenges faced by development teams in delivering production-ready code and managing deployments did not have much to do with code.
                        </li>
                        <li>
                            <span className="text-purple-500 font-semibold">We realized</span> that the real challenge was bringing development teams together with a shared vision to create a platform that would empower them to focus on building great solutions, not wasting time deploying them.
                        </li>
                        <li>
                            <span className="text-purple-500 font-semibold">Today</span>, we are proud to offer a comprehensive DevOps solution that helps teams of all sizes deliver better software with collaboration at production-ready levels out-of-the-box.
                        </li>
                    </ul>
                </div>
                <div className="relative h-[300px] md:h-[400px]">
                    <Image
                        src="/team.png"
                        alt="Team collaboration illustration"
                        fill
                        className="object-contain"
                    />
                </div>
            </section>

            {/* Mission Section */}
            <section className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative h-[300px] md:h-[400px] md:order-first">
                    <Image
                        src="/mission.png"
                        alt="Innovation illustration"
                        fill
                        className="object-contain"
                    />
                </div>
                <div className="space-y-4 text-center md:text-left">
                    <div className="relative text-center py-2 rounded-lg">
                        <AnimatedGradientText className="text-4xl md:text-5xl font-extrabold mb-4 inline-block">
                            Our Mission
                        </AnimatedGradientText>
                    </div>

                    <ul className="space-y-4 list-disc text-gray-600 dark:text-white pl-6">
                        <li>
                            <span className="text-purple-500 font-semibold">We are comitted</span>, to revolutionizing the DevOps experience by providing development teams of all
                            sizes to deploy, manage, and scale their applications with ease.
                        </li>
                        <li>
                            <span className="text-purple-500 font-semibold">As industry shifts</span> to
                            microservices architectures, we understand the growing need for robust deployment solutions.
                        </li>
                        <li>
                            <span className="text-purple-500 font-semibold">Our mission</span>, is to help companies innovate faster and deliver better software to their users.
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}