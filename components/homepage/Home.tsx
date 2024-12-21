"use client";

import FeatureSection from "@/components/homepage/FeatureSection";
import HeroSection from "@/components/homepage/HeroSection";
import FeatureService from "@/components/homepage/FeatureService";
import FrameworkSection from "@/components/homepage/FrameworkSection";
import ServiceComponent from "@/components/homepage/ServiceComponent";
import {ParallaxProvider} from "react-scroll-parallax";
import WhyUs from "@/components/homepage/WhyUsSection";
import {useTestEndpointQuery} from "@/redux/api/file";

export default function HomePage() {

    const {data} = useTestEndpointQuery();

    console.log(
        data)

    return (
        <>
            <ParallaxProvider>
                <HeroSection />
            </ParallaxProvider>
            <FeatureSection />
            <ServiceComponent />
            <FrameworkSection />
            <FeatureService />
            <WhyUs />
        </>
    );
}
