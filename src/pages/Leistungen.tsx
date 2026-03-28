import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { CheckCircle, ArrowRight, Headphones, Repeat, TrendingUp, Building2, Rocket, Zap, Crown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useQuizModal } from "@/context/QuizModalContext";

const mainServices = [
  {
    title: "Starter",
    tagline: "der erste Schritt raus aus dem manuellen Alltag",
    duration: "ca. 2 Wochen | Einmaliges Projekt, kein Abo",
    description:
      "Du willst anfangen, ohne gleich alles auf einmal umzubauen. Ich richte dir ein sauberes System mit CRM und einer Kernautomatisierung ein die sofort Zeit spart. Richtig für dich wenn du noch kein System hast – oder von einem anderen Tool wechselst und einen sauberen, soliden Einstieg willst.",
    features: [
      "Vollständiges System-Setup (CRM, Pipelines, Lead-Struktur)",
      "Eine zentrale Automatisierung nach deinen Prozessen",
      "Terminbuchung und Kalender-Integration",
      "Einweisung und Übergabe du verstehst was läuft und warum",
      "30 Tage Support nach Go-Live",
    ],
    price: "ab 3.000 €",
    popular: false,
    icon: Zap,
  },
  {
    title: "Growth",
    tagline: "das System das dein Business skalierbar macht",
    duration: "ca. 2 Wochen | Einmaliges Projekt, kein Abo",
    description:
      "Funnel, Automatisierungen, CRM und automatisiertes Onboarding – alles was du brauchst damit mehr Kunden nicht mehr Arbeit bedeutet. Richtig für dich wenn du bereits Kunden hast, alles noch manuell läuft und endlich ein System willst das die Arbeit übernimmt.",
    features: [
      "Alles aus dem Starter-Paket",
      "Funnel und Landingpages fertig aufgebaut, keine Bastelei",
      "E-Mail-Sequenzen und automatisierte Follow-ups",
      "Automatisiertes Kunden-Onboarding",
      "Migration deiner bestehenden Kontakte und Daten",
      "30 Tage Support nach Go-Live",
    ],
    price: "ab 4.500 €",
    popular: true,
    icon: Rocket,
  },
  {
    title: "Full System",
    tagline: "wenn du es ein für alle Mal richtig machen willst",
    duration: "Komplettaufbau | ca. 2 Wochen | Einmaliges Projekt, kein Abo",
    description:
      "Von der Strategie bis zur letzten Automatisierung. Für alle die ihr Business wirklich von sich unabhängig machen wollen – von der ersten Anfrage bis zur laufenden Kundenbeziehung. Richtig für dich wenn dein Business wächst, mehrere Prozesse noch manuell laufen und du einmal alles richtig aufgebaut haben willst.",
    features: [
      "Alles aus dem Growth-Paket",
      "Gemeinsame Strategieentwicklung: wir bauen was wirklich zu dir passt",
      "Vollständige Prozessautomatisierung über alle Bereiche",
      "Mitgliederbereich falls du Kurse oder Inhalte anbietest",
      "60 Tage Support nach Go-Live",
    ],
    price: "ab 6.000 €",
    popular: false,
    icon: Crown,
  },
];

const additionalServices = [
  {
    icon: Repeat,
    title: "Migration von anderen Tools",
    description:
      "Du wechselst von einem anderen Tool? Ich übertrage deine Kontakte, Daten und Abläufe sauber rüber ohne Datenverlust, ohne dass dein Business auch nur einen Tag stillsteht.",
  },
  {
    icon: TrendingUp,
    title: "Strategieberatung",
    description:
      "Du weißt noch nicht welche Prozesse du automatisieren sollst oder wo der größte Hebel liegt? Wir entwickeln gemeinsam einen konkreten Plan bevor wir irgendetwas bauen.",
  },
  {
    icon: Building2,
    title: "SaaS-Partner Support",
    description:
      "Du bietest dein eigenes System als White-Label an und brauchst jemanden der technischen Support für deine Kunden übernimmt? Das biete ich als ausgelagerten Support-Service an.",
  },
];

