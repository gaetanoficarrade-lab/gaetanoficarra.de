import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import { Check, ArrowRight, Globe, Users, Shield, Zap, HelpCircle, X } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useQuizModal } from "@/context/QuizModalContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

const detailedComparison = [
  { feature: "Oberfläche auf Deutsch", highlevel: false, funnelmate: true },
  { feature: "Deutscher Support (Chat & Zoom)", highlevel: false, funnelmate: true },
  { feature: "Deutsche Community", highlevel: false, funnelmate: true },
  { feature: "DSGVO-orientierte Konfiguration", highlevel: false, funnelmate: true },
  { feature: "Server-Standort wählbar (EU)", highlevel: false, funnelmate: true },
  { feature: "Alle GoHighLevel-Funktionen", highlevel: true, funnelmate: true },
  { feature: "API-Zugriff & Webhooks", highlevel: true, funnelmate: true },
  { feature: "White-Label / SaaS-Modus", highlevel: true, funnelmate: true },
  { feature: "Marketplace & Snapshots", highlevel: true, funnelmate: true },
  { feature: "Mobile App", highlevel: true, funnelmate: true },
  { feature: "Größte internationale Community", highlevel: true, funnelmate: false },
  { feature: "Preis ab", highlevel: "$97/Mo", funnelmate: "€129/Mo" },
];

const faqs = [
  {
    question: "Ist Funnelmate wirklich dasselbe wie GoHighLevel?",
    answer: "Ja. Funnelmate basiert technisch zu 100% auf GoHighLevel. Es handelt sich um einen sogenannten White-Label-Reseller – das bedeutet, du bekommst exakt dieselbe Software, dieselben Funktionen und dieselbe Infrastruktur. Der Unterschied liegt in der Lokalisierung: deutsche Oberfläche, deutschsprachiger Support, deutsche Community und DSGVO-orientierte Konfiguration."
  },
  {
    question: "Kann ich von GoHighLevel zu Funnelmate wechseln (oder umgekehrt)?",
    answer: "Ja, ein Wechsel ist möglich. Deine Daten (Kontakte, Pipelines, Automationen) können über Snapshots oder die API migriert werden. Der Prozess ist in der Regel innerhalb weniger Tage abgeschlossen. Ich unterstütze dich dabei als zertifizierter Admin."
  },
  {
    question: "Ist Funnelmate DSGVO-konform?",
    answer: "Funnelmate bietet die technischen Voraussetzungen für eine DSGVO-konforme Nutzung: EU-Server-Standorte, AV-Vertrag, verschlüsselte Datenübertragung. Entscheidend ist aber immer auch die korrekte Konfiguration – z.B. Double-Opt-In bei E-Mails, Cookie-Consent, Datenschutzerklärung. Ich achte bei jedem Setup darauf, dass diese Grundlagen stimmen. Rechtliche Beratung ersetzt das nicht."
  },
  {
    question: "Brauche ich einen Experten oder kann ich GoHighLevel selbst einrichten?",
    answer: "Du kannst das System grundsätzlich selbst einrichten. GoHighLevel und Funnelmate bieten Tutorials und eine aktive Community. Allerdings ist die Lernkurve steil: Workflows, Automationen, Pipeline-Logik und Integrationen sind komplex. Ein Experte spart dir Wochen an Einarbeitungszeit und verhindert kostspielige Fehler bei der Einrichtung."
  },
  {
    question: "Was kostet GoHighLevel vs. Funnelmate?",
    answer: "GoHighLevel startet bei $97/Monat (Starter) und geht bis $497/Monat (SaaS Pro). Funnelmate beginnt bei €129/Monat. Beide bieten eine 14-tägige kostenlose Testphase. Für den DACH-Raum empfehle ich Funnelmate, weil der deutsche Support und die DSGVO-Konfiguration den Preisunterschied schnell wettmachen."
  },
  {
    question: "Welche Plattform eignet sich besser für Agenturen?",
    answer: "Beide Plattformen bieten einen SaaS-Modus, mit dem Agenturen eigene Sub-Accounts für Kunden erstellen können. GoHighLevel hat den größeren internationalen Marketplace und mehr englischsprachige Ressourcen. Funnelmate punktet bei Agenturen im DACH-Raum durch deutschen Support und die Möglichkeit, Kunden ein deutschsprachiges Interface zu bieten."
  },
  {
    question: "Kann ich meine bestehenden Tools mit GoHighLevel/Funnelmate verbinden?",
    answer: "Ja. Beide Plattformen bieten eine offene API, Webhooks und native Integrationen (z.B. Stripe, Zoom, Google Calendar, Facebook Ads, WordPress). Über Zapier oder Make lassen sich auch Tools verbinden, die keine native Integration haben. In vielen Fällen ersetzt die Plattform aber deine bestehenden Tools komplett."
  },
];

