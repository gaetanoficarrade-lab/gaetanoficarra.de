import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import portrait from "@/assets/gaetano-portrait.jpg";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="über-mich" className="py-24 md:py-32 bg-card relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm tracking-widest uppercase font-body">
              Über Mich
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mt-4 text-foreground">
              Hey, ich bin <span className="text-gradient-primary">Gaetano</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-2xl scale-105" />
                <img 
                  src={portrait} 
                  alt="Gaetano Ficarra - Marketing-Systemberater aus Bielefeld" 
                  className="relative w-full max-w-md rounded-2xl border border-border shadow-xl"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="text-muted-foreground text-lg font-body leading-relaxed mb-6">
                Ich bin Gaetano Ficarra, Marketing-Systemberater aus Bielefeld. Seit über 3 Jahren arbeite ich ausschließlich mit GoHighLevel und habe Unternehmen dabei geholfen, ihr Marketing zu automatisieren und Zeit zu sparen.
              </p>
              
              <p className="text-muted-foreground text-lg font-body leading-relaxed mb-8">
                Mein Ziel ist es, dir ein System aufzubauen, das für dich arbeitet – damit du dich auf das konzentrieren kannst, was du am besten kannst: Dein Business.
              </p>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                {[
                  { number: "3+", label: "Jahre Erfahrung" },
                  { number: "100%", label: "HighLevel Fokus" },
                  { number: "✓", label: "Zertifiziert" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="font-display text-2xl md:text-3xl text-primary mb-1">
                      {stat.number}
                    </div>
                    <div className="text-muted-foreground text-xs tracking-wide uppercase font-body">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;