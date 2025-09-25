export type Pengumuman = {
  id: number;
  judul: string;
  slug: string;
  isi: string;
  start_at: string | null; // ISO
  end_at: string | null;   // ISO
  pinned: boolean;
  status: "draft" | "publish" | "archived";
  created_at: string;
  updated_at: string;
};

export type Gambar = {
  id: number;
  nama: string;
  path: string; // absolute or relative URL
  created_at?: string;
};

export type Album = {
  id: number;
  judul: string;
  slug: string;
  cover: string | null; // URL
  deskripsi?: string | null;
  total_foto?: number;
  created_at: string;
  updated_at: string;
};

export type Berita = {
  id: number;
  judul: string;
  slug: string;
  ringkasan: string;
  isi: string;
  cover: string | null;
  published_at: string; // ISO
  status: "draft" | "publish";
  author?: { id: number; nama: string } | null;
  created_at: string;
  updated_at: string;
};

export type Fasilitas = {
  id: string;
  nama: string;
  deskripsi: string;
  ikon: string;
  gambar?: string;
  featured?: boolean;
};

export type Pengurus = {
  id: string;
  nama: string;
  jabatan: string;
  foto: string;
  kontak?: string;
  bio?: string;
};

export type SiteInfo = {
  nama: string;
  deskripsi: string;
  alamat: string;
  telepon: string;
  email: string;
  whatsapp: string;
  sosialMedia: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
  jamKunjung: string;
  koordinat: {
    lat: number;
    lng: number;
  };
};

export type Stats = {
  siswaAktif: number;
  kamar: number;
  kegiatanTahun: number;
};