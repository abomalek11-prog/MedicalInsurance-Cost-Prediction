import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { MarqueeLogos } from "@/components/landing/MarqueeLogos";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col bg-deep-charcoal text-white bg-grid selection:bg-cyber-cyan/30">
      <Navbar />

      <div className="flex-1 w-full flex flex-col items-center z-10">
        <Hero />

        <div className="w-full">
          <MarqueeLogos />
        </div>

        <div className="w-full">
          <FeatureGrid />
        </div>
      </div>

      <Footer />
    </main>
  );
}
