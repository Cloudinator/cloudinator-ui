'use client'


import { FaChevronDown, FaCodeBranch, FaCode } from 'react-icons/fa'
import FileExplorer from './FileExplorer'
import RepoInfo from './RepoInfo'

export default function RepoContent({ currentPath = '' }: { currentPath?: string }) {
    return (
        <div className="flex gap-8 mt-6">
            <div className="flex-grow">
                <div className="border rounded-lg">
                    <div className="bg-gray-50 border-b px-4 py-3">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <button className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50">
                                    <FaCodeBranch className="text-gray-500" />
                                    main
                                    <FaChevronDown className="text-gray-400" size={12} />
                                </button>
                                <span className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-900">11</span> commits
                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50">
                                    <FaCode className="text-gray-500" />
                                    Code
                                    <FaChevronDown className="text-gray-400" size={12} />
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">b3032ab</span>
                            <span>Rename Dockerfile to test.Dockerfile</span>
                            <span className="text-gray-500">3 months ago</span>
                        </div>
                    </div>
                    <FileExplorer currentPath={currentPath} />
                </div>
            </div>
            <div className="w-[296px] shrink-0">
                <RepoInfo />
            </div>
        </div>
    )
}

