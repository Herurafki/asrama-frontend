'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import useSWR from 'swr';
import { fetchPengumuman } from '@/lib/data';

export function PengumumanBanner() {
  const { data: pengumumanList } = useSWR('/pengumuman', fetchPengumuman);

  const activePengumuman = pengumumanList
  ?.filter((p: { status: string; }) => p.status === "publik")
  ?.sort((a: { created_at: string | number | Date; }, b: { created_at: string | number | Date; }) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  [0];


  if (!activePengumuman) return null;

  return (
  <section className="hidden md:block w-full bg-primary/10 border-b py-2">
    <div className="max-w-[1400px] mx-auto px-6">
      <Card className="border-primary/20 bg-primary/5 mt-3 mb-3 py-2">
        <CardContent className="flex items-center justify-between py-1.5 px-6">
          <div className="flex items-center space-x-3">
            <Badge variant="default" className="text-xs py-0.5 px-2" >Pengumuman Terbaru</Badge>
            <h3 className="font-semibold text-foreground">
              {activePengumuman.judul}
            </h3>
          </div>

          <Button variant="ghost" size="sm" className="text-sm h-7 px-2" asChild>
            <Link href={`/pengumuman/${activePengumuman.slug}`}>
              Baca Selengkapnya
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>

        </CardContent>
      </Card>
    </div>
  </section>
  );
}