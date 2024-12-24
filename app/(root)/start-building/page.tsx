import type { Metadata } from "next";
import StartBuildingPage from "@/components/startbuilding/StartBuilding";

export const metadata: Metadata = {
    title: "Start Building with Cloudinator | Launch Your Cloud Project",
    description: "Begin your cloud journey with Cloudinator. Our Start Building page guides you through initializing your project, selecting services, and deploying your first application with ease.",
    keywords: [
        "start building",
        "cloud project initialization",
        "Cloudinator platform",
        "cloud deployment",
        "microservices setup",
        "DevOps kickstart",
        "cloud application launch"
    ],
    openGraph: {
        title: "Cloudinator: Start Building Your Cloud Project Today",
        description: "Jumpstart your cloud development with Cloudinator. Our intuitive platform helps you initialize, configure, and deploy your project in minutes.",
        url: "https://dynamic.psa-khmer.world/service/start-building",
        siteName: "Cloudinator",
        images: [
            {
                url: "https://dynamic.psa-khmer.world/media/api/v1/medias/view/4a2a1572-3c7f-4b20-bf81-caa094e08d4b.png",
                width: 1200,
                height: 630,
                alt: "Start Building with Cloudinator",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    alternates: {
        canonical: "https://dynamic.psa-khmer.world/service/start-building",
    },
};

export default function StartBuilding() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-100">
            <StartBuildingPage />
        </main>
    );
}

