import type { Metadata } from "next";
import "../globals.css";

import { ThemeProvider } from "@/components/theme-provider"
import NavBarHomePage from "@/components/navbar/NavBarHomePage";
import BackToTopButton from "@/components/BackToTopButton";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { SiteFooter } from "@/components/footer/SiteFooter";
import TutorialPopup from "@/components/TutorialPopup";

import { Poppins } from 'next/font/google';
import { AuthProvider } from "@/contexts/AuthContext";

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-poppins',
});

export const metadata: Metadata = {
    title: "Cloudinator",
    description: "Cloudinator Application",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={poppins.className}
        >
        <AuthProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <NavBarHomePage/>
                <ScrollProgressBar />
                {children}
                <BackToTopButton />
                <SiteFooter />
                <TutorialPopup />
            </ThemeProvider>
        </AuthProvider>
        </body>
        </html>
    );
}

