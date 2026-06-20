import { motion } from 'framer-motion';
import {
  ArrowRight, MapPin, Shield, TrendingUp, Award,
  CheckCircle2, Briefcase, ChevronRight, Search,
} from 'lucide-react';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CtaFooter from '../components/CtaFooter';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

const UNIVERSITIES = [
  { short: 'ANU', name: 'Australian National University', city: 'Canberra', programs: ['Law', 'Policy', 'Science', 'Arts'], rank: 'QS Top 30 globally', tier: 'flagship' },
  { short: 'UniMelb', name: 'University of Melbourne', city: 'Melbourne', programs: ['Business', 'Engineering', 'Medicine', 'Arts'], rank: 'QS Top 35 globally', tier: 'flagship' },
  { short: 'UNSW', name: 'University of New South Wales', city: 'Sydney', programs: ['Engineering', 'Business', 'Law', 'IT'], rank: 'QS Top 20 globally', tier: 'flagship' },
  { short: 'UniSyd', name: 'University of Sydney', city: 'Sydney', programs: ['Medicine', 'Law', 'Business', 'Engineering'], rank: 'QS Top 20 globally', tier: 'flagship' },
  { short: 'UQ', name: 'University of Queensland', city: 'Brisbane', programs: ['Science', 'Business', 'Engineering', 'Health'], rank: 'QS Top 50 globally', tier: 'flagship' },
  { short: 'Monash', name: 'Monash University', city: 'Melbourne', programs: ['Business', 'Engineering', 'Pharmacy', 'IT'], rank: 'QS Top 60 globally', tier: 'flagship' },
  { short: 'UWA', name: 'University of Western Australia', city: 'Perth', programs: ['Mining', 'Business', 'Engineering', 'Science'], rank: 'QS Top 100 globally', tier: 'strong' },
  { short: 'UniAdelaide', name: 'University of Adelaide', city: 'Adelaide', programs: ['Engineering', 'Agriculture', 'Business', 'Science'], rank: 'QS Top 120 globally', tier: 'strong' },
  { short: 'RMIT', name: 'RMIT University', city: 'Melbourne', programs: ['Design', 'Engineering', 'Business', 'IT'], rank: 'Top for Creative Industries', tier: 'strong' },
  { short: 'UTS', name: 'University of Technology Sydney', city: 'Sydney', programs: ['IT', 'Business', 'Design', 'Engineering'], rank: 'Top Young University', tier: 'strong' },
  { short: 'Macquarie', name: 'Macquarie University', city: 'Sydney', programs: ['Business', 'Finance', 'IT', 'Health'], rank: '', tier: 'strong' },
  { short: 'Griffith', name: 'Griffith University', city: 'Brisbane / Gold Coast', programs: ['Criminology', 'Business', 'Health', 'Arts'], rank: '', tier: 'strong' },
  { short: 'Deakin', name: 'Deakin University', city: 'Melbourne / Geelong', programs: ['Business', 'IT', 'Health', 'Education'], rank: '', tier: 'strong' },
  { short: 'CQUniversity', name: 'CQUniversity Australia', city: 'Rockhampton', programs: ['Engineering', 'Nursing', 'Business', 'IT'], rank: 'Affordable pathway', tier: 'pathway' },
  { short: 'Federation', name: 'Federation University', city: 'Ballarat', programs: ['Engineering', 'IT', 'Nursing', 'Business'], rank: 'Affordable pathway', tier: 'pathway' },
];

const WHY_REASONS = [
  {
    Icon: Award,
    title: 'World-Class Universities',
    body: '8 Australian universities rank in the global QS Top 100 — more per capita than almost any country. An Australian degree is recognised by employers worldwide and opens doors across Asia, Europe, and North America.',
    accent: '#F4A261',
  },
  {
    Icon: Briefcase,
    title: 'Post-Study Work Rights',
    body: 'Graduate Visa (subclass 485) lets you work full-time in Australia for 2–4 years after graduation. Regional graduates get an extra 1–2 years. This work experience dramatically boosts long-term migration pathways.',
    accent: '#E76F51',
  },
  {
    Icon: TrendingUp,
    title: 'Strong Migration Pathway',
    body: 'Australia actively recruits skilled graduates through the Skilled Migration program. Many degrees qualify for points-based permanent residency. Critical sectors like IT, engineering, and nursing get priority processing.',
    accent: '#F4A261',
  },
  {
    Icon: Shield,
    title: 'Safe, Multicultural Society',
    body: 'Consistently ranked among the world\'s safest countries. Over 30% of Australians were born overseas — it is genuinely multicultural. South Asian communities are large and well-established in Sydney, Melbourne, and Brisbane.',
    accent: '#E76F51',
  },
];

