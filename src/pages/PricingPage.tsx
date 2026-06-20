import Navbar from '../components/Navbar';
import Pricing from '../components/Pricing';
import CtaFooter from '../components/CtaFooter';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
export default function PricingPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-arctic">
      <Navbar />
      <main>
        <div className="pt-16">
          <Pricing />
        </div>
      </main>
      <CtaFooter />
      <FloatingWhatsApp />
    </div>
  );
}
