import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"

interface ProjectTypeCardProps {
    type: string
    icon: React.ElementType
    color: string
    bgColor: string
    label: string
    description: string
    isSelected: boolean
    onClick: () => void
}

export const ProjectTypeCard: React.FC<ProjectTypeCardProps> = React.memo(({
                                                                               icon: Icon, color, bgColor, label, description, isSelected, onClick
                                                                           }) => (
    <HoverCard>
        <HoverCardTrigger asChild>
            <Card
                className={`cursor-pointer transition-all ${
                    isSelected ? 'ring-2 ring-primary' : ''
                }`}
                onClick={onClick}
            >
                <CardContent className="p-6">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex flex-col items-center justify-center text-center"
                    >
                        <div className={`p-3 rounded-full ${bgColor} mb-4`}>
                            <Icon className={`w-8 h-8 ${color}`} />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{label}</h3>
                    </motion.div>
                </CardContent>
            </Card>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
            <h4 className="text-sm font-semibold mb-2">{label}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
        </HoverCardContent>
    </HoverCard>
))

ProjectTypeCard.displayName = 'ProjectTypeCard'

