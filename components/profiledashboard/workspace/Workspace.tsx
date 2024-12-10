import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, Filter, Folder, FolderGit2, Terminal, TrendingUp } from 'lucide-react';
import { ProjectCard } from "@/components/profiledashboard/workspace/ProjectCard";
import { StatsCard } from "@/components/profiledashboard/workspace/StatsCard";

const projects = [
    {
        name: "CI/CD Pipeline Implementation",
        updatedAt: "26 minutes ago",
        progress: 75,
        tag: "devops",
        teamSize: 4,
    },
    {
        name: "Infrastructure as Code with Terraform",
        updatedAt: "1 hour ago",
        progress: 50,
        tag: "infrastructure",
        teamSize: 3,
    },
    {
        name: "Containerization with Docker",
        updatedAt: "2 hours ago",
        progress: 90,
        tag: "containerization",
        teamSize: 5,
    },
    {
        name: "Monitoring and Logging Setup",
        updatedAt: "3 hours ago",
        progress: 30,
        tag: "monitoring",
        teamSize: 2,
    },
    {
        name: "Automated Testing Framework",
        updatedAt: "4 hours ago",
        progress: 60,
        tag: "testing",
        teamSize: 6,
    },
    {
        name: "Cloud Migration Strategy",
        updatedAt: "5 hours ago",
        progress: 80,
        tag: "cloud",
        teamSize: 4,
    },
    {
        name: "Kubernetes Cluster Management",
        updatedAt: "6 hours ago",
        progress: 40,
        tag: "container orchestration",
        teamSize: 3,
    },
    {
        name: "Security Best Practices Implementation",
        updatedAt: "7 hours ago",
        progress: 20,
        tag: "security",
        teamSize: 5,
    },
    {
        name: "Agile Development Practices Adoption",
        updatedAt: "8 hours ago",
        progress: 85,
        tag: "agile",
        teamSize: 2,
    },
    {
        name: "Collaboration Tools Integration",
        updatedAt: "9 hours ago",
        progress: 95,
        tag: "collaboration",
        teamSize: 1,
    },
    {
        name: "Performance Optimization Project",
        updatedAt: "10 hours ago",
        progress: 70,
        tag: "performance tuning",
        teamSize: 3,
    },
    {
        name: "Incident Response Plan Development",
        updatedAt: "11 hours ago",
        progress: 55,
        tag: "incident management",
        teamSize: 4,
    }
];

export default function Workspace() {
    return (
        <div className="w-full min-h-screen p-8 space-y-6 bg-white dark:bg-gray-900"> {/* Background color for light and dark mode */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Terminal className="h-8 w-8 text-purple-500" />
                    <h1 className="text-3xl font-bold tracking-tight text-purple-500">Workspace</h1>
                </div>

                <Button className="bg-purple-500 text-white hover:bg-purple-400">
                    <span className="mr-2">+</span>
                    Add Workspace
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <Button variant="outline" className="flex items-center gap-2 border-purple-500 text-purple-500 hover:bg-purple-100 dark:border-purple-300 dark:text-purple-300 hover:bg-purple-700">
                    <span>Personal Workspace</span>
                    <ChevronDown className="h-4 w-4" />
                </Button>

                <Button variant="outline" className="flex items-center gap-2 border-purple-500 text-purple-500 hover:bg-purple-100 dark:border-purple-300 dark:text-purple-300 hover:bg-purple-700">
                    <Filter className="h-4 w-4" />
                    <span>Filter project</span>
                </Button>

                <div className="flex-1">
                    <Input
                        type="text"
                        placeholder="Search projects..."
                        className="w-full border-purple-500 focus:border-purple-500 focus:ring focus:ring-purple-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title="Total Workspace"
                    value="25"
                    change="+10% from last month"
                    icon={<Terminal className="h-8 w-8" />}
                />
                <StatsCard
                    title="Total Sub-Workspace"
                    value="3"
                    change="+20% from last month"
                    icon={<Folder className="h-8 w-8" />}
                />
                <StatsCard
                    title="Total Projects"
                    value="37"
                    change="+16% from last month"
                    icon={<FolderGit2 className="h-8 w-8" />}
                />
                <StatsCard
                    title="Recently Workspace"
                    value="7"
                    changeValue="+7"
                    icon={<TrendingUp className="h-8 w-8" />}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project, index) => (
                    <ProjectCard id={""} key={index} {...project} />
                ))}
            </div>
        </div>
    );
}