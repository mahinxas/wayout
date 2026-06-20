import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, MapPin, Shield, TrendingUp, Home, AlertTriangle,
  Search, Award, Clock, CheckCircle2, GraduationCap, Briefcase,
  Globe, Users, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CtaFooter from '../components/CtaFooter';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

// ── Data ────────────────────────────────────────────────────────────────────

const UAS_DATA = [
  { short: 'Haaga-Helia', name: 'Haaga-Helia University of Applied Sciences', city: 'Helsinki', programs: ['BBA', 'IT', 'Hotel & Tourism', 'HRM'], badge: 'Top Pick' },
  { short: 'Metropolia', name: 'Metropolia University of Applied Sciences', city: 'Helsinki', programs: ['Engineering', 'IT', 'BBA', 'Nursing'], badge: 'Largest UAS' },
  { short: 'TAMK', name: 'Tampere University of Applied Sciences', city: 'Tampere', programs: ['Engineering', 'BBA', 'ICT', 'Nursing'], badge: 'Top Pick' },
  { short: 'XAMK', name: 'South-Eastern Finland University of Applied Sciences', city: 'Kotka / Mikkeli', programs: ['Engineering', 'IT', 'Business'], badge: null },
  { short: 'LAB', name: 'LAB University of Applied Sciences', city: 'Lappeenranta', programs: ['BBA', 'IT', 'Design', 'Nursing'], badge: null },
  { short: 'JAMK', name: 'JAMK University of Applied Sciences', city: 'Jyväskylä', programs: ['BBA', 'IT', 'Logistics', 'Nursing'], badge: null },
  { short: 'Laurea', name: 'Laurea University of Applied Sciences', city: 'Vantaa', programs: ['BBA', 'Security Mgmt', 'Social Services'], badge: null },
  { short: 'OAMK', name: 'Oulu University of Applied Sciences', city: 'Oulu', programs: ['Engineering', 'IT', 'Nursing', 'Business'], badge: null },
  { short: 'SAMK', name: 'Satakunta University of Applied Sciences', city: 'Pori', programs: ['Engineering', 'BBA', 'Nursing'], badge: null },
  { short: 'Savonia', name: 'Savonia University of Applied Sciences', city: 'Kuopio', programs: ['Engineering', 'IT', 'Business', 'Health'], badge: null },
  { short: 'Turku UAS', name: 'Turku University of Applied Sciences', city: 'Turku', programs: ['BBA', 'Engineering', 'IT', 'Nursing'], badge: null },
  { short: 'Arcada', name: 'Arcada University of Applied Sciences', city: 'Helsinki', programs: ['Nursing', 'Business IT', 'Media'], badge: null },
  { short: 'Centria', name: 'Centria University of Applied Sciences', city: 'Kokkola', programs: ['Industrial Mgmt', "Int'l Business"], badge: null },
  { short: 'Diak', name: 'Diaconia University of Applied Sciences', city: 'Helsinki', programs: ['Nursing', 'Social Services'], badge: null },
  { short: 'Humak', name: 'Humak University of Applied Sciences', city: 'Helsinki', programs: ['Cultural Mgmt', 'NGO & Civil Society'], badge: null },
  { short: 'KAMK', name: 'Kajaani University of Applied Sciences', city: 'Kajaani', programs: ['Game Development', 'BBA', 'IT'], badge: null },
  { short: 'Karelia', name: 'Karelia University of Applied Sciences', city: 'Joensuu', programs: ["Int'l Business", 'IT'], badge: null },
  { short: 'Lapland UAS', name: 'Lapland University of Applied Sciences', city: 'Rovaniemi', programs: ['Tourism Management', 'Business'], badge: null },
  { short: 'SeAMK', name: 'Seinäjoki University of Applied Sciences', city: 'Seinäjoki', programs: ['BBA', 'IT', 'Nursing'], badge: null },
  { short: 'VAMK', name: 'Vaasa University of Applied Sciences', city: 'Vaasa', programs: ['Engineering', 'IT', 'BBA'], badge: null },
  { short: 'Novia', name: 'Novia University of Applied Sciences', city: 'Vaasa', programs: ['Swedish-taught (primarily)'], badge: 'Swedish' },
  { short: 'Åland UAS', name: 'Åland University of Applied Sciences', city: 'Mariehamn', programs: ['Swedish-taught (primarily)'], badge: 'Swedish' },
];

const RESEARCH_DATA = [
  { short: 'U of Helsinki', name: 'University of Helsinki', city: 'Helsinki', focus: ['All Disciplines', 'Medicine', 'Natural Sciences'], rank: 'QS Top 120 — Highest Ranked in Finland', tier: 'flagship' },
  { short: 'Aalto', name: 'Aalto University', city: 'Espoo', focus: ['Technology', 'Business', 'Arts & Design'], rank: 'QS Top 150', tier: 'flagship' },
  { short: 'LUT', name: 'LUT University', city: 'Lappeenranta', focus: ['Engineering', 'Green Technology', 'Business'], rank: 'Recommended for Bangladeshis', tier: 'recommended' },
  { short: 'Tampere U', name: 'Tampere University', city: 'Tampere', focus: ['Technology', 'Health Sciences', 'Social Sciences'], rank: '', tier: 'strong' },
  { short: 'U of Turku', name: 'University of Turku', city: 'Turku', focus: ['Medicine', 'Technology', 'Business'], rank: '', tier: 'strong' },
  { short: 'U of Oulu', name: 'University of Oulu', city: 'Oulu', focus: ['Technology', 'Medicine', 'Natural Sciences'], rank: '', tier: 'strong' },
  { short: 'JYU', name: 'University of Jyväskylä', city: 'Jyväskylä', focus: ['Education', 'IT', 'Business', 'Sport Science'], rank: '', tier: 'strong' },
  { short: 'UEF', name: 'University of Eastern Finland', city: 'Joensuu / Kuopio', focus: ['Natural Sciences', 'Health Sciences', 'Law'], rank: '', tier: 'strong' },
  { short: 'U of Vaasa', name: 'University of Vaasa', city: 'Vaasa', focus: ['Business', 'Technology', 'Administration'], rank: '', tier: 'strong' },
  { short: 'U of Lapland', name: 'University of Lapland', city: 'Rovaniemi', focus: ['Law', 'Social Work', 'Arctic Sciences'], rank: '', tier: 'specialized' },
  { short: 'Uniarts', name: 'University of the Arts Helsinki', city: 'Helsinki', focus: ['Fine Arts', 'Music', 'Theatre & Dance'], rank: 'Top-Ranked Global Arts School', tier: 'specialized' },
  { short: 'Hanken', name: 'Hanken School of Economics', city: 'Helsinki', focus: ['Economics', 'Business', 'Finance'], rank: 'Swedish-speaking university', tier: 'specialized' },
  { short: 'Åbo Akademi', name: 'Åbo Akademi University', city: 'Turku', focus: ['Natural Sciences', 'Business', 'Technology'], rank: 'Swedish-speaking university', tier: 'specialized' },
];

