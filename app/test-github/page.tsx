import RepoHeader from '@/components/RepoHeader'
import RepoContent from '@/components/RepoContent'

export default function Home() {
    return (
        <main className="min-h-screen bg-white">
            <div className="max-w-[1400px] mx-auto px-4">
                <RepoHeader />
                <RepoContent />
            </div>
        </main>
    )
}

