'use client'
import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from "next/link";
import { Search, Calendar, ArrowRight, Megaphone } from 'lucide-react';
import useSWR from 'swr';
import { fetchPengumuman} from '@/lib/data';

const PengumumanPage = () => {
  const { data: pengumumanList, isLoading, error } = useSWR('pengumuman', fetchPengumuman);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('semua');

  const filteredPengumuman = pengumumanList?.filter(pengumuman => {
    const matchesSearch = pengumuman.judul.toLowerCase().includes(searchTerm.toLowerCase());
    const now = new Date();
    const endDate = pengumuman.end_at ? new Date(pengumuman.end_at) : null;
    
    if (activeTab === 'berjalan') {
      return matchesSearch && pengumuman.status === 'publish' && (!endDate || endDate > now);
    } else if (activeTab === 'selesai') {
      return matchesSearch && pengumuman.status === 'publish' && endDate && endDate <= now;
    }
    return matchesSearch && pengumuman.status === 'publish';
  }) || [];

  const isActive = (pengumuman: any) => {
    if (!pengumuman.end_at) return true;
    return new Date(pengumuman.end_at) > new Date();
  };

  if (error) {
    return (
      <Layout title="Pengumuman - Asrama Nurul Hikmah">
        <div className="container mx-auto px-4 py-16">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Gagal memuat pengumuman. Silakan coba lagi nanti.</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title="Pengumuman Terbaru - Asrama Nurul Hikmah"
      description="Informasi dan pengumuman terbaru dari Asrama Nurul Hikmah. Dapatkan update terkini mengenai kegiatan, pendaftaran, dan informasi penting lainnya."
      keywords="pengumuman asrama, informasi terbaru, pendaftaran santri, kegiatan asrama"
    >
      {/* Header */}
      <section className="py-16 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-3">
              <Megaphone className="h-6 w-6 text-white" />
            </div>
            <Badge variant="secondary" className="text-primary">Informasi Terbaru</Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Pengumuman & Informasi
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Dapatkan informasi terbaru mengenai kegiatan, pendaftaran, dan berbagai program di asrama
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Search and Filter */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Cari pengumuman..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="semua">Semua</TabsTrigger>
                    <TabsTrigger value="berjalan">Sedang Berjalan</TabsTrigger>
                    <TabsTrigger value="selesai">Sudah Selesai</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>

            {/* Loading State */}
            {isLoading && (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
                      <div className="h-3 bg-muted rounded w-full"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Pengumuman List */}
            {!isLoading && (
              <div className="space-y-6">
                {filteredPengumuman.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Megaphone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Belum Ada Pengumuman</h3>
                      <p className="text-muted-foreground">
                        {searchTerm ? 'Tidak ada pengumuman yang sesuai dengan pencarian.' : 'Pengumuman akan ditampilkan di sini.'}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredPengumuman.map((pengumuman) => (
                    <Card key={pengumuman.id} className="hover-lift group">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              {pengumuman.pinned && (
                                <Badge variant="default">Penting</Badge>
                              )}
                              <Badge variant={isActive(pengumuman) ? "default" : "secondary"}>
                                {isActive(pengumuman) ? "Aktif" : "Selesai"}
                              </Badge>
                            </div>
                            <CardTitle className="text-xl group-hover:text-primary transition-colors">
                              {pengumuman.judul}
                            </CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center text-sm text-muted-foreground space-x-4">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {new Date(pengumuman.created_at).toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'long', 
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                            {pengumuman.end_at && (
                              <span>
                                Berlaku hingga: {new Date(pengumuman.end_at).toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric'
                                })}
                              </span>
                            )}
                          </div>

                          <p className="text-muted-foreground leading-relaxed">
                            {pengumuman.isi.length > 200 
                              ? `${pengumuman.isi.substring(0, 200)}...` 
                              : pengumuman.isi
                            }
                          </p>

                          <div className="pt-2">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/pengumuman/${pengumuman.slug}`}>
                                Baca Selengkapnya
                                <ArrowRight className="ml-1 h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PengumumanPage;