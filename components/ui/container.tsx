import * as React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    fullWidth?: boolean
}

export function Container({ className, fullWidth = false, ...props }: ContainerProps) {
    return (
        <div
            className={cn(
                "mx-auto w-full",
                !fullWidth && "container mx-auto ",
                className
            )}
            {...props}
        />
    )
}

