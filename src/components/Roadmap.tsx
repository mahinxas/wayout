import { useRef } from 'react';
import { ClipboardCheck, Globe2, FileCheck2, PlaneLanding } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const steps = [
  {
    number: '01',
    icon: ClipboardCheck,
    title: 'Profile Evaluation',
    body: "Honest assessment of your goals, academic background, and budget. No filters, no upselling — just a clear picture of where you stand and what's possible.",
    duration: 'Day 1–3',
  },
  {
    number: '02',
    icon: Globe2,
    title: 'Global Matching',
    body: 'Matched to the right countries, universities, and courses for you — not just the ones easiest for us to process. Your peer mentor reviews your match.',
    duration: 'Week 1',
  },
  {
    number: '03',
    icon: FileCheck2,
    title: 'Portfolio & Visa Engineering',
    body: 'Applications, documents, SOPs, and visa prep — handled with you step by step, fully visible at every stage. No black boxes, no hidden steps.',
    duration: 'Weeks 2–8',
  },
  {
    number: '04',
    icon: PlaneLanding,
    title: 'On-Ground Onboarding',
    body: "Housing, SIM card, bank account, and a peer from your university waiting when you land. Your journey doesn't end at the visa stamp.",
    duration: 'Arrival day',
  },
];

function StepCard({ step, index, isLeft }: { step: typeof steps[number]; index: number; isLeft: boolean }) {
  const Icon = step.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30, y: 10 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.08 }}
      className={`w-full md:w-[44%] ${isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}
    >
      <div className="group bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgba(13,27,42,0.07)] hover:shadow-[0_16px_48px_rgba(13,27,42,0.12)] transition-all duration-300 hover:-translate-y-1 border border-[rgba(27,38,59,0.06)]">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-arctic flex items-center justify-center group-hover:bg-teal/10 transition-colors duration-300">
            <Icon size={20} className="text-teal" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-teal">{step.number}</p>
              <span className="text-xs text-slate/50 font-medium bg-arctic rounded-full px-2.5 py-1">{step.duration}</span>
            </div>
            <h3 className="font-display text-charcoal text-lg font-bold mb-2 leading-snug" style={{ fontWeight: 700 }}>
              {step.title}
            </h3>
            <p className="text-slate text-sm leading-relaxed">{step.body}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Roadmap() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  });
  const fill = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="how-it-works"
      className="bg-arctic py-20 md:py-28 lg:py-32"
      aria-labelledby="roadmap-heading"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        <div className="text-center mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}
            className="inline-block text-xs font-semibold uppercase tracking-widest text-teal mb-4"
          >
            The Journey
          </motion.span>
          <motion.h2
            id="roadmap-heading"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
            className="font-display text-charcoal leading-tight tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}
          >
            Your Way Out, Step by Step
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.14 }}
            className="text-slate text-lg max-w-lg mx-auto leading-relaxed"
          >
            Every step is visible. Every decision is yours. We make sure you never walk it alone.
          </motion.p>
        </div>

        <div ref={containerRef} className="relative">

          <div
            className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-px bg-charcoal/10"
            style={{ height: '100%' }}
            aria-hidden="true"
          >
            <motion.div
              className="w-full bg-teal origin-top rounded-full"
              style={{ height: fill }}
            />
          </div>

          <div className="md:hidden absolute left-5 top-0 bottom-0 w-px bg-charcoal/10" aria-hidden="true" />

          <div className="flex flex-col gap-12 md:gap-16">
            {steps.map((step, i) => (
              <div key={step.number} className="relative flex items-start md:items-center gap-6 md:gap-0">

                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.35, delay: i * 0.1 }}
                  className="flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full bg-teal flex items-center justify-center z-10 shadow-[0_0_20px_rgba(0,180,216,0.4)] text-white text-xs font-bold font-display"
                  aria-hidden="true"
                >
                  {i + 1}
                </motion.div>

                <div className="flex-1 md:w-full md:flex md:items-center pl-2 md:pl-0">
                  <StepCard step={step} index={i} isLeft={i % 2 === 0} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
