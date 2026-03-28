import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "Für wen ist das Angebot geeignet?",
      answer:
        "Für selbstständige Coaches, Berater und Dienstleister die bereits Kunden haben und deren Prozesse noch manuell laufen. Wenn du gerade erst anfängst oder noch keine aktiven Kunden hast, bist du noch nicht an der richtigen Stelle für dieses Angebot.",
    },
    {
      question: "Was genau baust du für mich?",
      answer:
        "Je nach Paket baue ich dir ein vollständiges CRM, automatisierte Lead-Pipelines, Follow-up-Sequenzen, ein automatisiertes Onboarding für neue Kunden und einen Funnel samt Landingpages. Alles auf Basis von GoHighLevel, dem All-in-One-System das ich für DACH-Kunden aufsetze und DSGVO-konform konfiguriere.",
    },
    {
      question: "Wie lange dauert das Projekt?",
      answer:
        "In der Regel 2 Wochen vom Kickoff bis zum Go-Live. Voraussetzung ist, dass du im Kickoff-Gespräch klare Aussagen zu deinen Prozessen, Zielgruppen und Abläufen machen kannst. Je besser wir vorbereitet sind, desto schneller läuft es.",
    },
    {
      question: "Ich habe bereits andere Tools im Einsatz, was passiert damit?",
      answer:
        "Bestehende Kontakte, Daten und Abläufe werden sauber migriert. Kein Datenverlust, kein Stillstand. Das ist fester Bestandteil jedes Projekts. Du musst nicht von null anfangen.",
    },
    {
      question: "Was kostet das?",
      answer:
        "Das Starter-Paket beginnt bei 3.000 €, das Growth-Paket bei 4.500 € und das Full System ab 6.000 €. Alles einmalig, kein Abo. In der kostenlosen System-Analyse zeige ich dir welches Paket zu deiner Situation passt.",
    },
    {
      question: "Muss ich mich mit GoHighLevel auskennen?",
      answer:
        "Nein. Du bekommst bei der Übergabe eine verständliche Einweisung in dein eigenes System. Ziel ist, dass du danach weißt wie du es nutzt nicht dass du ein Techniker wirst. Und danach ist Support inklusive.",
    },
    {
      question: "Wie läuft die Zusammenarbeit ab?",
      answer:
        "Erstgespräch und System-Analyse, dann Strategie und Systemplan, dann Aufbau durch mich während du weiterarbeitest, dann Übergabe und Go-Live. Das wars. Kein langwieriges Hin-und-Her, keine wochenlangen Abstimmungsschleifen.",
    },
    {
      question: "Ist GoHighLevel DSGVO-konform?",
      answer:
        "Mit der richtigen Konfiguration ja. Ich richte Server-Standort, Datenschutzeinstellungen und Datenverarbeitungsverträge von Anfang an korrekt ein. Das ist im DACH-Raum nicht optional, deshalb ist es bei mir fester Bestandteil jedes Setups.",
    },
    {
      question: "Was passiert nach Go-Live?",
      answer:
        "Support ist kein Add-on sondern Pflichtbestandteil. Beim Starter und Growth-Paket 30 Tage, beim Full System 60 Tage. Wenn in dieser Zeit etwas nicht läuft, lösen wir es ohne extra Rechnung.",
    },
  ];

  return (
    <section id="faq" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-primary mb-4">
              <HelpCircle className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Häufige Fragen</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Deine <span className="text-gradient-primary">Fragen</span>, meine Antworten
            </h2>
            <p className="text-muted-foreground text-lg">
              Hier findest du Antworten auf die häufigsten Fragen zu meiner Arbeit und dem Systemaufbau mit GoHighLevel.
            </p>
          </div>

          <div className="glass-card p-2 md:p-4">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-white/30">
                  <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-6 text-base md:text-lg font-medium px-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 px-4">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
