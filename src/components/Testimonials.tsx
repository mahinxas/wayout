import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Nadia Rahman',
    role: 'MSc Computer Science',
    destination: '🇫🇮 University of Helsinki',
    origin: 'Dhaka, Bangladesh',
    quote:
      "I was terrified of the whole process. My Wayout peer mentor Anika had done the exact same application two years before me. She knew which documents would cause delays, which bank statements to prepare, everything. I got my Finnish student visa in 6 weeks flat.",
    initial: 'N',
    color: '#00B4D8',
    type: 'student',
  },
  {
    name: 'Rahul Sharma',
    role: 'MBA Candidate',
    destination: '🇦🇺 University of Melbourne',
    origin: 'Mumbai, India',
    quote:
      "Every other agency kept pushing me toward universities I didn't want because they had deals with them. Wayout showed me my actual options and all costs upfront. No surprise fees at step 3. Exactly what they promised on page one.",
    initial: 'R',
    color: '#F4A261',
    type: 'student',
  },
  {
    name: "Amina's Father",
    role: 'Parent & Decision-maker',
    destination: '🇱🇹 Vilnius University',
    origin: 'Karachi, Pakistan',
    quote:
      "As a parent, I needed to know my daughter's passport and financial documents were handled securely. Wayout showed me exactly which files were stored, how they were encrypted, and who had access. That transparency — before we paid anything — built my trust instantly.",
    initial: 'A',
    color: '#90BE6D',
    type: 'parent',
  },
  {
    name: 'Wei Lin',
    role: 'BEng Electrical Engineering',
    destination: '🇲🇾 University of Malaya',
    origin: 'Yangon, Myanmar',
    quote:
      "The housing and airport pickup Wayout arranged meant I didn't arrive alone in a new country. My peer had already lived in the same student area. She helped me open a bank account on day two. That on-ground network is priceless.",
    initial: 'W',
    color: '#4CC9F0',
    type: 'student',
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} fill="#00B4D8" stroke="none" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-white py-20 md:py-28 lg:py-32"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        <div className="text-center mb-14 md:mb-18">
          <motion.span
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}
            className="inline-block text-xs font-semibold uppercase tracking-widest text-teal mb-4"
          >
            Real Stories
          </motion.span>
          <motion.h2
            id="testimonials-heading"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.07 }}
            className="font-display text-charcoal leading-tight tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}
          >
            Students (and parents) who made it
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }}
            className="text-slate text-lg max-w-lg mx-auto leading-relaxed"
          >
            Peer validation is our product. Read what people say after the visa lands.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map(({ name, role, destination, origin, quote, initial, color, type }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              className="group bg-arctic rounded-2xl p-7 hover:shadow-[0_16px_48px_rgba(13,27,42,0.09)] hover:-translate-y-1 transition-all duration-300 border border-charcoal/5 flex flex-col gap-5"
            >
              {/* Quote icon */}
              <Quote size={24} className="text-teal/25 flex-shrink-0" aria-hidden="true" />

              {/* Quote text */}
              <p className="text-charcoal/80 text-sm leading-relaxed flex-1">
                "{quote}"
              </p>

              {/* Stars + badge */}
              <div className="flex items-center justify-between flex-wrap gap-3">
                <Stars />
                {type === 'parent' && (
                  <span className="text-xs font-semibold text-slate/60 bg-charcoal/6 rounded-full px-2.5 py-1">
                    Parent perspective
                  </span>
                )}
              </div>

              {/* Identity */}
              <div className="flex items-center gap-3 pt-4 border-t border-charcoal/8">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ backgroundColor: color }}
                  aria-hidden="true"
                >
                  {initial}
                </div>
                <div>
                  <p className="font-semibold text-charcoal text-sm">{name}</p>
                  <p className="text-xs text-slate/60">{role} · {origin}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-xs text-teal font-semibold">{destination}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Aggregate trust signal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-arctic rounded-2xl px-8 py-5 border border-charcoal/8">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#00B4D8" stroke="none" />
              ))}
            </div>
            <div className="text-center sm:text-left">
              <p className="font-display font-bold text-charcoal text-base">4.9 / 5 average rating</p>
              <p className="text-xs text-slate/55 mt-0.5">Based on 230+ verified post-placement reviews</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
