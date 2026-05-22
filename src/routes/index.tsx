import { createFileRoute, Link } from "@tanstack/react-router";
import {
  GraduationCap, BookOpen, PenLine, FlaskConical, Sigma, Presentation, Users,
  ShieldCheck, Sparkles, Globe2, Clock, CheckCircle2, Star, ChevronRight,
  MessageSquare, FileText, ClipboardList, BadgeCheck, Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/PageShell";
import { PriceCalculator } from "@/components/PriceCalculator";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StudyHuman — Human Academic Support for Every Level of Learning" },
      { name: "description", content: "Connect with real academic experts for tutoring, editing, research guidance, and ethical survey recruitment — from high school to PhD." },
      { property: "og:title", content: "StudyHuman — Human Academic Support" },
      { property: "og:description", content: "Ethical, human academic support for students worldwide." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <PageShell>
      <Hero />
      <TrustBar />
      <HowItWorks />
      <Levels />
      <Services />
      <WhyHuman />
      <SurveyCTA />
      <PricingOverview />
      <Integrity />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </PageShell>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 gradient-soft" />
      <div className="absolute -top-32 right-0 -z-10 h-[480px] w-[480px] rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-20 -z-10 h-[420px] w-[420px] rounded-full bg-accent/15 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:py-28">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            Real people. Real guidance. No AI-written shortcuts.
          </div>
          <h1 className="mt-5 text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            Get Real Human<br />
            <span className="italic text-primary">Academic Support</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            StudyHuman connects students from high school to PhD level with verified human academic helpers for tutoring, editing, proofreading, research guidance, study coaching, data analysis guidance, presentation support, and survey participant recruitment.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="gradient-hero text-primary-foreground shadow-elegant">
              <Link to="/request-help">Request Human Help <ChevronRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/survey-recruitment">Find Survey Participants</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/become-helper">Become a Helper</Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-success" /> Verified experts</div>
            <div className="flex items-center gap-2"><Globe2 className="h-4 w-4 text-primary" /> 80+ countries</div>
            <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-accent" /> 24/7 support</div>
          </div>
          <ReferralCard />
        </div>
        <div id="estimate-calculator" className="scroll-mt-24">
          <PriceCalculator compact />
        </div>
      </div>
      <a
        href="#estimate-calculator"
        className="fixed bottom-24 right-5 z-30 inline-flex items-center gap-2 rounded-full gradient-hero px-4 py-2 text-sm font-medium text-primary-foreground shadow-elegant"
      >
        Estimate Price
      </a>
    </section>
  );
}

function ReferralCard() {
  return (
    <div className="mt-8 rounded-2xl border border-border bg-card/80 p-5 shadow-card backdrop-blur sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <Gift className="h-5 w-5" />
          </div>
          <div>
            <span className="inline-block rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-accent-foreground">
              Referral Bonus
            </span>
            <p className="mt-2 font-display text-lg leading-snug">
              Invite Friends. Earn Study Credits.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Share StudyHuman with classmates or researchers. Earn up to{" "}
              <span className="font-medium text-foreground">$10 in credits</span> per successful referral.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
          <Button asChild size="sm" className="gradient-hero text-primary-foreground shadow-elegant">
            <Link to="/register">Invite a Friend</Link>
          </Button>
          <Link to="/register" className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
            How referrals work
          </Link>
        </div>
      </div>
    </div>
  );
}
        <div id="estimate-calculator" className="scroll-mt-24">
          <PriceCalculator compact />
        </div>
      </div>
      <a
        href="#estimate-calculator"
        className="fixed bottom-24 right-5 z-30 inline-flex items-center gap-2 rounded-full gradient-hero px-4 py-2 text-sm font-medium text-primary-foreground shadow-elegant"
      >
        Estimate Price
      </a>
    </section>
  );
}

