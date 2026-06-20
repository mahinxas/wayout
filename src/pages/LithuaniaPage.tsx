import { motion } from 'framer-motion';
import {
  ArrowRight, MapPin, Shield, TrendingUp, Award, CheckCircle2,
  Globe, ChevronRight, Search,
} from 'lucide-react';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CtaFooter from '../components/CtaFooter';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

const UNIVERSITIES = [
  { short: 'VU', name: 'Vilnius University', city: 'Vilnius', programs: ['Law', 'Economics', 'IT', 'Natural Sciences'], rank: 'Oldest & highest-ranked in Lithuania', tier: 'flagship' },
  { short: 'KTU', name: 'Kaunas University of Technology', city: 'Kaunas', programs: ['Engineering', 'IT', 'Business', 'Architecture'], rank: 'Top for Engineering & Tech', tier: 'flagship' },
  { short: 'VU TSPMI', name: 'Institute of International Relations (VU)', city: 'Vilnius', programs: ['International Relations', 'Political Science'], rank: '', tier: 'strong' },
  { short: 'VGTU', name: 'Vilnius Gediminas Technical University', city: 'Vilnius', programs: ['Civil Engineering', 'IT', 'Aviation', 'Business'], rank: '', tier: 'strong' },
  { short: 'LSMU', name: 'Lithuanian University of Health Sciences', city: 'Kaunas', programs: ['Medicine', 'Pharmacy', 'Nursing', 'Dentistry'], rank: 'Top Medical School', tier: 'flagship' },
  { short: 'ISM', name: 'ISM University of Management and Economics', city: 'Vilnius', programs: ['Business', 'Marketing', 'Finance', 'Leadership'], rank: 'AACSB Accredited', tier: 'strong' },
  { short: 'MRU', name: 'Mykolas Romeris University', city: 'Vilnius', programs: ['Law', 'Social Work', 'Public Security', 'IT'], rank: '', tier: 'strong' },
  { short: 'ASU', name: 'Aleksandras Stulginskis University', city: 'Kaunas', programs: ['Agriculture', 'Environmental Engineering', 'Business'], rank: '', tier: 'strong' },
  { short: 'LKA', name: 'Lithuanian Academy of Music and Theatre', city: 'Vilnius', programs: ['Music', 'Theatre', 'Film'], rank: '', tier: 'specialized' },
  { short: 'VDA', name: 'Vilnius Academy of Arts', city: 'Vilnius', programs: ['Fine Arts', 'Design', 'Architecture'], rank: '', tier: 'specialized' },
  { short: 'LKKA', name: 'Lithuanian Sports University', city: 'Kaunas', programs: ['Sports Science', 'Coaching', 'Physiotherapy'], rank: '', tier: 'specialized' },
  { short: 'ŠU', name: 'Šiauliai State University', city: 'Šiauliai', programs: ['Education', 'Business', 'IT', 'Social Sciences'], rank: '', tier: 'strong' },
];

const WHY_REASONS = [
  {
    Icon: Globe,
    title: 'EU Membership & Schengen Freedom',
    body: 'As an EU country, a Lithuanian student permit gives you the right to travel freely across all 26 Schengen countries. After graduating and working for 5 years, you can apply for permanent residency — and eventually EU citizenship.',
    accent: '#90BE6D',
  },
  {
    Icon: Award,
    title: 'Extremely Affordable Fees',
    body: 'Tuition ranges from €2,000 to €8,000 per year — among the lowest in Europe for English-taught programs at accredited universities. Monthly living costs in Vilnius or Kaunas run €600–900, making Lithuania one of the most cost-effective EU study destinations.',
    accent: '#52B788',
  },
  {
    Icon: TrendingUp,
    title: 'Growing Tech & Business Hub',
    body: 'Lithuania\'s fintech and IT sectors are booming. Vilnius is home to major global banks\' tech centres (Barclays, Western Union, Nord Security). Graduates with tech or business degrees find strong local and EU job markets waiting.',
    accent: '#90BE6D',
  },
  {
    Icon: Shield,
    title: 'Safe, Modern European City',
    body: 'Vilnius is consistently ranked among Europe\'s safest capital cities. A compact, walkable old town, reliable public transport, fast internet, and a growing English-speaking community make it easy to settle in and feel at home.',
    accent: '#52B788',
  },
];

