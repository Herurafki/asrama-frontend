import { Metadata } from 'next';
import { StatsSection } from '@/components/homepage/StatsSection';
import { FeaturedFacilities } from '@/components/homepage/FeaturedFacilities';
import { PengumumanBanner } from '@/components/homepage/PengumumanBanner';
import { ContactSection } from '@/components/homepage/ContactSection';
import { DonasiCTA } from '@/components/homepage/DonasiCTA';
import { HeroSection } from '@/components/homepage/HeroSection';

export const metadata: Metadata = {
  title: 'Asrama MIS-QU Al Falah',
  description: 'Asrama terpadu yang mengembangkan akhlak mulia, prestasi akademik, dan kemandirian santri dalam lingkungan Islami yang kondusif.',
  keywords: 'asrama terbaik, pesantren modern, pendidikan islam, santri, tahfidz, boarding school, islamic education',
  openGraph: {
    title: 'Asrama MIS Quran Al Falah',
    description: 'Asrama terpadu yang mengembangkan akhlak mulia, prestasi akademik, dan kemandirian santri dalam lingkungan Islami yang kondusif.',
  },
};

export default function HomePage() {
  return (
    <div className="overflow-hidden">
        <HeroSection />    
        <PengumumanBanner />
        <StatsSection />
        <FeaturedFacilities /> 
        <DonasiCTA />
        <ContactSection />
    </div>
  );
}