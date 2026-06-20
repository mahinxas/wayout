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
  { short: 'THU', name: 'Tsinghua University', city: 'Beijing', programs: ['Engineering', 'Architecture', 'Economics', 'Science'], rank: 'QS Top 25 globally', tier: 'flagship' },
  { short: 'PKU', name: 'Peking University', city: 'Beijing', programs: ['Medicine', 'Law', 'Humanities', 'Science'], rank: 'QS Top 20 globally', tier: 'flagship' },
  { short: 'SJTU', name: 'Shanghai Jiao Tong University', city: 'Shanghai', programs: ['Engineering', 'Medicine', 'Business', 'Science'], rank: 'QS Top 50 globally', tier: 'flagship' },
  { short: 'Fudan', name: 'Fudan University', city: 'Shanghai', programs: ['Medicine', 'Law', 'Business', 'Journalism'], rank: 'QS Top 50 globally', tier: 'flagship' },
  { short: 'ZJU', name: 'Zhejiang University', city: 'Hangzhou', programs: ['Engineering', 'Agriculture', 'Medicine', 'IT'], rank: 'QS Top 50 globally', tier: 'flagship' },
  { short: 'USTC', name: 'University of Science and Technology of China', city: 'Hefei', programs: ['Physics', 'Chemistry', 'Engineering', 'CS'], rank: 'QS Top 100 globally', tier: 'flagship' },
  { short: 'NJU', name: 'Nanjing University', city: 'Nanjing', programs: ['Science', 'Humanities', 'Business', 'Law'], rank: 'QS Top 150 globally', tier: 'flagship' },
  { short: 'WHU', name: 'Wuhan University', city: 'Wuhan', programs: ['Law', 'Engineering', 'Information Mgmt', 'Remote Sensing'], rank: 'QS Top 250 globally', tier: 'strong' },
  { short: 'SYSU', name: 'Sun Yat-sen University', city: 'Guangzhou', programs: ['Medicine', 'Business', 'Law', 'Engineering'], rank: 'QS Top 300 globally', tier: 'strong' },
  { short: 'XJTU', name: "Xi'an Jiaotong University", city: "Xi'an", programs: ['Medicine', 'Engineering', 'Economics', 'Science'], rank: 'C9 League member', tier: 'strong' },
  { short: 'HIT', name: 'Harbin Institute of Technology', city: 'Harbin', programs: ['Aerospace', 'Engineering', 'IT', 'Management'], rank: 'C9 League member', tier: 'strong' },
  { short: 'BUAA', name: 'Beihang University', city: 'Beijing', programs: ['Aerospace', 'Astronautics', 'Engineering', 'IT'], rank: 'Top for Aerospace', tier: 'strong' },
  { short: 'HUST', name: 'Huazhong University of Science and Technology', city: 'Wuhan', programs: ['Engineering', 'Medicine', 'Business', 'Architecture'], rank: '', tier: 'strong' },
  { short: 'SEU', name: 'Southeast University', city: 'Nanjing', programs: ['Architecture', 'Engineering', 'IT', 'Economics'], rank: '', tier: 'strong' },
  { short: 'DUT', name: 'Dalian University of Technology', city: 'Dalian', programs: ['Engineering', 'IT', 'Business', 'Architecture'], rank: 'Strong CSC Scholarship Programs', tier: 'strong' },
  { short: 'CQUPT', name: 'Chongqing University of Posts and Telecomm.', city: 'Chongqing', programs: ['IT', 'Telecom', 'Business', 'Engineering'], rank: 'Affordable with scholarships', tier: 'pathway' },
  { short: 'SWJTU', name: 'Southwest Jiaotong University', city: 'Chengdu', programs: ['Rail Engineering', 'IT', 'Business', 'Architecture'], rank: '', tier: 'strong' },
];

const SCHOLARSHIPS = [
  { name: 'Chinese Government Scholarship (CSC)', coverage: 'Full tuition + stipend + accommodation', eligible: "All levels (Bachelor's, Master's, PhD)", link: 'csc.edu.cn' },
  { name: 'Provincial Government Scholarships', coverage: 'Partial tuition or living allowance', eligible: 'Varies by province', link: 'Various provincial portals' },
  { name: 'University-Specific Scholarships', coverage: 'Partial to full tuition waiver', eligible: 'Varies by GPA and field', link: 'Each university portal' },
  { name: 'Confucius Institute Scholarship', coverage: 'Language studies (1 year)', eligible: 'Language learners', link: 'hanban.org' },
];

