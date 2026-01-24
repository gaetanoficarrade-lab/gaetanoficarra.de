import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Layers, AlertTriangle, Clock, TrendingDown, Link2Off, EuroIcon } from "lucide-react";
import systemIntegration from "@/assets/system-integration.jpg";

const problems = [
  {
    icon: Layers,
    title: "Zu viele Tools",
    description:
      "CRM hier, E-Mail-Tool dort, Funnel-Builder woanders. Du zahlst für ein Dutzend Plattformen und keins spricht wirklich mit dem anderen.",
  },
  {
    icon: Link2Off,
    title: "Fehlerhafte Schnittstellen",
    description:
      "Zapier-Zaps, die brechen. Make-Szenarien, die nicht triggern. Du verbringst Stunden damit, herauszufinden, warum deine Automatisierung nicht funktioniert.",
  },
  {
    icon: Clock,
    title: "Manuelle Prozesse",
    description:
      "Listen exportieren, importieren, abgleichen. Kontakte von Hand taggen. Follow-ups manuell verschicken. Jeden Tag die gleichen Routinen.",
  },
  {
    icon: AlertTriangle,
    title: "Fehlende Übersicht",
    description:
      "Wo ist welcher Lead? Wer hat was gekauft? Was wurde schon kontaktiert? Du springst zwischen Tabs und verlierst trotzdem den Überblick.",
  },
  {
    icon: EuroIcon,
    title: "Steigende Softwarekosten",
    description:
      "ActiveCampaign, ClickFunnels, Calendly, Zoom, Kajabi... Jeden Monat gehen Hunderte Euro für Tools drauf, die du nur halb nutzt.",
  },
  {
    icon: TrendingDown,
    title: "Leads gehen verloren",
    description:
      "Ohne ein funktionierendes System verschwinden Interessenten im Nirgendwo. Follow-ups werden vergessen, und potenzielle Kunden kaufen bei anderen.",
  },
];

const Problem = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-destructive/80 text-sm tracking-widest uppercase font-body">Das Problem</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mt-4 text-foreground">
              Warum dein aktuelles Setup{" "}
              <span className="text-gradient-primary">dich ausbremst</span>
            </h2>
            <p className="text-muted-foreground font-body mt-6 max-w-3xl mx-auto text-lg leading-relaxed">
              Du investierst Zeit und Geld in dein Online-Marketing, aber die Ergebnisse bleiben hinter den Erwartungen.
              Die Ursache liegt oft nicht in der Strategie, sondern in der technischen Infrastruktur.
            </p>
          </motion.div>

          {/* Problems Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {problems.map((problem, index) => (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                className="bg-card border border-destructive/20 p-8 rounded-lg hover:border-destructive/40 transition-colors"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-destructive/10 rounded-full mb-6">
                  <problem.icon className="w-7 h-7 text-destructive" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-3">{problem.title}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{problem.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Visual + Closing statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
          >
            <div className="flex-shrink-0">
              <img
                src={systemIntegration}
                alt="Verstreute Tools konsolidieren"
                className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-lg border border-border/50 shadow-lg"
              />
            </div>
            <p className="text-muted-foreground font-body text-lg max-w-2xl text-center lg:text-left">
              Wenn du dich hier wiedererkennst, bist du nicht allein. Das Software-Chaos ist der Alltag für die meisten
              Online-Unternehmer.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
