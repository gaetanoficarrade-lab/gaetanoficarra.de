import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import gohighlevelLogo from "@/assets/gohighlevel-logo.jpg";
import funnelmateLogo from "@/assets/funnelmate-logo.png";
import funnelmateExperte from "@/assets/funnelmate-experte.png";
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
    name: "Funnelmate Experte",
    logo: funnelmateExperte,
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

        {/* Clean logo row - no boxes, just logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-6 md:gap-10 lg:gap-14"
        >
          {partners.map((partner, index) => (
            <motion.a
              key={partner.name}
              href={partner.url}
              target={partner.url !== "#" ? "_blank" : undefined}
              rel={partner.url !== "#" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group transition-all duration-300 hover:scale-110"
              title={partner.name}
            >
              <img 
                src={partner.logo} 
                alt={`${partner.name} Logo`}
                className="h-10 md:h-12 lg:h-14 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.a>
          ))}
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