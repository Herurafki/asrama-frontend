'use client';

import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { fetchPengumumanBySlug } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PengumumanDetailPage() {
  const { slug } = useParams();
  if (Array.isArray(slug)) {
    // Handle the case where slug is an array
    return <div>Error: Invalid slug</div>;
  }
  const { data: pengumuman, error, isLoading } = useSWR(slug ? `/pengumuman/${slug}` : null, () =>
    fetchPengumumanBySlug(slug ?? '')
  );

  if (error) {
    return (
      <div className="py-16 text-center">
        <p className="text-destructive">Gagal memuat detail pengumuman. Silakan coba lagi nanti.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-1/2 mb-6" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (!pengumuman) return null;

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Tombol kembali */}
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/pengumuman">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke daftar
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="mb-6">
          <Badge variant="outline" className="mb-3">
            Pengumuman
          </Badge>
          <h1 className="text-3xl font-bold mb-2">{pengumuman.judul}</h1>

          <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-2">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {format(new Date(pengumuman.created_at), 'dd MMMM yyyy', { locale: id })}
            </div>

            {pengumuman.start_at && pengumuman.end_at && (
              <span className="ml-2">
                • Periode:{' '}
                {format(new Date(pengumuman.start_at), 'dd MMM', { locale: id })} -{' '}
                {format(new Date(pengumuman.end_at), 'dd MMM yyyy', { locale: id })}
              </span>
            )}

            {pengumuman.status === 'publish' && (
              <Badge className="ml-2" variant="default">
                Aktif
              </Badge>
            )}
          </div>
        </div>

        {/* Isi */}
        <div className="prose prose-neutral dark:prose-invert max-w-none leading-relaxed">
          <p className="text-lg whitespace-pre-line">{pengumuman.isi}</p>
        </div>
      </div>
    </div>
  );
}