const Leistungen = () => {
  const { openQuizModal } = useQuizModal();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Funnel aufbauen lassen & CRM einrichten | Gaetano Ficarra"
        description="Funnel aufbauen lassen, CRM einrichten, Prozesse automatisieren – done for you in 2 Wochen. Starter, Growth oder Full System – für Coaches & Berater."
        canonical="https://gaetanoficarra.de/leistungen"
        ogTitle="Funnel aufbauen lassen & CRM einrichten | Gaetano Ficarra"
        ogDescription="Funnel aufbauen lassen, CRM einrichten, Prozesse automatisieren – done for you in 2 Wochen. Starter, Growth oder Full System – für Coaches & Berater."
        breadcrumbs={[
          { name: "Startseite", url: "https://gaetanoficarra.de/" },
          { name: "Leistungen", url: "https://gaetanoficarra.de/leistungen" },
        ]}
        jsonLd={[
          {
            "@type": "Service",
            name: "Starter",
            description:
              "Du willst anfangen, ohne gleich alles auf einmal umzubauen. Ich richte dir ein sauberes System mit CRM und einer Kernautomatisierung ein die sofort Zeit spart.",
            provider: { "@type": "Person", name: "Gaetano Ficarra", url: "https://gaetanoficarra.de" },
            areaServed: [
              { "@type": "Country", name: "Deutschland" },
              { "@type": "Country", name: "Österreich" },
              { "@type": "Country", name: "Schweiz" },
            ],
            serviceType: "CRM & Automation Setup",
            offers: {
              "@type": "Offer",
              price: "3000",
              priceCurrency: "EUR",
              priceSpecification: {
                "@type": "PriceSpecification",
                minPrice: "3000",
                priceCurrency: "EUR"
              }
            },
          },
          {
            "@type": "Service",
            name: "Growth",
            description:
              "Funnel, Automatisierungen, CRM und automatisiertes Onboarding – alles was du brauchst damit mehr Kunden nicht mehr Arbeit bedeutet.",
            provider: { "@type": "Person", name: "Gaetano Ficarra", url: "https://gaetanoficarra.de" },
            areaServed: [
              { "@type": "Country", name: "Deutschland" },
              { "@type": "Country", name: "Österreich" },
              { "@type": "Country", name: "Schweiz" },
            ],
            serviceType: "Marketing Automation Setup",
            offers: {
              "@type": "Offer",
              price: "4500",
              priceCurrency: "EUR",
              priceSpecification: {
                "@type": "PriceSpecification",
                minPrice: "4500",
                priceCurrency: "EUR"
              }
            },
          },
          {
            "@type": "Service",
            name: "Full System",
            description:
              "Von der Strategie bis zur letzten Automatisierung. Für alle die ihr Business wirklich von sich unabhängig machen wollen.",
            provider: { "@type": "Person", name: "Gaetano Ficarra", url: "https://gaetanoficarra.de" },
            areaServed: [
              { "@type": "Country", name: "Deutschland" },
              { "@type": "Country", name: "Österreich" },
              { "@type": "Country", name: "Schweiz" },
            ],
            serviceType: "Full Business System Setup",
            offers: {
              "@type": "Offer",
              price: "6000",
              priceCurrency: "EUR",
              priceSpecification: {
                "@type": "PriceSpecification",
                minPrice: "6000",
                priceCurrency: "EUR"
              }
            },
          },
          {
            "@type": "Service",
            name: "Support-Call",
            description:
              "Du nutzt dein System bereits und hast ein konkretes Problem. Wir teilen den Bildschirm und ich löse es mit dir live.",
            provider: { "@type": "Person", name: "Gaetano Ficarra", url: "https://gaetanoficarra.de" },
            areaServed: [
              { "@type": "Country", name: "Deutschland" },
              { "@type": "Country", name: "Österreich" },
              { "@type": "Country", name: "Schweiz" },
            ],
            serviceType: "Technical Support",
            offers: {
              "@type": "Offer",
              price: "250",
              priceCurrency: "EUR",
              unitText: "pro Stunde"
            },
          },
        ]}
      />
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <span className="text-primary text-sm tracking-widest uppercase font-body">Leistungen</span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mt-4 mb-6">
                Funnel aufbauen, CRM einrichten und Prozesse automatisieren – <span className="text-gradient-primary">done for you.</span>
              </h1>
              <p className="text-muted-foreground text-lg font-body">
                Ob du alles abgeben oder gemeinsam aufbauen willst – hier findest du die Option die zu deiner Situation
                passt. Keine versteckten Kosten, kein Abo, keine Überraschungen.
              </p>
            </motion.div>

            {/* Main Services - Detailed Cards */}
            <div className="space-y-12 max-w-5xl mx-auto mb-24">
              {mainServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative bg-card border rounded-xl overflow-hidden ${
                    service.popular ? "border-primary" : "border-border"
                  }`}
                >
                  {service.popular && (
                    <div className="bg-primary text-primary-foreground text-center py-2 text-xs uppercase tracking-widest font-body">
                      Beliebtestes Paket
                    </div>
                  )}

                  <div className="p-8 md:p-12">
                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
                      {/* Left Column - Info */}
                      <div>
                        <div className="flex items-center gap-4 mb-2">
                          <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
                            <service.icon className="w-7 h-7 text-primary" />
                          </div>
                          <div>
                            <h2 className="font-display text-2xl md:text-3xl text-foreground">{service.title}</h2>
                            <p className="text-primary text-sm font-body">{service.tagline}</p>
                          </div>
                        </div>

                        <p className="text-muted-foreground/70 text-xs font-body tracking-wide uppercase mb-6">
                          {service.duration}
                        </p>

                        <p className="text-muted-foreground font-body text-lg leading-relaxed mb-8">
                          {service.description}
                        </p>

                        {/* Price & CTA */}
                        <div className="flex flex-wrap items-center gap-6">
                          <div>
                            <p className="font-display text-3xl text-primary">{service.price}</p>
                          </div>
                          <button
                            onClick={openQuizModal}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-sm tracking-widest uppercase font-body hover:bg-primary/90 transition-all duration-300 rounded-sm"
                          >
                            System-Analyse starten <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Right Column - Features */}
                      <div className="bg-muted/30 rounded-lg p-6 md:p-8">
                        <h3 className="font-display text-lg text-foreground mb-6">Was du bekommst:</h3>
                        <ul className="space-y-4">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm font-body text-muted-foreground">
                              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Support-Call Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-5xl mx-auto mb-24"
            >
              <div className="bg-card border border-border rounded-xl p-8 md:p-12">
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Headphones className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl md:text-3xl text-foreground">Support-Call</h3>
                        <p className="text-primary text-sm font-body">du steckst fest, wir lösen es</p>
                      </div>
                    </div>

                    <p className="font-display text-3xl text-primary mb-6">250 € / Stunde</p>

                    <p className="text-muted-foreground font-body text-lg leading-relaxed mb-6">
                      Du nutzt dein System bereits und hast ein konkretes Problem. Eine Automatisierung läuft nicht. Ein
                      Funnel konvertiert nicht. Wir teilen den Bildschirm und ich löse es mit dir live. Kein Drumherum,
                      keine langen Vorgespräche, keine Verpflichtung.
                    </p>

                    <p className="text-muted-foreground font-body text-sm leading-relaxed mb-8">
                      Als zertifizierter GoHighLevel Berater in Deutschland löse ich technische Probleme direkt im Call.
                    </p>

                    <button
                      onClick={() => window.open("https://lp.gaetanoficarra.de/support_call", "_blank")}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-sm tracking-widest uppercase font-body hover:bg-primary/90 transition-all duration-300 rounded-sm"
                    >
                      Call buchen <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-6 md:p-8">
                    <h3 className="font-display text-lg text-foreground mb-6">Was du bekommst:</h3>
                    <ul className="space-y-4">
                      {[
                        "60-minütiger 1:1 Video-Call mit Bildschirmfreigabe",
                        "Direktlösung im Call",
                        "Konkrete Antworten auf dein konkretes Problem",
                        "Aufnahme des Calls zum Nachschauen",
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm font-body text-muted-foreground">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Additional Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h3 className="font-display text-3xl md:text-4xl text-foreground">
                Das biete ich <span className="text-gradient-primary">außerdem an.</span>
              </h3>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {additionalServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-card border border-border p-6 rounded-lg hover:border-primary/50 transition-colors duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-card border-t border-border">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
                Nicht sicher welches Paket zu dir passt?
              </h2>
              <p className="text-muted-foreground font-body mb-8 text-lg">
                In einem kurzen Gespräch schauen wir gemeinsam auf deine aktuelle Situation. Ich zeige dir, wo Potenzial
                liegt und was wirklich Sinn macht – ohne Druck, ohne vorher festgelegtes Ergebnis.
              </p>
              <div className="flex flex-col items-center gap-3">
                <button
                  onClick={openQuizModal}
                  className="inline-flex items-center gap-2 px-10 py-5 text-sm tracking-widest uppercase font-body text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 rounded-sm"
                  style={{
                    boxShadow: "0 0 30px hsl(var(--primary) / 0.3)",
                  }}
                >
                  System-Analyse starten <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-muted-foreground text-sm font-body">
                  Kurz sprechen, Setup verstehen, nächsten Schritt klären.
                </span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Leistungen;
