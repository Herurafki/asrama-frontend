'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  CheckCircle,
  FileText,
  Users,
  Calendar,
  MessageCircle,
  UserPlus,
  BookOpen,
  Award,
  HelpCircle,
  HeartHandshake,
} from 'lucide-react';

// --- DATA ---


const persyaratan = [
  'Surat Keterangan Tidak Mampu (SKTM) dari desa/kelurahan',
  'Fotokopi Kartu Keluarga (1 lembar)',
  'Fotokopi Akta Kelahiran (1 lembar)',
  'Pas foto 3x4 berwarna (4 lembar)',
  'Surat keterangan sehat dari dokter',
  'Surat pernyataan orang tua/wali (jika ada)',
];


const kriteriaPenerimaan = [
  {
    icon: CheckCircle,
    title: 'Yatim / Piatu',
    desc: 'Diperuntukkan bagi anak yang telah kehilangan ayah, ibu, atau kedua orang tua.',
  },
  {
    icon: CheckCircle,
    title: 'Kaum Dhuafa',
    desc: 'Berasal dari keluarga dengan keterbatasan ekonomi yang terbukti (dibuktikan dengan SKTM).',
  },
  {
    icon: CheckCircle,
    title: 'Usia Sekolah',
    desc: 'Berada dalam rentang usia pendidikan (SD/SMP/SMA) dan memiliki kemauan kuat untuk belajar.',
  },
  {
    icon: CheckCircle,
    title: 'Bersedia Diasramakan',
    desc: 'Sanggup untuk tinggal di asrama dan mengikuti seluruh program pembinaan.',
  },
];


const alurSteps = [
  { no: 1, title: 'Pengisian Formulir', desc: 'Isi formulir pendaftaran online atau datang langsung ke panti.' },
  { no: 2, title: 'Verifikasi Berkas & Survei', desc: 'Tim kami akan memverifikasi kelengkapan berkas dan mungkin melakukan kunjungan (survei).' },
  { no: 3, title: 'Silaturahmi & Wawancara', desc: 'Wawancara dengan calon santri dan orang tua/wali (jika ada).' },
  { no: 4, title: 'Pengumuman Hasil Seleksi', desc: 'Pengumuman hasil seleksi via WhatsApp/Email/Papan Pengumuman.' },
  { no: 5, title: 'Konfirmasi Ulang', desc: 'Konfirmasi kedatangan dan penandatanganan berkas asrama.' },
];


const programUnggulan = [
  {
    icon: BookOpen,
    title: 'Tahfidz & Studi Agama',
    desc: 'Program intensif menghafal Al-Quran dan kajian kitab dengan bimbingan ustadz.',
  },
  {
    icon: Award,
    title: 'Pendidikan Formal',
    desc: 'Kami memastikan setiap anak mendapatkan hak pendidikan formal di sekolah mitra terbaik.',
  },
  {
    icon: Users,
    title: 'Keterampilan Mandiri',
    desc: 'Pelatihan kepemimpinan, wirausaha, dan keterampilan hidup untuk bekal masa depan.',
  },
];


const faqData = [
  {
    id: 'faq-1',
    q: 'Siapa saja yang berhak mendaftar di asrama panti ini?',
    a: 'Program ini dikhususkan untuk anak-anak yatim, piatu, dan/atau berasal dari keluarga dhuafa (kurang mampu) yang memenuhi kriteria yang telah kami tetapkan.',
  },
  {
    id: 'faq-2',
    q: 'Apakah program ini sepenuhnya gratis?',
    a: 'Benar. Seluruh biaya hidup di asrama, biaya pendidikan formal, makan, dan fasilitas lainnya ditanggung sepenuhnya oleh panti melalui dana donasi dan wakaf dari para donatur.',
  },
  {
    id: 'faq-3',
    q: 'Apa saja yang perlu dibawa saat pertama kali masuk asrama?',
    a: 'Calon santri hanya perlu membawa pakaian pribadi secukupnya. Perlengkapan sekolah, seragam, tempat tidur, dan kebutuhan pokok harian lainnya telah disediakan oleh panti.',
  },
  {
    id: 'faq-4',
    q: 'Apakah santri diperkenankan membawa gadget (HP/Laptop)?',
    a: 'Untuk menjaga fokus belajar dan interaksi sosial, santri tidak diperkenankan membawa alat komunikasi pribadi. Panti menyediakan fasilitas komunikasi terjadwal untuk menghubungi keluarga.',
  },
];


export default function PendaftaranPage() {
  const whatsappNumber = '+6282173023009';
  const waLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Assalamualaikum, saya ingin bertanya tentang penerimaan penghuni asrama')}`;

  return (
    <>
    <section className="py-16 md:py-24 hero-gradient text-white">
        {/* Header*/}
        <section className="text-center px-4">
          <Badge className="mb-4 text-primary" variant="secondary">
            Program Pendidikan Gratis
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Penerimaan Siswa Penghuni Asrama</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Membuka kesempatan bagi yatim & dhuafa untuk meraih masa depan gemilang
            dalam lingkungan yang islami dan penuh kasih.
          </p>
        </section>
    </section>

        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className='py-16'>
        {/* CTA Utama */}
        <Card className="mb-16 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 shadow-lg">
          <CardContent className="p-8 md:p-10 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Pendaftaran Telah Dibuka!
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Silakan isi formulir pendaftaran atau hubungi kami jika ada pertanyaan lebih
              lanjut.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <a href="/auth/register">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Daftar Online
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={waLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Tanya via WhatsApp
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Program Unggulan */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Program Pembinaan Kami</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {programUnggulan.map((program, idx) => (
              <Card key={idx} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10 flex-shrink-0">
                      <program.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{program.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">{program.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Persyaratan & Kriteria*/}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Persyaratan */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle>Berkas Persyaratan</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {persyaratan.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground pt-4 mt-4 border-t">
                  * Berkas tambahan mungkin diperlukan setelah proses survei.
                </p>
              </CardContent>
            </Card>

            {/* Kriteria Penerimaan (PENGGANTI BIAYA) */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30">
                    <HeartHandshake className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle>Kriteria Penerimaan</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {kriteriaPenerimaan.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <item.icon className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Alur Pendaftaran*/}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Alur Penerimaan</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {alurSteps.map((step, idx) => (
                  <div key={step.no} className="relative flex gap-6">
                    {idx !== alurSteps.length - 1 && (
                      <div className="absolute left-5 top-10 h-full w-px bg-border border-l-2 border-dashed" />
                    )}

                    {/* Bulatan Nomor */}
                    <div className="z-10 flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        {step.no}
                      </div>
                    </div>

                    {/* Konten Step */}
                    <div className="pb-8">
                      <h3 className="font-semibold mb-1 text-lg">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Pertanyaan Umum (FAQ)</h2>
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
            <HelpCircle className="h-5 w-5" />
            <p>Temukan jawaban cepat untuk pertanyaan Anda.</p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq) => (
              <AccordionItem value={faq.id} key={faq.id}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Footer CTA */}
        <section className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">Masih Ada Pertanyaan?</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Jangan ragu untuk menghubungi tim panitia. Kami siap membantu Anda melalui
            proses pendaftaran ini.
          </p>
          <Button variant="default" size="lg" asChild>
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              Hubungi Panitia (WhatsApp)
            </a>
          </Button>
        </section>
      </div>
      </div>
    </>
  );
}