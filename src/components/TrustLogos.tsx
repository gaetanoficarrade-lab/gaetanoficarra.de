import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import gohighlevelLogo from "@/assets/gohighlevel-logo.jpg";
import gohighlevelLogoWebp from "@/assets/gohighlevel-logo.webp";
import gohighlevelLogoAvif from "@/assets/gohighlevel-logo.avif";
import funnelmateLogo from "@/assets/funnelmate-logo.png";
import funnelmateLogoWebp from "@/assets/funnelmate-logo.webp";
import funnelmateLogoAvif from "@/assets/funnelmate-logo.avif";
import funnelmateCertifiedExpert from "@/assets/funnelmate-certified-expert.png";
import funnelmateCertifiedExpertWebp from "@/assets/funnelmate-certified-expert.webp";
import funnelmateCertifiedExpertAvif from "@/assets/funnelmate-certified-expert.avif";
import patrickMentlerLogo from "@/assets/patrick-mentler-logo.png";
import patrickMentlerLogoWebp from "@/assets/patrick-mentler-logo.webp";
import patrickMentlerLogoAvif from "@/assets/patrick-mentler-logo.avif";
import octaLogo from "@/assets/octa-logo.png";
import octaLogoWebp from "@/assets/octa-logo.webp";
import octaLogoAvif from "@/assets/octa-logo.avif";
import Picture from "@/components/Picture";

const partners = [
  { name: "GoHighLevel", alt: "GoHighLevel zertifizierter Partner", logo: gohighlevelLogo, webp: gohighlevelLogoWebp, avif: gohighlevelLogoAvif, w: 200, h: 80, url: "https://www.gohighlevel.com/?fp_ref=gaetano62" },
  { name: "Funnelmate", alt: "Funnelmate White-Label Partner", logo: funnelmateLogo, webp: funnelmateLogoWebp, avif: funnelmateLogoAvif, w: 200, h: 80, url: "https://funnelmate.io/?am_id=gaetano" },
  { name: "Funnelmate Certified Expert", alt: "Funnelmate Certified Expert Badge", logo: funnelmateCertifiedExpert, webp: funnelmateCertifiedExpertWebp, avif: funnelmateCertifiedExpertAvif, w: 400, h: 160, url: "https://funnelmate.io/?am_id=gaetano" },
  { name: "Patrick Mentler", alt: "Patrick Mentler Funnelmate Gründer", logo: patrickMentlerLogo, webp: patrickMentlerLogoWebp, avif: patrickMentlerLogoAvif, w: 200, h: 80, url: "https://funnelmate.io/?am_id=gaetano" },
  { name: "OCTA Steuerberater", alt: "OCTA Steuerberater Bielefeld Kundenprojekt", logo: octaLogo, webp: octaLogoWebp, avif: octaLogoAvif, w: 400, h: 160, url: "#" },
];

const TrustLogos = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative overflow-hidden"
        >
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <motion.div
            className="flex items-center gap-12 md:gap-16"
            animate={{ x: [0, -50 * partners.length * 3] }}
            transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 25, ease: "linear" } }}
          >
            {duplicatedPartners.map((partner, index) => {
              const isOctaLogo = partner.name === "OCTA Steuerberater";
              const isLargeLogo = partner.name === "Funnelmate Certified Expert";
              const isMediumLogo = partner.name === "GoHighLevel" || partner.name === "Patrick Mentler" || partner.name === "Funnelmate";
              
              let sizeClass = 'h-12 md:h-14 lg:h-16';
              if (isOctaLogo) sizeClass = 'h-16 md:h-20 lg:h-24';
              else if (isLargeLogo) sizeClass = 'h-14 md:h-18 lg:h-20';
              else if (isMediumLogo) sizeClass = 'h-10 md:h-12 lg:h-14';
              
              return (
                <a
                  key={`${partner.name}-${index}`}
                  href={partner.url}
                  target={partner.url !== "#" ? "_blank" : undefined}
                  rel={partner.url !== "#" ? "noopener noreferrer" : undefined}
                  className="flex-shrink-0 transition-all duration-300 hover:scale-110"
                  title={partner.name}
                >
                  <Picture
                    src={partner.logo}
                    webp={partner.webp}
                    avif={partner.avif}
                    alt={partner.alt}
                    width={partner.w}
                    height={partner.h}
                    className={`w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 ${sizeClass}`}
                  />
                </a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustLogos;
