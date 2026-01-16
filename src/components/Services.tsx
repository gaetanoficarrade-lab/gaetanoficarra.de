import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Settings, Users, Headphones, TrendingUp, Zap, Repeat, ArrowRight, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Settings,
    title: "Done-For-You Setup",
    description: "Ich richte dein HighLevel komplett ein – Funnels, Automations, CRM. Alles perfekt konfiguriert und startklar.",
  },
  {
    icon: Users,
    title: "Done-With-You Live",
    description: "Wir arbeiten gemeinsam live an deinem System. Du lernst dabei und bekommst gleichzeitig alles eingerichtet.",
  },
  {
    icon: Headphones,
    title: "Support-Calls",
    description: "Steckst du fest? Buche einen Support-Call und ich löse deine Probleme schnell und unkompliziert. 197€/Stunde.",
  },
  {
    icon: TrendingUp,
    title: "Strategieberatung",
    description: "Gemeinsam entwickeln wir eine Strategie, wie du das Maximum aus HighLevel herausholst.",
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Automatisiere deine Prozesse und spare wertvolle Zeit. Ich erstelle Workflows, die für dich arbeiten.",
  },
  {
    icon: Repeat,
    title: "Migration & Umzug",
    description: "Ich übertrage deine bestehenden Tools, Funnels oder Kontakte sauber nach HighLevel.",
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="leistungen" className="py-32 bg-card relative" ref={ref}>
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
          className="text-center mb-20"
        >
          <span className="text-primary text-sm tracking-widest uppercase font-body">
            Leistungen
          </span>
          <h2 className="font-display text-4xl md:text-5xl mt-4 text-foreground">
            Wie ich dir <span className="text-primary">helfen</span> kann
          </h2>
          <p className="text-muted-foreground font-body mt-6 max-w-2xl mx-auto">
            Von der kompletten Einrichtung bis zum schnellen Support-Call – ich biete dir genau die Unterstützung, die du brauchst.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 * (index + 1) }}
              className="group p-8 bg-background border border-border hover:border-primary/30 transition-all duration-500 hover:glow-gold rounded-lg"
            >
              <service.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-display text-xl text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* SaaS Provider Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-gradient-to-br from-background to-muted/20 border border-primary/20 p-10 md:p-12 rounded-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                <Building2 className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-foreground">
                Für <span className="text-primary">SaaS-Anbieter</span>
              </h3>
            </div>
            
            <p className="text-muted-foreground text-lg font-body leading-relaxed mb-6">
              Du bist SaaS-Anbieter und nutzt GoHighLevel als Basis für dein Produkt? Ich unterstütze dich und deine Kunden mit professionellem Support:
            </p>
            
            <ul className="space-y-4 mb-8">
              {[
                "Regelmäßige Q&A Calls mit deinen Kunden",
                "Beantwortung technischer und strategischer Fragen",
                "Unterstützung bei Problemfällen & Troubleshooting",
                "Professioneller Kundensupport für dein SaaS-Produkt"
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
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
          transition={{ duration: 0.8, delay: 1.2 }}
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
