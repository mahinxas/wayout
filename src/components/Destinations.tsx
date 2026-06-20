import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const destinations = [
  {
    name: 'Finland',
    flag: '🇫🇮',
    tagline: 'World-class education, tuition-friendly, nature-rich',
    universities: '14 universities',
    highlight: 'Our primary hub',
    gradient: 'linear-gradient(145deg, #1a3a4a 0%, #0d2535 40%, #0a3d4f 100%)',
    accent: '#00B4D8',
    route: '/destinations/finland',
    photo: '/images/finland/northern-lights.jpg',
    silhouette: null,
  },
  {
    name: 'Australia',
    flag: '🇦🇺',
    tagline: 'Global top-100 universities, sun-drenched campuses',
    universities: '41 universities',
    highlight: null,
    gradient: 'linear-gradient(145deg, #2d1a0a 0%, #3d2010 40%, #4a2a0d 100%)',
    accent: '#F4A261',
    route: '/destinations/australia',
    photo: null,
    silhouette: (
      <svg viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
        <rect width="300" height="160" fill="transparent"/>
        <ellipse cx="150" cy="30" rx="140" ry="45" fill="#F4A261" opacity="0.13"/>
        <path d="M100 130 Q110 80 130 75 Q140 78 140 130Z" fill="#1B263B" opacity="0.85"/>
        <path d="M130 130 Q140 70 165 65 Q178 68 175 130Z" fill="#1B263B" opacity="0.9"/>
        <path d="M165 130 Q172 90 185 87 Q193 89 190 130Z" fill="#1B263B" opacity="0.8"/>
        <path d="M30 130 Q80 55 150 50 Q220 55 270 130" stroke="#1B263B" strokeWidth="5" fill="none" opacity="0.75"/>
        <line x1="30" y1="130" x2="270" y2="130" stroke="#1B263B" strokeWidth="3" opacity="0.6"/>
        <rect x="0" y="138" width="300" height="22" rx="3" fill="#0D1B2A" opacity="0.35"/>
      </svg>
    ),
  },
  {
    name: 'Lithuania',
    flag: '🇱🇹',
    tagline: 'Affordable excellence in the heart of Europe',
    universities: '12 universities',
    highlight: null,
    gradient: 'linear-gradient(145deg, #1a2a0a 0%, #1f3010 40%, #263a0d 100%)',
    accent: '#90BE6D',
    route: '/destinations/lithuania',
    photo: null,
    silhouette: (
      <svg viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
        <rect width="300" height="160" fill="transparent"/>
        <ellipse cx="150" cy="40" rx="130" ry="35" fill="#90BE6D" opacity="0.10"/>
        <rect x="55" y="70" width="30" height="70" fill="#1B263B" opacity="0.85"/>
        <polygon points="55,70 70,38 85,70" fill="#1B263B" opacity="0.9"/>
        <rect x="125" y="55" width="50" height="85" fill="#1B263B" opacity="0.9"/>
        <polygon points="125,55 150,15 175,55" fill="#1B263B" opacity="0.95"/>
        <rect x="210" y="80" width="28" height="60" fill="#1B263B" opacity="0.8"/>
        <polygon points="210,80 224,52 238,80" fill="#1B263B" opacity="0.85"/>
        <rect x="0" y="138" width="300" height="22" rx="3" fill="#0D1B2A" opacity="0.35"/>
      </svg>
    ),
  },
  {
    name: 'Malaysia',
    flag: '🇲🇾',
    tagline: 'English-medium, affordable, culturally vibrant',
    universities: '20 universities',
    highlight: null,
    gradient: 'linear-gradient(145deg, #0a1a2d 0%, #0d2040 40%, #102545 100%)',
    accent: '#4CC9F0',
    route: '/destinations/malaysia',
    photo: null,
    silhouette: (
      <svg viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
        <rect width="300" height="160" fill="transparent"/>
        <ellipse cx="150" cy="35" rx="120" ry="40" fill="#4CC9F0" opacity="0.10"/>
        <rect x="90" y="40" width="38" height="100" rx="2" fill="#1B263B" opacity="0.9"/>
        <polygon points="90,40 109,10 128,40" fill="#1B263B" opacity="0.95"/>
        <rect x="172" y="40" width="38" height="100" rx="2" fill="#1B263B" opacity="0.9"/>
        <polygon points="172,40 191,10 210,40" fill="#1B263B" opacity="0.95"/>
        <rect x="128" y="72" width="44" height="8" rx="3" fill="#1B263B" opacity="0.8"/>
      </svg>
    ),
  },
  {
    name: 'China',
    flag: '🇨🇳',
    tagline: 'Scholarships, scale, and a global career edge',
    universities: '35 universities',
    highlight: null,
    gradient: 'linear-gradient(145deg, #2d0a0a 0%, #3d1010 40%, #4a1515 100%)',
    accent: '#E63946',
    route: '/destinations/china',
    photo: null,
    silhouette: (
      <svg viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
        <rect width="300" height="160" fill="transparent"/>
        <ellipse cx="150" cy="35" rx="130" ry="38" fill="#E63946" opacity="0.10"/>
        <polygon points="0,140 60,55 120,100 180,40 240,90 300,50 300,160 0,160" fill="#1B263B" opacity="0.4"/>
        <rect x="130" y="100" width="40" height="40" fill="#1B263B" opacity="0.9"/>
        <polygon points="122,100 150,82 178,100" fill="#1B263B" opacity="0.95"/>
        <rect x="136" y="72" width="28" height="10" rx="1" fill="#1B263B" opacity="0.9"/>
        <polygon points="130,72 150,57 170,72" fill="#1B263B" opacity="0.95"/>
      </svg>
    ),
  },
  {
    name: 'More Coming',
    flag: '🌍',
    tagline: 'New destinations dropping soon — stay close',
    universities: 'Stay tuned',
    highlight: null,
    gradient: 'linear-gradient(145deg, #0D1B2A 0%, #1B263B 100%)',
    accent: '#00B4D8',
    route: null,
    photo: null,
    silhouette: (
      <svg viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
        <rect width="300" height="160" fill="transparent"/>
        <circle cx="150" cy="80" r="50" stroke="#00B4D8" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.3"/>
        <circle cx="150" cy="80" r="30" stroke="#48CAE4" strokeWidth="1" strokeDasharray="3 5" opacity="0.2"/>
        <text x="150" y="86" textAnchor="middle" fill="#00B4D8" fontSize="28" opacity="0.4" fontFamily="sans-serif">+</text>
      </svg>
    ),
  },
];

