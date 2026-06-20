import { ArrowRight, ChevronDown, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' as const, delay: i * 0.1 },
  }),
};

const stats = [
  { value: '500+', label: 'Students Guided' },
  { value: '5',   label: 'Countries Active' },
  { value: '98%', label: 'Visa Success Rate' },
];

const avatarColors = ['#00B4D8', '#48CAE4', '#0096C7'];
const avatarInitials = ['N', 'R', 'A'];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden flex flex-col"
      style={{ background: 'linear-gradient(160deg, #EEF9FF 0%, #F4FBFF 55%, #E8F4FB 100%)' }}
    >
      {/* Background dot texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #48CAE4 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.06,
        }}
        aria-hidden="true"
      />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(0,180,216,0.10) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto px-6 md:px-8 pt-36 pb-16 flex-1 flex flex-col items-center text-center">

        {/* Social proof avatars */}
        <motion.div
          variants={fadeUp} custom={0} initial="hidden" animate="show"
          className="flex items-center gap-3 mb-7"
        >
          <div className="flex -space-x-2">
            {avatarInitials.map((initial, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white"
                style={{ backgroundColor: avatarColors[i] }}
              >
                {initial}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} fill="#00B4D8" stroke="none" />
              ))}
            </div>
            <span className="text-xs text-slate/70 font-medium">Trusted by 500+ students</span>
          </div>
        </motion.div>

        {/* Eyebrow */}
        <motion.span
          variants={fadeUp} custom={1} initial="hidden" animate="show"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal mb-5"
        >
          <span className="w-5 h-px bg-teal inline-block" />
          Your Global Study Partner
          <span className="w-5 h-px bg-teal inline-block" />
        </motion.span>

        {/* Headline */}
        <motion.h1
          variants={fadeUp} custom={2} initial="hidden" animate="show"
          className="font-display text-navy leading-[1.04] tracking-[-0.03em] mb-6"
          style={{ fontSize: 'clamp(3rem,7vw,5.5rem)', fontWeight: 800 }}
        >
          Study Abroad,{' '}
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(90deg, #00B4D8, #48CAE4)' }}
          >
            Redefined.
          </span>
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          variants={fadeUp} custom={3} initial="hidden" animate="show"
          className="text-lg text-slate leading-relaxed mb-10 max-w-xl"
        >
          Guided by students who've already made the move. Transparent pricing, zero pressure,
          step-by-step journey — from your first profile to landing in your dream city.
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={fadeUp} custom={4} initial="hidden" animate="show"
        >
          <Link
            to="/apply"
            className="inline-flex items-center gap-2 bg-teal hover:bg-teal-deep active:scale-[0.98] text-white text-sm font-semibold px-8 py-3.5 rounded-full transition-all duration-200 shadow-[0_0_28px_rgba(0,180,216,0.4)] hover:shadow-[0_0_40px_rgba(0,180,216,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
          >
            Get Free Evaluation <ArrowRight size={15} />
          </Link>
        </motion.div>

        {/* Trust chips */}
        <motion.div
          variants={fadeUp} custom={5} initial="hidden" animate="show"
          className="flex flex-wrap justify-center gap-3 mt-8"
        >
          {['5 Countries', '100% Transparent', 'Peer-Led Guidance', 'GDPR Compliant'].map((chip) => (
            <span
              key={chip}
              className="text-xs text-slate/70 rounded-full px-3.5 py-1.5 bg-white/70 backdrop-blur-sm border border-charcoal/12"
            >
              {chip}
            </span>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp} custom={6} initial="hidden" animate="show"
          className="mt-14 w-full max-w-lg rounded-2xl border border-charcoal/10 bg-white/60 backdrop-blur-sm shadow-sm py-6 px-4 grid grid-cols-3"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-center gap-1 ${
                i < stats.length - 1 ? 'border-r border-charcoal/10' : ''
              }`}
            >
              <span
                className="font-display font-800 leading-none"
                style={{
                  fontSize: 'clamp(1.5rem,3vw,2rem)',
                  fontWeight: 800,
                  color: '#00B4D8',
                }}
              >
                {s.value}
              </span>
              <span className="text-xs text-slate/65 text-center">{s.label}</span>
            </div>
          ))}
        </motion.div>

      </div>

      {/* Scroll cue */}
      <div className="flex justify-center pb-8">
        <motion.a
          href="#trust"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="text-charcoal/25 hover:text-charcoal/50 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded"
          aria-label="Scroll to next section"
        >
          <ChevronDown size={24} className="animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
}
