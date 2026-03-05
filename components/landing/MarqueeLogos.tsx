"use client";

import { motion } from "framer-motion";

const partners = [
    "Acme Corp", "Global Health", "MediCare Plus", "TrustShield", "NovaLife",
    "Aura Group", "Pulse Inc", "Apex Medical", "CareFirst", "Vitality"
];

export const MarqueeLogos = () => {
    return (
        <section className="py-12 border-y border-white/5 bg-white/[0.01] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-8 text-center text-sm font-semibold tracking-widest text-slate-500 uppercase">
                Trusted by Top Healthcare Providers
            </div>

            <div className="relative flex max-w-[100vw] overflow-hidden">
                {/* Left/Right fading gradients */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20,
                    }}
                    className="flex whitespace-nowrap items-center gap-16 py-4 px-8"
                >
                    {/* Double the array for seamless looping */}
                    {[...partners, ...partners].map((partner, i) => (
                        <div key={i} className="flex items-center justify-center min-w-[150px]">
                            <span className="text-2xl font-bold text-slate-600/50 hover:text-slate-300 transition-colors uppercase tracking-tight">
                                {partner}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
