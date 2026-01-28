import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Mail, LayoutTemplate, Calendar, GraduationCap, Workflow, ArrowRight } from "lucide-react";
import automationWorkspace from "@/assets/automation-workspace.jpg";
import { useQuizModal } from "@/context/QuizModalContext";

const features = [
  {
    icon: Users,
    title: "CRM",
    description: "Alle Kontakte, Leads und Kunden an einem Ort. Keine verstreuten Listen mehr.",
  },
  {
    icon: Mail,
    title: "E-Mail-Marketing",
    description: "Newsletter, Sequenzen und Automationen ohne externes Tool.",
  },
  {
    icon: LayoutTemplate,
    title: "Funnel-Builder",
    description: "Landing Pages, Sales Funnels und Opt-in-Seiten. Alles integriert.",
  },
  {
    icon: Calendar,
    title: "Terminbuchung",
    description: "Calendly-Alternative direkt im System. Sync mit deinem Kalender.",
  },
  {
    icon: GraduationCap,
    title: "Mitgliederbereiche",
    description: "Online-Kurse und geschützte Inhalte ohne Kajabi oder Coachy.",
  },
  {
    icon: Workflow,
    title: "Automatisierungen",
    description: "Komplexe Workflows, die Leads qualifizieren und Kunden betreuen.",
  },
];

const Solution = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { openQuizModal } = useQuizModal();

  return (
    <section className="py-24 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm tracking-widest uppercase font-body">Die Lösung</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mt-4 text-foreground">
              Ein System statt <span className="text-gradient-primary">fünf einzelner Tools</span>
            </h2>
            <p className="text-muted-foreground font-body mt-6 max-w-3xl mx-auto text-lg leading-relaxed">
              Funnelmate vereint alle Marketing-Funktionen, die du brauchst, in einer Plattform. Basierend auf der
              bewährten GoHighLevel-Technologie bekommst du ein vollständiges Business-System.
            </p>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <div className="relative overflow-hidden rounded-xl border border-border">
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
              <img
                src={automationWorkspace}
                alt="Professionelle Marketing Automation Workflows"
                className="w-full h-64 md:h-80 lg:h-96 object-cover"
              />
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                className="bg-card border border-border p-8 rounded-lg hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mb-6">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Key Differentiator */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-br from-card to-primary/5 border border-primary/20 p-10 md:p-12 rounded-lg text-center"
          >
            <h3 className="font-display text-2xl md:text-3xl text-foreground mb-4">
              Der Unterschied liegt in der <span className="text-primary">Einrichtung</span>
            </h3>
            <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto mb-8">
              Funnelmate ist mächtig, aber nur, wenn es richtig konfiguriert ist. Als zertifizierter Admin richte ich
              dein System so ein, dass es von Tag 1 an funktioniert. Keine Lernkurve, keine technischen Hürden.
            </p>
            <button
              onClick={openQuizModal}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-body text-sm uppercase tracking-widest transition-colors"
            >
              Jetzt Erstgespräch vereinbaren <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
