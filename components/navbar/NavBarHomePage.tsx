"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import logo from "@/public/logo.png";

import { Button } from "@/components/ui/button";
import {ModeToggle} from "@/components/ModeToggle";
import NotificationBar from "../NotificationBar";

const NavBarHomePage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);

        const handleScroll = () => {
            const announcementHeight =
                document.querySelector(".announcement-bar")?.clientHeight || 0;
            setIsSticky(window.scrollY > announcementHeight);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Delay rendering until mounted to avoid hydration mismatch
    if (!hasMounted) {
        return null;
    }

    const navItems = [
        { path: "/", label: "Home" },
        { path: "/service", label: "Service" },
        { path: "https://cloudinator-doc-vercel.vercel.app/", label: "Document" },
        { path: "/start-building", label: "Start Building" },
        { path: "/about", label: "About" },
    ];

    return (
        <>
            <NotificationBar />
            <header
                className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 transition-all duration-300 ${
                    isSticky ? "fixed top-0 left-0 right-0 shadow-lg" : ""
                }`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center ">
                        <Link href="/" aria-label="Home">
                            <Image
                                src={logo}
                                alt="Cloudinator"
                                width={100}
                                height={100}
                                className="w-16 h-16"
                            />
                        </Link>
                        <nav className="hidden md:flex space-x-2">
                            {navItems.map((item) => (
                                <Button
                                    key={item.path}
                                    variant="ghost"
                                    asChild
                                    className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 ease-in-out"
                                >
                                    <Link href={item.path}>{item.label}</Link>
                                </Button>
                            ))}
                        </nav>
                        <div className="hidden md:flex items-center space-x-4">
                            <ModeToggle />
                            <Button
                                asChild
                                className="bg-purple-600 hover:bg-purple-700 text-white"
                            >
                                <Link href="/sign-up">SIGN UP</Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="border-purple-600 text-purple-600 hover:bg-purple-100 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900"
                            >
                                <Link href="/login">SIGN IN</Link>
                            </Button>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </Button>
                    </div>
                    {isMenuOpen && (
                        <div className="md:hidden mt-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
                            <nav className="flex flex-col space-y-2 p-4">
                                {navItems.map((item) => (
                                    <Button
                                        key={item.path}
                                        variant="ghost"
                                        asChild
                                        className="justify-start text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 ease-in-out"
                                    >
                                        <Link href={item.path}>{item.label}</Link>
                                    </Button>
                                ))}
                            </nav>
                            <div className="mt-4 flex flex-col space-y-4 p-4">
                                <ModeToggle />
                                <Button
                                    asChild
                                    className="bg-purple-600 hover:bg-purple-700 text-white"
                                >
                                    <Link href="#">SIGN UP</Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="border-purple-600 text-purple-600 hover:bg-purple-100 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900"
                                >
                                    <Link href="#">SIGN IN</Link>
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </header>
            {isSticky && <div style={{ height: "96px" }} />}{" "}
            {/* Adjusted placeholder height */}
        </>
    );
};

export default NavBarHomePage;