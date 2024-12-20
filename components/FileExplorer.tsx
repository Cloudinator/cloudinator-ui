'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaFolder, FaFolderOpen, FaFile } from 'react-icons/fa'
import { TreeItem } from '@/types/github'

interface FileNodeProps {
    node: TreeItem
    currentPath: string
}

const FileNode: React.FC<FileNodeProps> = ({ node, currentPath }) => {
    const isDirectory = node.type === 'tree'
    const fileName = node.path.split('/').pop() || ''
    const href = `/${node.path}`

    return (
        <Link
            href={href}
            className="group block"
        >
            <div className="flex items-center justify-between py-1.5 px-3 hover:bg-gray-50">
                <div className="flex items-center gap-2 min-w-0">
                    {isDirectory ? (
                        <FaFolder className="text-blue-400 shrink-0" />
                    ) : (
                        <FaFile className="text-gray-400 shrink-0" />
                    )}
                    <span className="truncate text-sm">{fileName}</span>
                </div>
                <div className="hidden group-hover:flex items-center gap-2 text-sm text-gray-500">
                    <span className="truncate">Initialize project using Create React App</span>
                    <span>7 months ago</span>
                </div>
            </div>
        </Link>
    )
}

export default function FileExplorer({ currentPath = '' }: { currentPath?: string }) {
    const [structure, setStructure] = useState<TreeItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/repos/MuyleangIng/cloudinator-ui/git/trees/main?recursive=1')
            .then(res => res.json())
            .then(data => {
                const filteredTree = data.tree.filter((item: TreeItem) => {
                    if (!currentPath) return !item.path.includes('/')
                    return item.path.startsWith(currentPath) &&
                        item.path.split('/').length === currentPath.split('/').length + 1
                })
                setStructure(filteredTree)
                setLoading(false)
            })
            .catch(err => {
                console.error('Failed to load repository structure:', err)
                setLoading(false)
            })
    }, [currentPath])

    if (loading) {
        return <div className="p-4 text-sm text-gray-500">Loading repository structure...</div>
    }

    return (
        <div className="divide-y">
            {structure.map((item) => (
                <FileNode
                    key={item.sha}
                    node={item}
                    currentPath={currentPath}
                />
            ))}
        </div>
    )
}

