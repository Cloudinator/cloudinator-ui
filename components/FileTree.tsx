'use client'

import { useState, useEffect } from 'react'
import { FaFolder, FaFolderOpen, FaFile } from 'react-icons/fa'
import { TreeItem } from '@/types/github'

interface FileNodeProps {
    node: TreeItem
    level: number
    lastCommit: string
    lastCommitDate: string
}

const FileNode: React.FC<FileNodeProps> = ({ node, level, lastCommit, lastCommitDate }) => {
    const [isOpen, setIsOpen] = useState(false)
    const isDirectory = node.type === 'tree'
    const fileName = node.path.split('/').pop() || ''

    return (
        <div className="group">
            <div
                className={`
          flex items-center justify-between py-1.5 px-3 hover:bg-gray-50 cursor-pointer
          ${isDirectory ? 'hover:bg-blue-50' : ''}
        `}
                style={{ paddingLeft: `${level * 16 + 16}px` }}
                onClick={() => isDirectory && setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-2 min-w-0">
                    {isDirectory ? (
                        isOpen ? (
                            <FaFolderOpen className="text-blue-400 shrink-0" />
                        ) : (
                            <FaFolder className="text-blue-400 shrink-0" />
                        )
                    ) : (
                        <FaFile className="text-gray-400 shrink-0" />
                    )}
                    <span className="truncate text-sm">{fileName}</span>
                </div>
                <div className="hidden group-hover:flex items-center gap-2 text-sm text-gray-500">
                    <span className="truncate">{lastCommit}</span>
                    <span>{lastCommitDate}</span>
                </div>
            </div>
        </div>
    )
}

export default function FileTree() {
    const [structure, setStructure] = useState<TreeItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/repos/MuyleangIng/reactjs-with-dockerfile/git/trees/main?recursive=1')
            .then(res => res.json())
            .then(data => {
                setStructure(data.tree)
                setLoading(false)
            })
            .catch(err => {
                console.error('Failed to load repository structure:', err)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <div className="p-4 text-sm text-gray-500">Loading repository structure...</div>
    }

    return (
        <div className="divide-y">
            {structure.map((item) => (
                <FileNode
                    key={item.sha}
                    node={item}
                    level={0}
                    lastCommit="Initialize project using Create React App"
                    lastCommitDate="7 months ago"
                />
            ))}
        </div>
    )
}

