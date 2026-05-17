import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log in — StudyHuman" }, { name: "description", content: "Secure login for StudyHuman students and helpers." }]}),
  component: Login,
});

function Login() {
  return (
    <PageShell>
      <section className="mx-auto flex max-w-md flex-col items-center px-4 py-16 sm:px-6">
        <div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl gradient-hero text-primary-foreground shadow-elegant">
          <GraduationCap className="h-6 w-6" />
        </div>
        <h1 className="text-3xl">Welcome back</h1>
        <p className="mt-2 text-sm text-muted-foreground">Log in to your StudyHuman account.</p>
        <form
          onSubmit={(e) => { e.preventDefault(); toast.success("Signed in (demo)."); }}
          className="mt-8 w-full space-y-4 rounded-3xl border border-border bg-card p-8 shadow-card"
        >
          <div className="space-y-2"><Label>Email</Label><Input type="email" required placeholder="you@email.com" /></div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Password</Label>
              <Link to="/login" className="text-xs font-medium text-primary hover:underline">Forgot password?</Link>
            </div>
            <Input type="password" required placeholder="••••••••" />
          </div>
          <Button type="submit" size="lg" className="w-full gradient-hero text-primary-foreground shadow-elegant">Log in</Button>
          <p className="text-center text-sm text-muted-foreground">New here? <Link to="/register" className="font-medium text-primary">Create an account</Link></p>
        </form>
      </section>
    </PageShell>
  );
}
