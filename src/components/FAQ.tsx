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
    question: "Was genau macht ein zertifizierter GoHighLevel Admin?",
    answer: "Ich bin der technische Architekt deines Business. Während andere nur die Oberfläche nutzen, baue ich im Hintergrund die Logik in Funnelmate: Komplexe Workflows, API-Verknüpfungen und Sales-Pipelines. Ich nehme dir die Technik ab, damit du dich auf dein Kerngeschäft konzentrieren kannst."
  },
  {
    question: "Ich nutze bereits Tools wie ClickFunnels oder ActiveCampaign. Kann ich meine Daten umziehen?",
    answer: "Ja, absolut. Ein Schwerpunkt meiner Arbeit ist die Migration. Ich helfe dir dabei, Kontakte, Tags und Listen sicher in dein neues Funnelmate-Setup (basierend auf GHL) zu übertragen – ohne Datenverlust oder Unterbrechung."
  },
  {
    question: "Ist das System in Deutschland DSGVO-konform nutzbar?",
    answer: "Ja. Ich unterstütze dich dabei, Funnelmate so zu konfigurieren, dass es den deutschen Datenschutzbestimmungen entspricht – von Double-Opt-In-Verfahren bis hin zu den korrekten AV-Verträgen."
  },
  {
    question: "Ersetzt Funnelmate wirklich alle meine bisherigen Software-Abos?",
    answer: "In fast allen Fällen: Ja. Da Funnelmate die Infrastruktur von GoHighLevel nutzt, ersetzt es CRM, Mail-Tools, Funnel-Builder, Termin-Buchungssysteme und Kursplattformen. Das spart massive monatliche Fixkosten."
  },
  {
    question: "Ich habe bereits eine SaaS-Agentur. Wie kannst du mein Team entlasten?",
    answer: "Für SaaS-Anbieter agiere ich als technischer Backbone. Ich übernehme das Onboarding, erstelle Master-Snapshots und löse komplexe Support-Anfragen, damit dein Team sich voll auf Sales und Wachstum konzentrieren kann."
  },
  {
    question: "Brauche ich technisches Vorwissen für die Bedienung?",
    answer: "Nein. Mein Ziel sind fertige Ready-to-use-Systeme. Du erhältst eine Einweisung in dein individuelles Setup, damit du die täglichen Aufgaben ohne IT-Kenntnisse im Griff hast, während ich die komplexe Logik im Hintergrund warte."
  },
  {
    question: "Was ist der Vorteil eines externen Admins gegenüber dem GHL-Standard-Support?",
    answer: "Der Standard-Support ist oft allgemein und auf Englisch. Ich biete dir individuelle, deutsche Lösungen, die genau auf deine Strategie zugeschnitten sind. Ich denke proaktiv mit, statt nur Tickets abzuarbeiten."
  },
  {
    question: "Wie lange dauert die Einrichtung eines kompletten Systems?",
    answer: "Ein Basis-Setup steht meist innerhalb einer Woche. Umfangreiche Migrationen oder komplexe Automatisierungsketten für Agenturen dauern in der Regel 2 bis 3 Wochen."
  },
  {
    question: "Kann ich meine bestehende Webseite (z. B. WordPress) anbinden?",
    answer: "Ja, das ist problemlos möglich. Wir integrieren Funnelmate-Elemente wie Formulare, Kalender oder Chat-Widgets einfach via Code-Snippet in deine aktuelle Seite."
  },
  {
    question: "Bietest du auch individuelle Snapshots oder Vorlagen an?",
    answer: "Ja, ich entwickle maßgeschneiderte GHL-Snapshots für verschiedene Branchen. Diese enthalten bereits fertige Funnels und Automatisierungen, die wir schnell an dein Branding in Funnelmate anpassen."
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
              Hier findest du Antworten auf die wichtigsten Fragen rund um Funnelmate, GoHighLevel und meine Dienstleistungen.
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
                    <span itemProp="text">{faq.answer}</span>
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
                href="https://wa.me/4915223856537?text=Hey%2C%20ich%20habe%20eine%20Frage%20zu%20deinen%20Leistungen."
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