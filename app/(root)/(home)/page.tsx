import HeroSection from "@/components/homepage/HeroSection";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Home Page",
    description: "Cloudinator Application",
};

export default function HomePage() {
  return (
    <HeroSection />
  );
}
