import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import { useQuizModal } from "@/context/QuizModalContext";

const navItems = [
  { label: "Home", href: "/", isAnchor: false },
  { label: "Leistungen", href: "/leistungen", isAnchor: false },
  { label: "Blog", href: "/blog", isAnchor: false },
  { label: "Kontakt", href: "/#kontakt", isAnchor: true },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { openQuizModal } = useQuizModal();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    if (href.startsWith("/#")) return false;
    return location.pathname.startsWith(href);
  };

  const handleNavClick = (item: (typeof navItems)[0], e: React.MouseEvent) => {
    if (item.isAnchor) {
      e.preventDefault();
      const targetId = item.href.replace("/#", "");

      if (location.pathname === "/") {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b overflow-hidden transition-all duration-500 ${
        scrolled
          ? "bg-background/90 border-border shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-background/70 border-border/50"
      }`}
    >
      {/* Shimmer stripes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-primary/[0.06] to-transparent animate-shimmer-fast" />
        <div className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-primary/[0.04] to-transparent animate-shimmer-slow" />
      </div>
      <div className="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">
        <Link to="/" className="flex items-center gap-3" title="Gaetano Ficarra - HighLevel Experte Bielefeld">
          <img
            src={logo}
            alt="Gaetano Ficarra Logo - Marketing Automatisierung Bielefeld"
            className="h-12 md:h-14 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={(e) => handleNavClick(item, e)}
              className={`transition-colors duration-300 text-sm tracking-widest uppercase font-body ${
                isActive(item.href) ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={openQuizModal}
            className="bg-primary text-primary-foreground px-6 py-2 text-xs tracking-widest uppercase font-body hover:bg-primary/90 transition-all duration-300 rounded-md shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
          >
            Termin buchen
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-foreground p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={(e) => handleNavClick(item, e)}
                  className={`transition-colors duration-300 text-sm tracking-widest uppercase font-body py-2 ${
                    isActive(item.href) ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  openQuizModal();
                }}
                className="bg-primary text-primary-foreground px-6 py-3 text-xs tracking-widest uppercase font-body hover:bg-primary/90 transition-all duration-300 text-center mt-4 rounded-md"
              >
                Termin buchen
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
