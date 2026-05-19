import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";
import { PriceCalculator } from "@/components/PriceCalculator";

export const Route = createFileRoute("/pricing")({
  head: () => ({ meta: [{ title: "Pricing — StudyHuman" }, { name: "description", content: "Fair, transparent pricing for tutoring, editing, research guidance, and survey recruitment." }]}),
  component: Pricing,
});

const tiers = [
  { t: "Tutoring Support", p: "Starting from $10/hr", d: "Live, 1:1 subject coaching across all academic levels.", f: ["Verified subject experts","Flexible scheduling","Session recordings on request"] },
  { t: "Editing & Proofreading", p: "Custom quote", d: "Polish grammar, clarity, structure, and academic tone.", f: ["Track-changes feedback","Style guide compliance","Two revision rounds"] },
  { t: "Research Guidance", p: "Custom quote", d: "Methodology, literature, and framing support.", f: ["Topic refinement","Source curation","Outline & structure"], featured: true },
  { t: "Data Analysis Guidance", p: "Custom quote", d: "Walkthroughs in SPSS, R, Stata, Python.", f: ["Test selection guidance","Interpretation coaching","Visualization advice"] },
  { t: "Survey Participant Recruitment", p: "Starting from $50", d: "Ethical recruitment across regions.", f: ["Informed consent flow","Targeted demographics","Quality screening"] },
  { t: "Premium Urgent Support", p: "Custom quote based on level, deadline, and complexity", d: "Fast-tracked matching for tight deadlines.", f: ["Priority queue","24/7 helper availability","Senior reviewer"] },
];

function Pricing() {
  return (
    <PageShell>
      <PageHeader eyebrow="Pricing" title="Transparent pricing, scoped to your needs" description="We never sell finished assignments. You pay for human guidance, feedback, and expert time." />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tiers.map((t) => (
            <div key={t.t} className={`flex flex-col rounded-3xl border bg-card p-7 shadow-card ${t.featured ? "border-primary/40 ring-1 ring-primary/20" : "border-border"}`}>
              {t.featured && (
                <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary"><Zap className="h-3 w-3" />Most popular</span>
              )}
              <p className="font-display text-2xl">{t.t}</p>
              <p className="mt-2 text-sm text-muted-foreground">{t.d}</p>
              <p className="mt-5 font-display text-3xl text-primary">{t.p}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {t.f.map((x) => <li key={x} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-success" />{x}</li>)}
              </ul>
              <Button asChild className="mt-6 gradient-hero text-primary-foreground"><Link to="/request-help">Request this service</Link></Button>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground">Need a custom quote? <Link to="/request-help" className="font-medium text-primary">Submit a request</Link> and we'll respond within hours.</p>
      </section>
      <PriceCalculator />
    </PageShell>
  );
}
