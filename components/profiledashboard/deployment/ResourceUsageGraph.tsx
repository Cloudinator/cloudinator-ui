'use client'

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
    { date: "26 Nov", cpu: 40, ram: 35, instance: 45 },
    { date: "27 Nov", cpu: 30, ram: 45, instance: 25 },
    { date: "28 Nov", cpu: 55, ram: 50, instance: 40 },
    { date: "29 Nov", cpu: 25, ram: 35, instance: 45 },
    { date: "30 Nov", cpu: 45, ram: 40, instance: 30 },
    { date: "01 Dec", cpu: 35, ram: 30, instance: 45 },
    { date: "02 Dec", cpu: 40, ram: 45, instance: 35 },
    { date: "03 Dec", cpu: 50, ram: 35, instance: 40 },
    { date: "04 Dec", cpu: 35, ram: 45, instance: 30 },
]

export default function ResourceUsageGraph() {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <XAxis
                        dataKey="date"
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
                        tickFormatter={(value) => `${value}%`}
                    />
                    <Line
                        type="monotone"
                        dataKey="cpu"
                        stroke="#8B5CF6"
                        strokeWidth={2}
                        dot={false}
                    />
                    <Line
                        type="monotone"
                        dataKey="ram"
                        stroke="#22C55E"
                        strokeWidth={2}
                        dot={false}
                    />
                    <Line
                        type= "monotone"
                        dataKey="instance"
                        stroke="#EAB308"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-8 p-14">
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-purple-500" />
                    <span className="text-sm">CPU</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-sm">RAM</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-yellow-500" />
                    <span className="text-sm">Instance</span>
                </div>
            </div>
        </div>
    )
}