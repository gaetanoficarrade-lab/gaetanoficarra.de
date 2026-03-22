import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Copy, Check, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const WAGenerator = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const formatPhoneNumber = (number: string) => {
    // Remove all non-digit characters
    let cleaned = number.replace(/\D/g, "");
    
    // Remove leading zeros
    cleaned = cleaned.replace(/^0+/, "");
    
    // Add German country code if not present
    if (!cleaned.startsWith("49") && cleaned.length > 0) {
      cleaned = "49" + cleaned;
    }
    
    return cleaned;
  };

  const generateLink = () => {
    const formattedNumber = formatPhoneNumber(phoneNumber);
    const encodedMessage = encodeURIComponent(message);
    
    if (!formattedNumber) return "";
    
    let link = `https://wa.me/${formattedNumber}`;
    if (message) {
      link += `?text=${encodedMessage}`;
    }
    return link;
  };

  const link = generateLink();

  const copyToClipboard = () => {
    if (link) {
      navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Kostenloser WhatsApp Link Generator — wa.me Link erstellen"
        description="Kostenloser WhatsApp Link Generator: wa.me-Link mit Nachricht erstellen. Ideal für Lead-Generierung, Kundensupport & GoHighLevel-Automationen."
        breadcrumbs={[
          { name: "Startseite", url: "https://gaetanoficarra.de/" },
          { name: "WhatsApp Link Generator", url: "https://gaetanoficarra.de/wa-generator" },
        ]}
        jsonLd={{
            "@type": "WebApplication",
            "name": "WhatsApp Link Generator",
            "url": "https://gaetanoficarra.de/wa-generator",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Web",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
            "author": { "@type": "Person", "name": "Gaetano Ficarra", "url": "https://gaetanoficarra.de" },
            "description": "Erstelle kostenlos einen WhatsApp-Link mit vorgefertigter Nachricht."
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
              <MessageCircle className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              WhatsApp <span className="text-primary">Link Generator</span>
            </h1>
            <p className="text-muted-foreground font-body text-lg max-w-lg mx-auto">
              Erstelle einen direkten wa.me-Link mit vordefinierter Nachricht — kostenlos und ohne Anmeldung
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
                Telefonnummer
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="z.B. 0152 31039640 oder +49 152 31039640"
                className="w-full bg-background border border-border rounded-lg px-4 py-3 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Die Nummer wird automatisch formatiert (Ländercode +49 wird hinzugefügt)
              </p>
            </div>

            <div>
              <label className="block font-body text-sm text-foreground mb-2">
                Nachricht (optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hallo, ich habe eine Frage zu..."
                rows={4}
                className="w-full bg-background border border-border rounded-lg px-4 py-3 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>

            {link && (
              <div>
                <label className="block font-body text-sm text-foreground mb-2">
                  Generierter Link
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={link}
                    readOnly
                    className="flex-1 bg-background border border-primary/50 rounded-lg px-4 py-3 font-body text-sm text-primary focus:outline-none"
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

            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-[#25D366] text-white py-4 rounded-lg font-body uppercase tracking-widest text-sm hover:bg-[#22c55e] transition-colors"
              >
                Link testen
              </a>
            )}
          </motion.div>

          {/* SEO Content: Was ist ein WhatsApp Link? */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 bg-card border border-border p-8 rounded-lg"
          >
            <h2 className="font-display text-2xl text-foreground mb-6">Was ist ein WhatsApp Link (wa.me)?</h2>
            <p className="font-body text-muted-foreground mb-4 leading-relaxed">
              Ein wa.me-Link ist die offizielle Methode, um einen direkten WhatsApp-Chat zu öffnen – ohne dass der Empfänger deine Nummer vorher speichern muss. Du gibst einfach die Telefonnummer und optional eine vorgefertigte Nachricht ein, und der Generator erstellt den fertigen Link.
            </p>
            <p className="font-body text-muted-foreground mb-4 leading-relaxed">
              Das Format ist einfach: <code className="text-primary bg-primary/10 px-2 py-0.5 rounded text-sm">https://wa.me/49XXXXXXXXXXX?text=Deine+Nachricht</code>. Auf Mobilgeräten öffnet sich die WhatsApp-App, auf dem Desktop WhatsApp Web oder die Desktop-App.
            </p>

            <h3 className="font-display text-xl text-foreground mb-4 mt-8">Einsatzmöglichkeiten für WhatsApp Links</h3>
            <ul className="font-body text-muted-foreground space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span><strong className="text-foreground">Marketing & Lead-Generierung</strong> – Platziere WhatsApp-Links auf Landingpages, in E-Mails oder Social Media Posts, damit Interessenten dich direkt kontaktieren können.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span><strong className="text-foreground">Kundensupport</strong> – Biete einen schnellen Draht zum Support, ohne E-Mail-Formulare oder Wartezeiten.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span><strong className="text-foreground">GoHighLevel & Funnelmate</strong> – Integriere wa.me-Links in deine Funnels, Automatisierungen und Follow-up-Sequenzen für maximale Conversion.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span><strong className="text-foreground">Social Media Bio</strong> – Verwende den Link in deiner Instagram- oder LinkedIn-Bio für direkte Anfragen.</span>
              </li>
            </ul>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 bg-card border border-border p-8 rounded-lg"
          >
            <h2 className="font-display text-2xl text-foreground mb-6">Häufige Fragen zum WhatsApp Link Generator</h2>
            <div className="space-y-6">
              {[
                {
                  q: "Was ist ein wa.me Link?",
                  a: "Ein wa.me Link ist ein offizieller WhatsApp-Kurzlink, der beim Klick direkt einen Chat mit der angegebenen Nummer öffnet – ohne die Nummer speichern zu müssen."
                },
                {
                  q: "Funktioniert der WhatsApp-Link auf Desktop und Mobil?",
                  a: "Ja. Auf Mobilgeräten öffnet sich die WhatsApp-App, auf dem Desktop die Web-Version oder Desktop-App."
                },
                {
                  q: "Kann ich WhatsApp-Links in GoHighLevel verwenden?",
                  a: "Ja. Du kannst wa.me Links in GoHighLevel-Funnels, E-Mails, SMS und Workflows einbinden, um Leads direkt per WhatsApp zu kontaktieren."
                },
                {
                  q: "Ist der WhatsApp Link Generator kostenlos?",
                  a: "Ja, komplett kostenlos und ohne Registrierung nutzbar."
                },
                {
                  q: "Kann ich eine vordefinierte Nachricht hinzufügen?",
                  a: "Ja. Gib einfach deine gewünschte Nachricht in das Textfeld ein. Sie wird automatisch URL-codiert und an den Link angehängt. Der Empfänger sieht die Nachricht dann als Entwurf im Chat."
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

export default WAGenerator;
