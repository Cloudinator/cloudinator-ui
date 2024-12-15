import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {Github, Gitlab} from 'lucide-react'

interface ProviderModalProps {
    open: boolean
    onProviderSelect: (provider: 'github' | 'gitlab') => void
    onClose: () => void
}

export function ProviderModal({ open, onProviderSelect, onClose }: ProviderModalProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Choose Git Provider</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 pt-4">
                    <Button
                        variant="outline"
                        className="h-24 flex flex-col gap-2"
                        onClick={() => onProviderSelect('github')}
                    >
                        <Github className="h-8 w-8" />
                        <span>GitHub</span>
                    </Button>
                    <Button
                        variant="outline"
                        className="h-24 flex flex-col gap-2"
                        onClick={() => onProviderSelect('gitlab')}
                    >
                        <Gitlab className="h-8 w-8" />
                        <span>GitLab (Org)</span>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

