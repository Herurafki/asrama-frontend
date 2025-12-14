
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Heart } from 'lucide-react';
import { siteInfo } from '@/content/site';

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* DIUBAH: Menggunakan next/image untuk performa lebih baik */}
        <Image 
          // Ini akan mengambil gambar dari folder 'public/hero-asrama.jpg'
          src="/hero-asrama.jpg"
          alt="Asrama Nurul Hikmah - Lingkungan Islami yang Kondusif"
          className="object-cover"
          fill // Otomatis mengisi div induk
          priority // Memuat gambar ini secepatnya
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Selamat Datang di <br />
            {/* Ini akan otomatis berfungsi karena globals.css sudah benar */}
            <span className="hero-gradient bg-clip-text text-transparent">
              {siteInfo.nama}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            {siteInfo.deskripsi}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button variant="hero" size="lg" asChild className="min-w-[200px]">
              {/* DIUBAH: "to" menjadi "href" */}
              <Link href="/tentang">
                Tentang Asrama
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button variant="donation" size="lg" asChild className="min-w-[200px]">
              {/* DIUBAH: "to" menjadi "href" */}
              <Link href="/donasi">
                <Heart className="mr-2 h-5 w-5" />
                Donasi Sekarang
              </Link>
            </Button>
          </div>

          {/* Stats Preview (Ini yang hilang di versi 'jelek') */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto divide-y md:divide-y-0 md:divide-x divide-white/10">

            <div className="text-center py-4 md:py-0">
              <div className="text-3xl md:text-4xl text-accent mb-1">Iman</div>
              <div className="text-xs tracking-widest uppercase text-white/60">Pondasi Dasar</div>
            </div>

            <div className="text-center py-4 md:py-0">
              <div className="text-3xl md:text-4xl  text-accent mb-1">Adab</div>
              <div className="text-xs tracking-widest uppercase text-white/60">Penyempurna Ilmu</div>
            </div>

            <div className="text-center py-4 md:py-0">
              <div className="text-3xl md:text-4xl  text-accent mb-1">Amal</div>
              <div className="text-xs tracking-widest uppercase text-white/60">Bukti Nyata</div>
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