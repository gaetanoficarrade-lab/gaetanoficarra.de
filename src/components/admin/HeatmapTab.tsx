import { useState, useEffect, useMemo, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ClickEvent {
  id: string;
  page_path: string;
  x: number;
  y: number;
  viewport_width: number;
  viewport_height: number;
  page_height: number;
  created_at: string;
}

interface HeatSpot {
  x: number;
  y: number;
  intensity: number;
}

function clusterClicks(dots: { x: number; y: number }[], radius = 2.5): HeatSpot[] {
  const spots: HeatSpot[] = [];
  const used = new Set<number>();

  for (let i = 0; i < dots.length; i++) {
    if (used.has(i)) continue;
    let cx = dots[i].x;
    let cy = dots[i].y;
    let count = 1;
    used.add(i);

    for (let j = i + 1; j < dots.length; j++) {
      if (used.has(j)) continue;
      const dx = dots[j].x - cx;
      const dy = dots[j].y - cy;
      if (Math.sqrt(dx * dx + dy * dy) < radius) {
        cx = (cx * count + dots[j].x) / (count + 1);
        cy = (cy * count + dots[j].y) / (count + 1);
        count++;
        used.add(j);
      }
    }
    spots.push({ x: cx, y: cy, intensity: count });
  }
  return spots;
}

function intensityColor(intensity: number, maxIntensity: number): string {
  const ratio = Math.min(intensity / Math.max(maxIntensity, 1), 1);
  if (ratio < 0.25) return "hsla(200, 80%, 55%, 0.5)";
  if (ratio < 0.5) return "hsla(120, 70%, 50%, 0.55)";
  if (ratio < 0.75) return "hsla(45, 100%, 50%, 0.6)";
  return "hsla(0, 100%, 50%, 0.7)";
}

const HeatmapTab = () => {
  const [clicks, setClicks] = useState<ClickEvent[]>([]);
  const [pages, setPages] = useState<string[]>([]);
  const [selectedPage, setSelectedPage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [opacity, setOpacity] = useState(0.6);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get the base URL for iframe
  const baseUrl = window.location.origin;

  useEffect(() => {
    supabase
      .from("click_events")
      .select("page_path")
      .then(({ data }) => {
        if (data) {
          const uniquePages = [...new Set(data.map((d) => d.page_path))].sort();
          setPages(uniquePages);
          if (uniquePages.length > 0 && !selectedPage) {
            setSelectedPage(uniquePages[0]);
          }
        }
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!selectedPage) return;
    setLoading(true);
    setIframeLoaded(false);
    supabase
      .from("click_events")
      .select("*")
      .eq("page_path", selectedPage)
      .order("created_at", { ascending: false })
      .limit(2000)
      .then(({ data }) => {
        setClicks(data || []);
        setLoading(false);
      });
  }, [selectedPage]);

  const heatSpots = useMemo(() => {
    const dots = clicks.map((c) => ({ x: c.x * 100, y: c.y * 100 }));
    return clusterClicks(dots, 2.5);
  }, [clicks]);

  const maxIntensity = useMemo(
    () => Math.max(...heatSpots.map((s) => s.intensity), 1),
    [heatSpots]
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold">Klick-Heatmap</h2>
        <p className="text-sm text-muted-foreground font-body">
          Klicks direkt auf der echten Seite visualisiert. Farben zeigen die Dichte: <span className="text-blue-400">wenig</span> → <span className="text-green-400">mittel</span> → <span className="text-yellow-400">viel</span> → <span className="text-red-400">heiß</span>
        </p>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <select
          value={selectedPage}
          onChange={(e) => setSelectedPage(e.target.value)}
          className="bg-card border border-border rounded-md px-3 py-1.5 text-sm font-body"
        >
          {pages.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        {!loading && (
          <span className="text-xs text-muted-foreground font-body">
            {clicks.length} Klicks · {heatSpots.length} Bereiche
          </span>
        )}

        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-muted-foreground font-body">Heatmap-Deckkraft:</span>
          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setOpacity((o) => Math.max(0.2, o - 0.1))}>
            <Minus size={14} />
          </Button>
          <span className="text-xs font-body w-8 text-center">{Math.round(opacity * 100)}%</span>
          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setOpacity((o) => Math.min(1, o + 0.1))}>
            <Plus size={14} />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : clicks.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground font-body">
            Noch keine Klicks für diese Seite erfasst. Besuche die Seite und klicke herum, um Daten zu erzeugen.
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0 overflow-hidden rounded-lg">
            <div
              ref={containerRef}
              className="relative w-full overflow-y-auto"
              style={{ height: "70vh" }}
            >
              {/* Echte Seite als Hintergrund */}
              <iframe
                src={`${baseUrl}${selectedPage}`}
                title="Seitenvorschau"
                className="absolute inset-0 w-full border-0 pointer-events-none"
                style={{
                  height: "5000px",
                  transformOrigin: "top left",
                }}
                onLoad={() => setIframeLoaded(true)}
              />

              {/* Heatmap-Overlay */}
              {iframeLoaded && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    height: "5000px",
                    opacity,
                  }}
                >
                  {heatSpots.map((spot, i) => {
                    const size = 20 + Math.min(spot.intensity * 8, 60);
                    const blur = 4 + Math.min(spot.intensity * 3, 16);
                    return (
                      <div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                          left: `${spot.x}%`,
                          top: `${spot.y}%`,
                          width: `${size}px`,
                          height: `${size}px`,
                          transform: "translate(-50%, -50%)",
                          background: `radial-gradient(circle, ${intensityColor(spot.intensity, maxIntensity)} 0%, transparent 70%)`,
                          filter: `blur(${blur}px)`,
                        }}
                      />
                    );
                  })}
                </div>
              )}

              {/* Loading overlay for iframe */}
              {!iframeLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                  <div className="text-center">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground font-body">Seite wird geladen…</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HeatmapTab;
