'use client';

import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { fetchBeritaBySlug } from '@/lib/data';
import { Berita } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function BeritaDetailPage() {
  const { slug } = useParams();
  const { data: berita, error, isLoading } = useSWR<Berita>(
    slug ? `/berita/${slug}` : null,
    () => fetchBeritaBySlug(slug as string)
  );
  

  if (error) {
    return (
      <div className="py-16 text-center">
        <p className="text-destructive">
          Gagal memuat detail berita. Silakan coba lagi nanti.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-4 w-1/2 mb-6" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  if (!berita) return null;

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Tombol kembali */}
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/berita">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke daftar
            </Link>
          </Button>
        </div>

        {/* Cover */}
        {berita.cover && (
          <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-8">
            <img
              src={berita.cover_url}
              alt={berita.judul}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Header */}
        <div className="mb-6">
          <Badge variant="outline" className="mb-3">
            Berita
          </Badge>
          <h1 className="text-3xl font-bold mb-2">{berita.judul}</h1>

          <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-2">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {format(new Date(berita.published_at), 'dd MMMM yyyy', { locale: localeId })}
            </div>
            {berita.author && (
              <>
                <span>•</span>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {berita.author.nama}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Isi */}
        <div className="prose prose-neutral dark:prose-invert max-w-none leading-relaxed">
        <div
          className="prose prose-neutral dark:prose-invert max-w-none leading-relaxed"
          dangerouslySetInnerHTML={{ __html: berita.isi }}
        />
        </div>
      </div>
    </div>
  );
}
