import { MoreVertical, Users } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
    name: string
    updatedAt: string
    progress: number
    tag: string
    teamSize: number
}

export function ProjectCard({ name, updatedAt, progress, tag, teamSize }: ProjectCardProps) {
    return (
        <div className="p-4 border rounded-lg space-y-4 bg-white shadow-md">
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-medium">S</span>
                    </div>
                    <div>
                        <h3 className="font-medium">{name}</h3>
                        <p className="text-sm text-muted-foreground">Updated {updatedAt}</p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{progress}%</span>
                </div>
                <Progress value={progress} />
            </div>
            <div className="flex items-center justify-between">
                <span className="text-sm text-purple-500 px-2 py-1 bg-purple-100 rounded">{tag}</span>
                <div className="flex items-center text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    <span className="text-sm">{teamSize}</span>
                </div>
            </div>
        </div>
    )
}