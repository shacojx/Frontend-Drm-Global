import { AboutUsSection } from '@/components/AboutUsSection';
import { HeroSection } from '@/components/HeroSection';
import { OurServiceSection } from '@/components/OurServiceSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <OurServiceSection />
      <AboutUsSection />
    </>
  );
}
