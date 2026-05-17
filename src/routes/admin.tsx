import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, ClipboardList, CreditCard, AlertTriangle, CheckCircle2, Settings, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin dashboard — StudyHuman" }]}),
  component: Admin,
});

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
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Admin dashboard</p>
          <h1 className="mt-2 text-4xl">Operations overview</h1>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.k} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.k}</p>
                <s.icon className="h-4 w-4 text-primary" />
              </div>
              <p className="mt-2 font-display text-3xl">{s.v}</p>
            </div>
          ))}
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
      </section>
    </PageShell>
  );
}
