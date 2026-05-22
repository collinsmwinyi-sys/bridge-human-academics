import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHeader } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Copy, Mail, MessageCircle, Gift, Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/referrals")({
  head: () => ({
    meta: [
      { title: "My Referral Link — StudyHuman" },
      { name: "description", content: "Invite friends to StudyHuman and earn credits for future academic support." },
      { property: "og:title", content: "My Referral Link — StudyHuman" },
      { property: "og:description", content: "Earn up to $10 in StudyHuman credits for every successful referral." },
    ],
  }),
  component: ReferralsPage,
});

// Mock signed-in user referral code. Replace with real auth/user data when available.
const MOCK_CODE = "JANE-SH42";

const statusStyles: Record<string, string> = {
  Pending: "bg-muted text-muted-foreground",
  Joined: "bg-primary/10 text-primary",
  "First Request Completed": "bg-accent/20 text-accent-foreground",
  "Credit Awarded": "bg-success/15 text-success",
};

const referrals = [
  { name: "Amaka O.", date: "May 12, 2026", status: "Credit Awarded", reward: "$10.00" },
  { name: "liu.chen@uni.edu", date: "May 18, 2026", status: "First Request Completed", reward: "Processing" },
  { name: "Marco P.", date: "May 20, 2026", status: "Joined", reward: "Pending first request" },
  { name: "sara@research.org", date: "May 21, 2026", status: "Pending", reward: "—" },
];

function ReferralsPage() {
  // Treat user as signed in for now. When auth lands, redirect unauthenticated
  // visitors to /register with a "create an account to get your link" message.
  const referralUrl = typeof window !== "undefined"
    ? `${window.location.origin}/register?ref=${MOCK_CODE}`
    : `https://studyhuman.app/register?ref=${MOCK_CODE}`;

  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      toast.success("Referral link copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy. Please copy manually.");
    }
  };

  const shareText = "Get real human academic support on StudyHuman. Use my link to join:";
  const waHref = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${referralUrl}`)}`;
  const mailHref = `mailto:?subject=${encodeURIComponent("Join me on StudyHuman")}&body=${encodeURIComponent(`${shareText}\n\n${referralUrl}`)}`;

  return (
    <PageShell>
      <PageHeader
        eyebrow="Referrals"
        title="My Referral Link"
        description="Invite friends to StudyHuman and earn credits for future academic support."
      />

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <Gift className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-xl">Your unique referral link</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Earn up to <span className="font-medium text-foreground">$10 in StudyHuman credits</span> for every successful referral.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Input readOnly value={referralUrl} className="font-mono text-sm" onFocus={(e) => e.currentTarget.select()} />
            <Button onClick={copy} className="gradient-hero text-primary-foreground shadow-elegant sm:w-auto">
              {copied ? <Check className="mr-1 h-4 w-4" /> : <Copy className="mr-1 h-4 w-4" />}
              {copied ? "Copied" : "Copy Link"}
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <a href={waHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-1 h-4 w-4" /> Share on WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={mailHref}>
                <Mail className="mr-1 h-4 w-4" /> Share by Email
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Referral status</p>
              <h2 className="mt-1 text-2xl">Your invites</h2>
            </div>
            <Badge variant="outline" className="hidden sm:inline-flex">{referrals.length} total</Badge>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="py-2 pr-4 font-medium">Name or Email</th>
                  <th className="py-2 pr-4 font-medium">Date Joined</th>
                  <th className="py-2 pr-4 font-medium">Status</th>
                  <th className="py-2 font-medium">Reward</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {referrals.map((r) => (
                  <tr key={r.name}>
                    <td className="py-3 pr-4 font-medium">{r.name}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{r.date}</td>
                    <td className="py-3 pr-4">
                      <Badge className={statusStyles[r.status] ?? ""}>{r.status}</Badge>
                    </td>
                    <td className="py-3 text-muted-foreground">{r.reward}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            Referral credits are awarded only after the referred user completes their first paid StudyHuman request. Terms may apply.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-dashed border-border bg-background p-5">
          <p className="text-sm text-muted-foreground">
            Don't have an account yet? Create one to activate your personal referral link.
          </p>
          <Button asChild variant="outline">
            <Link to="/register">Create an account</Link>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}