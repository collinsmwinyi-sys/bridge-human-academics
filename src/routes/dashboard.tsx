import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Plus, Users, Settings, CreditCard, BookOpen, Gift } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — StudyHuman" }]}),
  component: Dashboard,
});

const requests = [
  { id: "REQ-1042", subject: "Literature review feedback", level: "Master's", status: "In Progress", payment: "Held in escrow" },
  { id: "REQ-1037", subject: "SPSS interpretation walkthrough", level: "PhD", status: "Matched", payment: "Pending" },
  { id: "REQ-1031", subject: "Essay structure & citations", level: "Undergraduate", status: "Completed", payment: "Released" },
  { id: "REQ-1028", subject: "Survey recruitment — 100 participants", level: "Master's", status: "Pending", payment: "Awaiting quote" },
];
const messages = [
  { from: "Dr. Amara", text: "Sent feedback on chapter 2 — let's discuss tomorrow.", t: "2h ago" },
  { from: "Liu (Editor)", text: "Final proofread uploaded. Ready for your review.", t: "yesterday" },
];
const statusColor: Record<string, string> = {
  Pending: "bg-muted text-muted-foreground",
  Matched: "bg-primary/10 text-primary",
  "In Progress": "bg-accent/20 text-accent-foreground",
  Completed: "bg-success/15 text-success",
};

function Dashboard() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Student dashboard</p>
            <h1 className="mt-2 text-4xl">Welcome back, Jane 👋</h1>
            <p className="mt-2 text-muted-foreground">Here's a quick view of your academic support journey.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild className="gradient-hero text-primary-foreground"><Link to="/request-help"><Plus className="mr-1 h-4 w-4" />Request help</Link></Button>
            <Button asChild variant="outline"><Link to="/survey-recruitment"><Users className="mr-1 h-4 w-4" />Survey participants</Link></Button>
            <Button asChild variant="outline"><Link to="/referrals"><Gift className="mr-1 h-4 w-4" />Referrals</Link></Button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: BookOpen, k: "Active requests", v: "2" },
            { icon: MessageSquare, k: "Unread messages", v: "3" },
            { icon: CreditCard, k: "In escrow", v: "$240" },
            { icon: Settings, k: "Helpers worked with", v: "5" },
          ].map((s) => (
            <div key={s.k} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.k}</p>
                <s.icon className="h-4 w-4 text-primary" />
              </div>
              <p className="mt-2 font-display text-3xl">{s.v}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-2xl">Your requests</h2>
            <div className="mt-4 divide-y divide-border">
              {requests.map((r) => (
                <div key={r.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                  <div>
                    <p className="font-medium">{r.subject}</p>
                    <p className="text-xs text-muted-foreground">{r.id} · {r.level}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={statusColor[r.status]}>{r.status}</Badge>
                    <span className="text-xs text-muted-foreground">{r.payment}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h2 className="text-2xl">Messages</h2>
              <div className="mt-4 space-y-4">
                {messages.map((m, i) => (
                  <Link to="/messages" key={i} className="block rounded-xl border border-border bg-background p-4 hover:border-primary/40">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{m.from}</p>
                      <span className="text-xs text-muted-foreground">{m.t}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{m.text}</p>
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h2 className="text-2xl">Profile</h2>
              <p className="mt-2 text-sm text-muted-foreground">Manage your account, notification preferences, and payout methods.</p>
              <Button variant="outline" className="mt-4 w-full">Open settings</Button>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
