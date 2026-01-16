import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="über-mich" className="py-32 relative" ref={ref}>
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
              Über mich
            </span>
            <h2 className="font-display text-4xl md:text-5xl mt-4 text-foreground">
              Leidenschaft für <span className="text-primary">Perfektion</span>
            </h2>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-center"
          >
            <p className="text-muted-foreground text-lg leading-relaxed font-body">
              Mit jahrelanger Erfahrung und einem unermüdlichen Streben nach Exzellenz 
              widme ich mich der Kunst, außergewöhnliche Ergebnisse zu liefern. 
              Mein Anspruch ist es, höchste Standards zu setzen und diese konsequent zu übertreffen.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed font-body">
              Jedes Projekt wird mit der gleichen Hingabe und Präzision behandelt – 
              denn wahre Qualität zeigt sich in jedem einzelnen Detail.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-border"
          >
            {[
              { number: "15+", label: "Jahre Erfahrung" },
              { number: "200+", label: "Projekte" },
              { number: "100%", label: "Engagement" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
              <div className="font-display text-3xl md:text-4xl text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground text-sm tracking-wide uppercase font-body">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
