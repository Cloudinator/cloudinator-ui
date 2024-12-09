import { Card, CardContent } from "@/components/ui/card"
import { Plus, Target, Shield, Network } from 'lucide-react'

export default function ValuesSection() {
    const values = [
        {
            icon: Plus,
            title: "Innovation",
            description: "We constantly push the boundaries of what's possible in DevOps, always seeking new and better ways to solve problems."
        },
        {
            icon: Target,
            title: "Simplicity",
            description: "We believe in making complex technologies accessible and easy to use for developers of all skill levels."
        },
        {
            icon: Shield,
            title: "Reliability",
            description: "Our users trust us with their deployments, and we take that responsibility seriously by ensuring our platform is secure reliable and performant."
        },
        {
            icon: Network,
            title: "Community Engagement",
            description: "We actively engage with and contribute to the DevOps community, sharing knowledge and collaborating on open-source projects."
        }
    ]

    return (
        <section className="flex items-center justify-center min-h-screen py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 text-purple-500">
                    Our Values
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
                    {values.map((value, index) => {
                        const Icon = value.icon
                        return (
                            <Card key={index} className="border-none shadow-none">
                                <CardContent className="p-0">
                                    <div className="flex items-start gap-4">
                                        <div className="rounded-lg p-2 bg-muted">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="font-semibold">{value.title}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {value.description}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}