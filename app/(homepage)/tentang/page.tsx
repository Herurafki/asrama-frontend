import { Metadata } from 'next';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube } from 'lucide-react';
import { siteInfo } from '@/content/site';
import heroImage from '@/assets/hero-asrama.jpg';

export const metadata: Metadata = {
  title: 'Tentang Kami - Asrama Nurul Hikmah',
  description: 'Pelajari sejarah, visi misi, dan nilai-nilai yang menjadi fondasi Asrama Nurul Hikmah dalam membentuk generasi muslim yang berkarakter.',
  keywords: 'tentang asrama, sejarah asrama, visi misi, nilai-nilai islami, profil asrama',
  openGraph: {
    title: 'Tentang Kami - Asrama Nurul Hikmah',
    description: 'Pelajari sejarah, visi misi, dan nilai-nilai yang menjadi fondasi Asrama Nurul Hikmah dalam membentuk generasi muslim yang berkarakter.',
  },
};

export default function TentangPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Tentang Kami</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Asrama Nurul Hikmah
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Lembaga pendidikan Islam terpadu yang berkomitmen membentuk generasi muslim 
            yang berakhlak mulia, berprestasi, dan siap menghadapi tantangan zaman.
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-16">
          <Card className="overflow-hidden">
            <div className="relative h-96 md:h-[500px]">
              <Image
                src={heroImage}
                alt="Gedung Asrama Nurul Hikmah"
                fill
                className="object-cover"
                priority
              />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Sejarah */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Sejarah Singkat</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Asrama Nurul Hikmah didirikan pada tahun 2010 dengan visi menjadi lembaga 
                pendidikan Islam terdepan dalam membentuk generasi yang beriman, bertakwa, 
                dan berprestasi. Berawal dari sebuah rumah sederhana dengan 20 santri, 
                kini telah berkembang menjadi kompleks asrama modern yang menampung 
                ratusan santri dari berbagai daerah.
              </p>
              <p>
                Perjalanan panjang ini tidak lepas dari dukungan masyarakat, para donatur, 
                dan dedikasi para pengurus yang senantiasa berkomitmen memberikan 
                pendidikan terbaik bagi para santri.
              </p>
            </div>
          </div>

          {/* Visi Misi */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Visi & Misi</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Visi</h3>
              <p className="text-muted-foreground leading-relaxed bg-muted/30 p-4 rounded-lg">
                Menjadi lembaga pendidikan Islam terpadu yang unggul dalam membentuk 
                generasi muslim yang beriman, bertakwa, berakhlak mulia, dan berprestasi 
                dalam menghadapi tantangan global.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Misi</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>Menyelenggarakan pendidikan Islam yang komprehensif dan berkualitas</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>Membina akhlak mulia dan karakter Islami para santri</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>Mengembangkan potensi akademik dan non-akademik santri</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>Membangun lingkungan asrama yang kondusif untuk pembelajaran</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Informasi Kontak */}
        <Card className="p-8">
          <CardHeader>
            <CardTitle className="text-center text-2xl mb-8">Informasi Kontak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 hero-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Alamat</h3>
                <p className="text-sm text-muted-foreground">{siteInfo.alamat}</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 hero-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Telepon</h3>
                <p className="text-sm text-muted-foreground">{siteInfo.telepon}</p>
                <p className="text-xs text-muted-foreground">WA: {siteInfo.whatsapp}</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 hero-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-sm text-muted-foreground">{siteInfo.email}</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 hero-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Jam Kunjung</h3>
                <p className="text-sm text-muted-foreground">{siteInfo.jamKunjung}</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-8 pt-8 border-t text-center">
              <h3 className="font-semibold mb-4">Ikuti Kami</h3>
              <div className="flex justify-center space-x-4">
                {siteInfo.sosialMedia.instagram && (
                  <a 
                    href={siteInfo.sosialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white hover-lift"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
                {siteInfo.sosialMedia.facebook && (
                  <a 
                    href={siteInfo.sosialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white hover-lift"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                )}
                {siteInfo.sosialMedia.youtube && (
                  <a 
                    href={siteInfo.sosialMedia.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white hover-lift"
                  >
                    <Youtube className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}