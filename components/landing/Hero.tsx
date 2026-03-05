"use client";

import { motion, useInView } from "framer-motion";
import { MagicButton } from "@/components/ui/MagicButton";
import Link from "next/link";
import { ChevronRight, Zap, Shield, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const floatingStats = [
    { icon: Zap, label: "Latency", value: "< 50ms", color: "#14F195" }, // Mint Teal
    { icon: Shield, label: "Accuracy", value: "98.7%", color: "#9945FF" }, // Soft Violet
    { icon: TrendingUp, label: "Models", value: "12+ ML", color: "#FF6188" }, // Soft Coral
];

const words = ["Predict", "Risk.", "Optimize", "Cost."];

/* ─── Elegant Starfield Particle Generator ─── */
const Starfield = () => {
    const [stars, setStars] = useState<{ x: number, y: number, r: number, d: number }[]>([]);
    useEffect(() => {
        setStars(Array.from({ length: 150 }).map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            r: Math.random() * 1.5 + 0.5,
            d: Math.random() * 10 + 10 // Animation duration
        })));
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {stars.map((star, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-white rounded-full"
                    style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.r, height: star.r }}
                    animate={{
                        opacity: [0.1, 0.8, 0.1],
                        scale: [1, 1.2, 1],
                        y: [0, -20, 0]
                    }}
                    transition={{
                        duration: star.d,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 5
                    }}
                />
            ))}
        </div>
    );
};

export const Hero = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    return (
        <section ref={ref} className="relative pt-32 pb-20 md:pt-52 md:pb-36 flex flex-col items-center justify-center text-center px-6 min-h-screen border-b border-white/[0.03]">

            {/* ─── Deep Space Animated Nebula & Stars ─── */}
            <Starfield />

            <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen opacity-60">
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full nebula-bg-1 blur-[100px]" />
                <div className="absolute bottom-[0%] right-[-10%] w-[900px] h-[900px] rounded-full nebula-bg-2 blur-[120px] opacity-40" />
            </div>

            <motion.div
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="relative z-10 max-w-5xl mx-auto flex flex-col items-center"
            >
                {/* Clean, thin glowing badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8"
                >
                    <span className="relative inline-flex items-center gap-3 px-6 py-2 rounded-full text-[11px] font-semibold tracking-[0.2em] text-aurora-green uppercase border border-aurora-green/20 glass-premium shadow-[0_0_20px_rgba(20,241,149,0.05)]">
                        <motion.span
                            className="w-1.5 h-1.5 rounded-full bg-aurora-green"
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        Next-Gen Actuarial Intelligence
                    </span>
                </motion.div>

                {/* Elegant Typography Staggered Reveal */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 text-balance">
                    <div className="flex flex-wrap justify-center gap-x-5 lg:gap-x-8">
                        {words.map((word, i) => (
                            <motion.span
                                key={word + i}
                                initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
                                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                                transition={{ duration: 1, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                                className={i % 2 === 0
                                    ? "text-slate-100" // Softer white
                                    : "text-transparent bg-clip-text bg-gradient-to-r from-aurora-green via-aurora-blue to-aurora-violet drop-shadow-[0_0_20px_rgba(20,241,149,0.1)]"
                                }
                            >
                                {word}
                            </motion.span>
                        ))}
                    </div>
                </h1>

                {/* Softer, highly legible subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="text-lg md:text-xl text-slate-400 max-w-2xl mb-14 font-medium leading-[1.7] text-balance"
                >
                    Harness advanced machine learning to accurately forecast health insurance premiums in under 50ms.
                    Built for the modern, data-driven underwriter.
                </motion.p>

                {/* Refined CTA Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 1.1, type: "spring", stiffness: 150 }}
                >
                    <Link href="/calculator">
                        <MagicButton className="text-base md:text-lg px-12 py-5 font-bold tracking-wider group gap-4">
                            <span className="text-white relative z-10">Launch Prediction Model</span>
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                            >
                                <ChevronRight className="w-5 h-5 text-aurora-green relative z-10" />
                            </motion.span>
                        </MagicButton>
                    </Link>
                </motion.div>

                {/* Premium Floating Stats Container */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 1.3 }}
                    className="flex flex-wrap justify-center gap-6 mt-20"
                >
                    {floatingStats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                            className="glass-premium px-6 py-4 rounded-2xl flex items-center gap-4 transition-all hover:-translate-y-1 hover:border-white/10"
                        >
                            <div className="p-2 rounded-xl" style={{ backgroundColor: `${stat.color}15`, border: `1px solid ${stat.color}30` }}>
                                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                            </div>
                            <div className="text-left">
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-1">{stat.label}</p>
                                <p className="text-lg font-bold text-slate-100 font-mono tracking-tight" style={{ textShadow: `0 0 16px ${stat.color}40` }}>
                                    {stat.value}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </motion.div>
        </section>
    );
};
