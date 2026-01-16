import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Settings, Users, Headphones, ArrowRight, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Settings,
    title: "Done-For-You Setup",
    description: "Ich richte dein HighLevel komplett für dich ein. Funnels, Automations, CRM – alles perfekt konfiguriert und startklar. Du lehnst dich zurück, ich mache den Rest.",
    benefits: ["Komplett fertig eingerichtet", "Funnels & Automationen", "CRM-Setup & Integrationen", "30 Tage Support inklusive"],
    cta: "Projekt anfragen",
    ctaLink: "https://klick.gaetanoficarra.de/widget/booking/5s0iHWQ0crY7ogs9gviU",
    popular: true,
  },
  {
    icon: Users,
    title: "Done-With-You Live",
    description: "Wir arbeiten gemeinsam live an deinem System. Du lernst dabei, stellst Fragen und bekommst gleichzeitig alles professionell eingerichtet.",
    benefits: ["Live Zusammenarbeit", "Du lernst während wir bauen", "Aufnahmen aller Sessions", "60 Tage Support inklusive"],
    cta: "Session buchen",
    ctaLink: "https://klick.gaetanoficarra.de/widget/booking/5s0iHWQ0crY7ogs9gviU",
    popular: false,
  },
  {
    icon: Headphones,
    title: "Support-Call",
    description: "Steckst du fest oder hast eine spezifische Frage? Buche einen 1:1 Support-Call und ich löse dein Problem schnell und unkompliziert.",
    benefits: ["1:1 Video-Call", "Bildschirmfreigabe", "Problemlösung in Echtzeit", "Aufnahme des Calls"],
    cta: "Call buchen • 197€/h",
    ctaLink: "https://ghl.gaetanoficarra.de/support_call",
    popular: false,
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="leistungen" className="py-24 md:py-32 bg-card relative" ref={ref}>
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm tracking-widest uppercase font-body">
            Leistungen
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mt-4 text-foreground">
            So kann ich <span className="text-primary">dich unterstützen</span>
          </h2>
          <p className="text-muted-foreground font-body mt-6 max-w-2xl mx-auto text-lg">
            Ob komplette Einrichtung, gemeinsames Arbeiten oder schnelle Hilfe bei Problemen – wähle die Option, die zu dir passt.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              className={`relative group p-8 bg-background border rounded-lg transition-all duration-500 hover:glow-gold ${
                service.popular ? 'border-primary' : 'border-border hover:border-primary/30'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 text-xs uppercase tracking-widest font-body rounded-full">
                  Beliebt
                </div>
              )}
              
              <service.icon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-display text-xl md:text-2xl text-foreground mb-4">{service.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">{service.description}</p>
              
              <ul className="space-y-3 mb-8">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-body text-foreground">
                    <span className="text-primary mt-0.5">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>

              <a
                href={service.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center py-4 text-sm uppercase tracking-widest font-body transition-all duration-300 rounded-sm ${
                  service.popular 
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                    : 'border border-primary text-primary hover:bg-primary/10'
                }`}
              >
                {service.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {/* SaaS Provider Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-gradient-to-br from-background to-muted/20 border border-primary/20 p-10 md:p-12 rounded-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                <Building2 className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-2xl md:text-3xl text-foreground">
                  Für <span className="text-primary">SaaS-Anbieter</span>
                </h3>
                <p className="text-muted-foreground text-sm font-body">White-Label & Custom Solutions</p>
              </div>
            </div>
            
            <p className="text-muted-foreground text-lg font-body leading-relaxed mb-6">
              Du bist SaaS-Anbieter und nutzt GoHighLevel als Basis? Ich unterstütze dich und deine Kunden mit professionellem Support:
            </p>
            
            <ul className="space-y-4 mb-8">
              {[
                "Regelmäßige Q&A Calls mit deinen Endkunden",
                "Technischer & strategischer Support für deine Nutzer",
                "Troubleshooting & Problemlösung",
                "Professioneller Kundensupport für dein SaaS-Produkt"
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="flex items-start gap-3 text-foreground font-body"
                >
                  <span className="text-primary mt-1">✓</span>
                  {item}
                </motion.li>
              ))}
            </ul>
            
            <a
              href="https://klick.gaetanoficarra.de/widget/booking/5s0iHWQ0crY7ogs9gviU"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-body text-sm uppercase tracking-widest transition-colors"
            >
              Jetzt Gespräch vereinbaren <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <Link
            to="/leistungen"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-body text-sm uppercase tracking-widest transition-colors"
          >
            Alle Leistungen im Detail <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;