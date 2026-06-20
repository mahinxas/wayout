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
  { short: 'UM', name: 'Universiti Malaya', city: 'Kuala Lumpur', programs: ['Medicine', 'Engineering', 'Business', 'Law'], rank: 'QS Top 70 globally', tier: 'flagship' },
  { short: 'UPM', name: 'Universiti Putra Malaysia', city: 'Serdang', programs: ['Agriculture', 'Engineering', 'Science', 'Medicine'], rank: 'QS Top 150 globally', tier: 'flagship' },
  { short: 'UTM', name: 'Universiti Teknologi Malaysia', city: 'Johor Bahru', programs: ['Engineering', 'IT', 'Architecture', 'Quantity Surveying'], rank: 'QS Top 200 globally', tier: 'flagship' },
  { short: 'USM', name: 'Universiti Sains Malaysia', city: 'Penang', programs: ['Medicine', 'Science', 'Engineering', 'Arts'], rank: 'QS Top 200 globally', tier: 'flagship' },
  { short: 'UKM', name: 'Universiti Kebangsaan Malaysia', city: 'Bangi', programs: ['Medicine', 'Law', 'IT', 'Engineering'], rank: 'QS Top 200 globally', tier: 'flagship' },
  { short: "UiTM", name: 'Universiti Teknologi MARA', city: 'Shah Alam', programs: ['Business', 'Engineering', 'IT', 'Hospitality'], rank: 'Largest university in Malaysia', tier: 'strong' },
  { short: "Taylor's", name: "Taylor's University", city: 'Subang Jaya', programs: ['Hospitality', 'Business', 'Architecture', 'IT'], rank: 'Top Private University', tier: 'strong' },
  { short: 'Sunway', name: 'Sunway University', city: 'Subang Jaya', programs: ['Business', 'IT', 'Psychology', 'Engineering'], rank: 'QS Top 600 globally', tier: 'strong' },
  { short: 'HELP', name: 'HELP University', city: 'Kuala Lumpur', programs: ['Business', 'Psychology', 'Law', 'IT'], rank: '', tier: 'strong' },
  { short: 'APU', name: 'Asia Pacific University', city: 'Kuala Lumpur', programs: ['IT', 'Engineering', 'Business', 'Media'], rank: 'Top for Technology', tier: 'strong' },
  { short: 'UTAR', name: 'Universiti Tunku Abdul Rahman', city: 'Kampar / KL', programs: ['Engineering', 'Business', 'IT', 'Science'], rank: 'Affordable quality', tier: 'pathway' },
  { short: 'MMU', name: 'Multimedia University', city: 'Cyberjaya', programs: ['IT', 'Engineering', 'Media', 'Business'], rank: 'Top for Multimedia & IT', tier: 'strong' },
  { short: 'UCSI', name: 'UCSI University', city: 'Kuala Lumpur', programs: ['Medicine', 'Nursing', 'Business', 'Music'], rank: '', tier: 'strong' },
  { short: 'INTI', name: 'INTI International University', city: 'Nilai', programs: ['Business', 'IT', 'Engineering', 'Hospitality'], rank: '', tier: 'pathway' },
  { short: 'Curtin Malaysia', name: 'Curtin University Malaysia', city: 'Miri, Sarawak', programs: ['Engineering', 'Business', 'Science', 'Media'], rank: 'Australian franchise campus', tier: 'strong' },
  { short: 'Monash Malaysia', name: 'Monash University Malaysia', city: 'Subang Jaya', programs: ['Business', 'Engineering', 'IT', 'Medicine'], rank: 'Australian franchise — globally ranked', tier: 'flagship' },
  { short: 'Nottingham Malaysia', name: 'University of Nottingham Malaysia', city: 'Semenyih', programs: ['Engineering', 'Business', 'Science', 'Law'], rank: 'UK franchise campus', tier: 'strong' },
  { short: 'Heriot-Watt Malaysia', name: 'Heriot-Watt University Malaysia', city: 'Putrajaya', programs: ['Engineering', 'Business', 'IT', 'Built Environment'], rank: 'Scottish franchise campus', tier: 'strong' },
  { short: 'IMU', name: 'International Medical University', city: 'Kuala Lumpur', programs: ['Medicine', 'Pharmacy', 'Dentistry', 'Nursing'], rank: 'Top Medical Private University', tier: 'flagship' },
  { short: 'SEGi', name: 'SEGi University & Colleges', city: 'Kota Damansara', programs: ['Pharmacy', 'Business', 'IT', 'Dentistry'], rank: '', tier: 'pathway' },
];

