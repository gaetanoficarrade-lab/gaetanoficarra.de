-- =============================================
-- Analytics Setup für Self-Hosted Tracking
-- Führe dieses SQL in deiner Supabase SQL-Konsole aus
-- =============================================

-- 1. Page Views Tabelle
CREATE TABLE IF NOT EXISTS public.page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id text NOT NULL,
  session_id text NOT NULL,
  path text NOT NULL,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  device_type text,
  browser text,
  os text,
  country text,
  screen_width integer,
  screen_height integer,
  created_at timestamptz DEFAULT now()
);

-- 2. Click Events Tabelle (für Heatmap)
CREATE TABLE IF NOT EXISTS public.click_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id text NOT NULL,
  session_id text NOT NULL,
  page_path text NOT NULL,
  x real NOT NULL,
  y real NOT NULL,
  element_selector text,
  viewport_width integer,
  viewport_height integer,
  page_height integer,
  created_at timestamptz DEFAULT now()
);

-- 3. Redirects Tabelle (Kurz-URLs)
CREATE TABLE IF NOT EXISTS public.redirects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  target_url text NOT NULL,
  clicks integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- 4. Tracking Scripts Tabelle
CREATE TABLE IF NOT EXISTS public.tracking_scripts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text NOT NULL,
  position text DEFAULT 'head' CHECK (position IN ('head', 'body')),
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- =============================================
-- Row Level Security (RLS)
-- =============================================

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.click_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracking_scripts ENABLE ROW LEVEL SECURITY;

-- Page Views: Jeder kann einfügen (Tracking), nur Auth kann lesen
CREATE POLICY "Anon kann page_views einfügen" ON public.page_views FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Auth kann page_views lesen" ON public.page_views FOR SELECT TO authenticated USING (true);

-- Click Events: Jeder kann einfügen, nur Auth kann lesen
CREATE POLICY "Anon kann click_events einfügen" ON public.click_events FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Auth kann click_events lesen" ON public.click_events FOR SELECT TO authenticated USING (true);

-- Redirects: Jeder kann lesen (für Redirect-Logik), Auth kann alles
CREATE POLICY "Jeder kann redirects lesen" ON public.redirects FOR SELECT TO anon USING (true);
CREATE POLICY "Auth kann redirects verwalten" ON public.redirects FOR ALL TO authenticated USING (true) WITH CHECK (true);
-- Anon darf clicks hochzählen
CREATE POLICY "Anon kann redirect clicks updaten" ON public.redirects FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- Tracking Scripts: Jeder kann aktive lesen (für DynamicScripts), Auth kann alles
CREATE POLICY "Jeder kann aktive scripts lesen" ON public.tracking_scripts FOR SELECT TO anon USING (active = true);
CREATE POLICY "Auth kann tracking_scripts verwalten" ON public.tracking_scripts FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- =============================================
-- Indizes für Performance
-- =============================================

CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON public.page_views (created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_visitor_id ON public.page_views (visitor_id);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON public.page_views (path);
CREATE INDEX IF NOT EXISTS idx_click_events_page_path ON public.click_events (page_path);
CREATE INDEX IF NOT EXISTS idx_click_events_created_at ON public.click_events (created_at);
CREATE INDEX IF NOT EXISTS idx_redirects_slug ON public.redirects (slug);
