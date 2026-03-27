import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, X } from "lucide-react";

const suitableFor = [
  "Du ein laufendes Business mit aktiven Kunden hast",
  "Dein Wachstum nicht am Marketing hängt – sondern daran, dass die Prozesse dahinter noch nicht stehen",
  "Du nicht selbst an Technik sitzen willst – du willst, dass jemand es baut und es danach einfach läuft",
  "Mehr Kunden für dich mehr Freiheit bedeuten soll, nicht mehr Chaos"
];

const notSuitableFor = [
  "Du gerade erst anfängst und noch keine Kunden hast",
  "Du alles selbst in der Hand behalten und jeden Schritt selbst verstehen willst",
  "Du ein Tool suchst das du selbst lernst und bedienst"
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
              Für wen das wirklich <span className="text-primary">Sinn macht</span> und für wen nicht.
            </h2>
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
                 <h3 className="font-display text-xl text-foreground">Richtig für dich wenn:</h3>
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
                 <h3 className="font-display text-xl text-foreground">Nicht das Richtige wenn:</h3>
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

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center text-muted-foreground font-body italic text-sm mt-10"
          >
            Beides ist legitim. Aber ich bin nur für das erste gemacht.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Qualification;
