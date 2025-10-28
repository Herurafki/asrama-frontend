'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import useSWR from 'swr';
import { fetchPengumuman } from '@/lib/data';

export function PengumumanBanner() {
  const { data: pengumumanList } = useSWR('pengumuman', fetchPengumuman);
  const activePengumuman = pengumumanList?.find((p: { pinned: any; status: string; }) => p.pinned && p.status === 'publish');

  if (!activePengumuman) return null;

  return (
    <section className="py-4 bg-primary/10 border-b">
      <div className="container mx-auto px-4">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Badge variant="default">Pengumuman Penting</Badge>
                <h3 className="font-semibold text-foreground">{activePengumuman.judul}</h3>
              </div>
              <Button variant="ghost" size="sm" asChild>
                {/* UBAH "to" MENJADI "href" */}
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
  );
}