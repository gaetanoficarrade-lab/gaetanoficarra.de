import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Mail, MapPin, Phone } from "lucide-react";

const FinalCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="kontakt" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm tracking-widest uppercase font-body">Nächster Schritt</span>
            <h2 className="font-display text-4xl md:text-5xl mt-4 text-foreground">
              Bereit, dein Marketing auf das{" "}
              <span className="text-gradient-primary">nächste Level</span> zu bringen?
            </h2>
            <p className="text-muted-foreground font-body mt-6 max-w-2xl mx-auto text-lg">
              Kein Verkaufsgespräch. Kein Druck. Nur eine ehrliche Analyse deiner aktuellen Situation und ein klarer
              Plan, wie es weitergehen kann.
            </p>
          </motion.div>

          {/* Main CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card border border-primary/30 p-10 md:p-12 rounded-lg text-center mb-10"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-6 mx-auto">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-foreground mb-4">System-Analyse</h3>
            <p className="text-muted-foreground font-body mb-8 leading-relaxed max-w-xl mx-auto">
              In einem kurzen Gespräch schauen wir gemeinsam auf deine aktuelle Situation. Ich zeige dir, ob und wie
              Funnelmate für dich Sinn macht.
            </p>
            <a
              href="https://klick.gaetanoficarra.de/widget/booking/5s0iHWQ0crY7ogs9gviU"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-5 text-sm tracking-widest uppercase font-body text-primary-foreground rounded-sm transition-all duration-300 hover:scale-105 bg-primary hover:bg-primary/90"
              style={{
                boxShadow: "0 0 30px hsl(var(--primary) / 0.3)",
              }}
            >
              Jetzt Erstgespräch vereinbaren
            </a>
            <p className="text-muted-foreground text-sm font-body mt-4">
              Kurz sprechen, Setup verstehen, nächsten Schritt klären
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-8 pt-12 border-t border-border"
          >
            {[
              {
                icon: Mail,
                label: "E-Mail",
                value: "kontakt@gaetanoficarra.de",
                href: "mailto:kontakt@gaetanoficarra.de",
              },
              {
                icon: Phone,
                label: "WhatsApp",
                value: "0152 23856537",
                href: "https://wa.me/4915223856537?text=Hey%2C%20ich%20bin%20an%20einer%20Zusammenarbeit%20%0Ainteressiert%20und%20h%C3%A4tte%20gerne%20weitere%20Infos.",
                external: true,
              },
              { icon: MapPin, label: "Standort", value: "Bielefeld, Deutschland", href: null },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 border border-border group-hover:border-primary/50 transition-colors duration-300 mb-4 rounded-lg">
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
