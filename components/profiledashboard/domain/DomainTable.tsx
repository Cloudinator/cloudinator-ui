import {Activity, Globe2, MoreVertical, Shield} from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface Domain {
    name: string
    status: "Active" | "Inactive"
    type: "Primary" | "Secondary"
    ssl: boolean
    health: {
        status: "High" | "Medium" | "Low"
        percentage: number
    }
    lastUpdated: string
}

const domains: Domain[] = [
    {
        name: "example1.com",
        status: "Active",
        type: "Primary",
        ssl: true,
        health: { status: "High", percentage: 86 },
        lastUpdated: "2 hours ago"
    },
    {
        name: "example2.com",
        status: "Active",
        type: "Primary",
        ssl: true,
        health: { status: "High", percentage: 80 },
        lastUpdated: "4 hours ago"
    },
    {
        name: "cloudmaster.dev",
        status: "Active",
        type: "Primary",
        ssl: true,
        health: { status: "High", percentage: 90 },
        lastUpdated: "22 hours ago"
    },
    {
        name: "google.com",
        status: "Active",
        type: "Primary",
        ssl: true,
        health: { status: "Medium", percentage: 54 },
        lastUpdated: "1 day ago"
    },
    {
        name: "services.dev",
        status: "Active",
        type: "Primary",
        ssl: true,
        health: { status: "Low", percentage: 43 },
        lastUpdated: "4 days ago"
    },
    {
        name: "portfolio.net",
        status: "Active",
        type: "Primary",
        ssl: true,
        health: { status: "High", percentage: 80 },
        lastUpdated: "5 days ago"
    }
]

function getHealthColor(status: Domain["health"]["status"]) {
    switch (status) {
        case "High":
            return "text-purple-600"
        case "Medium":
            return "text-purple-500"
        case "Low":
            return "text-red-600"
        default:
            return "text-gray-600"
    }
}

export function DomainTable() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Domain</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>SSL</TableHead>
                    <TableHead>Traffic</TableHead>
                    <TableHead>Health</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {domains.map((domain) => (
                    <TableRow key={domain.name}>
                        <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                                <Globe2 className="h-4 w-4 text-gray-500" />
                                {domain.name}
                            </div>
                        </TableCell>
                        <TableCell>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                {domain.status}
              </span>
                        </TableCell>
                        <TableCell>{domain.type}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Switch checked={domain.ssl} />
                                <Shield className="h-4 w-4 text-purple-500" />
                            </div>
                        </TableCell>
                        <TableCell>
              <span className={`flex items-center gap-1 ${getHealthColor(domain.health.status)}`}>
                <Activity className="h-4 w-4" />
                  {domain.health.status}
              </span>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Progress value={domain.health.percentage} className="w-20" />
                                <span className="text-sm text-muted-foreground">
                  {domain.health.percentage}%
                </span>
                            </div>
                        </TableCell>
                        <TableCell>{domain.lastUpdated}</TableCell>
                        <TableCell>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
