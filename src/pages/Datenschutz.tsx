import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";

const Datenschutz = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Datenschutzerklärung | Gaetano Ficarra"
        description="Datenschutzerklärung von Gaetano Ficarra. Informationen zur Datenverarbeitung, Ihren Rechten und den eingesetzten Diensten."
        noIndex={true}
      />
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-12">
            <span className="text-primary">Datenschutz</span>erklärung
          </h1>
          
          <div className="prose prose-invert prose-gold max-w-none font-body text-muted-foreground space-y-8">
            <section>
              <h2 className="font-display text-2xl text-foreground mb-4">1. Datenschutz auf einen Blick</h2>
              <h3 className="font-display text-xl text-foreground mb-2">Allgemeine Hinweise</h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-4">2. Verantwortlicher</h2>
              <p>
                Verantwortlich für die Datenverarbeitung auf dieser Website ist:
              </p>
              <p className="mt-4">
                Gaetano Ficarra<br />
                Elverdisser Str. 51<br />
                33729 Bielefeld<br />
                <br />
                WhatsApp: 0152 23856537<br />
                E-Mail: kontakt@gaetanoficarra.de
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-4">3. Datenerfassung auf dieser Website</h2>
              <h3 className="font-display text-xl text-foreground mb-2">Hosting</h3>
              <p>
                Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. 
              </p>
              <p>
                Das Hosting erfolgt auf Basis von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren und effizienten Bereitstellung dieser Website).
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-4">4. Externe Dienste</h2>
              
              <h3 className="font-display text-xl text-foreground mb-2">HighLevel</h3>
              <p>
                Wir nutzen HighLevel für die Terminbuchung und Marketing-Automation. HighLevel ist ein US-amerikanischer Dienst. Die Datenübertragung in die USA erfolgt auf Grundlage der Standardvertragsklauseln der EU-Kommission.
              </p>

              <h3 className="font-display text-xl text-foreground mb-2 mt-6">Zahlungsabwicklung</h3>
              <p>
                Für die Zahlungsabwicklung nutzen wir Stripe, Digistore24 und/oder CopeCart. Diese Anbieter verarbeiten Ihre Zahlungsdaten gemäß deren eigenen Datenschutzbestimmungen.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-4">5. Ihre Rechte</h2>
              <p>
                Sie haben jederzeit das Recht:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Auskunft über Ihre gespeicherten personenbezogenen Daten zu erhalten</li>
                <li>Berichtigung unrichtiger Daten zu verlangen</li>
                <li>Löschung Ihrer Daten zu verlangen</li>
                <li>Die Verarbeitung Ihrer Daten einzuschränken</li>
                <li>Der Verarbeitung zu widersprechen</li>
                <li>Datenübertragbarkeit zu verlangen</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-4">6. Kontakt</h2>
              <p>
                Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden:
              </p>
              <p className="mt-4">
                E-Mail: kontakt@gaetanoficarra.de<br />
                WhatsApp: 0152 23856537
              </p>
            </section>

            <p className="text-sm text-muted-foreground mt-12">
              Stand: Januar 2025
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Datenschutz;
