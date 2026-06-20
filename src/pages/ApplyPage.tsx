import { Fragment, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, CheckCircle2,
  User, Mail, Phone, BookOpen, Globe,
  GraduationCap, Banknote, MessageSquare, ChevronDown,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import Navbar from '../components/Navbar';
import WayoutLogo from '../components/WayoutLogo';
import CtaFooter from '../components/CtaFooter';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

// ── Constants ────────────────────────────────────────────────────────────────

const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbySah4IkjXbaLJZwNriuNLuy6q5iX4Efsh3xnkt_yIh3pGxzQcP_VcN4tJSkMVKvNcl1w/exec';

const GRADES = [
  'GPA 5.00 — A+ (Golden)',
  'GPA 4.50–4.99 — A+',
  'GPA 4.00–4.49 — A',
  'GPA 3.50–3.99 — A-',
  'GPA 3.00–3.49 — B',
  'Below GPA 3.00',
  'Different grading system',
];
const COUNTRIES  = ['Finland', 'Australia', 'Lithuania', 'Malaysia', 'China', 'Open to suggestions'];
const DEGREES    = ["Bachelor's", "Master's", 'PhD', 'Foundation / Pathway', 'Not sure yet'];
const BUDGETS    = ['Under $5,000 / yr', '$5,000–$10,000 / yr', '$10,000–$15,000 / yr', '$15,000–$20,000 / yr', '$20,000+ / yr', 'Not sure yet'];

const STEP_META = [
  { n: 1, title: 'Contact Info',        sub: "Let's start with how we can reach you." },
  { n: 2, title: 'Academic Background', sub: 'Tell us about your academic history.' },
  { n: 3, title: 'Study Goals',         sub: 'Help us find the perfect fit for you.' },
];

const WHY_POINTS = [
  'Personalised university shortlist for your profile',
  'Honest visa success rates and cost breakdowns',
  'Guidance from students who already made the move',
  'Zero pressure — completely free, no commitment',
];

// ── Types ────────────────────────────────────────────────────────────────────

type FormState = {
  name: string; email: string; phone: string;
  ssc: string; hsc: string; english: string;
  country: string; degree: string; major: string;
  budget: string; challenge: string;
  honeypot: string;
};

type AnyChange = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

// ── Shared field styles ───────────────────────────────────────────────────────

const inputCls =
  'w-full pl-10 pr-4 py-3.5 text-sm rounded-xl border border-charcoal/12 bg-white text-charcoal placeholder-slate/40 outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/40 transition-all duration-200';
const selectCls =
  'w-full pl-10 pr-8 py-3.5 text-sm rounded-xl border border-charcoal/12 bg-white text-charcoal outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/40 transition-all duration-200 appearance-none cursor-pointer';
const labelCls = 'text-sm font-semibold text-charcoal/80';

// ── Atomic field components ───────────────────────────────────────────────────

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

function TextInput({
  id, name, type = 'text', value, onChange, placeholder, required, Icon,
}: {
  id: string; name: string; type?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string; required?: boolean; Icon: LucideIcon;
}) {
  return (
    <div className="relative">
      <Icon size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate/40 pointer-events-none" aria-hidden />
      <input
        id={id} type={type} name={name} value={value}
        onChange={onChange} placeholder={placeholder} required={required}
        className={inputCls}
      />
    </div>
  );
}

function SelectInput({
  id, name, value, onChange, placeholder, options, required, Icon,
}: {
  id: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string; options: string[]; required?: boolean; Icon: LucideIcon;
}) {
  return (
    <div className="relative">
      <Icon size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate/40 pointer-events-none z-10" aria-hidden />
      <select id={id} name={name} value={value} onChange={onChange} required={required} className={selectCls}>
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate/40 pointer-events-none" aria-hidden />
    </div>
  );
}

// ── Step indicator ────────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="mb-8">
      <p className="text-xs text-slate/50 mb-3 sm:hidden">Step {current} of 3</p>
      <div className="flex items-start">
        {STEP_META.map((s, i) => (
          <Fragment key={s.n}>
            <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <motion.div
                animate={{
                  backgroundColor: current >= s.n ? '#00B4D8' : 'rgba(27,38,59,0.08)',
                  color: current >= s.n ? '#ffffff' : 'rgba(27,38,59,0.3)',
                  boxShadow: current === s.n ? '0 0 0 5px rgba(0,180,216,0.18)' : '0 0 0 0px rgba(0,180,216,0)',
                }}
                transition={{ duration: 0.3 }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              >
                {current > s.n ? <CheckCircle2 size={14} strokeWidth={2.5} /> : s.n}
              </motion.div>
              <span className={`text-xs font-medium text-center hidden sm:block w-24 leading-tight transition-colors duration-300 ${current >= s.n ? 'text-charcoal/65' : 'text-charcoal/25'}`}>
                {s.title}
              </span>
            </div>
            {i < STEP_META.length - 1 && (
              <div className="flex-1 mt-3.5 mx-2 relative h-px bg-charcoal/10">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-teal"
                  initial={{ width: '0%' }}
                  animate={{ width: current > s.n ? '100%' : '0%' }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

// ── Nav buttons ───────────────────────────────────────────────────────────────

function NavButtons({
  showBack, onBack, submitLabel, loading,
}: {
  showBack: boolean; onBack?: () => void; submitLabel?: string; loading?: boolean;
}) {
  return (
    <div className={`flex gap-3 mt-1 ${showBack ? 'justify-between' : 'justify-end'}`}>
      {showBack && (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-charcoal/50 hover:text-charcoal px-5 py-2.5 rounded-xl border border-charcoal/12 hover:border-charcoal/25 transition-all duration-200"
        >
          <ArrowLeft size={14} /> Back
        </button>
      )}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 bg-teal hover:bg-teal-deep active:scale-[0.98] text-white text-sm font-bold px-7 py-2.5 rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(0,180,216,0.35)] hover:shadow-[0_0_32px_rgba(0,180,216,0.5)] disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Submitting…
          </>
        ) : submitLabel ? (
          <>{submitLabel} <ArrowRight size={14} /></>
        ) : (
          <>Continue <ArrowRight size={14} /></>
        )}
      </button>
    </div>
  );
}

// ── Step header ───────────────────────────────────────────────────────────────

function StepHeader({ step }: { step: number }) {
  const meta = STEP_META[step - 1];
  return (
    <div className="mb-6">
      <h2 className="font-display text-charcoal font-bold text-xl mb-1">{meta.title}</h2>
      <p className="text-slate text-sm">{meta.sub}</p>
    </div>
  );
}

// ── Step animation ────────────────────────────────────────────────────────────

const stepAnim = {
  initial:   { opacity: 0, y: 14 },
  animate:   { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' as const } },
  exit:      { opacity: 0, y: -8, transition: { duration: 0.18 } },
};

// ── Step 1 — Contact Info ─────────────────────────────────────────────────────

function Step1({ form, onChange, onNext }: { form: FormState; onChange: (e: AnyChange) => void; onNext: () => void }) {
  return (
    <motion.form
      {...stepAnim}
      onSubmit={(e) => { e.preventDefault(); onNext(); }}
      className="flex flex-col gap-5"
    >
      <StepHeader step={1} />
      <Field label="Full Name" htmlFor="name">
        <TextInput id="name" name="name" value={form.name} onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void} placeholder="Your full name" required Icon={User} />
      </Field>
      <Field label="Email Address" htmlFor="email">
        <TextInput id="email" name="email" type="email" value={form.email} onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void} placeholder="your@email.com" required Icon={Mail} />
      </Field>
      <Field label="WhatsApp Number" htmlFor="phone">
        <TextInput id="phone" name="phone" type="tel" value={form.phone} onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void} placeholder="+880 17..." required Icon={Phone} />
      </Field>
      {/* Honeypot — hidden from humans, bots fill it in */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
        <input tabIndex={-1} name="honeypot" value={form.honeypot} onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void} autoComplete="off" />
      </div>
      <NavButtons showBack={false} />
    </motion.form>
  );
}

// ── Step 2 — Academic Background ─────────────────────────────────────────────

function Step2({ form, onChange, onNext, onBack }: {
  form: FormState; onChange: (e: AnyChange) => void; onNext: () => void; onBack: () => void;
}) {
  return (
    <motion.form
      {...stepAnim}
      onSubmit={(e) => { e.preventDefault(); onNext(); }}
      className="flex flex-col gap-5"
    >
      <StepHeader step={2} />
      <Field label="SSC Result" htmlFor="ssc">
        <SelectInput id="ssc" name="ssc" value={form.ssc} onChange={onChange as (e: React.ChangeEvent<HTMLSelectElement>) => void} placeholder="Select your SSC grade" options={GRADES} required Icon={BookOpen} />
      </Field>
      <Field label="HSC Result" htmlFor="hsc">
        <SelectInput id="hsc" name="hsc" value={form.hsc} onChange={onChange as (e: React.ChangeEvent<HTMLSelectElement>) => void} placeholder="Select your HSC grade" options={GRADES} required Icon={BookOpen} />
      </Field>
      <Field label="English Proficiency Score" htmlFor="english">
        <TextInput id="english" name="english" value={form.english} onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void} placeholder="e.g. IELTS 6.5 · TOEFL 87 · Not taken yet" required Icon={Globe} />
      </Field>
      <NavButtons showBack onBack={onBack} />
    </motion.form>
  );
}

// ── Step 3 — Study Goals ──────────────────────────────────────────────────────

function Step3({ form, onChange, onBack, onSubmit, loading, error }: {
  form: FormState; onChange: (e: AnyChange) => void; onBack: () => void;
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void; loading: boolean; error: boolean;
}) {
  return (
    <motion.form {...stepAnim} onSubmit={onSubmit} className="flex flex-col gap-5">
      <StepHeader step={3} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Target Country" htmlFor="country">
          <SelectInput id="country" name="country" value={form.country} onChange={onChange as (e: React.ChangeEvent<HTMLSelectElement>) => void} placeholder="Select country" options={COUNTRIES} required Icon={Globe} />
        </Field>
        <Field label="Target Degree" htmlFor="degree">
          <SelectInput id="degree" name="degree" value={form.degree} onChange={onChange as (e: React.ChangeEvent<HTMLSelectElement>) => void} placeholder="Select degree" options={DEGREES} required Icon={GraduationCap} />
        </Field>
      </div>

      <Field label="Preferred Major / Field of Study" htmlFor="major">
        <TextInput id="major" name="major" value={form.major} onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void} placeholder="e.g. Computer Science, Business, Nursing" required Icon={BookOpen} />
      </Field>

      <Field label="Estimated Annual Budget" htmlFor="budget">
        <SelectInput id="budget" name="budget" value={form.budget} onChange={onChange as (e: React.ChangeEvent<HTMLSelectElement>) => void} placeholder="Select your budget range" options={BUDGETS} required Icon={Banknote} />
      </Field>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="challenge" className={labelCls}>Main Challenge or Question</label>
        <div className="relative">
          <MessageSquare size={15} className="absolute left-4 top-[14px] text-slate/40 pointer-events-none" aria-hidden />
          <textarea
            id="challenge"
            name="challenge"
            value={form.challenge}
            onChange={onChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void}
            rows={4}
            placeholder="What's your biggest concern about studying abroad? Anything specific you'd like help with?"
            className="w-full pl-10 pr-4 py-3.5 text-sm rounded-xl border border-charcoal/12 bg-white text-charcoal placeholder-slate/40 outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/40 transition-all duration-200 resize-none"
          />
        </div>
      </div>

      {error && (
        <p className="text-xs text-red-500 text-center bg-red-50 py-2 px-4 rounded-lg border border-red-100">
          Something went wrong. Please try again or{' '}
          <a href="https://wa.me/358413272771" target="_blank" rel="noopener noreferrer" className="underline font-medium">
            reach us on WhatsApp
          </a>.
        </p>
      )}

      <NavButtons showBack onBack={onBack} submitLabel="Get My Free Evaluation" loading={loading} />

      <p className="text-xs text-slate/40 text-center">
        No spam. Zero pressure. Your data is never sold or shared.
      </p>
    </motion.form>
  );
}

// ── Success panel ─────────────────────────────────────────────────────────────

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function SuccessPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="bg-white rounded-3xl shadow-[0_8px_48px_rgba(0,180,216,0.10)] border border-charcoal/8 p-10 md:p-16 flex flex-col items-center text-center gap-5"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 15 }}
        className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(0,180,216,0.08)' }}
      >
        <CheckCircle2 size={40} className="text-teal" strokeWidth={1.8} />
      </motion.div>

      <div>
        <h2 className="font-display text-charcoal font-bold text-2xl mb-2">
          We've received your details!
        </h2>
        <p className="text-slate text-sm leading-relaxed max-w-sm">
          A Wayout advisor will personally review your profile and reach out within 24 hours. For an instant reply, chat with us on WhatsApp right now.
        </p>
      </div>

      <a
        href="https://wa.me/358413272771?text=Hi%20Wayout!%20I%20just%20submitted%20my%20profile%20evaluation%20form."
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 bg-teal text-white text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-200 hover:bg-teal-deep shadow-[0_0_24px_rgba(0,180,216,0.35)] hover:shadow-[0_0_36px_rgba(0,180,216,0.5)]"
      >
        <WhatsAppIcon /> Chat on WhatsApp
      </a>

      <Link
        to="/"
        className="text-sm text-slate/55 hover:text-teal transition-colors duration-200 mt-1"
      >
        ← Back to Home
      </Link>
    </motion.div>
  );
}

