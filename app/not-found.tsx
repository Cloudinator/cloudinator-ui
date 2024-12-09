import { ErrorTerminal } from '@/components/ErrorTerminal'

export default function ErrorPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-green-400 p-8 font-mono">
            <h1 className="text-4xl mb-8">Oops! An error occurred</h1>
            <p className="mb-4">Do not worry, let us troubleshoot this using DevOps principles!</p>
            <ErrorTerminal />
        </div>
    )
}

