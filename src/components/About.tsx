import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { AlertTriangle, Layers, Clock, Zap } from "lucide-react";

const problems = [
  {
    icon: Layers,
    title: "Zu viele Tools",
    description: "Du jonglierst zwischen CRM, E-Mail-Tool, Funnel-Builder und zehn anderen Plattformen – und verlierst dabei den Überblick."
  },
  {
    icon: AlertTriangle,
    title: "Unklare Prozesse",
    description: "Leads verschwinden, Follow-ups werden vergessen, und du weißt nie genau, wo deine Kunden im Prozess stehen."
  },
  {
    icon: Clock,
    title: "Zeitfresser manueller Tasks",
    description: "Statt dich auf dein Business zu konzentrieren, verbringst du Stunden mit Copy-Paste und manuellen Arbeiten."
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="über-mich" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm tracking-widest uppercase font-body">
              Das Problem
            </span>
            <h2 className="font-display text-4xl md:text-5xl mt-4 text-foreground">
              Kommt dir das <span className="text-primary">bekannt</span> vor?
            </h2>
          </motion.div>

          {/* Problems Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {problems.map((problem, index) => (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 * (index + 1) }}
                className="bg-card border border-border p-8 rounded-lg text-center"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-destructive/10 rounded-lg mx-auto mb-6">
                  <problem.icon className="w-7 h-7 text-destructive" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-3">{problem.title}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{problem.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-gradient-to-br from-card to-muted/20 border border-primary/20 p-10 md:p-14 rounded-lg text-center"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-8">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display text-3xl md:text-4xl text-foreground mb-6">
              Die Lösung: <span className="text-primary">Ein System für alles</span>
            </h3>
            <p className="text-muted-foreground text-lg font-body leading-relaxed max-w-2xl mx-auto mb-8">
              Mit HighLevel bekommst du CRM, Funnels, E-Mail-Marketing, Terminbuchung und Automatisierungen in einer einzigen Plattform. Als zertifizierter Experte mit über 3 Jahren Erfahrung richte ich dein System so ein, dass es für dich arbeitet – nicht umgekehrt.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              {[
                { number: "3+", label: "Jahre Erfahrung" },
                { number: "100+", label: "Projekte" },
                { number: "100%", label: "Fokus auf HighLevel" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-display text-3xl md:text-4xl text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground text-sm tracking-wide uppercase font-body">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
