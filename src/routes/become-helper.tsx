import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/become-helper")({
  head: () => ({ meta: [{ title: "Become a helper — ScholarBridge" }, { name: "description", content: "Apply to join ScholarBridge as a verified academic helper." }]}),
  component: Page,
});

function Page() {
  const [agree, setAgree] = useState(false);
  return (
    <PageShell>
      <PageHeader eyebrow="Apply as a helper" title="Share your expertise. Help students learn ethically." description="Tutors, editors, researchers, and academic mentors — join our verified global community." />
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <form onSubmit={(e) => { e.preventDefault(); if (!agree) return toast.error("Please accept the helper policy."); toast.success("Application submitted! We'll review and respond shortly."); }} className="space-y-5 rounded-3xl border border-border bg-card p-8 shadow-card">
          <div className="grid gap-5 sm:grid-cols-2">
            <Wrap label="Full name"><Input required /></Wrap>
            <Wrap label="Email"><Input required type="email" /></Wrap>
            <Wrap label="Country"><Input required /></Wrap>
            <Wrap label="Highest education level">
              <Select><SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                <SelectContent>{["Bachelor's","Master's","PhD","Postdoc","Professional"].map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
              </Select>
            </Wrap>
          </div>
          <Wrap label="Areas of expertise"><Input placeholder="e.g. Statistics, English Literature, Public Health" /></Wrap>
          <Wrap label="Experience"><Textarea rows={4} placeholder="Briefly describe your teaching, tutoring, editing, or research experience." /></Wrap>
          <Wrap label="Preferred services"><Input placeholder="e.g. Tutoring, Editing, Research Guidance" /></Wrap>
          <div className="grid gap-5 sm:grid-cols-2">
            <Wrap label="Hourly rate (USD)"><Input type="number" placeholder="e.g. 25" /></Wrap>
            <Wrap label="Project rate (optional)"><Input type="number" placeholder="e.g. 150" /></Wrap>
          </div>
          <div>
            <Label className="text-sm font-medium">Upload CV / resume</Label>
            <label className="mt-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-muted/40 px-6 py-8 text-center text-sm text-muted-foreground hover:border-primary/40">
              <Upload className="h-5 w-5 text-primary" />
              <span>Click to upload (PDF, DOCX)</span>
              <input type="file" className="hidden" />
            </label>
          </div>
          <label className="flex items-start gap-3 rounded-xl bg-primary/5 p-4 text-sm">
            <Checkbox checked={agree} onCheckedChange={(v) => setAgree(Boolean(v))} className="mt-0.5" />
            <span>I agree to ScholarBridge's academic integrity and quality policy — I will provide guidance, feedback, and tutoring, never complete assignments on behalf of students.</span>
          </label>
          <Button type="submit" size="lg" className="w-full gradient-hero text-primary-foreground shadow-elegant">Submit application</Button>
        </form>
      </section>
    </PageShell>
  );
}

function Wrap({ label, children }: { label: string; children: React.ReactNode }) {
  return (<div className="space-y-2"><Label className="text-sm font-medium">{label}</Label>{children}</div>);
}
