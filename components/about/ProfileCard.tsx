'use client'

import Image from "next/image"
import { Github, Linkedin, Twitter } from 'lucide-react'
import Link from "next/link"

interface TeamMember {
    name: string;
    role: string;
    image: string;
    social: {
        github?: string;
        linkedin?: string;
        twitter?: string;
    };
}

const mentors: TeamMember[] = [
    {
        name: "Kay Keo",
        role: "Instructor",
        image: "/placeholder.svg?height=200&width=200",
        social: {
            github: "#",
            linkedin: "#",
            twitter: "#"
        }
    },
    {
        name: "Ing Muyleang",
        role: "Instructor",
        image: "/placeholder.svg?height=200&width=200",
        social: {
            github: "#",
            linkedin: "#",
            twitter: "#"
        }
    }
]

const team: TeamMember[] = [
    {
        name: "Rous Sovanra",
        role: "DevOps Engineer",
        image: "/sovanra.jpg?height=200&width=200",
        social: {
            github: "#",
            linkedin: "#",
            twitter: "#"
        }
    },
    {
        name: "On Soben",
        role: "Software Engineer",
        image: "/ben.png",
        social: {
            github: "#",
            linkedin: "#",
            twitter: "#"
        }
    },
    {
        name: "Mom Makara",
        role: "Backend Engineer",
        image: "/placeholder.svg?height=200&width=200",
        social: {
            github: "#",
            linkedin: "#",
            twitter: "#"
        }
    },
    {
        name: "Pov Sokny",
        role: "DevOps Engineer",
        image: "/placeholder.svg?height=200&width=200",
        social: {
            github: "#",
            linkedin: "#",
            twitter: "#"
        }
    },
    {
        name: "Sol Vathanak",
        role: "DevOps Engineer",
        image: "/vathanak.jpg",
        social: {
            github: "#",
            linkedin: "#",
            twitter: "#"
        }
    }
]

function ProfileCard({ member }: { member: TeamMember }) {
    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="relative w-52 h-52">
                <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-full"
                />
            </div>
            <div className="text-center">
                <h3 className="font-medium">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
            </div>
            <div className="flex space-x-2">
                {member.social.github && (
                    <Link
                        href={member.social.github}
                        className="text-purple-500 hover:text-purple-600"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Github className="w-5 h-5" />
                    </Link>
                )}
                {member.social.linkedin && (
                    <Link
                        href={member.social.linkedin}
                        className="text-purple-500 hover:text-purple-600"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Linkedin className="w-5 h-5" />
                    </Link>
                )}
                {member.social.twitter && (
                    <Link
                        href={member.social.twitter}
                        className="text-purple-500 hover:text-purple-600"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Twitter className="w-5 h-5" />
                    </Link>
                )}
            </div>
        </div>
    )
}

export default function InteractiveTeamSection() {
    return (
        <div className="container py-16 mx-auto">
            <section className="space-y-8 mb-16">
                <h2 className="text-2xl font-bold text-center text-purple-500">Our Mentors</h2>
                <div className="flex justify-center gap-16">
                    {mentors.map((mentor) => (
                        <ProfileCard key={mentor.name} member={mentor}/>
                    ))}
                </div>
            </section>

            <section className="space-y-8">
                <h2 className="text-2xl font-bold text-center text-[#1e2c41]">Our Team</h2>
                <div className="grid gap-16 max-w-5xl mx-auto">
                    {/* First row - 3 cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {team.slice(0, 3).map((member) => (
                            <ProfileCard key={member.name} member={member}/>
                        ))}
                    </div>
                    {/* Second row - 2 cards centered */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:w-2/3 mx-auto">
                        {team.slice(3).map((member) => (
                            <ProfileCard key={member.name} member={member}/>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

