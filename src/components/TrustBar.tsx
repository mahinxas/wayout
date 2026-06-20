import { ShieldCheck, Users, Route, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const chips = [
  { icon: ShieldCheck, label: 'Transparent flat pricing' },
  { icon: Users,       label: 'Peer mentors, not call-centre agents' },
  { icon: Route,       label: 'End-to-end: profile → visa → arrival' },
  { icon: Lock,        label: 'GDPR-compliant data handling' },
];

export default function TrustBar() {
  return (
    <section
      id="trust"
      className="bg-white border-y border-charcoal/8 py-5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {chips.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-2.5 text-charcoal/60 text-sm"
            >
              <Icon size={15} className="text-teal flex-shrink-0" aria-hidden="true" />
              <span>{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
