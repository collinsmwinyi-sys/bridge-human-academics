import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/messages")({
  head: () => ({ meta: [{ title: "Messages — ScholarBridge" }]}),
  component: Page,
});

const threads = [
  { id: 1, name: "Dr. Amara Okafor", role: "Research Guidance", unread: 2 },
  { id: 2, name: "Liu (Editor)", role: "Proofreading", unread: 0 },
  { id: 3, name: "Marco S.", role: "Tutoring · Stats", unread: 1 },
];

const initial = [
  { from: "Dr. Amara", text: "I reviewed your chapter 2 — strong framing. A few notes on transitions." },
  { from: "you", text: "Thanks! Can we set a 30-min call tomorrow?" },
  { from: "Dr. Amara", text: "Of course. 10am your time works." },
];

function Page() {
  const [active, setActive] = useState(threads[0].id);
  const [msgs, setMsgs] = useState(initial);
  const [text, setText] = useState("");
  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h1 className="text-3xl">Messages</h1>
        <div className="mt-6 grid h-[640px] grid-cols-1 gap-4 rounded-3xl border border-border bg-card p-2 shadow-card md:grid-cols-[300px_1fr]">
          <aside className="overflow-y-auto rounded-2xl bg-surface p-2">
            {threads.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`flex w-full items-center justify-between rounded-xl p-3 text-left transition-colors ${active === t.id ? "bg-card shadow-soft" : "hover:bg-card/60"}`}
              >
                <div>
                  <p className="font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
                {t.unread > 0 && <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">{t.unread}</span>}
              </button>
            ))}
          </aside>
          <div className="flex flex-col rounded-2xl border border-border bg-background">
            <div className="border-b border-border p-4">
              <p className="font-medium">{threads.find(t => t.id === active)?.name}</p>
              <p className="text-xs text-muted-foreground">Conversation linked to REQ-1042</p>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.from === "you" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-md rounded-2xl px-4 py-2 text-sm shadow-soft ${m.from === "you" ? "gradient-hero text-primary-foreground" : "bg-muted text-foreground"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); if (!text.trim()) return; setMsgs([...msgs, { from: "you", text }]); setText(""); }}
              className="flex gap-2 border-t border-border p-3"
            >
              <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a message..." />
              <Button type="submit" className="gradient-hero text-primary-foreground"><Send className="h-4 w-4" /></Button>
            </form>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
