import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, MessageCircle } from "lucide-react";
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
            <p className="text-muted-foreground font-body">
              Erstelle einen direkten WhatsApp-Link mit vordefinierter Nachricht
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WAGenerator;
