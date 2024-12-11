import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"

interface GitLabModalProps {
    open: boolean
    onDeploy: (data: { projectName: string }) => void
    onBack: () => void
    onClose: () => void
}

export function GitLabModal({ open, onDeploy, onBack, onClose }: GitLabModalProps) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        onDeploy({
            projectName: formData.get('projectName') as string,
        })
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>GitLab Configuration</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="projectName">Project Name</Label>
                        <Input id="projectName" name="projectName" required />
                    </div>
                    <div className="space-y-2">
                        <Label>List of Repositories</Label>
                        <ScrollArea className="h-[200px] border rounded-md p-4">
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">No repositories found</p>
                            </div>
                        </ScrollArea>
                    </div>
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

