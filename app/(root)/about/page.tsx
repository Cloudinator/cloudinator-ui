import type {Metadata} from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutSections from "@/components/about/Section";
import ValuesSection from "@/components/about/ValuesSection";
import JoinTeamSection from "@/components/about/JoinTeamSection";
import TeamPage from "@/components/about/TeamSection";

export const metadata: Metadata = {
    title: "About",
    description: "About Page Cloudinator Application",
};

export default function AboutPage() {
    return (
        <>
            <AboutHero />
            <AboutSections />
            <TeamPage />
            <ValuesSection />
            <JoinTeamSection />
        </>
    );
}
