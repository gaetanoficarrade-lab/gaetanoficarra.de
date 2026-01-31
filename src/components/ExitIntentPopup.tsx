import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, CheckCircle, ArrowRight } from "lucide-react";
import funnelGuidePreview from "@/assets/funnel-guide-preview.png";

const ExitIntentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  const handleExitIntent = useCallback((e: MouseEvent) => {
    // Nur triggern wenn Maus nach oben verlässt (y < 10) und noch nicht gezeigt wurde
    if (e.clientY < 10 && !hasShown) {
      // Check localStorage ob schon mal gezeigt wurde (in dieser Session)
      const alreadyShown = sessionStorage.getItem("exitIntentShown");
      if (!alreadyShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem("exitIntentShown", "true");
      }
    }
  }, [hasShown]);

  useEffect(() => {
    // Kurze Verzögerung bevor Exit-Intent aktiv wird (3 Sekunden)
    const timer = setTimeout(() => {
      document.addEventListener("mouseout", handleExitIntent);
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseout", handleExitIntent);
    };
  }, [handleExitIntent]);

  // Body-Scroll verhindern wenn Popup offen
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const closePopup = () => setIsOpen(false);

  const features = [
    "Funnel-Plan in 15 Minuten",
    "KI-gestützte Textgenerierung",
    "Fertige Checklisten & Templates"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop mit Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Popup Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] border border-white/10 shadow-2xl"
          >
            {/* Gradient Accent Top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
            
            {/* Glow Effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />

            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
            >
              <X className="w-5 h-5 text-white/60" />
            </button>

            {/* Content */}
            <div className="relative p-6 md:p-8">
              {/* Badge */}
              <div className="text-center mb-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-white/80">
                    Bevor du gehst...
                  </span>
                </div>
              </div>

              {/* Headline */}
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">
                Kennst du schon den{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Funnel Guide
                </span>
                ?
              </h2>

              {/* Subheadline */}
              <p className="text-white/60 text-center mb-5 max-w-md mx-auto">
                Erstelle deinen kompletten Funnel-Plan in nur 15 Minuten – mit KI-Power.
              </p>

              {/* Preview Image */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative mb-5 rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/20"
              >
                <img 
                  src={funnelGuidePreview} 
                  alt="Funnel Guide Tool Preview" 
                  className="w-full h-auto"
                />
                {/* Gradient Overlay unten */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#16213e] to-transparent" />
              </motion.div>

              {/* Features - horizontal on desktop */}
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-2 text-white/80 text-sm"
                  >
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <motion.a
                  href="https://funnelguide.funnelmate-experte.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold text-lg shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-shadow"
                >
                  Kostenlos ausprobieren
                  <ArrowRight className="w-5 h-5" />
                </motion.a>

                {/* Secondary Text */}
                <p className="text-white/40 text-sm mt-3">
                  100% kostenlos • Keine Kreditkarte nötig
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
