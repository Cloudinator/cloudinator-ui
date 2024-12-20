import { notFound } from 'next/navigation'
import RepoHeader from '@/components/RepoHeader'
import FileExplorer from '@/components/FileExplorer'
import FileViewer from '@/components/FileViewer'
import { RepoStructure } from '@/types/github'

async function getRepoStructure(): Promise<RepoStructure> {
    const res = await fetch(
        'http://localhost:3000/api/repos/MuyleangIng/cloudinator-ui.vercel.app/git/trees/main',
        { cache: 'no-store' }
    )
    if (!res.ok) throw new Error('Failed to fetch repo structure')
    return res.json()
}

async function getFileContent(path: string): Promise<string> {
    // In a real app, fetch from API
    return `// Content of ${path}\n// This is a placeholder`
}

export default async function FilePage({ params }: { params: { path: string[] } }) {
    const data = await getRepoStructure()
    const path = params.path.join('/')
    const file = data.tree.find(item => item.path === path)

    if (!file) {
        notFound()
    }

    const content = file.type === 'blob' ? await getFileContent(path) : ''

    return (
        <div className="container mx-auto py-6 px-4">
            <RepoHeader />
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                    {file.type === 'blob' ? (
                        <FileViewer path={path} content={content} />
                    ) : (
                        <FileExplorer tree={data.tree} currentPath={path} />
                    )}
                </div>
                <div className="lg:col-span-1">
                    <div className="border rounded-lg p-4">
                        <h2 className="font-semibold mb-4">About</h2>
                        <div className="text-sm text-gray-600">
                            <div className="mt-4 space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[#f1e05a]"></span>
                                    <span>JavaScript</span>
                                    <span>39.8%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[#e34c26]"></span>
                                    <span>HTML</span>
                                    <span>35.9%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[#563d7c]"></span>
                                    <span>CSS</span>
                                    <span>19.4%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

