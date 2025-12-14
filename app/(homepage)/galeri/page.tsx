'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { fetchAlbums } from '@/lib/data';
import { Album } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { ImageIcon, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';


function AlbumCard({ album, onClick }: { album: Album; onClick: () => void }) {
  return (
    <Card className="overflow-hidden hover-scale group cursor-pointer"
    onClick={onClick}>
      <div className="aspect-[4/3] relative bg-muted overflow-hidden">
        {album.cover ? (
          <img
            src={album.cover_url}
            alt={album.judul}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="h-16 w-16 text-muted-foreground/50" />
          </div>
        )}
        {album.total_foto && (
          <Badge className="absolute top-3 right-3 bg-accent">
            {album.total_foto} Foto
          </Badge>
        )}
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{album.judul}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {format(new Date(album.created_at), 'dd MMMM yyyy', { locale: id })}
        </CardDescription>
      </CardHeader>
      {album.deskripsi && (
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {album.deskripsi}
          </p>
        </CardContent>
      )}
    </Card>
  );
}

function AlbumSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-[4/3] w-full" />
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
    </Card>
  );
}

export default function GaleriPage() {
  const { data: albums, error, isLoading } = useSWR<Album[]>('albums', fetchAlbums);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <section className="py-16 hero-gradient text-white">
        {/* Header */}
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Galeri Foto
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Dokumentasi kegiatan dan kehidupan sehari-hari di Asrama Nurul Hikmah
            </p>
          </div>
    </section>

    <div className="max-w-[1400px] mx-auto px-6 md:px-10">
      <div className="py-16">
        {/* Content */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <AlbumSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <Card className="bg-destructive/10 border-destructive">
            <CardContent className="p-8 text-center">
              <p className="text-destructive font-medium">
                Gagal memuat galeri. Silakan coba lagi nanti.
              </p>
            </CardContent>
          </Card>
        ) : albums && albums.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} onClick={() => {
                setSelectedAlbum(album);
                setIsOpen(true);
              }}/>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <ImageIcon className="h-14 w-14 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                Belum ada album tersedia
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>

    {isOpen && selectedAlbum && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-xl animate-in fade-in zoom-in">

            {/* Modal Header */}
            <div className="p-4 border-b flex text-center items-center justify-between">
              
              <button
                className="text-gray-600 hover:text-black"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Daftar Foto */}
            <div className="p-4 overflow-y-auto max-h-[75vh]">
              {selectedAlbum.gambars && selectedAlbum.gambars.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedAlbum.gambars.map((foto) => (
                    <div
                      key={foto.id}
                      className="aspect-square overflow-hidden"
                    >
                      <img
                        src={foto.url}
                        className="w-full h-full object-cover "
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-10">
                  Belum ada foto dalam album ini
                </p>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
}