import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";

const AGB = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Allgemeine Geschäftsbedingungen | Gaetano Ficarra"
        description="Allgemeine Geschäftsbedingungen von Gaetano Ficarra. Geltungsbereich, Leistungsumfang, Vergütung und mehr."
        noIndex={true}
      />
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-12">
            Allgemeine <span className="text-primary">Geschäftsbedingungen</span>
          </h1>
          
          <div className="prose prose-invert prose-gold max-w-none font-body text-muted-foreground space-y-8">
            <section>
              <h2 className="font-display text-2xl text-foreground mb-4">§1 Geltungsbereich</h2>
              <p>
                Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen Gaetano Ficarra (nachfolgend "Anbieter") und seinen Kunden (nachfolgend "Auftraggeber") über Beratungsleistungen im Bereich Marketing-Automation und Systemberatung.
              </p>
              <p>
                Das Angebot richtet sich ausschließlich an Unternehmer im Sinne des §14 BGB.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-4">§2 Leistungsumfang</h2>
              <p>
                Der Umfang der Leistungen ergibt sich aus der jeweiligen Leistungsbeschreibung bzw. dem individuellen Angebot. Der Anbieter erbringt folgende Leistungen:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Marketing-Automation und Strategieberatung</li>
                <li>Einrichtung und Konfiguration von HighLevel/Funnelmate</li>
                <li>Erstellung von Funnels und Automationen</li>
                <li>Support und Schulungen</li>
                <li>Migration bestehender Systeme</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-4">§3 Vertragsschluss</h2>
              <p>
                Der Vertrag kommt durch Annahme des Angebots des Anbieters durch den Auftraggeber zustande. Die Annahme kann durch schriftliche Bestätigung, E-Mail oder Buchung über die Website erfolgen.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-4">§4 Vergütung und Zahlung</h2>
              <p>
                Die Vergütung richtet sich nach dem vereinbarten Angebot. Sofern nichts anderes vereinbart ist, sind Rechnungen innerhalb von 14 Tagen nach Rechnungsstellung ohne Abzug zu zahlen.
              </p>
              <p>
                Support-Calls werden mit 250 € pro Stunde berechnet und sind vor der Leistungserbringung zu bezahlen.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-4">§5 Mitwirkungspflichten</h2>
              <p>
                Der Auftraggeber stellt dem Anbieter alle für die Durchführung des Auftrags erforderlichen Unterlagen, Informationen und Zugänge rechtzeitig zur Verfügung.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-4">§6 Haftung</h2>
              <p>
                Der Anbieter haftet unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit sowie für vorsätzlich oder grob fahrlässig verursachte Schäden. Im Übrigen ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-4">§7 Vertraulichkeit</h2>
              <p>
                Beide Parteien verpflichten sich, alle im Rahmen der Zusammenarbeit erlangten vertraulichen Informationen vertraulich zu behandeln.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-4">§8 Schlussbestimmungen</h2>
              <p>
                Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist Bielefeld, sofern der Auftraggeber Kaufmann ist.
              </p>
              <p>
                Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
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

export default AGB;
