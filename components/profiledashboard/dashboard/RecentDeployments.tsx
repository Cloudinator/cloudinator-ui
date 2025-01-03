import { CheckCircle2, XCircle } from 'lucide-react'

export type ServiceDeployment = {
    name: string;
    status?: boolean;
    subDomain: string;
    gitUrl: string;
    branch: string;
    type: string;
}

type RecentDeploymentsProps = {
    services: ServiceDeployment[]
}

export default function RecentDeployments({ services }: RecentDeploymentsProps) {

    if(!services) {return null}

    return (
        <div className="space-y-6">
            {services.map((deployment, index) => (
                <div key={index} className="flex items-center">
                    <div className="h-9 w-9 rounded bg-muted flex items-center justify-center text-sm font-medium">
                        {deployment.name.charAt(0)}
                    </div>
                    <div className="ml-4 space-y-1 flex-1 min-w-0">
                        <p className="text-sm font-medium leading-none truncate">{deployment.name}</p>
                        <p className="text-sm text-muted-foreground">
                            {deployment.branch} • {deployment.subDomain}
                        </p>
                    </div>
                    {deployment.status ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    ) : (
                        <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    )}
                </div>
            ))}
        </div>
    )
}