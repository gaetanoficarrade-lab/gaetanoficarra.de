import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Muss ich vorher Erfahrung mit HighLevel oder FunnelMate haben?",
    answer: "Nein, absolut nicht. Mein Service ist darauf ausgelegt, dir die Technik komplett abzunehmen. Wenn wir \"Done-For-You\" zusammenarbeiten, richte ich alles für dich ein. In der \"Done-With-You\" Variante zeige ich dir Schritt für Schritt, wie du das System bedienst, sodass du am Ende volle Kontrolle hast, ohne vorher Experte sein zu müssen."
  },
  {
    question: "Was passiert, wenn ich mehrere Tools gleichzeitig nutze?",
    answer: "Das ist genau das Problem, das wir lösen. GoHighLevel ersetzt Tools wie ActiveCampaign, ClickFunnels, Calendly und viele mehr. Wir ziehen deine Daten sicher um und konsolidieren alles in einem System. Das spart nicht nur Kosten, sondern eliminiert auch Fehlerquellen durch unzuverlässige Schnittstellen (Zaps)."
  },
  {
    question: "Wie lange dauert so ein Setup?",
    answer: "Das kommt auf den Umfang an. Ein Basis-Setup mit Funnel, E-Mail-Automation und CRM-Anbindung steht meist innerhalb von 2-4 Wochen. Komplexere Systeme mit Mitgliederbereichen oder tiefgehenden SaaS-Strukturen können etwas länger dauern. Im Erstgespräch gebe ich dir eine genaue Einschätzung."
  },
  {
    question: "Kann ich nur einzelne Prozesse einrichten lassen oder nur das komplette System?",
    answer: "Beides ist möglich. Viele Kunden starten mit einem spezifischen Problem (z.B. Lead-Qualifizierung) und erweitern das System später. Da HighLevel modular aufgebaut ist, können wir klein anfangen und gesund wachsen."
  },
  {
    question: "Lohnt sich der Einsatz für kleine Unternehmen?",
    answer: "Ja, gerade für kleine Teams oder Soloselbstständige ist Zeit die wertvollste Ressource. Automatisierung übernimmt die Aufgaben eines virtuellen Assistenten – 24/7 und fehlerfrei. Oft amortisieren sich die Kosten schon durch die Einsparung anderer Software-Abos."
  },
  {
    question: "Bekomme ich Schulung oder Support nach der Umsetzung?",
    answer: "Ich lasse dich nicht allein. Nach jedem Setup gibt es eine Übergabe und Einführung. Zudem biete ich regelmäßige Support-Calls an, in denen wir technische Fragen klären oder Strategien anpassen können."
  },
  {
    question: "Ist die Nutzung von GoHighLevel in Deutschland DSGVO-konform?",
    answer: "Ja, GoHighLevel kann DSGVO-konform genutzt werden. Es gibt Funktionen für Double-Opt-In, Cookie-Consent-Anbindungen und Auftragsverarbeitungsverträge (AVV). Ich unterstütze dich dabei, die technischen Einstellungen so zu wählen, dass sie den deutschen Datenschutzstandards entsprechen."
  },
  {
    question: "Warum sollte ich einen Experten für mein HighLevel-Setup buchen?",
    answer: "HighLevel ist extrem mächtig, kann aber am Anfang erschlagend wirken. Ein Experte spart dir Monate an Einarbeitungszeit und verhindert teure Fehler in der Automatisierung. Ich kenne die Best Practices und sorge dafür, dass dein System von Tag 1 an stabil und konvertierend läuft."
  },
  {
    question: "Wie erstelle ich einen WhatsApp Link für mein Marketing?",
    answer: "Dafür habe ich ein kostenloses Tool erstellt! Du findest meinen WhatsApp Link Generator direkt hier auf der Website. Einfach Nummer und Text eingeben und den Link sofort nutzen.",
    hasLink: true,
    linkText: "WhatsApp Link Generator",
    linkUrl: "/wa-generator"
  },
];

const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="py-32 bg-card relative" ref={ref} itemScope itemType="https://schema.org/FAQPage">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm tracking-widest uppercase font-body">
              FAQ
            </span>
            <h2 className="font-display text-4xl md:text-5xl mt-4 text-foreground">
              Häufig gestellte <span className="text-primary">Fragen</span>
            </h2>
            <p className="text-muted-foreground font-body mt-6 max-w-2xl mx-auto">
              Hier findest du Antworten auf die wichtigsten Fragen rund um GoHighLevel, Marketing-Automatisierung und meine Dienstleistungen.
            </p>
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-background border border-border rounded-lg px-6 data-[state=open]:border-primary/30"
                  itemScope 
                  itemProp="mainEntity" 
                  itemType="https://schema.org/Question"
                >
                  <AccordionTrigger className="font-display text-lg text-foreground hover:text-primary py-6 text-left">
                    <span itemProp="name">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent 
                    className="text-muted-foreground font-body leading-relaxed pb-6"
                    itemScope 
                    itemProp="acceptedAnswer" 
                    itemType="https://schema.org/Answer"
                  >
                    <span itemProp="text">
                      {faq.answer}
                      {faq.hasLink && (
                        <>
                          {" "}
                          <Link to={faq.linkUrl || "#"} className="text-primary hover:underline">
                            → {faq.linkText}
                          </Link>
                        </>
                      )}
                    </span>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground font-body">
              Deine Frage ist nicht dabei?{" "}
              <a
                href="https://wa.me/4915231039640"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Schreib mir auf WhatsApp →
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;