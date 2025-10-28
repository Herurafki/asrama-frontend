import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail } from 'lucide-react';
// Pastikan path ke siteInfo ini benar
import { siteInfo } from '@/content/site';

export const ContactSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="outline" className="mb-4">Hubungi Kami</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Kunjungi Asrama Kami
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 hero-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Alamat</h3>
                  <p className="text-muted-foreground">{siteInfo.alamat}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 hero-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Telepon</h3>
                  <p className="text-muted-foreground">{siteInfo.telepon}</p>
                  <p className="text-sm text-muted-foreground">WhatsApp: {siteInfo.whatsapp}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 hero-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-muted-foreground">{siteInfo.email}</p>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Jam Kunjung:</strong> {siteInfo.jamKunjung}
                </p>
                <Button variant="default" asChild>
                  {/* Ini sudah benar menggunakan <a> karena link eksternal */}
                  <a 
                    href={`https://wa.me/${siteInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Hubungi via WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="relative">
            <Card className="overflow-hidden">
              <div className="h-96 bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">
                  [Peta lokasi akan ditampilkan di sini]
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};