// ── Left panel trust sidebar ──────────────────────────────────────────────────

function TrustSidebar() {
  return (
    <aside className="hidden lg:flex flex-col sticky top-28 w-[272px] flex-shrink-0">
      <Link to="/" className="mb-7 w-fit hover:opacity-80 transition-opacity duration-200">
        <WayoutLogo size={30} textColor="#0D1B2A" />
      </Link>

      <h2
        className="font-display text-navy font-bold mb-2 leading-snug"
        style={{ fontSize: '1.3rem' }}
      >
        Free Profile Evaluation
      </h2>
      <p className="text-slate text-sm leading-relaxed mb-6">
        Fill in your details and a Wayout advisor will personally review your profile within 24 hours — no commitment needed.
      </p>

      <ul className="flex flex-col gap-3 mb-7">
        {WHY_POINTS.map((p) => (
          <li key={p} className="flex items-start gap-2.5 text-sm text-charcoal/65 leading-snug">
            <CheckCircle2 size={14} className="text-teal flex-shrink-0 mt-0.5" />
            {p}
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-3 rounded-2xl border border-charcoal/10 bg-white/60 backdrop-blur-sm shadow-sm py-4 px-2 mb-7">
        {[{ v: '500+', l: 'Students' }, { v: '98%', l: 'Visa Rate' }, { v: '5', l: 'Countries' }].map((s, i) => (
          <div key={s.l} className={`flex flex-col items-center gap-0.5 ${i < 2 ? 'border-r border-charcoal/10' : ''}`}>
            <span className="font-display font-bold text-teal text-lg leading-none">{s.v}</span>
            <span className="text-xs text-slate/55 mt-0.5">{s.l}</span>
          </div>
        ))}
      </div>

      <blockquote className="rounded-2xl bg-white/70 border border-charcoal/8 p-5 shadow-sm">
        <p className="text-sm text-charcoal/65 leading-relaxed italic mb-4">
          "Wayout matched me with Metropolia University in just 3 days. The whole process was transparent and completely stress-free."
        </p>
        <footer className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            N
          </div>
          <div>
            <div className="text-xs font-semibold text-charcoal leading-none mb-0.5">Nafisa Rahman</div>
            <div className="text-xs text-slate/55">Now studying in Helsinki, Finland</div>
          </div>
        </footer>
      </blockquote>
    </aside>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function ApplyPage() {
  const [step, setStep]           = useState(1);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm]           = useState<FormState>({
    name: '', email: '', phone: '',
    ssc: '', hsc: '', english: '',
    country: '', degree: '', major: '', budget: '', challenge: '',
    honeypot: '',
  });

  function handleChange(e: AnyChange) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (form.honeypot) return;
    setLoading(true);
    setError(false);
    try {
      const params = new URLSearchParams({
        timestamp: new Date().toISOString(),
        ...form,
      });
      await fetch(`${SCRIPT_URL}?${params.toString()}`, { mode: 'no-cors' });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden"
      style={{ background: 'linear-gradient(160deg, #EEF9FF 0%, #F4FBFF 60%, #E8F4FB 100%)' }}
    >
      {/* Subtle dot texture */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #48CAE4 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.04,
        }}
        aria-hidden
      />

      <Navbar />

      <div className="relative max-w-6xl mx-auto px-6 md:px-8 pt-28 pb-20 flex items-start gap-14">

        <TrustSidebar />

        {/* Form column */}
        <div className="flex-1 min-w-0">

          {/* Mobile header — hidden on desktop where sidebar shows */}
          <div className="lg:hidden mb-6">
            <Link to="/" className="inline-block mb-4 hover:opacity-80 transition-opacity duration-200">
              <WayoutLogo size={28} textColor="#0D1B2A" />
            </Link>
            <h1 className="font-display text-navy font-bold text-2xl mb-1">Free Profile Evaluation</h1>
            <p className="text-slate text-sm">Takes ~3 minutes · No commitment</p>
          </div>

          {submitted ? (
            <SuccessPanel />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="bg-white rounded-3xl shadow-[0_8px_48px_rgba(0,180,216,0.10)] border border-charcoal/8 p-8 md:p-10"
            >
              <StepIndicator current={step} />

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <Step1 key="s1" form={form} onChange={handleChange} onNext={() => setStep(2)} />
                )}
                {step === 2 && (
                  <Step2 key="s2" form={form} onChange={handleChange} onNext={() => setStep(3)} onBack={() => setStep(1)} />
                )}
                {step === 3 && (
                  <Step3 key="s3" form={form} onChange={handleChange} onBack={() => setStep(2)} onSubmit={handleSubmit} loading={loading} error={error} />
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
      <CtaFooter />
      <FloatingWhatsApp />
    </div>
  );
}
