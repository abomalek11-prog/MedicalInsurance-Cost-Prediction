"use client";

import { motion, useInView } from "framer-motion";
import { BentoCard } from "@/components/ui/BentoCard";
import { Activity, ShieldCheck, Zap, Lock, Brain, Database } from "lucide-react";
import { useRef } from "react";

const features = [
    {
        icon: Activity,
        title: "Predictive AI Engine",
        description: "Advanced machine learning modules synthesize multiple demographic data points to accurately estimate risk profiles and lifetime actuarial costs.",
        color: "#14F195", // Mint Teal
        span: "md:col-span-2",
        size: "large",
        bgIcon: Brain,
    },
    {
        icon: Zap,
        title: "Real-Time Processing",
        description: "Lightning-fast continuous calculations. Sub-millisecond latency on direct API calls.",
        color: "#9945FF", // Soft Violet
        span: "",
        size: "small",
    },
    {
        icon: ShieldCheck,
        title: "Impeccable Accuracy",
        description: "Rigorously tested against millions of active records, ensuring compliance well above industry standards.",
        color: "#00C2FF", // Soft Cyan
        span: "",
        size: "small",
    },
    {
        icon: Lock,
        title: "Enterprise Security",
        description: "Bank-grade encryption for data at rest and in transit. SOC2, HIPAA, and GDPR compliant by architectural design.",
        color: "#FF6188", // Soft Coral
        span: "md:col-span-2",
        size: "large",
        bgIcon: Database,
    },
];

export const FeatureGrid = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="features" ref={ref} className="py-32 px-6 relative z-10 border-b border-white/[0.03]">
            <div className="max-w-7xl mx-auto">

                {/* Section header */}
                <div className="text-center mb-24">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-aurora-violet font-mono text-[11px] tracking-[0.35em] font-semibold uppercase mb-6"
                    >
                        Platform Capabilities
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl md:text-6xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-br from-slate-100 via-slate-300 to-slate-500 tracking-tight"
                    >
                        Intelligent Infrastructure
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-slate-400 max-w-2xl mx-auto text-lg leading-[1.8] text-balance"
                    >
                        Everything you need to confidently predict, manage, and infinitely scale your actuarial models — unified in a single robust platform.
                    </motion.p>
                </div>

                {/* Harmonious Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[minmax(280px,auto)]">
                    {features.map((f, i) => (
                        <motion.div
                            key={f.title}
                            className={f.span}
                            initial={{ opacity: 0, y: 40, scale: 0.98 }}
                            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                            transition={{ duration: 0.8, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <BentoCard className={`flex flex-col justify-end overflow-hidden group h-full transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] ${f.size === "large" ? "min-h-[280px]" : ""}`}>

                                {/* Very soft background icon decoration */}
                                {f.bgIcon && (
                                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
                                        <f.bgIcon className="w-40 h-40" style={{ color: f.color }} />
                                    </div>
                                )}

                                {/* Smooth gradient top border on hover */}
                                <div className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                    style={{ background: `linear-gradient(90deg, transparent, ${f.color}60, transparent)` }}
                                />

                                <div className="relative z-10">
                                    {/* Icon Container with precise contrast */}
                                    <motion.div
                                        className="mb-6 w-fit p-3.5 rounded-[18px] border"
                                        style={{ background: `${f.color}10`, borderColor: `${f.color}25` }}
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <f.icon className="w-6 h-6" style={{ color: f.color }} />
                                    </motion.div>

                                    <h3 className={`font-bold text-slate-100 tracking-tight mb-3 ${f.size === "large" ? "text-2xl" : "text-xl"}`}>
                                        {f.title}
                                    </h3>
                                    <p className={`text-slate-400 leading-[1.7] ${f.size === "large" ? "max-w-md text-base" : "text-sm"}`}>
                                        {f.description}
                                    </p>
                                </div>
                            </BentoCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
