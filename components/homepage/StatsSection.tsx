// components/homepage/StatsSection.tsx

// --- KODE INI BISA LANGSUNG DISALIN ---

import { Card, CardContent } from '@/components/ui/card';
import { Users, Home, Calendar, Award } from 'lucide-react';
import { stats } from '@/content/site';

export const StatsSection = () => {
  const statsData = [
    {
      icon: Users,
      label: 'Santri Aktif',
      value: stats.siswaAktif,
      suffix: '+',
      description: 'Santri dari berbagai daerah'
    },
    {
      icon: Home,
      label: 'Kamar Tersedia',
      value: stats.kamar,
      suffix: '',
      description: 'Kamar nyaman ber-AC'
    },
    {
      icon: Calendar,
      label: 'Kegiatan per Tahun',
      value: stats.kegiatanTahun,
      suffix: '+',
      description: 'Program pembinaan rutin'
    },
    {
      icon: Award,
      label: 'Prestasi Diraih',
      value: 45, // Kamu bisa ganti ini ke stats.prestasi jika ada
      suffix: '+',
      description: 'Berbagai kompetisi'
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Asrama dalam Angka
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Bukti nyata komitmen kami dalam memberikan pendidikan berkualitas dan pembinaan karakter terbaik
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <Card key={index} className="hover-lift bg-background/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 hero-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">
                    {stat.value.toLocaleString()}{stat.suffix}
                  </div>
                  <h3 className="font-semibold text-foreground">{stat.label}</h3>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};