import type {Metadata} from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutSections from "@/components/about/Section";
import TeamSection from "@/components/about/ProfileCard";
import ValuesSection from "@/components/about/ValuesSection";
import JoinTeamSection from "@/components/about/JoinTeamSection";

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
            <ValuesSection />
            <JoinTeamSection />
        </>
    );
}
