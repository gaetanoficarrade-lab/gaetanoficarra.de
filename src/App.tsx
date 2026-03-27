import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useScrollToTop from "./hooks/useScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import CookieBanner from "./components/CookieBanner";

import { QuizModalProvider } from "./context/QuizModalContext";

// Critical route - loaded eagerly
import Index from "./pages/Index";

// Lazy-loaded routes for code splitting
const Leistungen = lazy(() => import("./pages/Leistungen"));
const LinksPage = lazy(() => import("./pages/Links"));
const HighLevelVsFunnelmate = lazy(() => import("./pages/HighLevelVsFunnelmate"));
const AGB = lazy(() => import("./pages/AGB"));
const Datenschutz = lazy(() => import("./pages/Datenschutz"));
const Impressum = lazy(() => import("./pages/Impressum"));
const WAGenerator = lazy(() => import("./pages/WAGenerator"));
const UTMGenerator = lazy(() => import("./pages/UTMGenerator"));
const Absage = lazy(() => import("./pages/Absage"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const AdminBlog = lazy(() => import("./pages/AdminBlog"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const ScrollToTop = () => {
  useScrollToTop();
  return null;
};

const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

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
          
          <Suspense fallback={<PageLoader />}>
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
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogArticle />} />
              <Route path="/admin/blog" element={<AdminBlog />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </QuizModalProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