const WHY_REASONS = [
  {
    Icon: Globe,
    title: 'English-Medium, Multicultural',
    body: 'Malaysia uses English as the primary medium of instruction across most universities. With a large South Asian diaspora and culturally familiar food, religion, and lifestyle, Bangladeshi students typically adapt within weeks rather than months.',
    accent: '#4CC9F0',
  },
  {
    Icon: Award,
    title: 'Incredibly Affordable',
    body: 'Tuition runs RM 15,000–50,000/year (€3,000–10,000) — significantly cheaper than UK, Australia, or Canada. Monthly living costs in KL are €500–800. Malaysia consistently ranks as one of the most affordable study destinations for South Asian students.',
    accent: '#0096C7',
  },
  {
    Icon: TrendingUp,
    title: 'Franchise & Branch Campuses',
    body: 'Monash, Nottingham, Curtin, and Heriot-Watt all operate full campuses in Malaysia. You get a globally ranked degree at Malaysian tuition rates — and can even transfer to the main campus for your final year.',
    accent: '#4CC9F0',
  },
  {
    Icon: Shield,
    title: 'Safe, Easy Visa Process',
    body: 'Malaysia\'s student visa (eVISA/eMGS) is processed in 2–4 weeks. The country is politically stable, has excellent healthcare, and is consistently ranked safe for international students. halal food is universally available.',
    accent: '#0096C7',
  },
];

const TIMELINE = [
  { num: '01', title: 'Free Profile Evaluation', period: 'Anytime', desc: 'Wayout reviews your SSC/HSC results, budget, and IELTS/English scores. We shortlist the best Malaysian universities for your discipline and goals.', tag: 'Start Today' },
  { num: '02', title: 'Apply to Universities', period: '3–6 months before intake', desc: 'Malaysia has three main intakes: January/February, May/June, and September/October. Applications open year-round at most private universities. Public universities have earlier deadlines.', tag: 'Jan, May & Sep Intakes' },
  { num: '03', title: 'Receive Offer & Pay Deposit', period: '2–4 weeks after applying', desc: 'Accept your unconditional offer letter and pay the required deposit. The university then initiates your student visa (eMGS) application on your behalf.', tag: 'University Processes Visa' },
  { num: '04', title: 'Student Visa (eMGS)', period: '4–8 weeks processing', desc: 'Malaysia uses the eVISA/eMGS system — the university submits on your behalf. Documents: offer letter, deposit receipt, passport copy, and medical report from an approved clinic.', tag: 'Processing: 4–8 wks' },
  { num: '05', title: 'Arrive & Register', period: '1 week before semester', desc: 'Complete your health screening at an AKHDS clinic (mandatory), get your student pass sticker, open a Maybank or CIMB account, and get a local SIM (Maxis/Celcom). Orientation follows.', tag: 'Semester Start' },
];

const LIFE_FACTS = [
  { label: 'Monthly Living Cost', value: '€500–800', note: 'exc. tuition' },
  { label: 'Tuition Per Year', value: '€3,000–10,000', note: 'most programs' },
  { label: 'Part-time Work', value: '20 hrs/wk', note: 'on student pass' },
  { label: 'Halal Food', value: '100%', note: 'universally available' },
  { label: 'Climate', value: 'Tropical', note: '26–32°C year-round' },
  { label: 'Language', value: 'English', note: 'primary medium' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.55, ease: 'easeOut' as const, delay },
});

