import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
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
      question: "Ist das System in Deutschland DSGVO-orientiert nutzbar?",
      answer: "Ja. Ich schaffe die technische Basis, damit Funnelmate unter Berücksichtigung gängiger Anforderungen der deutschen Datenschutzbestimmungen genutzt werden kann – beispielsweise durch Double-Opt-In-Verfahren. Wichtig: Dies stellt keine Rechtsberatung dar."
    },
    {
      question: "Ersetzt Funnelmate wirklich alle meine bisherigen Software-Abos?",
      answer: "In fast allen Fällen: Ja. Da Funnelmate die Infrastruktur von GoHighLevel nutzt, ersetzt es CRM, Mail-Tools, Funnel-Builder, Termin-Buchungssysteme und Kursplattformen."
    },
    {
      question: "Brauche ich technisches Vorwissen für die Bedienung?",
      answer: "Nein. Mein Ziel sind fertige Ready-to-use-Systeme. Du erhältst eine Einweisung in dein individuelles Setup, damit du die täglichen Aufgaben ohne IT-Kenntnisse im Griff hast."
    },
    {
      question: "Warum ein externer Admin statt offizieller GoHighLevel-Support?",
      answer: "Der offizielle Support ist englischsprachig und auf allgemeine Fragen ausgerichtet. Ich biete individuelle, deutschsprachige Lösungen, die exakt auf dein Business zugeschnitten sind."
    },
    {
      question: "Wie lange dauert eine komplette System-Einrichtung?",
      answer: "Das hängt vom Umfang ab. Ein Basis-Setup mit CRM, Kalender und E-Mail-Automatisierung ist in 1-2 Wochen erledigt. Komplexere Projekte mit Mitgliederbereichen und API-Integrationen brauchen 2-3 Wochen."
    },
    {
      question: "Kann ich Funnelmate mit meiner WordPress-Seite verbinden?",
      answer: "Ja, problemlos. Formulare, Kalender und Chat-Widgets lassen sich über einfache Code-Snippets einbinden. Falls du eine komplett neue Seite brauchst, kann ich diese auch direkt in Funnelmate erstellen."
    },
    {
      question: "Was sind Snapshots und warum sollten mich diese interessieren?",
      answer: "Snapshots sind fertige, branchenspezifische Templates. Statt bei Null anzufangen, bekommst du ein vorkonfiguriertes System, das ich genau an deine Bedürfnisse anpasse. Das spart Zeit und Kosten."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-muted/30">
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
              Hier findest du Antworten auf die häufigsten Fragen zu meiner Arbeit und Funnelmate.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-6 text-base md:text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
