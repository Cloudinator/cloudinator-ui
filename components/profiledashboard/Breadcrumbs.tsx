"use client";

import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home, Terminal, Settings, Building, ShoppingCart, FileText, Mail, Calendar } from 'lucide-react';

// Define a mapping of paths to icons
const iconMapping: Record<string, React.ElementType> = {
  dashboard: Home,
  workspace: Terminal,
  setting: Settings,
  organizations: Building,
  products: ShoppingCart,
  documents: FileText,
  messages: Mail,
  calendar: Calendar,
};

export function Breadcrumbs({
  title,
  titleIcon: TitleIcon, // Accepting an optional TitleIcon prop
  children,
}: {
  title?: string;
  titleIcon?: React.ElementType; // Type for the icon component
  description?: string;
  children?: React.ReactNode;
}) {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);

  // Convert path to title case if no title provided
  const defaultTitle = paths[paths.length - 1]?.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') || 'Home';

  const getIconForPath = (path: string) => {
    const normalizedPath = path.toLowerCase().replace(/-/g, "");
    const IconComponent = iconMapping[normalizedPath];
    return IconComponent ? <IconComponent className="h-4 w-4 mr-1" /> : null;
  };

  return (
    <div className="flex flex-col space-y-6 pb-8">
      <Breadcrumb className="text-sm text-muted-foreground bg-purple-5 text-purple-600">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard" className="hover:text-foreground">
              <Home className="h-4 w-4 text-purple-500" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {paths.map((path, index) => {
            const href = `/${paths.slice(0, index + 1).join('/')}`;
            const isLast = index === paths.length - 1;
            const formattedPath = path.split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');

            return (
              <BreadcrumbItem key={path}>
                {isLast ? (
                  <BreadcrumbPage className="flex items-center">
                    {getIconForPath(path)}
                    {formattedPath}
                  </BreadcrumbPage>
                ) : (
                  <>
                    <BreadcrumbLink 
                      href={href}
                      className="hover:text-foreground flex items-center"
                    >
                      {getIconForPath(path)}
                      {formattedPath}
                    </BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </>
                )}
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1 flex items-center"> {/* Added flex for alignment */}
            {TitleIcon && <TitleIcon className="h-8 w-8 mr-2 text-purple-500" />} {/* Render Title Icon */}
            <h1 className="text-3xl font-bold tracking-tight text-purple-500">
              {title || defaultTitle}
            </h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
