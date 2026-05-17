import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHeader } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Upload, ShieldCheck, ChevronRight, Bot, Repeat, MessageSquare,
  Workflow, Quote, Sparkles, FileQuestion, AlertTriangle, GraduationCap,
  UserCheck, FlaskConical, PenLine, Users,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/ai-writing-check")({
  head: () => ({
    meta: [
      { title: "AI Writing Check — StudyHuman" },
      { name: "description", content: "Get a human review of your writing to identify AI-like patterns, weak originality, citation issues, and areas that need stronger human voice." },
      { property: "og:title", content: "AI Writing Check — StudyHuman" },
      { property: "og:description", content: "Human review of writing for AI-like patterns, originality concerns, and citation quality." },
      { property: "og:url", content: "/ai-writing-check" },
    ],
    links: [{ rel: "canonical", href: "/ai-writing-check" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <Hero />
      <HowItWorks />
      <WhatWeCheck />
      <SubmitForm />
      <Disclaimer />
      <WhoCanUse />
      <PricingPreview />
      <IntegrityNote />
    </PageShell>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 -z-10 gradient-soft" />
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          Human review, not blind AI detector results.
        </div>
        <h1 className="mt-5 text-5xl leading-[1.05] sm:text-6xl">
          Check If Your Work<br />
          <span className="italic text-primary">Sounds AI-Written</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Get a human review of your writing to identify AI-like patterns, weak originality, unclear arguments, citation issues, and areas that need stronger human voice.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" className="gradient-hero text-primary-foreground shadow-elegant">
            <a href="#submit">Submit Writing for Review <ChevronRight className="ml-1 h-4 w-4" /></a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/academic-integrity">Our integrity policy</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Section({ eyebrow, title, description, children, id }: { eyebrow?: string; title?: string; description?: string; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      {(eyebrow || title) && (
        <div className="mb-10 max-w-2xl">
          {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>}
          {title && <h2 className="mt-3 text-3xl sm:text-4xl">{title}</h2>}
          {description && <p className="mt-3 text-muted-foreground">{description}</p>}
        </div>
      )}
      {children}
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Upload or paste your writing", d: "Share the text you'd like reviewed — paste it directly or upload a document." },
    { n: "02", t: "Choose your academic level and review type", d: "Tell us your level and what kind of human review you want." },
    { n: "03", t: "A verified human reviewer checks the work", d: "A real academic reviewer reads the writing carefully — no blind AI detector." },
    { n: "04", t: "Receive structured feedback", d: "Get notes on originality, tone, structure, citations, and improvement areas." },
  ];
  return (
    <Section eyebrow="How it works" title="A clear, human-led review process">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <div key={s.n} className="rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant">
            <span className="font-serif text-3xl text-primary/40">{s.n}</span>
            <p className="mt-3 font-display text-xl">{s.t}</p>
            <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function WhatWeCheck() {
  const items = [
    { icon: Bot, t: "AI-like writing patterns", d: "Sentence rhythms and phrasing that often signal generated text." },
    { icon: Repeat, t: "Repetitive or generic phrasing", d: "Overused stock phrases and recycled structures." },
    { icon: MessageSquare, t: "Weak personal voice", d: "Writing that lacks a clear authorial perspective." },
    { icon: Workflow, t: "Unclear argument flow", d: "Logic gaps, weak transitions, and unfocused paragraphs." },
    { icon: Quote, t: "Citation and referencing issues", d: "Missing, inconsistent, or incorrectly formatted sources." },
    { icon: Sparkles, t: "Overly polished or robotic tone", d: "Text that reads unnaturally smooth or detached." },
    { icon: FileQuestion, t: "Missing evidence", d: "Claims that aren't backed by data, examples, or sources." },
    { icon: ShieldCheck, t: "Academic integrity risks", d: "Patterns that may concern instructors or reviewers." },
  ];
  return (
    <Section eyebrow="What we check" title="Eight angles, reviewed by a real person">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((s) => (
          <div key={s.t} className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><s.icon className="h-5 w-5" /></div>
            <p className="font-display text-lg">{s.t}</p>
            <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function SubmitForm() {
  const [ok, setOk] = useState(false);
  return (
    <Section id="submit" eyebrow="Submit" title="Submit writing for AI review">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!ok) return toast.error("Please confirm you understand the review scope.");
          toast.success("Submitted! A human reviewer will be in touch shortly.");
        }}
        className="mx-auto max-w-3xl space-y-6 rounded-3xl border border-border bg-card p-8 shadow-card"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Wrap label="Full name"><Input placeholder="Your full name" required /></Wrap>
          <Wrap label="Email address"><Input type="email" placeholder="you@example.com" required /></Wrap>
          <Wrap label="Academic level">
            <Select>
              <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
              <SelectContent>
                {["High School","Diploma or Certificate","Undergraduate","Master's","PhD"].map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
              </SelectContent>
            </Select>
          </Wrap>
          <Wrap label="Subject area"><Input placeholder="e.g. Psychology" /></Wrap>
          <Wrap label="Review type">
            <Select>
              <SelectTrigger><SelectValue placeholder="Select review" /></SelectTrigger>
              <SelectContent>
                {["Quick AI Writing Check","Detailed Human Originality Review","Citation and Source Review","Academic Tone Improvement","Full Writing Feedback"].map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
              </SelectContent>
            </Select>
          </Wrap>
          <Wrap label="Deadline"><Input type="date" /></Wrap>
          <Wrap label="Budget (USD)"><Input type="number" placeholder="e.g. 25" /></Wrap>
        </div>
        <Wrap label="Paste text"><Textarea rows={8} placeholder="Paste the writing you'd like reviewed..." /></Wrap>
        <div>
          <Label className="text-sm font-medium">Upload file (optional)</Label>
          <label className="mt-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-muted/40 px-6 py-10 text-center text-sm text-muted-foreground hover:border-primary/40">
            <Upload className="h-5 w-5 text-primary" />
            <span>Drag & drop a file, or click to browse</span>
            <input type="file" className="hidden" />
          </label>
        </div>
        <Wrap label="Additional instructions"><Textarea rows={4} placeholder="Anything specific you want the reviewer to focus on?" /></Wrap>
        <label className="flex items-start gap-3 rounded-xl bg-primary/5 p-4 text-sm">
          <Checkbox checked={ok} onCheckedChange={(v) => setOk(Boolean(v))} className="mt-0.5" />
          <span>I understand that StudyHuman does not guarantee 100% AI detection accuracy. This service provides human feedback on writing style, originality concerns, citation quality, structure, and academic integrity.</span>
        </label>
        <Button type="submit" size="lg" className="w-full gradient-hero text-primary-foreground shadow-elegant">Submit for Human Review</Button>
      </form>
    </Section>
  );
}

function Wrap({ label, children }: { label: string; children: React.ReactNode }) {
  return (<div className="space-y-2"><Label className="text-sm font-medium">{label}</Label>{children}</div>);
}

function Disclaimer() {
  return (
    <Section>
      <div className="mx-auto max-w-4xl rounded-3xl border border-accent/30 bg-accent/10 p-8 shadow-card sm:p-10">
        <div className="flex items-start gap-4">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/20 text-accent-foreground">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl">AI Detection Is Not Always Accurate</h2>
            <p className="mt-3 text-muted-foreground">
              AI detection tools can produce false positives and false negatives. StudyHuman does not claim to prove whether a text was written by AI. Instead, our reviewers provide careful human feedback on whether the writing sounds overly generic, robotic, unsupported, poorly cited, or inconsistent with academic expectations.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function WhoCanUse() {
  const items = [
    { icon: GraduationCap, t: "Students checking their own drafts" },
    { icon: UserCheck, t: "Teachers reviewing suspicious writing" },
    { icon: FlaskConical, t: "Researchers checking academic tone" },
    { icon: PenLine, t: "Writers improving originality" },
    { icon: Users, t: "Academic helpers reviewing client drafts" },
  ];
  return (
    <Section eyebrow="Who it's for" title="Who can use this service">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((s) => (
          <div key={s.t} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="mb-3 grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary"><s.icon className="h-5 w-5" /></div>
            <p className="text-sm font-medium">{s.t}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function PricingPreview() {
  const tiers = [
    { t: "Quick AI Writing Check", p: "Starting from $10" },
    { t: "Detailed Human Originality Review", p: "Custom Quote" },
    { t: "Citation and Source Review", p: "Starting from $15" },
    { t: "Full Writing Feedback", p: "Custom Quote" },
  ];
  return (
    <Section eyebrow="Pricing preview" title="Transparent, scoped to your review">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {tiers.map((t) => (
          <div key={t.t} className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <p className="font-display text-lg">{t.t}</p>
            <p className="mt-3 font-display text-2xl text-primary">{t.p}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Pricing depends on document length, academic level, deadline, and review depth.
      </p>
    </Section>
  );
}

function IntegrityNote() {
  return (
    <Section>
      <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-8 text-center shadow-card sm:p-10">
        <ShieldCheck className="mx-auto h-8 w-8 text-primary" />
        <h2 className="mt-3 text-2xl sm:text-3xl">An ethical tool for better writing</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          StudyHuman's AI Writing Check is designed to support responsible learning, originality, and better writing. It should not be used to falsely accuse others, bypass school policies, or hide dishonest academic conduct.
        </p>
      </div>
    </Section>
  );
}