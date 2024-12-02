import FeatureSection from "@/components/homepage/FeatureSection";
import HeroSection from "@/components/homepage/HeroSection";
import type {Metadata} from "next";
import FeatureService from "@/components/homepage/FeatureService";
import FrameworkSection from "@/components/homepage/FrameworkSection";
import ServiceComponent from "@/components/homepage/ServiceComponent";
import WhyUsSection from "@/components/homepage/WhyUsSection";

export const metadata: Metadata = {
    title: "Home Page",
    description: "Cloudinator Application",
};

export default function HomePage() {
  return (
      <>
          <HeroSection />
          <FeatureSection />
          <ServiceComponent />
          <FrameworkSection />
          <FeatureService />
          <WhyUsSection />
      </>
  );
}
