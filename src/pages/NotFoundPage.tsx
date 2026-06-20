import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import CtaFooter from '../components/CtaFooter';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-arctic flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center py-32">
        <p className="text-7xl font-display font-extrabold text-teal mb-4">404</p>
        <h1 className="font-display text-charcoal font-bold text-3xl mb-3">Page not found</h1>
        <p className="text-slate text-base max-w-sm mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-teal hover:bg-teal-deep text-white text-sm font-bold px-7 py-3.5 rounded-full transition-all duration-200 shadow-[0_0_24px_rgba(0,180,216,0.35)]"
        >
          Back to Home <ArrowRight size={15} />
        </Link>
      </main>
      <CtaFooter />
    </div>
  );
}
