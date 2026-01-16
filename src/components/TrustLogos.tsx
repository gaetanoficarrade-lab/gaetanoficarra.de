import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import gohighlevelLogo from "@/assets/gohighlevel-logo.jpg";
import funnelmateLogo from "@/assets/funnelmate-logo.png";
import funnelmateExperte from "@/assets/funnelmate-experte.png";
import patrickMentlerLogo from "@/assets/patrick-mentler-logo.png";
import octaLogo from "@/assets/octa-logo.png";

const partners = [
  {
    name: "GoHighLevel",
    logo: gohighlevelLogo,
    url: "https://www.gohighlevel.com/?fp_ref=gaetano62",
    description: "All-in-One Marketing Plattform"
  },
  {
    name: "Funnelmate",
    logo: funnelmateLogo,
    url: "https://funnelmate.io/?am_id=gaetano",
    description: "HighLevel für Deutschland"
  },
  {
    name: "Funnelmate Experte",
    logo: funnelmateExperte,
    url: "https://funnelmate.io/?am_id=gaetano",
    description: "Zertifizierter Experte"
  },
  {
    name: "Patrick Mentler",
    logo: patrickMentlerLogo,
    url: "https://funnelmate.io/?am_id=gaetano",
    description: "Partner & Experte"
  },
  {
    name: "OCTA Steuerberater",
    logo: octaLogo,
    url: "#",
    description: "Referenzkunde"
  },
];

const TrustLogos = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-muted-foreground text-sm tracking-widest uppercase font-body">
            Bekannt aus & Partner
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
        >
          {partners.map((partner, index) => (
            <motion.a
              key={partner.name}
              href={partner.url}
              target={partner.url !== "#" ? "_blank" : undefined}
              rel={partner.url !== "#" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="group flex flex-col items-center"
              title={`${partner.name} - ${partner.description}`}
            >
              <div className="px-6 py-4 border border-border rounded-lg bg-card/50 backdrop-blur-sm group-hover:border-primary/30 transition-all duration-300 flex items-center justify-center h-20 min-w-[140px]">
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} Logo`}
                  className="max-h-12 max-w-[120px] object-contain filter brightness-100 group-hover:brightness-110 transition-all"
                />
              </div>
              <span className="text-muted-foreground text-xs mt-2 font-body opacity-0 group-hover:opacity-100 transition-opacity">
                {partner.description}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Keywords for SEO - visually hidden but present in HTML */}
        <div className="sr-only">
          <p>GoHighLevel Partner Bielefeld, Funnelmate Experte, HighLevel Agentur Deutschland, Marketing Automatisierung NRW, CRM System Beratung, Funnel Builder Experte, Online Marketing Bielefeld, Digital Marketing Automatisierung, Lead Generation Experte, Sales Funnel Spezialist, Patrick Mentler Partner, OCTA Steuerberater</p>
        </div>
      </div>
    </section>
  );
};

export default TrustLogos;