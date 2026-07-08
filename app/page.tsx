import HeroSection from '@/components/hero/HeroSection';
import { TrustSection } from '@/components/sections/TrustSection';
import { QuoteFormSection } from '@/components/sections/Quoteformsection';
import { ProjectsGallery } from '@/components/sections/Projectsgallery';
import { FaqSection } from '@/components/sections/Faqsection';
import { Footer } from '@/components/sections/Footer';
import TestimonialsSection from '@/components/sections/Testimonialssection';
import CtaSection from '@/components/sections/Ctasection';
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <ProjectsGallery/>
        <QuoteFormSection/>
      <FaqSection/>
        <TestimonialsSection/>

        <CtaSection/>
        <Footer/>
       
    </>
  );
}