const WHY_REASONS = [
  {
    Icon: Award,
    title: 'World-Ranked Universities & Full Scholarships',
    body: 'China has 6 universities in the global QS Top 50. More importantly, the Chinese Government Scholarship (CSC) covers full tuition, dormitory, and a monthly stipend — making a world-class education essentially free for qualifying students.',
    accent: '#E63946',
  },
  {
    Icon: Globe,
    title: 'English-Taught Programs Available',
    body: 'Most top Chinese universities offer bachelor\'s and master\'s programs fully in English, particularly in Engineering, Business, Medicine, and IT. No Mandarin required for admission — though learning basic Mandarin accelerates your career in Asia.',
    accent: '#D62828',
  },
  {
    Icon: TrendingUp,
    title: 'Global Career Edge',
    body: 'A degree from Tsinghua, Fudan, or SJTU is recognised by employers across Asia, Europe, and North America. China\'s growing global economic footprint means graduates with China experience are increasingly sought-after by international firms.',
    accent: '#E63946',
  },
  {
    Icon: Shield,
    title: 'Safe & Well-Connected',
    body: 'China has one of the lowest crime rates in Asia. Ultra-fast internet (in campus networks), an efficient high-speed rail network, and a large Bangladeshi student community in major cities make daily life manageable and social life vibrant.',
    accent: '#D62828',
  },
];

const TIMELINE = [
  { num: '01', title: 'Free Profile Evaluation', period: 'Anytime', desc: 'Wayout reviews your academic profile and identifies whether you qualify for CSC scholarships or university scholarships. We shortlist the best universities for your discipline and scholarship eligibility.', tag: 'Start Today' },
  { num: '02', title: 'Apply for Scholarships & Universities', period: 'Jan – March (for Sep intake)', desc: 'CSC applications open in January and close in March–April. University applications run alongside. Wayout prepares your entire document package: SOP, research proposal, recommendation letters, and transcripts.', tag: 'CSC Deadline: March–April' },
  { num: '03', title: 'Admission & Scholarship Result', period: 'May – July', desc: 'Universities release admission decisions. CSC scholarship results come from the Chinese Embassy. Upon acceptance, you receive your JW201/JW202 form — the key document for your student visa.', tag: 'Results: May–Jul' },
  { num: '04', title: 'Student Visa (X1/X2)', period: '4–10 days processing', desc: 'Apply at the Chinese Embassy in Dhaka. X1 visa (study >180 days) requires: JW202/201 form, admission letter, physical examination form, and valid passport. Processing is typically very fast.', tag: 'Processing: 4–10 days' },
  { num: '05', title: 'Arrive & Register', period: '1–2 weeks before semester', desc: 'Complete a physical health examination at a designated hospital (required within 30 days). Register at the local Public Security Bureau (PSB) within 24 hours of arrival. Orientation and campus registration follow.', tag: 'Semester: September' },
];

const LIFE_FACTS = [
  { label: 'Monthly Living Cost', value: '€350–600', note: 'exc. tuition' },
  { label: 'CSC Scholarship', value: 'Full Cover', note: 'tuition + stipend + dorm' },
  { label: 'Internet Speed', value: 'Campus VPN', note: 'provided by university' },
  { label: 'Halal Food', value: 'Available', note: 'in major cities' },
  { label: 'High-Speed Rail', value: '40,000 km', note: 'largest network globally' },
  { label: 'Visa Processing', value: '4–10 days', note: 'fastest in our network' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.55, ease: 'easeOut' as const, delay },
});

