import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, MessageCircle, ShieldCheck } from "lucide-react";

type Mode = "standard" | "survey";

const SERVICES: { label: string; base: number; unit: "page" | "session" | "slide" | "project" | "participant" }[] = [
  { label: "Tutoring", base: 10, unit: "session" },
  { label: "Editing and Proofreading", base: 5, unit: "page" },
  { label: "Research Guidance", base: 8, unit: "page" },
  { label: "Citation and Formatting", base: 4, unit: "page" },
  { label: "Data Analysis Guidance", base: 15, unit: "project" },
  { label: "Presentation Support", base: 6, unit: "slide" },
  { label: "Study Coaching", base: 10, unit: "session" },
  { label: "AI Writing Check", base: 5, unit: "page" },
  { label: "Survey Participant Recruitment", base: 1.5, unit: "participant" },
];

const LEVELS: Record<string, number> = {
  "High School": 1.0,
  "Diploma or Certificate": 1.1,
  "Undergraduate": 1.2,
  "Master's": 1.5,
  "PhD": 1.8,
};

const DEADLINES: Record<string, number> = {
  "7+ Days": 1.0,
  "3 to 6 Days": 1.25,
  "24 to 48 Hours": 1.5,
  "Same Day": 2.0,
};

const QUALITY: Record<string, number> = {
  "Standard": 1.0,
  "Advanced": 1.3,
  "Premium Expert": 1.6,
};

const EXTRAS: { label: string; cost: number }[] = [
  { label: "Plagiarism and originality review", cost: 5 },
  { label: "Citation review", cost: 5 },
  { label: "Formatting support", cost: 5 },
  { label: "Detailed feedback report", cost: 10 },
  { label: "Presentation notes", cost: 10 },
  { label: "Data interpretation guidance", cost: 15 },
];

