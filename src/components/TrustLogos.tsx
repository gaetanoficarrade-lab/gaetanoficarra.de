import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import gohighlevelLogo from "@/assets/gohighlevel-logo.jpg";
import funnelmateLogo from "@/assets/funnelmate-logo.png";
import funnelmateCertifiedExpert from "@/assets/funnelmate-certified-expert.png";
import patrickMentlerLogo from "@/assets/patrick-mentler-logo.png";
import octaLogo from "@/assets/octa-logo.png";
import cssIcon from "@/assets/css-icon.png";
import htmlIcon from "@/assets/html-icon.png";

const partners = [
  {
    name: "GoHighLevel",
    logo: gohighlevelLogo,
    url: "https://www.gohighlevel.com/?fp_ref=gaetano62",
  },
  {
    name: "Funnelmate",
    logo: funnelmateLogo,
    url: "https://funnelmate.io/?am_id=gaetano",
  },
  {
    name: "Funnelmate Certified Expert",
    logo: funnelmateCertifiedExpert,
    url: "https://funnelmate.io/?am_id=gaetano",
  },
  {
    name: "Patrick Mentler",
    logo: patrickMentlerLogo,
    url: "https://funnelmate.io/?am_id=gaetano",
  },
  {
    name: "OCTA Steuerberater",
    logo: octaLogo,
    url: "#",
  },
  {
    name: "HTML5",
    logo: htmlIcon,
    url: "#",
  },
  {
    name: "CSS3",
    logo: cssIcon,
    url: "#",
  },
];

const TrustLogos = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Double the partners array for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-12 md:py-16 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="text-muted-foreground text-xs md:text-sm tracking-widest uppercase font-body">
            Bekannt aus & Partner
          </span>
        </motion.div>

        {/* Infinite scrolling logo slider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative overflow-hidden"
        >
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling container */}
          <motion.div
            className="flex items-center gap-12 md:gap-16"
            animate={{
              x: [0, -50 * partners.length * 3],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {duplicatedPartners.map((partner, index) => {
              // Size categories for logos
              const isOctaLogo = partner.name === "OCTA Steuerberater";
              const isLargeLogo = partner.name === "Funnelmate Certified Expert";
              const isMediumLogo = partner.name === "GoHighLevel" || partner.name === "HTML5" || partner.name === "CSS3" || partner.name === "Patrick Mentler" || partner.name === "Funnelmate";
              
              let sizeClass = 'h-12 md:h-14 lg:h-16'; // default
              if (isOctaLogo) {
                sizeClass = 'h-16 md:h-20 lg:h-24'; // OCTA bigger
              } else if (isLargeLogo) {
                sizeClass = 'h-14 md:h-18 lg:h-20'; // Funnelmate Certified Expert
              } else if (isMediumLogo) {
                sizeClass = 'h-10 md:h-12 lg:h-14'; // Funnelmate, Patrick Mentler, GHL, HTML, CSS smaller
              }
              
              return (
                <a
                  key={`${partner.name}-${index}`}
                  href={partner.url}
                  target={partner.url !== "#" ? "_blank" : undefined}
                  rel={partner.url !== "#" ? "noopener noreferrer" : undefined}
                  className="flex-shrink-0 transition-all duration-300 hover:scale-110"
                  title={partner.name}
                >
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} Logo`}
                    className={`w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 ${sizeClass}`}
                  />
                </a>
              );
            })}
          </motion.div>
        </motion.div>

        {/* SEO hidden text */}
        <div className="sr-only">
          <p>GoHighLevel Partner Bielefeld, Funnelmate Experte Deutschland, HighLevel Agentur NRW, Marketing Automatisierung, CRM Beratung, Funnel Builder, Online Marketing Bielefeld, Patrick Mentler Partner, OCTA Steuerberater, HTML5 CSS3 Webentwicklung</p>
        </div>
      </div>
    </section>
  );
};

export default TrustLogos;