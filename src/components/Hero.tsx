import { motion } from "framer-motion";
import portrait from "@/assets/gaetano-portrait.jpg";
import { useQuizModal } from "@/context/QuizModalContext";

const Hero = () => {
  const { openQuizModal } = useQuizModal();

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20"></div>

      {/* Floating Orbs */}
      <div className="absolute -top-20 -left-20 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[radial-gradient(circle,_hsl(var(--primary)/0.08)_0%,_transparent_70%)] rounded-full animate-orb-float pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-[radial-gradient(circle,_hsl(var(--accent)/0.06)_0%,_transparent_70%)] rounded-full animate-orb-float-reverse pointer-events-none"></div>

      {/* Hero Shimmer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-primary/[0.04] animate-shimmer-hero-fast"></div>
        <div className="absolute top-0 bottom-0 left-0 w-2/3 bg-primary/[0.03] animate-shimmer-hero-slow"></div>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(190_90%_50%/0.08)_0%,_transparent_70%)] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start text-left order-2 lg:order-1"
          >
            {/* Certified Expert Badge Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm tracking-widest uppercase font-body">
                ✓ Zertifizierter GoHighLevel Admin
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-[1.15]"
            >
              <span className="text-gradient-primary">Marketing Automation Berater für Coaches, Berater & Dienstleister</span> — mehr Zeit, weniger Chaos
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-body text-muted-foreground text-lg md:text-xl mb-10 max-w-xl leading-relaxed"
            >
              Ich unterstütze dich dabei, Leads, Termine und Follow-ups sauber zu organisieren, indem ich dir ein zentrales
              Marketing-System aufsetze, das ohne manuelle Prozesse funktioniert.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <div className="flex flex-col items-start sm:items-start">
                <button
                  onClick={openQuizModal}
                  className="group relative inline-flex items-center justify-center px-6 sm:px-10 py-4 sm:py-5 text-xs sm:text-sm tracking-widest uppercase font-body text-primary-foreground overflow-hidden rounded-md transition-all duration-300 hover:scale-105 bg-primary hover:bg-primary/90"
                  style={{
                    boxShadow: "0 0 30px hsl(var(--primary) / 0.25)",
                  }}
                >
                  <span className="relative z-10">System-Analyse starten</span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
                <span className="text-muted-foreground text-xs sm:text-sm font-body mt-3 max-w-[280px] sm:max-w-none">
                  Kurz sprechen, Setup verstehen, nächsten Schritt klären
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Portrait Image with Badge Overlay */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center order-1 lg:order-2"
          >
            <div className="relative">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-secondary/10 rounded-full blur-3xl scale-110" />
              <img
                src={portrait}
                alt="Gaetano Ficarra - Zertifizierter GoHighLevel Admin"
                className="relative w-80 h-80 md:w-[420px] md:h-[420px] lg:w-[500px] lg:h-[500px] object-cover object-top rounded-full border-4 border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.1)] animate-glow-pulse"
                width={500}
                height={500}
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
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-110" />
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
          className="w-6 h-10 border border-muted-foreground/30 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
