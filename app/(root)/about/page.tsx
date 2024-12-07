import type {Metadata} from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutSections from "@/components/about/Section";
import TeamSection from "@/components/about/ProfileCard";

export const metadata: Metadata = {
    title: "About Page",
    description: "Cloudinator Application",
};

export default function AboutPage() {
    return (
        <>
            <AboutHero />
            <AboutSections />
            <TeamSection />
        </>
    );
}