const WHY_REASONS = [
  {
    Icon: Shield,
    title: 'Clearest Residence Permit Process',
    body: "Finland's student permit via Enterfinland.fi is one of the most predictable in all of Schengen. Documents are published, timelines are fixed (4–8 weeks), and the rejection rate for genuine students is very low.",
    accent: '#00B4D8',
  },
  {
    Icon: Award,
    title: 'Low Tuition, World-Class Quality',
    body: "UAS programs cost €8,000–13,000/year — a fraction of UK, US, or Australian costs for equivalent quality. Top research universities offer fully-funded scholarships for outstanding Master's students.",
    accent: '#48CAE4',
  },
  {
    Icon: TrendingUp,
    title: 'Direct Path to Permanent Residency',
    body: '4 years of continuous legal residence makes you eligible to apply for Finnish Permanent Residency. From student to resident to citizen — Finland actively wants skilled graduates to stay.',
    accent: '#0096C7',
  },
  {
    Icon: Home,
    title: 'Safest, Happiest Country on Earth',
    body: 'Ranked #1 happiest country 7 consecutive years. Ultra-low crime, zero corruption, free world-class healthcare for residents, and a digitally advanced society that embraces international talent.',
    accent: '#00B4D8',
  },
];

const TIMELINE = [
  {
    num: '01',
    title: 'Free Profile Evaluation',
    period: 'Now – October',
    desc: 'Wayout assesses your academic background (SSC/HSC/Degree), IELTS/TOEFL scores, and budget. We shortlist 3–5 institutions that match your profile and goals — no guesswork.',
    tag: 'Start Today',
    tagColor: 'teal',
  },
  {
    num: '02',
    title: 'Apply via Studyinfo.fi',
    period: 'October – Jan 22',
    desc: "Submit applications through Finland's official national portal Studyinfo.fi. Most UAS programs share a joint application window. Deadline falls in the third week of January.",
    tag: 'Deadline: Jan 22',
    tagColor: 'orange',
  },
  {
    num: '03',
    title: 'Admission Decision',
    period: 'March – April',
    desc: 'Universities publish results through Studyinfo. Accept your offer and pay the first semester fee to confirm your place. Some UAS programs require an entrance exam — Wayout prepares you.',
    tag: 'Results: March',
    tagColor: 'blue',
  },
  {
    num: '04',
    title: 'Residence Permit Application',
    period: 'April – June',
    desc: 'Apply online at Enterfinland.fi. Required: admission letter, proof of funds (min. €6,720/year), valid passport, and health insurance. Finnish Immigration processes in 4–8 weeks.',
    tag: 'Processing: 4–8 wks',
    tagColor: 'teal',
  },
  {
    num: '05',
    title: 'Pre-Departure & Landing',
    period: 'July – August',
    desc: 'Arrange accommodation, buy a Finnish SIM, register at your local municipality (DVV / Maistraatti). Wayout connects you with a verified peer mentor from your university — someone who has already made the journey.',
    tag: 'Semester: September',
    tagColor: 'green',
  },
];

const LIFE_FACTS = [
  { label: 'Monthly Living Cost', value: '€700–900', note: 'exc. tuition' },
  { label: 'Part-time Work', value: '30 hrs/wk', note: 'during studies' },
  { label: 'Student Healthcare', value: '€35–70', note: 'per semester (FSHS)' },
  { label: 'Global Safety Rank', value: 'Top 3', note: 'Global Peace Index' },
  { label: 'Happiness Rank', value: '#1', note: '7 consecutive years' },
  { label: 'Post-Study Work', value: '2 years', note: 'after graduation' },
];

const POPULAR_COURSES = [
  { name: 'Information Technology', emoji: '💻', count: '120+ programs' },
  { name: 'Business & Management', emoji: '📊', count: '80+ programs' },
  { name: 'Engineering', emoji: '⚙️', count: '100+ programs' },
  { name: 'Nursing & Healthcare', emoji: '🏥', count: '60+ programs' },
  { name: 'Tourism & Hospitality', emoji: '✈️', count: '30+ programs' },
  { name: 'Social Services', emoji: '🤝', count: '25+ programs' },
];

const LIVING_COSTS = [
  { item: 'Student Accommodation', range: '€300–600', note: 'per month — shared or studio' },
  { item: 'Food & Groceries', range: '€150–250', note: 'per month' },
  { item: 'Public Transport', range: '€30–55', note: 'per month (student pass)' },
  { item: 'Phone & Internet', range: '€15–30', note: 'per month' },
  { item: 'Student Healthcare (FSHS)', range: '€35–70', note: 'per semester' },
  { item: 'Books & Supplies', range: '€20–50', note: 'per month' },
];

const SALARY_DATA = [
  { role: 'IT / Software Developer', range: '€2,800–5,500 / mo', note: 'entry to mid-level, after graduation' },
  { role: 'Registered Nurse', range: '€2,400–3,500 / mo', note: 'public sector standard rate' },
  { role: 'Business / Marketing', range: '€2,200–4,000 / mo', note: 'depends on company size' },
  { role: 'Mechanical Engineer', range: '€2,600–4,500 / mo', note: 'manufacturing and tech sectors' },
  { role: 'Restaurant / Hospitality', range: '€1,800–2,800 / mo', note: 'collective agreement rates' },
  { role: 'Social Services / Education', range: '€2,000–3,200 / mo', note: 'municipal sector' },
];

