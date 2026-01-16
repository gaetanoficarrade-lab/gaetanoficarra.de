import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustLogos from "@/components/TrustLogos";
import Services from "@/components/Services";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* 1. Hero - Aufmerksamkeit & Hauptnutzen */}
        <Hero />
        
        {/* 2. Trust Logos - Sofortige Vertrauenssignale */}
        <TrustLogos />
        
        {/* 3. Services - Was du bekommst (Lösung) */}
        <Services />
        
        {/* 4. Kontakt - Primärer Call to Action */}
        <Contact />
        
        {/* 5. Über mich - Wer dahinter steht */}
        <About />
        
        {/* 6. FAQ - Letzte Fragen klären */}
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
