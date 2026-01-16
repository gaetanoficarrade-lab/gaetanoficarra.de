import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
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
            <span className="text-primary text-sm tracking-widest uppercase font-body">
              Kontakt
            </span>
          <h2 className="font-display text-4xl md:text-5xl mt-4 text-foreground">
            Lassen Sie uns <span className="text-primary">sprechen</span>
          </h2>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {[
              { icon: Mail, label: "E-Mail", value: "info@gaetanoficarra.de" },
              { icon: Phone, label: "Telefon", value: "+49 123 456 789" },
              { icon: MapPin, label: "Standort", value: "Deutschland" },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 border border-border group-hover:border-primary/50 transition-colors duration-300 mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-muted-foreground text-sm tracking-wide uppercase font-body mb-1">
                  {item.label}
                </div>
                <div className="text-foreground font-body">{item.value}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <p className="text-muted-foreground font-body mb-8 text-lg">
              Bereit für den nächsten Schritt? Ich freue mich auf Ihre Nachricht.
            </p>
            <motion.a
              href="mailto:info@gaetanoficarra.de"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block bg-primary text-primary-foreground px-10 py-4 text-sm tracking-widest uppercase font-body hover:bg-gold-light transition-colors duration-300"
            >
              E-Mail senden
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