const FAQ_DATA = [
  {
    q: 'Do I need to speak Finnish to study in Finland?',
    a: 'No. Every UAS program Wayout recommends is taught entirely in English. You only need an IELTS score (typically 5.5–6.5) or equivalent. Finnish is not required at admission, though basic Finnish helps with daily life.',
  },
  {
    q: 'What is the minimum IELTS score required?',
    a: "Most UAS programs accept IELTS 5.5–6.0 for undergraduate entry. Some competitive programs (BBA at Haaga-Helia, IT at Metropolia) require 6.0–6.5. Wayout will tell you exactly what your target program needs before you book a test.",
  },
  {
    q: 'How much money do I need in my bank account for the visa?',
    a: 'Finnish Immigration (Migri) requires proof of €6,720 per year (€560/month × 12) for the first year of studies. This must be verifiable via an official bank statement — in your name or your sponsor\'s.',
  },
  {
    q: 'Can I work while studying in Finland?',
    a: 'Yes. As an international student you can work up to 30 hours per week during the semester and unlimited hours during official university holidays. Finland has a strong student job market — especially in IT, healthcare, and hospitality.',
  },
  {
    q: 'What happens after graduation?',
    a: 'After completing your degree, you can apply for a 2-year Post-Study Work permit (Type A residence permit), allowing you to work in any field. After 4 years of continuous legal residence, you become eligible for Permanent Residency.',
  },
  {
    q: "What's the visa rejection rate for Finnish student visas?",
    a: "Finland has one of the lower rejection rates in Schengen for genuine students with complete documentation. The most common causes are insufficient funds proof, incomplete documents, or applying to VET programs that secretly require Finnish. Wayout's preparation process is designed specifically to avoid all three.",
  },
];

// ── Component ────────────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.55, ease: 'easeOut' as const, delay },
});

