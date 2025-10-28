'use client';

import useSWR from 'swr';
import { fetchBerita } from '@/lib/data';
import { Berita } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


function BeritaCard({ berita }: { berita: Berita }) {
  return (
    <Card className="overflow-hidden hover-scale group cursor-pointer">
      {berita.cover && (
        <div className="aspect-[16/9] relative bg-muted overflow-hidden">
          <img
            src={berita.cover_url}
            alt={berita.judul}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
          />
          <Badge className="absolute top-3 left-3 bg-primary">
            Berita
          </Badge>
        </div>
      )}
      <CardHeader>
        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
          {berita.judul}
        </CardTitle>
        <CardDescription className="flex flex-wrap items-center gap-3 text-xs">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {format(new Date(berita.published_at), 'dd MMM yyyy', { locale: id })}
          </span>
          {berita.author && (
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {berita.author.nama}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {berita.ringkasan}
        </p>
        <Button asChild variant="link" className="p-0 h-auto">
          <Link href={`/berita/${berita.slug}`}>
            Baca Selengkapnya
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function BeritaSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-[16/9] w-full" />
      <CardHeader>
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  );
}

export default function BeritaPage() {
  const { data: berita, error, isLoading } = useSWR<Berita[]>('berita', fetchBerita);

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Berita & Artikel</h1>
          <p className="text-xl text-muted-foreground">
            Update terbaru dan artikel menarik seputar kegiatan Asrama Nurul Hikmah
          </p>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <BeritaSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <Card className="bg-destructive/10 border-destructive">
            <CardContent className="p-8 text-center">
              <p className="text-destructive font-medium">
                Gagal memuat berita. Silakan coba lagi nanti.
              </p>
            </CardContent>
          </Card>
        ) : berita && berita.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {berita.map((item) => (
              <BeritaCard key={item.id} berita={item} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground text-lg">
                Belum ada berita tersedia
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}