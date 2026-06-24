import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Roadmap from './components/Roadmap';
import Destinations from './components/Destinations';
import WhyWayout from './components/WhyWayout';
import LeadFormSection from './components/LeadFormSection';
import CtaFooter from './components/CtaFooter';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import PricingPage from './pages/PricingPage';
import FinlandPage from './pages/FinlandPage';
import AustraliaPage from './pages/AustraliaPage';
import LithuaniaPage from './pages/LithuaniaPage';
import MalaysiaPage from './pages/MalaysiaPage';
import ChinaPage from './pages/ChinaPage';
import ApplyPage from './pages/ApplyPage';
import NotFoundPage from './pages/NotFoundPage';

function HomePage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-arctic">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Roadmap />
        <Destinations />
        <WhyWayout />
<LeadFormSection />
      </main>
      <CtaFooter />
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/destinations/finland" element={<FinlandPage />} />
        <Route path="/destinations/australia" element={<AustraliaPage />} />
        <Route path="/destinations/lithuania" element={<LithuaniaPage />} />
        <Route path="/destinations/malaysia" element={<MalaysiaPage />} />
        <Route path="/destinations/china" element={<ChinaPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