function HeroCard() {
  return (
    <div className="relative">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full gradient-hero text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">Dr. Amara Okafor</p>
              <p className="text-xs text-muted-foreground">PhD · Research Methods</p>
            </div>
          </div>
          <span className="rounded-full bg-success/15 px-2 py-1 text-xs font-medium text-success">Available</span>
        </div>
        <div className="mt-5 rounded-2xl bg-muted/60 p-4">
          <p className="text-sm">
            "Happy to walk through your literature review structure today. I'll share feedback on framing and source quality."
          </p>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          {[
            { k: "Rating", v: "4.9★" },
            { k: "Sessions", v: "320+" },
            { k: "Subjects", v: "12" },
          ].map((s) => (
            <div key={s.k} className="rounded-xl border border-border bg-background p-3">
              <p className="text-lg font-semibold">{s.v}</p>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.k}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-card p-4 shadow-soft sm:block">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-accent/20 text-accent-foreground"><CheckCircle2 className="h-5 w-5" /></div>
          <div>
            <p className="text-sm font-semibold">Request matched</p>
            <p className="text-xs text-muted-foreground">in under 4 minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrustBar() {
  const items = ["Oxford", "Stanford", "Nairobi", "Toronto", "Delhi", "Sydney"];
  return (
    <div className="border-y border-border bg-background py-6">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 text-xs uppercase tracking-widest text-muted-foreground">
        <span>Trusted by learners at</span>
        {items.map((i) => <span key={i} className="font-semibold text-foreground/70">{i}</span>)}
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Submit your request", d: "Tell us your level, subject, deadline, and what kind of guidance you need.", icon: ClipboardList },
    { n: "02", t: "Get matched with a human expert", d: "We connect you with a verified academic helper who fits your topic.", icon: Users },
    { n: "03", t: "Learn, refine, succeed", d: "Work together via chat, get feedback, and submit your own original work.", icon: Sparkles },
  ];
  return (
    <Section eyebrow="How it works" title="A clear path to better academic outcomes">
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="group relative rounded-2xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant">
            <div className="flex items-center justify-between">
              <span className="font-serif text-3xl text-primary/40">{s.n}</span>
              <s.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mt-4 text-2xl">{s.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Levels() {
  const levels = [
    { t: "High School", d: "Core subjects, exam prep, study skills." },
    { t: "Diploma", d: "Coursework guidance, technical concepts, projects." },
    { t: "Undergraduate", d: "Essays, lab reports, citations, research methods." },
    { t: "Master's", d: "Thesis structure, literature reviews, data analysis." },
    { t: "PhD", d: "Dissertation coaching, methodology, publication support." },
  ];
  return (
    <Section eyebrow="Academic Levels" title="Support for every stage of learning">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {levels.map((l) => (
          <div key={l.t} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <p className="font-display text-xl">{l.t}</p>
            <p className="mt-2 text-sm text-muted-foreground">{l.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Services() {
  const services = [
    { icon: BookOpen, t: "Tutoring & Study Coaching", d: "1:1 sessions with subject experts to deepen understanding." },
    { icon: PenLine, t: "Editing & Proofreading", d: "Polish grammar, clarity, structure, and academic tone." },
    { icon: FlaskConical, t: "Research Guidance", d: "Proposals, methodology, literature reviews, frameworks." },
    { icon: Sigma, t: "Data Analysis Guidance", d: "SPSS, R, Stata, Python — interpret your own results." },
    { icon: FileText, t: "Formatting & Citations", d: "APA, MLA, Chicago, Harvard — done right, every time." },
    { icon: Presentation, t: "Presentation Support", d: "Slides, narrative, and delivery feedback." },
    { icon: Users, t: "Survey Participant Recruitment", d: "Connect with willing, ethical participants worldwide." },
    { icon: ShieldCheck, t: "Integrity-First Feedback", d: "Constructive critique — never written-for-you work." },
  ];
  return (
    <Section eyebrow="Services" title="Everything you need — ethically delivered">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <div key={s.t} className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft">
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><s.icon className="h-5 w-5" /></div>
            <p className="font-display text-xl">{s.t}</p>
            <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function WhyHuman() {
  const reasons = [
    { t: "Real expertise", d: "Helpers are verified academics, tutors, and researchers — not chatbots." },
    { t: "Personalized guidance", d: "Feedback shaped to your level, topic, and goals." },
    { t: "Ethical by design", d: "We coach learning. We do not write or submit work for you." },
    { t: "Accountability", d: "Track conversations, deliverables, and milestones transparently." },
  ];
  return (
    <Section eyebrow="Why human support" title="Because learning still happens between people">
      <div className="grid gap-5 md:grid-cols-2">
        {reasons.map((r) => (
          <div key={r.t} className="flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-card">
            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-success" />
            <div>
              <p className="font-display text-xl">{r.t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{r.d}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function SurveyCTA() {
  return (
    <Section>
      <div className="overflow-hidden rounded-3xl border border-border gradient-hero p-8 text-primary-foreground shadow-elegant sm:p-12">
        <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/80">Survey Participant Recruitment</p>
            <h2 className="mt-3 text-3xl text-primary-foreground sm:text-4xl">Find real participants for your academic research</h2>
            <p className="mt-3 max-w-xl text-primary-foreground/85">
              Ethically recruit students and adults across countries — with informed consent, privacy protection, and clear incentives.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary" className="bg-card text-foreground hover:bg-card/90">
                <Link to="/survey-recruitment">Find Survey Participants</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/">Ethical human academic support</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-2xl bg-primary-foreground/10 p-5 backdrop-blur">
            {[
              { k: "Avg. recruitment time", v: "48 hrs" },
              { k: "Active participant pool", v: "12,400+" },
              { k: "Countries reached", v: "80+" },
            ].map((s) => (
              <div key={s.k} className="flex items-center justify-between border-b border-primary-foreground/10 py-3 last:border-0">
                <span className="text-sm text-primary-foreground/80">{s.k}</span>
                <span className="font-display text-xl">{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function PricingOverview() {
  const tiers = [
    { t: "Tutoring Support", d: "Live, 1:1 subject coaching.", p: "Starting from $10/hr" },
    { t: "Editing & Proofreading", d: "Detailed academic feedback.", p: "Custom quote" },
    { t: "Research Guidance", d: "Methodology, literature, framing.", p: "Custom quote" },
  ];
  return (
    <Section eyebrow="Pricing" title="Fair, transparent, scoped to your needs">
      <div className="grid gap-5 md:grid-cols-3">
        {tiers.map((t, i) => (
          <div key={t.t} className={`rounded-2xl border bg-card p-7 shadow-card ${i === 1 ? "border-primary/40 ring-1 ring-primary/20" : "border-border"}`}>
            {i === 1 && <p className="mb-3 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">Most chosen</p>}
            <p className="font-display text-2xl">{t.t}</p>
            <p className="mt-2 text-sm text-muted-foreground">{t.d}</p>
            <p className="mt-4 font-display text-3xl text-primary">{t.p}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Button asChild variant="outline"><Link to="/pricing">See full pricing</Link></Button>
      </div>
    </Section>
  );
}

function Integrity() {
  return (
    <Section>
      <div className="rounded-3xl border border-border bg-card p-8 shadow-card sm:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Ethical human academic support</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">We coach learners. We never replace them.</h2>
            <p className="mt-4 text-muted-foreground">
              StudyHuman provides ethical human support for tutoring, feedback, editing, research guidance, and survey recruitment. Students remain responsible for their own final submissions.
            </p>
            <Button asChild variant="link" className="mt-3 px-0">
              <Link to="/request-help">Learn How StudyHuman Works <ChevronRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              "No ghost-written assignments",
              "No exam impersonation",
              "No guaranteed grades",
              "No plagiarized content",
              "Constructive feedback only",
              "Clear scope on every request",
            ].map((x) => (
              <li key={x} className="flex items-center gap-2 rounded-xl border border-border bg-background p-3 text-sm">
                <ShieldCheck className="h-4 w-4 text-primary" /> {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function Testimonials() {
  const t = [
    { q: "My tutor walked me through statistical analysis step by step. I actually understood it.", a: "Priya, Master's, India" },
    { q: "The editor's feedback transformed my dissertation chapter. Clearer arguments, better flow.", a: "Marcus, PhD, UK" },
    { q: "We recruited 200 participants across 4 countries within a week. Smooth experience.", a: "Dr. Lin, Researcher" },
  ];
  return (
    <Section eyebrow="Testimonials" title="What students and researchers say">
      <div className="grid gap-5 md:grid-cols-3">
        {t.map((x, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex gap-0.5 text-accent">
              {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
            </div>
            <p className="mt-4 font-display text-xl leading-snug">"{x.q}"</p>
            <p className="mt-4 text-sm text-muted-foreground">— {x.a}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Will you write my essay for me?", a: "No. StudyHuman provides guidance, tutoring, editing, and feedback. Students are responsible for their own submissions." },
    { q: "Are helpers real people?", a: "Yes. Every helper is verified through credentials and an experience review." },
    { q: "How do payments work?", a: "Funds are held securely and released to your helper after the session or deliverable is completed." },
    { q: "Can I get survey participants ethically?", a: "Yes. Our recruitment workflow includes informed consent, privacy controls, and optional ethics approval verification." },
  ];
  return (
    <Section eyebrow="FAQ" title="Answers to common questions">
      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((f, i) => (
          <details key={i} className="group rounded-2xl border border-border bg-card p-5 shadow-card open:shadow-soft">
            <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
              <span className="font-display text-lg">{f.q}</span>
              <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
            </summary>
            <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

function FinalCTA() {
  return (
    <Section>
      <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-card sm:p-14">
        <h2 className="text-4xl sm:text-5xl">Ready to learn with a real human expert?</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Create your free account and submit your first request in minutes. Real people. Real academic support.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="gradient-hero text-primary-foreground shadow-elegant">
            <Link to="/request-help">Request Human Help</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/survey-recruitment">Find Survey Participants</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/become-helper">Become a Helper</Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}

function Section({
  eyebrow, title, children,
}: { eyebrow?: string; title?: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      {(eyebrow || title) && (
        <div className="mb-10 max-w-2xl">
          {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>}
          {title && <h2 className="mt-3 text-3xl sm:text-4xl">{title}</h2>}
        </div>
      )}
      {children}
    </section>
  );
}

// ensure MessageSquare import isn't dead-stripped warnings; not used directly above but kept for header.
void MessageSquare;
