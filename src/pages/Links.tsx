import { motion } from "framer-motion";
import { Globe, ExternalLink, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import badge from "@/assets/ghl-badge.png";
import { useBookingModal } from "@/hooks/useBookingModal";

const links = [
  {
    title: "Meine Website",
    description: "Entdecke meine Leistungen und Services",
    url: "/",
    internal: true,
  },
  {
    title: "HighLevel vs Funnelmate",
    description: "Detaillierter Vergleich der beiden Plattformen",
    url: "/highlevel-vs-funnelmate",
    internal: true,
  },
  {
    title: "Funnelmate 14-Tage-Testphase",
    description: "Deutsche All-in-One Lösung testen",
    url: "https://funnelmate.io/?am_id=gaetano",
    internal: false,
  },
  {
    title: "HighLevel 14-Tage-Testphase",
    description: "Internationale All-in-One Lösung testen",
    url: "https://www.gohighlevel.com/14-day-trial?fp_ref=gaetano",
    internal: false,
  },
  {
    title: "Patrick Mentler (Partner)",
    description: "Mein Partner für Marketing & Business",
    url: "https://patrickmentler.de/?am_id=gaetano",
    internal: false,
  },
  {
    title: "Kostenloses Erstgespräch",
    description: "Buche jetzt deinen Termin",
    url: "",
    internal: false,
    highlight: true,
    bookingType: "erstgespraech" as const,
  },
  {
    title: "Support-Call buchen (197€)",
    description: "Schnelle Hilfe bei HighLevel-Fragen",
    url: "",
    internal: false,
    bookingType: "supportCall" as const,
  },
];

const LinksPage = () => {
  const { openBooking } = useBookingModal();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-2xl">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <a
              href="https://directory.gohighlevel.com/germany/bielefeld/certified-admins/gaetano-ficarra?from=badge"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mb-6"
            >
              <img
                src={badge}
                alt="GoHighLevel Certified Admin Badge"
                className="h-32 md:h-40 w-auto mx-auto hover:scale-105 transition-transform duration-300"
              />
            </a>
            <h1 className="font-display text-3xl md:text-4xl text-foreground mb-2">Gaetano Ficarra</h1>
            <p className="text-gradient-primary font-display text-xl md:text-2xl font-semibold">
              Zertifizierter GoHighLevel Admin
            </p>
          </motion.div>

          {/* Links Grid */}
          <div className="space-y-4">
            {links.map((link, index) => (
              <motion.button
                key={link.title}
                onClick={() => {
                  if (link.internal) {
                    window.location.href = link.url;
                  } else if ((link as any).bookingType) {
                    openBooking((link as any).bookingType);
                  } else {
                    window.open(link.url, "_blank", "noopener,noreferrer");
                  }
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`block w-full p-5 rounded-lg border transition-all duration-300 hover:scale-[1.02] text-left ${
                  link.highlight
                    ? "bg-primary/10 border-primary hover:bg-primary/20"
                    : "bg-card border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-display text-lg mb-1 ${link.highlight ? "text-primary" : "text-foreground"}`}>
                      {link.title}
                    </h3>
                    <p className="text-muted-foreground text-sm font-body">{link.description}</p>
                  </div>
                  {link.internal ? (
                    <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <ExternalLink className="w-5 h-5 text-primary flex-shrink-0" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LinksPage;
