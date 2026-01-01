'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Heart, Building2, BookOpen, Users, Copy, CheckCircle, Loader2 } from 'lucide-react';
import { useState, ChangeEvent, FormEvent } from 'react';
import { toast } from 'sonner';


const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://asramamiqu.site';


const programDonasi = [
  {
    icon: Building2,
    title: 'Pembangunan Fasilitas',
    desc: 'Renovasi dan pembangunan gedung asrama yang lebih layak',
    color: 'text-primary'
  },
  {
    icon: BookOpen,
    title: 'Beasiswa Santri',
    desc: 'Bantuan pendidikan bagi santri kurang mampu',
    color: 'text-accent'
  },
  {
    icon: Users,
    title: 'Program Kegiatan',
    desc: 'Mendukung kegiatan ekstrakurikuler dan pembinaan karakter',
    color: 'text-primary'
  }
];

const rekeningList = [
  { bank: 'Bank Mandiri', norek: '1110024322196', atas: 'Sarmawi' },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className="h-8"
    >
      {copied ? (
        <>
          <CheckCircle className="h-4 w-4 mr-1 text-primary" />
          Tersalin
        </>
      ) : (
        <>
          <Copy className="h-4 w-4 mr-1" />
          Salin
        </>
      )}
    </Button>
  );
}

export default function DonasiPage() {
    
  // State untuk menampung data dari form
  const [formData, setFormData] = useState({
    nama: '',
    alamat: '',
    no_hp: '',
    tgl_kirim: '',
    jumlah: '',
    bukti_tf: null as File | null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      setFormData(prevState => ({
        ...prevState,
        bukti_tf: fileInput.files ? fileInput.files[0] : null,
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (!formData.bukti_tf) {
        setError('Mohon upload bukti transfer Anda.');
        setIsLoading(false);
        return;
    }

    
    const data = new FormData();
    data.append('nama', formData.nama);
    data.append('alamat', formData.alamat);
    data.append('no_hp', formData.no_hp);
    data.append('tgl_kirim', formData.tgl_kirim);
    data.append('jumlah', formData.jumlah);
    data.append('bukti_tf', formData.bukti_tf);

    
    try {
        const response = await fetch(`${API_URL}/api/donasi`, {
            method: 'POST',
            body: data,

        });

        if (!response.ok) {
            const errorData = await response.json();
            

            if (response.status === 422) {
                const errorMessages = Object.values(errorData).map((err) => 
                    (err as string[]).join(' ')
                ).join('\n');
                throw new Error(errorMessages);
            }
            
            throw new Error(errorData.message || 'Terjadi kesalahan saat mengirim data.');
        }

        const result = await response.json();
        toast.success(result.message || 'Konfirmasi donasi berhasil dikirim. Terima kasih!');

        setFormData({
            nama: '', alamat: '', no_hp: '', tgl_kirim: '', jumlah: '', bukti_tf: null
        });

        const fileInput = document.getElementById('bukti_tf') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }

    } catch (err: any) {
        toast.error(err.message || 'Tidak dapat terhubung ke server.');
    } finally {
        setIsLoading(false);
    }
  };


  return (
    <>
    
      <section className="py-16 hero-gradient text-white">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full warm-gradient mb-6">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Donasi & Kontribusi</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Berbagi kebaikan untuk masa depan pendidikan santri yang lebih cerah
          </p>
        </div>
      </section>

    <div className="max-w-[1400px] mx-auto px-6 md:px-10">
     <div className="py-16">
        {/* Motivasi */}
        <Card className="mb-12 bg-linear-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="p-8">
            <blockquote className="text-center italic text-lg mb-4">
              "Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lainnya"
            </blockquote>
            <p className="text-center text-sm text-muted-foreground">
              (HR. Ahmad, ath-Thabrani, ad-Daruqutni)
            </p>
          </CardContent>
        </Card>

        {/* Program Donasi */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Tujuan Donasi</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {programDonasi.map((program, idx) => (
              <Card key={idx} className="text-center hover-scale">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <program.icon className={`h-6 w-6 ${program.color}`} />
                  </div>
                  <h3 className="font-semibold mb-2">{program.title}</h3>
                  <p className="text-sm text-muted-foreground">{program.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Rekening */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Informasi Rekening Donasi</CardTitle>
            <CardDescription>
              Transfer donasi Anda ke salah satu rekening berikut
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {rekeningList.map((rek, idx) => (
              <div key={idx} className="p-4 rounded-lg border bg-card">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <Badge variant="outline" className="mb-2">{rek.bank}</Badge>
                    <p className="font-mono font-bold text-lg">{rek.norek}</p>
                    <p className="text-sm text-muted-foreground">a.n. {rek.atas}</p>
                  </div>
                  <CopyButton text={rek.norek} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>


        {/* ================================================ */}
        {/* ==          BAGIAN FORM KONFIRMASI BARU         == */}
        {/* ================================================ */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Konfirmasi Donasi Anda</CardTitle>
            <CardDescription>
              Setelah melakukan transfer, mohon isi formulir di bawah ini untuk pencatatan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            
            {success && (
              <Alert className="mb-4 border-green-500 text-green-700 dark:border-green-700 dark:text-green-500">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  {success}
                </AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>
                  <div dangerouslySetInnerHTML={{ __html: error.replace(/\n/g, '<br />') }} />
                </AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nama">Nama Lengkap</Label>
                <Input id="nama" name="nama" type="text" placeholder="Nama Anda" required onChange={handleChange} value={formData.nama} disabled={isLoading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="no_hp">Nomor HP/WhatsApp</Label>
                <Input id="no_hp" name="no_hp" type="tel" placeholder="081234567890" required onChange={handleChange} value={formData.no_hp} disabled={isLoading} />
              </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="alamat">Alamat</Label>
                <Textarea id="alamat" name="alamat" placeholder="Alamat Anda" required onChange={handleChange} value={formData.alamat} disabled={isLoading} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="tgl_kirim">Tanggal Transfer</Label>
                  <Input id="tgl_kirim" name="tgl_kirim" type="date" required onChange={handleChange} value={formData.tgl_kirim} disabled={isLoading} />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="jumlah">Jumlah Donasi (Rp)</Label>
                  <Input id="jumlah" name="jumlah" type="number" placeholder="Contoh: 50000" required onChange={handleChange} value={formData.jumlah} disabled={isLoading} />
                </div>
              </div>
               <div className="space-y-2">
                <Label htmlFor="bukti_tf">Upload Bukti Transfer (Max 2MB)</Label>
                <Input id="bukti_tf" name="bukti_tf" type="file" required onChange={handleChange} className="file:text-foreground" disabled={isLoading} accept="image/png, image/jpeg, image/jpg, image/gif" />
              </div>

              <div className='flex items-center justify-center'>
                <Button type="submit" className="w-sm" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLoading ? 'Mengirim...' : 'Kirim Konfirmasi'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Transparansi */}
        <div className="mb-8 text-center">
            <p className="text-muted-foreground mb-4">
              Kami berkomitmen untuk mengelola setiap donasi dengan penuh amanah dan transparan. 
              Laporan penggunaan dana donasi dipublikasikan secara berkala melalui website dan media sosial kami.
            </p>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Jazakumullah khairan katsiran atas kepercayaan dan kontribusi Anda untuk kemajuan pendidikan Islam
        </p>

      </div>
    </div>
    </>
  );
}