function CardInner({ d }: { d: typeof destinations[number] }) {
  return (
    <>
      {d.highlight && (
        <div className="absolute top-4 right-4 z-10">
          <span className="text-xs font-semibold bg-teal text-white rounded-full px-2.5 py-1">
            {d.highlight}
          </span>
        </div>
      )}
      {d.photo ? (
        <div className="h-44 overflow-hidden relative">
          <img
            src={d.photo}
            alt={d.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      ) : (
        <div className="h-36 px-4 pt-4 overflow-hidden transition-transform duration-500 group-hover:scale-105">
          {d.silhouette}
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl" role="img" aria-label={`${d.name} flag`}>{d.flag}</span>
          <h3 className="font-display text-white font-bold text-lg leading-snug" style={{ fontWeight: 700 }}>
            {d.name}
          </h3>
        </div>
        <p className="text-white/55 text-sm leading-relaxed mb-4">{d.tagline}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/35 font-medium">{d.universities}</span>
          {d.name !== 'More Coming' && (
            <span
              className="inline-flex items-center gap-1 text-xs font-semibold transition-all duration-200 group-hover:gap-2"
              style={{ color: d.accent }}
            >
              Explore <ArrowRight size={13} />
            </span>
          )}
        </div>
      </div>
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${d.accent}40` }}
        aria-hidden="true"
      />
    </>
  );
}

export default function Destinations() {
  return (
    <section
      id="destinations"
      className="bg-[#f0f8ff] py-20 md:py-28 lg:py-32"
      aria-labelledby="destinations-heading"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        <div className="text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}
            className="inline-block text-xs font-semibold uppercase tracking-widest text-teal mb-4"
          >
            Explore
          </motion.span>
          <motion.h2
            id="destinations-heading"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.06 }}
            className="font-display text-charcoal leading-tight tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}
          >
            Where Will You Go?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }}
            className="text-slate text-base max-w-sm mx-auto leading-relaxed"
          >
            Curated destinations — selected for quality, affordability, and pathway clarity.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {destinations.map((d, i) => {
            const route = d.route;
            return (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                {route ? (
                  <Link
                    to={route}
                    className="group relative rounded-3xl overflow-hidden block cursor-pointer"
                    style={{ background: d.gradient }}
                    aria-label={`Explore ${d.name}`}
                  >
                    <CardInner d={d} />
                  </Link>
                ) : (
                  <div
                    className="group relative rounded-3xl overflow-hidden cursor-default"
                    style={{ background: d.gradient }}
                  >
                    <CardInner d={d} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
