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