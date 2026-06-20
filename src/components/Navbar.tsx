import { useState, useEffect } from 'react';
import { ArrowRight, X, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import WayoutLogo from './WayoutLogo';

const anchorLinks = [
  { label: 'How it Works', href: '/#how-it-works' },
  { label: 'Destinations', href: '/#destinations' },
  { label: 'Why Us', href: '/#why-wayout' },
];

export default function Navbar({ darkBg = false }: { darkBg?: boolean }) {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 60);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const onPricingPage = location.pathname === '/pricing';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isDark = darkBg && !scrolled;

  const linkClass = isDark
    ? 'text-sm font-medium text-white/75 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded'
    : 'text-sm font-medium text-charcoal/65 hover:text-charcoal transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded';
  const activeLinkClass =
    'text-sm font-medium text-teal transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded';
  const logoTextColor = isDark ? '#ffffff' : '#0D1B2A';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/92 backdrop-blur-md border-b border-charcoal/10 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">

        <Link
          to="/"
          className="hover:opacity-85 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded"
          aria-label="Wayout home"
        >
          <WayoutLogo size={34} textColor={logoTextColor} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {anchorLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={linkClass}
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/pricing"
            className={onPricingPage ? activeLinkClass : linkClass}
          >
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://wa.me/358413272771"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 text-slate/80 hover:text-teal text-sm font-medium px-3 py-2 rounded-full transition-colors duration-200"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="text-teal flex-shrink-0" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Chat with us
          </a>

          <Link
            to="/apply"
            className="hidden sm:inline-flex items-center gap-2 bg-teal hover:bg-teal-deep active:scale-[0.98] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 shadow-[0_0_20px_rgba(0,180,216,0.3)] hover:shadow-[0_0_28px_rgba(0,180,216,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
          >
            Free Evaluation <ArrowRight size={15} />
          </Link>

          <button
            className="md:hidden p-1.5 rounded text-charcoal/70 hover:text-charcoal transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white/95 backdrop-blur-md border-t border-charcoal/10 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col px-6 py-4 gap-1" aria-label="Mobile primary">
          {anchorLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 text-base font-medium text-charcoal/75 hover:text-charcoal border-b border-charcoal/6 transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/pricing"
            onClick={() => setOpen(false)}
            className={`py-3 text-base font-medium border-b border-charcoal/6 last:border-0 transition-colors duration-200 ${
              onPricingPage ? 'text-teal' : 'text-charcoal/75 hover:text-charcoal'
            }`}
          >
            Pricing
          </Link>
          <div className="mt-4 flex flex-col gap-3">
            <Link
              to="/apply"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 bg-teal hover:bg-teal-deep text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors duration-200"
            >
              Free Evaluation <ArrowRight size={15} />
            </Link>
            <a
              href="https://wa.me/358413272771"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 border border-teal/30 text-teal text-sm font-medium px-5 py-3 rounded-full transition-colors duration-200 hover:bg-teal/5"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
