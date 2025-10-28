'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Search, Calendar, ArrowRight } from 'lucide-react';
import useSWR from 'swr';
import { fetchPengumuman } from '@/lib/data';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Pengumuman } from '@/types';

export default function PengumumanPage() {
  const { data: pengumumanList, error, isLoading } = useSWR('/pengumuman', fetchPengumuman);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('semua');
  const [sortOrder, setSortOrder] = useState('terbaru');

  const filteredPengumuman = pengumumanList?.filter((item: Pengumuman) => {
    const matchesSearch = item.judul?.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterStatus === 'sedang-berjalan') {
      const now = new Date();
      const startDate = item.start_at ? new Date(item.start_at) : null;
      const endDate = item.end_at ? new Date(item.end_at) : null;
      return matchesSearch && startDate && endDate && now >= startDate && now <= endDate;
    } else if (filterStatus === 'sudah-selesai') {
      const now = new Date();
      const endDate = item.end_at ? new Date(item.end_at) : null;
      return matchesSearch && endDate && now > endDate;
    }

    return matchesSearch && item.status === 'publish';
  })?.sort((a : Pengumuman, b: Pengumuman) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return sortOrder === 'terbaru' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
  });

  if (error) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-destructive">Gagal memuat pengumuman. Silakan coba lagi nanti.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Pengumuman
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Pengumuman Terbaru</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Dapatkan informasi terkini seputar kegiatan, program, dan pengumuman penting dari Asrama Nurul Hikmah.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari pengumuman..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semua">Semua</SelectItem>
              <SelectItem value="sedang-berjalan">Sedang Berjalan</SelectItem>
              <SelectItem value="sudah-selesai">Sudah Selesai</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="terbaru">Terbaru</SelectItem>
              <SelectItem value="terlama">Terlama</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pengumuman List */}
        {!isLoading && filteredPengumuman && (
          <>
            {filteredPengumuman.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">Tidak ada pengumuman yang ditemukan.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPengumuman.map((item: Pengumuman) => (
                  <Card key={item.id} className="hover-lift">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-lg leading-tight">{item.judul}</CardTitle>
                        {item.pinned && (
                          <Badge variant="default" className="ml-2">
                            Penting
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{format(new Date(item.created_at), 'dd MMMM yyyy', { locale: id })}</span>
                      </div>

                      {item.start_at && item.end_at && (
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Periode: </span>
                          {format(new Date(item.start_at), 'dd MMM', { locale: id })} -{' '}
                          {format(new Date(item.end_at), 'dd MMM yyyy', { locale: id })}
                        </div>
                      )}
                    </CardHeader>

                    <CardContent>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                        {item.isi?.length > 150 ? `${item.isi.substring(0, 150)}...` : item.isi}
                      </p>

                      <Button variant="ghost" size="sm" className="p-0 h-auto" asChild>
                        <Link href={`/pengumuman/${item.slug}`}>
                          Baca Selengkapnya
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
