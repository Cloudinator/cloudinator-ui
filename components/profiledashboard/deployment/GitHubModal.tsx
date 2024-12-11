import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { X } from 'lucide-react'

interface GitHubModalProps {
    open: boolean
    onDeploy: (data: {
        projectName: string
        branch: string
        gitUrl: string
        automate: boolean
        accessToken?: string
    }) => void
    onBack: () => void
    onClose: () => void
}

export function GitHubModal({ open, onDeploy, onBack, onClose }: GitHubModalProps) {
    const [automate, setAutomate] = useState(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        onDeploy({
            projectName: formData.get('projectName') as string,
            branch: formData.get('branch') as string,
            gitUrl: formData.get('gitUrl') as string,
            automate,
            accessToken: formData.get('accessToken') as string,
        })
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>GitHub Configuration</DialogTitle>

                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="projectName">Project Name</Label>
                        <Input id="projectName" name="projectName" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="branch">Branch</Label>
                        <Input id="branch" name="branch" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="gitUrl">Git URL</Label>
                        <Input id="gitUrl" name="gitUrl" required />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="automate"
                            checked={automate}
                            onCheckedChange={(checked) => setAutomate(checked as boolean)}
                        />
                        <Label htmlFor="automate">Automate deployment</Label>
                    </div>
                    {automate && (
                        <div className="space-y-2">
                            <Label htmlFor="accessToken">Git Access Token</Label>
                            <Input id="accessToken" name="accessToken" type="password" required />
                        </div>
                    )}
                    <div className="flex justify-between pt-4">
                        <Button type="button" variant="outline" onClick={onBack}>
                            Back
                        </Button>
                        <Button type="submit">Deploy</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

