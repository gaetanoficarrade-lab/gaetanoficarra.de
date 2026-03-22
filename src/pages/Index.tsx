import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustLogos from "@/components/TrustLogos";
import Orientation from "@/components/Orientation";
import Problem from "@/components/Problem";
import Guide from "@/components/Guide";
import Solution from "@/components/Solution";
import Services from "@/components/Services";
import Timeline from "@/components/Timeline";
import Migration from "@/components/Migration";
import Qualification from "@/components/Qualification";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Marketing Automation Berater für Selbstständige | Gaetano Ficarra"
        description="Ich baue dir ein zentrales Marketing-System: Leads, Termine und Follow-ups — automatisiert, ohne Tool-Chaos. Zertifizierter Admin aus Bielefeld für Coaches, Berater und Dienstleister."
        canonical="https://gaetanoficarra.de/"
        ogTitle="Marketing Automation Berater für Selbstständige | Gaetano Ficarra"
        ogDescription="Ich baue dir ein zentrales Marketing-System: Leads, Termine und Follow-ups — automatisiert, ohne Tool-Chaos."
        breadcrumbs={[
          { name: "Startseite", url: "https://gaetanoficarra.de/" },
        ]}
        jsonLd={{
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Brauche ich technisches Vorwissen für die Bedienung?", "acceptedAnswer": { "@type": "Answer", "text": "Nein. Du musst kein technisches Vorwissen mitbringen. Ich richte das System so ein, dass es für dich verständlich und nutzbar ist. Du bekommst eine Einführung und auf Wunsch auch weitere Unterstützung." } },
            { "@type": "Question", "name": "Ich nutze bereits Tools wie ClickFunnels oder ActiveCampaign. Kann ich meine Daten umziehen?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Bestehende Kontakte, Listen, Tags und Automationen können in der Regel übernommen werden. Die Migration erfolgt geplant und kontrolliert." } },
            { "@type": "Question", "name": "Ist das System in Deutschland DSGVO-orientiert nutzbar?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Die Plattform erfüllt mit Zertifizierungen wie ISO 27001 hohe Sicherheitsstandards. Ich achte bei der Einrichtung darauf, dass Prozesse und Datenflüsse DSGVO-orientiert umgesetzt werden." } },
            { "@type": "Question", "name": "Ersetzt Funnelmate wirklich alle meine bisherigen Software-Abos?", "acceptedAnswer": { "@type": "Answer", "text": "In den meisten Fällen ja. Funnelmate ersetzt typischerweise CRM-Systeme, E-Mail-Tools, Funnel-Builder, Terminbuchungssysteme und einfache Kursplattformen." } },
            { "@type": "Question", "name": "Wie lange dauert eine komplette System-Einrichtung?", "acceptedAnswer": { "@type": "Answer", "text": "Ein Basis-Setup mit CRM, Kalender und E-Mail-Automatisierung ist meist innerhalb von ein bis zwei Wochen umgesetzt. Die grundlegende Struktur steht oft schon nach wenigen Tagen." } },
            { "@type": "Question", "name": "Warum ein externer Admin statt offizieller GoHighLevel-Support?", "acceptedAnswer": { "@type": "Answer", "text": "Der offizielle Support ist englischsprachig und auf allgemeine Fragen ausgerichtet. Ich biete individuelle, deutschsprachige Umsetzung direkt auf dein Business zugeschnitten – mit konkreten Lösungen, die ich auch umsetze." } },
            { "@type": "Question", "name": "Was genau macht ein zertifizierter GoHighLevel Admin?", "acceptedAnswer": { "@type": "Answer", "text": "Ich bin der technische Architekt deines Systems. Ich plane und baue Workflows, Automationen, Pipelines und Integrationen. Du nutzt am Ende ein funktionierendes System, ohne dich mit der Technik beschäftigen zu müssen." } },
            { "@type": "Question", "name": "Kann ich Funnelmate mit meiner WordPress-Seite verbinden?", "acceptedAnswer": { "@type": "Answer", "text": "Ja, problemlos. Formulare, Kalender und andere Elemente lassen sich einfach in bestehende WordPress-Seiten integrieren." } },
            { "@type": "Question", "name": "Was sind Snapshots und warum sollten mich diese interessieren?", "acceptedAnswer": { "@type": "Answer", "text": "Snapshots sind vorbereitete Systemstrukturen. Dein System wird dadurch schneller, sauberer und erprobt aufgebaut, statt bei null zu starten." } }
          ]
        }}
      />
      <Header />
      <main>
        {/* 1. Hero - Vision & Ergebnis */}
        <Hero />
        
        {/* Trust Logos - Glaubwürdigkeit */}
        <TrustLogos />
        
        {/* 2. Orientierung - Für wen ist die Seite */}
        <Orientation />
        
        {/* 3. Problem - Kunde erkennt sich wieder */}
        <Problem />
        
        {/* 4. Guide - Positionierung als technischer Architekt */}
        <Guide />
        
        {/* 5. Lösung - Funnelmate funktional erklären */}
        <Solution />
        
        {/* Leistungen - Oberflächliche Übersicht */}
        <Services />
        
        {/* Zeitstrahl - Ablauf visualisieren */}
        <Timeline />
        
        {/* 6. Alternativen & Migration */}
        <Migration />
        
        {/* 7. Zielgruppen-Qualifizierung */}
        <Qualification />
        
        {/* Testimonials - Social Proof */}
        <Testimonials />
        
        {/* 8. FAQ - Einwände abbauen */}
        <FAQ />
        
        {/* 9. Abschluss-CTA - System-Analyse */}
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;