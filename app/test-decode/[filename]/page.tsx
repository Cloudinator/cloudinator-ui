// app/test-github/[filename]/test-profile.tsx
'use client';

import { useParams } from 'next/navigation';
import GitHubCodeViewer from "@/components/GitHubCodeViewer";

export default function GitHubViewerPage() {
    const params = useParams();
    const fileName = params.filename as string;

    // Decode the filename if it's URL encoded
    const decodedFileName = decodeURIComponent(fileName);

    return (
        <div className="container mx-auto py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl">GitHub Code Viewer</h1>
                <span className="truncate text-sm bg-gray-100 px-3 py-1 rounded">
                    {decodedFileName}
                </span>
            </div>
            <GitHubCodeViewer
                owner="MuyleangIng"
                repo="cloudinator-ui"
                path={decodedFileName}
            />
        </div>
    );
}