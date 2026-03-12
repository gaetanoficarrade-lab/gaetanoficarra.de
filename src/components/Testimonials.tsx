import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Anna-Lena Hickmann",
    role: "Google Bewertung",
    text: "Tolle Erfahrung und ich kann Gaetano nur empfehlen! Er hat mir im 90 Minuten Beratungscall sauber und schnell erklärt und ich konnte direkt umsetzen. Das hätte mich sonst wahrscheinlich Stunden an Recherchearbeit und ganz viele Nerven gekostet. Die Kommunikation war auch schnell und ich bin sehr froh auch kurzfristig einen Termin bekommen zu haben :) Gaetano hat eine freundliche und unkomplizierte Art. Wenn ich ab jetzt ein Thema mit HighLevel / Stripe habe, weiß ich, wem ich als erstes schreibe.",
    rating: 5,
    image: "",
  },
  {
    name: "Monique King",
    role: "Google Bewertung",
    text: "Wir haben in den letzten Wochen intensiv geprüft, ob wir mit unserem Business zu GoHighLevel wechseln. In diesem Zusammenhang haben wir viele Gespräche mit sogenannten Expert:innen geführt, viele Versprechen gehört und unterschiedliche Modelle erklärt bekommen. Genau deshalb können wir sagen: Gaetano war für uns eine der wohltuendsten Erfahrungen in diesem Prozess. Er hängt nicht an irgendeiner Agenda, drängt nicht in eine Richtung. Stattdessen hört er wirklich zu, stellt kluge Fragen und gibt eine ehrliche Einschätzung. Fachlich ist er sehr gut aufgestellt. Keine unnötige Komplexität, keine Buzzwords, sondern konkrete Lösungen und saubere Strategien. Wir können Gaetano uneingeschränkt empfehlen.",
    rating: 5,
    image: "",
  },
  {
    name: "OCTA Steuerberater",
    role: "Google Bewertung",
    text: "Gaetano unterstützt unsere Kanzlei seit über zwei Jahren in den Bereichen IT, KI, Marketing sowie Social Media. Besonders bei der Optimierung von Prozessen in diesen Feldern bringt er viel Klarheit und Struktur hinein. Seine Ideen sind praxisnah, gut durchdacht und lassen sich im Kanzleialltag direkt umsetzen. Die Zusammenarbeit ist unkompliziert, verlässlich und bringt echten Mehrwert. Unsere Empfehlung geht klar raus.",
    rating: 5,
    image: "",
  },
];
const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 md:py-32 bg-card relative overflow-hidden" ref={ref}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm tracking-widest uppercase font-body">
            Kundenstimmen
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mt-4 text-foreground">
            Was meine <span className="text-gradient-primary">Kunden</span> sagen
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            {/* Quote icon */}
            <Quote className="absolute -top-6 -left-4 md:-left-8 w-12 h-12 md:w-16 md:h-16 text-primary/20" />
            
            {/* Testimonial Content */}
            <div className="bg-background border border-border rounded-lg p-8 md:p-12 relative overflow-hidden">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-lg md:text-xl text-foreground font-body leading-relaxed mb-8 italic">
                  "{testimonials[currentIndex].text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 bg-primary/10 flex items-center justify-center">
                    {testimonials[currentIndex].image ? (
                      <img 
                        src={testimonials[currentIndex].image} 
                        alt={testimonials[currentIndex].name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <span className="font-display text-primary text-lg">
                        {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="font-display text-foreground text-lg">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-muted-foreground text-sm font-body">
                      {testimonials[currentIndex].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border border-border hover:border-primary/50 flex items-center justify-center transition-colors duration-300"
                aria-label="Vorherige Bewertung"
              >
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-primary w-6' 
                        : 'bg-border hover:bg-primary/50'
                    }`}
                    aria-label={`Bewertung ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border border-border hover:border-primary/50 flex items-center justify-center transition-colors duration-300"
                aria-label="Nächste Bewertung"
              >
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;