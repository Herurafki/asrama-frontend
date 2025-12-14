import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail } from 'lucide-react';
// Pastikan path ke siteInfo ini benar
import { siteInfo } from '@/content/site';

export const ContactSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
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
                <Button variant="hero" asChild>
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
          <Card className="overflow-hidden border-gray-200">
            <div className="h-96 w-full">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.738818346967!2d100.37182247472384!3d-0.8658606991257465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4c7209d5b5893%3A0x4f1229617c1dedf2!2sMis%20Qur&#39;an%20Al%20falah!5e0!3m2!1sen!2sid!4v1764402630900!5m2!1sen!2sid" 
             width="100%" 
             height="100%" 
             style={{ border: 0 }} 
             allowFullScreen 
             loading="lazy" 
             referrerPolicy="no-referrer-when-downgrade">
             </iframe>
            </div>
          </Card>
          </div>
        </div>
      </div>
    </section>
  );
};