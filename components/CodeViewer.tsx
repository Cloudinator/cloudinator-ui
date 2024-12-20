'use client'

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeViewerProps {
    content: string
    language: string
    fileName: string
}

export default function CodeViewer({ content, language, fileName }: CodeViewerProps) {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(content)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="border rounded-lg">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b">
                <span className="text-sm font-medium">{fileName}</span>
                <button
                    onClick={copyToClipboard}
                    className="text-xs px-2 py-1 rounded border hover:bg-gray-100"
                >
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <div className="overflow-auto">
                <SyntaxHighlighter
                    language={language}
                    style={vs}
                    customStyle={{
                        margin: 0,
                        padding: '1rem',
                        background: 'transparent',
                    }}
                >
                    {content}
                </SyntaxHighlighter>
            </div>
        </div>
    )
}

