'use client'

import { useState, useEffect } from 'react'
import { FaFolder, FaFolderOpen, FaFile } from 'react-icons/fa'
import { TreeItem } from '@/types/github'

interface FileNodeProps {
    node: TreeItem
    level: number
}

const FileNode: React.FC<FileNodeProps> = ({ node, level }) => {
    const [isOpen, setIsOpen] = useState(false)
    const isDirectory = node.type === 'tree'

    return (
        <div className="text-sm">
            <div
                className={`flex items-center gap-2 py-1.5 px-2 hover:bg-gray-50 cursor-pointer`}
                style={{ paddingLeft: `${level * 16 + 16}px` }}
                onClick={() => isDirectory && setIsOpen(!isOpen)}
            >
                {isDirectory ? (
                    isOpen ? (
                        <FaFolderOpen className="text-blue-400" />
                    ) : (
                        <FaFolder className="text-blue-400" />
                    )
                ) : (
                    <FaFile className="text-gray-400" />
                )}
                <span>{node.path.split('/').pop()}</span>
            </div>
        </div>
    )
}

export default function RepoStructure() {
    const [structure, setStructure] = useState<TreeItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch('/api/repos/MuyleangIng/reactjs-with-dockerfile/git/trees/main?recursive=1')
            .then(res => res.json())
            .then(data => {
                setStructure(data.tree)
                setLoading(false)
            })
            .catch(err => {
                setError('Failed to load repository structure')
                console.log(err)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <div className="p-4 text-gray-500">Loading repository structure...</div>
    }

    if (error) {
        return <div className="p-4 text-red-500">{error}</div>
    }

    return (
        <div className="border rounded-lg">
            <div className="bg-gray-50 border-b px-4 py-2 text-sm font-medium">
                Repository Structure
            </div>
            <div className="divide-y">
                {structure.map((item, index) => (
                    <FileNode key={index} node={item} level={0} />
                ))}
            </div>
        </div>
    )
}

 