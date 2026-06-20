import { Eye, Heart, Layers, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Eye,
    title: 'Transparent by Default',
    body: 'See every step and every cost up front. No hidden fees, no last-minute surprises. What you see is what you pay — always.',
    contrast: 'Legacy agencies reveal pricing only at the "commitment" stage.',
  },
  {
    icon: Heart,
    title: 'Peer-Led, Not Pressured',
    body: 'Your guide studied abroad last year — not a commission-hungry call-centre agent. Real advice from someone who lived it. Zero hidden agenda.',
    contrast: 'Legacy agencies: calls designed to close, not advise.',
  },
  {
    icon: Layers,
    title: 'One Platform, End-to-End',
    body: 'Profile, match, applications, visa, arrival support — all in one place. No juggling five agents and losing track of critical documents.',
    contrast: 'Legacy agencies hand you off at every stage.',
  },
  {
    icon: TrendingUp,
    title: 'Data Security You Can Verify',
    body: 'Your passport, transcripts, and financial documents are encrypted and GDPR-compliant. You control who sees what, and you can request deletion anytime.',
    contrast: 'Legacy agencies email your sensitive documents unencrypted.',
  },
];

export default function WhyWayout() {
  return (
    <section
      id="why-wayout"
      className="bg-white py-20 md:py-28 lg:py-32"
      aria-labelledby="why-heading"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        <div className="text-center mb-14 md:mb-18">
          <motion.span
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}
            className="inline-block text-xs font-semibold uppercase tracking-widest text-teal mb-4"
          >
            The Difference
          </motion.span>
          <motion.h2
            id="why-heading"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.07 }}
            className="font-display text-charcoal leading-tight tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}
          >
            Why Wayout?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }}
            className="text-slate text-lg max-w-lg mx-auto leading-relaxed"
          >
            We built the platform we wished existed when we were applying.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map(({ icon: Icon, title, body, contrast }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-arctic rounded-2xl p-7 hover:shadow-[0_16px_48px_rgba(13,27,42,0.1)] hover:-translate-y-1 transition-all duration-300 border border-[rgba(27,38,59,0.05)] flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-5 group-hover:bg-teal/18 transition-colors duration-300">
                <Icon size={22} className="text-teal" aria-hidden="true" />
              </div>

              <h3 className="font-display text-charcoal font-bold text-lg mb-3 leading-snug" style={{ fontWeight: 700 }}>
                {title}
              </h3>
              <p className="text-slate text-sm leading-relaxed flex-1">{body}</p>

              <p className="text-xs text-slate/55 mt-5 pt-4 border-t border-charcoal/8 italic leading-relaxed">
                ✗ {contrast}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
