import type { Metadata } from "next";
import "@/app/globals.css";

import { Poppins } from 'next/font/google';
import {ThemeProvider} from "next-themes";

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-poppins',
});

export const metadata: Metadata = {
    title: "Cloudinator",
    description: "Cloudinator Application",
};

export default function AppLayout({
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
                    {children}
                </ThemeProvider>
        </body>
        </html>
    );
}

