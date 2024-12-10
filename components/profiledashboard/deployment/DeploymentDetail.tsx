import Link from "next/link";
import { ArrowLeft, Eye } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import ResourceUsageGraph from "@/components/profiledashboard/deployment/ResourceUsageGraph";
import React from "react";
import WebsitePreview from "@/components/profiledashboard/deployment/WebsitePreview";

export default function ProjectDetail() {
    const previewUrl = "https://cloudinator-ui.naktech.pro";

    return (
        <div className="min-h-screen bg-background p-12">
            <div className="border-b">
                <div className="container py-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/deployments"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Projects
                        </Link>
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-semibold">Project ID</h1>
                            <span className="text-xl text-purple-500">2a8s7se8</span>
                            <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                                Success
                            </Badge>
                            <span className="text-sm text-muted-foreground ml-2">from branch master</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-b">
                <div className="container">
                    <Tabs defaultValue="deployments" className="w-full">
                        <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b rounded-none">
                            {[
                                "Deployments",
                                "Environments",
                                "Variables",
                                "Database",
                                "Monitoring",
                                "Security",
                                "Logs",
                            ].map((tab) => (
                                <TabsTrigger
                                    key={tab}
                                    value={tab.toLowerCase()}
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-500 data-[state=active]:bg-transparent"
                                >
                                    {tab}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </div>
            </div>
            <div className="container py-8">
                <div className="grid gap-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card>
                            <CardHeader>
                                <h2 className="text-lg font-semibold">Service List Table</h2>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-medium">Service Name</TableCell>
                                            <TableCell>Blog-API</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Status</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    Running
                                                    <span className="h-2 w-2 rounded-full bg-green-500" />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Last Updated</TableCell>
                                            <TableCell>2024-11-26 17:15</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Environment</TableCell>
                                            <TableCell>Production</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        {/* Clickable Preview Card */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2 px-6">
                                    <Eye className="h-5 w-5" />
                                    <h2 className="text-lg font-semibold">Preview</h2>
                                </div>
                            </CardHeader>

                            {/* Wrap the content in a Link */}
                            <Link href={previewUrl} passHref target="_blank" rel="noopener noreferrer">
                                {/* Use a div with cursor-pointer for better UX */}
                                <CardContent className="cursor-pointer space-y-4 hover:bg-gray-100 transition duration-200 ease-in-out p-8">
                                    <div className="flex items-center justify-between px-4">
                                        <span className="text-sm">Visit Here</span>
                                        <div className="flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-green-500" />
                                            <span className="text-sm text-green-600">Healthy</span>
                                        </div>
                                    </div>

                                    <div className="px-4 text-sm text-muted-foreground">{previewUrl}</div>


                                    <WebsitePreview url={previewUrl} />



                                    {/* Badge indicating status */}
                                    <Badge variant="outline" className="mx-4 bg-green-50 text-green-700 border-green-200">
                                        Good
                                    </Badge>

                                </CardContent>
                            </Link>
                        </Card>
                    </div>

                    {/* Resource Usage Graph Card */}
                    <Card>
                        <CardHeader>
                            <h2 className="text-lg font-semibold">Resource Usage</h2>
                        </CardHeader>
                        <CardContent>
                            {/* Assuming ResourceUsageGraph is a valid component */}
                            <ResourceUsageGraph />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}