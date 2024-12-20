'use client';

import GitHubCodeViewer from "@/components/GitHubCodeViewer";

export default function YourPage() {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl mb-6">GitHub Code Viewer</h1>
            <GitHubCodeViewer
                owner="MuyleangIng"
                repo="cloudinator-ui"
                path="Dockerfile"
            />
        </div>
    );
}