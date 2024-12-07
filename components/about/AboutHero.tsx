import { Button } from "@/components/ui/button"

export default function AboutHero() {
    return (
        <section className="container px-4 py-24 mx-auto">
            <div className="max-w-3xl mx-auto text-center space-y-8">
                <h1 className="text-4xl font-bold tracking-tight text-purple-500 sm:text-5xl">
                    Welcome to Cloudinator
                </h1>
                <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
                    At Cloudinator, we are a catalyst in revolutionizing the way businesses operate by harnessing the power of automation to find pivotal areas requiring attention. In this process, we believe in identifying solutions.
                </p>
                <div>
                    <Button
                        className="bg-purple-500 hover:bg-[#5B32C7] text-white px-8 py-2 rounded-md"
                    >
                        Connect
                    </Button>
                </div>
            </div>
        </section>
    )
}

