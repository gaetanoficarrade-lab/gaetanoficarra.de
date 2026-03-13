import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

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
  {
    name: "Marion Pütz",
    role: "Google Bewertung",
    text: "Gaetano hat mir in einer ganz dringenden Situation eine super Lösung meines Problems erstellt. Und für mich abends noch einen Funnel zum Laufen gebracht. Danach hatte ich ein geniales Erklärungsvideo von Gaetano, bekommen, damit ich selber weiter den Funnel bearbeite, wenn ich es brauche. Ein dickes Dankeschön!",
    rating: 5,
    image: "",
  },
];

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

        {/* Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background border border-border rounded-lg p-8 relative overflow-hidden"
            >
              <Quote className="absolute -top-2 -left-2 w-12 h-12 text-primary/10" />

              {/* Stars */}
              <div className="flex gap-1 mb-4 relative z-10">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-foreground font-body leading-relaxed mb-6 italic relative z-10">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <span className="font-display text-primary text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-display text-foreground text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-muted-foreground text-xs font-body">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
