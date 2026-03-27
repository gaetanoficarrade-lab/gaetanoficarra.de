import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Mail, MapPin, Phone } from "lucide-react";
import { useQuizModal } from "@/context/QuizModalContext";

const FinalCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { openQuizModal } = useQuizModal();

  return (
    <section id="kontakt" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm tracking-widest uppercase font-body">Nächster Schritt</span>
            <h2 className="font-display text-4xl md:text-5xl mt-4 text-foreground">
              <span className="text-gradient-primary">Lass uns kurz sprechen.</span>
            </h2>
            <p className="text-muted-foreground font-body mt-6 max-w-2xl mx-auto text-lg">
              In einem kurzen Gespräch schauen wir gemeinsam auf deine aktuelle Situation. Ich zeige dir, wo
              Potenzial liegt und wie wir Ordnung in dein System bringen können.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card-premium p-10 md:p-12 text-center mb-10"
            style={{ borderColor: "hsl(var(--primary) / 0.2)" }}
          >
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-6 mx-auto">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-foreground mb-4">Kostenlose System-Analyse</h3>
            <p className="text-muted-foreground font-body mb-8 leading-relaxed max-w-xl mx-auto">
              In einem kurzen Gespräch schauen wir gemeinsam auf deine aktuelle Situation. Ich zeige dir, wo
              Potenzial liegt und wie wir Ordnung in dein System bringen können.
            </p>
            <button
              onClick={openQuizModal}
              className="inline-flex items-center justify-center px-10 py-5 text-sm tracking-widest uppercase font-body text-primary-foreground rounded-md transition-all duration-300 hover:scale-105 bg-primary hover:bg-primary/90"
              style={{ boxShadow: "0 0 30px hsl(var(--primary) / 0.2)" }}
            >
              System-Analyse starten
            </button>
            <p className="text-muted-foreground text-sm font-body mt-4">
              Kurz sprechen, Setup verstehen, nächsten Schritt klären
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-8 pt-12 border-t border-border/50"
          >
            {[
              { icon: Mail, label: "E-Mail", value: "kontakt@gaetanoficarra.de", href: "mailto:kontakt@gaetanoficarra.de" },
              { icon: Phone, label: "WhatsApp", value: "0152 23856537", href: "https://wa.me/4915223856537?text=Hey%2C%20ich%20bin%20an%20einer%20Zusammenarbeit%20%0Ainteressiert%20und%20h%C3%A4tte%20gerne%20weitere%20Infos.", external: true },
              { icon: MapPin, label: "Standort", value: "Bielefeld, Deutschland", href: null },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 glass-card group-hover:!border-primary/30 transition-all duration-300 mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-muted-foreground text-sm tracking-wide uppercase font-body mb-1">{item.label}</div>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-foreground font-body hover:text-primary transition-colors"
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {item.value}
                  </a>
                ) : (
                  <div className="text-foreground font-body">{item.value}</div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
