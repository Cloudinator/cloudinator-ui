import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface WebsitePreviewProps {
  url: string;
}

export default function WebsitePreview({ url }: WebsitePreviewProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleIframeLoad = () => setLoading(false);

  const handleIframeError = () => {
    setLoading(false);
    setError("Failed to load preview. Please check the URL.");
  };

  if (error) {
    return (
      <div className="text-red-500 p-4 bg-red-100 rounded-lg shadow-md text-center font-medium">
        {error}
      </div>
    );
  }

  return (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      <div className="relative w-full aspect-video shadow-lg hover:shadow-xl transition-all overflow-hidden duration-300 cursor-pointer hover:scale-105">
        {loading && (
          <Skeleton className="absolute inset-0 w-full h-full rounded-lg animate-pulse" />
        )}
        <iframe
          src={url}
          className={`w-full h-full border-0 rounded-lg transition-all duration-300 pointer-events-none overflow-hidden scrolling-auto ${
            loading ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          title="Website Preview"
          sandbox="allow-scripts allow-same-origin"
          loading="lazy"
          scrolling="no"
          style={{ overflow: "hidden" }}
        />
      </div>
    </Link>
  );
}
