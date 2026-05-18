import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, CircleDot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Msg = { id: string; from: "user" | "agent" | "system"; text: string; at: number };
type ChatState = {
  name: string;
  email: string;
  phone: string;
  startedAt: number;
  status: "active" | "waiting" | "resolved" | "closed";
  messages: Msg[];
};

const STORAGE_KEY = "studyhuman_live_chat_v1";
const ADMIN_KEY = "studyhuman_live_chats_admin_v1";

function isAgentOnline() {
  // Simple time-of-day heuristic so the UX changes; agents "online" 6am–11pm local.
  const h = new Date().getHours();
  return h >= 6 && h < 23;
}

function persistAdmin(chat: ChatState) {
  try {
    const raw = localStorage.getItem(ADMIN_KEY);
    const list: ChatState[] = raw ? JSON.parse(raw) : [];
    const idx = list.findIndex((c) => c.email === chat.email && c.startedAt === chat.startedAt);
    if (idx >= 0) list[idx] = chat;
    else list.push(chat);
    localStorage.setItem(ADMIN_KEY, JSON.stringify(list));
  } catch {}
}

export function LiveChatWidget() {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState<ChatState | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const online = isAgentOnline();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setChat(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    if (chat) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chat));
      persistAdmin(chat);
    }
  }, [chat]);

  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [chat?.messages.length, typing, open]);

  const startChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) return;
    const greeting: Msg = {
      id: crypto.randomUUID(),
      from: "agent",
      at: Date.now(),
      text: online
        ? "Thanks for joining StudyHuman Live Support. You are now connected to a human support agent. How can we help you today?"
        : "Our human support agents are currently offline. You can still leave a message here, and the next available human agent will reply in this chat.",
    };
    setChat({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      startedAt: Date.now(),
      status: online ? "active" : "waiting",
      messages: [greeting],
    });
  };

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chat || !text.trim()) return;
    const userMsg: Msg = { id: crypto.randomUUID(), from: "user", at: Date.now(), text: text.trim() };
    const next: ChatState = { ...chat, messages: [...chat.messages, userMsg] };
    setChat(next);
    setText("");
    if (online) {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        const reply: Msg = {
          id: crypto.randomUUID(),
          from: "agent",
          at: Date.now(),
          text: "Thanks — a human agent is reviewing your message and will reply shortly here.",
        };
        setChat((c) => {
          const updated = c ? { ...c, messages: [...c.messages, reply] } : c;
          if (!open && updated) setUnread((u) => u + 1);
          return updated;
        });
      }, 1800);
    }
  };

  const endChat = () => {
    if (chat) setChat({ ...chat, status: "closed" });
    localStorage.removeItem(STORAGE_KEY);
    setChat(null);
    setForm({ name: "", email: "", phone: "" });
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full gradient-hero px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-105"
          aria-label="Open live human chat"
        >
          <MessageCircle className="h-5 w-5" />
          Live Human Chat
          {unread > 0 && (
            <span className="ml-1 grid h-5 min-w-5 place-items-center rounded-full bg-destructive px-1.5 text-xs text-destructive-foreground">
              {unread}
            </span>
          )}
        </button>
      )}

      {open && (
        <div className="fixed bottom-5 right-5 z-50 flex h-[560px] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card">
          <div className="flex items-center justify-between gap-2 border-b border-border gradient-hero p-4 text-primary-foreground">
            <div>
              <p className="text-sm font-semibold">StudyHuman Live Support</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs opacity-90">
                <CircleDot className={`h-3 w-3 ${online ? "text-success" : "text-muted"}`} />
                {online ? "Human agent online" : "Agents offline — leave a message"}
              </p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-md p-1 hover:bg-white/10">
              <X className="h-4 w-4" />
            </button>
          </div>

          {!chat ? (
            <form onSubmit={startChat} className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
              <p className="text-sm text-muted-foreground">
                Hi, welcome to StudyHuman. Enter your details to start a live chat with a human support agent.
              </p>
              <div className="space-y-1">
                <Label htmlFor="lc-name">Name</Label>
                <Input id="lc-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lc-email">Email Address</Label>
                <Input id="lc-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lc-phone">Phone Number</Label>
                <Input id="lc-phone" type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <Button type="submit" className="mt-auto gradient-hero text-primary-foreground">Start Live Chat</Button>
              {!online && (
                <p className="text-xs text-muted-foreground">
                  You may also receive a follow-up by phone or email if you leave the website.
                </p>
              )}
            </form>
          ) : (
            <>
              <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-surface/40 p-4">
                {chat.messages.map((m) => (
                  <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-soft ${m.from === "user" ? "gradient-hero text-primary-foreground" : "bg-card text-foreground border border-border"}`}>
                      <p className="whitespace-pre-wrap">{m.text}</p>
                      <p className={`mt-1 text-[10px] ${m.from === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        {new Date(m.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl border border-border bg-card px-3 py-2 text-xs text-muted-foreground">
                      Agent is typing...
                    </div>
                  </div>
                )}
                {!online && (
                  <p className="text-center text-[11px] text-muted-foreground">
                    You may also receive a follow-up by phone or email if you leave the website.
                  </p>
                )}
              </div>
              <form onSubmit={send} className="flex items-center gap-2 border-t border-border p-3">
                <Input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type your message..."
                />
                <Button type="submit" size="icon" className="gradient-hero text-primary-foreground" aria-label={online ? "Send" : "Send chat message"}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              <button onClick={endChat} className="border-t border-border py-2 text-center text-xs text-muted-foreground hover:bg-muted">
                End chat
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}