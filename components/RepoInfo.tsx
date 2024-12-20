'use client'

import { FaStar, FaEye, FaCodeBranch } from 'react-icons/fa'

export default function RepoInfo() {
    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-2">
                <h2 className="font-semibold">About</h2>
                <a href="cloudinator-ui.vercel.app" className="text-sm text-blue-600 hover:underline">
                    reactjs-with-dockerfile.vercel.app
                </a>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <FaStar className="text-gray-400" />
                        <span>0 stars</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaEye className="text-gray-400" />
                        <span>1 watching</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaCodeBranch className="text-gray-400" />
                        <span>0 forks</span>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <h2 className="font-semibold">Languages</h2>
                <div className="flex h-2 rounded-full overflow-hidden bg-gray-100">
                    <div style={{ width: '39.8%' }} className="bg-yellow-400" title="JavaScript"></div>
                    <div style={{ width: '35.9%' }} className="bg-red-500" title="HTML"></div>
                    <div style={{ width: '19.4%' }} className="bg-purple-500" title="CSS"></div>
                    <div style={{ width: '4.9%' }} className="bg-gray-700" title="Dockerfile"></div>
                </div>
                <div className="text-sm space-y-1">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                        <span>JavaScript</span>
                        <span className="text-gray-500">39.8%</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                        <span>HTML</span>
                        <span className="text-gray-500">35.9%</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                        <span>CSS</span>
                        <span className="text-gray-500">19.4%</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-gray-700"></span>
                        <span>Dockerfile</span>
                        <span className="text-gray-500">4.9%</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

