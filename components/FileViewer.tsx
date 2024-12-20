'use client'

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface FileViewerProps {
    path: string
}

export default function FileViewer({ path }: FileViewerProps) {
    const [content, setContent] = useState<string>('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // In a real app, this would fetch from your API
        // For demo, we'll show some sample content
        setContent(`// Sample content for ${path}
import React from 'react';

export default function Component() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}`)
        setLoading(false)
    }, [path])

    if (loading) {
        return <div className="p-4">Loading file content...</div>
    }

    return (
        <div className="mt-6 border rounded-lg overflow-hidden">
            <div className="bg-gray-50 border-b px-4 py-2 flex items-center justify-between">
                <div className="font-mono text-sm">{path}</div>
                <div className="flex items-center gap-2">
                    <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">Raw</button>
                    <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">Copy</button>
                </div>
            </div>
            <div className="bg-white">
                <SyntaxHighlighter
                    language="typescript"
                    style={tomorrow}
                    customStyle={{
                        margin: 0,
                        padding: '1rem',
                        background: 'transparent'
                    }}
                >
                    {content}
                </SyntaxHighlighter>
            </div>
        </div>
    )
}

