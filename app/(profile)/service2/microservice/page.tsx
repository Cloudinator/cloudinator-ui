"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { SpringMicroservice } from "@/components/profiledashboard/workspace/service/spring-microservice/SpringMicroservice";
import Link from "next/link";
import { ServiceCreationFlow } from "@/components/profiledashboard/workspace/service/spring-microservice/ServiceCreationFlow";

const services = [
    {
        name: "User Service",
        description: "Handles user registration, authentication, and test-profile management.",
        version: "1.0.0",
        dependencies: 2,
        technologies: ["Spring Boot", "Spring Security", "PostgreSQL"],
    },
    {
        name: "Product Service",
        description: "Manages product catalog, inventory, and pricing.",
        version: "1.2.3",
        dependencies: 3,
        technologies: ["Spring Boot", "Spring Data JPA", "MongoDB"],
    },
    {
        name: "Order Service",
        description: "Processes customer orders and manages order history.",
        version: "2.5.0",
        dependencies: 4,
        technologies: ["Spring Boot", "Spring Cloud", "MySQL"],
    },
    {
        name: "Payment Service",
        description: "Handles payment processing and transaction management.",
        version: "1.5.0",
        dependencies: 2,
        technologies: ["Spring Boot", "Stripe API", "Redis"],
    },
    {
        name: "Notification Service",
        description: "Sends notifications via email and SMS to users.",
        version: "0.9.0",
        dependencies: 1,
        technologies: ["Spring Boot", "RabbitMQ", "Twilio"],
    },
    {
        name: "Review Service",
        description: "Manages user reviews and ratings for products.",
        version: "1.1.0",
        dependencies: 2,
        technologies: ["Spring Boot", "Spring Data JPA", "Elasticsearch"],
    },
];

export default function SpringMicroservices() {
    return (
        <div className="container mx-auto p-6 bg-white dark:bg-gray-900"> {/* Background color for light and dark mode */}
            <div className="flex items-center justify-between pb-6">
                <div className="flex items-center space-x-2">
                    <Link href="/workspace/service">
                        <ArrowLeft className="h-8 w-8 text-purple-500" />
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-purple-500">
                        Spring-Microservice
                    </h1>
                </div>
                <Button className="bg-purple-500 text-white hover:bg-purple-400">
                    <span className="mr-2">+</span>
                    Create New Service
                </Button>
            </div>

            {/* Embed the ServiceCreationFlow here */}
            <ServiceCreationFlow />

            <Tabs defaultValue="relationships" className="mb-6">
                <TabsList>
                    <TabsTrigger value="relationships">Project Relationships</TabsTrigger>
                    <TabsTrigger value="projects">Spring Projects</TabsTrigger>
                </TabsList>
            </Tabs>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                    <div key={index} className="relative">
                        <SpringMicroservice {...service} />
                        {index !== services.length - 1 && (
                            <div className="absolute -right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}