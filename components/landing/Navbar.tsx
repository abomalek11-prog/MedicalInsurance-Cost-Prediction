"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShieldCheck } from "lucide-react";
import Link from "next/link";

const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Technology", href: "#features" },
];

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? "py-4" : "py-6"}`}
            >
                <div className="max-w-7xl mx-auto px-6">
                    <div className={`relative px-6 py-3.5 flex items-center justify-between transition-all duration-700 ${scrolled
                        ? "glass-premium rounded-2xl border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
                        : "bg-transparent border border-transparent rounded-2xl"
                        }`}>

                        {/* Top glow edge when scrolled */}
                        {scrolled && (
                            <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        )}

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <motion.div
                                className="relative"
                                animate={{ filter: ["drop-shadow(0 0 8px rgba(20,241,149,0.3))", "drop-shadow(0 0 16px rgba(153,69,255,0.4))", "drop-shadow(0 0 8px rgba(20,241,149,0.3))"] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <ShieldCheck className="w-8 h-8 text-aurora-green" />
                            </motion.div>
                            <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
                                Insura<span className="text-slate-300">Vision</span> <span className="text-aurora-violet text-[11px] font-mono tracking-widest ml-1">AI</span>
                            </span>
                        </Link>

                        {/* Desktop Links */}
                        <ul className="hidden md:flex items-center gap-10 text-[13px] font-semibold tracking-wide text-slate-400 uppercase">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="relative group hover:text-slate-100 transition-colors duration-300 py-2">
                                        {link.name}
                                        {/* Extremely subtle animated underline */}
                                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-aurora-green to-aurora-violet group-hover:w-full transition-all duration-500 rounded-full" />
                                    </Link>
                                </li>
                            ))}
                            {/* CTA Link disguised as Nav item */}
                            <li>
                                <Link href="/calculator" className="text-aurora-green hover:text-white transition-colors duration-300 flex items-center gap-2">
                                    Launch APP <span className="w-1.5 h-1.5 rounded-full bg-aurora-green animate-pulse" />
                                </Link>
                            </li>
                        </ul>

                        {/* Mobile toggle */}
                        <button
                            className="md:hidden p-2 rounded-xl hover:bg-white/5 transition-colors text-slate-300"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <AnimatePresence mode="wait">
                                {mobileMenuOpen
                                    ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <X className="w-6 h-6" />
                                    </motion.div>
                                    : <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <Menu className="w-6 h-6" />
                                    </motion.div>
                                }
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu - Full Screen Deep Space Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-40 bg-deep-charcoal/90 flex flex-col items-center justify-center p-6 border-t border-white/5"
                    >
                        {/* Background subtle drift */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen opacity-50">
                            <div className="absolute w-[500px] h-[500px] rounded-full bg-aurora-violet/20 blur-[100px] -top-32 -left-32 animate-pulse-glow" />
                            <div className="absolute w-[500px] h-[500px] rounded-full bg-aurora-green/10 blur-[100px] -bottom-32 -right-32 animate-pulse-glow" style={{ animationDelay: "1s" }} />
                        </div>

                        <ul className="flex flex-col items-center gap-10 text-xl font-bold tracking-widest uppercase text-slate-300 relative z-10">
                            {navLinks.map((link, i) => (
                                <motion.li
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * i, type: "spring", stiffness: 200 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="hover:text-white transition-colors duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.li>
                            ))}
                            <motion.li
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                            >
                                <Link
                                    href="/calculator"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-aurora-green hover:text-white transition-colors duration-300"
                                >
                                    Launch App
                                </Link>
                            </motion.li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
