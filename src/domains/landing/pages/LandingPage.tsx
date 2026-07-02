import { ContactSection } from '../sections/ContactSection';
import { FeatureBento } from '../sections/FeatureBento';
import { Footer } from '../components/Footer';
import { Hero } from '../sections/Hero';
import { LaunchPartnerBanner } from '../sections/LaunchPartnerBanner';
import { Navbar } from '../components/Navbar';
import { ProductVerticals } from '../sections/ProductVerticals';
import { Roadmap } from '../sections/Roadmap';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProductVerticals />
        <FeatureBento />
        <LaunchPartnerBanner />
        <Roadmap />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
