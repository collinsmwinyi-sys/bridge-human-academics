import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users, FileText, ClipboardList, CreditCard, AlertTriangle, CheckCircle2, Settings, TrendingUp, MessageCircle, Send } from "lucide-react";
import { useEffect, useState, type ComponentType } from "react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin dashboard — StudyHuman" }] }),
  component: Admin,
});

type Msg = { id: string; from: "user" | "agent" | "system"; text: string; at: number };
type ChatState = {
  name: string;
  email: string;
  phone: string;
  startedAt: number;
  status: "active" | "waiting" | "resolved" | "closed";
  messages: Msg[];
};
const ADMIN_KEY = "studyhuman_live_chats_admin_v1";

function Admin() {
  const stats = [
    { icon: Users, k: "Total users", v: "12,480" },
    { icon: ClipboardList, k: "Student requests", v: "1,236" },
    { icon: FileText, k: "Helper applications", v: "84" },
    { icon: TrendingUp, k: "Survey requests", v: "172" },
    { icon: CreditCard, k: "Payments processed", v: "$48,300" },
    { icon: AlertTriangle, k: "Open disputes", v: "3" },
    { icon: CheckCircle2, k: "Completed projects", v: "4,902" },
    { icon: Settings, k: "Categories", v: "32" },
  ];
  const applicants = [
    { name: "Dr. Mei Tan", area: "Statistics · PhD", country: "Singapore" },
    { name: "Carlos Rivera", area: "Sociology · MA", country: "Mexico" },
    { name: "Aisha Bello", area: "English Editing · MSc", country: "Nigeria" },
  ];

  const [chats, setChats] = useState<ChatState[]>([]);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [reply, setReply] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem(ADMIN_KEY);
        setChats(raw ? JSON.parse(raw) : []);
      } catch {}
    };
    load();
    const i = setInterval(load, 2000);
    return () => clearInterval(i);
  }, []);

  const filtered = chats.filter((c) => {
    const q = search.toLowerCase();
    return !q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.messages.some((m) => m.text.toLowerCase().includes(q));
  });
  const active = activeIdx !== null ? filtered[activeIdx] : null;

  const update = (next: ChatState) => {
    const all = [...chats];
    const idx = all.findIndex((c) => c.email === next.email && c.startedAt === next.startedAt);
    if (idx >= 0) all[idx] = next;
    setChats(all);
    localStorage.setItem(ADMIN_KEY, JSON.stringify(all));
  };

  const sendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!active || !reply.trim()) return;
    const m: Msg = { id: crypto.randomUUID(), from: "agent", at: Date.now(), text: reply.trim() };
    update({ ...active, messages: [...active.messages, m], status: "active" });
    setReply("");
  };

  const statusVariant = (s: ChatState["status"]) =>
    s === "active" ? "bg-success/10 text-success" : s === "waiting" ? "bg-warning/10 text-warning" : s === "resolved" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground";

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Admin dashboard</p>
          <h1 className="mt-2 text-4xl">Operations overview</h1>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => {
            const Icon = s.icon as ComponentType<{ className?: string }>;
            return (
              <div key={s.k} className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.k}</p>
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <p className="mt-2 font-display text-3xl">{s.v}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl">Helper applications</h2>
              <Badge className="bg-primary/10 text-primary">{applicants.length} pending</Badge>
            </div>
            <div className="mt-4 divide-y divide-border">
              {applicants.map((a) => (
                <div key={a.name} className="flex flex-wrap items-center justify-between gap-3 py-4">
                  <div>
                    <p className="font-medium">{a.name}</p>
                    <p className="text-xs text-muted-foreground">{a.area} · {a.country}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Reject</Button>
                    <Button size="sm" className="gradient-hero text-primary-foreground">Approve</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-2xl">Recent activity</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                "Payment released for REQ-1029 ($85)",
                "Survey campaign launched — 200 participants",
                "Dispute opened on REQ-0982",
                "New category added: Engineering Lab Reports",
                "Helper Dr. Amara onboarded",
              ].map((x) => (
                <li key={x} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />{x}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <h2 className="text-2xl">Live Chats</h2>
              <Badge className="bg-primary/10 text-primary">
                {chats.filter((c) => c.status === "active" || c.status === "waiting").length} open
              </Badge>
            </div>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, or message history..."
              className="max-w-xs"
            />
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[320px_1fr]">
            <div className="max-h-[480px] overflow-y-auto rounded-xl border border-border bg-surface/40 p-2">
              {filtered.length === 0 && (
                <p className="p-4 text-sm text-muted-foreground">No live chats yet. When a visitor starts a chat, it will appear here.</p>
              )}
              {filtered.map((c, i) => (
                <button
                  key={c.email + c.startedAt}
                  onClick={() => setActiveIdx(i)}
                  className={`mb-1 block w-full rounded-lg p-3 text-left transition-colors ${activeIdx === i ? "bg-card shadow-soft" : "hover:bg-card/60"}`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{c.name}</p>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusVariant(c.status)}`}>{c.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{c.email}</p>
                  <p className="text-xs text-muted-foreground">{c.phone}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{new Date(c.startedAt).toLocaleString()}</p>
                </button>
              ))}
            </div>

            <div className="flex h-[480px] flex-col rounded-xl border border-border bg-background">
              {!active ? (
                <div className="grid flex-1 place-items-center text-sm text-muted-foreground">Select a chat to view the conversation.</div>
              ) : (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border p-3">
                    <div>
                      <p className="font-medium">{active.name} <span className="text-xs text-muted-foreground">· {active.email} · {active.phone}</span></p>
                      <p className="text-xs text-muted-foreground">Status: {active.status}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => update({ ...active, status: "resolved" })}>Mark resolved</Button>
                      <Button size="sm" variant="outline" onClick={() => update({ ...active, status: "closed" })}>Close chat</Button>
                    </div>
                  </div>
                  <div className="flex-1 space-y-3 overflow-y-auto p-4">
                    {active.messages.map((m) => (
                      <div key={m.id} className={`flex ${m.from === "agent" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm shadow-soft ${m.from === "agent" ? "gradient-hero text-primary-foreground" : "border border-border bg-card"}`}>
                          <p className="whitespace-pre-wrap">{m.text}</p>
                          <p className={`mt-1 text-[10px] ${m.from === "agent" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                            {new Date(m.at).toLocaleString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={sendReply} className="flex gap-2 border-t border-border p-3">
                    <Input value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Reply as human agent..." />
                    <Button type="submit" className="gradient-hero text-primary-foreground"><Send className="h-4 w-4" /></Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}