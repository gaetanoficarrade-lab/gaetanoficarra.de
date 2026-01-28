import { motion } from "framer-motion";
import { Check, ArrowRight, Globe, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useQuizModal } from "@/context/QuizModalContext";

const comparisonData = [
  { feature: "CRM & Pipeline Management", alternative: "HubSpot / Pipedrive", cost: "~50€/Mo" },
  { feature: "E-Mail Marketing", alternative: "ActiveCampaign / Mailchimp", cost: "~30€/Mo" },
  { feature: "Funnel & Landing Pages", alternative: "ClickFunnels", cost: "~127€/Mo" },
  { feature: "Terminbuchung", alternative: "Calendly", cost: "~12€/Mo" },
  { feature: "Kursplattform", alternative: "Kajabi / Elopage", cost: "~79€/Mo" },
  { feature: "Social Media Planner", alternative: "Later / Buffer", cost: "~18€/Mo" },
  { feature: "Automatisierungen", alternative: "Zapier / Make", cost: "~30€/Mo" },
  { feature: "Webseiten Builder", alternative: "Webflow / Wix", cost: "~25€/Mo" },
  { feature: "Chat & Messaging", alternative: "ManyChat / Intercom", cost: "~49€/Mo" },
  { feature: "Bewertungen & Reputation", alternative: "Trustpilot / ProvenExpert", cost: "~30€/Mo" },
];

const HighLevelVsFunnelmate = () => {
  const { openQuizModal } = useQuizModal();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
                <span className="text-gradient-primary">HighLevel</span> vs{" "}
                <span className="text-gradient-primary">Funnelmate</span>
              </h1>
              <p className="text-muted-foreground text-lg font-body">
                Beide Plattformen nutzen die gleiche Technologie – aber welche ist die richtige für dich?
              </p>
            </motion.div>

            {/* Key Insight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card border border-primary/30 p-8 rounded-lg max-w-3xl mx-auto mb-20 text-center"
            >
              <p className="text-foreground font-body text-lg leading-relaxed">
                <span className="text-primary font-display">Wichtig zu wissen:</span> Funnelmate basiert auf HighLevel
                und bietet die gleichen Funktionen – aber mit deutschem Support, deutscher Community und
                DSGVO-Konformität.
              </p>
            </motion.div>

            {/* Tool Replacement Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-20"
            >
              <h2 className="font-display text-3xl text-center text-foreground mb-8">
                Ein Tool ersetzt <span className="text-gradient-primary">alles</span>
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 font-display text-sm uppercase tracking-widest text-primary">
                        Funktion
                      </th>
                      <th className="text-left py-4 px-4 font-display text-sm uppercase tracking-widest text-primary">
                        Typische Alternative
                      </th>
                      <th className="text-left py-4 px-4 font-display text-sm uppercase tracking-widest text-primary">
                        Einzelkosten
                      </th>
                      <th className="text-center py-4 px-4 font-display text-sm uppercase tracking-widest text-primary">
                        All-in-One
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row) => (
                      <tr key={row.feature} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                        <td className="py-4 px-4 font-body text-foreground">{row.feature}</td>
                        <td className="py-4 px-4 font-body text-muted-foreground">{row.alternative}</td>
                        <td className="py-4 px-4 font-body text-muted-foreground">{row.cost}</td>
                        <td className="py-4 px-4 text-center">
                          <Check className="w-5 h-5 text-primary mx-auto" />
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-card">
                      <td className="py-4 px-4 font-display text-foreground">Gesamt pro Monat</td>
                      <td className="py-4 px-4"></td>
                      <td className="py-4 px-4 font-display text-xl text-muted-foreground line-through">~450€</td>
                      <td className="py-4 px-4 text-center font-display text-xl text-primary">ab 97€</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Platform Comparison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-20"
            >
              <h2 className="font-display text-3xl text-center text-foreground mb-8">
                Direkt-<span className="text-gradient-primary">Vergleich</span>
              </h2>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* HighLevel Card */}
                <div className="bg-card border border-border p-8 rounded-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <Globe className="w-8 h-8 text-primary" />
                    <h3 className="font-display text-2xl text-foreground">HighLevel</h3>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-body text-muted-foreground">Internationale Plattform</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-body text-muted-foreground">Englischer Support</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-body text-muted-foreground">Ab $97/Monat</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-body text-muted-foreground">Größte Community weltweit</span>
                    </li>
                  </ul>
                  <a
                    href="https://www.gohighlevel.com/14-day-trial?fp_ref=gaetano"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-8 text-center py-3 border border-primary text-primary text-sm uppercase tracking-widest font-body hover:bg-primary/10 transition-all duration-300"
                  >
                    14 Tage testen
                  </a>
                </div>

                {/* Funnelmate Card */}
                <div className="bg-card border border-primary p-8 rounded-lg relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 text-xs uppercase tracking-widest font-body rounded-full">
                    Empfehlung für DACH
                  </div>
                  <div className="flex items-center gap-3 mb-6">
                    <Users className="w-8 h-8 text-primary" />
                    <h3 className="font-display text-2xl text-foreground">Funnelmate</h3>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-body text-muted-foreground">Komplett auf Deutsch</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-body text-muted-foreground">Deutscher Support (Zoom/Chat)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-body text-muted-foreground">Ab €129/Monat</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-body text-muted-foreground">DSGVO-konform</span>
                    </li>
                  </ul>
                  <a
                    href="https://funnelmate.io/?am_id=gaetano"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-8 text-center py-3 bg-primary text-primary-foreground text-sm uppercase tracking-widest font-body hover:bg-primary/90 transition-all duration-300"
                  >
                    14 Tage testen
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-card border-t border-border">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
                Nicht sicher, was das Richtige für dich ist?
              </h2>
              <p className="text-muted-foreground font-body mb-8 max-w-xl mx-auto">
                In einem kostenlosen Erstgespräch finden wir gemeinsam heraus, welche Plattform am besten zu deinen
                Anforderungen passt.
              </p>
              <button
                onClick={openQuizModal}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm tracking-widest uppercase font-body hover:bg-primary/90 transition-all duration-300"
              >
                Kostenloses Erstgespräch <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HighLevelVsFunnelmate;
