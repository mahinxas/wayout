import { Link } from 'react-router-dom';
import WayoutLogo from './WayoutLogo';

const platformLinks: { label: string; to: string }[] = [
  { label: 'How it Works', to: '/#roadmap' },
  { label: 'Profile Evaluation', to: '/apply' },
  { label: 'Pricing', to: '/pricing' },
];

const destinationLinks: { label: string; to: string }[] = [
  { label: 'Finland', to: '/destinations/finland' },
  { label: 'Australia', to: '/destinations/australia' },
  { label: 'Lithuania', to: '/destinations/lithuania' },
  { label: 'Malaysia', to: '/destinations/malaysia' },
  { label: 'China', to: '/destinations/china' },
];

const linkCls = 'text-charcoal/45 hover:text-charcoal/80 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal rounded';

export default function CtaFooter() {
  return (
    <footer className="bg-[#f8f9fb] border-t border-charcoal/8">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6">

          <div className="col-span-2 md:col-span-2">
            <Link to="/" className="mb-4 w-fit inline-block hover:opacity-85 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded" aria-label="Wayout home">
              <WayoutLogo size={30} textColor="#0D1B2A" />
            </Link>
            <p className="text-charcoal/45 text-sm leading-relaxed max-w-[200px]">
              Your global study partner. Peer-led, transparent, end-to-end.
            </p>
          </div>

          <div className="col-span-1">
            <p className="text-charcoal/55 text-xs font-semibold uppercase tracking-wider mb-4">Platform</p>
            <ul className="flex flex-col gap-2.5">
              {platformLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className={linkCls}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <p className="text-charcoal/55 text-xs font-semibold uppercase tracking-wider mb-4">Destinations</p>
            <ul className="flex flex-col gap-2.5">
              {destinationLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className={linkCls}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <p className="text-charcoal/55 text-xs font-semibold uppercase tracking-wider mb-4">Contact</p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href="https://wa.me/358413272771" target="_blank" rel="noopener noreferrer" className={linkCls}>
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:hello@wayout.io" className={linkCls}>
                  Email Us
                </a>
              </li>
              <li>
                <Link to="/apply" className={linkCls}>Free Evaluation</Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-charcoal/8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-charcoal/30 text-xs">
            © {new Date().getFullYear()} Wayout. All rights reserved.
          </p>
          <p className="text-charcoal/25 text-xs text-center sm:text-right max-w-xs leading-relaxed">
            Your personal data is never sold or shared with third parties. Secured end-to-end.
          </p>
        </div>
      </div>
    </footer>
  );
}
