import type { Metadata } from "next";
import "../globals.css";

import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {SidebarDashboardProfile} from "@/components/profiledashboard/SidebarDashboardProfile";

import { Poppins } from 'next/font/google';
import {ThemeProvider} from "next-themes";
import StoreProvider from "@/app/StoreProvider";
import {AuthProvider} from "@/contexts/AuthContext";

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
      <StoreProvider>
          <AuthProvider>
              <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
              >
                  <SidebarProvider>
                      <SidebarDashboardProfile />
                      <SidebarInset>
                          {children}
                      </SidebarInset>
                  </SidebarProvider>
              </ThemeProvider>
          </AuthProvider>
      </StoreProvider>

      </body>
    </html>
  );
}
