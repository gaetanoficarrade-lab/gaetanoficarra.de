import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, X } from "lucide-react";

const suitableFor = [
  "Selbstständige, Coaches und Berater mit laufendem Business",
  "Unternehmer, die regelmäßig Anfragen oder Leads bekommen",
  "Menschen, deren Wachstum an fehlender Struktur scheitert, nicht am Marketing",
  "Unternehmer, die verstanden haben: Ordnung und Prozesse sind Voraussetzung für planbares Wachstum",
  "Alle, die sich auf Kunden und Umsatz konzentrieren wollen, statt auf Technik"
];

const notSuitableFor = [
  "Anfänger, die noch kein laufendes Business haben",
  "Bastler und Toolspieler, die alles selbst machen wollen",
  "Wer nicht bereit ist, Verantwortung für Prozesse abzugeben"
];

const Qualification = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm tracking-widest uppercase font-body">Zielgruppe</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mt-4 text-foreground">
              Für wen ich <span className="text-primary">der richtige Partner</span> bin
            </h2>
            <p className="text-muted-foreground font-body mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
              Meine Dienstleistung ist nicht für jeden geeignet. Hier ist eine ehrliche Orientierung.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-card-premium p-8 md:p-10"
              style={{ borderColor: "hsl(var(--primary) / 0.2)" }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl text-foreground">Geeignet für</h3>
              </div>
              <ul className="space-y-4">
                {suitableFor.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-3 text-foreground font-body"
                  >
                    <span className="text-primary mt-1 flex-shrink-0">✓</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="glass-card p-8 md:p-10"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <X className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl text-foreground">Nicht geeignet für</h3>
              </div>
              <ul className="space-y-4">
                {notSuitableFor.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-3 text-muted-foreground font-body"
                  >
                    <span className="text-muted-foreground mt-1 flex-shrink-0">✗</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Qualification;
