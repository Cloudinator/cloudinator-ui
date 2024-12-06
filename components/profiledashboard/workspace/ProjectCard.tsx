
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users } from 'lucide-react'
import Link from "next/link";

interface ProjectCardProps {
    id: string
    name: string
    updatedAt: string
    progress: number
    tag: string
    teamSize: number
}

export function ProjectCard({ name, updatedAt, progress, tag, teamSize }: ProjectCardProps) {
    return (
        <Link href={`/workspace/service`} className="block transition-transform hover:scale-105">
            <Card className="h-full">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">{name}</h3>
                        <Badge variant="outline">{tag}</Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Last updated: {updatedAt}</p>
                    <Progress value={progress} className="mb-2" />
                    <p className="text-sm text-right">{progress}% complete</p>
                </CardContent>
                <CardFooter>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        {teamSize} team members
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}

