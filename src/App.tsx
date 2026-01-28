import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useScrollToTop from "./hooks/useScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import CookieBanner from "./components/CookieBanner";
import { QuizModalProvider } from "./context/QuizModalContext";
import Index from "./pages/Index";
import Leistungen from "./pages/Leistungen";
import LinksPage from "./pages/Links";
import HighLevelVsFunnelmate from "./pages/HighLevelVsFunnelmate";
import AGB from "./pages/AGB";
import Datenschutz from "./pages/Datenschutz";
import Impressum from "./pages/Impressum";
import WAGenerator from "./pages/WAGenerator";
import UTMGenerator from "./pages/UTMGenerator";
import Absage from "./pages/Absage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  useScrollToTop();
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <QuizModalProvider>
          <ScrollToTop />
          <ScrollToTopButton />
          <CookieBanner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/leistungen" element={<Leistungen />} />
            <Route path="/links" element={<LinksPage />} />
            <Route path="/highlevel-vs-funnelmate" element={<HighLevelVsFunnelmate />} />
            <Route path="/agb" element={<AGB />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/wa-generator" element={<WAGenerator />} />
            <Route path="/utm-generator" element={<UTMGenerator />} />
            <Route path="/absage" element={<Absage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </QuizModalProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
