import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube } from 'lucide-react';
import { siteInfo } from '@/content/site';

export const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 hero-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">NH</span>
              </div>
              <h3 className="font-bold text-lg">{siteInfo.nama}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {siteInfo.deskripsi}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Tautan Cepat</h4>
            <div className="space-y-2">
              {[
                { name: 'Tentang Kami', href: '/tentang' },
                { name: 'Fasilitas', href: '/fasilitas' },
                { name: 'Pengumuman', href: '/pengumuman' },
                { name: 'Galeri', href: '/galeri' }
              ].map((link) => (
                <Link key={link.name} to={link.href}>
                  <Button variant="ghost" size="sm" className="p-0 h-auto font-normal text-muted-foreground hover:text-foreground">
                    {link.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold">Layanan</h4>
            <div className="space-y-2">
              {[
                { name: 'Pendaftaran Santri', href: '/pendaftaran' },
                { name: 'Program Tahfidz', href: '/fasilitas' },
                { name: 'Beasiswa', href: '/pengumuman' },
                { name: 'Donasi', href: '/donasi' }
              ].map((link) => (
                <Link key={link.name} to={link.href}>
                  <Button variant="ghost" size="sm" className="p-0 h-auto font-normal text-muted-foreground hover:text-foreground">
                    {link.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold">Kontak Kami</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{siteInfo.alamat}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{siteInfo.telepon}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{siteInfo.email}</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-2">
              <h5 className="text-sm font-medium">Ikuti Kami</h5>
              <div className="flex space-x-2">
                {siteInfo.sosialMedia.instagram && (
                  <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                    <a href={siteInfo.sosialMedia.instagram} target="_blank" rel="noopener noreferrer">
                      <Instagram className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {siteInfo.sosialMedia.facebook && (
                  <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                    <a href={siteInfo.sosialMedia.facebook} target="_blank" rel="noopener noreferrer">
                      <Facebook className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {siteInfo.sosialMedia.youtube && (
                  <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                    <a href={siteInfo.sosialMedia.youtube} target="_blank" rel="noopener noreferrer">
                      <Youtube className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />
        
        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 {siteInfo.nama}. Hak Cipta Dilindungi.
          </p>
          <p className="text-sm text-muted-foreground">
            Jam Kunjung: {siteInfo.jamKunjung}
          </p>
        </div>
      </div>
    </footer>
  );
};