export default function FinlandPage() {
  const [activeTab, setActiveTab] = useState<'uas' | 'research'>('uas');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleRouteClick = (tab: 'uas' | 'research') => {
    setActiveTab(tab);
    setSearchQuery('');
    setTimeout(() => {
      document.getElementById('universities')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const filteredUAS = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return UAS_DATA.filter(
      (u) =>
        !q ||
        u.short.toLowerCase().includes(q) ||
        u.name.toLowerCase().includes(q) ||
        u.city.toLowerCase().includes(q) ||
        u.programs.some((p) => p.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const filteredResearch = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return RESEARCH_DATA.filter(
      (u) =>
        !q ||
        u.short.toLowerCase().includes(q) ||
        u.name.toLowerCase().includes(q) ||
        u.city.toLowerCase().includes(q) ||
        u.focus.some((f) => f.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const displayed = activeTab === 'uas' ? filteredUAS : filteredResearch;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-arctic">
      <Navbar darkBg />
      <main>

        {/* ── HERO ── */}
        <section
          className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden"
        >
          {/* Photo background */}
          <img
            src="/images/finland/helsinki-cathedral.jpg"
            alt="Helsinki Cathedral and harbour"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center 40%' }}
          />
          {/* Dark overlay preserving readability */}
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{ background: 'linear-gradient(160deg, rgba(2,13,24,0.88) 0%, rgba(4,24,36,0.82) 50%, rgba(7,30,44,0.75) 100%)' }}
          />
          {/* Aurora glows on top of photo */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div
              className="absolute -top-20 left-1/4 w-[700px] h-[500px] rounded-full"
              style={{
                background: 'radial-gradient(ellipse, rgba(0,180,216,0.18) 0%, transparent 65%)',
                filter: 'blur(40px)',
              }}
            />
            <div
              className="absolute top-10 right-1/4 w-[500px] h-[350px] rounded-full"
              style={{
                background: 'radial-gradient(ellipse, rgba(72,202,228,0.10) 0%, transparent 65%)',
                filter: 'blur(60px)',
              }}
            />
          </div>

          {/* Content */}
          <div className="relative max-w-5xl mx-auto px-6 md:px-8 pt-32 pb-12 w-full">

            {/* Breadcrumb */}
            <motion.div
              {...fadeUp(0)}
              className="flex items-center gap-1.5 text-xs text-white/35 mb-8 font-medium"
            >
              <Link to="/" className="hover:text-white/60 transition-colors duration-200">Home</Link>
              <ChevronRight size={12} />
              <span className="text-white/35">Destinations</span>
              <ChevronRight size={12} />
              <span className="text-teal-light" style={{ color: '#48CAE4' }}>Finland</span>
            </motion.div>

            {/* Badge */}
            <motion.div {...fadeUp(0.06)} className="mb-5">
              <span
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
                style={{ background: 'rgba(0,180,216,0.18)', border: '1px solid rgba(0,180,216,0.35)', color: '#48CAE4' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" style={{ background: '#00B4D8' }} />
                Our Primary Hub
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.1)}
              className="font-display leading-[1.02] tracking-[-0.03em] text-white mb-5"
              style={{ fontSize: 'clamp(3rem,7vw,5.5rem)', fontWeight: 800 }}
            >
              Study in{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(90deg, #00B4D8 0%, #48CAE4 60%, #90e0ef 100%)' }}
              >
                Finland
              </span>
              <span className="ml-3 text-4xl" role="img" aria-label="Finnish flag">🇫🇮</span>
            </motion.h1>

            {/* Sub-copy */}
            <motion.p
              {...fadeUp(0.16)}
              className="text-lg leading-relaxed max-w-2xl mb-10"
              style={{ color: 'rgba(255,255,255,0.58)' }}
            >
              Europe's most transparent study destination. Clear residence permit process, world-class universities, tuition-friendly fees, and a direct pathway to Permanent Residency.
            </motion.p>

            {/* Stats row */}
            <motion.div
              {...fadeUp(0.22)}
              className="flex flex-wrap gap-6 md:gap-10 mb-12"
            >
              {[
                { value: '35', label: 'Institutions' },
                { value: '4–8 wks', label: 'Permit Processing' },
                { value: '4 years', label: 'PR Eligibility' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span
                    className="font-display font-bold leading-none mb-1"
                    style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: 800, color: '#00B4D8' }}
                  >
                    {s.value}
                  </span>
                  <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.42)' }}>{s.label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div {...fadeUp(0.28)} className="flex flex-wrap gap-3 mb-16">
              <a
                href="https://wa.me/358413272771?text=Hi%20Wayout!%20I%27d%20like%20to%20learn%20about%20studying%20in%20Finland."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white px-7 py-3.5 rounded-full transition-all duration-200 active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, #00B4D8, #0096C7)',
                  boxShadow: '0 0 32px rgba(0,180,216,0.45)',
                }}
              >
                Get Free Evaluation <ArrowRight size={15} />
              </a>
              <button
                onClick={() => document.getElementById('universities')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-200"
                style={{
                  border: '1px solid rgba(0,180,216,0.35)',
                  color: '#48CAE4',
                  background: 'rgba(0,180,216,0.06)',
                }}
              >
                Explore Universities
              </button>
            </motion.div>
          </div>

          {/* Forest silhouette */}
          <div className="relative w-full" aria-hidden="true" style={{ height: '160px' }}>
            <svg viewBox="0 0 1440 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
              <rect width="1440" height="160" fill="transparent" />
              <ellipse cx="720" cy="40" rx="900" ry="35" fill="#00B4D8" opacity="0.07" />
              {[60,130,200,290,370,460,540,630,720,810,900,980,1070,1150,1240,1320,1390].map((x, i) => (
                <g key={i} transform={`translate(${x},${95 + (i % 4) * 9})`}>
                  <rect x="-4" y="0" width="8" height="18" fill="#071e2c" />
                  <polygon points="0,-42 16,0 -16,0" fill="#071824" opacity="0.9" />
                  <polygon points="0,-60 13,-20 -13,-20" fill="#041420" opacity="0.95" />
                  <polygon points="0,-74 10,-38 -10,-38" fill="#020D18" />
                </g>
              ))}
              <rect x="0" y="145" width="1440" height="15" fill="#F4F6F9" />
            </svg>
          </div>
        </section>

        {/* ── WHY FINLAND ── */}
        <section className="bg-arctic py-20 md:py-28" aria-labelledby="why-heading">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-14">
              <motion.span {...fadeUp(0)} className="inline-block text-xs font-semibold uppercase tracking-widest text-teal mb-4">
                The Business Case
              </motion.span>
              <motion.h2
                id="why-heading"
                {...fadeUp(0.06)}
                className="font-display text-charcoal tracking-tight mb-4"
                style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}
              >
                Why Finland Works for You
              </motion.h2>
              <motion.p {...fadeUp(0.12)} className="text-slate text-base max-w-lg mx-auto leading-relaxed">
                Four reasons Finland has the highest conversion rate of any destination we work with for Bangladeshi students.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {WHY_REASONS.map((r, i) => {
                const Icon = r.Icon;
                return (
                  <motion.div
                    key={r.title}
                    {...fadeUp(i * 0.08)}
                    className="bg-white rounded-2xl p-7 border border-charcoal/6 shadow-[0_4px_24px_rgba(13,27,42,0.06)] hover:shadow-[0_8px_40px_rgba(13,27,42,0.10)] transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: `${r.accent}18` }}
                    >
                      <Icon size={22} style={{ color: r.accent }} aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-charcoal font-bold text-lg mb-3" style={{ fontWeight: 700 }}>
                      {r.title}
                    </h3>
                    <p className="text-slate text-sm leading-relaxed">{r.body}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CHOOSE YOUR ROUTE ── */}
        <section className="bg-white py-20 md:py-28 border-t border-charcoal/6" aria-labelledby="routes-heading">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-14">
              <motion.span {...fadeUp(0)} className="inline-block text-xs font-semibold uppercase tracking-widest text-teal mb-4">
                Two Paths
              </motion.span>
              <motion.h2
                id="routes-heading"
                {...fadeUp(0.06)}
                className="font-display text-charcoal tracking-tight mb-4"
                style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}
              >
                Which Route Is Right for You?
              </motion.h2>
              <motion.p {...fadeUp(0.12)} className="text-slate text-base max-w-lg mx-auto leading-relaxed">
                The Finnish system has two distinct university types. Knowing which one to target is the most important strategic decision you'll make.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* UAS Route */}
              <motion.div
                {...fadeUp(0.06)}
                className="relative rounded-3xl overflow-hidden border border-charcoal/8 hover:border-teal/30 transition-all duration-300 hover:shadow-[0_12px_48px_rgba(0,180,216,0.12)]"
                style={{ background: 'linear-gradient(145deg, #f0fbff 0%, #e8f8fe 60%, #f4fbff 100%)' }}
              >
                {/* Recommended badge */}
                <div className="absolute top-5 right-5">
                  <span className="text-xs font-bold bg-teal text-white px-3 py-1 rounded-full">
                    Recommended
                  </span>
                </div>

                <div className="p-8">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'rgba(0,180,216,0.12)' }}>
                    <GraduationCap size={26} className="text-teal" aria-hidden="true" />
                  </div>

                  <h3 className="font-display text-charcoal font-bold text-2xl mb-2" style={{ fontWeight: 800 }}>
                    UAS Bachelor's Route
                  </h3>
                  <p className="text-teal font-semibold text-sm mb-6">Universities of Applied Sciences (Ammattikorkeakoulu)</p>

                  <div className="space-y-3 mb-8">
                    {[
                      { icon: Users, text: 'Best for: High school graduates (HSC / A-Levels / 12th Grade)' },
                      { icon: Clock, text: 'Duration: 3.5 – 4 years' },
                      { icon: GraduationCap, text: 'Programs: BBA, Engineering, IT, Nursing, Social Services' },
                      { icon: Award, text: 'Tuition: €8,000 – 13,000 / year' },
                      { icon: Globe, text: 'Language: English (primary medium across all campuses)' },
                      { icon: Briefcase, text: 'Industry-focused, high employability after graduation' },
                    ].map(({ icon: Icon, text }, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Icon size={15} className="text-teal flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-slate text-sm leading-relaxed">{text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-teal/6 rounded-xl p-4 mb-8">
                    <p className="text-charcoal text-sm font-semibold mb-1">22 institutions available</p>
                    <p className="text-slate text-xs leading-relaxed">
                      This is your goldmine. Practical degrees, industry connections, and the fastest route from HSC graduate to Finnish work permit.
                    </p>
                  </div>

                  <button
                    onClick={() => handleRouteClick('uas')}
                    className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-white py-3.5 rounded-xl transition-all duration-200 active:scale-[0.98]"
                    style={{ background: 'linear-gradient(135deg, #00B4D8, #0096C7)', boxShadow: '0 0 24px rgba(0,180,216,0.35)' }}
                  >
                    Explore All 22 UAS Universities <ArrowRight size={15} />
                  </button>
                </div>
              </motion.div>

              {/* Master's Route */}
              <motion.div
                {...fadeUp(0.12)}
                className="relative rounded-3xl overflow-hidden border border-charcoal/8 hover:border-charcoal/20 transition-all duration-300 hover:shadow-[0_12px_48px_rgba(13,27,42,0.08)]"
                style={{ background: 'linear-gradient(145deg, #f8f9fb 0%, #f0f2f5 60%, #f8f9fb 100%)' }}
              >
                <div className="p-8">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'rgba(27,38,59,0.08)' }}>
                    <Award size={26} className="text-charcoal" aria-hidden="true" />
                  </div>

                  <h3 className="font-display text-charcoal font-bold text-2xl mb-2" style={{ fontWeight: 800 }}>
                    Research Master's Route
                  </h3>
                  <p className="text-slate font-semibold text-sm mb-6">Research Universities (Yliopisto)</p>

                  <div className="space-y-3 mb-8">
                    {[
                      { icon: Users, text: 'Best for: University graduates (BSc / BBA / BA)' },
                      { icon: Clock, text: 'Duration: 2 years' },
                      { icon: GraduationCap, text: 'Programs: Engineering, Technology, Business, Sciences' },
                      { icon: Award, text: 'Selectivity: High — limited international seats' },
                      { icon: Globe, text: 'Language: English (most programs at top universities)' },
                      { icon: Briefcase, text: 'Research-intensive, globally competitive credentials' },
                    ].map(({ icon: Icon, text }, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Icon size={15} style={{ color: '#5B6B7E' }} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-slate text-sm leading-relaxed">{text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl p-4 mb-8 border border-charcoal/8" style={{ background: 'rgba(27,38,59,0.04)' }}>
                    <p className="text-charcoal text-sm font-semibold mb-1">13 research universities available</p>
                    <p className="text-slate text-xs leading-relaxed">
                      Aalto, Helsinki, LUT — these are globally ranked institutions. Target this route if you have a strong first degree and are ready to compete.
                    </p>
                  </div>

                  <button
                    onClick={() => handleRouteClick('research')}
                    className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-charcoal py-3.5 rounded-xl border border-charcoal/20 hover:border-charcoal/40 transition-all duration-200 bg-white"
                  >
                    Explore All 13 Research Universities <ArrowRight size={15} />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── UNIVERSITY EXPLORER ── */}
        <section id="universities" className="bg-arctic py-20 md:py-28 border-t border-charcoal/6" aria-labelledby="uni-heading">
          <div className="max-w-7xl mx-auto px-6 md:px-8">

            <div className="text-center mb-12">
              <motion.span {...fadeUp(0)} className="inline-block text-xs font-semibold uppercase tracking-widest text-teal mb-4">
                Full Institution List
              </motion.span>
              <motion.h2
                id="uni-heading"
                {...fadeUp(0.06)}
                className="font-display text-charcoal tracking-tight mb-4"
                style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}
              >
                All Finnish Institutions
              </motion.h2>
            </div>

            {/* Tab + Search Bar */}
            <motion.div {...fadeUp(0.1)} className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between">
              {/* Tabs */}
              <div className="flex gap-1 p-1 rounded-xl bg-white border border-charcoal/8 shadow-sm">
                <button
                  onClick={() => { setActiveTab('uas'); setSearchQuery(''); }}
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    activeTab === 'uas'
                      ? 'bg-teal text-white shadow-sm'
                      : 'text-slate hover:text-charcoal'
                  }`}
                >
                  UAS (Bachelor's)
                  <span className={`ml-2 text-xs rounded-full px-2 py-0.5 ${activeTab === 'uas' ? 'bg-white/20 text-white' : 'bg-arctic text-slate/60'}`}>
                    22
                  </span>
                </button>
                <button
                  onClick={() => { setActiveTab('research'); setSearchQuery(''); }}
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    activeTab === 'research'
                      ? 'bg-charcoal text-white shadow-sm'
                      : 'text-slate hover:text-charcoal'
                  }`}
                >
                  Research (Master's)
                  <span className={`ml-2 text-xs rounded-full px-2 py-0.5 ${activeTab === 'research' ? 'bg-white/20 text-white' : 'bg-arctic text-slate/60'}`}>
                    13
                  </span>
                </button>
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-72">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate/40" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Search by name, city, or program..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl bg-white border border-charcoal/10 text-charcoal placeholder-slate/40 outline-none focus:ring-2 focus:ring-teal/30 transition-all duration-200"
                />
              </div>
            </motion.div>

            {/* Context banner for Research tab */}
            {activeTab === 'research' && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 px-5 py-3.5 rounded-xl border text-sm flex items-start gap-3"
                style={{ background: 'rgba(27,38,59,0.04)', borderColor: 'rgba(27,38,59,0.1)' }}
              >
                <Award size={16} className="text-charcoal/50 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-slate leading-relaxed">
                  Research universities primarily offer Master's and PhD programs for international students. Bachelor's admission is extremely limited and highly competitive. Best targeting strategy: apply after completing a strong first degree.
                </span>
              </motion.div>
            )}

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayed.length > 0 ? displayed.map((u, i) => {
                const isUAS = activeTab === 'uas';
                const uasU = u as typeof UAS_DATA[0];
                const resU = u as typeof RESEARCH_DATA[0];

                const badge = isUAS ? uasU.badge : (resU.tier === 'flagship' ? 'Flagship' : resU.tier === 'recommended' ? 'Recommended' : null);
                const badgeColor =
                  badge === 'Top Pick' || badge === 'Recommended' || badge === 'Flagship' ? '#00B4D8'
                  : badge === 'Largest UAS' ? '#0096C7'
                  : badge === 'Swedish' ? '#F4A261'
                  : null;

                return (
                  <motion.div
                    key={u.name}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.32) }}
                    className="bg-white rounded-2xl p-5 border border-charcoal/6 hover:border-teal/20 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,180,216,0.08)] group"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                            style={{
                              background: isUAS ? 'rgba(0,180,216,0.1)' : 'rgba(27,38,59,0.07)',
                              color: isUAS ? '#00B4D8' : '#1B263B',
                            }}
                          >
                            {u.short}
                          </span>
                          {badge && badgeColor && (
                            <span
                              className="text-xs font-semibold px-2 py-0.5 rounded-full"
                              style={{ background: `${badgeColor}18`, color: badgeColor, border: `1px solid ${badgeColor}30` }}
                            >
                              {badge}
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-charcoal font-bold text-sm leading-snug" style={{ fontWeight: 700 }}>
                          {u.name}
                        </h3>
                      </div>
                    </div>

                    {/* City */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <MapPin size={12} className="text-slate/40 flex-shrink-0" aria-hidden="true" />
                      <span className="text-xs text-slate/55">{u.city}</span>
                    </div>

                    {/* Programs / Focus */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {(isUAS ? uasU.programs : resU.focus).slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-full font-medium"
                          style={{ background: '#F4F6F9', color: '#5B6B7E' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Rank note for research */}
                    {!isUAS && resU.rank && (
                      <p className="text-xs text-teal font-medium border-t border-charcoal/6 pt-3 mt-2">
                        {resU.rank}
                      </p>
                    )}
                  </motion.div>
                );
              }) : (
                <div className="col-span-full text-center py-14 text-slate/50 text-sm">
                  No institutions match your search. Try a different keyword.
                </div>
              )}
            </div>

            {/* Result count */}
            {searchQuery && (
              <p className="text-xs text-slate/45 mt-5 text-center">
                Showing {displayed.length} result{displayed.length !== 1 ? 's' : ''} for "{searchQuery}"
              </p>
            )}
          </div>
        </section>

        {/* ── POPULAR COURSES ── */}
        <section className="bg-white py-16 md:py-24 border-t border-charcoal/6" aria-labelledby="courses-heading">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-12">
              <motion.span {...fadeUp(0)} className="inline-block text-xs font-semibold uppercase tracking-widest text-teal mb-4">
                What Students Study
              </motion.span>
              <motion.h2
                id="courses-heading"
                {...fadeUp(0.06)}
                className="font-display text-charcoal tracking-tight"
                style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}
              >
                Popular Courses in Finland
              </motion.h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {POPULAR_COURSES.map((course, i) => (
                <motion.div
                  key={course.name}
                  {...fadeUp(i * 0.07)}
                  className="bg-arctic rounded-2xl p-6 border border-charcoal/6 hover:border-teal/25 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,180,216,0.09)] text-center"
                >
                  <span className="text-3xl mb-3 block" role="img" aria-hidden="true">{course.emoji}</span>
                  <h3 className="font-display font-bold text-charcoal text-sm mb-1" style={{ fontWeight: 700 }}>
                    {course.name}
                  </h3>
                  <p className="text-xs text-teal font-semibold">{course.count}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── APPLICATION TIMELINE ── */}
        <section
          id="timeline"
          className="py-20 md:py-28"
          style={{ background: 'linear-gradient(160deg, #0D1B2A 0%, #1B263B 100%)' }}
          aria-labelledby="timeline-heading"
        >
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            <div className="text-center mb-14">
              <motion.span {...fadeUp(0)} className="inline-block text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#48CAE4' }}>
                Step by Step
              </motion.span>
              <motion.h2
                id="timeline-heading"
                {...fadeUp(0.06)}
                className="font-display text-white tracking-tight mb-4"
                style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}
              >
                The Application Roadmap
              </motion.h2>
              <motion.p {...fadeUp(0.12)} className="text-base max-w-lg mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.48)' }}>
                Every stage, every deadline — laid out clearly so you never miss a window.
              </motion.p>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div
                className="absolute left-[22px] md:left-1/2 top-4 bottom-4 w-px hidden sm:block"
                style={{ background: 'rgba(0,180,216,0.15)', transform: 'translateX(-50%)' }}
                aria-hidden="true"
              />

              <div className="flex flex-col gap-8">
                {TIMELINE.map((step, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <motion.div
                      key={step.num}
                      initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className={`relative flex items-start gap-6 md:gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    >
                      {/* Number circle */}
                      <div
                        className="flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2 w-11 h-11 rounded-full flex items-center justify-center z-10 font-display font-bold text-sm text-white"
                        style={{
                          background: 'linear-gradient(135deg, #00B4D8, #0096C7)',
                          boxShadow: '0 0 20px rgba(0,180,216,0.4)',
                        }}
                        aria-hidden="true"
                      >
                        {i + 1}
                      </div>

                      {/* Card */}
                      <div className={`flex-1 md:w-[44%] ${isLeft ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                        <div
                          className="rounded-2xl p-6 border transition-all duration-300"
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            borderColor: 'rgba(0,180,216,0.12)',
                          }}
                        >
                          <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                            <span
                              className="text-xs font-bold uppercase tracking-widest"
                              style={{ color: 'rgba(72,202,228,0.7)' }}
                            >
                              Step {step.num}
                            </span>
                            <span
                              className="text-xs font-semibold px-3 py-1 rounded-full"
                              style={{
                                background: 'rgba(0,180,216,0.15)',
                                color: '#48CAE4',
                                border: '1px solid rgba(0,180,216,0.2)',
                              }}
                            >
                              {step.tag}
                            </span>
                          </div>
                          <h3 className="font-display text-white font-bold text-lg mb-2" style={{ fontWeight: 700 }}>
                            {step.title}
                          </h3>
                          <p className="text-xs font-semibold mb-3" style={{ color: '#00B4D8' }}>
                            {step.period}
                          </p>
                          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.52)' }}>
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* CTA inside timeline */}
            <motion.div {...fadeUp(0.2)} className="text-center mt-14">
              <a
                href="https://wa.me/358413272771?text=Hi%20Wayout!%20I%27d%20like%20help%20with%20my%20Finland%20application."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white px-8 py-4 rounded-full transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #00B4D8, #0096C7)',
                  boxShadow: '0 0 32px rgba(0,180,216,0.4)',
                }}
              >
                Start Step 1 — Free Profile Evaluation <ArrowRight size={15} />
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── LIFE IN FINLAND ── */}
        <section className="bg-arctic py-20 md:py-28 border-t border-charcoal/6" aria-labelledby="life-heading">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-12">
              <motion.span {...fadeUp(0)} className="inline-block text-xs font-semibold uppercase tracking-widest text-teal mb-4">
                On the Ground
              </motion.span>
              <motion.h2
                id="life-heading"
                {...fadeUp(0.06)}
                className="font-display text-charcoal tracking-tight"
                style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}
              >
                Life in Finland — Quick Facts
              </motion.h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 mb-10">
              {LIFE_FACTS.map((f, i) => (
                <motion.div
                  key={f.label}
                  {...fadeUp(i * 0.06)}
                  className="bg-white rounded-2xl p-6 border border-charcoal/6 text-center hover:border-teal/20 transition-all duration-300"
                >
                  <p
                    className="font-display font-bold mb-1"
                    style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, color: '#00B4D8' }}
                  >
                    {f.value}
                  </p>
                  <p className="text-charcoal font-semibold text-sm mb-1">{f.label}</p>
                  <p className="text-slate/55 text-xs">{f.note}</p>
                </motion.div>
              ))}
            </div>

            {/* Key reminders */}
            <motion.div {...fadeUp(0.2)} className="bg-white rounded-2xl p-6 md:p-8 border border-charcoal/6">
              <h3 className="font-display text-charcoal font-bold text-lg mb-5" style={{ fontWeight: 700 }}>
                Things Every Student Should Know
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'No Finnish language required for English-taught programs.',
                  'Finland gets up to -25°C in winter — proper gear is essential.',
                  'Open a Finnish bank account (Nordea/OP) as soon as you register.',
                  'Register your address at DVV within 7 days of arrival.',
                  "Student union (SYL/SAMOK) membership gives you discounts on nearly everything.",
                  'The Finnish Tax Authority (Vero) will want to know about you — stay compliant.',
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

        {/* ── COST OF EDUCATION ── */}
        <section className="bg-white py-20 md:py-28 border-t border-charcoal/6" aria-labelledby="costs-heading">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-14">
              <motion.span {...fadeUp(0)} className="inline-block text-xs font-semibold uppercase tracking-widest text-teal mb-4">
                Full Transparency
              </motion.span>
              <motion.h2
                id="costs-heading"
                {...fadeUp(0.06)}
                className="font-display text-charcoal tracking-tight mb-4"
                style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}
              >
                Cost of Education in Finland
              </motion.h2>
              <motion.p {...fadeUp(0.12)} className="text-slate text-base max-w-lg mx-auto leading-relaxed">
                No surprises. Every number you need before you decide.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Tuition fees */}
              <motion.div {...fadeUp(0.06)} className="bg-arctic rounded-2xl p-7 border border-charcoal/6">
                <h3 className="font-display font-bold text-charcoal text-lg mb-5" style={{ fontWeight: 700 }}>University Fees</h3>
                <div className="space-y-4">
                  {[
                    { label: "UAS Bachelor's Degree", value: '€8,000–13,000 / yr', note: 'English programs; paid per semester' },
                    { label: 'Research University BSc / MSc', value: '€8,000–18,000 / yr', note: 'Varies by institution and program' },
                    { label: 'Scholarship (Research Uni)', value: 'Up to 100% waiver', note: 'Merit-based; competitive but real' },
                    { label: 'Application Fee', value: '€0–100', note: 'Most UAS programs free via Studyinfo.fi' },
                  ].map(({ label, value, note }) => (
                    <div key={label} className="flex items-start justify-between gap-3 pb-4 border-b border-charcoal/6 last:border-0 last:pb-0">
                      <div>
                        <p className="font-semibold text-charcoal text-sm">{label}</p>
                        <p className="text-xs text-slate/55 mt-0.5">{note}</p>
                      </div>
                      <span className="font-display font-bold text-teal text-sm whitespace-nowrap">{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Living expenses */}
              <motion.div {...fadeUp(0.10)} className="bg-arctic rounded-2xl p-7 border border-charcoal/6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-display font-bold text-charcoal text-lg" style={{ fontWeight: 700 }}>Monthly Living Expenses</h3>
                  <span className="text-xs font-semibold text-teal bg-teal/8 px-3 py-1 rounded-full">Helsinki estimate</span>
                </div>
                <div className="space-y-1">
                  {LIVING_COSTS.map(({ item, range, note }) => (
                    <div key={item} className="flex items-center justify-between gap-3 py-2.5 border-b border-charcoal/5 last:border-0">
                      <div>
                        <p className="text-sm text-charcoal font-medium">{item}</p>
                        <p className="text-xs text-slate/50">{note}</p>
                      </div>
                      <span className="font-semibold text-charcoal text-sm whitespace-nowrap">{range}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-4 border-t-2 border-teal/20 mt-2">
                    <span className="font-display font-bold text-charcoal">Total / Month</span>
                    <span className="font-display font-bold text-teal text-lg">€550–1,000</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.p {...fadeUp(0.18)} className="text-center text-xs text-slate/50 mt-6 max-w-lg mx-auto">
              Helsinki and Espoo are the most expensive cities. Tampere, Oulu, and Jyväskylä are typically 15–25% cheaper.
            </motion.p>
          </div>
        </section>

        {/* ── WORK & CAREER ── */}
        <section className="bg-arctic py-20 md:py-28 border-t border-charcoal/6" aria-labelledby="career-heading">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-14">
              <motion.span {...fadeUp(0)} className="inline-block text-xs font-semibold uppercase tracking-widest text-teal mb-4">
                Financial Sustainability
              </motion.span>
              <motion.h2
                id="career-heading"
                {...fadeUp(0.06)}
                className="font-display text-charcoal tracking-tight mb-4"
                style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}
              >
                Work While You Study
              </motion.h2>
              <motion.p {...fadeUp(0.12)} className="text-slate text-base max-w-lg mx-auto leading-relaxed">
                Finland gives students real working rights — enough to meaningfully offset living costs.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              {[
                { value: '30 hrs', label: 'per week during semester', note: 'EU standard, widely respected' },
                { value: 'Unlimited', label: 'during official holidays', note: 'Summer, Christmas, and semester breaks' },
                { value: '€13–15', label: 'typical student hourly wage', note: 'Net of taxes for part-time roles' },
              ].map((s, i) => (
                <motion.div key={s.label} {...fadeUp(i * 0.08)} className="bg-white rounded-2xl p-7 border border-charcoal/6 text-center">
                  <p className="font-display font-bold text-teal mb-1" style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: 800 }}>{s.value}</p>
                  <p className="font-semibold text-charcoal text-sm mb-1">{s.label}</p>
                  <p className="text-xs text-slate/50">{s.note}</p>
                </motion.div>
              ))}
            </div>

            <motion.div {...fadeUp(0.14)} className="bg-white rounded-2xl border border-charcoal/6 overflow-hidden max-w-3xl mx-auto">
              <div className="px-6 py-5 border-b border-charcoal/6">
                <h3 className="font-display font-bold text-charcoal text-lg" style={{ fontWeight: 700 }}>Graduate Salary Ranges in Finland</h3>
                <p className="text-xs text-slate/55 mt-1">After degree completion — not student wages</p>
              </div>
              <div className="divide-y divide-charcoal/5">
                {SALARY_DATA.map(({ role, range, note }, i) => (
                  <motion.div
                    key={role}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="flex items-center justify-between gap-4 px-6 py-4"
                  >
                    <div>
                      <p className="font-semibold text-charcoal text-sm">{role}</p>
                      <p className="text-xs text-slate/50">{note}</p>
                    </div>
                    <span className="font-display font-bold text-teal text-sm whitespace-nowrap">{range}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-white py-20 md:py-28 border-t border-charcoal/6" aria-labelledby="faq-heading">
          <div className="max-w-3xl mx-auto px-6 md:px-8">
            <div className="text-center mb-12">
              <motion.span {...fadeUp(0)} className="inline-block text-xs font-semibold uppercase tracking-widest text-teal mb-4">
                Common Questions
              </motion.span>
              <motion.h2
                id="faq-heading"
                {...fadeUp(0.06)}
                className="font-display text-charcoal tracking-tight"
                style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}
              >
                Frequently Asked Questions
              </motion.h2>
            </div>
            <div className="flex flex-col gap-3">
              {FAQ_DATA.map(({ q, a }, i) => (
                <motion.div key={i} {...fadeUp(i * 0.05)} className="bg-arctic rounded-2xl border border-charcoal/6 overflow-hidden">
                  <button
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-charcoal/2 transition-colors duration-200"
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    aria-expanded={activeFaq === i}
                  >
                    <span className="font-semibold text-charcoal text-sm leading-snug">{q}</span>
                    <ChevronRight
                      size={16}
                      className="text-teal flex-shrink-0 transition-transform duration-200"
                      style={{ transform: activeFaq === i ? 'rotate(90deg)' : 'rotate(0deg)' }}
                      aria-hidden="true"
                    />
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm text-slate leading-relaxed border-t border-charcoal/5 pt-4">
                          {a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VET WARNING ── */}
        <section className="bg-white py-12 md:py-16 border-t border-charcoal/6">
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <motion.div
              {...fadeUp(0)}
              className="rounded-2xl p-7 md:p-8 border"
              style={{
                background: 'linear-gradient(135deg, #fffbf0 0%, #fff8e6 100%)',
                borderColor: 'rgba(244,162,97,0.4)',
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(244,162,97,0.15)' }}
                  aria-hidden="true"
                >
                  <AlertTriangle size={22} style={{ color: '#e08a38' }} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg mb-2" style={{ fontWeight: 700, color: '#7a4a10' }}>
                    A Candid Word About Vocational Schools (VET)
                  </h3>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: '#5a3a0a' }}>
                    Institutions like <strong>Riveria, Vamia, Omnia, and Salpaus</strong> offer vocational programs that appear appealing because tuition is often free. However, virtually all of these programs require a minimum of <strong>B1.1 Finnish Language Proficiency</strong> before admission.
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: '#5a3a0a' }}>
                    Many agencies in South Asia market this route without disclosing the language requirement. The result: visa rejections, wasted application fees, and frustrated students. <strong>Wayout does not recommend this route</strong> unless you are already pursuing structured Finnish language training. Focus on UAS Bachelor's or Research Master's routes for the highest success rate.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section
          className="py-20 md:py-28"
          style={{ background: 'linear-gradient(135deg, #0096C7 0%, #00B4D8 50%, #48CAE4 100%)' }}
          aria-labelledby="cta-heading"
        >
          <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
            <motion.span {...fadeUp(0)} className="inline-block text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Ready to Begin?
            </motion.span>
            <motion.h2
              id="cta-heading"
              {...fadeUp(0.06)}
              className="font-display text-white tracking-tight mb-4"
              style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, letterSpacing: '-0.02em' }}
            >
              Your Finnish Journey Starts with One Conversation
            </motion.h2>
            <motion.p
              {...fadeUp(0.12)}
              className="text-base leading-relaxed max-w-xl mx-auto mb-10"
              style={{ color: 'rgba(255,255,255,0.72)' }}
            >
              Get a free profile evaluation from a Wayout advisor who has already studied in Finland. No pressure. No hidden fees. Just honest guidance on your best route.
            </motion.p>
            <motion.div {...fadeUp(0.18)} className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/358413272771?text=Hi%20Wayout!%20I%27d%20like%20a%20free%20profile%20evaluation%20for%20Finland."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold px-8 py-4 rounded-full transition-all duration-200 active:scale-[0.98]"
                style={{
                  background: 'white',
                  color: '#0096C7',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Chat on WhatsApp
              </a>
              <Link
                to="/apply"
                className="inline-flex items-center gap-2 text-sm font-bold px-8 py-4 rounded-full transition-all duration-200"
                style={{
                  border: '2px solid rgba(255,255,255,0.5)',
                  color: 'white',
                }}
              >
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
