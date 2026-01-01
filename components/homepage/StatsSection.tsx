
import { Card, CardContent } from '@/components/ui/card';
import { Users, Award, GraduationCap, CupSoda } from 'lucide-react';
import { stats } from '@/content/site';

export const StatsSection = () => {
  const statsData = [
    {
      icon: Users,
      label: 'Anak Asuh',
      value: stats.siswaAktif,
      suffix: '+',
      description: 'Tinggal dan belajar di asrama'
    },
    {
      icon: GraduationCap,
      label: 'Alumni',
      value: stats.kamar,
      suffix: '',
      description: 'Telah Menyelesaikan Pendidikan Dasar'
    },
    {
      icon: CupSoda,
      label: 'Porsi Makan',
      value: stats.kegiatanTahun,
      suffix: '+',
      description: 'Disediakan Setiap Bulan'
    },
    {
      icon: Award,
      label: 'Dana Langsung',
      value: 85, 
      suffix: '%',
      description: 'Transparansi & Amanah'
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Dampak Nyata dari Kebaikan Anda
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Setiap dukungan yang Anda berikan membantu kami menjaga harapan anak-anak di asrama ini.
          Angka-angka berikut adalah bukti bahwa kepedulian kecil bisa menciptakan perubahan besar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <Card key={index} className="hover-lift group border-gray-200 shadow-xl">
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