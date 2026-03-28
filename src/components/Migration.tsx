import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Shield, Clock, Database } from "lucide-react";
import { useQuizModal } from "@/context/QuizModalContext";
import migrationVisual from "@/assets/migration-visual.jpg";

const migrationTools = [
  { name: "ClickFunnels", keyword: "ClickFunnels Alternative deutsch" },
  { name: "ActiveCampaign", keyword: "ActiveCampaign Alternative CRM" },
  { name: "HubSpot", keyword: "HubSpot Alternative für Selbstständige" },
  { name: "Pipedrive", keyword: "Pipedrive vs. GoHighLevel Vergleich" },
  { name: "Kajabi", keyword: "Kajabi Alternative deutsch" },
  { name: "Coachy", keyword: "Coachy Alternative All-in-One" },
  { name: "GetResponse", keyword: "GetResponse Alternative" },
  { name: "Mailchimp", keyword: "Mailchimp Alternative" },
  { name: "ManyChat", keyword: "ManyChat Alternative" },
];

const Migration = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { openQuizModal } = useQuizModal();

  return (
    <section className="py-24 md:py-32 glass-section relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm tracking-widest uppercase font-body">Migration</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mt-4 text-foreground">
              Du nutzt bereits andere Tools? <span className="text-primary">Das ist der Normalfall.</span>
            </h2>
            <p className="text-muted-foreground font-body mt-6 max-w-3xl mx-auto text-lg leading-relaxed">
              Die meisten meiner Kunden kommen von anderen Plattformen. Ein Schwerpunkt meiner Arbeit ist die sichere
              Migration deiner bestehenden Daten und Prozesse.
            </p>
          </motion.div>

          {/* Migration Tools Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-16"
          >
            {migrationTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="glass-card px-3 py-4 md:p-6 text-center"
              >
                <span className="font-display text-base md:text-lg text-foreground">{tool.name}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Migration Benefits */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Database, title: "Sichere Migration", description: "Kontakte, Tags, Listen und Automationen werden sorgfältig in dein neues System übertragen." },
              { icon: Shield, title: "Kein Datenverlust", description: "Alle wichtigen Daten bleiben erhalten. Ich prüfe jeden Schritt, bevor wir live gehen." },
              { icon: Clock, title: "Kein Stillstand", description: "Dein Business läuft weiter. Die Migration erfolgt parallel, ohne Unterbrechung deiner Prozesse." },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + 0.1 * index }}
                className="glass-card-premium p-8"
                style={{ borderColor: "hsl(var(--primary) / 0.15)" }}
              >
                <div className="flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mb-6">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Migration Visual */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 mb-16"
          >
            <img
              src={migrationVisual}
              alt="Migration von verstreuten Tools zu einem zentralen System"
              className="w-full rounded-xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.08)] object-cover max-h-[200px]"
              width={1920}
              height={512}
              loading="lazy"
            />
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-16"
          >
            <button
              onClick={openQuizModal}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-body text-sm uppercase tracking-widest transition-colors"
            >
              Migration besprechen <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Migration;
