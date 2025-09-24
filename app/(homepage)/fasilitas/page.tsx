import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { fasilitasList } from '@/content/fasilitas';
import { LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const FasilitasPage = () => {
  const getIconComponent = (iconName: string): LucideIcon => {
    const IconComponent = (LucideIcons as any)[iconName.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('')] || (LucideIcons as any)[iconName] || LucideIcons.Home;
    return IconComponent;
  };

  const featuredFacilities = fasilitasList.filter(f => f.featured);
  const otherFacilities = fasilitasList.filter(f => !f.featured);

  return (
    <Layout 
      title="Fasilitas Lengkap - Asrama Nurul Hikmah"
      description="Fasilitas lengkap dan modern di Asrama Nurul Hikmah: kamar ber-AC, masjid, ruang belajar, laboratorium komputer, klinik kesehatan, dan fasilitas penunjang lainnya."
      keywords="fasilitas asrama, kamar santri, masjid, laboratorium, klinik kesehatan, perpustakaan, lapangan olahraga"
    >
      {/* Header */}
      <section className="py-16 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4 text-primary">Fasilitas Lengkap</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Fasilitas Terlengkap untuk Santri
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Didukung fasilitas modern dan lengkap untuk mendukung proses pembelajaran, 
            pembinaan karakter, dan kehidupan sehari-hari santri
          </p>
        </div>
      </section>

      {/* Fasilitas Unggulan */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Fasilitas Unggulan</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Fasilitas Utama Kami
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Fasilitas utama yang menjadi keunggulan asrama dalam mendukung pendidikan dan pembinaan santri
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredFacilities.map((fasilitas) => {
              const IconComponent = getIconComponent(fasilitas.ikon);
              
              return (
                <Card key={fasilitas.id} className="hover-lift group h-full">
                  <CardHeader>
                    <div className="w-14 h-14 hero-gradient rounded-lg flex items-center justify-center mb-4 group-hover:shadow-glow transition-smooth">
                      <IconComponent className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-xl">{fasilitas.nama}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {fasilitas.deskripsi}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fasilitas Penunjang */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Fasilitas Penunjang
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Fasilitas tambahan yang melengkapi kebutuhan santri dalam berbagai aspek kehidupan sehari-hari
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {otherFacilities.map((fasilitas) => {
              const IconComponent = getIconComponent(fasilitas.ikon);
              
              return (
                <Card key={fasilitas.id} className="hover-lift group">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 hero-gradient rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-smooth">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{fasilitas.nama}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {fasilitas.deskripsi}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Info Tambahan */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-3">Komitmen Kualitas Fasilitas</h3>
                  <p className="text-muted-foreground">
                    Kami berkomitmen untuk terus meningkatkan kualitas fasilitas demi kenyamanan dan kemudahan santri
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary mb-2">24/7</div>
                    <p className="text-sm text-muted-foreground">Keamanan & Maintenance</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary mb-2">100%</div>
                    <p className="text-sm text-muted-foreground">Kamar Ber-AC</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary mb-2">Modern</div>
                    <p className="text-sm text-muted-foreground">Teknologi Terkini</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FasilitasPage;