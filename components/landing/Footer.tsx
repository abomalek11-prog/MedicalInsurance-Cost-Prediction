import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="relative border-t overflow-hidden pt-16 pb-8 px-6 mt-20" style={{ borderColor: "rgba(123,47,255,0.2)" }}>
            {/* aurora divider glow */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aurora-violet/60 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-aurora-violet/5 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="md:col-span-1">
                    <Link href="/" className="flex items-center gap-2 mb-4">
                        <ShieldCheck className="w-6 h-6 text-aurora-green" />
                        <span className="text-lg font-bold text-white">InsuraVision <span className="text-aurora-green font-mono text-sm">AI</span></span>
                    </Link>
                    <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
                        Architecting the future of risk assessment with state-of-the-art machine learning.
                    </p>
                </div>

                {[
                    { title: "Product", links: ["Features", "Enterprise API", "Pricing"] },
                    { title: "Resources", links: ["Documentation", "Research Papers", "Case Studies", "Help Center"] },
                    { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Security", "Compliance"] },
                ].map((col) => (
                    <div key={col.title}>
                        <h4 className="text-white font-semibold mb-4 text-sm tracking-wide">{col.title}</h4>
                        <ul className="space-y-3 text-sm text-slate-500">
                            {col.links.map((l) => (
                                <li key={l}>
                                    <Link href="#" className="hover:text-aurora-green transition-colors duration-200">{l}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between pt-8 border-t text-sm text-slate-600 gap-4" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                <p>© {new Date().getFullYear()} InsuraVision AI. All rights reserved.</p>
                <div className="flex items-center gap-6">
                    {["Twitter", "LinkedIn", "GitHub"].map((s) => (
                        <Link key={s} href="#" className="hover:text-white transition-colors duration-200">{s}</Link>
                    ))}
                </div>
            </div>
        </footer>
    );
};