const TIMELINE = [
  { num: '01', title: 'Free Profile Evaluation', period: 'Anytime', desc: 'Wayout assesses your academic background and shortlists Lithuanian universities that match your discipline, budget, and IELTS/TOEFL scores.', tag: 'Start Today' },
  { num: '02', title: 'Apply to Universities', period: '6–9 months before intake', desc: 'Main intakes are September (primary) and February (some programs). Applications go directly through each university\'s portal. Wayout prepares your SOP, CV, and document package.', tag: 'Sep & Feb Intakes' },
  { num: '03', title: 'Receive Acceptance & Pay Deposit', period: '4–8 weeks after applying', desc: 'Upon receiving your acceptance letter, confirm your place by paying the first-semester deposit. This is required before applying for your national visa.', tag: 'Acceptance → Deposit' },
  { num: '04', title: 'National Visa (D-Type)', period: '15–30 days processing', desc: 'Apply at the Lithuanian Embassy. Documents: acceptance letter, proof of funds (€400/month min.), health insurance, valid passport, accommodation proof. One of the fastest EU visas to process.', tag: 'Processing: 2–4 wks' },
  { num: '05', title: 'Arrive & Register', period: '1–2 weeks before semester', desc: 'Register at the Migration Department within 3 months of arrival for your Temporary Residence Permit. Open a Lithuanian bank account, get a SIM, and connect with Wayout\'s peer network.', tag: 'Semester Start' },
];

const LIFE_FACTS = [
  { label: 'Monthly Living Cost', value: '€600–900', note: 'exc. tuition' },
  { label: 'Tuition Per Year', value: '€2,000–8,000', note: 'English programs' },
  { label: 'Schengen Travel', value: 'Free', note: 'to 26 countries' },
  { label: 'EU PR Eligibility', value: '5 years', note: 'of legal residence' },
  { label: 'Climate', value: 'Continental', note: 'warm summers, cold winters' },
  { label: 'Internet Speed', value: 'Top 10', note: 'globally ranked' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.55, ease: 'easeOut' as const, delay },
});

