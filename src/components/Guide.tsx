import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import portrait from "@/assets/gaetano-portrait.jpg";

const Guide = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="guide" className="py-24 md:py-32 bg-card relative" ref={ref}>
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
              Ich bringe <span className="text-primary">Ordnung in dein System</span>
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
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-2xl scale-105" />
                <img
                  src={portrait}
                  alt="Gaetano Ficarra - Zertifizierter GoHighLevel Admin"
                  className="relative w-full max-w-md rounded-2xl border border-border shadow-xl"
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
                Ich bin Gaetano Ficarra. Meine Aufgabe ist es, dir ein zentrales Marketing-System aufzubauen, das zuverlässig funktioniert – damit du dich auf Kunden, Umsatz und Wachstum konzentrieren kannst.
              </p>

              <p className="text-muted-foreground text-lg font-body leading-relaxed mb-6">
                Du sollst keine neuen Tools lernen, keine Technik basteln und keine Schnittstellen debuggen. Das ist mein Job. Ich denke in Prozessen und setze dir ein sauberes Setup auf, in dem Leads, Termine und Follow-ups klar strukturiert zusammenlaufen.
              </p>

              <p className="text-muted-foreground text-lg font-body leading-relaxed mb-6">
                Ich sorge dafür, dass dein System verständlich aufgebaut ist, stabil läuft und ohne ständiges Nachjustieren funktioniert – als Grundlage für planbares Wachstum.
              </p>

              <p className="text-muted-foreground text-lg font-body leading-relaxed mb-8">
                Als zertifizierter GoHighLevel Admin mit Erfahrung in Migration, komplexen Automationen und DSGVO-konformer Einrichtung stelle ich sicher, dass dein System nicht nur heute funktioniert, sondern auch langfristig tragfähig ist.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-border">
                {[
                  { label: "Zertifizierter", value: "GoHighLevel Admin" },
                  { label: "Fokus", value: "Ordnung & Klarheit" },
                  { label: "Erfahrung", value: "5+ Jahre Online Business" },
                  { label: "Spezialgebiet", value: "Systeme & Automatisierung" },
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
