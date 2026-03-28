import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { UserCheck, BellRing, BarChart3, Rocket, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import solutionBg from "@/assets/solution-bg.jpg";

const outcomes = [
  { icon: UserCheck, text: "Neue Kunden werden automatisch ongeboardet ohne dass du dabei sein musst." },
  { icon: BellRing, text: "Leads die sich heute nicht entscheiden, hören morgen wieder von dir automatisch." },
  { icon: BarChart3, text: "Du weißt jederzeit wo welcher Kontakt steht, was läuft und was nicht." },
  { icon: Rocket, text: "Dein Business läuft weiter auch wenn du es nicht tust." },
];

const Solution = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative overflow-hidden isolate" ref={ref}>
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src={solutionBg}
          alt=""
          className="w-full h-full object-cover opacity-50"
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
            <span className="text-primary text-sm tracking-widest uppercase font-body">Die Lösung</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mt-4 text-foreground">
              Was danach <span className="text-gradient-primary">anders ist.</span>
            </h2>
          </motion.div>

          {/* Outcomes Grid */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-16">
            {outcomes.map((outcome, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                className="glass-card-premium p-8 flex items-start gap-5"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full flex-shrink-0">
                  <outcome.icon className="w-7 h-7 text-primary" />
                </div>
                <p className="text-foreground font-body text-lg leading-relaxed">{outcome.text}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA to Leistungen */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-card-premium p-10 md:p-12 text-center"
            style={{ borderColor: "hsl(var(--primary) / 0.2)" }}
          >
            <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto mb-8">
              Wie das im Detail aussieht und welches Paket zu dir passt:
            </p>
            <Link
              to="/leistungen"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-body text-sm uppercase tracking-widest transition-colors"
            >
              Alle Leistungen & Pakete ansehen <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
