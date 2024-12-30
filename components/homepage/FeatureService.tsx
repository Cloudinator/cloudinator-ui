"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Cloud, Code, GitBranch, Layers, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedGradientText } from "../AnimatedGradientText";

type Feature = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  benefits: string[];
};

const FeatureCard = ({ feature }: { feature: Feature; index: number }) => (
  <motion.div className="h-full">
    <Card className="h-full flex flex-col transition-shadow duration-300 hover:shadow-xl hover:bg-gray-100 dark:hover:bg-gray-800">
      <CardHeader>
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          {React.createElement(feature.icon, {
            className: "h-6 w-6 text-primary",
          })}
        </div>
        <CardTitle className="text-[18px] font-bold mb-2 text-gray-900 dark:text-gray-100">
          {feature.title}
        </CardTitle>
        <CardDescription className="text-muted-foreground dark:text-gray-400 text-[18px]">
          {feature.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {feature.benefits.map((benefit: string, i: number) => (
            <li key={i} className="flex items-center">
              <CheckCircle className="mr-2 h-6 w-6 text-green-500 flex-shrink-0" />
              <span className="text-[18px] text-gray-700 dark:text-gray-300">
                {benefit}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  </motion.div>
);

export default function FeatureService() {
  return (
    <div className="flex flex-col min-h-screen bg-background dark:bg-gray-900">
      <main className="flex-grow container mx-auto px-4 pt-16 pb-4">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-16">
            <AnimatedGradientText className="text-4xl md:text-5xl font-extrabold mb-4 inline-block">
              Explore The Benefits of Our Features
            </AnimatedGradientText>

            <p className="text-muted-foreground max-w-3xl mx-auto text-lg dark:text-gray-400">
              Unique and powerful suite of software to run your entire business,
              brought to you by a company with the long-term vision to transform
              the way you work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}

const features = [
  {
    title: "Vercel-like Deployments",
    description:
      "Deploy web applications with the simplicity of Vercel, right from your DevOps platform.",
    icon: Cloud,
    benefits: [
      "One-click deployments",
      "Automatic HTTPS",
      "Instant global CDN",
    ],
  },
  {
    title: "Microservices Management",
    description: "Create, deploy, and manage microservices with ease.",
    icon: Layers,
    benefits: [
      "Service discovery",
      "Load balancing",
      "Inter-service communication",
    ],
  },
  {
    title: "CI/CD Pipelines",
    description:
      "Build, test, and deploy your code automatically with powerful CI/CD pipelines.",
    icon: GitBranch,
    benefits: [
      "Customizable workflows",
      "Parallel testing",
      "Automated deployments",
    ],
  },
  {
    title: "Infrastructure as Code",
    description: "Define and manage your infrastructure using code.",
    icon: Code,
    benefits: [
      "Version-controlled infrastructure",
      "Reproducible environments",
      "Easy scaling",
    ],
  },
  {
    title: "Monitoring and Logging",
    description:
      "Gain insights into your applications and infrastructure with comprehensive monitoring.",
    icon: Zap,
    benefits: [
      "Real-time metrics",
      "Customizable dashboards",
      "Alerts and notifications",
    ],
  },
  {
    title: "Security and Compliance",
    description:
      "Ensure your deployments are secure and compliant with industry standards.",
    icon: CheckCircle,
    benefits: [
      "Automated security scans",
      "Role-based access control",
      "Compliance reporting",
    ],
  },
];