export default function LithuaniaPage() {
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
          style={{ background: 'linear-gradient(160deg, #0a1a06 0%, #122208 50%, #1a2e0a 100%)' }}
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-20 left-1/4 w-[700px] h-[500px] rounded-full"
              style={{ background: 'radial-gradient(ellipse, rgba(144,190,109,0.18) 0%, transparent 65%)', filter: 'blur(40px)' }} />
            <div className="absolute top-10 right-1/4 w-[500px] h-[350px] rounded-full"
              style={{ background: 'radial-gradient(ellipse, rgba(82,183,136,0.12) 0%, transparent 65%)', filter: 'blur(60px)' }} />
            <div className="absolute inset-0"
              style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.45) 1px, transparent 1px)', backgroundSize: '48px 48px', opacity: 0.05 }} />
          </div>

          <div className="relative max-w-5xl mx-auto px-6 md:px-8 pt-32 pb-12 w-full">
            <motion.div {...fadeUp(0)} className="flex items-center gap-1.5 text-xs text-white/35 mb-8 font-medium">
              <Link to="/" className="hover:text-white/60 transition-colors duration-200">Home</Link>
              <ChevronRight size={12} />
              <span className="text-white/35">Destinations</span>
              <ChevronRight size={12} />
              <span style={{ color: '#90BE6D' }}>Lithuania</span>
            </motion.div>

            <motion.div {...fadeUp(0.06)} className="mb-5">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
                style={{ background: 'rgba(144,190,109,0.15)', border: '1px solid rgba(144,190,109,0.35)', color: '#90BE6D' }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#90BE6D' }} />
                EU Member · Schengen Zone
              </span>
            </motion.div>

            <motion.h1 {...fadeUp(0.1)} className="font-display leading-[1.02] tracking-[-0.03em] text-white mb-5"
              style={{ fontSize: 'clamp(3rem,7vw,5.5rem)', fontWeight: 800 }}>
              Study in{' '}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(90deg, #90BE6D 0%, #52B788 60%, #b7e4c7 100%)' }}>
                Lithuania
              </span>
              <span className="ml-3 text-4xl" role="img" aria-label="Lithuanian flag">🇱🇹</span>
            </motion.h1>

            <motion.p {...fadeUp(0.16)} className="text-lg leading-relaxed max-w-2xl mb-10"
              style={{ color: 'rgba(255,255,255,0.58)' }}>
              Affordable excellence in the heart of Europe. EU membership, Schengen travel freedom, world-accredited universities, and tuition fees that are a fraction of Western Europe.
            </motion.p>

            <motion.div {...fadeUp(0.22)} className="flex flex-wrap gap-6 md:gap-10 mb-12">
              {[
                { value: '12+', label: 'Universities' },
                { value: '€2k–8k', label: 'Tuition / Year' },
                { value: '26', label: 'Schengen Countries' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-display font-bold leading-none mb-1"
                    style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: 800, color: '#90BE6D' }}>
                    {s.value}
                  </span>
                  <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.42)' }}>{s.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div {...fadeUp(0.28)} className="flex flex-wrap gap-3 mb-16">
              <a href="https://wa.me/358413272771?text=Hi%20Wayout!%20I%27d%20like%20to%20learn%20about%20studying%20in%20Lithuania."
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white px-7 py-3.5 rounded-full transition-all duration-200 active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg, #52B788, #90BE6D)', boxShadow: '0 0 32px rgba(144,190,109,0.40)' }}>
                Get Free Evaluation <ArrowRight size={15} />
              </a>
              <button onClick={() => document.getElementById('universities')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-200"
                style={{ border: '1px solid rgba(144,190,109,0.35)', color: '#90BE6D', background: 'rgba(144,190,109,0.06)' }}>
                Explore Universities
              </button>
            </motion.div>
          </div>

          {/* City skyline silhouette */}
          <div className="relative w-full" aria-hidden="true" style={{ height: '140px' }}>
            <svg viewBox="0 0 1440 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
              <path d="M0 140 L0 100 L80 100 L80 70 L100 70 L100 45 L110 45 L110 35 L120 35 L120 45 L130 45 L130 70 L150 70 L150 100 L230 100 L230 65 L260 65 L260 30 L270 30 L270 15 L280 15 L280 30 L290 30 L290 65 L320 65 L320 100 L400 100 L400 75 L430 75 L430 50 L450 50 L450 75 L480 75 L480 100 L560 100 L560 60 L590 60 L590 25 L600 25 L600 10 L610 10 L610 25 L620 25 L620 60 L650 60 L650 100 L730 100 L730 70 L760 70 L760 45 L780 45 L780 70 L810 70 L810 100 L880 100 L880 75 L910 75 L910 55 L930 55 L930 75 L960 75 L960 100 L1040 100 L1040 65 L1070 65 L1070 35 L1080 35 L1080 20 L1090 20 L1090 35 L1100 35 L1100 65 L1130 65 L1130 100 L1210 100 L1210 80 L1240 80 L1240 60 L1260 60 L1260 80 L1290 80 L1290 100 L1370 100 L1370 75 L1440 75 L1440 140 Z"
                fill="#122208" opacity="0.95" />
              <rect x="0" y="132" width="1440" height="8" fill="#F4F6F9" />
            </svg>
          </div>
        </section>

        {/* WHY LITHUANIA */}
        <section className="bg-arctic py-20 md:py-28" aria-labelledby="why-lt-heading">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-14">
              <motion.span {...fadeUp(0)} className="inline-block text-xs font-semibold uppercase tracking-widest text-teal mb-4">The Case for Lithuania</motion.span>
              <motion.h2 id="why-lt-heading" {...fadeUp(0.06)} className="font-display text-charcoal tracking-tight mb-4"
                style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                Why Lithuania Works for You
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

        {/* UNIVERSITIES */}
        <section id="universities" className="bg-white py-20 md:py-28 border-t border-charcoal/6" aria-labelledby="lt-uni-heading">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-12">
              <motion.span {...fadeUp(0)} className="inline-block text-xs font-semibold uppercase tracking-widest text-teal mb-4">Full List</motion.span>
              <motion.h2 id="lt-uni-heading" {...fadeUp(0.06)} className="font-display text-charcoal tracking-tight mb-4"
                style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                Lithuanian Universities
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
                  className="bg-white rounded-2xl p-5 border border-charcoal/6 hover:border-green-200 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(144,190,109,0.10)] group">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                          style={{ background: 'rgba(144,190,109,0.12)', color: '#52B788' }}>
                          {u.short}
                        </span>
                        {u.tier === 'flagship' && (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                            style={{ background: 'rgba(144,190,109,0.15)', color: '#90BE6D', border: '1px solid rgba(144,190,109,0.3)' }}>
                            Flagship
                          </span>
                        )}
                        {u.tier === 'specialized' && (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                            style={{ background: 'rgba(0,180,216,0.10)', color: '#00B4D8', border: '1px solid rgba(0,180,216,0.25)' }}>
                            Specialized
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
                    <p className="text-xs font-medium border-t border-charcoal/6 pt-3 mt-2" style={{ color: '#52B788' }}>{u.rank}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="py-20 md:py-28" style={{ background: 'linear-gradient(160deg, #0a1a06 0%, #1a2e0a 100%)' }}>
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            <div className="text-center mb-14">
              <motion.span {...fadeUp(0)} className="inline-block text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#90BE6D' }}>Step by Step</motion.span>
              <motion.h2 {...fadeUp(0.06)} className="font-display text-white tracking-tight mb-4"
                style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                The Application Roadmap
              </motion.h2>
            </div>
            <div className="flex flex-col gap-6">
              {TIMELINE.map((step, i) => (
                <motion.div key={step.num} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-2xl p-6 border flex gap-5"
                  style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(144,190,109,0.15)' }}>
                  <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm text-white"
                    style={{ background: 'linear-gradient(135deg, #52B788, #90BE6D)' }}>
                    {i + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-display text-white font-bold text-base" style={{ fontWeight: 700 }}>{step.title}</h3>
                      <span className="text-xs font-semibold px-3 py-0.5 rounded-full"
                        style={{ background: 'rgba(144,190,109,0.15)', color: '#90BE6D', border: '1px solid rgba(144,190,109,0.2)' }}>
                        {step.tag}
                      </span>
                    </div>
                    <p className="text-xs font-semibold mb-2" style={{ color: '#90BE6D' }}>{step.period}</p>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.52)' }}>{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div {...fadeUp(0.2)} className="text-center mt-12">
              <a href="https://wa.me/358413272771?text=Hi%20Wayout!%20I%27d%20like%20help%20with%20my%20Lithuania%20application."
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white px-8 py-4 rounded-full transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, #52B788, #90BE6D)', boxShadow: '0 0 32px rgba(144,190,109,0.4)' }}>
                Start Your Lithuania Journey <ArrowRight size={15} />
              </a>
            </motion.div>
          </div>
        </section>

        {/* LIFE FACTS */}
        <section className="bg-arctic py-20 md:py-28 border-t border-charcoal/6">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-12">
              <motion.span {...fadeUp(0)} className="inline-block text-xs font-semibold uppercase tracking-widest text-teal mb-4">On the Ground</motion.span>
              <motion.h2 {...fadeUp(0.06)} className="font-display text-charcoal tracking-tight"
                style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                Life in Lithuania — Quick Facts
              </motion.h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 mb-10">
              {LIFE_FACTS.map((f, i) => (
                <motion.div key={f.label} {...fadeUp(i * 0.06)}
                  className="bg-white rounded-2xl p-6 border border-charcoal/6 text-center hover:border-green-200 transition-all duration-300">
                  <p className="font-display font-bold mb-1" style={{ fontSize: 'clamp(1.1rem,2.5vw,1.5rem)', fontWeight: 800, color: '#52B788' }}>{f.value}</p>
                  <p className="text-charcoal font-semibold text-sm mb-1">{f.label}</p>
                  <p className="text-slate/55 text-xs">{f.note}</p>
                </motion.div>
              ))}
            </div>
            <motion.div {...fadeUp(0.2)} className="bg-white rounded-2xl p-6 md:p-8 border border-charcoal/6">
              <h3 className="font-display text-charcoal font-bold text-lg mb-5" style={{ fontWeight: 700 }}>Things Every Student Should Know</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'English is widely spoken in Vilnius and Kaunas — no Lithuanian required for study.',
                  'Register at the Migration Department within 3 months of arrival for your residence permit.',
                  'Winters are cold (down to -15°C) — invest in proper thermal gear before you land.',
                  'Public transport is cheap and reliable in both Vilnius and Kaunas.',
                  'Lidl, Maxima, and Iki supermarkets keep grocery costs very low.',
                  'Wayout connects you with a peer mentor already living in Lithuania before departure.',
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
        <section className="py-20 md:py-28" style={{ background: 'linear-gradient(135deg, #52B788 0%, #90BE6D 60%, #b7e4c7 100%)' }}>
          <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
            <motion.h2 {...fadeUp(0.06)} className="font-display text-white tracking-tight mb-4"
              style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Ready to Study in Europe?
            </motion.h2>
            <motion.p {...fadeUp(0.12)} className="text-base leading-relaxed max-w-xl mx-auto mb-10"
              style={{ color: 'rgba(255,255,255,0.80)' }}>
              Lithuania offers an EU degree at a fraction of Western European prices. Get your free profile evaluation and find out if this is the right route for you.
            </motion.p>
            <motion.div {...fadeUp(0.18)} className="flex flex-wrap justify-center gap-4">
              <a href="https://wa.me/358413272771?text=Hi%20Wayout!%20I%27d%20like%20a%20free%20evaluation%20for%20Lithuania."
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold px-8 py-4 rounded-full transition-all duration-200"
                style={{ background: 'white', color: '#52B788', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
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
