import { Metadata } from 'next';
import { HeroSection } from '@/components/homepage/HeroSection';
import { StatsSection } from '@/components/homepage/StatsSection';
import { FeaturedFacilities } from '@/components/homepage/FeaturedFacilities';
import { PengumumanBanner } from '@/components/homepage/PengumumanBanner';
import { ContactSection } from '@/components/homepage/ContactSection';
import { DonasiCTA } from '@/components/homepage/DonasiCTA';

export const metadata: Metadata = {
  title: 'Asrama Nurul Hikmah - Asrama Terpadu Islami Terbaik',
  description: 'Asrama terpadu yang mengembangkan akhlak mulia, prestasi akademik, dan kemandirian santri dalam lingkungan Islami yang kondusif. Fasilitas lengkap, program tahfidz, dan pembinaan karakter terbaik.',
  keywords: 'asrama terbaik, pesantren modern, pendidikan islam, santri, tahfidz, boarding school, islamic education',
  openGraph: {
    title: 'Asrama Nurul Hikmah - Asrama Terpadu Islami Terbaik',
    description: 'Asrama terpadu yang mengembangkan akhlak mulia, prestasi akademik, dan kemandirian santri dalam lingkungan Islami yang kondusif. Fasilitas lengkap, program tahfidz, dan pembinaan karakter terbaik.',
  },
};

export default function HomePage() {
  return (
    <div className="homepage">
      <HeroSection />
      <PengumumanBanner />
      <StatsSection />
      <FeaturedFacilities />
      <DonasiCTA />
      <ContactSection />
    </div>
  );
}