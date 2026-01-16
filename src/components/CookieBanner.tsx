import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Link } from "react-router-dom";

type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
};

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
    marketing: false,
    timestamp: 0,
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem("cookie-consent");
    if (savedConsent) {
      const parsed = JSON.parse(savedConsent) as CookieConsent;
      // Check if consent is older than 365 days
      const oneYear = 365 * 24 * 60 * 60 * 1000;
      if (Date.now() - parsed.timestamp < oneYear) {
        setConsent(parsed);
        applyConsent(parsed);
        return;
      }
    }
    // Show banner after a short delay
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const applyConsent = (newConsent: CookieConsent) => {
    // Enable/disable CookieYes categories
    if (typeof window !== "undefined" && (window as unknown as { cookieyes?: { consent?: { update: (categories: Record<string, boolean>) => void } } }).cookieyes?.consent?.update) {
      (window as unknown as { cookieyes: { consent: { update: (categories: Record<string, boolean>) => void } } }).cookieyes.consent.update({
        analytics: newConsent.analytics,
        advertisement: newConsent.marketing,
      });
    }
  };

  const saveConsent = (newConsent: CookieConsent) => {
    const consentWithTimestamp = { ...newConsent, timestamp: Date.now() };
    localStorage.setItem("cookie-consent", JSON.stringify(consentWithTimestamp));
    setConsent(consentWithTimestamp);
    applyConsent(consentWithTimestamp);
    setIsVisible(false);
  };

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
    });
  };

  const acceptSelected = () => {
    saveConsent(consent);
  };

  const rejectAll = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-card border border-border rounded-lg shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-6 pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Cookie className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display text-xl text-foreground">Cookie-Einstellungen</h3>
                </div>
                <button
                  onClick={rejectAll}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Ablehnen und schließen"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-muted-foreground font-body text-sm mt-4 leading-relaxed">
                Wir verwenden Cookies, um dein Erlebnis auf unserer Website zu verbessern. 
                Einige sind notwendig für die Funktion der Website, andere helfen uns, 
                die Website zu analysieren und zu optimieren.{" "}
                <Link to="/datenschutz" className="text-primary hover:underline">
                  Mehr erfahren
                </Link>
              </p>
            </div>

            {/* Details */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-border overflow-hidden"
                >
                  <div className="p-6 space-y-4">
                    {/* Necessary */}
                    <label className="flex items-start gap-4 cursor-not-allowed">
                      <input
                        type="checkbox"
                        checked={true}
                        disabled
                        className="mt-1 w-4 h-4 accent-primary"
                      />
                      <div>
                        <div className="font-body font-medium text-foreground">
                          Notwendig
                          <span className="ml-2 text-xs text-muted-foreground">(immer aktiv)</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Diese Cookies sind für die Grundfunktionen der Website erforderlich.
                        </p>
                      </div>
                    </label>

                    {/* Analytics */}
                    <label className="flex items-start gap-4 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consent.analytics}
                        onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
                        className="mt-1 w-4 h-4 accent-primary cursor-pointer"
                      />
                      <div>
                        <div className="font-body font-medium text-foreground">Analyse</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Helfen uns zu verstehen, wie Besucher mit der Website interagieren (z.B. Google Analytics).
                        </p>
                      </div>
                    </label>

                    {/* Marketing */}
                    <label className="flex items-start gap-4 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consent.marketing}
                        onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
                        className="mt-1 w-4 h-4 accent-primary cursor-pointer"
                      />
                      <div>
                        <div className="font-body font-medium text-foreground">Marketing</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Werden verwendet, um Werbung relevanter für dich zu gestalten.
                        </p>
                      </div>
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="p-6 pt-4 border-t border-border flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="px-4 py-2.5 text-sm font-body text-muted-foreground hover:text-foreground border border-border rounded-sm transition-colors"
              >
                {showDetails ? "Weniger anzeigen" : "Einstellungen"}
              </button>
              
              <div className="flex-1 flex flex-col sm:flex-row gap-3 sm:justify-end">
                <button
                  onClick={rejectAll}
                  className="px-4 py-2.5 text-sm font-body text-muted-foreground hover:text-foreground border border-border rounded-sm transition-colors"
                >
                  Nur Notwendige
                </button>
                
                {showDetails && (
                  <button
                    onClick={acceptSelected}
                    className="px-4 py-2.5 text-sm font-body bg-muted text-foreground rounded-sm hover:bg-muted/80 transition-colors"
                  >
                    Auswahl speichern
                  </button>
                )}
                
                <button
                  onClick={acceptAll}
                  className="px-6 py-2.5 text-sm font-body bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors"
                >
                  Alle akzeptieren
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
