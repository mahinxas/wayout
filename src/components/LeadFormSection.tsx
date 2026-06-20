import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, ease: 'easeOut' as const, delay },
});

const highlights = [
  'Personalised university shortlist',
  'Honest visa success rates',
  'Peer-led, zero pressure',
];

export default function LeadFormSection() {
  return (
    <section
      id="get-started"
      className="py-20 md:py-28"
      style={{ background: 'linear-gradient(160deg, #EEF9FF 0%, #F4FBFF 60%, #E8F4FB 100%)' }}
    >
      <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">

        <motion.span
          {...fadeUp(0)}
          className="inline-block text-xs font-semibold uppercase tracking-widest text-teal mb-4"
        >
          Free. No Obligation.
        </motion.span>

        <motion.h2
          {...fadeUp(0.06)}
          className="font-display text-charcoal tracking-tight mb-4"
          style={{ fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 800, letterSpacing: '-0.02em' }}
        >
          Get Your Free Profile Evaluation
        </motion.h2>

        <motion.p {...fadeUp(0.12)} className="text-slate text-base leading-relaxed mb-8 max-w-xl mx-auto">
          Tell us about yourself and we'll match you with the best study destination and university for your goals — completely free.
        </motion.p>

        {/* Highlights row */}
        <motion.ul
          {...fadeUp(0.16)}
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10"
        >
          {highlights.map((h) => (
            <li key={h} className="flex items-center gap-1.5 text-sm text-charcoal/65">
              <CheckCircle2 size={14} className="text-teal flex-shrink-0" />
              {h}
            </li>
          ))}
        </motion.ul>

        <motion.div {...fadeUp(0.2)}>
          <Link
            to="/apply"
            className="inline-flex items-center gap-2 bg-teal hover:bg-teal-deep active:scale-[0.98] text-white text-sm font-bold px-8 py-4 rounded-full transition-all duration-200 shadow-[0_0_28px_rgba(0,180,216,0.35)] hover:shadow-[0_0_40px_rgba(0,180,216,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
          >
            Start My Free Evaluation <ArrowRight size={15} />
          </Link>
        </motion.div>

        <motion.p {...fadeUp(0.26)} className="text-xs text-slate/40 mt-4">
          Takes ~3 minutes · No spam · Your data is never sold
        </motion.p>

      </div>
    </section>
  );
}