export default function ChinaPage() {
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
          style={{ background: 'linear-gradient(160deg, #1a0404 0%, #2d0808 50%, #3d1010 100%)' }}
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-20 left-1/4 w-[700px] h-[500px] rounded-full"
              style={{ background: 'radial-gradient(ellipse, rgba(230,57,70,0.20) 0%, transparent 65%)', filter: 'blur(40px)' }} />
            <div className="absolute top-10 right-1/4 w-[500px] h-[350px] rounded-full"
              style={{ background: 'radial-gradient(ellipse, rgba(214,40,40,0.14) 0%, transparent 65%)', filter: 'blur(60px)' }} />
            <div className="absolute inset-0"
              style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.45) 1px, transparent 1px)', backgroundSize: '48px 48px', opacity: 0.05 }} />
          </div>

          <div className="relative max-w-5xl mx-auto px-6 md:px-8 pt-32 pb-12 w-full">
            <motion.div {...fadeUp(0)} className="flex items-center gap-1.5 text-xs text-white/35 mb-8 font-medium">
              <Link to="/" className="hover:text-white/60 transition-colors duration-200">Home</Link>
              <ChevronRight size={12} />
              <span className="text-white/35">Destinations</span>
              <ChevronRight size={12} />
              <span style={{ color: '#E63946' }}>China</span>
            </motion.div>

            <motion.div {...fadeUp(0.06)} className="mb-5">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
                style={{ background: 'rgba(230,57,70,0.15)', border: '1px solid rgba(230,57,70,0.35)', color: '#E63946' }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#E63946' }} />
                Full Scholarships Available
              </span>
            </motion.div>

            <motion.h1 {...fadeUp(0.1)} className="font-display leading-[1.02] tracking-[-0.03em] text-white mb-5"
              style={{ fontSize: 'clamp(3rem,7vw,5.5rem)', fontWeight: 800 }}>
              Study in{' '}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(90deg, #E63946 0%, #D62828 50%, #ff6b6b 100%)' }}>
                China
              </span>
              <span className="ml-3 text-4xl" role="img" aria-label="Chinese flag">🇨🇳</span>
            </motion.h1>

            <motion.p {...fadeUp(0.16)} className="text-lg leading-relaxed max-w-2xl mb-10"
              style={{ color: 'rgba(255,255,255,0.58)' }}>
              QS Top-50 universities, full government scholarships, and a global career edge. China offers the most generous scholarship programs of any destination we work with — and the world rankings to back it up.
            </motion.p>

            <motion.div {...fadeUp(0.22)} className="flex flex-wrap gap-6 md:gap-10 mb-12">
              {[
                { value: '6', label: 'QS Top-50 Unis' },
                { value: 'Full', label: 'CSC Scholarships' },
                { value: '4–10 days', label: 'Visa Processing' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-display font-bold leading-none mb-1"
                    style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: 800, color: '#E63946' }}>
                    {s.value}
                  </span>
                  <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.42)' }}>{s.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div {...fadeUp(0.28)} className="flex flex-wrap gap-3 mb-16">
              <a href="https://wa.me/358413272771?text=Hi%20Wayout!%20I%27d%20like%20to%20learn%20about%20studying%20in%20China."
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white px-7 py-3.5 rounded-full transition-all duration-200 active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg, #D62828, #E63946)', boxShadow: '0 0 32px rgba(230,57,70,0.45)' }}>
                Get Free Evaluation <ArrowRight size={15} />
              </a>
              <button onClick={() => document.getElementById('universities')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-200"
                style={{ border: '1px solid rgba(230,57,70,0.35)', color: '#E63946', background: 'rgba(230,57,70,0.06)' }}>
                Explore Universities
              </button>
            </motion.div>
          </div>

          {/* Great Wall silhouette */}
          <div className="relative w-full" aria-hidden="true" style={{ height: '140px' }}>
            <svg viewBox="0 0 1440 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
              <path d="M0 140 L0 95 L30 95 L30 80 L40 80 L40 70 L50 70 L50 80 L60 80 L60 95 L90 95 L90 80 L100 80 L100 65 L110 65 L110 80 L120 80 L120 95 L150 95 L150 80 L160 80 L160 70 L170 70 L170 80 L180 80 L180 95 L210 95 L210 80 L220 80 L220 65 L230 65 L230 80 L240 80 L240 95 L270 95 L270 75 Q300 60 330 70 L330 95 L360 95 L360 80 L370 80 L370 65 L380 65 L380 80 L390 80 L390 95 L420 95 L420 80 L430 80 L430 70 L440 70 L440 80 L450 80 L450 95 L480 95 L480 80 L490 80 L490 65 L500 65 L500 80 L510 80 L510 95 L540 95 L540 75 Q560 60 580 68 L580 95 L610 95 L610 80 L620 80 L620 65 L630 65 L630 80 L640 80 L640 95 L670 95 L670 80 L680 80 L680 70 L690 70 L690 80 L700 80 L700 95 L730 95 L730 80 L740 80 L740 65 L750 65 L750 80 L760 80 L760 95 L790 95 L790 80 L800 80 L800 70 L810 70 L810 80 L820 80 L820 95 L850 95 L850 75 Q880 58 910 70 L910 95 L940 95 L940 80 L950 80 L950 65 L960 65 L960 80 L970 80 L970 95 L1000 95 L1000 80 L1010 80 L1010 70 L1020 70 L1020 80 L1030 80 L1030 95 L1060 95 L1060 80 L1070 80 L1070 65 L1080 65 L1080 80 L1090 80 L1090 95 L1120 95 L1120 75 Q1150 60 1180 72 L1180 95 L1210 95 L1210 80 L1220 80 L1220 70 L1230 70 L1230 80 L1240 80 L1240 95 L1270 95 L1270 80 L1280 80 L1280 65 L1290 65 L1290 80 L1300 80 L1300 95 L1330 95 L1330 80 L1340 80 L1340 70 L1350 70 L1350 80 L1360 80 L1360 95 L1440 95 L1440 140 Z"
                fill="#2d0808" opacity="0.95" />
              <rect x="0" y="132" width="1440" height="8" fill="#F4F6F9" />
            </svg>
          </div>
        </section>

        {/* WHY CHINA */}
        <section className="bg-arctic py-20 md:py-28" aria-labelledby="why-cn-heading">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-14">
              <motion.span {...fadeUp(0)} className="inline-block text-xs font-semibold uppercase tracking-widest text-teal mb-4">The Case for China</motion.span>
              <motion.h2 id="why-cn-heading" {...fadeUp(0.06)} className="font-display text-charcoal tracking-tight mb-4"
                style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                Why China Works for You
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

        {/* SCHOLARSHIPS */}
        <section className="bg-white py-16 md:py-20 border-t border-charcoal/6">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-10">
              <motion.span {...fadeUp(0)} className="inline-block text-xs font-semibold uppercase tracking-widest text-teal mb-4">Funding Your Degree</motion.span>
              <motion.h2 {...fadeUp(0.06)} className="font-display text-charcoal tracking-tight mb-4"
                style={{ fontSize: 'clamp(1.8rem,4vw,2.5rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                Available Scholarships
              </motion.h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SCHOLARSHIPS.map((s, i) => (
                <motion.div key={s.name} {...fadeUp(i * 0.08)}
                  className="bg-arctic rounded-2xl p-6 border border-charcoal/6 hover:border-red-200 transition-all duration-300">
                  <h3 className="font-display text-charcoal font-bold text-base mb-2" style={{ fontWeight: 700 }}>{s.name}</h3>
                  <p className="text-sm text-slate mb-1"><span className="font-semibold text-charcoal">Coverage:</span> {s.coverage}</p>
                  <p className="text-sm text-slate"><span className="font-semibold text-charcoal">Eligible:</span> {s.eligible}</p>
                </motion.div>
              ))}
            </div>
            <motion.p {...fadeUp(0.2)} className="text-xs text-slate/50 text-center mt-6">
              Wayout helps you identify which scholarships you qualify for and prepares your complete application package.
            </motion.p>
          </div>
        </section>

        {/* UNIVERSITIES */}
        <section id="universities" className="bg-arctic py-20 md:py-28 border-t border-charcoal/6" aria-labelledby="cn-uni-heading">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-12">
              <motion.span {...fadeUp(0)} className="inline-block text-xs font-semibold uppercase tracking-widest text-teal mb-4">Full List</motion.span>
              <motion.h2 id="cn-uni-heading" {...fadeUp(0.06)} className="font-display text-charcoal tracking-tight mb-4"
                style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                Chinese Universities
              </motion.h2>
            </div>
            <motion.div {...fadeUp(0.1)} className="flex justify-end mb-8">
              <div className="relative w-full sm:w-72">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate/40" aria-hidden="true" />
                <input type="text" placeholder="Search by name, city, or program..."
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl bg-white border border-charcoal/10 text-charcoal placeholder-slate/40 outline-none focus:ring-2 focus:ring-teal/30 transition-all duration-200" />
              </div>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((u, i) => (
                <motion.div key={u.name}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }} transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.32) }}
                  className="bg-white rounded-2xl p-5 border border-charcoal/6 hover:border-red-200 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(230,57,70,0.08)] group">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                          style={{ background: 'rgba(230,57,70,0.10)', color: '#D62828' }}>
                          {u.short}
                        </span>
                        {u.tier === 'flagship' && (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                            style={{ background: 'rgba(230,57,70,0.12)', color: '#E63946', border: '1px solid rgba(230,57,70,0.25)' }}>
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
                    <p className="text-xs font-medium border-t border-charcoal/6 pt-3 mt-2" style={{ color: '#E63946' }}>{u.rank}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="py-20 md:py-28" style={{ background: 'linear-gradient(160deg, #1a0404 0%, #2d0808 100%)' }}>
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            <div className="text-center mb-14">
              <motion.span {...fadeUp(0)} className="inline-block text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#E63946' }}>Step by Step</motion.span>
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
                  style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(230,57,70,0.15)' }}>
                  <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm text-white"
                    style={{ background: 'linear-gradient(135deg, #D62828, #E63946)' }}>
                    {i + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-display text-white font-bold text-base" style={{ fontWeight: 700 }}>{step.title}</h3>
                      <span className="text-xs font-semibold px-3 py-0.5 rounded-full"
                        style={{ background: 'rgba(230,57,70,0.15)', color: '#E63946', border: '1px solid rgba(230,57,70,0.2)' }}>
                        {step.tag}
                      </span>
                    </div>
                    <p className="text-xs font-semibold mb-2" style={{ color: '#E63946' }}>{step.period}</p>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.52)' }}>{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div {...fadeUp(0.2)} className="text-center mt-12">
              <a href="https://wa.me/358413272771?text=Hi%20Wayout!%20I%27d%20like%20help%20with%20my%20China%20application."
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white px-8 py-4 rounded-full transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, #D62828, #E63946)', boxShadow: '0 0 32px rgba(230,57,70,0.4)' }}>
                Start Your China Journey <ArrowRight size={15} />
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
                Life in China — Quick Facts
              </motion.h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 mb-10">
              {LIFE_FACTS.map((f, i) => (
                <motion.div key={f.label} {...fadeUp(i * 0.06)}
                  className="bg-white rounded-2xl p-6 border border-charcoal/6 text-center hover:border-red-200 transition-all duration-300">
                  <p className="font-display font-bold mb-1" style={{ fontSize: 'clamp(1.1rem,2.5vw,1.5rem)', fontWeight: 800, color: '#D62828' }}>{f.value}</p>
                  <p className="text-charcoal font-semibold text-sm mb-1">{f.label}</p>
                  <p className="text-slate/55 text-xs">{f.note}</p>
                </motion.div>
              ))}
            </div>
            <motion.div {...fadeUp(0.2)} className="bg-white rounded-2xl p-6 md:p-8 border border-charcoal/6">
              <h3 className="font-display text-charcoal font-bold text-lg mb-5" style={{ fontWeight: 700 }}>Things Every Student Should Know</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Install a VPN before arriving — Google, WhatsApp, and YouTube are blocked without one.',
                  'Download WeChat immediately — it is the primary communication and payment platform.',
                  'Register at the PSB (Public Security Bureau) within 24 hours of arriving on campus.',
                  'Halal restaurants are available in most major cities, especially near university areas.',
                  'Learn basic Mandarin — even 200 words will dramatically improve your daily life.',
                  'Wayout connects you with Bangladeshi student communities at your university before you arrive.',
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
        <section className="py-20 md:py-28" style={{ background: 'linear-gradient(135deg, #D62828 0%, #E63946 60%, #ff6b6b 100%)' }}>
          <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
            <motion.h2 {...fadeUp(0.06)} className="font-display text-white tracking-tight mb-4"
              style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Ready to Study in China?
            </motion.h2>
            <motion.p {...fadeUp(0.12)} className="text-base leading-relaxed max-w-xl mx-auto mb-10"
              style={{ color: 'rgba(255,255,255,0.80)' }}>
              World-ranked universities, full government scholarships, and a global career edge. Let Wayout tell you exactly which route and scholarships match your profile — for free.
            </motion.p>
            <motion.div {...fadeUp(0.18)} className="flex flex-wrap justify-center gap-4">
              <a href="https://wa.me/358413272771?text=Hi%20Wayout!%20I%27d%20like%20a%20free%20evaluation%20for%20China."
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold px-8 py-4 rounded-full transition-all duration-200"
                style={{ background: 'white', color: '#D62828', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
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
