import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Orientation from "@/components/Orientation";
import Problem from "@/components/Problem";
import Guide from "@/components/Guide";
import Solution from "@/components/Solution";
import Migration from "@/components/Migration";
import Qualification from "@/components/Qualification";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* 1. Hero - Vision & Ergebnis */}
        <Hero />
        
        {/* 2. Orientierung - Für wen ist die Seite */}
        <Orientation />
        
        {/* 3. Problem - Kunde erkennt sich wieder */}
        <Problem />
        
        {/* 4. Guide - Positionierung als technischer Architekt */}
        <Guide />
        
        {/* 5. Lösung - Funnelmate funktional erklären */}
        <Solution />
        
        {/* 6. Alternativen & Migration */}
        <Migration />
        
        {/* 7. Zielgruppen-Qualifizierung */}
        <Qualification />
        
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