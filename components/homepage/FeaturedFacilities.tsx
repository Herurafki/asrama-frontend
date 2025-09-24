import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { fasilitasList } from '@/content/fasilitas';
import { LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

export const FeaturedFacilities = () => {
  const featuredFacilities = fasilitasList.filter(f => f.featured).slice(0, 6);

  const getIconComponent = (iconName: string): LucideIcon => {
    const IconComponent = (LucideIcons as any)[iconName.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('')] || (LucideIcons as any)[iconName] || LucideIcons.Home;
    return IconComponent;
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Fasilitas Unggulan</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Fasilitas Terlengkap untuk Kenyamanan Santri
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Didukung fasilitas modern dan lengkap untuk mendukung proses pembelajaran dan kehidupan sehari-hari santri
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredFacilities.map((fasilitas) => {
            const IconComponent = getIconComponent(fasilitas.ikon);
            
            return (
              <Card key={fasilitas.id} className="hover-lift group">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 hero-gradient rounded-lg flex items-center justify-center mb-3 group-hover:shadow-glow transition-smooth">
                    <IconComponent className="h-6 w-6 text-white" />
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

        <div className="text-center">
          <Button variant="cta" size="lg" asChild>
            <Link to="/fasilitas">
              Lihat Semua Fasilitas
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};