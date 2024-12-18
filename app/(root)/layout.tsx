"use client";

import "../globals.css";

import NavBarHomePage from "@/components/navbar/NavBarHomePage";
import BackToTopButton from "@/components/BackToTopButton";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import TutorialPopup from "@/components/TutorialPopup";

import { Poppins } from 'next/font/google';
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import StoreProvider from "@/app/StoreProvider";
import Footer from "@/components/footer/Footer";
import { ThemeProvider } from "next-themes";
import { RouteTransition } from "@/components/RouteTransition";

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-poppins',
});

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={poppins.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <AuthProvider> {/* Move AuthProvider here */}
                        <StoreProvider>
                            <NavBarHomePage />
                            <ScrollProgressBar />
                            <RouteTransition>
                                {children}
                            </RouteTransition>
                            <BackToTopButton />
                            <Footer />
                            <InnerContent /> {/* Render InnerContent separately */}
                        </StoreProvider>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}

// Separate InnerContent component to access useAuth
const InnerContent = () => {
    const { user, loading } = useAuth();
    return (
        <>
            {!loading && user && <TutorialPopup />}
        </>
    );
};
