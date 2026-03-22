import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Copy, Check, Link as LinkIcon, Plus, Trash2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface UTMParams {
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
}

const commonSources = ["google", "facebook", "instagram", "linkedin", "youtube", "email", "newsletter", "whatsapp"];
const commonMediums = ["cpc", "social", "email", "organic", "referral", "banner", "affiliate"];

const UTMGenerator = () => {
  const [baseUrl, setBaseUrl] = useState("");
  const [params, setParams] = useState<UTMParams>({
    source: "",
    medium: "",
    campaign: "",
    term: "",
    content: "",
  });
  const [copied, setCopied] = useState(false);

  const generateLink = () => {
    if (!baseUrl) return "";
    
    let url = baseUrl;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }

    const utmParams = [];
    if (params.source) utmParams.push(`utm_source=${encodeURIComponent(params.source)}`);
    if (params.medium) utmParams.push(`utm_medium=${encodeURIComponent(params.medium)}`);
    if (params.campaign) utmParams.push(`utm_campaign=${encodeURIComponent(params.campaign)}`);
    if (params.term) utmParams.push(`utm_term=${encodeURIComponent(params.term)}`);
    if (params.content) utmParams.push(`utm_content=${encodeURIComponent(params.content)}`);

    if (utmParams.length === 0) return url;

    const separator = url.includes("?") ? "&" : "?";
    return url + separator + utmParams.join("&");
  };

  const link = generateLink();

  const copyToClipboard = () => {
    if (link) {
      navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clearAll = () => {
    setBaseUrl("");
    setParams({
      source: "",
      medium: "",
      campaign: "",
      term: "",
      content: "",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Kostenloser UTM-Generator — Marketing Links erstellen"
        description="Kostenloser UTM-Generator: Erstelle UTM-Parameter für Google Analytics & GoHighLevel in Sekunden. Kampagnen-URLs tracken leicht gemacht."
        breadcrumbs={[
          { name: "Startseite", url: "https://gaetanoficarra.de/" },
          { name: "UTM Generator", url: "https://gaetanoficarra.de/utm-generator" },
        ]}
        jsonLd={{
            "@type": "WebApplication",
            "name": "UTM-Generator",
            "url": "https://gaetanoficarra.de/utm-generator",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Web",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
            "author": { "@type": "Person", "name": "Gaetano Ficarra", "url": "https://gaetanoficarra.de" },
            "description": "Erstelle UTM-Parameter für Google Analytics in Sekunden. Kostenloser Tool-Rechner."
        }}
      />
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-6">
              <LinkIcon className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              UTM <span className="text-primary">Parameter Generator</span>
            </h1>
            <p className="text-muted-foreground font-body">
              Erstelle trackbare Links mit UTM-Parametern für dein Marketing
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card border border-border p-8 rounded-lg space-y-6"
          >
            <div>
              <label className="block font-body text-sm text-foreground mb-2">
                Website URL *
              </label>
              <input
                type="url"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://deine-website.de/landingpage"
                className="w-full bg-background border border-border rounded-lg px-4 py-3 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-sm text-foreground mb-2">
                  Quelle (utm_source) *
                </label>
                <input
                  type="text"
                  value={params.source}
                  onChange={(e) => setParams({ ...params, source: e.target.value })}
                  placeholder="z.B. google, facebook"
                  list="sources"
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
                <datalist id="sources">
                  {commonSources.map((s) => (
                    <option key={s} value={s} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block font-body text-sm text-foreground mb-2">
                  Medium (utm_medium) *
                </label>
                <input
                  type="text"
                  value={params.medium}
                  onChange={(e) => setParams({ ...params, medium: e.target.value })}
                  placeholder="z.B. cpc, social, email"
                  list="mediums"
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
                <datalist id="mediums">
                  {commonMediums.map((m) => (
                    <option key={m} value={m} />
                  ))}
                </datalist>
              </div>
            </div>

            <div>
              <label className="block font-body text-sm text-foreground mb-2">
                Kampagne (utm_campaign) *
              </label>
              <input
                type="text"
                value={params.campaign}
                onChange={(e) => setParams({ ...params, campaign: e.target.value })}
                placeholder="z.B. winter_sale_2025"
                className="w-full bg-background border border-border rounded-lg px-4 py-3 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-sm text-foreground mb-2">
                  Begriff (utm_term)
                </label>
                <input
                  type="text"
                  value={params.term}
                  onChange={(e) => setParams({ ...params, term: e.target.value })}
                  placeholder="z.B. marketing automation"
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
                <p className="text-xs text-muted-foreground mt-1">Für bezahlte Keywords</p>
              </div>

              <div>
                <label className="block font-body text-sm text-foreground mb-2">
                  Inhalt (utm_content)
                </label>
                <input
                  type="text"
                  value={params.content}
                  onChange={(e) => setParams({ ...params, content: e.target.value })}
                  placeholder="z.B. header_button"
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
                <p className="text-xs text-muted-foreground mt-1">Für A/B-Tests</p>
              </div>
            </div>

            {link && baseUrl && (
              <div>
                <label className="block font-body text-sm text-foreground mb-2">
                  Generierter Link
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={link}
                    readOnly
                    className="flex-1 bg-background border border-primary/50 rounded-lg px-4 py-3 font-body text-sm text-primary focus:outline-none overflow-hidden"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="bg-primary text-primary-foreground px-4 py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={clearAll}
                className="flex-1 border border-border text-muted-foreground py-3 rounded-lg font-body uppercase tracking-widest text-sm hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" /> Zurücksetzen
              </button>
            </div>
          </motion.div>

          {/* SEO Content: Was sind UTM-Parameter? */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 bg-card border border-border p-8 rounded-lg"
          >
            <h2 className="font-display text-2xl text-foreground mb-6">Was sind UTM-Parameter?</h2>
            <p className="font-body text-muted-foreground mb-6 leading-relaxed">
              UTM-Parameter (Urchin Tracking Module) sind spezielle Tags, die du an URLs anhängst, um den Ursprung deines Website-Traffics zu tracken. Sie wurden ursprünglich von Google entwickelt und sind heute der Standard für Kampagnen-Tracking in Google Analytics, Funnelmate, GoHighLevel und anderen Marketing-Tools.
            </p>
            <p className="font-body text-muted-foreground mb-6 leading-relaxed">
              Mit UTM-Parametern siehst du genau, welche Kampagne, welches Medium und welche Quelle zu einem Klick, Lead oder Verkauf geführt hat. Das ist die Grundlage für datenbasierte Marketing-Entscheidungen.
            </p>
            
            <h3 className="font-display text-xl text-foreground mb-4">Die 5 UTM-Parameter erklärt</h3>
            <ul className="font-body text-muted-foreground space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-primary font-semibold shrink-0">utm_source</span>
                <span>– Woher kommt der Traffic? Z.B. Google, Facebook, Newsletter. Pflichtfeld für sinnvolles Tracking.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-semibold shrink-0">utm_medium</span>
                <span>– Über welchen Kanal? Z.B. CPC (bezahlte Werbung), Social Media, E-Mail, Organic.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-semibold shrink-0">utm_campaign</span>
                <span>– Welche Kampagne? Z.B. „winter_sale_2026" oder „lead_magnet_ebook". Hilft, Kampagnen zu vergleichen.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-semibold shrink-0">utm_term</span>
                <span>– Welches Keyword wurde beworben? Besonders relevant für Google Ads und bezahlte Suchanzeigen.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-semibold shrink-0">utm_content</span>
                <span>– Welche Anzeigenvariante? Perfekt für A/B-Tests, z.B. „header_cta" vs. „footer_cta".</span>
              </li>
            </ul>

            <h3 className="font-display text-xl text-foreground mb-4">Warum UTM-Tracking wichtig ist</h3>
            <p className="font-body text-muted-foreground mb-4 leading-relaxed">
              Ohne UTM-Parameter weißt du nicht, welche Marketing-Maßnahme wirklich funktioniert. Du investierst Budget in Facebook Ads, Google Ads, Newsletter und Social Media – aber welcher Kanal bringt tatsächlich Leads und Umsatz?
            </p>
            <p className="font-body text-muted-foreground mb-4 leading-relaxed">
              UTM-Parameter machen genau das sichtbar. In Kombination mit einem CRM wie GoHighLevel oder Funnelmate kannst du den gesamten Kundenweg nachvollziehen: vom ersten Klick bis zum Abschluss.
            </p>
          </motion.div>

          {/* SEO Content: Best Practices */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 bg-card border border-border p-8 rounded-lg"
          >
            <h2 className="font-display text-2xl text-foreground mb-6">UTM-Parameter Best Practices</h2>
            <ul className="font-body text-muted-foreground space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span><strong className="text-foreground">Immer Kleinbuchstaben verwenden</strong> – UTM-Parameter sind case-sensitive. „Facebook" und „facebook" werden als unterschiedliche Quellen gezählt.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span><strong className="text-foreground">Einheitliche Benennung</strong> – Erstelle eine Namenskonvention und halte dich daran. Z.B. immer „instagram" statt abwechselnd „ig", „insta", „Instagram".</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span><strong className="text-foreground">Keine Leerzeichen</strong> – Verwende Unterstriche (_) oder Bindestriche (-) statt Leerzeichen.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span><strong className="text-foreground">Nicht für interne Links</strong> – UTM-Parameter sind nur für externe Quellen gedacht. Interne Links mit UTM-Tags verfälschen deine Analytics-Daten.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span><strong className="text-foreground">In einer Tabelle dokumentieren</strong> – Führe eine zentrale Liste aller UTM-Links, damit du den Überblick behältst.</span>
              </li>
            </ul>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 bg-card border border-border p-8 rounded-lg"
          >
            <h2 className="font-display text-2xl text-foreground mb-6">Häufige Fragen zum UTM-Generator</h2>
            <div className="space-y-6">
              {[
                {
                  q: "Sind UTM-Parameter kostenlos?",
                  a: "Ja, UTM-Parameter sind komplett kostenlos. Sie sind ein offener Standard und werden von allen gängigen Analytics-Tools unterstützt – darunter Google Analytics, Funnelmate, GoHighLevel, HubSpot und viele weitere."
                },
                {
                  q: "Funktionieren UTM-Parameter mit Google Analytics 4 (GA4)?",
                  a: "Ja. GA4 erkennt UTM-Parameter automatisch und ordnet sie den richtigen Dimensionen zu (Quelle, Medium, Kampagne). Du siehst die Daten unter Akquisition → Traffic-Akquisition."
                },
                {
                  q: "Kann ich UTM-Parameter auch in GoHighLevel / Funnelmate nutzen?",
                  a: "Absolut. GoHighLevel und Funnelmate können UTM-Parameter aus eingehenden Links automatisch auslesen und im Kontaktprofil speichern. So weißt du für jeden Lead, woher er kam."
                },
                {
                  q: "Wie viele UTM-Parameter sollte ich verwenden?",
                  a: "Mindestens drei: utm_source, utm_medium und utm_campaign. Die beiden optionalen (utm_term und utm_content) sind nützlich für bezahlte Kampagnen und A/B-Tests."
                },
                {
                  q: "Beeinflusst die UTM-URL mein SEO?",
                  a: "Nein, UTM-Parameter haben keinen direkten Einfluss auf dein SEO-Ranking. Google ignoriert sie beim Crawlen. Achte aber darauf, Canonical-Tags korrekt zu setzen, damit keine Duplikate entstehen."
                },
              ].map((faq, i) => (
                <div key={i} className="border-b border-border pb-4 last:border-0 last:pb-0">
                  <h3 className="font-display text-lg text-foreground mb-2">{faq.q}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Cross-Links */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UTMGenerator;
