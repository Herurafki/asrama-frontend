import { Button } from '@/components/ui/button';
import Link from "next/link";
import { ArrowRight, Heart } from 'lucide-react';
import { siteInfo } from '@/content/site';
import Image from "next/image";
import heroImage from '@/assets/hero-asrama.jpg';

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image 
          src={heroImage}
          alt="Asrama Nurul Hikmah - Lingkungan Islami yang Kondusif"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Selamat Datang di <br />
            <span className="hero-gradient bg-clip-text text-transparent">
              {siteInfo.nama}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            {siteInfo.deskripsi}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button variant="hero" size="lg" asChild className="min-w-[200px]">
              <Link href="/tentang">
                Tentang Asrama
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button variant="donation" size="lg" asChild className="min-w-[200px]">
              <Link href="/donasi">
                <Heart className="mr-2 h-5 w-5" />
                Donasi Sekarang
              </Link>
            </Button>
          </div>

          {/* Stats Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">245+</div>
              <div className="text-sm text-white/80">Santri Aktif</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">48</div>
              <div className="text-sm text-white/80">Kamar Nyaman</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">125+</div>
              <div className="text-sm text-white/80">Kegiatan/Tahun</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};