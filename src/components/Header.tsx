import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <img src={logo} alt="GF Logo" className="w-10 h-10" />
          <span className="font-display text-xl tracking-wide text-foreground">
            Gaetano Ficarra
          </span>
        </a>
        
        <nav className="hidden md:flex items-center gap-8">
          {["Über mich", "Leistungen", "Kontakt"].map((item, index) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm tracking-widest uppercase font-body"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
