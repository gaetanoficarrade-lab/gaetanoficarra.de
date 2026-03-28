import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Settings, Users, Headphones, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Settings,
    title: "Full System",
    description: "Ich baue dir dein komplettes System: Leads, Termine, Follow-ups, Automationen. Du lehnst dich zurück und bekommst alles startklar übergeben.",
    benefits: [
      "Du arbeitest mit einem vollständig eingerichteten System",
      "Routineaufgaben laufen im Hintergrund",
      "Technikfragen spielen im Alltag keine Rolle mehr",
      "Du kannst dich auf Kunden und Umsatz konzentrieren",
      "30 Tage Support für Anpassungen und Fragen",
    ],
    popular: true,
  },
  {
    icon: Users,
    title: "Growth",
    description: "Du arbeitest aktiv an deinem System, während ich dich strategisch und technisch begleite. Du bekommst klare Aufgaben und Umsetzungs-Schritte, setzt sie in deinem Tempo um und ich prüfe die Ergebnisse, bevor wir den nächsten Schritt gehen.",
    benefits: [
      "Du verstehst, wie dein System funktioniert",
      "Änderungen kannst du sicher einschätzen",
      "Alle Abläufe sind dokumentiert und nachvollziehbar",
      "Wissen bleibt bei dir und geht nicht verloren",
      "60 Tage Support für Rückfragen und Feinschliff",
    ],
    popular: false,
  },
  {
    icon: Headphones,
    title: "Support-Call",
    description: "Du hast eine spezifische Frage oder steckst fest? In einem 1:1 Call lösen wir dein Problem schnell und unkompliziert.",
    benefits: [
      "Du bekommst eine klare Antwort auf dein konkretes Problem",
      "Lösungen statt langem Suchen",
      "Direkte Umsetzung im Call",
      "Du kannst danach sofort weitermachen",
    ],
    popular: false,
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="leistungen" className="py-24 md:py-32 glass-section relative" ref={ref}>
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm tracking-widest uppercase font-body">Leistungen</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mt-4 text-foreground">
            So kann ich dich <span className="text-gradient-primary">unterstützen</span>
          </h2>
          <p className="text-muted-foreground font-body mt-6 max-w-2xl mx-auto text-lg">
            Ob komplette Einrichtung, gemeinsames Arbeiten oder schnelle Hilfe bei Problemen, wähle die Option, die zu dir passt.
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
              className={`relative group p-8 glass-card-premium ${
                service.popular ? "!border-primary/30" : ""
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

              <ul className="space-y-3">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-body text-foreground">
                    <span className="text-primary mt-0.5">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <Link
            to="/leistungen"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-md font-body text-sm uppercase tracking-widest transition-all duration-300 hover:bg-primary/90 hover:scale-105"
            style={{
              boxShadow: "0 0 20px hsl(var(--primary) / 0.2)",
            }}
          >
            Alle Leistungen & Preise <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
