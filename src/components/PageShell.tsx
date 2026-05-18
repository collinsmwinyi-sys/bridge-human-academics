import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { LiveChatWidget } from "./LiveChatWidget";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <LiveChatWidget />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-border gradient-soft">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        {eyebrow && (
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
        )}
        <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">{description}</p>}
      </div>
    </section>
  );
}