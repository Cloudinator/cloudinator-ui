"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Zap, Loader2 } from 'lucide-react'
import {useCreateWorkspaceMutation} from "@/redux/api/projectApi";

export function CreateWorkspaceModal() {
    const [open, setOpen] = useState(false)
    const [workspaceName, setWorkspaceName] = useState("")
    const [isCreating, setIsCreating] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const [createWorkspace] = useCreateWorkspaceMutation()



    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus()
        }
    }, [open])

    const handleCreateWorkspace = async () => {
        setIsCreating(true)
        try {
            await createWorkspace({ name: workspaceName })
            setWorkspaceName("")
            setOpen(false)
        } catch (err) {
            console.error(err)
        } finally {
            setIsCreating(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Zap className="mr-2 h-4 w-4" />
                    Create Workspace
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Create Workspace</DialogTitle>
                    <DialogDescription>
                        Enter a name for your new workspace and bring your ideas to life.
                    </DialogDescription>
                </DialogHeader>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="py-4"
                >
                    <Input
                        ref={inputRef}
                        value={workspaceName}
                        onChange={(e) => setWorkspaceName(e.target.value)}
                        className="w-full"
                        placeholder="My Awesome Workspace"
                    />
                    <AnimatePresence>
                        {workspaceName && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-2 text-sm text-muted-foreground"
                            >
                                Great name! Your workspace is going to be amazing.
                            </motion.p>
                        )}
                    </AnimatePresence>
                </motion.div>
                <DialogFooter>
                    <Button
                        onClick={handleCreateWorkspace}
                        className="w-full"
                        disabled={!workspaceName.trim() || isCreating}
                    >
                        {isCreating ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Zap className="mr-2 h-4 w-4" />
                        )}
                        {isCreating ? "Creating..." : "Create Workspace"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

