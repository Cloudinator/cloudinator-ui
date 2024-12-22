'use client';

// components/GitHubCodeViewer.tsx
import React, { useState, useEffect } from 'react';

interface GitHubCodeViewerProps {
    owner: string;
    repo: string;
    path: string;
}

const GitHubCodeViewer: React.FC<GitHubCodeViewerProps> = ({ owner, repo, path }) => {
    const [code, setCode] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCode = async () => {
            try {
                const response = await fetch(
                    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch code');
                }

                const data = await response.json();
                // GitHub API returns content in base64
                const decodedContent = decodeBase64(data.content);
                setCode(decodedContent);
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                setLoading(false);
            }
        };

        fetchCode();
    }, [owner, repo, path]);

    const decodeBase64 = (base64String: string): string => {
        try {
            // Remove newlines and decode
            const cleanStr = base64String.replace(/\n/g, '');
            return Buffer.from(cleanStr, 'base64').toString('utf-8');
        } catch (error) {
            console.log(error)
            return 'Error decoding content';
        }
    };

    if (loading) {
        return <div className="p-4">Loading code...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <div className="bg-gray-50 rounded-lg shadow">
                <div className="bg-gray-100 px-4 py-2 rounded-t-lg border-b flex justify-between items-center">
                    <span className="text-sm font-mono">{path}</span>
                    <button
                        onClick={() => navigator.clipboard.writeText(code)}
                        className="px-3 py-1 text-sm bg-white rounded border hover:bg-gray-50"
                    >
                        Copy
                    </button>
                </div>
                <pre className="p-4 overflow-auto text-sm">
          <code className="language-javascript">
            {code}
          </code>
        </pre>
            </div>
        </div>
    );
};

export default GitHubCodeViewer;