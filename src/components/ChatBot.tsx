import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const CHAT_URL = "https://riykcdgldcphjntuiihl.supabase.co/functions/v1/chat";
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpeWtjZGdsZGNwaGpudHVpaWhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3NjY5NDUsImV4cCI6MjA3MzM0Mjk0NX0.Vn3B_4IFWTJQ2Jo-PI8Jbtfze3a2g8rFD3PnW9o2dVM";

const GREETING: Message = {
  role: "assistant",
  content: "🙏 Namaste! Mai KisanSeva Plus AI Assistant hoon. Aap mujhse equipment booking, farmer services, ya kisi bhi farming related sawaal pooch sakte hain. Kaise madad kar sakta hoon?",
};

const getKnownAnswer = (message: string) => {
  const normalized = message.toLowerCase().replace(/0/g, "o").trim();

  const asksCoFounder =
    normalized.includes("co-founder") ||
    normalized.includes("co founder") ||
    normalized.includes("cofounder") ||
    normalized.includes("aman raj");

  if (asksCoFounder) {
    return "Aman Raj from IIT Madras is the Co-Founder of KisanSeva Plus.";
  }

  const asksFounder =
    normalized.includes("founder") ||
    normalized.includes("sansthapak") ||
    normalized.includes("संस्थापक") ||
    normalized.includes("arvind kumar");

  if (asksFounder) {
    return "Arvind Kumar from IIT Madras is the Founder of KisanSeva Plus.";
  }

  return null;
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load chat history from DB on open
  const loadHistory = useCallback(async () => {
    if (historyLoaded) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setHistoryLoaded(true); return; }

    // Get latest session
    const { data } = await supabase
      .from("chat_messages" as any)
      .select("session_id, role, content, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1);

    const latestSession = (data as any[])?.[0]?.session_id;
    if (!latestSession) { setHistoryLoaded(true); return; }

    setSessionId(latestSession);

    const { data: history } = await supabase
      .from("chat_messages" as any)
      .select("role, content")
      .eq("user_id", user.id)
      .eq("session_id", latestSession)
      .order("created_at", { ascending: true });

    if (history && (history as any[]).length > 0) {
      setMessages([GREETING, ...(history as any[]).map((m: any) => ({ role: m.role as "user" | "assistant", content: m.content }))]);
    }
    setHistoryLoaded(true);
  }, [historyLoaded]);

  useEffect(() => {
    if (isOpen) {
      loadHistory();
      inputRef.current?.focus();
    }
  }, [isOpen, loadHistory]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const saveMessage = async (msg: Message, sid: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("chat_messages" as any).insert({
      user_id: user.id,
      session_id: sid,
      role: msg.role,
      content: msg.content,
    } as any);
  };

  const streamChat = async (userMessages: Message[], currentSessionId: string) => {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${ANON_KEY}` },
      body: JSON.stringify({ messages: userMessages }),
    });

    if (!resp.ok || !resp.body) throw new Error("Failed to start stream");

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantContent = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantContent += content;
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant" && prev.length > 1) {
                return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantContent } : m);
              }
              return [...prev, { role: "assistant", content: assistantContent }];
            });
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    // Save assistant reply to DB
    if (assistantContent) {
      await saveMessage({ role: "assistant", content: assistantContent }, currentSessionId);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    const knownAnswer = getKnownAnswer(userMessage.content);
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    let sid = sessionId;
    if (!sid) {
      sid = crypto.randomUUID();
      setSessionId(sid);
    }

    await saveMessage(userMessage, sid);

    try {
      if (knownAnswer) {
        const assistantMessage: Message = { role: "assistant", content: knownAnswer };
        setMessages((prev) => [...prev, assistantMessage]);
        await saveMessage(assistantMessage, sid);
        return;
      }

      await streamChat(newMessages.slice(1), sid); // Skip greeting
    } catch (error) {
      console.error("Chat error:", error);
      const errMsg: Message = { role: "assistant", content: "Maaf kijiye, kuch technical problem aa gayi. Please thodi der baad try karein." };
      setMessages((prev) => [...prev, errMsg]);
      await saveMessage(errMsg, sid);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleNewChat = () => {
    setSessionId(null);
    setMessages([GREETING]);
    setHistoryLoaded(true);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110",
          "bg-gradient-to-br from-primary to-secondary hover:from-primary/90 hover:to-secondary/90",
          isOpen && "scale-0 opacity-0"
        )}
      >
        <MessageCircle className="h-6 w-6 text-white" />
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 animate-pulse" />
      </Button>

      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] rounded-2xl shadow-2xl transition-all duration-500 ease-out",
          "bg-gradient-to-br from-card/95 to-card backdrop-blur-xl border border-border/50",
          isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95 pointer-events-none"
        )}
        style={{ maxHeight: "calc(100vh - 120px)" }}
      >
        {/* Header */}
        <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-r from-primary to-secondary p-4">
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white" />
              </div>
              <div>
                <h3 className="font-bold text-white flex items-center gap-2">
                  KisanSeva AI
                  <Sparkles className="h-4 w-4 text-yellow-300" />
                </h3>
                <p className="text-xs text-white/80">Always here to help farmers</p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" onClick={handleNewChat} className="h-8 rounded-full text-white/80 hover:text-white hover:bg-white/20 text-xs px-2">
                New Chat
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-full text-white/80 hover:text-white hover:bg-white/20">
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-full text-white/80 hover:text-white hover:bg-white/20">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea ref={scrollAreaRef} className="h-[350px] p-4 space-y-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={cn("flex gap-2 animate-fade-in", message.role === "user" ? "justify-end" : "justify-start")}>
                {message.role === "assistant" && (
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                  message.role === "user"
                    ? "bg-gradient-to-r from-primary to-secondary text-white rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md"
                )}>
                  {message.content}
                </div>
                {message.role === "user" && (
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 justify-start animate-fade-in">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Actions */}
        <div className="px-4 pb-2">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {["Equipment Booking", "Services", "Pricing", "Contact"].map((action) => (
              <button
                key={action}
                onClick={() => setInput(action + " ke baare mein batao")}
                className="flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 pt-2 border-t border-border/50">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Apna sawaal yahan likhein..."
              className="flex-1 rounded-full border-border/50 bg-muted/50 focus:bg-background"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground text-center mt-2">
            Powered by KisanSeva AI • IIT Madras
          </p>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
