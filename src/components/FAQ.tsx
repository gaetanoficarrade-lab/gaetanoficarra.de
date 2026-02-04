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
      question: "Brauche ich technisches Vorwissen für die Bedienung?",
      answer: "Nein. Du musst kein technisches Vorwissen mitbringen. Ich richte das System so ein, dass es für dich verständlich und nutzbar ist. Du bekommst eine Einführung und auf Wunsch auch weitere Unterstützung, falls später Fragen auftauchen."
    },
    {
      question: "Ich nutze bereits Tools wie ClickFunnels oder ActiveCampaign. Kann ich meine Daten umziehen?",
      answer: "Ja. Bestehende Kontakte, Listen, Tags, Automationen und grundlegende Strukturen können in der Regel übernommen werden. Die Migration erfolgt geplant und kontrolliert, sodass dein laufendes Business davon nicht beeinträchtigt wird."
    },
    {
      question: "Ist das System in Deutschland DSGVO-orientiert nutzbar?",
      answer: "Ja. Die technische Plattform erfüllt mit Zertifizierungen wie ISO 27001 hohe Sicherheitsstandards. Entscheidend ist jedoch immer die korrekte Nutzung. Ich achte bei der Einrichtung darauf, dass Prozesse, Datenflüsse und Einstellungen DSGVO-orientiert umgesetzt werden. Die rechtliche Verantwortung liegt am Ende beim Nutzer, wie bei jedem anderen Tool auch."
    },
    {
      question: "Ersetzt Funnelmate wirklich alle meine bisherigen Software-Abos?",
      answer: "In den meisten Fällen ja. Funnelmate ersetzt typischerweise CRM-Systeme, E-Mail-Tools, Funnel-Builder, Terminbuchungssysteme und einfache Kursplattformen. Spezialtools können im Einzelfall weiterhin sinnvoll sein, sind aber oft nicht mehr notwendig."
    },
    {
      question: "Wie lange dauert eine komplette System-Einrichtung?",
      answer: "Das hängt vom Umfang ab. Ein Basis-Setup mit CRM, Kalender und E-Mail-Automatisierung ist meist innerhalb von ein bis zwei Wochen umgesetzt. Größere Setups mit Mitgliedsbereichen oder Integrationen benötigen entsprechend mehr Zeit. Die grundlegende Struktur steht jedoch oft schon nach wenigen Tagen."
    },
    {
      question: "Warum ein externer Admin statt offizieller GoHighLevel-Support?",
      answer: "Der offizielle Support ist englischsprachig und auf allgemeine Fragen ausgerichtet. Ich biete dir eine individuelle, deutschsprachige Umsetzung, die direkt auf dein Business zugeschnitten ist. Außerdem bekommst du nicht nur Antworten, sondern konkrete Lösungen, die ich auch umsetze – und das in der Regel deutlich schneller."
    },
    {
      question: "Was genau macht ein zertifizierter GoHighLevel Admin?",
      answer: "Ich bin der technische Architekt deines Systems. Ich plane und baue die Logik im Hintergrund: Workflows, Automationen, Pipelines und Integrationen. Du nutzt am Ende ein funktionierendes System, ohne dich mit der Technik beschäftigen zu müssen."
    },
    {
      question: "Kann ich Funnelmate mit meiner WordPress-Seite verbinden?",
      answer: "Ja, problemlos. Formulare, Kalender oder andere Elemente lassen sich einfach in bestehende WordPress-Seiten integrieren. Alternativ können Seiten auch direkt innerhalb des Systems abgebildet werden, wenn das sinnvoll ist."
    },
    {
      question: "Was sind Snapshots und warum sollten mich diese interessieren?",
      answer: "Snapshots sind vorbereitete Systemstrukturen und Abläufe. Für dich als Nutzer sind sie kein Thema im Alltag. Relevant ist nur, dass dein System schneller, sauberer und erprobt aufgebaut wird, statt bei null zu starten."
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
