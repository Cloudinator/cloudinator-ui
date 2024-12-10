import { ErrorTerminal } from '@/components/ErrorTerminal'

export default function ErrorPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-purple-500 p-8 font-mono">
            <h1 className="text-4xl mb-8 font-bold">Oops! Page not found</h1>
            <p className="mb-4 font-bold">Do not worry, just 404 and try again!</p>
            <ErrorTerminal />
        </div>
    )
}

