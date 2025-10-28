import { Pengumuman, Album, Gambar, Berita } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api';
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true' || true; // Default to mock for demo

// Mock data
const mockPengumuman: Pengumuman[] = [
  {
    id: 1,
    judul: "Pendaftaran Santri Baru Tahun 2024/2025",
    slug: "pendaftaran-santri-baru-2024-2025",
    isi: "Asrama Nurul Hikmah membuka pendaftaran santri baru untuk tahun ajaran 2024/2025. Pendaftaran dibuka mulai 1 Februari hingga 31 Maret 2024.",
    start_at: "2024-02-01T00:00:00Z",
    end_at: "2024-03-31T23:59:59Z", 
    pinned: true,
    status: "publish",
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z"
  },
  {
    id: 2,
    judul: "Libur Akhir Tahun 2023",
    slug: "libur-akhir-tahun-2023",
    isi: "Asrama akan tutup sementara untuk libur akhir tahun dari tanggal 25 Desember 2023 hingga 2 Januari 2024.",
    start_at: "2023-12-25T00:00:00Z",
    end_at: "2024-01-02T23:59:59Z",
    pinned: false,
    status: "publish", 
    created_at: "2023-12-10T00:00:00Z",
    updated_at: "2023-12-10T00:00:00Z"
  }
];

const mockAlbums: Album[] = [
  {
    id: 1,
    judul: "Kegiatan Ramadhan 2024",
    slug: "kegiatan-ramadhan-2024",
    cover: "/galeri/ramadhan-cover.jpg",
    deskripsi: "Dokumentasi berbagai kegiatan selama bulan Ramadhan",
    total_foto: 25,
    created_at: "2024-03-15T00:00:00Z",
    updated_at: "2024-03-15T00:00:00Z"
  },
  {
    id: 2,
    judul: "Lomba Tahfidz Antar Asrama",
    slug: "lomba-tahfidz-2024",
    cover: "/galeri/tahfidz-cover.jpg", 
    deskripsi: "Kompetisi hafalan Al-Quran tingkat regional",
    total_foto: 18,
    created_at: "2024-02-20T00:00:00Z",
    updated_at: "2024-02-20T00:00:00Z"
  }
];

const mockBerita: Berita[] = [
  {
    id: 1,
    judul: "Santri Asrama Raih Juara 1 Lomba Tahfidz Nasional",
    slug: "juara-1-tahfidz-nasional-2024",
    ringkasan: "Ahmad Faiz, santri kelas 3 MA berhasil meraih juara 1 dalam lomba tahfidz tingkat nasional",
    isi: "Prestasi membanggakan kembali ditorehkan santri Asrama Nurul Hikmah...",
    cover: "/berita/tahfidz-juara.jpg",
    published_at: "2024-03-10T00:00:00Z",
    status: "publish",
    cover_url: "/berita/tahfidz-juara.jpg",
    author: { id: 1, nama: "Admin Asrama" },
    created_at: "2024-03-10T00:00:00Z", 
    updated_at: "2024-03-10T00:00:00Z"
  }
];

// API functions
export const fetchPengumuman = async () => {
  const response = await fetch(`${API_BASE_URL}/pengumuman`, {
    next: { revalidate: 60 }, // cache 1 menit (opsional)
  });

  if (!response.ok) {
    throw new Error('Gagal mengambil data pengumuman');
  }

  const data = await response.json();

  // Laravel kamu mengembalikan array langsung (bukan { data: [] })
  return Array.isArray(data) ? data : data.data;
};

export const fetchPengumumanBySlug = async (slug: string) => {
  const response = await fetch(`${API_BASE_URL}/pengumuman/${slug}`);
  if (!response.ok) throw new Error('Gagal mengambil detail pengumuman');
  return response.json();
};

export const fetchAlbums = async (): Promise<Album[]> => {
  if (USE_MOCK) {
    return new Promise(resolve => setTimeout(() => resolve(mockAlbums), 400));
  }
  
  const response = await fetch(`${API_BASE_URL}/galeri/albums`);
  if (!response.ok) throw new Error('Failed to fetch albums');
  return response.json();
};

export const fetchBerita = async (): Promise<Berita[]> => {
  const response = await fetch(`${API_BASE_URL}/berita`);
  if (!response.ok) throw new Error('Gagal mengambil berita');
  return response.json();
};

export const fetchBeritaBySlug = async (slug: string): Promise<Berita> => {
  const response = await fetch(`${API_BASE_URL}/berita/${slug}`);
  if (!response.ok) throw new Error('Gagal mengambil detail berita');
  return response.json();
};