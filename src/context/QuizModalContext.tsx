import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface QuizModalContextType {
  openQuizModal: () => void;
  closeQuizModal: () => void;
  isOpen: boolean;
}

const QuizModalContext = createContext<QuizModalContextType | undefined>(undefined);

export const useQuizModal = () => {
  const context = useContext(QuizModalContext);
  if (!context) {
    throw new Error("useQuizModal must be used within a QuizModalProvider");
  }
  return context;
};

// Seitennamen für UTM-Tracking
const getPageName = (pathname: string): string => {
  const pageNames: Record<string, string> = {
    "/": "startseite",
    "/leistungen": "leistungen",
    "/links": "links",
    "/highlevel-vs-funnelmate": "highlevel-vs-funnelmate",
    "/agb": "agb",
    "/datenschutz": "datenschutz",
    "/impressum": "impressum",
  };
  return pageNames[pathname] || pathname.replace("/", "") || "unknown";
};

export const QuizModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const openQuizModal = () => setIsOpen(true);
  const closeQuizModal = () => setIsOpen(false);

  // Survey-URL mit UTM-Parametern
  const pageName = getPageName(location.pathname);
  const surveyBaseUrl = "https://klick.gaetanoficarra.de/widget/survey/ufAnEFvAiokxDgtIy3Kg";
  const surveyUrl = `${surveyBaseUrl}?utm_source=gaetanoficarra.de&utm_medium=website&utm_campaign=${pageName}`;

  // Form-Embed-Skript laden
  useEffect(() => {
    if (isOpen) {
      const script = document.createElement("script");
      script.src = "https://klick.gaetanoficarra.de/js/form_embed.js";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isOpen]);

  // Body-Scroll verhindern
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <QuizModalContext.Provider value={{ openQuizModal, closeQuizModal, isOpen }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeQuizModal}
              className="absolute inset-0 bg-background/90 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={closeQuizModal}
                className="absolute top-4 right-4 z-10 p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted"
                aria-label="Schließen"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Header */}
              <div className="p-6 pb-4 border-b border-border">
                <h2 className="font-display text-2xl text-foreground pr-10">
                  Erzähl mir mehr über dich
                </h2>
                <p className="text-muted-foreground font-body mt-2 text-sm">
                  Beantworte ein paar Fragen, damit ich optimal auf unser Gespräch vorbereitet bin.
                </p>
              </div>

              {/* Survey Iframe */}
              <div className="flex-1 overflow-auto p-6">
                <iframe
                  src={surveyUrl}
                  style={{ width: "100%", minHeight: "500px", border: "none", overflow: "hidden" }}
                  scrolling="no"
                  title="Qualifizierungs-Quiz"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </QuizModalContext.Provider>
  );
};
