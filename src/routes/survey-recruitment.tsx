import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { PriceCalculator } from "@/components/PriceCalculator";

export const Route = createFileRoute("/survey-recruitment")({
  head: () => ({ meta: [{ title: "Survey participant recruitment — StudyHuman" }, { name: "description", content: "Ethically recruit real participants for academic surveys worldwide." }]}),
  component: Page,
});

function Page() {
  const [ethics, setEthics] = useState(false);
  const [consent, setConsent] = useState(false);
  return (
    <PageShell>
      <PageHeader eyebrow="Survey participants" title="Find Survey Participants" description="Need participants for your academic survey? StudyHuman helps students and researchers connect with real human participants for ethical, consent-based survey research. All survey participation must be voluntary, privacy-respecting, and based on clear informed consent." />
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-sm">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p>All recruitment campaigns follow informed-consent and data-privacy standards. Participants opt in voluntarily and may withdraw at any time.</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); if (!consent) return toast.error("Please confirm the consent statement."); toast.success("Recruitment request submitted!"); }} className="space-y-5 rounded-3xl border border-border bg-card p-8 shadow-card">
          <Wrap label="Research title"><Input placeholder="e.g. Mental health and remote learning" /></Wrap>
          <div className="grid gap-5 sm:grid-cols-2">
            <Wrap label="Academic level">
              <Select><SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                <SelectContent>{["Undergraduate","Master's","PhD","Independent Researcher"].map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
              </Select>
            </Wrap>
            <Wrap label="Institution"><Input placeholder="University / organization" /></Wrap>
            <Wrap label="Target participants"><Input placeholder="e.g. university students 18–25" /></Wrap>
            <Wrap label="Country / region"><Input placeholder="e.g. Global, East Africa, EU" /></Wrap>
            <Wrap label="Participants needed"><Input type="number" placeholder="e.g. 200" /></Wrap>
            <Wrap label="Estimated completion time"><Input placeholder="e.g. 8 minutes" /></Wrap>
            <Wrap label="Incentive / payment per participant"><Input placeholder="e.g. $2" /></Wrap>
            <Wrap label="Deadline"><Input type="date" /></Wrap>
          </div>
          <Wrap label="Survey link"><Input type="url" placeholder="https://..." /></Wrap>
          <Wrap label="Additional notes"><Textarea rows={4} placeholder="Eligibility criteria, exclusions, screening questions, etc." /></Wrap>
          <label className="flex items-start gap-3 rounded-xl bg-muted/60 p-4 text-sm">
            <Checkbox checked={ethics} onCheckedChange={(v) => setEthics(Boolean(v))} className="mt-0.5" />
            <span>My research has ethics approval (or does not require one).</span>
          </label>
          <label className="flex items-start gap-3 rounded-xl bg-primary/5 p-4 text-sm">
            <Checkbox checked={consent} onCheckedChange={(v) => setConsent(Boolean(v))} className="mt-0.5" />
            <span>I will provide participants with informed consent, allow withdrawal at any time, and protect their privacy.</span>
          </label>
          <Button type="submit" size="lg" className="w-full gradient-hero text-primary-foreground shadow-elegant">Launch recruitment</Button>
        </form>
      </section>
      <PriceCalculator mode="survey" defaultService="Survey Participant Recruitment" />
    </PageShell>
  );
}

function Wrap({ label, children }: { label: string; children: React.ReactNode }) {
  return (<div className="space-y-2"><Label className="text-sm font-medium">{label}</Label>{children}</div>);
}
