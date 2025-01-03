import type { Metadata } from "next";
import "../globals.css";

import { SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {SidebarDashboardProfile} from "@/components/profiledashboard/SidebarDashboardProfile";
import { ThemeProvider } from "next-themes";
import { Poppins } from 'next/font/google';
import StoreProvider from "@/app/StoreProvider";
import { Toaster } from "@/components/ui/toaster"

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "Cloudinator",
  description: "Dashboard Profile Cloudinator Application",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={poppins.className}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
        >
          <StoreProvider>
              <SidebarProvider>
                  <SidebarDashboardProfile />
                    <main className="flex flex-col h-screen w-full">
                      <div className="fixed top-0 left-0 z-10 p-4">
                        <SidebarTrigger
                          className="bg-white dark:bg-gray-800 p-5 rounded-md shadow-md"
                          data-hide-sidebar="false"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4 6h16M4 12h16M4 18h16"
                            />
                          </svg>
                        </SidebarTrigger>
                      </div>
                        {children}
                        <Toaster />
                    </main>                                     
              </SidebarProvider>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
