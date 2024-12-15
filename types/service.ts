export type ServiceType = 'frontend' | 'backend' | 'database' | 'subworkspace';

export interface Service {
    name: string;
    gitUrl: string;
    branch: string;
    subdomain: string;
    type: ServiceType;
}

export interface Workspace {
    uuid: string;
    name: string;
}


export interface SpringProject {
    id: string
    name: string
    description: string
    version: string
    dependencies: string[]
}

export const springProjects: SpringProject[] = [
    {
        id: "1",
        name: "user-service",
        description: "Core user management functionality",
        version: "2.5.0",
        dependencies: ["web", "data-jpa", "security"],
    },
    {
        id: "2",
        name: "payment-processor",
        description: "Payment gateway integration",
        version: "2.5.0",
        dependencies: ["web", "data-jpa", "security", "amqp"],
    },
    {
        id: "3",
        name: "notification-service",
        description: "Handles sending notifications",
        version: "2.5.0",
        dependencies: ["web", "amqp", "mail"],
    },
    {
        id: "4",
        name: "order-service",
        description: "Manages order processing",
        version: "2.5.0",
        dependencies: ["web", "data-jpa", "amqp"],
    },
]

export const springDependencies = [
    { id: "web", label: "Spring Web" },
    { id: "data-jpa", label: "Spring Data JPA" },
    { id: "security", label: "Spring Security" },
    { id: "amqp", label: "Spring AMQP" },
    { id: "actuator", label: "Spring Actuator" },
    { id: "cloud-config", label: "Spring Cloud Config" },
    { id: "eureka-client", label: "Eureka Client" },
    { id: "mail", label: "Spring Mail" },
]


