"use client";

import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/homepage/HeroSection";
import { StatsSection } from "@/components/homepage/StatsSection";
import { FeaturedFacilities } from "@/components/homepage/FeaturedFacilities";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import { siteInfo } from "@/content/site";
import useSWR from "swr";
import { fetchPengumuman } from "@/lib/data";

export default function HomeClient() {
  const { data: pengumumanList } = useSWR("pengumuman", fetchPengumuman);
  const activePengumuman = pengumumanList?.find(
    (p) => p.pinned && p.status === "publish"
  );

  return (
    <Layout
      title="Asrama Nurul Hikmah - Asrama Terpadu Islami Terbaik"
      description="Asrama terpadu yang mengembangkan akhlak mulia, prestasi akademik, dan kemandirian santri dalam lingkungan Islami yang kondusif. Fasilitas lengkap, program tahfidz, dan pembinaan karakter terbaik."
      keywords="asrama terbaik, pesantren modern, pendidikan islam, santri, tahfidz, boarding school, islamic education"
    >
      <HeroSection />

      {/* Banner Pengumuman */}
      {activePengumuman && (
        <section className="py-4 bg-primary/10 border-b">
          <div className="container mx-auto px-4">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant="default">Pengumuman Penting</Badge>
                    <h3 className="font-semibold text-foreground">
                      {activePengumuman.judul}
                    </h3>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/pengumuman/${activePengumuman.slug}`}>
                      Baca Selengkapnya
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      <StatsSection />
      <FeaturedFacilities />

      {/* CTA Donasi */}
      <section className="py-16 warm-gradient">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Dukung Pendidikan Santri
            </h2>
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              Berpartisipasilah dalam membangun generasi muslim yang berakhlak
              mulia. Setiap donasi Anda sangat berarti untuk kemajuan pendidikan
              di asrama.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link href="/donasi">
                  Donasi Sekarang
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/tentang">Pelajari Lebih Lanjut</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Kontak & Peta */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">
                Hubungi Kami
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Kunjungi Asrama Kami
              </h2>
              <div className="space-y-6">
                {/* alamat */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 hero-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Alamat</h3>
                    <p className="text-muted-foreground">{siteInfo.alamat}</p>
                  </div>
                </div>
                {/* telepon */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 hero-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Telepon</h3>
                    <p className="text-muted-foreground">{siteInfo.telepon}</p>
                    <p className="text-sm text-muted-foreground">
                      WhatsApp: {siteInfo.whatsapp}
                    </p>
                  </div>
                </div>
                {/* email */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 hero-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">{siteInfo.email}</p>
                  </div>
                </div>
                {/* jam kunjung */}
                <div className="pt-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Jam Kunjung:</strong> {siteInfo.jamKunjung}
                  </p>
                  <Button variant="default" asChild>
                    <a
                      href={`https://wa.me/${siteInfo.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Hubungi via WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </div>
            {/* peta */}
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
    </Layout>
  );
}
