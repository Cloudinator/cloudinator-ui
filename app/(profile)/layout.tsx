import type { Metadata } from "next";
import "../globals.css";

import { ThemeProvider } from "@/components/theme-provider"
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {SidebarDashboardProfile} from "@/components/profiledashboard/SidebarDashboardProfile";

import { Poppins } from 'next/font/google';
import StoreProvider from "@/app/StoreProvider";

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
                  <SidebarInset>
                      {children}
                  </SidebarInset>
              </SidebarProvider>
          </StoreProvider>

      </ThemeProvider>
      </body>
    </html>
  );
}
