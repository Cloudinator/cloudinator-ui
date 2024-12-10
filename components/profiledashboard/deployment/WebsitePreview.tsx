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
        const timer = setTimeout(() => {
            setLoading(false)
        }, 3000) // Simulate loading for 3 seconds

        return () => clearTimeout(timer)
    }, [])

    const handleIframeLoad = () => {
        setLoading(false)
    }

    const handleIframeError = () => {
        setLoading(false)
        setError("Failed to load preview. Please check the URL.")
    }

    if (error) {
        return <div className="text-red-500">{error}</div>
    }

    return (
        <div className="relative w-full aspect-video p-4">
            {loading && (
                <Skeleton className="absolute inset-0 w-full h-full" />
            )}
            <iframe
                src={url}
                className={`w-full h-full border-0 rounded-lg ${loading ? 'invisible' : 'visible'}`}
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                title="Website Preview"
                scrolling="no"
                style={{overflow: 'hidden'}}
            />
        </div>
    )
}

