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

export const Route = createFileRoute("/request-help")({
  head: () => ({ meta: [{ title: "Request academic help — ScholarBridge" }]}),
  component: Page,
});

function Page() {
  const [ok, setOk] = useState(false);
  return (
    <PageShell>
      <PageHeader eyebrow="Request academic help" title="Tell us what you need — we'll match you with a real expert" description="Tutoring, editing, research guidance, formatting, data analysis support, and more." />
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <form onSubmit={(e) => { e.preventDefault(); if (!ok) return toast.error("Please confirm the integrity statement."); toast.success("Request submitted! We'll match you shortly."); }} className="space-y-6 rounded-3xl border border-border bg-card p-8 shadow-card">
          <div className="grid gap-5 sm:grid-cols-2">
            <Wrap label="Academic level">
              <Select><SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                <SelectContent>{["High School","Diploma","Undergraduate","Master's","PhD"].map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
              </Select>
            </Wrap>
            <Wrap label="Subject"><Input placeholder="e.g. Sociology" /></Wrap>
            <Wrap label="Type of help">
              <Select><SelectTrigger><SelectValue placeholder="Select service" /></SelectTrigger>
                <SelectContent>{["Tutoring","Editing","Proofreading","Research Guidance","Formatting","Data Analysis Guidance","Study Coaching","Presentation Help"].map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
              </Select>
            </Wrap>
            <Wrap label="Deadline"><Input type="date" /></Wrap>
            <Wrap label="Budget (USD)"><Input type="number" placeholder="e.g. 50" /></Wrap>
          </div>
          <Wrap label="Instructions"><Textarea rows={5} placeholder="Describe what you need help with. Share context, requirements, and goals." /></Wrap>
          <div>
            <Label className="text-sm font-medium">Upload file (optional)</Label>
            <label className="mt-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-muted/40 px-6 py-10 text-center text-sm text-muted-foreground hover:border-primary/40">
              <Upload className="h-5 w-5 text-primary" />
              <span>Drag & drop a file, or click to browse</span>
              <input type="file" className="hidden" />
            </label>
          </div>
          <label className="flex items-start gap-3 rounded-xl bg-primary/5 p-4 text-sm">
            <Checkbox checked={ok} onCheckedChange={(v) => setOk(Boolean(v))} className="mt-0.5" />
            <span>I understand that ScholarBridge provides learning support, tutoring, editing, and guidance only. I will not use this service for academic dishonesty.</span>
          </label>
          <Button type="submit" size="lg" className="w-full gradient-hero text-primary-foreground shadow-elegant">Submit request</Button>
        </form>
      </section>
    </PageShell>
  );
}

function Wrap({ label, children }: { label: string; children: React.ReactNode }) {
  return (<div className="space-y-2"><Label className="text-sm font-medium">{label}</Label>{children}</div>);
}
