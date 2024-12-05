import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";

import { ThemeProvider } from "@/components/theme-provider"
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {SidebarDashboardProfile} from "@/components/profiledashboard/SidebarDashboardProfile";
import DashboardHeaderProfile from "@/components/profiledashboard/DashboardHeaderProfile";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
