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
        title="Marketing Automation Berater für Coaches | Gaetano Ficarra"
        description="Ich baue dir ein Marketing-System: CRM, Automationen und Follow-ups — fertig eingerichtet. Zertifizierter GoHighLevel Admin für Coaches & Berater."
        canonical="https://gaetanoficarra.de/"
        ogTitle="Marketing Automation Berater für Coaches | Gaetano Ficarra"
        ogDescription="Ich baue dir ein zentrales Marketing-System: CRM, Automationen und Follow-ups — fertig eingerichtet. Zertifizierter GoHighLevel Admin für Coaches & Berater."
        breadcrumbs={[
          { name: "Startseite", url: "https://gaetanoficarra.de/" },
        ]}
        jsonLd={[
          {
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "Für wen ist das Angebot geeignet?", "acceptedAnswer": { "@type": "Answer", "text": "Für selbstständige Coaches, Berater und Dienstleister die bereits Kunden haben und deren Prozesse noch manuell laufen. Wenn du gerade erst anfängst oder noch keine aktiven Kunden hast, bist du noch nicht an der richtigen Stelle für dieses Angebot." } },
              { "@type": "Question", "name": "Was genau baust du für mich?", "acceptedAnswer": { "@type": "Answer", "text": "Je nach Paket baue ich dir ein vollständiges CRM, automatisierte Lead-Pipelines, Follow-up-Sequenzen, ein automatisiertes Onboarding für neue Kunden und einen Funnel samt Landingpages. Alles auf Basis von GoHighLevel, dem All-in-One-System das ich für DACH-Kunden aufsetze und DSGVO-konform konfiguriere." } },
              { "@type": "Question", "name": "Wie lange dauert das Projekt?", "acceptedAnswer": { "@type": "Answer", "text": "In der Regel 2 Wochen vom Kickoff bis zum Go-Live. Voraussetzung ist, dass du im Kickoff-Gespräch klare Aussagen zu deinen Prozessen, Zielgruppen und Abläufen machen kannst. Je besser wir vorbereitet sind, desto schneller läuft es." } },
              { "@type": "Question", "name": "Ich habe bereits andere Tools im Einsatz, was passiert damit?", "acceptedAnswer": { "@type": "Answer", "text": "Bestehende Kontakte, Daten und Abläufe werden sauber migriert. Kein Datenverlust, kein Stillstand. Das ist fester Bestandteil jedes Projekts. Du musst nicht von null anfangen." } },
              { "@type": "Question", "name": "Was kostet das?", "acceptedAnswer": { "@type": "Answer", "text": "Das Starter-Paket beginnt bei 3.000 €, das Growth-Paket bei 4.500 € und das Full System ab 6.000 €. Alles einmalig, kein Abo. In der kostenlosen System-Analyse zeige ich dir welches Paket zu deiner Situation passt." } },
              { "@type": "Question", "name": "Muss ich mich mit GoHighLevel auskennen?", "acceptedAnswer": { "@type": "Answer", "text": "Nein. Du bekommst bei der Übergabe eine verständliche Einweisung in dein eigenes System. Ziel ist, dass du danach weißt wie du es nutzt nicht dass du ein Techniker wirst. Und danach ist Support inklusive." } },
              { "@type": "Question", "name": "Wie läuft die Zusammenarbeit ab?", "acceptedAnswer": { "@type": "Answer", "text": "Erstgespräch und System-Analyse, dann Strategie und Systemplan, dann Aufbau durch mich während du weiterarbeitest, dann Übergabe und Go-Live. Das wars. Kein langwieriges Hin-und-Her, keine wochenlangen Abstimmungsschleifen." } },
              { "@type": "Question", "name": "Ist GoHighLevel DSGVO-konform?", "acceptedAnswer": { "@type": "Answer", "text": "Mit der richtigen Konfiguration ja. Ich richte Server-Standort, Datenschutzeinstellungen und Datenverarbeitungsverträge von Anfang an korrekt ein. Das ist im DACH-Raum nicht optional, deshalb ist es bei mir fester Bestandteil jedes Setups." } },
              { "@type": "Question", "name": "Was passiert nach Go-Live?", "acceptedAnswer": { "@type": "Answer", "text": "Support ist kein Add-on sondern Pflichtbestandteil. Beim Starter und Growth-Paket 30 Tage, beim Full System 60 Tage. Wenn in dieser Zeit etwas nicht läuft, lösen wir es ohne extra Rechnung." } }
            ]
          },
          {
            "@type": "ProfessionalService",
            "@id": "https://gaetanoficarra.de/#service",
            "name": "Gaetano Ficarra",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "5",
              "bestRating": "5",
              "worstRating": "1"
            }
          }
        ]}
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
        
        {/* 5. Lösung - System und Nutzen erklären */}
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