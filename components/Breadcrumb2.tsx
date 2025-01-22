"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs() {
    const pathname = usePathname();
    const pathSegments = pathname
        .split("/")
        .filter(
            (segment) =>
                segment !== "" && segment !== "sub-workspace" && segment !== "database"
        ); // Filter out 'sub-workspace' and 'database'

    // Function to format segment names (e.g., replace hyphens with spaces, capitalize)
    const formatSegmentName = (segment: string) => {
        return segment
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    // Function to remove consecutive duplicates
    const removeConsecutiveDuplicates = (segments: string[]) => {
        return segments.filter((segment, index) => segment !== segments[index - 1]);
    };

    const filteredSegments = removeConsecutiveDuplicates(pathSegments);

    return (
        <nav
            aria-label="Breadcrumb"
            className="flex items-center text-sm text-gray-600 dark:text-gray-400"
        >
            <Link
                href="/"
                className="hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:bg-clip-text hover:text-transparent transition-all duration-300"
            >
                Home
            </Link>
            {filteredSegments.map((segment, index) => {
                // Reconstruct the href while skipping 'sub-workspace'
                const href = `/${filteredSegments.slice(0, index + 1).join("/")}`;
                const isLast = index === filteredSegments.length - 1;

                return (
                    <span key={segment} className="flex items-center">
            <ChevronRight
                className="w-4 h-4 mx-2 text-gray-400 dark:text-gray-500"
                aria-hidden="true"
            />
                        {isLast ? (
                            <span
                                className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent font-medium"
                                aria-current="page"
                            >
                {formatSegmentName(segment)}
              </span>
                        ) : (
                            <Link
                                href={href}
                                className="hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:bg-clip-text hover:text-transparent transition-all duration-300"
                            >
                                {formatSegmentName(segment)}
                            </Link>
                        )}
          </span>
                );
            })}
        </nav>
    );
}