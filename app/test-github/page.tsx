// import RepoHeader from '@/components/RepoHeader'
// import RepoContent from '@/components/RepoContent'
//
// export default function Home() {
//     return (
//         <main className="min-h-screen bg-white">
//             <div className="max-w-[1400px] mx-auto px-4">
//                 <RepoHeader />
//                 <RepoContent />
//             </div>
//         </main>
//     )
// }
//
import RepoHeader from '@/components/RepoHeader'
import FileExplorer from '@/components/FileExplorer'
import { RepoStructure } from '@/types/github'

async function getRepoStructure(): Promise<RepoStructure> {
    const res = await fetch(
        'http://localhost:3000/api/repos/MuyleangIng/reactjs-with-dockerfile/git/trees/main',
        { cache: 'no-store' }
    )
    if (!res.ok) throw new Error('Failed to fetch repo structure')
    return res.json()
}

export default async function TestGitHubPage() {
    const data = await getRepoStructure()

    return (
        <div className="container mx-auto py-6 px-4">
            <RepoHeader />
            <div className="mt-6">
                <FileExplorer tree={data.tree} />
            </div>
        </div>
    )
}

