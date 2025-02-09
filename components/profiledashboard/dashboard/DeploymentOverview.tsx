"use client"

import { TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
    desktop: {
        label: "failure",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "success",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

type Placeholder = "-" | "No data";

type PropsType = {
    success: number | Placeholder; // Can be a number or a specific placeholder
    failure: number | Placeholder; // Can be a number or a specific placeholder
};

export default function DeploymentOverview({ success, failure }: PropsType) {
    // Handle placeholder values for totalVisitors
    const totalVisitors = typeof success === "number" && typeof failure === "number"
        ? success + failure
        : "-";

    // Format chart data, ensuring numeric values
    const chartData = [
        {
            month: "january",
            success: typeof success === "number" ? success : 0, // Use 0 if success is a placeholder
            failure: typeof failure === "number" ? failure : 0, // Use 0 if failure is a placeholder
        }
    ];

    const date = Date.now();

    const formattedDate = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(date);

    console.log(formattedDate);

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Overall Static Build</CardTitle>
                <CardDescription>{formattedDate}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 items-center pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[250px]"
                >
                    <RadialBarChart
                        data={chartData}
                        endAngle={180}
                        innerRadius={80}
                        outerRadius={130}
                    >
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) - 16}
                                                    className="fill-foreground text-2xl font-bold"
                                                >
                                                    {typeof totalVisitors === "number"
                                                        ? totalVisitors.toLocaleString()
                                                        : totalVisitors}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 4}
                                                    className="fill-muted-foreground"
                                                >
                                                    Total Build
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                        <RadialBar
                            dataKey="failure"
                            stackId="a"
                            cornerRadius={5}
                            fill="var(--color-desktop)"
                            className="stroke-transparent stroke-2"
                        />
                        <RadialBar
                            dataKey="success"
                            fill="var(--color-mobile)"
                            stackId="a"
                            cornerRadius={5}
                            className="stroke-transparent stroke-2"
                        />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total builds for the last 6 months
                </div>
            </CardFooter>
        </Card>
    );
}