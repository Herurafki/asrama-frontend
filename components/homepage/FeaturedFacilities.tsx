import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, BookOpen, Utensils, Bed, Moon } from 'lucide-react';

export const FeaturedFacilities = () => {
  const ruangMakna = [
    {
      id: 1,
      icon: BookOpen,
      title: 'Ruang Belajar & Tahfidz',
      desc: 'Fasilitas untuk mengerjakan tugas sekolah dan setoran hafalan Qur\'an. Kami mendampingi mereka agar sukses dunia dan akhirat.',
    },
    {
      id: 2,
      icon: Utensils,
      title: 'Ruang Makan Bersama',
      desc: 'Tempat anak asuh mendapatkan gizi yang layak. Kami memastikan mereka tidak pernah kelaparan dan tumbuh sehat dari sedekah Anda.',
    },
    {
      id: 3,
      icon: Bed,
      title: 'Kamar Tidur Nyaman',
      desc: 'Tempat istirahat yang bersih dan aman. Bagi sebagian anak, ini adalah pertama kalinya mereka memiliki kasur yang layak untuk tidur.',
    },
    {
      id: 4,
      icon: Moon,
      title: 'Musholla Panti',
      desc: 'Jantung kegiatan rohani. Di sinilah anak-anak sholat berjamaah dan rutin mendoakan kebaikan bagi para orang tua asuh (donatur).',
    },
    {
      id: 5,
      icon: Heart,
      title: 'Ruang Keluarga',
      desc: 'Area santai untuk menonton edukasi atau bercerita. Di sini kami membangun rasa persaudaraan agar mereka tidak merasa sendiri.',
    },
  ]

  return (
    <section className="py-16 bg-muted/40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 rounded-full border-gray-200 px-2.5 py-0.5 ">Cerita dari Rumah Kami</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ruang Sederhana, Penuh Arti
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Setiap sudut asrama kami menyimpan kisah perjuangan dan harapan. 
            Dengan dukungan Anda, kami bisa menjaganya tetap hangat dan penuh cinta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {ruangMakna.map((ruang) => (
            <Card key={ruang.id} className="hover-lift group border-gray-200 shadow-xl">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 hero-gradient rounded-lg flex items-center justify-center mb-3 group-hover:shadow-glow transition-smooth">
                  <ruang.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold">{ruang.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {ruang.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="cta" size="lg" asChild>
            <Link href="/donasi">
              Bantu Kami Berkembang
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
