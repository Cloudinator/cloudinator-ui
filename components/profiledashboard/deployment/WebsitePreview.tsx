'use client'

import React, { useState, useEffect } from 'react'
import { Skeleton } from "@/components/ui/skeleton"

interface WebsitePreviewProps {
    url: string
}

export default function WebsitePreview({ url }: WebsitePreviewProps) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 5000) // Increase timeout to 5 seconds
        return () => clearTimeout(timer)
    }, [])

    const handleIframeLoad = () => setLoading(false)

    const handleIframeError = () => {
        setLoading(false)
        setError("Failed to load preview. Please check the URL.")
    }

    if (error) {
        return <div className="text-red-500 p-4 bg-red-100 rounded-lg">{error}</div>
    }

    return (
        <div className="relative w-full aspect-video">
            {loading && <Skeleton className="absolute inset-0 w-full h-full rounded-lg" />}
            <iframe
                src={url}
                className={`w-full h-full border-0 rounded-lg transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                title="Website Preview"
                sandbox="allow-scripts allow-same-origin"
                loading="lazy"
            />
        </div>
    )
}

