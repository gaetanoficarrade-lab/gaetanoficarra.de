import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marco S.",
    role: "Agenturinhaber",
    text: "Gaetano hat mein komplettes HighLevel Setup übernommen und innerhalb von 2 Wochen war alles startklar. Seitdem laufen meine Automationen reibungslos und ich spare jeden Tag mehrere Stunden.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Julia K.",
    role: "Online-Unternehmerin",
    text: "Die Done-With-You Sessions waren genau das Richtige für mich. Ich wollte verstehen, was ich tue und nicht nur ein fertiges System haben. Gaetano hat mir alles geduldig erklärt.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Thomas M.",
    role: "Berater",
    text: "Endlich ein Partner, der versteht, was ich brauche. Gaetano hat mein komplettes System strukturiert und aufgeräumt. Jetzt weiß ich immer, wo was ist.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Sarah L.",
    role: "Coach & Beraterin",
    text: "Endlich jemand, der HighLevel wirklich versteht! Kein Blabla, sondern handfeste Lösungen. Mein Funnel konvertiert jetzt doppelt so gut wie vorher.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Patrick R.",
    role: "Marketing-Berater",
    text: "Der Support-Call hat mir Stunden an Recherche erspart. Gaetano hat mein Problem in 20 Minuten gelöst, wofür ich selbst Tage gebraucht hätte.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
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
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                    <img 
                      src={testimonials[currentIndex].image} 
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
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