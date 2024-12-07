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
                !fullWidth && "max-w-7xl px-4 sm:px-6 lg:px-8",
                className
            )}
            {...props}
        />
    )
}

