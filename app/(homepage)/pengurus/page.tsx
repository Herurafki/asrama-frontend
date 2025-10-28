import { pengurusList } from '@/content/pengurus';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, User } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pengurus Asrama - Asrama Nurul Hikmah',
  description: 'Tim pengurus dan tenaga pendidik Asrama Nurul Hikmah',
};

export default function PengurusPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Pengurus Asrama</h1>
          <p className="text-xl text-muted-foreground">
            Tim berpengalaman yang berkomitmen membimbing dan mengembangkan potensi santri
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pengurusList.map((pengurus) => (
            <Card key={pengurus.id} className="overflow-hidden hover-scale">
              {/* Foto */}
              <div className="aspect-[3/4] relative bg-muted">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                  <User className="h-24 w-24 text-muted-foreground/30" />
                </div>
                <Badge className="absolute top-4 left-4 bg-background/90 text-foreground">
                  {pengurus.jabatan}
                </Badge>
              </div>

              {/* Info */}
              <CardHeader>
                <CardTitle className="text-xl">{pengurus.nama}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {pengurus.bio && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pengurus.bio}
                  </p>
                )}

                {pengurus.kontak && (
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    asChild
                  >
                    <a
                      href={`https://wa.me/${pengurus.kontak.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Hubungi
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}