import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import gaetanoAbsage from "@/assets/gaetano-absage.png";

const Absage = () => {
  const whatsappNumber = "+4915223856537";
  const whatsappMessage = encodeURIComponent("Hi, ich hab eine Frage... bezüglich High Level.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <>
      <SEOHead
        title="Absage. Gaetano Ficarra"
        description="Diese Anfrage wurde leider abgelehnt. Kontaktiere Gaetano Ficarra per WhatsApp für weitere Informationen zu GoHighLevel & Funnelmate."
        noIndex={true}
      />
      <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-6 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <img
              src={gaetanoAbsage}
              alt="Gaetano Ficarra"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover object-top mx-auto border-2 border-[#D4A853]/50"
            />
          </motion.div>

          {/* Heading - Yellow/Gold */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-2xl md:text-3xl text-[#D4A853] mb-6"
          >
            Aktuell passt es leider nicht
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-400 font-body text-base md:text-lg mb-10 max-w-md mx-auto leading-relaxed"
          >
            Aber kein Problem, falls du trotzdem Fragen hast, schreib mir gerne per WhatsApp. 
            Ich beantworte sie persönlich und meist innerhalb weniger Stunden.
          </motion.p>

          {/* WhatsApp Button - Icon only style like in reference */}
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-col items-center gap-3 group"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#25D366] rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-[#25D366]/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 md:w-10 md:h-10 text-white"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <span className="text-gray-400 font-body text-sm md:text-base">
              Schick mir deine Frage gerne per WhatsApp
            </span>
          </motion.a>
        </motion.div>
      </div>
    </main>
    </>
  );
};

export default Absage;
