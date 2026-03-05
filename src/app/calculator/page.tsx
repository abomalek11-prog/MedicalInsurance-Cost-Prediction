"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity, Cigarette, MapPin, ChevronRight,
  ShieldCheck, AlertCircle, ArrowLeft, User, Baby, TrendingUp, Cpu
} from "lucide-react";
import Link from "next/link";

/* ─── Animated counter hook ─── */
function useCountUp(target: number, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (target === 0) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(target * eased);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return value;
}

/* ─── Refined Particle Sub-layer ─── */
function ParticleField() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    duration: Math.random() * 30 + 15,
    delay: Math.random() * 10,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen opacity-40">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-aurora-blue"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -60, 0], opacity: [0.1, 0.6, 0.1] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ─── Segmented toggle ─── */
function SegmentedToggle({ options, value, onChange, colorActive = "#14F195" }: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
  colorActive?: string;
}) {
  const activeIdx = options.findIndex(o => o.value === value);
  return (
    <div className="flex bg-void/60 p-1.5 rounded-xl border border-white/[0.04] relative">
      <motion.div
        className="absolute top-1.5 bottom-1.5 rounded-[10px]"
        style={{ background: `${colorActive}15`, border: `1px solid ${colorActive}30`, width: `calc(${100 / options.length}% - 6px)` }}
        animate={{ left: `calc(${(100 / options.length) * activeIdx}% + 3px)` }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
      />
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`flex-1 py-3 rounded-[10px] text-sm font-semibold capitalize transition-colors duration-200 relative z-10 ${value === opt.value ? "text-slate-100" : "text-slate-500 hover:text-slate-300"}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

/* ─── Premium input field ─── */
function PremiumInput({ label, suffix, ...props }: { label: string; suffix?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative group">
      <label className={`block text-[10px] font-mono uppercase tracking-[0.2em] mb-2 transition-colors duration-200 ${focused ? "text-aurora-green" : "text-slate-500"}`}>
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          onFocus={e => { setFocused(true); props.onFocus?.(e); }}
          onBlur={e => { setFocused(false); props.onBlur?.(e); }}
          className="w-full p-4 bg-void/50 rounded-2xl border text-slate-100 font-mono text-lg outline-none transition-all duration-300 placeholder:text-slate-700"
          style={{
            borderColor: focused ? "rgba(20,241,149,0.4)" : "rgba(255,255,255,0.05)",
            boxShadow: focused ? "0 0 20px rgba(20,241,149,0.05), inset 0 0 10px rgba(20,241,149,0.02)" : "none",
          }}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-[11px] tracking-widest">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

/* ─── Main page ─── */
export default function CalculatorPage() {
  const [formData, setFormData] = useState({
    age: 30,
    sex: "male",
    bmi: 24.5,
    children: 0,
    smoker: "no",
    region: "southeast"
  });

  const [result, setResult] = useState<null | { prediction_cost: number; input_summary: any }>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const animatedCost = useCountUp(result?.prediction_cost ?? 0, 2000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "age" || name === "children" ? parseInt(value) : name === "bmi" ? parseFloat(value) : value
    }));
  };

  const calculateInsurance = async () => {
    setLoading(true);
    setError("");
    setResult(null);
    await new Promise(r => setTimeout(r, 1600)); // Simulated artificial latency for the cinematic feel
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await axios.post(`${apiUrl}/predict`, formData);
      setResult(response.data);
    } catch {
      setError("Failed to connect to prediction engine. Ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const isHighRisk = result?.input_summary?.risk_factor === "High";

  return (
    <main className="min-h-screen relative overflow-x-hidden pb-24 bg-deep-charcoal">

      {/* ───═══ Deep Space Background ═══─── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden mix-blend-screen opacity-70">
        <div className="absolute w-[800px] h-[800px] rounded-full nebula-bg-1 blur-[120px] top-[-20%] left-[-20%] opacity-30" />
        <div className="absolute w-[700px] h-[700px] rounded-full nebula-bg-2 blur-[100px] bottom-[-10%] right-[-10%] opacity-20" />
        <ParticleField />
      </div>

      {/* ───═══ Premium Header ═══─── */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 sticky top-0"
        style={{ background: "rgba(9,9,14,0.75)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255,255,255,0.03)" }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aurora-violet/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link href="/" className="p-2.5 rounded-xl hover:bg-white/5 transition-colors group">
              <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-aurora-green transition-colors" />
            </Link>
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ filter: ["drop-shadow(0 0 8px rgba(20,241,149,0.3))", "drop-shadow(0 0 16px rgba(153,69,255,0.4))", "drop-shadow(0 0 8px rgba(20,241,149,0.3))"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <ShieldCheck className="w-8 h-8 text-aurora-green" />
              </motion.div>
              <div>
                <h1 className="text-[17px] font-bold text-slate-100 tracking-tight">
                  InsuraVision <span className="text-aurora-green font-mono text-[11px] ml-1">SYS-CORE</span>
                </h1>
                <p className="text-[9px] text-slate-500 font-mono tracking-[0.2em] uppercase mt-0.5">Prediction Engine v2.0</p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <motion.div
              className="flex items-center gap-2.5 px-4 py-2 rounded-[10px] border border-aurora-green/20 text-[10px] font-mono tracking-widest text-aurora-green uppercase bg-aurora-green/5"
              animate={{ borderColor: ["rgba(20,241,149,0.2)", "rgba(20,241,149,0.5)", "rgba(20,241,149,0.2)"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-aurora-green"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              System Online
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* ───═══ Main Content ═══─── */}
      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">

        {/* ─── Left: Form ─── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="mb-8">
            <p className="text-aurora-green font-mono text-[10px] tracking-[0.3em] uppercase mb-2">Step 01</p>
            <h2 className="text-3xl font-black text-slate-100 tracking-tight">Subject Demographics Profile</h2>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">Provide accurate data to initialize the actuarial prediction matrix.</p>
          </div>

          <div
            className="relative rounded-[24px] p-8 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
            style={{ background: "rgba(17,17,26,0.5)", border: "1px solid rgba(255,255,255,0.04)", backdropFilter: "blur(24px)" }}
          >
            {/* Very subtle animated top lighting */}
            <motion.div
              className="absolute inset-x-0 top-0 h-px opacity-50"
              animate={{ background: ["linear-gradient(90deg,transparent,#9945FF,transparent)", "linear-gradient(90deg,transparent,#14F195,transparent)", "linear-gradient(90deg,transparent,#9945FF,transparent)"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Age */}
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-4 h-4 text-aurora-green opacity-70" />
                  <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">Subject Age</label>
                </div>
                <PremiumInput
                  label=""
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  suffix="YRS"
                />
              </motion.div>

              {/* BMI */}
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-aurora-violet opacity-70" />
                    <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">Body Mass Index</label>
                  </div>
                  <motion.span
                    key={formData.bmi}
                    initial={{ scale: 1.2, color: "#14F195" }}
                    animate={{ scale: 1, color: "#14F195" }}
                    className="text-base font-bold font-mono tracking-tight"
                  >
                    {formData.bmi.toFixed(1)}
                  </motion.span>
                </div>
                <div className="relative pt-2">
                  <div className="relative h-2 bg-void rounded-full overflow-hidden border border-white/[0.02]">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ background: "linear-gradient(90deg, #14F195, #9945FF, #FF6188)" }}
                      animate={{ width: `${((formData.bmi - 15) / 35) * 100}%` }}
                      transition={{ type: "spring", stiffness: 120 }}
                    />
                  </div>
                  <input
                    type="range"
                    name="bmi"
                    min="15"
                    max="50"
                    step="0.1"
                    value={formData.bmi}
                    onChange={handleChange}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer"
                    style={{ height: "16px", top: "4px" }}
                  />
                  <div className="flex justify-between text-[10px] text-slate-600 font-mono mt-3 uppercase tracking-wider">
                    <span>15.0</span><span>32.5</span><span>50.0</span>
                  </div>
                </div>
              </motion.div>

              {/* Sex */}
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 mb-3">Biological Sex</label>
                <SegmentedToggle
                  options={[{ label: "Male", value: "male" }, { label: "Female", value: "female" }]}
                  value={formData.sex}
                  onChange={v => setFormData(p => ({ ...p, sex: v }))}
                />
              </motion.div>

              {/* Children */}
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                <div className="flex items-center gap-2 mb-3">
                  <Baby className="w-4 h-4 text-aurora-rose opacity-70" />
                  <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">Dependents</label>
                </div>
                <div
                  className="flex items-center gap-4 p-2 rounded-2xl"
                  style={{ background: "rgba(6,6,10,0.5)", border: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setFormData(p => ({ ...p, children: Math.max(0, p.children - 1) }))}
                    className="w-12 h-12 rounded-[14px] flex items-center justify-center text-xl font-medium text-slate-300 transition-colors hover:text-white"
                    style={{ background: "rgba(255,97,136,0.1)", border: "1px solid rgba(255,97,136,0.2)" }}
                  >
                    −
                  </motion.button>
                  <motion.span
                    key={formData.children}
                    initial={{ scale: 1.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex-1 text-center font-mono text-3xl font-bold tracking-tighter"
                    style={{ color: "#FF6188" }}
                  >
                    {formData.children}
                  </motion.span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setFormData(p => ({ ...p, children: Math.min(5, p.children + 1) }))}
                    className="w-12 h-12 rounded-[14px] flex items-center justify-center text-xl font-medium text-slate-300 transition-colors hover:text-white"
                    style={{ background: "rgba(20,241,149,0.1)", border: "1px solid rgba(20,241,149,0.2)" }}
                  >
                    +
                  </motion.button>
                </div>
              </motion.div>

              {/* Smoker */}
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 mb-3">Lifestyle Risk</label>
                <motion.button
                  onClick={() => setFormData(p => ({ ...p, smoker: p.smoker === "yes" ? "no" : "yes" }))}
                  className="w-full p-4 rounded-2xl flex items-center justify-between transition-all duration-300 relative overflow-hidden h-[64px]"
                  style={{
                    background: formData.smoker === "yes" ? "rgba(255,97,136,0.08)" : "rgba(6,6,10,0.5)",
                    border: formData.smoker === "yes" ? "1px solid rgba(255,97,136,0.3)" : "1px solid rgba(255,255,255,0.04)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3 z-10 relative">
                    <Cigarette className={`w-5 h-5 transition-colors duration-300 ${formData.smoker === "yes" ? "text-aurora-rose" : "text-slate-600"}`} />
                    <span className={`font-semibold text-sm transition-colors duration-300 ${formData.smoker === "yes" ? "text-aurora-rose drop-shadow-[0_0_8px_rgba(255,97,136,0.5)]" : "text-slate-400"}`}>
                      {formData.smoker === "yes" ? "Active Tobacco User" : "Non-Smoker"}
                    </span>
                  </div>
                  <div
                    className="w-11 h-6 rounded-full p-1 transition-colors duration-300 z-10 flex items-center shadow-inner"
                    style={{ background: formData.smoker === "yes" ? "#FF6188" : "rgba(255,255,255,0.08)" }}
                  >
                    <motion.div
                      className="w-4 h-4 rounded-full bg-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
                      animate={{ x: formData.smoker === "yes" ? 20 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </div>
                </motion.button>
              </motion.div>

              {/* Region */}
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-aurora-blue opacity-70" />
                  <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">Geographic Region</label>
                </div>
                <div className="relative">
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    className="w-full p-4 pl-5 rounded-2xl text-slate-200 font-medium outline-none appearance-none transition-all duration-300 cursor-pointer"
                    style={{
                      background: "rgba(6,6,10,0.5)",
                      border: "1px solid rgba(0,194,255,0.15)",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(0,194,255,0.4)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(0,194,255,0.15)")}
                  >
                    <option value="southeast">🌴 Southeast</option>
                    <option value="southwest">🌵 Southwest</option>
                    <option value="northeast">🏙️ Northeast</option>
                    <option value="northwest">🏔️ Northwest</option>
                  </select>
                  <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 rotate-90 pointer-events-none" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ─── Right: Engine Panel ─── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="mb-8">
            <p className="text-aurora-violet font-mono text-[10px] tracking-[0.3em] uppercase mb-2">Step 02</p>
            <h2 className="text-3xl font-black text-slate-100 tracking-tight">Actuarial Analytics</h2>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">Execute the machine learning pipeline to forecast risk.</p>
          </div>

          {/* Elegant Execute Button */}
          <motion.button
            onClick={calculateInsurance}
            disabled={loading}
            className="w-full relative group overflow-hidden rounded-[20px] disabled:opacity-80 disabled:cursor-not-allowed"
            style={{ padding: "2px" }} // For gradient border effect
            whileHover={{ scale: loading ? 1 : 1.015 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {/* Soft gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-aurora-green via-aurora-blue to-aurora-violet opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative rounded-[18px] px-6 py-6 flex items-center justify-center gap-4 bg-void/90 backdrop-blur-md h-full w-full pointer-events-none">
              {loading ? (
                <div className="flex items-center gap-4">
                  <div className="relative w-6 h-6">
                    <motion.div className="absolute inset-0 rounded-full border border-slate-500 border-t-aurora-green" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
                    <motion.div className="absolute inset-1 rounded-full border border-slate-600 border-b-aurora-violet" animate={{ rotate: -360 }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} />
                  </div>
                  <span className="text-[13px] font-bold tracking-[0.2em] font-mono text-slate-300 uppercase">Processing Matrix...</span>
                </div>
              ) : (
                <>
                  <Cpu className="w-5 h-5 text-aurora-green group-hover:drop-shadow-[0_0_8px_rgba(20,241,149,0.8)] transition-all" />
                  <span className="text-sm md:text-base font-bold tracking-widest uppercase text-slate-100 group-hover:text-white transition-colors">
                    Execute Prediction
                  </span>
                  <motion.div animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
                    <ChevronRight className="w-5 h-5 text-aurora-blue" />
                  </motion.div>
                </>
              )}
            </div>
          </motion.button>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="flex items-center gap-3 p-4 rounded-xl overflow-hidden"
                style={{ background: "rgba(255,97,136,0.05)", border: "1px solid rgba(255,97,136,0.2)" }}
              >
                <AlertCircle className="w-5 h-5 text-aurora-rose shrink-0" />
                <p className="text-xs text-aurora-rose font-medium tracking-wide">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cinematic Result Panel */}
          <AnimatePresence mode="popLayout">
            {result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-[24px] p-8 overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
                style={{
                  background: "rgba(17,17,26,0.7)",
                  border: `1px solid ${isHighRisk ? "rgba(255,97,136,0.3)" : "rgba(20,241,149,0.3)"}`,
                  backdropFilter: "blur(32px)",
                }}
              >
                {/* Soft diffuse glow orb behind text */}
                <div
                  className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-10 pointer-events-none"
                  style={{ background: isHighRisk ? "#FF6188" : "#14F195" }}
                />

                <p
                  className="font-mono text-[10px] tracking-[0.3em] uppercase mb-5"
                  style={{ color: isHighRisk ? "#FF6188" : "#14F195" }}
                >
                  Estimated Annual Premium
                </p>

                {/* Animated Number Trace */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 100 }}
                  className="mb-10 flex items-baseline"
                >
                  <span className="text-slate-500 font-mono text-4xl mr-2">$</span>
                  <span
                    className="text-6xl lg:text-7xl font-black font-sans tracking-tighter"
                    style={{
                      color: "white",
                      textShadow: `0 0 40px ${isHighRisk ? "rgba(255,97,136,0.2)" : "rgba(20,241,149,0.2)"}`,
                    }}
                  >
                    {animatedCost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </motion.div>

                {/* Clean, separated Data Rows */}
                <div className="space-y-4">
                  {[
                    {
                      label: "Risk Classification",
                      value: result.input_summary.risk_factor,
                      color: isHighRisk ? "#FF6188" : "#14F195",
                      border: isHighRisk ? "rgba(255,97,136,0.15)" : "rgba(20,241,149,0.15)",
                    },
                    {
                      label: "Smoker Factor",
                      value: result.input_summary.smoker_status,
                      color: "#A0A0C0",
                      border: "rgba(255,255,255,0.05)",
                    },
                    {
                      label: "Engine Confidence",
                      value: "Linear Regression · 85% AC",
                      color: "#9945FF",
                      border: "rgba(153,69,255,0.15)",
                    },
                  ].map((row, i) => (
                    <motion.div
                      key={row.label}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center justify-between pb-3 relative"
                      style={{ borderBottom: `1px solid ${row.border}` }}
                    >
                      <span className="text-slate-400 text-[11px] font-mono uppercase tracking-widest">{row.label}</span>
                      <span className="text-sm font-semibold font-mono tracking-tight" style={{ color: row.color }}>{row.value}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative rounded-[24px] p-8 flex flex-col items-center justify-center text-center h-[380px] overflow-hidden"
                style={{ background: "rgba(17,17,26,0.3)", border: "1px dashed rgba(255,255,255,0.06)" }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="mb-8 opacity-[0.15]"
                >
                  <Activity className="w-16 h-16 text-aurora-violet drop-shadow-[0_0_15px_rgba(153,69,255,0.4)]" />
                </motion.div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-slate-500 mb-2">Awaiting Parameters</p>
                <p className="text-slate-600 text-[13px] max-w-[200px]">Provide subject data on the left to initialize matrix.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
