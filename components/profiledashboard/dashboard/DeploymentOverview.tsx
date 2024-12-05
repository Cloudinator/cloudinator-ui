"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
    { name: "Mon", successful: 40, failed: 2 },
    { name: "Tue", successful: 45, failed: 3 },
    { name: "Wed", successful: 50, failed: 1 },
    { name: "Thu", successful: 55, failed: 2 },
    { name: "Fri", successful: 60, failed: 0 },
    { name: "Sat", successful: 30, failed: 1 },
    { name: "Sun", successful: 25, failed: 0 },
]

export default function DeploymentOverview() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                />
                <Tooltip />
                <Bar dataKey="successful" fill="#4ade80" radius={[4, 4, 0, 0]} stackId="stack" />
                <Bar dataKey="failed" fill="#f87171" radius={[4, 4, 0, 0]} stackId="stack" />
            </BarChart>
        </ResponsiveContainer>
    )
}