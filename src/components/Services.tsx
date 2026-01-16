import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Target, Award, Users } from "lucide-react";

const services = [
  {
    icon: Briefcase,
    title: "Beratung",
    description: "Strategische Beratung für nachhaltigen Erfolg und langfristiges Wachstum.",
  },
  {
    icon: Target,
    title: "Strategie",
    description: "Maßgeschneiderte Strategien, die Ihre Ziele in greifbare Ergebnisse verwandeln.",
  },
  {
    icon: Award,
    title: "Qualität",
    description: "Kompromisslose Qualität in jeder Phase – vom Konzept bis zur Umsetzung.",
  },
  {
    icon: Users,
    title: "Partnerschaft",
    description: "Vertrauensvolle Zusammenarbeit als Grundlage für gemeinsamen Erfolg.",
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
            Was ich <span className="text-primary">biete</span>
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 * (index + 1) }}
              className="group p-8 bg-background border border-border hover:border-primary/30 transition-all duration-500 hover:glow-gold"
            >
              <service.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-display text-2xl text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground font-body leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
