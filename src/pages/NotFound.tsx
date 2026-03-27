import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import MarketingNav from "@/components/MarketingNav";
import { CookieBanner } from "@/components/CookieBanner";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEOHead
        title="404 – Seite nicht gefunden | Gaetano Ficarra"
        description="Diese Seite existiert leider nicht. Kehre zur Startseite zurück."
        noIndex={true}
        canonical="https://gaetanoficarra.de/404"
      />

      <div className="min-h-screen flex flex-col" style={{ color: "#44484E", background: "#FFFFFF" }}>
        <MarketingNav />

        <main className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-md">
            <div className="text-8xl font-black mb-6" style={{ color: "#FAC81E", opacity: 0.3 }} aria-hidden="true">
              404
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#44484E" }}>
              Seite nicht gefunden
            </h1>

            <p className="text-lg mb-8 leading-relaxed" style={{ color: "#6E6E73" }}>
              Diese Seite existiert leider nicht oder wurde verschoben.
              <br />
              Keine Sorge – es gibt noch viel zu entdecken.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center font-semibold text-[15px] transition-all duration-200"
                style={{
                  background: "#FAC81E",
                  color: "#44484E",
                  borderRadius: 980,
                  padding: "12px 28px",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#e5b71a";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#FAC81E";
                }}
              >
                Zur Startseite
              </Link>

              <Link
                to="/blog"
                className="inline-flex items-center justify-center font-semibold text-[15px] transition-all duration-200"
                style={{
                  border: "1px solid #44484E",
                  color: "#44484E",
                  borderRadius: 980,
                  padding: "12px 28px",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "0.7";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                }}
              >
                Zum Blog
              </Link>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-8 px-6 text-center text-xs" style={{ color: "rgba(0,0,0,0.5)" }}>
          © {new Date().getFullYear()} Gaetano Ficarra
        </footer>
      </div>

      <CookieBanner />
    </>
  );
};

export default NotFound;
