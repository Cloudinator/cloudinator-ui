import { Globe2, Shield, Activity, Signal } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
    title: string
    value: string | number
    icon: React.ReactNode
}

function StatCard({ title, value, icon }: StatCardProps) {
    return (
        <Card>
            <CardContent className="flex items-center gap-4 p-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                    {icon}
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">{title}</p>
                    <h3 className="text-2xl font-bold">{value}</h3>
                </div>
            </CardContent>
        </Card>
    )
}

export function DomainStats() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
                title="Total Domain"
                value="200"
                icon={<Globe2 className="h-5 w-5 text-purple-500" />}
            />
            <StatCard
                title="Active Domains"
                value="200"
                icon={<Signal className="h-5 w-5 text-purple-500" />}
            />
            <StatCard
                title="SSL Protected"
                value="10"
                icon={<Shield className="h-5 w-5 text-purple-500" />}
            />
            <StatCard
                title="Avg. Health"
                value="50.0%"
                icon={<Activity className="h-5 w-5 text-purple-500" />}
            />
        </div>
    )
}

