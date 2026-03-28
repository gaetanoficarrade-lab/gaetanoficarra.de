import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Layers, AlertTriangle, Clock, TrendingDown, Link2Off, EuroIcon } from "lucide-react";
import problemChaos from "@/assets/problem-chaos.jpg";

const problems = [
  {
    icon: Layers,
    title: "Alles hängt an dir persönlich",
    description:
      "Wenn du krank bist oder drei Tage nicht erreichbar, bricht das halbe Business ein. Das ist keine Selbstständigkeit, das ist eine andere Form von Anstellung.",
  },
  {
    icon: Link2Off,
    title: "Tool-Chaos ohne Ende",
    description:
      "Hier ein CRM, dort ein E-Mail-Tool, woanders ein Funnel-Builder. Du zahlst jeden Monat für ein Dutzend Plattformen die sich nicht kennen und trotzdem läuft es nicht rund.",
  },
  {
    icon: Clock,
    title: "Follow-ups die niemand verschickt",
    description:
      "80 % der Abschlüsse entstehen erst nach mehreren Kontaktpunkten. Aber wer hat die Zeit, jeden Lead manuell nachzufassen? Die meisten kaufen irgendwann bei jemandem der einfach drangeblieben ist.",
  },
  {
    icon: AlertTriangle,
    title: "Kein Überblick, nur ein ungutes Gefühl",
    description:
      "Wo steht welcher Lead? Wer wurde kontaktiert? Wer ist kurz vorm Abschluss? Du weißt es irgendwie aber eben nicht wirklich.",
  },
  {
    icon: TrendingDown,
     title: "Skalierung die sich anfühlt wie gegen eine Wand laufen",
    description:
      "Mehr Kunden bedeutet bei dir mehr Arbeit, nicht mehr Freiheit. Das Hamsterrad dreht sich schneller aber du kommst nicht vom Fleck.",
  },
  {
    icon: EuroIcon,
    title: "Softwarekosten die sich nicht rechnen",
    description:
      "Hunderte Euro jeden Monat für Tools die du nie zu 20 % nutzt. Und das eine System das alles zusammenhält das fehlt.",
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
              Du kennst das Gefühl.{" "}
              <span className="text-gradient-primary">Selbstständig und trotzdem selbst und ständig.</span>
            </h2>
            <p className="text-muted-foreground font-body mt-6 max-w-3xl mx-auto text-lg leading-relaxed">
              Du hast dir das anders vorgestellt. Mehr Freiheit. Mehr Kontrolle. Selbst entscheiden wann, wo und mit wem
              du arbeitest. Stattdessen sitzt du abends noch am Laptop, onboardest neue Kunden per Hand, jagst
              Follow-ups hinterher und fragst dich: Hab ich auf die Anfrage von gestern schon geantwortet? Das ist die
              Zeit-gegen-Geld-Falle. Nicht weil du etwas falsch machst. Sondern weil kein System dahinter ist. Und das
              ändere ich.
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
            className="mt-16"
          >
            <img
              src={problemChaos}
              alt="Chaotischer Schreibtisch mit zu vielen Tools und Software"
              className="w-full rounded-xl border border-white/60 shadow-[0_12px_40px_rgba(0,0,0,0.08)] object-cover max-h-[280px]"
              width={1920}
              height={512}
              loading="lazy"
            />
            <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto text-center mt-8">
              Kein einziger dieser Punkte ist deine Schuld. Sie haben alle dieselbe Ursache: kein System. Genau das
              ändere ich.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
