import { motion } from "framer-motion";
import portrait from "@/assets/gaetano-portrait.jpg";
import badge from "@/assets/ghl-badge.png";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
      
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(43_74%_49%/0.05)_0%,_transparent_70%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start text-left order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.a
              href="https://directory.gohighlevel.com/germany/bielefeld/certified-admins/gaetano-ficarra?from=badge"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <img 
                src={badge} 
                alt="GoHighLevel Certified Admin Badge" 
                className="h-20 md:h-24 w-auto hover:scale-105 transition-transform duration-300"
              />
            </motion.a>
            
            {/* Headline - Larger & More Impactful */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground mb-6 leading-[1.1]"
            >
              Skaliere dein Business mit smarten{" "}
              <span className="text-primary">HighLevel-Funnel</span> und{" "}
              <span className="text-primary">vollautomatisierten Prozessen</span>
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-body text-muted-foreground text-lg md:text-xl mb-10 max-w-xl leading-relaxed"
            >
              Ich begleite dich beim Umzug und Aufbau deines Marketing-Setups mit dem All-in-One-System von HighLevel. Damit dein Marketing automatisch Leads generiert und reibungslos läuft.
            </motion.p>
            
            {/* Premium CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="https://klick.gaetanoficarra.de/widget/booking/5s0iHWQ0crY7ogs9gviU"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-10 py-5 text-sm tracking-widest uppercase font-body text-white overflow-hidden rounded-sm transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, hsl(168 76% 48%), hsl(168 76% 42%), hsl(168 76% 36%))',
                  boxShadow: '0 0 30px hsl(168 76% 42% / 0.3), inset 0 1px 0 hsl(168 76% 60% / 0.3)'
                }}
              >
                <span className="relative z-10">Kostenloses Erstgespräch</span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
              <a
                href="/leistungen"
                className="group relative inline-flex items-center justify-center px-10 py-5 text-sm tracking-widest uppercase font-body text-foreground border border-silver/30 rounded-sm overflow-hidden transition-all duration-300 hover:border-silver/60 bg-card/50 backdrop-blur-sm"
              >
                <span className="relative z-10">Leistungen entdecken</span>
                <div className="absolute inset-0 bg-silver/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
            </motion.div>
          </motion.div>
          
          {/* Portrait Image - Larger */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center order-1 lg:order-2"
          >
            <div className="relative">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-platinum/10 rounded-full blur-3xl scale-110" />
              <img 
                src={portrait} 
                alt="Gaetano Ficarra" 
                className="relative w-80 h-80 md:w-[420px] md:h-[420px] lg:w-[500px] lg:h-[500px] object-cover object-top rounded-full border-4 border-primary/30 shadow-2xl animate-glow-pulse"
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border border-muted-foreground/30 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
