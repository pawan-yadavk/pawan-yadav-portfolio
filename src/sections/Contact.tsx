import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Copy, Check, User, MessageSquare, AlertCircle } from 'lucide-react';
import { personal } from '@/data/portfolio';
import { SectionHeading } from '@/sections/About';
import { SocialIcons } from '@/components/SocialIcons';

type Errors = { name?: string; email?: string; message?: string };

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  const emailConfigured = Boolean(personal.email);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!form.email.trim()) e.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    e.email = 'Please enter a valid email address.';
    }
    if (!form.message.trim()) e.message = 'Please enter a message.';
    else if (form.message.trim().length < 10) e.message = 'Message should be at least 10 characters.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };


const onSubmit = async (
  ev: React.FormEvent<HTMLFormElement>
) => {
  ev.preventDefault();

  if (!validate() || isSubmitting) return;

  setIsSubmitting(true);
  setStatus("");

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/contact`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Message could not be sent.");
    }

    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
    setErrors({});
    setStatus("Message sent successfully!");
  } catch (error) {
    setStatus(
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again."
    );
  } finally {
    setIsSubmitting(false);
  }
};

  const copyEmail = async () => {
    if (!personal.email) return;
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading eyebrow="07 — Contact" title="Get In Touch" />
        <p className="mx-auto mt-4 max-w-xl text-center text-sm text-slate-400 text-balance">
          Have a role or project in mind? Send a message and I'll get back to you.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          {/* info side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-2"
          >
            <div className="glass-strong h-full p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-white">Let's connect</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Based in {personal.location}. Open to internships, full-time roles, and
                collaboration on web projects.
              </p>

              <div className="mt-6 space-y-3">
                {emailConfigured ? (
                  <button
                    onClick={copyEmail}
                    className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition hover:bg-white/[0.06]"
                  >
                    <span className="flex items-center gap-2.5 text-sm text-slate-200">
                      <Mail size={16} className="text-electric-400" />
                      {personal.email}
                    </span>
                    {copied ? (
                      <Check size={16} className="text-emerald-400" />
                    ) : (
                      <Copy size={16} className="text-slate-400" />
                    )}
                  </button>
                ) : (
                  <div className="flex items-center gap-2.5 rounded-xl border border-dashed border-white/15 px-4 py-3 text-xs text-slate-500">
                    <AlertCircle size={16} className="text-amber-400" />
                    Add your email in <code className="text-electric-400">src/data/portfolio.ts</code> to enable direct contact.
                  </div>
                )}
              </div>

              <div className="mt-6">
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-500">
                  Find me online
                </p>
                <SocialIcons />
              </div>
            </div>
          </motion.div>

          {/* form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: 0.1 }}
            onSubmit={onSubmit}
            noValidate
            className="glass-strong p-6 sm:p-8 lg:col-span-3"
          >
            {submitted ? (
              <div className="flex h-full min-h-[260px] flex-col items-center justify-center text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500/15 text-emerald-400">
                  <Check size={28} />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-white">Message captured</h3>
                <p className="mt-2 max-w-sm text-sm text-slate-400">
                  Your message has been sent successfully. Thank you for contacting me!
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', message: '' });
                  }}
                  className="btn-ghost mt-6"
                >
                  Send another
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <Field label="Your Name" icon={<User size={16} />} error={errors.name}>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="input"
                  />
                </Field>

                <Field label="Email Address" icon={<Mail size={16} />} error={errors.email}>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="input"
                  />
                </Field>

                <Field label="Message" icon={<MessageSquare size={16} />} error={errors.message}>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project or role..."
                    rows={4}
                    className="input resize-none"
                  />
                </Field>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send size={16} />
                  </button>

                  {status && (
                    <p role="status" className="mt-3 text-sm text-slate-300">
                      {status}
                    </p>
                  )}
              </div>
            )}
          </motion.form>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.10);
          padding: 0.7rem 0.9rem;
          font-size: 0.875rem;
          color: #e2e8f0;
          transition: border-color .2s, box-shadow .2s;
        }
        .input:focus {
          outline: none;
          border-color: rgba(14,165,233,0.6);
          box-shadow: 0 0 0 3px rgba(14,165,233,0.15);
        }
        .input::placeholder { color: #64748b; }
      `}</style>
    </section>
  );
}

function Field({
  label,
  icon,
  error,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-400">
        <span className="text-electric-400">{icon}</span>
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}
