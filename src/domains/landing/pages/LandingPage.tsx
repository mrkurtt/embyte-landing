"use client";

import { ContactSection } from '../sections/ContactSection';
import { FAQ } from '../sections/FAQ';
import { FeatureBento } from '../sections/FeatureBento';
import { Footer } from '../components/Footer';
import { Hero } from '../sections/Hero';
import { LaunchPartnerBanner } from '../sections/LaunchPartnerBanner';
import { Navbar } from '../components/Navbar';
import { ProductVerticals } from '../sections/ProductVerticals';
import { Roadmap } from '../sections/Roadmap';
import { SocialProof } from '../sections/SocialProof';
import { StickyMobileCTA } from '../components/StickyMobileCTA';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <ProductVerticals />
        <FeatureBento />
        <LaunchPartnerBanner />
        <Roadmap />
        <FAQ />
        <ContactSection />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
