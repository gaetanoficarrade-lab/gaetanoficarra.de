import { useState, useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, BarChart3, MousePointerClick, ArrowRightLeft, Code, EyeOff, Eye } from "lucide-react";
import { isTrackingExcluded, setTrackingExcluded } from "@/lib/tracker";
import { toast } from "@/hooks/use-toast";
import OverviewTab from "@/components/admin/OverviewTab";
import HeatmapTab from "@/components/admin/HeatmapTab";
import RedirectsTab from "@/components/admin/RedirectsTab";
import TrackingScriptsTab from "@/components/admin/TrackingScriptsTab";

type Tab = "overview" | "heatmap" | "redirects" | "scripts";

const AdminDashboard = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setAuthenticated(true);
      setLoading(false);
    });
  }, []);

  const handleLogin = async () => {
    setLoginLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({ title: "Fehler", description: error.message, variant: "destructive" });
    } else {
      setAuthenticated(true);
    }
    setLoginLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <>
        <SEOHead title="Admin Dashboard" description="Admin-Bereich" noIndex={true} />
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Admin-Zugang</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="email"
                placeholder="E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
              <Input
                type="password"
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
              <Button className="w-full" onClick={handleLogin} disabled={loginLoading}>
                {loginLoading ? "Anmelden..." : "Anmelden"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  const tabs: { id: Tab; label: string; icon: typeof BarChart3 }[] = [
    { id: "overview", label: "Übersicht", icon: BarChart3 },
    { id: "heatmap", label: "Heatmap", icon: MousePointerClick },
    { id: "redirects", label: "Weiterleitungen", icon: ArrowRightLeft },
    { id: "scripts", label: "Tracking Scripts", icon: Code },
  ];

  return (
    <>
      <SEOHead title="Admin Dashboard" description="Admin-Bereich" noIndex={true} />
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 sm:px-6 py-8 max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground font-body">
                Zentrale Verwaltung und globale Statistiken auf einen Blick.
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut size={16} /> Abmelden
            </Button>
          </div>

          {/* Tabs */}
          <nav className="flex gap-1 border-b border-border mb-6 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-body whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-primary text-foreground font-medium"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Tab content */}
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "heatmap" && <HeatmapTab />}
          {activeTab === "redirects" && <RedirectsTab />}
          {activeTab === "scripts" && <TrackingScriptsTab />}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
