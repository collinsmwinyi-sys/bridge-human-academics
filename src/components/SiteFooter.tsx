import { Link } from "@tanstack/react-router";
import { GraduationCap, Twitter, Linkedin, Instagram, Facebook } from "lucide-react";

export function SiteFooter() {
  const cols = [
    {
      title: "Platform",
      links: [
        { to: "/", label: "About ScholarBridge" },
        { to: "/academic-integrity", label: "Academic Integrity" },
        { to: "/pricing", label: "Pricing" },
        { to: "/become-helper", label: "Become a Helper" },
      ],
    },
    {
      title: "For Students",
      links: [
        { to: "/register", label: "Create account" },
        { to: "/request-help", label: "Request academic help" },
        { to: "/survey-recruitment", label: "Find survey participants" },
        { to: "/messages", label: "Messages" },
      ],
    },
    {
      title: "Support",
      links: [
        { to: "/", label: "Help Center" },
        { to: "/", label: "Contact" },
        { to: "/", label: "Privacy Policy" },
        { to: "/", label: "Terms of Service" },
      ],
    },
  ] as const;

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl gradient-hero text-primary-foreground">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-lg font-semibold">ScholarBridge</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Ethical, human academic support for students worldwide — from high school to PhD.
            </p>
            <div className="mt-5 flex gap-3 text-muted-foreground">
              <a href="#" aria-label="Twitter" className="rounded-full border border-border p-2 hover:text-foreground"><Twitter className="h-4 w-4" /></a>
              <a href="#" aria-label="LinkedIn" className="rounded-full border border-border p-2 hover:text-foreground"><Linkedin className="h-4 w-4" /></a>
              <a href="#" aria-label="Instagram" className="rounded-full border border-border p-2 hover:text-foreground"><Instagram className="h-4 w-4" /></a>
              <a href="#" aria-label="Facebook" className="rounded-full border border-border p-2 hover:text-foreground"><Facebook className="h-4 w-4" /></a>
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-sans text-sm font-semibold tracking-wide text-foreground">{c.title}</h4>
              <ul className="mt-4 space-y-3">
                {c.links.map((l, i) => (
                  <li key={i}>
                    <Link to={l.to} className="text-sm text-muted-foreground hover:text-foreground">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} ScholarBridge. All rights reserved.</p>
          <p>Made for learners worldwide.</p>
        </div>
      </div>
    </footer>
  );
}