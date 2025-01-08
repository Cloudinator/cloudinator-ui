"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400">
      <Link href="/" className="hover:text-purple-500 dark:hover:text-purple-300">
        Home
      </Link>
      {pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const isLast = index === pathSegments.length - 1;

        return (
          <span key={segment} className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-2" />
            {isLast ? (
              <span className="text-purple-500 dark:text-purple-300">
                {segment}
              </span>
            ) : (
              <Link
                href={href}
                className="hover:text-purple-500 dark:hover:text-purple-300"
              >
                {segment}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}