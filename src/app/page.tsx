import { ContactSection } from "@/components/ContactSection";
import { FeatureBento } from "@/components/FeatureBento";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { LaunchPartnerBanner } from "@/components/LaunchPartnerBanner";
import { Navbar } from "@/components/Navbar";
import { ProductVerticals } from "@/components/ProductVerticals";
import { Roadmap } from "@/components/Roadmap";

export default function Home() {
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
