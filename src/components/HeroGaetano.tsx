import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import portrait from "@/assets/gaetano-portrait.jpg";
import { useQuizModal } from "@/context/QuizModalContext";

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// Floating ellipse shape component
function FloatingShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-cyan-500/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, rotate: rotate - 5 }}
      animate={{
        opacity: 1,
        y: [0, 15, 0],
        rotate: [rotate, rotate + 3, rotate],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      className={cn("absolute pointer-events-none", className)}
    >
      <div
        className={cn(
          "rounded-full bg-gradient-to-r to-transparent blur-[80px]",
          gradient
        )}
        style={{ width, height }}
      />
    </motion.div>
  );
}

const fadeUpVariant = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

const HeroGaetano = () => {
  const { openQuizModal } = useQuizModal();

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
      style={{ backgroundColor: "#030d1a" }}
    >
      {/* Background gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.04] via-transparent to-violet-500/[0.04]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(190_90%_50%/0.06)_0%,_transparent_70%)]" />

      {/* Floating shapes */}
      <FloatingShape
        delay={0}
        width={500}
        height={140}
        rotate={-12}
        gradient="from-cyan-500/[0.08]"
        className="top-[15%] left-[-5%]"
      />
      <FloatingShape
        delay={2}
        width={400}
        height={120}
        rotate={20}
        gradient="from-violet-500/[0.08]"
        className="top-[10%] right-[5%]"
      />
      <FloatingShape
        delay={4}
        width={350}
        height={100}
        rotate={-8}
        gradient="from-indigo-500/[0.07]"
        className="bottom-[20%] left-[10%]"
      />
      <FloatingShape
        delay={3}
        width={300}
        height={90}
        rotate={15}
        gradient="from-cyan-500/[0.06]"
        className="bottom-[10%] right-[-3%]"
      />
      <FloatingShape
        delay={5}
        width={250}
        height={80}
        rotate={-20}
        gradient="from-violet-500/[0.06]"
        className="top-[50%] left-[30%]"
      />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="flex flex-col items-start text-left order-2 lg:order-1">
            {/* Badge */}
            <motion.div {...fadeUpVariant(0.1)} className="mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm tracking-widest uppercase font-body">
                ✓ Zertifizierter GoHighLevel Admin
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUpVariant(0.2)}
              className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 leading-[1.1] font-bold"
            >
              <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                Marketing Automation
              </span>
              <br />
              <span className="text-white">Berater für Selbstständige</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              {...fadeUpVariant(0.3)}
              className="font-body text-white/60 text-lg md:text-xl mb-10 max-w-xl leading-relaxed"
            >
              Ich unterstütze dich dabei, Leads, Termine und Follow-ups sauber zu
              organisieren, indem ich dir ein zentrales Marketing-System aufsetze,
              das ohne manuelle Prozesse funktioniert.
            </motion.p>

            {/* CTA */}
            <motion.div {...fadeUpVariant(0.4)} className="flex flex-col items-start">
              <button
                onClick={openQuizModal}
                className="group relative inline-flex items-center justify-center px-6 sm:px-10 py-4 sm:py-5 text-xs sm:text-sm tracking-widest uppercase font-body text-[#030d1a] font-semibold overflow-hidden rounded-sm transition-all duration-300 hover:scale-105 bg-cyan-500 hover:bg-cyan-400"
                style={{
                  boxShadow: "0 0 30px rgba(6, 182, 212, 0.3)",
                }}
              >
                <span className="relative z-10">System-Analyse starten</span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
              <span className="text-white/40 text-xs sm:text-sm font-body mt-3 max-w-[280px] sm:max-w-none">
                Kurz sprechen, Setup verstehen, nächsten Schritt klären
              </span>
            </motion.div>
          </div>

          {/* Right: Photo */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex justify-center order-1 lg:order-2"
          >
            <div className="relative">
              {/* Glow behind photo */}
              <div className="absolute inset-0 rounded-full blur-3xl scale-110 bg-cyan-500/15" />
              <img
                src={portrait}
                alt="Gaetano Ficarra - Zertifizierter GoHighLevel Admin"
                className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px] object-cover object-top rounded-full shadow-2xl"
                style={{
                  boxShadow: "0 0 60px rgba(6, 182, 212, 0.2), 0 0 120px rgba(6, 182, 212, 0.1)",
                  border: "3px solid rgba(6, 182, 212, 0.3)",
                }}
                fetchPriority="high"
              />

              {/* GoHighLevel Badge */}
              <motion.a
                href="https://directory.gohighlevel.com/germany/bielefeld/certified-admins/gaetano-ficarra?from=badge"
                target="_blank"
                rel="noopener noreferrer"
                title="Find me on HighLevel Directory"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-[8%] right-[8%] md:-bottom-[6%] md:right-[10%] hover:scale-110 transition-transform duration-300"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl scale-110" />
                  <img
                    src="https://directory.gohighlevel.com/images/BD_Certified_Admin_Main_Badge.png"
                    alt="GoHighLevel Certified Admin Badge"
                    className="relative w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 drop-shadow-2xl"
                    loading="lazy"
                  />
                </div>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border border-white/20 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-cyan-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroGaetano;
