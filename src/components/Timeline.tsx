import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, ClipboardCheck, Rocket, Headphones } from "lucide-react";
import { useQuizModal } from "@/context/QuizModalContext";
import solutionBg from "@/assets/solution-bg.jpg";

const steps = [
  {
    icon: MessageCircle,
    step: "01",
    title: "System-Analyse",
    description:
      "Wir schauen gemeinsam auf dein Business. Was läuft noch manuell? Wo verlierst du Zeit? Wo versickern Leads? Kein Verkaufsgespräch nur ehrliche Analyse.",
  },
  {
    icon: ClipboardCheck,
    step: "02",
    title: "Strategie & Systemplan",
    description:
      "Ich zeige dir welche Prozesse wir automatisieren, was wegfällt und wie dein System am Ende aussieht. Du weißt genau was entsteht, bevor wir anfangen.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Aufbau & Migration",
    description:
      "Ich baue. Du arbeitest weiter. Bestehende Kontakte, Daten und Prozesse werden sauber übertragen ohne Unterbrechung, ohne Datenverlust.",
  },
  {
    icon: Headphones,
    step: "04",
    title: "Übergabe & Go-Live",
    description:
      "Du bekommst dein System erklärt, nicht einfach hingestellt. Und danach bist du nicht allein damit Support ist fester Bestandteil, kein Add-on.",
  },
];

const Timeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { openQuizModal } = useQuizModal();

  return (
    <section className="py-24 md:py-32 relative overflow-hidden isolate" ref={ref}>
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src={solutionBg}
          alt=""
          className="w-full h-full object-cover opacity-[0.35]"
          loading="lazy"
          aria-hidden="true"
        />
      </div>

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
              Von heute bis zum laufenden System <span className="text-primary">in 2 Wochen.</span>
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

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
                  <div className={`lg:w-[calc(50%-40px)] ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}>
                    <motion.div whileHover={{ scale: 1.02 }} className="glass-card-premium p-6 md:p-8">
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

                  <div className="hidden lg:flex items-center justify-center w-20 flex-shrink-0">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.2 * (index + 1) }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-primary/15 rounded-full blur-md scale-150" />
                      <div className="w-4 h-4 bg-primary rounded-full relative z-10" />
                    </motion.div>
                  </div>

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
              className="inline-flex items-center justify-center px-8 py-4 text-sm tracking-widest uppercase font-body text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-all duration-300 hover:scale-105"
              style={{ boxShadow: "0 0 20px hsl(var(--primary) / 0.2)" }}
            >
              System-Analyse starten
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
