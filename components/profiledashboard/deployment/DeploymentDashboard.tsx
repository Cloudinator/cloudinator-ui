"use client"

import {
    AlertCircle,
    CheckCircle2,
    Clock,
    ExternalLink,
    GitBranch,
    Globe,
    MonitorSmartphone,
    RefreshCcw,
    ShoppingCart
} from 'lucide-react'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import React from "react";

interface Deployment {
    id: string
    name: string
    status: "success" | "warning" | "error"
    type: "blog-api" | "e-commerce" | "mobile-app"
    lastDeployed: string
    branch: string
}

const deployments: Deployment[] = [
    {
        id: "1",
        name: "blog-api",
        status: "success",
        type: "blog-api",
        lastDeployed: "5 min ago",
        branch: "main"
    },
    {
        id: "2",
        name: "e-commerce",
        status: "warning",
        type: "e-commerce",
        lastDeployed: "8 min ago",
        branch: "develop"
    },
    {
        id: "3",
        name: "mobile-app",
        status: "error",
        type: "mobile-app",
        lastDeployed: "12 min ago",
        branch: "feature/update-components"
    }
]

export default function DeploymentDashboard() {
    const getStatusIcon = (status: Deployment["status"]) => {
        switch (status) {
            case "success":
                return <CheckCircle2 className="h-5 w-5 text-green-500" />
            case "warning":
                return <AlertCircle className="h-5 w-5 text-yellow-500" />
            case "error":
                return <AlertCircle className="h-5 w-5 text-red-500" />
        }
    }

    const getServiceIcon = (type: Deployment["type"]) => {
        switch (type) {
            case "blog-api":
                return <GitBranch className="h-5 w-5" />
            case "e-commerce":
                return <ShoppingCart className="h-5 w-5" />
            case "mobile-app":
                return <MonitorSmartphone className="h-5 w-5" />
        }
    }

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">

                <div className="flex items-center space-x-2">
                    <Globe className="h-8 w-8 text-purple-500"/>
                    <h1 className="text-3xl font-bold tracking-tight text-purple-500">
                        Deployment
                    </h1>
                </div>
                <Button variant="outline" size="sm">
                    <RefreshCcw className="mr-2 h-4 w-4"/>
                    Refresh
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
                {deployments.map((deployment) => (
                    <Card key={deployment.id} className="relative overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="flex items-center space-x-2">
                                {getServiceIcon(deployment.type)}
                                <h2 className="font-semibold">{deployment.name}</h2>
                            </div>
                            {getStatusIcon(deployment.status)}
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>{deployment.lastDeployed}</span>
                            </div>
                            <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
                                <GitBranch className="h-4 w-4" />
                                <span>{deployment.branch}</span>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" size="sm">
                                Monitor
                            </Button>
                            <Link href="#" className="flex items-center space-x-1">
                                <Button variant="outline" size="sm">
                                    Preview
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardFooter>
                        <div
                            className={`absolute inset-x-0 top-0 h-1 ${
                                deployment.status === "success"
                                    ? "bg-green-500"
                                    : deployment.status === "warning"
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                            }`}
                        />
                    </Card>
                ))}
            </div>
        </div>
    )
}

