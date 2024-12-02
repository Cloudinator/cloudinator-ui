import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

type FooterProps = React.HTMLAttributes<HTMLElement>

export function SiteFooter({ className, ...props }: FooterProps) {
    return (
        <footer className={cn("border-t bg-background", className)} {...props}>
            <div className="container px-4 md:px-6">
                <div className="grid gap-8 py-8 md:grid-cols-2 lg:grid-cols-5">
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image
                                src="/placeholder.svg"
                                alt="Cloudinator Logo"
                                width={40}
                                height={40}
                                className="h-10 w-10"
                            />
                            <span className="text-xl font-bold">Cloudinator</span>
                        </Link>
                    </div>
                    <div className="grid gap-4 lg:col-span-3 lg:grid-cols-3">
                        <div className="space-y-3">
                            <h3 className="text-base font-medium text-violet-500">Service</h3>
                            <ul className="space-y-2.5">
                                <li>
                                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        Cloud Storage
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        Private Git Server
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        Auto Deploy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        Microservice
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-base font-medium text-violet-500">Deployment</h3>
                            <ul className="space-y-2.5">
                                <li>
                                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        Frontend
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        Backend
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        Database
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        Microservice
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-base font-medium text-violet-500">Explore</h3>
                            <ul className="space-y-2.5">
                                <li>
                                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        Features & Service
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        Documentation
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        Start Building
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        About Us
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <h3 className="text-base font-medium text-violet-500 mb-3">Our Sponsor</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((sponsor) => (
                                <Link
                                    key={sponsor}
                                    href="#"
                                    className="block transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg overflow-hidden"
                                >
                                    <Image
                                        src="/placeholder.svg"
                                        alt={`Sponsor ${sponsor}`}
                                        width={120}
                                        height={60}
                                        className="w-auto h-8"
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="border-t py-6 text-center text-sm text-muted-foreground">
                    <p>
                        © 2024 Your DevOps Platform by{' '}
                        <Link
                            href="https://cstad.com"
                            className="text-violet-500 hover:text-violet-600 font-medium transition-colors"
                        >
                            ISTAD
                        </Link>
                        , All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

