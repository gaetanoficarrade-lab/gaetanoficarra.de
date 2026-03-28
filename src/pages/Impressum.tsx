import { Phone, Mail, MapPin } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Impressum = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Impressum | Gaetano Ficarra"
        description="Impressum von Gaetano Ficarra Angaben gemäß § 5 TMG. Kontakt, Adresse und rechtliche Informationen."
        noIndex={true}
      />
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-12">
            <span className="text-primary">Impressum</span>
          </h1>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <section>
                <h2 className="font-display text-2xl text-foreground mb-4">Angaben gemäß § 5 TMG</h2>
                <p className="font-body text-muted-foreground">
                  Gaetano Ficarra
                  <br />
                  Marketing-Systemberater für Selbstständige
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-4 flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  Anschrift
                </h2>
                <p className="font-body text-muted-foreground">
                  Elverdisser Str. 51
                  <br />
                  33729 Bielefeld
                  <br />
                  Deutschland
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-4 flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  Kontakt
                </h2>
                <p className="font-body text-muted-foreground">
                  WhatsApp:{" "}
                  <a
                    href="https://wa.me/4915223856537?text=Hey%2C%20ich%20bin%20an%20einer%20Zusammenarbeit%20mit%20dir%20interessiert%20und%20h%C3%A4tte%20gerne%20weitere%20Infos."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    0152 23856537
                  </a>
                </p>
                <p className="font-body text-muted-foreground mt-2">
                  E-Mail:{" "}
                  <a href="mailto:kontakt@gaetanoficarra.de" className="text-primary hover:underline">
                    kontakt@gaetanoficarra.de
                  </a>
                </p>
              </section>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="font-display text-2xl text-foreground mb-4">Berufsbezeichnung</h2>
                <p className="font-body text-muted-foreground">
                  Marketing-Systemberater
                  <br />
                  Zertifizierter HighLevel Admin
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-4">Streitschlichtung</h2>
                <p className="font-body text-muted-foreground text-sm">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                  <a
                    href="https://ec.europa.eu/consumers/odr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>
                </p>
                <p className="font-body text-muted-foreground text-sm mt-4">
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-4">Haftung für Inhalte</h2>
                <p className="font-body text-muted-foreground text-sm">
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
                  allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                  verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
                  forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Impressum;
