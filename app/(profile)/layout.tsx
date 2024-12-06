import type { Metadata } from "next";
import "../globals.css";

import { ThemeProvider } from "@/components/theme-provider"
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {SidebarDashboardProfile} from "@/components/profiledashboard/SidebarDashboardProfile";
import DashboardHeaderProfile from "@/components/profiledashboard/DashboardHeaderProfile";

import { Poppins } from 'next/font/google';

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
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
          <SidebarProvider>

              <SidebarDashboardProfile />
              <SidebarInset>
                  <DashboardHeaderProfile />
                  {children}
              </SidebarInset>
          </SidebarProvider>

      </ThemeProvider>
      </body>
    </html>
  );
}
