import { motion } from "framer-motion";
import {
  CheckCircle,
  Settings,
  Users,
  Headphones,
  TrendingUp,
  Zap,
  Repeat,
  ArrowRight,
  Building2,
  Clock,
  Shield,
  Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useQuizModal } from "@/context/QuizModalContext";

const mainServices = [
  {
    icon: Settings,
    title: "Komplett-Setup",
    subtitle: "Ich mache alles für dich",
    description:
      "Ich baue dir dein komplettes System: Leads, Termine, Follow-ups, Automationen. Du lehnst dich zurück und bekommst alles startklar übergeben.",
    features: [
      "Komplette GoHighLevel Einrichtung von A bis Z",
      "Funnels, Landingpages & Webseiten",
      "CRM-Setup mit Pipeline-Management",
      "E-Mail-Sequenzen & SMS-Automationen",
      "Terminbuchung & Kalender-Integration",
      "Integrationen mit deinen bestehenden Tools",
      "Individuelle Schulung zur Nutzung",
      "30 Tage Support nach Projektabschluss",
    ],
    benefits: [
      { icon: Clock, text: "Du arbeitest mit einem vollständig eingerichteten System" },
      { icon: Shield, text: "Routineaufgaben laufen im Hintergrund" },
      { icon: Sparkles, text: "Technikfragen spielen im Alltag keine Rolle mehr" },
    ],
    cta: "System-Analyse starten",
    ctaType: "erstgespraech" as const,
    popular: true,
    price: "Auf Anfrage",
    priceNote: "Individuell nach Projektumfang",
  },
  {
    icon: Users,
    title: "Gemeinsam aufbauen",
    subtitle: "Wir bauen es zusammen",
    description:
      "Du arbeitest aktiv an deinem System, während ich dich strategisch und technisch begleite. Du bekommst klare Aufgaben und Umsetzungs-Schritte, setzt sie in deinem Tempo um und ich prüfe die Ergebnisse, bevor wir den nächsten Schritt gehen.",
    features: [
      "Live Zusammenarbeit per Video-Call",
      "Du lernst während wir bauen",
      "Alle deine Fragen werden direkt beantwortet",
      "Alles wird vollständig eingerichtet",
      "Mehrere Sessions nach Bedarf",
      "Aufnahmen aller Sessions zum Nachschauen",
      "60 Tage Support nach Projektabschluss",
    ],
    benefits: [
      { icon: Clock, text: "Du verstehst, wie dein System funktioniert" },
      { icon: Shield, text: "Änderungen kannst du sicher einschätzen" },
      { icon: Sparkles, text: "Alle Abläufe sind dokumentiert und nachvollziehbar" },
    ],
    cta: "System-Analyse starten",
    ctaType: "erstgespraech" as const,
    popular: false,
    price: "Auf Anfrage",
    priceNote: "Nach Anzahl der Sessions",
  },
  {
    icon: Headphones,
    title: "Support-Call",
    subtitle: "Schnelle Hilfe bei Problemen",
    description:
      "Du hast eine spezifische Frage oder steckst fest? In einem 1:1 Call lösen wir dein Problem schnell und unkompliziert.",
    features: [
      "1:1 Video-Call mit Bildschirmfreigabe",
      "Problemlösung in Echtzeit",
      "Technische Fragen werden beantwortet",
      "Strategische Tipps für dein Setup",
      "Aufnahme des Calls inklusive",
      "Nachbereitung per E-Mail",
    ],
    benefits: [
      { icon: Clock, text: "Du bekommst eine klare Antwort auf dein konkretes Problem" },
      { icon: Shield, text: "Lösungen statt langem Suchen" },
      { icon: Sparkles, text: "Direkte Umsetzung im Call" },
    ],
    cta: "Call buchen",
    ctaType: "support" as const,
    popular: false,
    price: "197€",
    priceNote: "Pro Stunde",
  },
];

