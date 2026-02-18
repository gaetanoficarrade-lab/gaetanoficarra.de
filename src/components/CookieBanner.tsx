import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Cookie } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

const COOKIE_CONSENT_KEY = 'cookie_consent';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
    marketing: false,
    timestamp: '',
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!savedConsent) {
      // Small delay to avoid flash on page load
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (newConsent: CookieConsent) => {
    const consentWithTimestamp = {
      ...newConsent,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentWithTimestamp));
    setIsVisible(false);

    // Update Google Analytics consent
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: newConsent.analytics ? 'granted' : 'denied',
        ad_storage: newConsent.marketing ? 'granted' : 'denied',
        ad_user_data: newConsent.marketing ? 'granted' : 'denied',
        ad_personalization: newConsent.marketing ? 'granted' : 'denied',
      });
    }
  };

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: '',
    });
  };

  const acceptNecessary = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: '',
    });
  };

  const saveSelection = () => {
    saveConsent(consent);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      >
        <div className="max-w-4xl mx-auto bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 flex-shrink-0">
                <Cookie className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  🍪 Cookie-Einstellungen
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Wir nutzen Cookies, um dir die bestmögliche Erfahrung auf unserer Website zu bieten. 
                  Du kannst selbst entscheiden, welche Cookies du zulassen möchtest.
                </p>

                <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-3 mb-4 overflow-hidden"
                    >
                      <label className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 cursor-not-allowed">
                        <input
                          type="checkbox"
                          checked={true}
                          disabled
                          className="w-4 h-4 rounded accent-primary"
                        />
                        <div>
                          <span className="text-sm font-medium text-foreground">Notwendige Cookies</span>
                          <p className="text-xs text-muted-foreground">Erforderlich für die Grundfunktionen der Website</p>
                        </div>
                      </label>
                      
                      <label className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted transition-colors">
                        <input
                          type="checkbox"
                          checked={consent.analytics}
                          onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
                          className="w-4 h-4 rounded accent-primary"
                        />
                        <div>
                          <span className="text-sm font-medium text-foreground">Analyse-Cookies</span>
                          <p className="text-xs text-muted-foreground">Helfen uns zu verstehen, wie Besucher die Website nutzen</p>
                        </div>
                      </label>
                      
                      <label className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted transition-colors">
                        <input
                          type="checkbox"
                          checked={consent.marketing}
                          onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
                          className="w-4 h-4 rounded accent-primary"
                        />
                        <div>
                          <span className="text-sm font-medium text-foreground">Marketing-Cookies</span>
                          <p className="text-xs text-muted-foreground">Werden verwendet, um Werbung relevanter zu gestalten</p>
                        </div>
                      </label>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    onClick={acceptAll}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Alle akzeptieren
                  </Button>
                  <Button
                    onClick={acceptNecessary}
                    variant="outline"
                    className="flex-1"
                  >
                    Nur notwendige
                  </Button>
                  {showDetails ? (
                    <Button
                      onClick={saveSelection}
                      variant="secondary"
                      className="flex-1"
                    >
                      Auswahl speichern
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setShowDetails(true)}
                      variant="ghost"
                      className="flex-1 text-muted-foreground hover:text-foreground"
                    >
                      Einstellungen
                    </Button>
                  )}
                </div>

                <p className="text-xs text-muted-foreground mt-3">
                  Mehr Informationen findest du in unserer{' '}
                  <a href="/datenschutz" className="text-primary hover:underline">
                    Datenschutzerklärung
                  </a>
                </p>
              </div>
              
              <button
                onClick={acceptNecessary}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Schließen"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default CookieBanner;
