import { Pengumuman, Album, Gambar, Berita } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api';
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true' || true; // Default to mock for demo

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
  const response = await fetch(`${API_BASE_URL}/album`);
  if (!response.ok) throw new Error('Gagal Mengambil Album');
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