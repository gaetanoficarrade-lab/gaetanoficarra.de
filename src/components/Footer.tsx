import { Link } from "react-router-dom";
import { Instagram, Youtube, Facebook, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";
import ghlBadge from "@/assets/ghl-badge.png";
import funnelmateBadge from "@/assets/funnelmate-certified-expert.png";

const Footer = () => {
  return (
    <footer className="py-16 border-t border-border bg-card">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src={logo} alt="GF Logo" className="h-14 w-auto" />
            </Link>
            <p className="text-muted-foreground text-sm font-body leading-relaxed">
              Marketing-Systemberater für Selbstständige. Zertifizierter HighLevel-Experte.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-primary mb-4">Navigation</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-body">Home</Link>
              <Link to="/leistungen" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-body">Leistungen</Link>
              <Link to="/links" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-body">Links</Link>
              <Link to="/highlevel-vs-funnelmate" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-body">HighLevel vs Funnelmate</Link>
              <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-body">Blog</Link>
            </nav>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-primary mb-4">Tools</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/wa-generator" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-body">WhatsApp Generator</Link>
              <Link to="/utm-generator" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-body">UTM Generator</Link>
            </nav>
          </div>

          {/* Partner & Social */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-primary mb-4">Partner & Social</h4>
            <div className="flex gap-4 mb-4">
              <a 
                href="https://wa.me/4915223856537?text=Hey%2C%20ich%20bin%20an%20einer%20Zusammenarbeit%20%0Ainteressiert%20und%20h%C3%A4tte%20gerne%20weitere%20Infos." 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
              <a 
                href="https://www.instagram.com/gaetano.ficarra_/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.youtube.com/@smart4business.gaetano" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61584153672246" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <a 
                href="https://funnelmate.io/?am_id=gaetano" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-body"
              >
                Partner: Patrick Mentler
              </a>
              <a 
                href="https://funnelmate.io/?am_id=gaetano" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-body"
              >
                Funnelmate.io
              </a>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-primary mb-4">Zertifizierungen</h4>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.gohighlevel.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <img 
                  src={ghlBadge} 
                  alt="GoHighLevel Certified Admin" 
                  className="h-20 w-auto object-contain"
                />
              </a>
              <a 
                href="https://funnelmate.io/?am_id=gaetano" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <img 
                  src={funnelmateBadge} 
                  alt="Funnelmate Certified Expert" 
                  className="h-20 w-auto object-contain"
                />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-muted-foreground text-sm font-body">
            © {new Date().getFullYear()} Gaetano Ficarra. Alle Rechte vorbehalten.
          </div>
          
          <div className="flex items-center gap-6">
            <Link to="/impressum" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-body">
              Impressum
            </Link>
            <Link to="/datenschutz" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-body">
              Datenschutz
            </Link>
            <Link to="/agb" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-body">
              AGB
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;