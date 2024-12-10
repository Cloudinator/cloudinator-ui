'use client'
import {Facebook, Github} from 'lucide-react'
import {ArtisticProfile} from "@/components/about/TeamCard";

const mentors = [
    {
        name: "kay Keo",
        role: "Mentor",
        quote: "Every bug and error I faced makes me stronger. At this rate, I'll soon be invincible!",
        imageSrc: "/keo.jpg",
        socialLinks: [
            { icon: Github, href: "https://github.com/keoKAY" },
            { icon: Facebook, href: "https://www.facebook.com/profile.php?id=100009996454316" },
        ],
    },
    {
        name: "Ing Muyleang",
        role: "Mentor",
        quote: "Design is not just what it looks like and feels like. Design is how it works.",
        imageSrc: "/muyleang.jpg",
        socialLinks: [
            { icon: Github, href: "https://github.com/https://github.com/MuyleangIng" },
            { icon: Facebook, href: "https://www.facebook.com/profile.php?id=100087853805063" },
        ],
    }
]

const teamMembers = [
    {
        name: "Ruos Sovanra",
        role: "DevOps Engineer",
        quote: "Don't limit yourself or Say no to fast. At least give it a try.",
        imageSrc: "/sovanra.jpg",
        socialLinks: [
            { icon: Github, href: "https://github.com/ruos-sovanra" },
            { icon: Facebook, href: "https://www.facebook.com/profile.php?id=100053055607689"}
        ],
    },
    {
        name: "On Soben",
        role: "DevOps Engineer",
        quote: "In God we trust. All others must bring data.",
        imageSrc: "/ben.png",
        socialLinks: [
            { icon: Github, href: "https://github.com/ONSOBEN/ONSOBEN" },
            { icon: Facebook, href: "https://www.facebook.com/profile.php?id=100074899490574" },
        ],
    },
    {
        name: "Sol Vathanak",
        role: "DevOps Engineer",
        quote: "Automate everything that can be automated.",
        imageSrc: "/vathanak.jpg",
        socialLinks: [
            { icon: Github, href: "https://github.com/VathanakSol" },
            { icon: Facebook, href: "https://www.facebook.com/vathanak.sol/"}
        ],
    },
    {
        name: "Pov Sokny",
        role: "DevOps Engineer",
        quote: "Make it simple, but significant.",
        imageSrc: "/sokny.jpg",
        socialLinks: [
            { icon: Github, href: "https://github.com/soknydev" },
            { icon: Facebook, href: "https://www.facebook.com/pov.sokny.560"}
        ],
    },
    {
        name: "Mom Makara",
        role: "DevOps Engineer",
        quote: "Security is a process, not a product.",
        imageSrc: "/makara.jpg",
        socialLinks: [
            { icon: Github, href: "https://github.com/Makara1122/Makara1122" },
            { icon: Facebook, href: "https://www.facebook.com/profile.php?id=100025015684276" },
        ],
    },
]

export default function TeamPage() {
    return (
        <div
            className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto py-16">
                <h1 className="text-5xl font-bold text-center text-gray-900 dark:text-white mb-16 relative">
                    Our Mentor
                    <span
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-purple-500 dark:bg-purple-400 rounded-full"></span>
                </h1>
                <div className="space-y-24">
                    {mentors.map((mentor, index) => (
                        <ArtisticProfile
                            key={index}
                            {...mentor}
                            isReversed={index % 2 !== 0}
                        />
                    ))}
                </div>
            </div>

            <div className="max-w-6xl mx-auto">
                <h1 className="text-5xl font-bold text-center text-gray-900 dark:text-white mb-16 relative">
                    Our Team
                    <span
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-purple-500 dark:bg-purple-400 rounded-full"></span>
                </h1>
                <div className="space-y-24">
                    {teamMembers.map((member, index) => (
                        <ArtisticProfile
                            key={index}
                            {...member}
                            isReversed={index % 2 !== 0}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}