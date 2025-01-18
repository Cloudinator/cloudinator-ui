"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname
    .split("/")
    .filter((segment) => segment !== "" && segment !== "sub-workspace"); // Filter out 'sub-workspace'

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
    <nav aria-label="Breadcrumb" className="flex items-center text-sm text-gray-500 dark:text-gray-400">
      <Link href="/" className="hover:text-purple-500 dark:hover:text-purple-300">
        Home
      </Link> 
      {filteredSegments.map((segment, index) => {
        // Reconstruct the href while skipping 'sub-workspace'
        const href = `/${filteredSegments.slice(0, index + 1).join("/")}`;
        const isLast = index === filteredSegments.length - 1;

        return (
          <span key={segment} className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-2" aria-hidden="true" />
            {isLast ? (
              <span
                className="text-purple-500 dark:text-purple-300 font-medium"
                aria-current="page"
              >
                {formatSegmentName(segment)}
              </span>
            ) : (
              <Link
                href={href}
                className="hover:text-purple-500 dark:hover:text-purple-300"
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