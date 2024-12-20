// 'use client'
//
// import { useState, useEffect } from 'react'
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
//
// interface FileViewerProps {
//     path: string
// }
//
// export default function FileViewer({ path }: FileViewerProps) {
//     const [content, setContent] = useState<string>('')
//     const [loading, setLoading] = useState(true)
//
//     useEffect(() => {
//         // In a real app, this would fetch from your API
//         // For demo, we'll show some sample content
//         setContent(`// Sample content for ${path}
// import React from 'react';
//
// export default function Component() {
//   return (
//     <div>
//       <h1>Hello World</h1>
//     </div>
//   );
// }`)
//         setLoading(false)
//     }, [path])
//
//     if (loading) {
//         return <div className="p-4">Loading file content...</div>
//     }
//
//     return (
//         <div className="mt-6 border rounded-lg overflow-hidden">
//             <div className="bg-gray-50 border-b px-4 py-2 flex items-center justify-between">
//                 <div className="font-mono text-sm">{path}</div>
//                 <div className="flex items-center gap-2">
//                     <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">Raw</button>
//                     <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">Copy</button>
//                 </div>
//             </div>
//             <div className="bg-white">
//                 <SyntaxHighlighter
//                     language="typescript"
//                     style={tomorrow}
//                     customStyle={{
//                         margin: 0,
//                         padding: '1rem',
//                         background: 'transparent'
//                     }}
//                 >
//                     {content}
//                 </SyntaxHighlighter>
//             </div>
//         </div>
//     )
// }
//
'use client'

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FileViewerProps {
    path: string;
    content: string;
    language?: string;
}

export default function FileViewer({ path, content, language }: FileViewerProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(content)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const getLanguage = () => {
        const ext = path.split('.').pop()?.toLowerCase()
        switch (ext) {
            case 'ts':
            case 'tsx':
                return 'typescript'
            case 'js':
            case 'jsx':
                return 'javascript'
            case 'md':
                return 'markdown'
            default:
                return ext || 'text'
        }
    }

    return (
        <div className="border rounded-lg">
            <div className="border-b bg-gray-50 px-4 py-2 flex items-center justify-between">
                <div className="font-mono text-sm">{path}</div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                        <Copy className="w-4 h-4 mr-2" />
                        {copied ? 'Copied!' : 'Copy'}
                    </Button>
                    <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Raw
                    </Button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <SyntaxHighlighter
                    language={language || getLanguage()}
                    style={tomorrow}
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

