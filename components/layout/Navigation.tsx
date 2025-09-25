'use client'

import { useState } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { siteInfo } from '@/content/site';

const navItems = [
  { name: 'Beranda', href: '/' },
  { name: 'Tentang', href: '/tentang' },
  { name: 'Fasilitas', href: '/fasilitas' },
  { name: 'Pengumuman', href: '/pengumuman' },
  { name: 'Galeri', href: '/galeri' },
  { name: 'Berita', href: '/berita' },
  { name: 'Pengurus', href: '/pengurus' },
  { name: 'Pendaftaran', href: '/pendaftaran' },
  { name: 'Donasi', href: '/donasi' }
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 hero-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">NH</span>
            </div>
            <div>
              <h1 className="font-bold text-foreground">{siteInfo.nama}</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Asrama Terpadu Islami</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive(item.href) ? "default" : "ghost"}
                  size="sm"
                  className="transition-smooth hover-lift"
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Menu Navigasi</h2>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                  >
                    <Button
                      variant={isActive(item.href) ? "default" : "ghost"}
                      className="w-full justify-start transition-smooth"
                    >
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};