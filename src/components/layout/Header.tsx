"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // Correct import for App Router
import { Satellite, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Map View", href: "/map" },
    { name: "Passes", href: "/passes" },
    { name: "Astronauts", href: "/astronauts" },
];

import { motion, AnimatePresence } from "framer-motion"; // Add this import

export function Header() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/60 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex min-w-0 items-center gap-2 text-lg font-bold tracking-tight sm:text-xl">
                    <Satellite className="h-5 w-5 shrink-0 animate-pulse text-primary sm:h-6 sm:w-6" />
                    <span className="truncate">Hi<span className="ml-1 font-extrabold text-gradient">Tracker</span></span>
                </Link>

                <nav className="hidden items-center gap-4 lg:flex xl:gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === item.href
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="lg:hidden">
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-16 w-full border-b border-primary/20 bg-black/90 px-4 py-3 shadow-2xl md:px-6 lg:hidden"
                    >
                        <nav className="container mx-auto flex flex-col gap-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "rounded-md p-3 text-sm font-medium transition-colors hover:bg-muted/50 hover:text-primary",
                                        pathname === item.href
                                            ? "text-foreground bg-muted"
                                            : "text-muted-foreground"
                                    )}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
