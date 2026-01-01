import React from 'react';
import { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, Eye, Target } from 'lucide-react';
import { siteInfo, visiMisi, sejarahSingkat } from '@/content/site';
import { Separator } from '@radix-ui/react-select';

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
    <>
        {/* Header */}
        <section className="py-16 hero-gradient text-white">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-4 text-primary">Tentang Kami</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {siteInfo.nama}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Mengenal lebih dekat sejarah, visi misi, dan komitmen kami dalam mencetak generasi muslim yang unggul
            </p>
          </div>
        </section>

        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          {/* Sejarah */}
          <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Sejarah Singkat</h2>
                <p className="text-muted-foreground text-lg">Perjalanan panjang dalam membangun generasi muslim yang berakhlak mulia</p>
              </div>

              <Card className="mb-12">
                <CardContent className="p-8">
                  <div className="prose prose-lg max-w-none">
                    {sejarahSingkat.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-muted-foreground leading-relaxed mb-6 last:mb-0">
                        {paragraph.trim()}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        

        {/* Visi Misi */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Visi & Misi</h2>
              <p className="text-muted-foreground text-lg">Fondasi dan arah pengembangan asrama</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Visi */}
              <Card className="hover-lift">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 hero-gradient rounded-lg flex items-center justify-center">
                      <Eye className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-2xl">Visi</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {visiMisi.visi}
                  </p>
                </CardContent>
              </Card>

              {/* Misi */}
              <Card className="hover-lift">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 hero-gradient rounded-lg flex items-center justify-center">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-2xl">Misi</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {visiMisi.misi.map((item, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 hero-gradient rounded-full mt-2 shrink-0"></div>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>


      {/* Informasi Kontak & Kunjung */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Informasi Kunjungan</h2>
              <p className="text-muted-foreground text-lg">Jadwal dan informasi kontak untuk kunjungan</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Kontak */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle>Informasi Kontak</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Alamat</p>
                      <p className="text-muted-foreground text-sm">{siteInfo.alamat}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Telepon</p>
                      <p className="text-muted-foreground text-sm">{siteInfo.telepon}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-muted-foreground text-sm">{siteInfo.whatsapp}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground text-sm">{siteInfo.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Jam Kunjung */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle>Jadwal Kunjungan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-3 mb-4">
                    <Clock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Jam Kunjung</p>
                      <p className="text-muted-foreground text-sm">{siteInfo.jamKunjung}</p>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p><strong>Catatan Penting:</strong></p>
                    <ul className="space-y-2 ml-4">
                      <li>• Harap konfirmasi kunjungan melalui akun orang tua</li>
                      <li>• Kunjungan di luar jam tersebut dapat diatur sesuai dengan persetujuan pengurus</li>
                      <li>• Pengunjung diminta berpakaian sopan dan islami</li>
                      <li>• Kunjungan ke area santri putri memiliki aturan khusus</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      </div>
      </>
  );
}