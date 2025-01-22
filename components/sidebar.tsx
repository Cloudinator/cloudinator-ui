"use client";


import { cn } from "@/lib/utils";
import { PanelLeftClose, PanelRightClose } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";
import { MainNav } from "./main-nav";


export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  // Retrieve the collapsed state from localStorage or default to false
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("sidebar-collapsed");



      return savedState ? JSON.parse(savedState) : false;
    }
    return false;
  });

  // Save the collapsed state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebar-collapsed", JSON.stringify(isCollapsed));
    }
  }, [isCollapsed]);

  // Toggle the collapsed state
  const toggleCollapse = () => {
    setIsCollapsed((prev: boolean) => !prev);
  };

  return (
      <main>
        <section className="sticky top-0">
          <div
              className={cn(
                  "relative flex flex-col h-screen bg-background transition-all duration-300 border-r",
                  isCollapsed ? "w-[80px]" : "w-64",
                  className
              )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4">
              {!isCollapsed && <div className="text-lg font-semibold flex">
                <Image src={"/logo.png"} alt="Logo" width={50} height={50} />
                <h1 className="pt-2 pl-3 text-purple-500">Cloudinator</h1>
              </div>}
              <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={toggleCollapse}
                  aria-label="Toggle Sidebar"
              >
                {isCollapsed ? (
                    <PanelRightClose className="h-5 w-5" />
                ) : (
                    <PanelLeftClose className="h-5 w-5" />
                )}
              </Button>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-auto">
              <MainNav isCollapsed={isCollapsed} />

            </div>

            {/* Footer */}
            <div className="p-4 flex justify-center">
              <ModeToggle />
            </div>

          </div>
        </section>
      </main>
  );
}