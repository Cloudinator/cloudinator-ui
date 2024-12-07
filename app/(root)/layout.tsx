import type { Metadata } from "next";
import "../globals.css";

import { ThemeProvider } from "@/components/theme-provider"
import NavBarHomePage from "@/components/navbar/NavBarHomePage";
import BackToTopButton from "@/components/BackToTopButton";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import TutorialPopup from "@/components/TutorialPopup";

import { Poppins } from 'next/font/google';
import { AuthProvider } from "@/contexts/AuthContext";
import StoreProvider from "@/app/StoreProvider";
import Footer from "@/components/footer/Footer";

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
        <StoreProvider>
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
                    <Footer />
                    <TutorialPopup />
                </ThemeProvider>
            </AuthProvider>
        </StoreProvider>
        </body>
        </html>
    );
}

