"use client";

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { AnimatedGradientText } from "../AnimatedGradientText";

export default function WhyUs() {
    return (
        <section className="container mx-auto px-4 pb-24">
            <div className="grid gap-8 lg:grid-cols-[1fr,1.5fr] items-center justify-center">
                <div className="space-y-4 text-center">
                    
                    <AnimatedGradientText className="text-4xl md:text-5xl font-extrabold mb-4 inline-block">
                        Why Us?
                    </AnimatedGradientText>

                    <div className="relative h-[300px] w-[300px]">
                        <Image
                            src="/whyus.png"
                            alt="Decorative illustration"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 justify-items-center">
                    <Card className="bg-purple-600 text-white transition-all duration-300 ease-in-out hover:bg-purple-700 hover:scale-105 hover:shadow-xl">
                        <CardContent className="p-6 space-y-2 text-center">
                            <h3 className="text-xl font-semibold">Expertise</h3>
                            <p className="text-purple-100">
                                Our team of experienced experts have the knowledge and expertise to deliver solutions that meet your unique needs.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-purple-600 text-white transition-all duration-300 ease-in-out hover:bg-purple-700 hover:scale-105 hover:shadow-xl">
                        <CardContent className="p-6 space-y-2 text-center">
                            <h3 className="text-xl font-semibold">Tech</h3>
                            <p className="text-purple-100">
                                We stay up to date with the latest trends and technologies in the industry to give you the best and innovative solutions.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-purple-600 text-white transition-all duration-300 ease-in-out hover:bg-purple-700 hover:scale-105 hover:shadow-xl">
                        <CardContent className="p-6 space-y-2 text-center">
                            <h3 className="text-xl font-semibold">Solutions</h3>
                            <p className="text-purple-100">
                                We help to personalize approaches to every project, working closely with you to understand your business and deliver specific solutions.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-purple-600 text-white transition-all duration-300 ease-in-out hover:bg-purple-700 hover:scale-105 hover:shadow-xl">
                        <CardContent className="p-6 space-y-2 text-center">
                            <h3 className="text-xl font-semibold">Result</h3>
                            <p className="text-purple-100">
                                Our track record speaks for itself – we deliver successful outcomes and maintain lasting relationships with our satisfied clients.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}