const additionalServices = [
  {
    icon: TrendingUp,
    title: "Strategieberatung",
    description:
      "Du weißt nicht, wo du anfangen sollst? Gemeinsam entwickeln wir eine Strategie, wie du das Maximum aus HighLevel herausholst und dein Marketing auf das nächste Level bringst.",
  },
  {
    icon: Zap,
    title: "Automation & Workflows",
    description:
      "Automatisiere deine Prozesse und spare wertvolle Zeit. Ich erstelle intelligente Workflows, die für dich arbeiten – von Lead-Nurturing bis zur Kundenbindung.",
  },
  {
    icon: Repeat,
    title: "Migration & Umzug",
    description:
      "Du wechselst von einem anderen Tool zu HighLevel? Ich übertrage deine Funnels, Kontakte und Daten sauber und reibungslos – ohne Datenchaos oder Ausfallzeiten.",
  },
  {
    icon: Building2,
    title: "SaaS-Partner Support",
    description:
      "Du bist SaaS-Anbieter mit HighLevel als Basis? Ich übernehme Q&A-Calls, technischen Support und Troubleshooting für deine Endkunden – professionell und zuverlässig.",
  },
];

const Leistungen = () => {
  const { openQuizModal } = useQuizModal();

  const handleCTAClick = (ctaType: "erstgespraech" | "support") => {
    if (ctaType === "erstgespraech") {
      openQuizModal();
    } else {
      window.open("https://lp.gaetanoficarra.de/support_call", "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <span className="text-primary text-sm tracking-widest uppercase font-body">Leistungen</span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mt-4 mb-6">
                Wähle die <span className="text-gradient-primary">passende Option</span> für dich
              </h1>
              <p className="text-muted-foreground text-lg font-body">
                Ob du alles abgeben, gemeinsam lernen oder schnelle Hilfe brauchst – ich habe das richtige Angebot für
                dich.
              </p>
            </motion.div>

            {/* Main Services - Detailed Cards */}
            <div className="space-y-12 max-w-5xl mx-auto mb-24">
              {mainServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative bg-card border rounded-xl overflow-hidden ${
                    service.popular ? "border-primary" : "border-border"
                  }`}
                >
                  {service.popular && (
                    <div className="bg-primary text-primary-foreground text-center py-2 text-xs uppercase tracking-widest font-body">
                      Meistgebucht
                    </div>
                  )}

                  <div className="p-8 md:p-12">
                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
                      {/* Left Column - Info */}
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
                            <service.icon className="w-7 h-7 text-primary" />
                          </div>
                          <div>
                            <h2 className="font-display text-2xl md:text-3xl text-foreground">{service.title}</h2>
                            <p className="text-primary text-sm font-body">{service.subtitle}</p>
                          </div>
                        </div>

                        <p className="text-muted-foreground font-body text-lg leading-relaxed mb-8">
                          {service.description}
                        </p>

                        {/* Benefits */}
                        <div className="space-y-4 mb-8">
                          {service.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <benefit.icon className="w-5 h-5 text-primary" />
                              <span className="text-foreground font-body">{benefit.text}</span>
                            </div>
                          ))}
                        </div>

                        {/* Price & CTA */}
                        <div className="flex flex-wrap items-center gap-6">
                          <div>
                            <p className="font-display text-3xl text-primary">{service.price}</p>
                            <p className="text-muted-foreground text-sm font-body">{service.priceNote}</p>
                          </div>
                          <button
                            onClick={() => handleCTAClick(service.ctaType)}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-sm tracking-widest uppercase font-body hover:bg-primary/90 transition-all duration-300 rounded-sm"
                          >
                            {service.cta} <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Right Column - Features */}
                      <div className="bg-muted/30 rounded-lg p-6 md:p-8">
                        <h3 className="font-display text-lg text-foreground mb-6">Was du bekommst:</h3>
                        <ul className="space-y-4">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm font-body text-muted-foreground">
                              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-primary text-sm tracking-widest uppercase font-body">Weitere Services</span>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mt-4">
                Das biete ich <span className="text-gradient-primary">außerdem</span> an
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {additionalServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-card border border-border p-6 rounded-lg hover:border-primary/50 transition-colors duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{service.description}</p>
                </motion.div>
              ))}
            </div>
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
              className="max-w-2xl mx-auto"
            >
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
                Nicht sicher, was zu dir passt?
              </h2>
              <p className="text-muted-foreground font-body mb-8 text-lg">
                Kein Problem. In einem kostenlosen Erstgespräch finden wir gemeinsam heraus, welche Option für deine
                Situation am besten geeignet ist.
              </p>
              <button
                onClick={openQuizModal}
                className="inline-flex items-center gap-2 px-10 py-5 text-sm tracking-widest uppercase font-body text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 rounded-sm"
                style={{
                  boxShadow: "0 0 30px hsl(var(--primary) / 0.3)",
                }}
              >
                System-Analyse starten <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Leistungen;
