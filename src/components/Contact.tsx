import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin, Phone, Calendar, MessageCircle } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="kontakt" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
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

          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Free Consultation */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-card border border-primary/30 p-8 rounded-lg"
            >
              <div className="flex items-center justify-center w-14 h-14 bg-primary/10 rounded-lg mb-6">
                <Calendar className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-2xl text-foreground mb-4">Kostenloses Erstgespräch</h3>
              <p className="text-muted-foreground font-body mb-6 leading-relaxed">
                In 15-30 Minuten besprechen wir deine aktuelle Situation, deine Ziele und wie ich dir helfen kann. Komplett unverbindlich.
              </p>
              <a
                href="https://klick.gaetanoficarra.de/widget/booking/5s0iHWQ0crY7ogs9gviU"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-8 py-4 text-sm tracking-widest uppercase font-body text-white rounded-sm transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, hsl(168 76% 48%), hsl(168 76% 42%), hsl(168 76% 36%))',
                  boxShadow: '0 0 20px hsl(168 76% 42% / 0.25)'
                }}
              >
                Termin vereinbaren
              </a>
            </motion.div>

            {/* Support Call */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-card border border-border p-8 rounded-lg"
            >
              <div className="flex items-center justify-center w-14 h-14 bg-primary/10 rounded-lg mb-6">
                <MessageCircle className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-2xl text-foreground mb-4">Support-Call buchen</h3>
              <p className="text-muted-foreground font-body mb-2 leading-relaxed">
                Schnelle Hilfe bei konkreten Fragen oder Problemen mit HighLevel. Ich löse dein Problem in Echtzeit.
              </p>
              <p className="text-primary font-display text-xl mb-6">197€ pro Stunde</p>
              <a
                href="https://ghl.gaetanoficarra.de/support_call"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-8 py-4 text-sm tracking-widest uppercase font-body text-foreground border border-silver/30 rounded-sm transition-all duration-300 hover:border-silver/60 bg-card/50"
              >
                Support-Call buchen
              </a>
            </motion.div>
          </div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
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