const HighLevelVsFunnelmate = () => {
  const { openQuizModal } = useQuizModal();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="GoHighLevel vs. Funnelmate 2026 — Der direkte Vergleich"
        description="GoHighLevel oder Funnelmate? Zertifizierter Experte vergleicht Funktionen, Preise & Vorteile für den DACH-Raum. Finde das richtige CRM-Tool."
        breadcrumbs={[
          { name: "Startseite", url: "https://gaetanoficarra.de/" },
          { name: "GoHighLevel vs. Funnelmate", url: "https://gaetanoficarra.de/highlevel-vs-funnelmate" },
        ]}
      
      />
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
                GoHighLevel vs. Funnelmate 2026 — <span className="text-gradient-primary">Der direkte Vergleich</span>
              </h1>
              <p className="text-muted-foreground text-lg font-body">
                Beide Plattformen nutzen die gleiche Technologie – aber welche ist die richtige für dein Business im DACH-Raum? Als zertifizierter GoHighLevel Admin und Funnelmate Experte zeige ich dir die Unterschiede, Kosten und Vorteile.
              </p>
            </motion.div>

            {/* What is GoHighLevel / Funnelmate? */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="max-w-3xl mx-auto mb-20"
            >
              <h2 className="font-display text-3xl text-foreground mb-6">
                Was ist <span className="text-gradient-primary">GoHighLevel</span>?
              </h2>
              <p className="text-muted-foreground font-body text-lg leading-relaxed mb-6">
                GoHighLevel (oft abgekürzt als GHL) ist eine All-in-One Marketing- und Vertriebsplattform aus den USA. Sie wurde speziell für Agenturen und Unternehmer entwickelt und vereint CRM, E-Mail-Marketing, Funnel-Builder, Terminbuchung, Kursplattform, Automatisierungen und vieles mehr in einem einzigen Tool. Statt 5–10 verschiedene Software-Abos zu bezahlen, deckt GoHighLevel alles ab – für einen festen monatlichen Preis.
              </p>
              <p className="text-muted-foreground font-body text-lg leading-relaxed mb-10">
                Die Plattform hat seit 2018 eine enorme Nutzerbasis aufgebaut und wird weltweit von über 1 Million Nutzern eingesetzt. Der Support und die Community sind primär englischsprachig.
              </p>

              <h2 className="font-display text-3xl text-foreground mb-6">
                Was ist <span className="text-gradient-primary">Funnelmate</span>?
              </h2>
              <p className="text-muted-foreground font-body text-lg leading-relaxed mb-6">
                Funnelmate ist ein sogenannter White-Label-Reseller von GoHighLevel – speziell für den deutschsprachigen Markt (Deutschland, Österreich, Schweiz). Das bedeutet: Du bekommst exakt dieselbe Software mit denselben Funktionen, aber mit einer komplett deutschen Oberfläche, deutschsprachigem Support und einer aktiven deutschen Community.
              </p>
              <p className="text-muted-foreground font-body text-lg leading-relaxed">
                Der entscheidende Vorteil für DACH-Unternehmer: Funnelmate bietet DSGVO-orientierte Konfigurationsmöglichkeiten, EU-Server-Standorte und einen AV-Vertrag. Damit fällt eine der größten Hürden für den Einsatz von GoHighLevel im deutschsprachigen Raum weg.
              </p>
            </motion.div>

            {/* Key Insight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card border border-primary/30 p-8 rounded-lg max-w-3xl mx-auto mb-20 text-center"
            >
              <div className="inline-flex items-center gap-2 text-primary mb-3">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wider font-body">Wichtig zu wissen</span>
              </div>
              <p className="text-foreground font-body text-lg leading-relaxed">
                Funnelmate basiert auf GoHighLevel und bietet die gleichen Funktionen – aber mit deutschem Support, deutscher Community und DSGVO-Konformität. Die Technologie ist identisch, der Service ist lokalisiert.
              </p>
            </motion.div>

            {/* Tool Replacement Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-20"
            >
              <h2 className="font-display text-3xl text-center text-foreground mb-4">
                Ein Tool ersetzt <span className="text-gradient-primary">alles</span>
              </h2>
              <p className="text-muted-foreground font-body text-center max-w-2xl mx-auto mb-8">
                Sowohl GoHighLevel als auch Funnelmate ersetzen typischerweise 10+ einzelne Software-Tools. Hier siehst du, welche Einzellösungen du nicht mehr brauchst:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 font-display text-sm uppercase tracking-widest text-primary">Funktion</th>
                      <th className="text-left py-4 px-4 font-display text-sm uppercase tracking-widest text-primary">Typische Alternative</th>
                      <th className="text-left py-4 px-4 font-display text-sm uppercase tracking-widest text-primary">Einzelkosten</th>
                      <th className="text-center py-4 px-4 font-display text-sm uppercase tracking-widest text-primary">All-in-One</th>
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

            {/* Detailed Feature Comparison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-20"
            >
              <h2 className="font-display text-3xl text-center text-foreground mb-4">
                Feature-Vergleich: <span className="text-gradient-primary">GoHighLevel vs. Funnelmate</span>
              </h2>
              <p className="text-muted-foreground font-body text-center max-w-2xl mx-auto mb-8">
                Die technische Basis ist identisch. Die Unterschiede liegen im Service, der Sprache und der DSGVO-Konformität.
              </p>

              <div className="overflow-x-auto max-w-4xl mx-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 font-display text-sm uppercase tracking-widest text-primary">Feature</th>
                      <th className="text-center py-4 px-4 font-display text-sm uppercase tracking-widest text-primary">GoHighLevel</th>
                      <th className="text-center py-4 px-4 font-display text-sm uppercase tracking-widest text-primary">Funnelmate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailedComparison.map((row) => (
                      <tr key={row.feature} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                        <td className="py-4 px-4 font-body text-foreground">{row.feature}</td>
                        <td className="py-4 px-4 text-center">
                          {typeof row.highlevel === "boolean" ? (
                            row.highlevel ? <Check className="w-5 h-5 text-primary mx-auto" /> : <X className="w-5 h-5 text-muted-foreground/50 mx-auto" />
                          ) : (
                            <span className="font-body text-foreground">{row.highlevel}</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center">
                          {typeof row.funnelmate === "boolean" ? (
                            row.funnelmate ? <Check className="w-5 h-5 text-primary mx-auto" /> : <X className="w-5 h-5 text-muted-foreground/50 mx-auto" />
                          ) : (
                            <span className="font-body text-foreground">{row.funnelmate}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Why Funnelmate for DACH */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-20 max-w-3xl mx-auto"
            >
              <h2 className="font-display text-3xl text-foreground mb-6">
                Warum ich Funnelmate für den <span className="text-gradient-primary">DACH-Raum</span> empfehle
              </h2>
              <div className="space-y-6 font-body text-muted-foreground text-lg leading-relaxed">
                <p>
                  Als zertifizierter GoHighLevel Admin arbeite ich täglich mit beiden Plattformen. Für Unternehmer und Agenturen im deutschsprachigen Raum empfehle ich in den meisten Fällen Funnelmate – und zwar aus drei Gründen:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                      <span className="text-primary font-display font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-foreground mb-2">DSGVO ohne Kopfschmerzen</h3>
                      <p>EU-Server-Standorte, AV-Vertrag, und eine Konfiguration, die von Anfang an auf den deutschen Markt ausgerichtet ist. Bei GoHighLevel musst du das alles selbst sicherstellen.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                      <span className="text-primary font-display font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-foreground mb-2">Support auf Deutsch</h3>
                      <p>Wenn du um 10 Uhr morgens ein Problem hast, willst du keine englische E-Mail schreiben und auf US-Geschäftszeiten warten. Funnelmate bietet deutschen Support per Chat und Zoom – in deiner Zeitzone.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                      <span className="text-primary font-display font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-foreground mb-2">Community & Austausch</h3>
                      <p>Die deutsche Funnelmate-Community wächst stark. Du findest Gleichgesinnte, die dieselben Herausforderungen haben: deutsches Recht, deutsche Kunden, deutsche Marktbedingungen. Das ist wertvoller als jede internationale Facebook-Gruppe.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Platform Comparison Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
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
                    <h3 className="font-display text-2xl text-foreground">GoHighLevel</h3>
                  </div>
                  <p className="text-muted-foreground font-body mb-6">
                    Die internationale Originalplattform – ideal für englischsprachige Märkte und Nutzer, die maximale Flexibilität und die größte Community weltweit suchen.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-body text-muted-foreground">Internationale Plattform mit 1M+ Nutzern</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-body text-muted-foreground">Englischer Support (24/7 Chat)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-body text-muted-foreground">Ab $97/Monat (Starter Plan)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-body text-muted-foreground">Größte Community & Marketplace weltweit</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-body text-muted-foreground">Eigenes SaaS aufbauen möglich</span>
                    </li>
                  </ul>
                  <a
                    href="https://www.gohighlevel.com/14-day-trial?fp_ref=gaetano"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-8 text-center py-3 border border-primary text-primary text-sm uppercase tracking-widest font-body hover:bg-primary/10 transition-all duration-300"
                  >
                    14 Tage kostenlos testen
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
                  <p className="text-muted-foreground font-body mb-6">
                    GoHighLevel für den DACH-Raum – mit deutscher Oberfläche, deutschem Support und DSGVO-konformer Infrastruktur. Perfekt für deutschsprachige Unternehmer.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-body text-muted-foreground">Komplett deutsche Oberfläche</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-body text-muted-foreground">Deutscher Support (Zoom & Chat)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-body text-muted-foreground">Ab €129/Monat inkl. DSGVO-Setup</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-body text-muted-foreground">DSGVO-konform mit EU-Servern</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-body text-muted-foreground">Wachsende deutsche Community</span>
                    </li>
                  </ul>
                  <a
                    href="https://funnelmate.io/?am_id=gaetano"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-8 text-center py-3 bg-primary text-primary-foreground text-sm uppercase tracking-widest font-body hover:bg-primary/90 transition-all duration-300"
                  >
                    14 Tage kostenlos testen
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Use Cases */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-20 max-w-3xl mx-auto"
            >
              <h2 className="font-display text-3xl text-foreground mb-6">
                Für wen eignet sich welche <span className="text-gradient-primary">Plattform</span>?
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card border border-border p-6 rounded-lg">
                  <h3 className="font-display text-xl text-foreground mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" /> GoHighLevel passt zu dir, wenn…
                  </h3>
                  <ul className="space-y-3 font-body text-muted-foreground">
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" /><span>Du international arbeitest und englischsprachige Kunden hast</span></li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" /><span>Du ein eigenes SaaS auf Basis von GoHighLevel aufbauen willst</span></li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" /><span>Du den günstigsten Einstiegspreis suchst ($97 vs. €129)</span></li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" /><span>Du dich in englischsprachigen Communities wohlfühlst</span></li>
                  </ul>
                </div>
                <div className="bg-card border border-primary/30 p-6 rounded-lg">
                  <h3 className="font-display text-xl text-foreground mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" /> Funnelmate passt zu dir, wenn…
                  </h3>
                  <ul className="space-y-3 font-body text-muted-foreground">
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" /><span>Deine Kunden im DACH-Raum sind</span></li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" /><span>DSGVO-Konformität für dich wichtig ist</span></li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" /><span>Du deutschen Support und eine deutsche Community willst</span></li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" /><span>Du oder dein Team nicht fließend Englisch sprechen</span></li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-20 max-w-3xl mx-auto"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 text-primary mb-3">
                  <HelpCircle className="w-5 h-5" />
                  <span className="text-sm font-medium uppercase tracking-wider font-body">FAQ</span>
                </div>
                <h2 className="font-display text-3xl text-foreground">
                  Häufige Fragen zu <span className="text-gradient-primary">GoHighLevel & Funnelmate</span>
                </h2>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`} className="border-border/50">
                    <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-6 text-base md:text-lg font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6 font-body">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
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
                Nicht sicher, welche Plattform die <span className="text-gradient-primary">richtige</span> für dich ist?
              </h2>
              <p className="text-muted-foreground font-body mb-8 max-w-xl mx-auto text-lg">
                In einem kostenlosen Erstgespräch analysiere ich deine aktuelle Situation und empfehle dir die passende Lösung – unverbindlich und ehrlich.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={openQuizModal}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm tracking-widest uppercase font-body hover:bg-primary/90 transition-all duration-300"
                >
                  Kostenloses Erstgespräch <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HighLevelVsFunnelmate;