export function PriceCalculator({ defaultService, mode = "standard" }: { defaultService?: string; mode?: Mode }) {
  const initial = defaultService ?? (mode === "survey" ? "Survey Participant Recruitment" : "Editing and Proofreading");
  const [service, setService] = useState<string>(initial);
  const [level, setLevel] = useState<string>("Undergraduate");
  const [quantity, setQuantity] = useState<number>(1);
  const [deadline, setDeadline] = useState<string>("7+ Days");
  const [quality, setQuality] = useState<string>("Standard");
  const [extras, setExtras] = useState<Record<string, boolean>>({});
  const [incentive, setIncentive] = useState<number>(0);
  const [region, setRegion] = useState<string>("");
  const [completionTime, setCompletionTime] = useState<string>("");

  const svc = SERVICES.find((s) => s.label === service) ?? SERVICES[1];
  const isSurvey = svc.unit === "participant";

  const unitLabel = useMemo(() => {
    switch (svc.unit) {
      case "slide": return "Number of Slides";
      case "session": return "Number of Sessions";
      case "project": return "Number of Projects";
      case "participant": return "Number of Participants";
      default: return "Number of Pages";
    }
  }, [svc.unit]);

  const extrasTotal = EXTRAS.reduce((sum, e) => (extras[e.label] ? sum + e.cost : sum), 0);

  const estimate = useMemo(() => {
    const qty = Math.max(1, Number(quantity) || 1);
    if (isSurvey) {
      const base = qty * svc.base;
      const total = base * (DEADLINES[deadline] ?? 1) + (Number(incentive) || 0) * qty;
      return Math.round(total * 100) / 100;
    }
    const base = svc.base * qty;
    const total =
      base *
        (LEVELS[level] ?? 1) *
        (DEADLINES[deadline] ?? 1) *
        (QUALITY[quality] ?? 1) +
      extrasTotal;
    return Math.round(total * 100) / 100;
  }, [svc, quantity, level, deadline, quality, extrasTotal, isSurvey, incentive]);

  const selectedExtras = EXTRAS.filter((e) => extras[e.label]).map((e) => e.label);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Price calculator</p>
        <h2 className="mt-3 text-3xl sm:text-4xl">Estimate Your Price</h2>
        <p className="mt-3 text-muted-foreground">
          Get an instant estimate based on your academic level, service type, document length, and deadline.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Form */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Service Type">
              <Select value={service} onValueChange={setService}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {SERVICES.map((s) => <SelectItem key={s.label} value={s.label}>{s.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>

            {!isSurvey && (
              <Field label="Academic Level">
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.keys(LEVELS).map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
            )}

            <Field label={unitLabel} hint={svc.unit === "page" ? "Use 275 words as one page." : undefined}>
              <Input type="number" min={1} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
            </Field>

            <Field label="Deadline">
              <Select value={deadline} onValueChange={setDeadline}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.keys(DEADLINES).map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>

            {!isSurvey && (
              <Field label="Quality Level">
                <Select value={quality} onValueChange={setQuality}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.keys(QUALITY).map((q) => <SelectItem key={q} value={q}>{q}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
            )}

            {isSurvey && (
              <>
                <Field label="Target Country or Region">
                  <Input value={region} onChange={(e) => setRegion(e.target.value)} placeholder="e.g. Global, EU, East Africa" />
                </Field>
                <Field label="Survey Completion Time">
                  <Input value={completionTime} onChange={(e) => setCompletionTime(e.target.value)} placeholder="e.g. 10 minutes" />
                </Field>
                <Field label="Optional Incentive per Participant (USD)">
                  <Input type="number" min={0} value={incentive} onChange={(e) => setIncentive(Number(e.target.value))} />
                </Field>
              </>
            )}
          </div>

          {!isSurvey && (
            <div className="mt-6">
              <Label className="text-sm font-medium">Extra Services</Label>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {EXTRAS.map((e) => (
                  <label key={e.label} className="flex items-start gap-3 rounded-xl border border-border bg-background p-3 text-sm">
                    <Checkbox
                      checked={!!extras[e.label]}
                      onCheckedChange={(v) => setExtras((prev) => ({ ...prev, [e.label]: Boolean(v) }))}
                      className="mt-0.5"
                    />
                    <span className="flex-1">{e.label} <span className="text-muted-foreground">(+${e.cost})</span></span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Estimate card */}
        <div className="rounded-3xl border border-primary/30 bg-card p-6 shadow-elegant sm:p-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Calculator className="h-4 w-4" /> Human academic support estimate
          </div>
          <p className="mt-3 font-display text-5xl text-primary">${estimate.toFixed(2)}</p>
          <p className="mt-1 text-xs text-muted-foreground">Estimated price</p>

          <dl className="mt-6 space-y-2 text-sm">
            <Row k="Service" v={service} />
            {!isSurvey && <Row k="Academic Level" v={level} />}
            <Row k={unitLabel.replace("Number of ", "")} v={String(Math.max(1, Number(quantity) || 1))} />
            <Row k="Deadline" v={deadline} />
            {!isSurvey && <Row k="Quality Level" v={quality} />}
            {isSurvey && region && <Row k="Region" v={region} />}
            {isSurvey && completionTime && <Row k="Completion Time" v={completionTime} />}
            {isSurvey && incentive > 0 && <Row k="Incentive / participant" v={`$${incentive}`} />}
            {!isSurvey && selectedExtras.length > 0 && (
              <Row k="Extra Services" v={selectedExtras.join(", ")} />
            )}
          </dl>

          <p className="mt-5 rounded-xl bg-muted/60 p-3 text-xs text-muted-foreground">
            This is an estimate. Final pricing may vary after review.
          </p>

          <div className="mt-5 flex flex-col gap-2">
            <Button asChild className="gradient-hero text-primary-foreground shadow-elegant">
              <Link to="/request-help">Request Human Help</Link>
            </Button>
            <Button variant="outline" type="button" onClick={() => window.dispatchEvent(new CustomEvent("studyhuman:open-chat"))}>
              <MessageCircle className="h-4 w-4" /> Chat With Human Support
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-border bg-muted/40 p-5 text-sm text-muted-foreground">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p>
            StudyHuman provides ethical human academic support, including tutoring, feedback, editing, research guidance, and survey recruitment. Students remain responsible for their own final submissions.
          </p>
        </div>
      </div>
    </section>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-right font-medium">{v}</dd>
    </div>
  );
}