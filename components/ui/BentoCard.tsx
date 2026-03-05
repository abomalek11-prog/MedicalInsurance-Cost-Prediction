"use client";
import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface BentoCardProps {
    children: React.ReactNode;
    className?: string;
}

export const BentoCard = ({ children, className }: BentoCardProps) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
    const [spotlightOpacity, setSpotlightOpacity] = useState(0);

    // 3D tilt
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 25 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 25 });
    const scale = useSpring(1, { stiffness: 200, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setSpotlightPos({ x, y });
        mouseX.set((x / rect.width) - 0.5);
        mouseY.set((y / rect.height) - 0.5);
    };

    const handleMouseEnter = () => { setSpotlightOpacity(1); scale.set(1.02); };
    const handleMouseLeave = () => {
        setSpotlightOpacity(0);
        mouseX.set(0);
        mouseY.set(0);
        scale.set(1);
    };

    return (
        <motion.div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, scale, transformPerspective: 1000 }}
            className={cn(
                "relative flex w-full flex-col overflow-hidden rounded-3xl border border-white/[0.06]",
                "bg-[rgba(13,12,29,0.5)] p-8 glass-premium transition-colors duration-300",
                "hover:border-aurora-violet/30",
                className
            )}
        >
            {/* Mouse spotlight */}
            <div
                className="pointer-events-none absolute -inset-px transition duration-300 rounded-3xl"
                style={{
                    opacity: spotlightOpacity,
                    background: `radial-gradient(500px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(123, 47, 255, 0.1), transparent 50%)`,
                }}
            />

            {/* Shimmer border on hover */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aurora-violet/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-aurora-green/40 to-transparent" />
            </div>

            <div className="relative z-10 group">{children}</div>
        </motion.div>
    );
};
