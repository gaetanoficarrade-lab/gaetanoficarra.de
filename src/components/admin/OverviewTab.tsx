import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Globe, Timer, TrendingDown } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";

interface PageView {
  id: string;
  visitor_id: string;
  session_id: string;
  path: string;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  device_type: string | null;
  browser: string | null;
  os: string | null;
  country: string | null;
  region: string | null;
  created_at: string;
}

type DateRange = "7d" | "30d" | "90d";

const OverviewTab = () => {
  const [views, setViews] = useState<PageView[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange>("7d");

  const startDate = useMemo(() => {
    const d = new Date();
    const days = dateRange === "7d" ? 7 : dateRange === "30d" ? 30 : 90;
    d.setDate(d.getDate() - days);
    return d.toISOString();
  }, [dateRange]);

  useEffect(() => {
    setLoading(true);
    supabase
      .from("page_views")
      .select("*")
      .gte("created_at", startDate)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        setViews(data || []);
        setLoading(false);
      });
  }, [startDate]);

  const stats = useMemo(() => {
    const totalViews = views.length;
    const uniqueVisitors = new Set(views.map((v) => v.visitor_id)).size;
    const sessions = new Set(views.map((v) => v.session_id)).size;
    // Bounce rate: sessions with only 1 page view
    const sessionCounts: Record<string, number> = {};
    views.forEach((v) => {
      sessionCounts[v.session_id] = (sessionCounts[v.session_id] || 0) + 1;
    });
    const bounceSessions = Object.values(sessionCounts).filter((c) => c === 1).length;
    const bounceRate = sessions > 0 ? Math.round((bounceSessions / sessions) * 100) : 0;

    return { totalViews, uniqueVisitors, bounceRate, sessions };
  }, [views]);

  const chartData = useMemo(() => {
    const dayMap: Record<string, { date: string; views: number; visitors: Set<string> }> = {};
    views.forEach((v) => {
      const day = v.created_at.slice(0, 10);
      if (!dayMap[day]) dayMap[day] = { date: day, views: 0, visitors: new Set() };
      dayMap[day].views++;
      dayMap[day].visitors.add(v.visitor_id);
    });
    return Object.values(dayMap)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((d) => ({ date: d.date, views: d.views, visitors: d.visitors.size }));
  }, [views]);

  const topReferrers = useMemo(() => {
    const counts: Record<string, number> = {};
    views.forEach((v) => {
      if (v.referrer) {
        try {
          const host = new URL(v.referrer).hostname;
          counts[host] = (counts[host] || 0) + 1;
        } catch {
          counts[v.referrer] = (counts[v.referrer] || 0) + 1;
        }
      }
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  }, [views]);

  const topUTM = useMemo(() => {
    const counts: Record<string, number> = {};
    views.forEach((v) => {
      if (v.utm_source || v.utm_campaign) {
        const key = [v.utm_source, v.utm_medium, v.utm_campaign].filter(Boolean).join(" / ");
        counts[key] = (counts[key] || 0) + 1;
      }
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  }, [views]);

  const topPages = useMemo(() => {
    const counts: Record<string, number> = {};
    views.forEach((v) => {
      counts[v.path] = (counts[v.path] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  }, [views]);

  const deviceBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    views.forEach((v) => {
      const type = v.device_type || "unknown";
      counts[type] = (counts[type] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [views]);

  const countryBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    views.forEach((v) => {
      const c = v.country || "Unbekannt";
      counts[c] = (counts[c] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  }, [views]);

  const regionBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    views.forEach((v) => {
      if (v.region) {
        const label = v.country === "Germany" ? v.region : `${v.region} (${v.country || "?"})`;
        counts[label] = (counts[label] || 0) + 1;
      }
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  }, [views]);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("de-DE", { day: "2-digit", month: "short" });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const liveCount = views.filter(
    (v) => new Date(v.created_at).getTime() > Date.now() - 5 * 60 * 1000
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold">Traffic Übersicht</h2>
          <p className="text-sm text-muted-foreground font-body">
            Deine Webseiten-Besucher im ausgewählten Zeitraum.
          </p>
        </div>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value as DateRange)}
          className="bg-card border border-border rounded-md px-3 py-1.5 text-sm font-body"
        >
          <option value="7d">Letzte 7 Tage</option>
          <option value="30d">Letzte 30 Tage</option>
          <option value="90d">Letzte 90 Tage</option>
        </select>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground font-body">Besucher gesamt</span>
              <Users size={18} className="text-muted-foreground" />
            </div>
            <div className="font-display text-2xl font-bold">{stats.totalViews}</div>
            {liveCount > 0 && (
              <span className="text-xs text-green-500 font-body">↗ {liveCount} Live</span>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground font-body">Eindeutige Besucher</span>
              <Globe size={18} className="text-muted-foreground" />
            </div>
            <div className="font-display text-2xl font-bold">{stats.uniqueVisitors}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground font-body">Absprungrate</span>
              <TrendingDown size={18} className="text-muted-foreground" />
            </div>
            <div className="font-display text-2xl font-bold">{stats.bounceRate}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground font-body">Sessions</span>
              <Timer size={18} className="text-muted-foreground" />
            </div>
            <div className="font-display text-2xl font-bold">{stats.sessions}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-4">
            <h3 className="font-display text-lg font-semibold mb-4">Besucherentwicklung</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(260, 75%, 48%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(260, 75%, 48%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(212, 15%, 86%)" />
                  <XAxis dataKey="date" tickFormatter={formatDate} fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip
                    labelFormatter={formatDate}
                    contentStyle={{
                      background: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(212, 15%, 86%)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="hsl(260, 75%, 48%)"
                    fillOpacity={1}
                    fill="url(#colorViews)"
                    name="Seitenaufrufe"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-display text-lg font-semibold mb-4">Geräte</h3>
            <div className="space-y-3">
              {deviceBreakdown.map((d) => (
                <div key={d.name} className="flex items-center justify-between">
                  <span className="text-sm font-body capitalize">{d.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(d.value / stats.totalViews) * 100}%`,
                          background: "var(--gradient-primary)",
                        }}
                      />
                    </div>
                    <span className="text-sm font-body font-medium w-8 text-right">{d.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Pages, Referrers, UTM */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-display text-lg font-semibold mb-4">Top Seiten</h3>
            <div className="space-y-2">
              {topPages.length === 0 && (
                <p className="text-sm text-muted-foreground font-body">Keine Daten.</p>
              )}
              {topPages.map(([path, count]) => (
                <div key={path} className="flex items-center justify-between">
                  <span className="text-sm font-body truncate max-w-[70%]">{path}</span>
                  <span className="text-sm font-body font-medium">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-display text-lg font-semibold mb-4">Top Referrer</h3>
            <p className="text-xs text-muted-foreground font-body mb-3">Woher deine Besucher kommen.</p>
            <div className="space-y-2">
              {topReferrers.length === 0 && (
                <p className="text-sm text-muted-foreground font-body">Keine Daten.</p>
              )}
              {topReferrers.map(([ref, count]) => (
                <div key={ref} className="flex items-center justify-between">
                  <span className="text-sm font-body truncate max-w-[70%]">{ref}</span>
                  <span className="text-sm font-body font-medium">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-display text-lg font-semibold mb-4">Top UTM Kampagnen</h3>
            <p className="text-xs text-muted-foreground font-body mb-3">Performance deiner Marketing-Kampagnen.</p>
            <div className="space-y-2">
              {topUTM.length === 0 && (
                <p className="text-sm text-muted-foreground font-body">Keine Daten.</p>
              )}
              {topUTM.map(([campaign, count]) => (
                <div key={campaign} className="flex items-center justify-between">
                  <span className="text-sm font-body truncate max-w-[70%]">{campaign}</span>
                  <span className="text-sm font-body font-medium">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab;
