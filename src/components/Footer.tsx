import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-card">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="GF Logo" className="w-8 h-8" />
            <span className="font-display text-lg text-foreground">Gaetano Ficarra</span>
          </div>
          
          <div className="text-muted-foreground text-sm font-body">
            © {new Date().getFullYear()} Gaetano Ficarra. Alle Rechte vorbehalten.
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-body">
              Impressum
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-body">
              Datenschutz
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