const TIMELINE = [
  { num: '01', title: 'Free Profile Evaluation', period: 'Anytime', desc: 'Wayout reviews your academic profile, IELTS/PTE scores, and budget. We shortlist the best-fit Australian universities across your target city and discipline.', tag: 'Start Today' },
  { num: '02', title: 'University Applications', period: '6–12 months before intake', desc: 'Australia has two main intakes: February and July. Applications close 3–6 months before intake. Wayout handles SOP, application forms, and document preparation end-to-end.', tag: 'Feb & Jul Intakes' },
  { num: '03', title: 'Offer Letter & CoE', period: '2–8 weeks after applying', desc: 'Receive your Offer Letter, accept it, pay the deposit, and receive the Confirmation of Enrolment (CoE). This is your key document for the student visa.', tag: 'CoE Required for Visa' },
  { num: '04', title: 'Student Visa (Subclass 500)', period: '4–8 weeks processing', desc: 'Apply online via ImmiAccount. Requirements: CoE, OSHC health insurance, proof of funds (AUD 21,041/year), GTE statement, and English scores. Approval rate for genuine students is very high.', tag: 'Processing: 4–8 wks' },
  { num: '05', title: 'Arrive & Settle', period: '2 weeks before semester', desc: 'Attend orientation, open a bank account (ANZ/Commonwealth/NAB), get a TFN from ATO, and register your local health insurance. Wayout connects you with a peer mentor already studying at your university.', tag: 'Semester Start' },
];

const LIFE_FACTS = [
  { label: 'Monthly Living Cost', value: 'AUD 1,800–2,500', note: 'exc. tuition' },
  { label: 'Part-time Work', value: '48 hrs / fortnight', note: 'during semester' },
  { label: 'Post-Study Work', value: '2–4 years', note: 'Graduate Visa 485' },
  { label: 'Climate', value: 'Warm & Sunny', note: 'varies by city' },
  { label: 'Global Safety Rank', value: 'Top 10', note: 'Global Peace Index' },
  { label: 'English Medium', value: '100%', note: 'all programs' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.55, ease: 'easeOut' as const, delay },
});

