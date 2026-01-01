'use client'

import { useState } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, LogIn } from 'lucide-react'; 
import { siteInfo } from '@/content/site';
import Image from 'next/image';

const navItems = [
  { name: 'Beranda', href: '/' },
  { name: 'Tentang', href: '/tentang' },
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
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-gray-200 shadow-soft">
      <div className="w-full bg-white">      
      <div className="max-w-[1400px] mx-auto px-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.png" alt="Logo" width={30} height={30}></Image>
            <div>
              <h1 className="font-bold text-foreground">{siteInfo.nama}</h1>
              {/* <p className="text-xs text-muted-foreground hidden sm:block">Asrama Terpadu Islami</p> */}
            </div>
          </Link>

          {/* Desktop Navigation & Login Button */}
          <div className="hidden lg:flex items-center space-x-1">
            <div className="flex items-center space-x-1">
                {navItems.map((item) => (
                <Link key={item.name} href={item.href}>
                    <Button
                    variant={isActive(item.href) ? "hero" : "ghost"}
                    size="sm"
                    className="transition-smooth hover-lift"
                    >
                    {item.name}
                    </Button>
                </Link>
                ))}
            </div>

            {/* Separator */}
            <div className="h-6 w-px bg-border mx-3"></div>

            {/* Login Button */}
            <Link href="/auth/login">
                <Button size="sm" className="hero-gradient text-white hover:opacity-90 transition-opacity">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                </Button>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <div className='flex justify-end'>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </div>
              </SheetTrigger>
              <SheetContent 
              side="right" 
              className="w-72 bg-white" 
            >
              <SheetHeader>
                <div className="flex items-center justify-between mb-6">
                  
                  <SheetTitle className="text-lg font-semibold">
                    Menu Navigasi
                  </SheetTitle>
        
                </div>
              </SheetHeader> 

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

              {/* Mobile Login Button Section */}
              <div className="border-t my-4"></div>
              <div className="pt-2">
                  <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                      <Button className="w-full justify-center hero-gradient text-white">
                          <LogIn className="mr-2 h-5 w-5" />
                          Login
                      </Button>
                  </Link>
              </div>
            </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      </div>
    </div>
    </nav>
  )
  ;
};