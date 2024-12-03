import { CheckCircle2, XCircle } from 'lucide-react'

export default function RecentDeployments() {
    const deployments = [
        {
            id: "AJ",
            project: "Blog-API",
            status: "success",
            time: "2 minutes ago",
            user: "Alice Johnson",
            avatar: "/avatars/01.png"
        },
        {
            id: "BS",
            project: "E-commerce",
            status: "success",
            time: "15 minutes ago",
            user: "Bob Smith",
            avatar: "/avatars/02.png"
        },
        {
            id: "CB",
            project: "Flutter-Mobile",
            status: "success",
            time: "1 hour ago",
            user: "Charlie Brown",
            avatar: "/avatars/03.png"
        },
        {
            id: "DP",
            project: "Data-Analytics Backend",
            status: "success",
            time: "3 hours ago",
            user: "Diana Prince",
            avatar: "/avatars/04.png"
        },
        {
            id: "EH",
            project: "Spring-Microservice",
            status: "success",
            time: "5 hours ago",
            user: "Ethan Hunt",
            avatar: "/avatars/05.png"
        }
    ]

    return (
        <div className="space-y-6">
            {deployments.map((deployment) => (
                <div key={deployment.id} className="flex items-center">
                    <div className="h-9 w-9 rounded bg-muted flex items-center justify-center text-sm font-medium">
                        {deployment.id}
                    </div>
                    <div className="ml-4 space-y-1 flex-1 min-w-0">
                        <p className="text-sm font-medium leading-none truncate">{deployment.project}</p>
                        <p className="text-sm text-muted-foreground">
                            {deployment.user} • {deployment.time}
                        </p>
                    </div>
                    {deployment.status === 'success' ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    ) : (
                        <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    )}
                </div>
            ))}
        </div>
    )
}