export default function AustraliaPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return UNIVERSITIES.filter(
      (u) => !q || u.short.toLowerCase().includes(q) || u.name.toLowerCase().includes(q) ||
        u.city.toLowerCase().includes(q) || u.programs.some((p) => p.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-arctic">
      <Navbar darkBg />
      <main>

        {/* HERO */}
        <section
          className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #1a0800 0%, #2d1200 50%, #3d1a05 100%)' }}
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-20 left-1/4 w-[700px] h-[500px] rounded-full"
              style={{ background: 'radial-gradient(ellipse, rgba(244,162,97,0.20) 0%, transparent 65%)', filter: 'blur(40px)' }} />
            <div className="absolute top-10 right-1/4 w-[500px] h-[350px] rounded-full"
              style={{ background: 'radial-gradient(ellipse, rgba(231,111,81,0.14) 0%, transparent 65%)', filter: 'blur(60px)' }} />
            <div className="absolute inset-0"
              style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.45) 1px, transparent 1px)', backgroundSize: '48px 48px', opacity: 0.05 }} />
          </div>

          <div className="relative max-w-5xl mx-auto px-6 md:px-8 pt-32 pb-12 w-full">
            <motion.div {...fadeUp(0)} className="flex items-center gap-1.5 text-xs text-white/35 mb-8 font-medium">
              <Link to="/" className="hover:text-white/60 transition-colors duration-200">Home</Link>
              <ChevronRight size={12} />
              <span className="text-white/35">Destinations</span>
              <ChevronRight size={12} />
              <span style={{ color: '#F4A261' }}>Australia</span>
            </motion.div>

            <motion.div {...fadeUp(0.06)} className="mb-5">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
                style={{ background: 'rgba(244,162,97,0.15)', border: '1px solid rgba(244,162,97,0.35)', color: '#F4A261' }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#F4A261' }} />
                41 Universities
              </span>
            </motion.div>

            <motion.h1 {...fadeUp(0.1)} className="font-display leading-[1.02] tracking-[-0.03em] text-white mb-5"
              style={{ fontSize: 'clamp(3rem,7vw,5.5rem)', fontWeight: 800 }}>
              Study in{' '}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(90deg, #F4A261 0%, #E76F51 60%, #ffb347 100%)' }}>
                Australia
              </span>
              <span className="ml-3 text-4xl" role="img" aria-label="Australian flag">🇦🇺</span>
            </motion.h1>

            <motion.p {...fadeUp(0.16)} className="text-lg leading-relaxed max-w-2xl mb-10"
              style={{ color: 'rgba(255,255,255,0.58)' }}>
              Global top-100 universities, sun-drenched campuses, and one of the most generous post-study work visa programs in the world. Australia is built for international career success.
            </motion.p>

            <motion.div {...fadeUp(0.22)} className="flex flex-wrap gap-6 md:gap-10 mb-12">
              {[
                { value: '8', label: 'QS Top-100 Unis' },
                { value: '2–4 yrs', label: 'Post-Study Work' },
                { value: 'Feb & Jul', label: 'Annual Intakes' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-display font-bold leading-none mb-1"
                    style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: 800, color: '#F4A261' }}>
                    {s.value}
                  </span>
                  <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.42)' }}>{s.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div {...fadeUp(0.28)} className="flex flex-wrap gap-3 mb-16">
              <a href="https://wa.me/358413272771?text=Hi%20Wayout!%20I%27d%20like%20to%20learn%20about%20studying%20in%20Australia."
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white px-7 py-3.5 rounded-full transition-all duration-200 active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg, #F4A261, #E76F51)', boxShadow: '0 0 32px rgba(244,162,97,0.45)' }}>
                Get Free Evaluation <ArrowRight size={15} />
              </a>
              <button onClick={() => document.getElementById('universities')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-200"
                style={{ border: '1px solid rgba(244,162,97,0.35)', color: '#F4A261', background: 'rgba(244,162,97,0.06)' }}>
                Explore Universities
              </button>
            </motion.div>
          </div>

          {/* Skyline silhouette */}
          <div className="relative w-full" aria-hidden="true" style={{ height: '140px' }}>
            <svg viewBox="0 0 1440 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
              <path d="M0 140 L0 90 L60 90 L60 60 L80 60 L80 40 L100 40 L100 60 L120 60 L120 90 L200 90 L200 50 L220 50 L220 20 L240 20 L240 50 L260 50 L260 90 L340 90 L340 70 L370 70 L370 55 L390 55 L390 70 L420 70 L420 90 L500 90 L500 45 L520 45 L520 10 L540 10 L540 45 L560 45 L560 90 L640 90 L640 65 L660 65 L660 40 L680 40 L680 65 L700 65 L700 90 L780 90 L780 55 L800 55 L800 30 L820 30 L820 55 L840 55 L840 90 L920 90 L920 70 L950 70 L950 50 L980 50 L980 70 L1010 70 L1010 90 L1080 90 L1080 60 L1100 60 L1100 35 L1120 35 L1120 60 L1140 60 L1140 90 L1220 90 L1220 75 L1250 75 L1250 55 L1280 55 L1280 75 L1310 75 L1310 90 L1380 90 L1380 70 L1440 70 L1440 140 Z"
                fill="#3d1a05" opacity="0.9" />
              <rect x="0" y="132" width="1440" height="8" fill="#F4F6F9" />
            </svg>
          </div>
        </section>

        {/* WHY AUSTRALIA */}
        <section className="bg-arctic py-20 md:py-28" aria-labelledby="why-au-heading">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-14">
              <motion.span {...fadeUp(0)} className="inline-block text-xs font-semibold uppercase tracking-widest text-teal mb-4">The Case for Australia</motion.span>
              <motion.h2 id="why-au-heading" {...fadeUp(0.06)} className="font-display text-charcoal tracking-tight mb-4"
                style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                Why Students Choose Australia
              </motion.h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {WHY_REASONS.map((r, i) => {
                const Icon = r.Icon;
                return (
                  <motion.div key={r.title} {...fadeUp(i * 0.08)}
                    className="bg-white rounded-2xl p-7 border border-charcoal/6 shadow-[0_4px_24px_rgba(13,27,42,0.06)] hover:shadow-[0_8px_40px_rgba(13,27,42,0.10)] transition-all duration-300 hover:-translate-y-0.5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: `${r.accent}18` }}>
                      <Icon size={22} style={{ color: r.accent }} aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-charcoal font-bold text-lg mb-3" style={{ fontWeight: 700 }}>{r.title}</h3>
                    <p className="text-slate text-sm leading-relaxed">{r.body}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* UNIVERSITY EXPLORER */}
        <section id="universities" className="bg-white py-20 md:py-28 border-t border-charcoal/6" aria-labelledby="au-uni-heading">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-12">
              <motion.span {...fadeUp(0)} className="inline-block text-xs font-semibold uppercase tracking-widest text-teal mb-4">Full List</motion.span>
              <motion.h2 id="au-uni-heading" {...fadeUp(0.06)} className="font-display text-charcoal tracking-tight mb-4"
                style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                Australian Universities
              </motion.h2>
            </div>

            <motion.div {...fadeUp(0.1)} className="flex justify-end mb-8">
              <div className="relative w-full sm:w-72">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate/40" aria-hidden="true" />
                <input type="text" placeholder="Search by name, city, or program..."
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl bg-arctic border border-charcoal/10 text-charcoal placeholder-slate/40 outline-none focus:ring-2 focus:ring-teal/30 transition-all duration-200" />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((u, i) => (
                <motion.div key={u.name}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }} transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.32) }}
                  className="bg-white rounded-2xl p-5 border border-charcoal/6 hover:border-orange-200 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(244,162,97,0.10)] group">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                          style={{ background: 'rgba(244,162,97,0.12)', color: '#E76F51' }}>
                          {u.short}
                        </span>
                        {u.tier === 'flagship' && (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                            style={{ background: 'rgba(244,162,97,0.15)', color: '#F4A261', border: '1px solid rgba(244,162,97,0.3)' }}>
                            Flagship
                          </span>
                        )}
                        {u.tier === 'pathway' && (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                            style={{ background: 'rgba(0,180,216,0.10)', color: '#00B4D8', border: '1px solid rgba(0,180,216,0.25)' }}>
                            Pathway
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-charcoal font-bold text-sm leading-snug" style={{ fontWeight: 700 }}>{u.name}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mb-3">
                    <MapPin size={12} className="text-slate/40 flex-shrink-0" aria-hidden="true" />
                    <span className="text-xs text-slate/55">{u.city}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {u.programs.slice(0, 4).map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ background: '#F4F6F9', color: '#5B6B7E' }}>{tag}</span>
                    ))}
                  </div>
                  {u.rank && (
                    <p className="text-xs font-medium border-t border-charcoal/6 pt-3 mt-2" style={{ color: '#E76F51' }}>{u.rank}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="py-20 md:py-28" style={{ background: 'linear-gradient(160deg, #1a0800 0%, #2d1200 100%)' }} aria-labelledby="au-timeline-heading">
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            <div className="text-center mb-14">
              <motion.span {...fadeUp(0)} className="inline-block text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#F4A261' }}>Step by Step</motion.span>
              <motion.h2 id="au-timeline-heading" {...fadeUp(0.06)} className="font-display text-white tracking-tight mb-4"
                style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                The Application Roadmap
              </motion.h2>
            </div>
            <div className="flex flex-col gap-6">
              {TIMELINE.map((step, i) => (
                <motion.div key={step.num} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-2xl p-6 border flex gap-5"
                  style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(244,162,97,0.15)' }}>
                  <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm text-white"
                    style={{ background: 'linear-gradient(135deg, #F4A261, #E76F51)' }}>
                    {i + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-display text-white font-bold text-base" style={{ fontWeight: 700 }}>{step.title}</h3>
                      <span className="text-xs font-semibold px-3 py-0.5 rounded-full"
                        style={{ background: 'rgba(244,162,97,0.15)', color: '#F4A261', border: '1px solid rgba(244,162,97,0.2)' }}>
                        {step.tag}
                      </span>
                    </div>
                    <p className="text-xs font-semibold mb-2" style={{ color: '#F4A261' }}>{step.period}</p>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.52)' }}>{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div {...fadeUp(0.2)} className="text-center mt-12">
              <a href="https://wa.me/358413272771?text=Hi%20Wayout!%20I%27d%20like%20help%20with%20my%20Australia%20application."
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white px-8 py-4 rounded-full transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, #F4A261, #E76F51)', boxShadow: '0 0 32px rgba(244,162,97,0.4)' }}>
                Start Your Australia Journey <ArrowRight size={15} />
              </a>
            </motion.div>
          </div>
        </section>

        {/* LIFE FACTS */}
        <section className="bg-arctic py-20 md:py-28 border-t border-charcoal/6" aria-labelledby="au-life-heading">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-12">
              <motion.span {...fadeUp(0)} className="inline-block text-xs font-semibold uppercase tracking-widest text-teal mb-4">On the Ground</motion.span>
              <motion.h2 id="au-life-heading" {...fadeUp(0.06)} className="font-display text-charcoal tracking-tight"
                style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                Life in Australia — Quick Facts
              </motion.h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 mb-10">
              {LIFE_FACTS.map((f, i) => (
                <motion.div key={f.label} {...fadeUp(i * 0.06)}
                  className="bg-white rounded-2xl p-6 border border-charcoal/6 text-center hover:border-orange-200 transition-all duration-300">
                  <p className="font-display font-bold mb-1" style={{ fontSize: 'clamp(1.1rem,2.5vw,1.5rem)', fontWeight: 800, color: '#E76F51' }}>{f.value}</p>
                  <p className="text-charcoal font-semibold text-sm mb-1">{f.label}</p>
                  <p className="text-slate/55 text-xs">{f.note}</p>
                </motion.div>
              ))}
            </div>
            <motion.div {...fadeUp(0.2)} className="bg-white rounded-2xl p-6 md:p-8 border border-charcoal/6">
              <h3 className="font-display text-charcoal font-bold text-lg mb-5" style={{ fontWeight: 700 }}>Things Every Student Should Know</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Open a bank account before you arrive — CommBank, ANZ, and NAB all offer pre-arrival accounts.',
                  'Get an Australian SIM card (Optus or Telstra) immediately upon landing.',
                  'Apply for a Tax File Number (TFN) from the ATO within your first week.',
                  'OSHC (Overseas Student Health Cover) is mandatory for your entire visa duration.',
                  'Summers (Dec–Feb) are very hot in many cities — sun protection is essential.',
                  'Wayout connects you with a peer mentor from your university before you land.',
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={15} className="text-teal flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-slate text-sm leading-relaxed">{tip}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="py-20 md:py-28" style={{ background: 'linear-gradient(135deg, #E76F51 0%, #F4A261 60%, #ffb347 100%)' }}>
          <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
            <motion.h2 {...fadeUp(0.06)} className="font-display text-white tracking-tight mb-4"
              style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Ready to Study in Australia?
            </motion.h2>
            <motion.p {...fadeUp(0.12)} className="text-base leading-relaxed max-w-xl mx-auto mb-10"
              style={{ color: 'rgba(255,255,255,0.80)' }}>
              Get a free profile evaluation from a Wayout advisor. We'll tell you exactly which universities to target, what documents you need, and how to maximise your visa success rate.
            </motion.p>
            <motion.div {...fadeUp(0.18)} className="flex flex-wrap justify-center gap-4">
              <a href="https://wa.me/358413272771?text=Hi%20Wayout!%20I%27d%20like%20a%20free%20evaluation%20for%20Australia."
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold px-8 py-4 rounded-full transition-all duration-200"
                style={{ background: 'white', color: '#E76F51', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Chat on WhatsApp
              </a>
              <Link to="/apply"
                className="inline-flex items-center gap-2 text-sm font-bold px-8 py-4 rounded-full transition-all duration-200"
                style={{ border: '2px solid rgba(255,255,255,0.5)', color: 'white' }}>
                Free Evaluation Form <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
      <CtaFooter />
      <FloatingWhatsApp />
    </div>
  );
}
