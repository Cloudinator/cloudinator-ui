'use client'
import { Github, Linkedin, Twitter } from 'lucide-react'
import {ArtisticProfile} from "@/components/about/TeamCard";

const teamMembers = [
    {
        name: "kay Keo",
        role: "Mentor",
        quote: "Every bug and error I faced makes me stronger. At this rate, I'll soon be invincible!",
        imageSrc: "/keo.jpg",
        socialLinks: [
            { icon: Github, href: "https://github.com" },
            { icon: Linkedin, href: "https://linkedin.com" },
            { icon: Twitter, href: "https://twitter.com" },
        ],
    },
    {
        name: "Ing Muyleang",
        role: "Mentor",
        quote: "Design is not just what it looks like and feels like. Design is how it works.",
        imageSrc: "/muyleang.jpg",
        socialLinks: [
            { icon: Github, href: "https://github.com" },
            { icon: Linkedin, href: "https://linkedin.com" },
            { icon: Twitter, href: "https://twitter.com" },
        ],
    },
    {
        name: "Ruos Sovanra",
        role: "Full Stack Developer",
        quote: "Don't limit yourself or Say no to fast. At least give it a try.",
        imageSrc: "/sovanra.jpg",
        socialLinks: [
            { icon: Github, href: "https://github.com" },
            { icon: Linkedin, href: "https://linkedin.com" },
        ],
    },
    {
        name: "On Soben",
        role: "Backend Developer",
        quote: "In God we trust. All others must bring data.",
        imageSrc: "/ben.png",
        socialLinks: [
            { icon: Github, href: "https://github.com" },
            { icon: Linkedin, href: "https://linkedin.com" },
            { icon: Twitter, href: "https://twitter.com" },
        ],
    },
    {
        name: "Sol Vathanak",
        role: "Frontend Developer",
        quote: "Automate everything that can be automated.",
        imageSrc: "/vathanak.jpg",
        socialLinks: [
            { icon: Github, href: "https://github.com" },
            { icon: Linkedin, href: "https://linkedin.com" },
        ],
    },
    {
        name: "Pov Sokny",
        role: "Frontend Developer",
        quote: "Make it simple, but significant.",
        imageSrc: "/sokny.jpg",
        socialLinks: [
            { icon: Linkedin, href: "https://linkedin.com" },
            { icon: Twitter, href: "https://twitter.com" },
        ],
    },
    {
        name: "Mom Makara",
        role: "Infrastucture Engineer",
        quote: "Security is a process, not a product.",
        imageSrc: "/makara.jpg",
        socialLinks: [
            { icon: Github, href: "https://github.com" },
            { icon: Linkedin, href: "https://linkedin.com" },
            { icon: Twitter, href: "https://twitter.com" },
        ],
    },
]

export default function TeamPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-5xl font-bold text-center text-gray-900 mb-16 relative">
                    Our Team
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-green-500 rounded-full"></span>
                </h1>
                <div className="space-y-24">
                    {teamMembers.map((member, index) => (
                        <ArtisticProfile key={index} {...member} isReversed={index % 2 !== 0} />
                    ))}
                </div>
            </div>
        </div>
    )
}

