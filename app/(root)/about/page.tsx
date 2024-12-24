import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutSections from "@/components/about/Section";
import ValuesSection from "@/components/about/ValuesSection";
import JoinTeamSection from "@/components/about/JoinTeamSection";
import TeamPage from "@/components/about/TeamSection";

export const metadata: Metadata = {
    title: "About Cloudinator | Our Mission, Team, and Values",
    description: "Discover the story behind Cloudinator, our innovative cloud deployment platform. Meet our team, learn about our values, and explore career opportunities in cloud technology.",
    keywords: [
        "Cloudinator",
        "cloud deployment",
        "team",
        "company values",
        "careers in cloud technology",
        "about us",
        "cloud innovation"
    ],
    openGraph: {
        title: "About Cloudinator | Revolutionizing Cloud Deployment",
        description: "Learn about the team driving innovation in cloud deployment and microservices management. Discover our mission, values, and why Cloudinator is the future of cloud technology.",
        url: "https://dynamic.psa-khmer.world/about",
        siteName: "Cloudinator",
        images: [
            {
                url: "https://dynamic.psa-khmer.world/media/api/v1/medias/view/4a2a1572-3c7f-4b20-bf81-caa094e08d4b.png",
                width: 1200,
                height: 630,
                alt: "Cloudinator Team and Office",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    alternates: {
        canonical: "https://dynamic.psa-khmer.world/about",
    },
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