export default function MalaysiaPage() {
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
          style={{ background: 'linear-gradient(160deg, #051525 0%, #071e35 50%, #091e40 100%)' }}
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-20 left-1/4 w-[700px] h-[500px] rounded-full"
              style={{ background: 'radial-gradient(ellipse, rgba(76,201,240,0.18) 0%, transparent 65%)', filter: 'blur(40px)' }} />
            <div className="absolute top-10 right-1/4 w-[500px] h-[350px] rounded-full"
              style={{ background: 'radial-gradient(ellipse, rgba(0,150,199,0.14) 0%, transparent 65%)', filter: 'blur(60px)' }} />
            <div className="absolute inset-0"
              style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.45) 1px, transparent 1px)', backgroundSize: '48px 48px', opacity: 0.05 }} />
          </div>

          <div className="relative max-w-5xl mx-auto px-6 md:px-8 pt-32 pb-12 w-full">
            <motion.div {...fadeUp(0)} className="flex items-center gap-1.5 text-xs text-white/35 mb-8 font-medium">
              <Link to="/" className="hover:text-white/60 transition-colors duration-200">Home</Link>
              <ChevronRight size={12} />
              <span className="text-white/35">Destinations</span>
              <ChevronRight size={12} />
              <span style={{ color: '#4CC9F0' }}>Malaysia</span>
            </motion.div>

            <motion.div {...fadeUp(0.06)} className="mb-5">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
                style={{ background: 'rgba(76,201,240,0.15)', border: '1px solid rgba(76,201,240,0.35)', color: '#4CC9F0' }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#4CC9F0' }} />
                English-Medium · Halal-Friendly
              </span>
            </motion.div>

            <motion.h1 {...fadeUp(0.1)} className="font-display leading-[1.02] tracking-[-0.03em] text-white mb-5"
              style={{ fontSize: 'clamp(3rem,7vw,5.5rem)', fontWeight: 800 }}>
              Study in{' '}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(90deg, #4CC9F0 0%, #0096C7 60%, #90e0ef 100%)' }}>
                Malaysia
              </span>
              <span className="ml-3 text-4xl" role="img" aria-label="Malaysian flag">🇲🇾</span>
            </motion.h1>

            <motion.p {...fadeUp(0.16)} className="text-lg leading-relaxed max-w-2xl mb-10"
              style={{ color: 'rgba(255,255,255,0.58)' }}>
              English-medium universities, globally ranked franchise campuses, halal food everywhere, and tuition fees 60–80% cheaper than comparable Western programs. Malaysia is South Asia's smartest study move.
            </motion.p>

            <motion.div {...fadeUp(0.22)} className="flex flex-wrap gap-6 md:gap-10 mb-12">
              {[
                { value: '20+', label: 'Partner Universities' },
                { value: '€3k–10k', label: 'Tuition / Year' },
                { value: '3 / yr', label: 'Annual Intakes' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-display font-bold leading-none mb-1"
                    style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: 800, color: '#4CC9F0' }}>
                    {s.value}
                  </span>
                  <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.42)' }}>{s.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div {...fadeUp(0.28)} className="flex flex-wrap gap-3 mb-16">
              <a href="https://wa.me/358413272771?text=Hi%20Wayout!%20I%27d%20like%20to%20learn%20about%20studying%20in%20Malaysia."
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white px-7 py-3.5 rounded-full transition-all duration-200 active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg, #0096C7, #4CC9F0)', boxShadow: '0 0 32px rgba(76,201,240,0.40)' }}>
                Get Free Evaluation <ArrowRight size={15} />
              </a>
              <button onClick={() => document.getElementById('universities')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-200"
                style={{ border: '1px solid rgba(76,201,240,0.35)', color: '#4CC9F0', background: 'rgba(76,201,240,0.06)' }}>
                Explore Universities
              </button>
            </motion.div>
          </div>

          {/* KL Towers silhouette */}
          <div className="relative w-full" aria-hidden="true" style={{ height: '140px' }}>
            <svg viewBox="0 0 1440 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
              {/* Twin Petronas-style towers in the center */}
              <rect x="590" y="30" width="28" height="110" fill="#071e35" opacity="0.95" />
              <polygon points="590,30 604,5 618,30" fill="#071e35" opacity="0.95" />
              <rect x="590" y="68" width="60" height="8" rx="2" fill="#071e35" opacity="0.9" />
              <rect x="822" y="30" width="28" height="110" fill="#071e35" opacity="0.95" />
              <polygon points="822,30 836,5 850,30" fill="#071e35" opacity="0.95" />
              <rect x="790" y="68" width="60" height="8" rx="2" fill="#071e35" opacity="0.9" />
              {/* Background buildings */}
              <path d="M0 140 L0 100 L100 100 L100 80 L130 80 L130 60 L160 60 L160 80 L190 80 L190 100 L280 100 L280 70 L310 70 L310 45 L330 45 L330 70 L360 70 L360 100 L440 100 L440 75 L470 75 L470 50 L490 50 L490 75 L520 75 L520 100 L585 100 L585 30 L590 30 L618 30 L648 100 L645 100 L700 100 L700 75 L730 75 L730 55 L750 55 L750 75 L780 75 L780 100 L818 100 L818 30 L822 30 L850 30 L852 100 L900 100 L900 75 L930 75 L930 55 L955 55 L955 75 L985 75 L985 100 L1060 100 L1060 70 L1090 70 L1090 45 L1110 45 L1110 70 L1140 70 L1140 100 L1220 100 L1220 80 L1250 80 L1250 60 L1270 60 L1270 80 L1300 80 L1300 100 L1380 100 L1380 85 L1440 85 L1440 140 Z"
                fill="#071e35" opacity="0.85" />
              <rect x="0" y="132" width="1440" height="8" fill="#F4F6F9" />
            </svg>
          </div>
        </section>

        {/* WHY MALAYSIA */}
        <section className="bg-arctic py-20 md:py-28" aria-labelledby="why-my-heading">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-14">
              <motion.span {...fadeUp(0)} className="inline-block text-xs font-semibold uppercase tracking-widest text-teal mb-4">The Case for Malaysia</motion.span>
              <motion.h2 id="why-my-heading" {...fadeUp(0.06)} className="font-display text-charcoal tracking-tight mb-4"
                style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                Why Malaysia Works for You
              </motion.h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {WHY_REASONS.map((r, i) => {
                const Icon = r.Icon;
                return (
                  <motion.div key={r.title} {...fadeUp(i * 0.08)}
                    className="bg-white rounded-2xl p-7 border border-charcoal/6 shadow-[0_4px_24px_rgba(13,27,42,0.06)] hover:shadow-[0_8px_40px_rgba(13,27,42,0.10)] transition-all duration-300 hover:-translate-y-0.5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${r.accent}18` }}>
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
        <section id="universities" className="bg-white py-20 md:py-28 border-t border-charcoal/6" aria-labelledby="my-uni-heading">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-12">
              <motion.span {...fadeUp(0)} className="inline-block text-xs font-semibold uppercase tracking-widest text-teal mb-4">Full List</motion.span>
              <motion.h2 id="my-uni-heading" {...fadeUp(0.06)} className="font-display text-charcoal tracking-tight mb-4"
                style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                Malaysian Universities
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
                  className="bg-white rounded-2xl p-5 border border-charcoal/6 hover:border-cyan-200 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(76,201,240,0.10)] group">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                          style={{ background: 'rgba(76,201,240,0.12)', color: '#0096C7' }}>
                          {u.short}
                        </span>
                        {u.tier === 'flagship' && (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                            style={{ background: 'rgba(76,201,240,0.15)', color: '#4CC9F0', border: '1px solid rgba(76,201,240,0.3)' }}>
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
                    <p className="text-xs font-medium border-t border-charcoal/6 pt-3 mt-2" style={{ color: '#0096C7' }}>{u.rank}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="py-20 md:py-28" style={{ background: 'linear-gradient(160deg, #051525 0%, #091e40 100%)' }}>
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            <div className="text-center mb-14">
              <motion.span {...fadeUp(0)} className="inline-block text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#4CC9F0' }}>Step by Step</motion.span>
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
                  style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(76,201,240,0.15)' }}>
                  <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm text-white"
                    style={{ background: 'linear-gradient(135deg, #0096C7, #4CC9F0)' }}>
                    {i + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-display text-white font-bold text-base" style={{ fontWeight: 700 }}>{step.title}</h3>
                      <span className="text-xs font-semibold px-3 py-0.5 rounded-full"
                        style={{ background: 'rgba(76,201,240,0.15)', color: '#4CC9F0', border: '1px solid rgba(76,201,240,0.2)' }}>
                        {step.tag}
                      </span>
                    </div>
                    <p className="text-xs font-semibold mb-2" style={{ color: '#4CC9F0' }}>{step.period}</p>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.52)' }}>{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div {...fadeUp(0.2)} className="text-center mt-12">
              <a href="https://wa.me/358413272771?text=Hi%20Wayout!%20I%27d%20like%20help%20with%20my%20Malaysia%20application."
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white px-8 py-4 rounded-full transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, #0096C7, #4CC9F0)', boxShadow: '0 0 32px rgba(76,201,240,0.4)' }}>
                Start Your Malaysia Journey <ArrowRight size={15} />
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
                Life in Malaysia — Quick Facts
              </motion.h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 mb-10">
              {LIFE_FACTS.map((f, i) => (
                <motion.div key={f.label} {...fadeUp(i * 0.06)}
                  className="bg-white rounded-2xl p-6 border border-charcoal/6 text-center hover:border-cyan-200 transition-all duration-300">
                  <p className="font-display font-bold mb-1" style={{ fontSize: 'clamp(1.1rem,2.5vw,1.5rem)', fontWeight: 800, color: '#0096C7' }}>{f.value}</p>
                  <p className="text-charcoal font-semibold text-sm mb-1">{f.label}</p>
                  <p className="text-slate/55 text-xs">{f.note}</p>
                </motion.div>
              ))}
            </div>
            <motion.div {...fadeUp(0.2)} className="bg-white rounded-2xl p-6 md:p-8 border border-charcoal/6">
              <h3 className="font-display text-charcoal font-bold text-lg mb-5" style={{ fontWeight: 700 }}>Things Every Student Should Know</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Halal food is available everywhere — Bangladeshi restaurants are common in KL and Penang.',
                  'The MRT and LRT make getting around KL cheap and easy without a car.',
                  'Complete your health screening at an AKHDS clinic within 7 days of arrival.',
                  'Open a Maybank or CIMB account — both have student-friendly packages.',
                  'Get a Maxis or Celcom SIM — unlimited data plans start from RM 30/month.',
                  'Wayout connects you with a peer mentor in Malaysia before you arrive.',
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
        <section className="py-20 md:py-28" style={{ background: 'linear-gradient(135deg, #0077B6 0%, #0096C7 50%, #4CC9F0 100%)' }}>
          <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
            <motion.h2 {...fadeUp(0.06)} className="font-display text-white tracking-tight mb-4"
              style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Ready to Study in Malaysia?
            </motion.h2>
            <motion.p {...fadeUp(0.12)} className="text-base leading-relaxed max-w-xl mx-auto mb-10"
              style={{ color: 'rgba(255,255,255,0.80)' }}>
              World-class education, familiar culture, affordable costs. Get your free profile evaluation and find out which Malaysian university is the perfect fit for you.
            </motion.p>
            <motion.div {...fadeUp(0.18)} className="flex flex-wrap justify-center gap-4">
              <a href="https://wa.me/358413272771?text=Hi%20Wayout!%20I%27d%20like%20a%20free%20evaluation%20for%20Malaysia."
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold px-8 py-4 rounded-full transition-all duration-200"
                style={{ background: 'white', color: '#0096C7', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
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
