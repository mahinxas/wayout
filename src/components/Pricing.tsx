import { ArrowRight, Check, X as XIcon, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Starter',
    tagline: 'Everything you need to find your path',
    price: '€499',
    priceNote: 'One flat fee. No add-ons.',
    featured: false,
    cta: 'Get Started',
    ctaHref: '/apply',
    features: [
      { text: 'Full profile & eligibility assessment', included: true },
      { text: 'Smart destination + university matching', included: true },
      { text: 'Application essay review (2 rounds)', included: true },
      { text: 'Document checklist & preparation guide', included: true },
      { text: 'Dedicated peer mentor (30 days)', included: true },
      { text: 'WhatsApp group support', included: true },
      { text: 'Visa document engineering', included: false },
      { text: 'Housing allocation support', included: false },
      { text: 'Airport arrival network', included: false },
    ],
  },
  {
    name: 'Full-Service',
    tagline: 'Door-to-door. From your desk to your dorm.',
    price: '€1,299',
    priceNote: 'One flat fee. Zero hidden charges.',
    featured: true,
    cta: 'Get Full Service',
    ctaHref: '/apply',
    features: [
      { text: 'Everything in Starter', included: true },
      { text: 'Full application management', included: true },
      { text: 'Visa document engineering & review', included: true },
      { text: 'Financial statement preparation guidance', included: true },
      { text: 'Housing allocation support', included: true },
      { text: 'Airport arrival peer network', included: true },
      { text: 'Priority WhatsApp support (24h response)', included: true },
      { text: 'On-ground peer support (3 months)', included: true },
      { text: 'Post-arrival SIM, bank & admin checklist', included: true },
    ],
  },
];

const parentAssurances = [
  'No performance guarantees — we are honest about outcomes',
  'Service agreement clearly defines what is and isn\'t included',
  'GDPR-compliant document handling — your data is never sold',
  'Refund policy in writing before you pay anything',
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="bg-arctic py-20 md:py-28 lg:py-32"
      aria-labelledby="pricing-heading"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        <div className="text-center mb-14 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}
            className="inline-block text-xs font-semibold uppercase tracking-widest text-teal mb-4"
          >
            Transparent Pricing
          </motion.span>
          <motion.h2
            id="pricing-heading"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.07 }}
            className="font-display text-charcoal leading-tight tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}
          >
            Know exactly what you pay — before you pay it
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }}
            className="text-slate text-lg max-w-xl mx-auto leading-relaxed"
          >
            Flat fees. No commission kickbacks. No package upgrades mid-process.
            The price you see is the price you pay.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`relative rounded-2xl p-7 flex flex-col border transition-all duration-300 ${
                plan.featured
                  ? 'bg-navy border-teal/30 shadow-[0_20px_60px_rgba(0,180,216,0.18)] hover:shadow-[0_28px_72px_rgba(0,180,216,0.26)]'
                  : 'bg-white border-charcoal/10 shadow-[0_8px_30px_rgba(13,27,42,0.07)] hover:shadow-[0_16px_48px_rgba(13,27,42,0.11)]'
              } hover:-translate-y-1`}
            >
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="text-xs font-bold bg-teal text-white rounded-full px-3.5 py-1.5 shadow-sm whitespace-nowrap">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`font-display text-xl font-bold mb-1 ${plan.featured ? 'text-white' : 'text-charcoal'}`}
                  style={{ fontWeight: 700 }}
                >
                  {plan.name}
                </h3>
                <p className={`text-sm leading-relaxed ${plan.featured ? 'text-white/60' : 'text-slate'}`}>
                  {plan.tagline}
                </p>
              </div>

              <div className="mb-6">
                <span
                  className={`font-display font-extrabold leading-none ${plan.featured ? 'text-white' : 'text-charcoal'}`}
                  style={{ fontSize: 'clamp(2.2rem,4vw,2.8rem)', fontWeight: 800 }}
                >
                  {plan.price}
                </span>
                <p className={`text-xs mt-1.5 ${plan.featured ? 'text-teal-light' : 'text-teal'}`}>
                  {plan.priceNote}
                </p>
              </div>

              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map(({ text, included }) => (
                  <li key={text} className="flex items-start gap-2.5">
                    {included ? (
                      <Check
                        size={16}
                        className="text-teal flex-shrink-0 mt-0.5"
                        aria-label="Included"
                      />
                    ) : (
                      <XIcon
                        size={16}
                        className={`flex-shrink-0 mt-0.5 ${plan.featured ? 'text-white/25' : 'text-charcoal/20'}`}
                        aria-label="Not included"
                      />
                    )}
                    <span
                      className={`text-sm ${
                        included
                          ? plan.featured ? 'text-white/85' : 'text-charcoal/80'
                          : plan.featured ? 'text-white/30' : 'text-charcoal/30'
                      }`}
                    >
                      {text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                to={plan.ctaHref}
                className={`inline-flex items-center justify-center gap-2 font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal ${
                  plan.featured
                    ? 'bg-teal hover:bg-teal-deep text-white shadow-[0_0_28px_rgba(0,180,216,0.4)] hover:shadow-[0_0_40px_rgba(0,180,216,0.55)]'
                    : 'bg-charcoal/8 hover:bg-charcoal/14 text-charcoal'
                }`}
              >
                {plan.cta} <ArrowRight size={15} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Parent trust box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 max-w-3xl mx-auto bg-white rounded-2xl border border-charcoal/8 p-6"
        >
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center">
              <MessageCircle size={20} className="text-teal" aria-hidden="true" />
            </div>
            <div>
              <p className="font-semibold text-charcoal text-sm mb-3">For parents: what our pricing promise means</p>
              <ul className="flex flex-col gap-2">
                {parentAssurances.map((note) => (
                  <li key={note} className="flex items-start gap-2 text-xs text-slate/70 leading-relaxed">
                    <span className="text-teal mt-0.5 flex-shrink-0">✓</span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Enterprise CTA */}
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.28 }}
          className="text-center text-sm text-slate/60 mt-8"
        >
          Applying as a group or institution?{' '}
          <a href="mailto:hello@wayout.io" className="text-teal hover:text-teal-deep font-medium underline underline-offset-2 transition-colors duration-200">
            Contact us for a custom B2B quote →
          </a>
        </motion.p>

      </div>
    </section>
  );
}
