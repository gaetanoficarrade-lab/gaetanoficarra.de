import { useState, useEffect } from "react";
import { supabase, type BlogPost } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2, ArrowLeft, Save, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

type EditorPost = Omit<BlogPost, "id" | "created_at" | "updated_at"> & { id?: string };

const emptyPost: EditorPost = {
  title: "",
  slug: "",
  description: "",
  content: "",
  cover_image: null,
  published_at: null,
  published: false,
};

const ADMIN_PASSWORD = "21071981";

const AdminBlog = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<EditorPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Fehler", description: error.message, variant: "destructive" });
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { if (authenticated) fetchPosts(); }, [authenticated]);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Admin-Zugang</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Passwort eingeben"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && passwordInput === ADMIN_PASSWORD) setAuthenticated(true);
              }}
            />
            <Button
              className="w-full"
              onClick={() => {
                if (passwordInput === ADMIN_PASSWORD) {
                  setAuthenticated(true);
                } else {
                  toast({ title: "Falsches Passwort", variant: "destructive" });
                }
              }}
            >
              Anmelden
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[äÄ]/g, "ae").replace(/[öÖ]/g, "oe").replace(/[üÜ]/g, "ue").replace(/ß/g, "ss")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const handleSave = async () => {
    if (!editing) return;
    if (!editing.title || !editing.slug) {
      toast({ title: "Fehler", description: "Titel und Slug sind Pflichtfelder.", variant: "destructive" });
      return;
    }
    setSaving(true);

    const payload = {
      title: editing.title,
      slug: editing.slug,
      description: editing.description,
      content: editing.content,
      cover_image: editing.cover_image || null,
      published: editing.published,
      published_at: editing.published ? (editing.published_at || new Date().toISOString()) : null,
    };

    let error;
    if (editing.id) {
      ({ error } = await supabase.from("blog_posts").update(payload).eq("id", editing.id));
    } else {
      ({ error } = await supabase.from("blog_posts").insert(payload));
    }

    if (error) {
      toast({ title: "Fehler beim Speichern", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Gespeichert", description: `"${editing.title}" wurde gespeichert.` });
      setEditing(null);
      fetchPosts();
    }
    setSaving(false);
  };

  const handleDelete = async (post: BlogPost) => {
    if (!confirm(`Artikel "${post.title}" wirklich löschen?`)) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", post.id);
    if (error) {
      toast({ title: "Fehler", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Gelöscht", description: `"${post.title}" wurde gelöscht.` });
      fetchPosts();
    }
  };

  // Editor view
  if (editing) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-6 py-8 max-w-4xl">
          <button onClick={() => setEditing(null)} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 font-body">
            <ArrowLeft size={16} /> Zurück zur Übersicht
          </button>

          <h1 className="font-display text-3xl font-bold mb-8">
            {editing.id ? "Artikel bearbeiten" : "Neuer Artikel"}
          </h1>

          <div className="space-y-6">
            <div>
              <Label htmlFor="title">Titel</Label>
              <Input
                id="title"
                value={editing.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setEditing((prev) => prev ? { ...prev, title, slug: prev.id ? prev.slug : generateSlug(title) } : prev);
                }}
                placeholder="Artikeltitel"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={editing.slug}
                onChange={(e) => setEditing((prev) => prev ? { ...prev, slug: e.target.value } : prev)}
                placeholder="url-freundlicher-slug"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description">Meta-Description / Kurzbeschreibung</Label>
              <Textarea
                id="description"
                value={editing.description}
                onChange={(e) => setEditing((prev) => prev ? { ...prev, description: e.target.value } : prev)}
                placeholder="Kurze Beschreibung für SEO und Vorschau"
                rows={3}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="cover_image">Cover-Bild URL</Label>
              <Input
                id="cover_image"
                value={editing.cover_image || ""}
                onChange={(e) => setEditing((prev) => prev ? { ...prev, cover_image: e.target.value || null } : prev)}
                placeholder="https://..."
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="content">Inhalt (Markdown)</Label>
              <Textarea
                id="content"
                value={editing.content}
                onChange={(e) => setEditing((prev) => prev ? { ...prev, content: e.target.value } : prev)}
                placeholder="## Überschrift&#10;&#10;Text mit **fett**..."
                rows={20}
                className="mt-1 font-mono text-sm"
              />
            </div>

            <div className="flex items-center gap-3">
              <Switch
                id="published"
                checked={editing.published}
                onCheckedChange={(checked) => setEditing((prev) => prev ? { ...prev, published: checked } : prev)}
              />
              <Label htmlFor="published" className="flex items-center gap-2">
                {editing.published ? <Eye size={16} /> : <EyeOff size={16} />}
                {editing.published ? "Veröffentlicht" : "Entwurf"}
              </Label>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSave} disabled={saving} className="gap-2">
                <Save size={16} /> {saving ? "Speichert..." : "Speichern"}
              </Button>
              <Button variant="outline" onClick={() => setEditing(null)}>Abbrechen</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4 font-body">
              <ArrowLeft size={16} /> Zur Webseite
            </Link>
            <h1 className="font-display text-3xl font-bold">Blog verwalten</h1>
          </div>
          <Button onClick={() => setEditing({ ...emptyPost })} className="gap-2">
            <Plus size={16} /> Neuer Artikel
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground font-body">
              Noch keine Artikel vorhanden. Erstelle deinen ersten Artikel!
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="hover:border-primary/30 transition-colors">
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="font-display text-lg font-semibold truncate">{post.title}</h2>
                      <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-body ${post.published ? "bg-green-500/10 text-green-400" : "bg-muted text-muted-foreground"}`}>
                        {post.published ? <><Eye size={12} /> Live</> : <><EyeOff size={12} /> Entwurf</>}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground font-body truncate">/blog/{post.slug}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {post.published && (
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/blog/${post.slug}`} target="_blank"><Eye size={16} /></Link>
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => setEditing(post)}>
                      <Pencil size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(post)} className="text-destructive hover:text-destructive">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlog;
