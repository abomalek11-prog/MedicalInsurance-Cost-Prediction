"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    wrapperClassName?: string;
}

export const MagicButton = React.forwardRef<HTMLButtonElement, MagicButtonProps>(
    ({ children, className, wrapperClassName, ...props }, ref) => {
        return (
            <div className={cn("relative inline-block", wrapperClassName)}>
                {/* outer aurora breathing ring */}
                <motion.div
                    className="absolute -inset-[3px] rounded-full opacity-80"
                    style={{
                        background: "conic-gradient(from 0deg, #00FFA3, #7B2FFF, #FF2D87, #00FFA3)",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                {/* blur glow halo */}
                <motion.div
                    className="absolute -inset-2 rounded-full blur-xl opacity-50"
                    style={{
                        background: "conic-gradient(from 0deg, #00FFA3, #7B2FFF, #FF2D87, #00FFA3)",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                {/* the button */}
                <button
                    ref={ref}
                    className={cn(
                        "relative px-10 py-4 rounded-full font-bold flex items-center justify-center gap-2",
                        "bg-[#06050F] text-white",
                        "shimmer-hover",
                        "transition-transform duration-200 active:scale-95",
                        className
                    )}
                    {...props}
                >
                    {children}
                </button>
            </div>
        );
    }
);
MagicButton.displayName = "MagicButton";
