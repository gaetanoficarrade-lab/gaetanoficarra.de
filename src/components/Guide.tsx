import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import portrait from "@/assets/gaetano-portrait.jpg";

const Guide = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="guide" className="py-24 md:py-32 glass-section relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm tracking-widest uppercase font-body">Dein Ansprechpartner</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mt-4 text-foreground">
              Ich bin Gaetano. Ich baue <span className="text-primary">Systeme die dein Business von dir unabhängig machen.</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-transparent rounded-2xl blur-2xl scale-105" />
                <img
                  src={portrait}
                  alt="Gaetano Ficarra - Zertifizierter GoHighLevel Admin"
                  className="relative w-full max-w-md rounded-2xl border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.1)]"
                  width={448}
                  height={448}
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="text-muted-foreground text-lg font-body leading-relaxed mb-6">
                Ich kenne das Hamsterrad aus eigener Erfahrung. Ich habe selbst mehrere Businesses aufgebaut und weiß wie es sich anfühlt, wenn eine Woche Urlaub bedeutet: Chaos im Hintergrund.
              </p>
              <p className="text-muted-foreground text-lg font-body leading-relaxed mb-6">
                Seit über 5 Jahren baue ich Systeme für Selbstständige, Coaches und Berater im DACH-Raum. Nicht als Tool-Erklärer. Nicht als Berater der eine Empfehlung schreibt und verschwindet. Ich baue es. Komplett. Und ich übergebe es so, dass du es wirklich nutzt.
              </p>
              <p className="text-muted-foreground text-lg font-body leading-relaxed mb-8">
                Das Ergebnis ist kein Tool. Es ist ein Business das ohne dich funktioniert – damit du endlich das lebst, weswegen du dich selbstständig gemacht hast.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-border/50">
                {[
                  { label: "Zertifizierter", value: "GoHighLevel Admin" },
                  { label: "Fokus", value: "Systemaufbau für Selbstständige" },
                  { label: "Erfahrung", value: "5+ Jahre Online Business" },
                  { label: "Spezialgebiet", value: "Automatisierung & Migration" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="text-left"
                  >
                    <div className="text-muted-foreground text-xs tracking-wide uppercase font-body mb-1">
                      {stat.label}
                    </div>
                    <div className="font-display text-lg text-foreground">{stat.value}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guide;
