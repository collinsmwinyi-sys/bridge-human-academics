import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [
    { title: "Create your student account — ScholarBridge" },
    { name: "description", content: "Sign up as a student to access verified academic helpers worldwide." },
  ]}),
  component: Register,
});

function Register() {
  const [agree, setAgree] = useState(false);
  return (
    <PageShell>
      <PageHeader eyebrow="Student registration" title="Create your ScholarBridge account" description="Join thousands of students learning ethically with verified academic helpers." />
      <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!agree) return toast.error("Please accept the academic integrity policy.");
            toast.success("Account created — welcome to ScholarBridge!");
          }}
          className="space-y-5 rounded-3xl border border-border bg-card p-8 shadow-card"
        >
          <Field label="Full name"><Input required placeholder="Jane Doe" /></Field>
          <Field label="Email"><Input required type="email" placeholder="you@email.com" /></Field>
          <Field label="Password"><Input required type="password" placeholder="At least 8 characters" /></Field>
          <Field label="Country"><Input required placeholder="e.g. Kenya" /></Field>
          <Field label="Academic level">
            <Select><SelectTrigger><SelectValue placeholder="Select your level" /></SelectTrigger>
              <SelectContent>
                {["High School","Diploma","Undergraduate","Master's","PhD"].map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Subject area"><Input required placeholder="e.g. Biology, Economics" /></Field>
          <Field label="Type of help needed"><Textarea placeholder="Briefly describe what you're looking for" /></Field>
          <label className="flex items-start gap-3 rounded-xl bg-muted/60 p-4 text-sm">
            <Checkbox checked={agree} onCheckedChange={(v) => setAgree(Boolean(v))} className="mt-0.5" />
            <span>I agree to the <Link to="/academic-integrity" className="font-medium text-primary underline-offset-2 hover:underline">Academic Integrity Policy</Link> — ScholarBridge provides guidance and feedback, not completed assignments.</span>
          </label>
          <Button type="submit" size="lg" className="w-full gradient-hero text-primary-foreground shadow-elegant">Create account</Button>
          <p className="text-center text-sm text-muted-foreground">Already have an account? <Link to="/login" className="font-medium text-primary">Log in</Link></p>
        </form>
      </section>
    </PageShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
    </div>
  );
}
