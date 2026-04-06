import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";

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

function clusterClicks(dots: { x: number; y: number }[], radius = 3): HeatSpot[] {
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
          Visualisiere, wo Besucher klicken. Farben zeigen die Klick-Dichte: <span className="text-blue-400">wenig</span> → <span className="text-green-400">mittel</span> → <span className="text-yellow-400">viel</span> → <span className="text-red-400">heiß</span>
        </p>
      </div>

      <div className="flex items-center gap-4">
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
          <CardContent className="p-4">
            <div
              className="relative w-full rounded-lg overflow-hidden"
              style={{
                paddingBottom: "180%",
                background: "linear-gradient(180deg, hsl(var(--muted) / 0.2) 0%, hsl(var(--muted) / 0.05) 100%)",
              }}
            >
              {/* Seitenstruktur-Andeutung */}
              {[0, 8, 20, 35, 50, 65, 80].map((top) => (
                <div
                  key={top}
                  className="absolute left-[5%] right-[5%] h-px bg-border/30"
                  style={{ top: `${top}%` }}
                />
              ))}
              <div className="absolute top-[1%] left-[5%] text-[10px] text-muted-foreground/40 font-body">
                Header
              </div>
              <div className="absolute top-[50%] left-[5%] text-[10px] text-muted-foreground/40 font-body">
                Mitte
              </div>
              <div className="absolute top-[90%] left-[5%] text-[10px] text-muted-foreground/40 font-body">
                Footer
              </div>

              {/* Heat spots */}
              {heatSpots.map((spot, i) => {
                const size = 16 + Math.min(spot.intensity * 6, 50);
                const blur = 3 + Math.min(spot.intensity * 2, 12);
                return (
                  <div
                    key={i}
                    className="absolute rounded-full pointer-events-none"
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

              {/* Grid overlay */}
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: "linear-gradient(hsl(var(--border) / 0.15) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.15) 1px, transparent 1px)",
                backgroundSize: "10% 5%",
              }} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HeatmapTab;
