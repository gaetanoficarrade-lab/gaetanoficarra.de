import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { AlertTriangle, Layers, Clock, Zap, ArrowRight } from "lucide-react";
import { useQuizModal } from "@/context/QuizModalContext";

const problems = [
  {
    icon: Layers,
    title: "Zu viele Tools",
    description:
      "CRM, E-Mail-Tool, Funnel-Builder, Terminbuchung – du zahlst für 10 verschiedene Plattformen und verlierst den Überblick.",
  },
  {
    icon: AlertTriangle,
    title: "Leads gehen verloren",
    description:
      "Ohne System verschwinden Interessenten. Follow-ups werden vergessen, und potenzielle Kunden kaufen bei der Konkurrenz.",
  },
  {
    icon: Clock,
    title: "Stunden an Handarbeit",
    description:
      "Copy-Paste, manuelle E-Mails, ständiges Hin- und Herwechseln. Zeit, die du für dein eigentliches Business verlierst.",
  },
];

const solutions = [
  "Ein System für alles: CRM, Funnels, E-Mails, Termine",
  "Automatische Lead-Nachverfolgung – kein Kunde geht verloren",
  "Zeit sparen durch intelligente Workflows",
  "Voller Überblick über deine Kunden und Prozesse",
];

const ProblemSolution = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { openQuizModal } = useQuizModal();

  return (
    <section className="py-24 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Problem Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-destructive/80 text-sm tracking-widest uppercase font-body">Das Problem</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mt-4 text-foreground">
              Warum dein aktuelles Setup <span className="text-destructive">dich ausbremst</span>
            </h2>
          </motion.div>

          {/* Problems Grid */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-24">
            {problems.map((problem, index) => (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                className="bg-card border border-destructive/20 p-8 rounded-lg text-center hover:border-destructive/40 transition-colors"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-destructive/10 rounded-full mx-auto mb-6">
                  <problem.icon className="w-7 h-7 text-destructive" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-3">{problem.title}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{problem.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Solution Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-gradient-to-br from-card to-primary/5 border border-primary/20 p-10 md:p-14 rounded-lg"
          >
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-primary text-sm tracking-widest uppercase font-body">Die Lösung</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground mb-6">
                  Ein <span className="text-primary">zentrales System</span>, das für dich arbeitet
                </h3>
                <p className="text-muted-foreground text-lg font-body leading-relaxed mb-8">
                  Mit GoHighLevel bekommst du alles in einer Plattform: CRM, E-Mail-Marketing, Funnels, Terminbuchung,
                  Automatisierungen. Als zertifizierter Experte richte ich dein System so ein, dass es von Tag 1
                  funktioniert.
                </p>
                <button
                  onClick={openQuizModal}
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-body text-sm uppercase tracking-widest transition-colors"
                >
                  Jetzt Erstgespräch buchen <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {solutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-4 bg-background/50 p-4 rounded-lg border border-border"
                  >
                    <span className="text-primary text-xl">✓</span>
                    <span className="text-foreground font-body">{solution}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
