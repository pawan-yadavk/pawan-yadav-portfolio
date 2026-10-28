import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Send, Sparkles, X, MessageCircle } from 'lucide-react';
import { chatbotSuggestions, getChatbotAnswer } from '@/data/chatbot';

type Message = { role: 'bot' | 'user'; text: string };

const WELCOME: Message = {
  role: 'bot',
  text: "Hi! I'm Pawan's portfolio assistant. Ask me about his background, projects, skills, experience, or how to contact him.",
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q || typing) return;
    setMessages((m) => [...m, { role: 'user', text: q }]);
    setInput('');
    setTyping(true);
    // simulate "thinking" delay for realism
    setTimeout(() => {
      const answer = getChatbotAnswer(q);
      setMessages((m) => [...m, { role: 'bot', text: answer }]);
      setTyping(false);
    }, 500 + Math.random() * 500);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-electric-500 to-violet-500 text-white shadow-glow-violet transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-400"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="fixed bottom-24 right-5 z-50 flex h-[min(520px,70vh)] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-900/95 backdrop-blur-2xl shadow-card"
            role="dialog"
            aria-label="Portfolio assistant"
          >
            {/* header */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3.5">
              <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-electric-500 to-violet-500 text-white">
                <Bot size={18} />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-ink-900 bg-emerald-400" />
              </span>
              <div className="flex-1">
                <p className="font-display text-sm font-semibold text-white">Portfolio Assistant</p>
                <p className="text-[11px] text-emerald-400">● Online · Demo mode</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4 no-scrollbar">
              {messages.map((m, i) => (
                <Bubble key={i} message={m} />
              ))}

              {typing && (
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-electric-500 to-violet-500 text-white">
                    <Sparkles size={14} />
                  </span>
                  <span className="flex gap-1 rounded-2xl rounded-tl-sm bg-white/[0.05] px-3.5 py-3">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.7, repeat: Infinity, delay: d * 0.15 }}
                        className="h-1.5 w-1.5 rounded-full bg-slate-400"
                      />
                    ))}
                  </span>
                </div>
              )}

              {messages.length <= 1 && !typing && (
                <div className="pt-1">
                  <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                    Suggested questions
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {chatbotSuggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-left text-xs text-slate-300 transition hover:border-electric-500/40 hover:bg-white/[0.05] hover:text-white"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* input */}
            <div className="border-t border-white/10 bg-white/[0.02] p-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  placeholder="Ask me about Pawan..."
                  className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-electric-500/60 focus:outline-none focus:ring-2 focus:ring-electric-500/20"
                />
                <button
                  onClick={() => send(input)}
                  disabled={!input.trim() || typing}
                  aria-label="Send message"
                  className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-gradient-to-br from-electric-500 to-violet-500 text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-slate-600">
                Demo assistant · answers from local portfolio data
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Bubble({ message }: { message: Message }) {
  const isBot = message.role === 'bot';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-end gap-2 ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      {isBot && (
        <span className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-gradient-to-br from-electric-500 to-violet-500 text-white">
          <Bot size={16} />
        </span>
      )}
      <span
        className={`max-w-[78%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isBot
            ? 'rounded-tl-sm bg-white/[0.05] text-slate-200'
            : 'rounded-tr-sm bg-gradient-to-br from-electric-500 to-violet-500 text-white'
        }`}
      >
        {message.text}
      </span>
    </motion.div>
  );
}
