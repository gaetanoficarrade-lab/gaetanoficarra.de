import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Layers, AlertTriangle, Clock, TrendingDown, Link2Off, EuroIcon } from "lucide-react";
import systemIntegration from "@/assets/system-integration.jpg";

const problems = [
  {
    icon: Layers,
    title: "Alles hängt an dir persönlich",
    description: "Wenn du krank bist oder drei Tage nicht erreichbar, bricht das halbe Business ein. Das ist keine Selbstständigkeit – das ist eine andere Form von Anstellung.",
  },
  {
    icon: Link2Off,
    title: "Tool-Chaos ohne Ende",
    description: "Hier ein CRM, dort ein E-Mail-Tool, woanders ein Funnel-Builder. Du zahlst jeden Monat für ein Dutzend Plattformen die sich nicht kennen – und trotzdem läuft es nicht rund.",
  },
  {
    icon: Clock,
    title: "Follow-ups die niemand verschickt",
    description: "80 % der Abschlüsse entstehen erst nach mehreren Kontaktpunkten. Aber wer hat die Zeit, jeden Lead manuell nachzufassen? Die meisten kaufen irgendwann bei jemandem der einfach drangeblieben ist.",
  },
  {
    icon: AlertTriangle,
    title: "Kein Überblick – nur ein ungutes Gefühl",
    description: "Wo steht welcher Lead? Wer wurde kontaktiert? Wer ist kurz vorm Abschluss? Du weißt es irgendwie – aber eben nicht wirklich.",
  },
  {
    icon: TrendingDown,
    title: "Skalierung die sich anfühlt wie gegen eine Wand laufen",
    description: "Mehr Kunden bedeutet bei dir mehr Arbeit, nicht mehr Freiheit. Das Hamsterrad dreht sich schneller – aber du kommst nicht vom Fleck.",
  },
  {
    icon: EuroIcon,
    title: "Softwarekosten die sich nicht rechnen",
    description: "Hunderte Euro jeden Monat für Tools die du nie zu 20 % nutzt. Und das eine System das alles zusammenhält – das fehlt.",
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
              Dein Wachstum scheitert nicht am Marketing{" "}
              <span className="text-gradient-primary">sondern an fehlender Struktur</span>
            </h2>
            <p className="text-muted-foreground font-body mt-6 max-w-3xl mx-auto text-lg leading-relaxed">
              Du bekommst Anfragen und Leads, aber sie versickern im System-Chaos. Manuelle Prozesse, unübersichtliche Tools
              und fehlende Automatisierung kosten dich Zeit, Nerven und letztlich Umsatz.
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
                className="glass-card p-8"
                style={{ borderColor: "hsl(var(--destructive) / 0.15)" }}
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
                className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-xl border border-white/60 shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
                width={256}
                height={256}
                loading="lazy"
              />
            </div>
            <p className="text-muted-foreground font-body text-lg max-w-2xl text-center lg:text-left">
              Wenn du regelmäßig Anfragen bekommst, aber trotzdem das Gefühl hast, ständig hinterherzurennen, liegt das nicht an dir.
              Es fehlt ein zentrales System. Genau das baue ich für dich auf.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
