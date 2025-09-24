import { SiteInfo, Stats } from '@/types';

export const siteInfo: SiteInfo = {
  nama: "Asrama Nurul Hikmah",
  deskripsi: "Asrama terpadu yang mengembangkan akhlak mulia, prestasi akademik, dan kemandirian santri dalam lingkungan Islami yang kondusif",
  alamat: "Jl. Pendidikan No. 123, Kota Santri, Jawa Timur 65432",
  telepon: "+62 341 123456",
  email: "info@asramanurul.sch.id",
  whatsapp: "+62 812-3456-7890",
  sosialMedia: {
    instagram: "https://instagram.com/asramanurul",
    facebook: "https://facebook.com/asramanurul",
    youtube: "https://youtube.com/@asramanurul"
  },
  jamKunjung: "Sabtu-Minggu: 08.00-16.00 WIB",
  koordinat: {
    lat: -7.9344,
    lng: 112.6181
  }
};

export const stats: Stats = {
  siswaAktif: 245,
  kamar: 48,
  kegiatanTahun: 125
};

export const visiMisi = {
  visi: "Menjadi asrama terdepan dalam mencetak generasi muslim yang berakhlak mulia, berprestasi, dan mandiri",
  misi: [
    "Menyelenggarakan pendidikan karakter berbasis nilai-nilai Islam",
    "Mengembangkan potensi akademik dan non-akademik santri secara optimal", 
    "Menciptakan lingkungan kondusif untuk pembelajaran dan pengembangan diri",
    "Membangun kemandirian dan kepemimpinan dalam kehidupan sehari-hari"
  ]
};

export const sejarahSingkat = `
Asrama Nurul Hikmah didirikan pada tahun 1985 dengan visi menciptakan generasi muslim yang unggul dalam ilmu dan akhlak. 

Berawal dari sebuah bangunan sederhana dengan 20 santri, kini telah berkembang menjadi kompleks asrama modern yang menampung lebih dari 200 santri dari berbagai daerah.

Dengan fasilitas lengkap dan program pendidikan terpadu, Asrama Nurul Hikmah telah meluluskan ribuan alumni yang tersebar di berbagai profesi dan berperan aktif dalam pembangunan masyarakat.
`;