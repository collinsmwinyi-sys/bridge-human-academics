import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/PageShell";
import { ShieldCheck, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/academic-integrity")({
  head: () => ({ meta: [{ title: "Academic Integrity Policy — StudyHuman" }, { name: "description", content: "Our strict ethical framework for academic support." }]}),
  component: Page,
});

function Page() {
  const dos = [
    "Provide tutoring, coaching, and feedback",
    "Edit and proofread student-authored work",
    "Guide research methodology and structure",
    "Help interpret data and analysis outputs",
    "Support formatting, citations, and references",
  ];
  const donts = [
    "Write or submit assignments on a student's behalf",
    "Take exams or impersonate students",
    "Guarantee specific grades or outcomes",
    "Provide or distribute plagiarized content",
    "Bypass institutional policies",
  ];
  return (
    <PageShell>
      <PageHeader eyebrow="Academic integrity" title="Our policy is simple: we help students learn — we never replace them" description="StudyHuman exists to strengthen learning. The framework below applies to every student, helper, and project on our platform." />
      <section className="mx-auto max-w-4xl space-y-8 px-4 py-12 sm:px-6">
        <div className="flex items-start gap-4 rounded-3xl border border-primary/20 bg-primary/5 p-6">
          <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-primary" />
          <p className="text-base">
            StudyHuman does not provide cheating services. Helpers provide tutoring, feedback, review, editing, coaching, and research support. Students remain fully responsible for the work they submit to their institutions.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-2xl">What helpers do</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {dos.map((x) => <li key={x} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />{x}</li>)}
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-2xl">What we never do</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {donts.map((x) => <li key={x} className="flex items-start gap-2"><X className="mt-0.5 h-4 w-4 text-destructive" />{x}</li>)}
            </ul>
          </div>
        </div>
        <div className="rounded-3xl border border-border bg-card p-8 shadow-card">
          <h2 className="text-2xl">Student responsibilities</h2>
          <p className="mt-3 text-muted-foreground">By using StudyHuman, you agree to use guidance as a learning tool. Plagiarism, impersonation, and exam cheating are strictly prohibited and may result in immediate account termination.</p>
          <Button asChild className="mt-6 gradient-hero text-primary-foreground"><Link to="/register">Agree & create account</Link></Button>
        </div>
      </section>
    </PageShell>
  );
}
