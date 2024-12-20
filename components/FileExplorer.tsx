// 'use client'
//
// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { FaFolder, FaFile } from 'react-icons/fa'
// import { TreeItem } from '@/types/github'
//
// interface FileNodeProps {
//     node: TreeItem
//     currentPath: string
// }
//
// const FileNode: React.FC<FileNodeProps> = ({ node, currentPath }) => {
//     const isDirectory = node.type === 'tree'
//     const fileName = node.path.split('/').pop() || ''
//     const href = `/${node.path}`
//     console.log(href,"href")
//     console.log(isDirectory,"fileName")
//     return (
//         <Link
//             href={href}
//             className="group block"
//         >
//             <div className="flex items-center justify-between py-1.5 px-3 hover:bg-gray-50">
//                 <div className="flex items-center gap-2 min-w-0">
//                     {isDirectory ? (
//                         <FaFolder className="text-blue-400 shrink-0" />
//                     ) : (
//                         <FaFile className="text-gray-400 shrink-0" />
//                     )}
//
//                     <Link
//                         href={`/test-decode/${fileName}`}
//
//                     >
//                         <span className="truncate text-sm">{fileName}</span>
//                     </Link>
//                 </div>
//                 <div className="hidden group-hover:flex items-center gap-2 text-sm text-gray-500">
//                     <span className="truncate">Initialize project using Create React App</span>
//                     <span>7 months ago</span>
//                 </div>
//             </div>
//         </Link>
//     )
// }
//
// export default function FileExplorer({ currentPath = '' }: { currentPath?: string }) {
//     const [structure, setStructure] = useState<TreeItem[]>([])
//     const [structureRepo, setStructureRepo] = useState<TreeItem[]>([])
//
//     const [loading, setLoading] = useState(true)
//     console.log("loading",structureRepo)
//     useEffect(() => {
//         fetch('/api/repos/MuyleangIng/cloudinator-ui/git/trees/main?recursive=1')
//             .then(res => res.json())
//             .then(data => {
//                 const filteredTree = data.tree.filter((item: TreeItem) => {
//                     if (!currentPath) return !item.path.includes('/')
//                     return item.path.startsWith(currentPath) &&
//                         item.path.split('/').length === currentPath.split('/').length + 1
//                 })
//                 setStructureRepo(data)
//                 setStructure(filteredTree)
//                 setLoading(false)
//             })
//             .catch(err => {
//                 console.error('Failed to load repository structure:', err)
//                 setLoading(false)
//             })
//     }, [currentPath])
//
//     if (loading) {
//         return <div className="p-4 text-sm text-gray-500">Loading repository structure...</div>
//     }
//
//     return (
//         <div className="divide-y">
//             {structure.map((item) => (
//                 <FileNode
//                     key={item.sha}
//                     node={item}
//                     currentPath={currentPath}
//                 />
//             ))}
//         </div>
//     )
// }
//
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TreeItem } from '@/types/github'
import { FaFolder, FaFile } from 'react-icons/fa'
import { cn } from '@/lib/utils'

interface FileExplorerProps {
    tree: TreeItem[];
    currentPath?: string;
}

export default function FileExplorer({ tree, currentPath = '' }: FileExplorerProps) {
    const pathname = usePathname()
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set([currentPath]))

    const sortItems = (items: TreeItem[]) => {
        return [...items].sort((a, b) => {
            if (a.type !== b.type) {
                return a.type === 'tree' ? -1 : 1
            }
            return a.path.localeCompare(b.path)
        })
    }

    const getFilteredItems = (parentPath: string = '') => {
        return tree.filter(item => {
            const parts = item.path.split('/')
            if (parentPath === '') {
                return parts.length === 1
            }
            return item.path.startsWith(parentPath + '/') &&
                item.path.split('/').length === parentPath.split('/').length + 1
        })
    }

    const renderItem = (item: TreeItem) => {
        const isFolder = item.type === 'tree'
        const isExpanded = expandedFolders.has(item.path)
        const name = item.path.split('/').pop() || ''
        const isSelected = pathname === `/test-github/${item.path}`

        return (
            <div key={item.path}>
                <div
                    className={cn(
                        "flex items-center justify-between py-2 px-3 hover:bg-gray-50 cursor-pointer",
                        isSelected && "bg-blue-50 hover:bg-blue-50"
                    )}
                    onClick={() => {
                        if (isFolder) {
                            setExpandedFolders(prev => {
                                const next = new Set(prev)
                                if (next.has(item.path)) {
                                    next.delete(item.path)
                                } else {
                                    next.add(item.path)
                                }
                                return next
                            })
                        }
                    }}
                >
                    <div className="flex items-center gap-2 min-w-0">
                        {isFolder ? (
                            <FaFolder className="text-blue-400 shrink-0" />
                        ) : (
                            <FaFile className="text-gray-400 shrink-0" />
                        )}
                        <Link
                            href={`/test-github/${item.path}`}
                            className="truncate text-sm hover:underline"
                            onClick={e => isFolder && e.preventDefault()}
                        >
                            {name}
                        </Link>
                    </div>
                    <div className="hidden group-hover:flex text-xs text-gray-500">
                        {item.lastCommit?.date}
                    </div>
                </div>
                {isFolder && isExpanded && (
                    <div className="ml-4">
                        {sortItems(getFilteredItems(item.path)).map(renderItem)}
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="border rounded-lg">
            <div className="border-b bg-gray-50 px-4 py-3">
                <h2 className="font-semibold">Repository Structure</h2>
            </div>
            <div className="divide-y">
                {sortItems(getFilteredItems()).map(renderItem)}
            </div>
        </div>
    )
}

