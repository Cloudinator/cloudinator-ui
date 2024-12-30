"use client";

import { usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home } from 'lucide-react'

export function Breadcrumbs({
  title,
  description,
  children,
}: {
  title?: string
  description?: string
  children?: React.ReactNode
}) {
  const pathname = usePathname()
  const paths = pathname.split('/').filter(Boolean)
  
  // Convert path to title case if no title provided
  const defaultTitle = paths[paths.length - 1]?.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') || 'Home'

  return (
    <div className="flex flex-col space-y-6 pb-8">
      <Breadcrumb className="text-sm text-muted-foreground bg-primary-500 text-primary-600">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard" className="hover:text-foreground">
              <Home className="h-4 w-4 text-primary-600" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {paths.map((path, index) => {
            const href = `/${paths.slice(0, index + 1).join('/')}`
            const isLast = index === paths.length - 1
            const formattedPath = path.split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')

            return (
              <BreadcrumbItem key={path}>
                {isLast ? (
                  <BreadcrumbPage>{formattedPath}</BreadcrumbPage>
                ) : (
                  <>
                    <BreadcrumbLink 
                      href={href}
                      className="hover:text-foreground"
                    >
                      {formattedPath}
                    </BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </>
                )}
              </BreadcrumbItem>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-primary-600">
              {title || defaultTitle}
            </h1>
            {description && (
              <p className="text-lg text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

