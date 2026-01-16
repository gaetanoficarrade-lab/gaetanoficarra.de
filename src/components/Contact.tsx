import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin, Phone, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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
              Lass uns <span className="text-primary">sprechen</span>
            </h2>
            <p className="text-muted-foreground font-body mt-6 max-w-2xl mx-auto">
              Ob Fragen, Beratung oder direkte Zusammenarbeit – ich bin für dich da.
            </p>
          </motion.div>

          {/* Free Consultation Card - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card border border-primary/30 p-10 md:p-12 rounded-lg text-center mb-10"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-6 mx-auto">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-foreground mb-4">Kostenloses Erstgespräch</h3>
            <p className="text-muted-foreground font-body mb-8 leading-relaxed max-w-xl mx-auto">
              In 15-30 Minuten besprechen wir deine aktuelle Situation, deine Ziele und wie ich dir helfen kann. Komplett unverbindlich.
            </p>
            <a
              href="https://klick.gaetanoficarra.de/widget/booking/5s0iHWQ0crY7ogs9gviU"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-5 text-sm tracking-widest uppercase font-body text-primary-foreground rounded-sm transition-all duration-300 hover:scale-105 bg-primary hover:bg-primary/90"
              style={{
                boxShadow: '0 0 30px hsl(var(--primary) / 0.3)'
              }}
            >
              Termin vereinbaren
            </a>
          </motion.div>

          {/* Support Call Hint */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-16 p-6 border border-border rounded-lg bg-card/50"
          >
            <p className="text-muted-foreground font-body mb-3">
              Du hast ein <span className="text-foreground">konkretes Problem</span> oder brauchst schnelle Hilfe?
            </p>
            <Link
              to="/leistungen"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-body text-sm uppercase tracking-widest transition-colors"
            >
              Dann ist ein Support-Call vielleicht das Richtige für dich <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid md:grid-cols-3 gap-8 pt-12 border-t border-border"
          >
            {[
              { icon: Mail, label: "E-Mail", value: "kontakt@gaetanoficarra.de", href: "mailto:kontakt@gaetanoficarra.de" },
              { icon: Phone, label: "Telefon", value: "0152 31039640", href: "tel:+4915231039640" },
              { icon: MapPin, label: "Standort", value: "Bielefeld, Deutschland", href: null },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 border border-border group-hover:border-primary/50 transition-colors duration-300 mb-4 rounded-lg">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-muted-foreground text-sm tracking-wide uppercase font-body mb-1">
                  {item.label}
                </div>
                {item.href ? (
                  <a href={item.href} className="text-foreground font-body hover:text-primary transition-colors">
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

export default Contact;