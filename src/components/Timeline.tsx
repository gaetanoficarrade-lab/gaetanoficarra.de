import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, ClipboardCheck, Rocket, Headphones } from "lucide-react";
import { useQuizModal } from "@/context/QuizModalContext";

const steps = [
  {
    icon: MessageCircle,
    step: "01",
    title: "Erstgespräch",
    description: "Wir sprechen über deine Situation, Ziele und Herausforderungen. Kein Verkaufsdruck, nur Klarheit.",
  },
  {
    icon: ClipboardCheck,
    step: "02",
    title: "Analyse & Planung",
    description: "Ich analysiere deine bestehenden Tools und erstelle einen konkreten Plan für dein neues System.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Einrichtung & Migration",
    description: "Dein Funnelmate-System wird aufgebaut, bestehende Daten migriert und alles konfiguriert.",
  },
  {
    icon: Headphones,
    step: "04",
    title: "Go-Live & Support",
    description: "Dein System geht live. Du bekommst eine Einweisung und laufenden Support für Fragen.",
  },
];

const Timeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { openQuizModal } = useQuizModal();

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm tracking-widest uppercase font-body">Der Ablauf</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mt-4 text-foreground">
              So kommen wir <span className="text-primary">zusammen</span>
            </h2>
            <p className="text-muted-foreground font-body mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
              Vier klare Schritte von der ersten Anfrage bis zum laufenden System
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line - visible on desktop */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

            {/* Steps */}
            <div className="space-y-12 lg:space-y-0">
              {steps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 * (index + 1) }}
                  className={`relative lg:flex lg:items-center lg:gap-8 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content Card */}
                  <div className={`lg:w-[calc(50%-40px)] ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-card border border-border p-6 md:p-8 rounded-lg hover:border-primary/30 transition-colors"
                    >
                      <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? "lg:flex-row-reverse" : ""}`}>
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <step.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className={index % 2 === 0 ? "lg:text-right" : ""}>
                          <span className="text-primary text-xs tracking-widest uppercase font-body">
                            Schritt {step.step}
                          </span>
                          <h3 className="font-display text-xl text-foreground">{step.title}</h3>
                        </div>
                      </div>
                      <p
                        className={`text-muted-foreground font-body leading-relaxed ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}
                      >
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Center dot - visible on desktop */}
                  <div className="hidden lg:flex items-center justify-center w-20 flex-shrink-0">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.2 * (index + 1) }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-md scale-150" />
                      <div className="w-4 h-4 bg-primary rounded-full relative z-10" />
                    </motion.div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden lg:block lg:w-[calc(50%-40px)]" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-16"
          >
            <button
              onClick={openQuizModal}
              className="inline-flex items-center justify-center px-8 py-4 text-sm tracking-widest uppercase font-body text-primary-foreground bg-primary hover:bg-primary/90 rounded-sm transition-all duration-300 hover:scale-105"
              style={{
                boxShadow: "0 0 20px hsl(var(--primary) / 0.3)",
              }}
            >
              Jetzt Erstgespräch vereinbaren
            </button>
            <p className="text-muted-foreground text-sm font-body mt-4">
              Kurz sprechen, Setup verstehen, nächsten Schritt klären
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
