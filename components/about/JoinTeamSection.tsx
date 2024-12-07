import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function JoinTeamSection() {
    return (
        <section className="relative w-full overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-transparent to-purple-100/50" />

            <div className="container relative px-4 py-24 mx-auto">
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-purple-500">
                        Join Our Team
                    </h2>

                    <p className="text-muted-foreground text-lg max-w-[600px]">
                        We are always looking for talented individuals who are passionate about DevOps and want to make a difference. Check out our open positions and join us in shaping the future of software deployment.
                    </p>

                    <Button
                        asChild
                        className="bg-purple-600 hover:bg-purple-700 text-white px-8"
                        size="lg"
                    >
                        <Link href="#">
                            View Open Positions
                        </Link>
                    </Button>

                    <div className="relative w-full max-w-[400px] aspect-[4/3] mt-8">
                        <Image
                            src="/group.png"
                            alt="Team collaboration illustration"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

