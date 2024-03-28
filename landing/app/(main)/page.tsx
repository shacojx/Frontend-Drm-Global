import { AboutUsSection } from '@/components/AboutUsSection';
import { HeroSection } from '@/components/HeroSection';
import { OurServiceSection } from '@/components/OurServiceSection';
import { TestimonialSection } from '@/components/TestimonialSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <OurServiceSection />
      <AboutUsSection />
      <TestimonialSection />
    </>
  );
}
