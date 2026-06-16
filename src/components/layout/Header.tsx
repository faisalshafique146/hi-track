"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // Correct import for App Router
import { Satellite, Menu, X } from "lucide-react";
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
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(!isOpen)}
                        className="rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10"
                    >
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-x-0 top-16 h-[calc(100vh-4rem)] bg-slate-950/55 backdrop-blur-sm lg:hidden"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: -18, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -18, scale: 0.98 }}
                            transition={{ duration: 0.24, ease: "easeOut" }}
                            className="absolute inset-x-0 top-16 px-4 pt-3 sm:px-6 lg:hidden"
                        >
                            <div className="container mx-auto overflow-hidden rounded-[28px] border border-cyan-300/15 bg-[linear-gradient(180deg,rgba(2,6,23,0.96),rgba(9,18,38,0.94))] px-5 py-4 shadow-[0_24px_90px_rgba(8,145,178,0.22)]">
                                <nav className="flex flex-col">
                                    {navItems.map((item, index) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                "block border-b border-white/8 py-4 text-lg font-medium tracking-wide transition-colors duration-200",
                                                pathname === item.href
                                                    ? "text-cyan-200"
                                                    : "text-slate-200 hover:text-white",
                                                index === navItems.length - 1 && "border-b-0 pb-2"
                                            )}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
