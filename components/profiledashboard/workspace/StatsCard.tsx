import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatsCardProps {
    title: string
    value: string | number
    change?: string
    icon: React.ReactNode
    changeValue?: string
    className?: string
}

export function StatsCard({ title, value, change, icon, changeValue, className }: StatsCardProps) {
    const isPositive = changeValue?.startsWith('+')

    return (
        <Card className={cn("overflow-hidden transition-all hover:shadow-md cursor-pointer", className)}>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">{title}</p>
                        <div className="flex items-center gap-2">
                            <h2 className="text-3xl font-bold">{value}</h2>
                            {changeValue && (
                                <span className={cn(
                                    "text-sm font-medium",
                                    isPositive ? "text-green-500" : "text-red-500"
                                )}>
                  {changeValue}
                </span>
                            )}
                        </div>
                        {change && (
                            <p className="text-xs text-muted-foreground">{change}</p>
                        )}
                    </div>
                    <div className="text-purple-500">
                        {icon}
                    </div>
                </div>
                {title === "AVG Workspace" && (
                    <div className="mt-4 h-2 w-full rounded-full bg-purple-100">
                        <div
                            className="h-full rounded-full bg-purple-500"
                            style={{ width: '75%' }}
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

