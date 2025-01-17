import type { Metadata } from "next";
import "../globals.css";

import { Poppins } from "next/font/google";
import StoreProvider from "@/app/StoreProvider";
import { Toaster } from "@/components/ui/toaster";
import { LayoutProvider } from "./provider/LayoutProvider";
import { Sidebar } from "@/components/sidebar";
import UserDataWrapper from "@/components/profiledashboard/UserDataWrapper";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
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
      <body className={poppins.className}>
          <StoreProvider>
            <LayoutProvider>
              <UserDataWrapper>
                <main className="flex min-h-screen">
                  <Sidebar />
                  <div className="flex-1 overflow-y-auto">
                    {children}
                    <Toaster />
                  </div>
                </main>
              </UserDataWrapper>
            </LayoutProvider>
          </StoreProvider>
      </body>
    </html>
  );
}
