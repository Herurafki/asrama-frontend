import Link from 'next/link';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube } from 'lucide-react';
import { siteInfo } from '@/content/site';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 hero-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">NH</span>
              </div>
              <span className="font-bold text-lg">Asrama Nurul Hikmah</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {siteInfo.deskripsi}
            </p>
            <div className="flex space-x-3">
              {siteInfo.sosialMedia.instagram && (
                <a 
                  href={siteInfo.sosialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white hover-lift"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {siteInfo.sosialMedia.facebook && (
                <a 
                  href={siteInfo.sosialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white hover-lift"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {siteInfo.sosialMedia.youtube && (
                <a 
                  href={siteInfo.sosialMedia.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white hover-lift"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Menu Utama</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Beranda</Link></li>
              <li><Link href="/tentang" className="text-muted-foreground hover:text-foreground transition-colors">Tentang</Link></li>
              <li><Link href="/fasilitas" className="text-muted-foreground hover:text-foreground transition-colors">Fasilitas</Link></li>
              <li><Link href="/pengumuman" className="text-muted-foreground hover:text-foreground transition-colors">Pengumuman</Link></li>
              <li><Link href="/galeri" className="text-muted-foreground hover:text-foreground transition-colors">Galeri</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Layanan</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/berita" className="text-muted-foreground hover:text-foreground transition-colors">Berita</Link></li>
              <li><Link href="/pengurus" className="text-muted-foreground hover:text-foreground transition-colors">Pengurus</Link></li>
              <li><Link href="/pendaftaran" className="text-muted-foreground hover:text-foreground transition-colors">Pendaftaran</Link></li>
              <li><Link href="/donasi" className="text-muted-foreground hover:text-foreground transition-colors">Donasi</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Kontak</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{siteInfo.alamat}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">{siteInfo.telepon}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">{siteInfo.email}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Jam Kunjung: {siteInfo.jamKunjung}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom */}
      <div className="border-t bg-muted/50">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {currentYear} {siteInfo.nama}. Semua hak cipta dilindungi.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}