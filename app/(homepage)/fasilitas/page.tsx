import { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fasilitasList } from '@/content/fasilitas';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Fasilitas - Asrama Nurul Hikmah',
  description: 'Fasilitas lengkap dan modern di Asrama Nurul Hikmah untuk mendukung pembelajaran dan kehidupan santri yang nyaman dan kondusif.',
  keywords: 'fasilitas asrama, kamar santri, ruang belajar, masjid, perpustakaan, kantin, lapangan olahraga',
  openGraph: {
    title: 'Fasilitas - Asrama Nurul Hikmah',
    description: 'Fasilitas lengkap dan modern di Asrama Nurul Hikmah untuk mendukung pembelajaran dan kehidupan santri yang nyaman dan kondusif.',
  },
};

export default function FasilitasPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Fasilitas</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Fasilitas Lengkap & Modern
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Asrama Nurul Hikmah dilengkapi dengan berbagai fasilitas modern untuk mendukung 
            pembelajaran, pengembangan diri, dan kehidupan sehari-hari para santri.
          </p>
        </div>

        {/* Fasilitas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fasilitasList.map((item) => (
            <Card key={item.id} className="hover-lift overflow-hidden">
              {item.gambar && (
                <div className="relative h-48">
                  <Image
                    src={item.gambar}
                    alt={item.nama}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 hero-gradient rounded-lg flex items-center justify-center">
                    <span className="text-2xl">{item.ikon}</span>
                  </div>
                  <CardTitle className="text-xl">{item.nama}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {item.deskripsi}
                </p>
                {item.featured && (
                  <Badge variant="secondary" className="mt-3">
                    Fasilitas Unggulan
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-muted/30 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">
            Kunjungi Fasilitas Kami
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Jadwalkan kunjungan Anda untuk melihat langsung fasilitas-fasilitas 
            modern yang tersedia di Asrama Nurul Hikmah.
          </p>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Jadwalkan Kunjungan
          </a>
        </div>
      </div>
    </div>
  );
}