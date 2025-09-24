"use client"

import { useEffect, useMemo, useState } from "react"
import axios from "axios"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, UserPlus, FileText, CheckCircle, Clock, XCircle, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const RAW_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000"
const BASE = RAW_BASE.replace(/\/+$/, "")
const API = (p: string) => `${BASE}${p.startsWith("/") ? "" : "/"}${p}`

type Student = { id: number; nama_lengkap: string; nis?: string; kelas?: string }
type PermitStatus = "pending" | "disetujui" | "ditolak" | string
type Permit = {
  id: number
  siswa_id: number
  siswa?: { nama_lengkap?: string }
  alasan?: string
  tanggal_keluar?: string
  tanggal_masuk?: string
  jam_keluar?: string
  jam_datang?: string
  status: PermitStatus
  created_at?: string
  updated_at?: string
}

function normalizeStatus(s?: string): "pending" | "disetujui" | "ditolak" {
  const x = (s || "").toLowerCase()
  if (x.includes("menunggu") || x === "pending") return "pending"
  if (x.includes("diterima") || x.includes("disetujui") || x === "approved") return "disetujui"
  if (x.includes("ditolak") || x === "rejected") return "ditolak"
  return "pending"
}

function inThisMonth(iso?: string | null) {
  if (!iso) return false
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return false
  const now = new Date()
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
}

function timeAgo(iso?: string | null) {
  if (!iso) return "-"
  const d = new Date(iso)
  const diff = Date.now() - d.getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return "baru saja"
  if (minutes < 60) return `${minutes} menit lalu`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} jam lalu`
  const days = Math.floor(hours / 24)
  return `${days} hari lalu`
}

function StatusBadge({ status }: { status?: string }) {
  const s = normalizeStatus(status)
  if (s === "pending") {
    return (
      <Badge variant="outline" className="border-yellow-600 text-yellow-700">
        <Clock className="h-3 w-3 mr-1" /> Menunggu
      </Badge>
    )
  }
  if (s === "disetujui") {
    return (
      <Badge variant="outline" className="border-green-600 text-green-700">
        <CheckCircle className="h-3 w-3 mr-1" /> Disetujui
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="border-red-600 text-red-700">
      <XCircle className="h-3 w-3 mr-1" /> Ditolak
    </Badge>
  )
}

export default function DashboardPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [permits, setPermits] = useState<Permit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let ignore = false
    const token = localStorage.getItem("auth_token")
    ;(async () => {
      try {
        setLoading(true)
        setError("")

        const [siswaRes, izinRes] = await Promise.all([
          axios.get(API("/api/students"), { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(API("/api/perizinan"), { headers: { Authorization: `Bearer ${token}` } }),
        ])

        const siswaList = (siswaRes?.data?.data ?? siswaRes?.data ?? []) as any[]
        const izinList = (izinRes?.data?.data ?? izinRes?.data ?? []) as any[]

        if (!ignore) {
          setStudents(
            siswaList.map((s) => ({
              id: Number(s.id),
              nama_lengkap: s.nama_lengkap ?? "",
              nis: s.nis ?? s.no_induk_santri ?? "",
              kelas: s.kelas ?? s.kelas_masuk ?? "",
            })),
          )
          setPermits(izinList as Permit[])
        }
      } catch (e: any) {
        if (!ignore) setError(e?.response?.data?.message || e?.message || "Gagal memuat data")
      } finally {
        if (!ignore) setLoading(false)
      }
    })()
    return () => {
      ignore = true
    }
  }, [])

  // ===== Stats =====
  const totalStudents = students.length
  const totalPermits = permits.length
  const pendingCount = permits.filter((p) => normalizeStatus(p.status) === "pending").length
  const approvedThisMonth = permits.filter(
    (p) => normalizeStatus(p.status) === "disetujui" && inThisMonth(p.updated_at || p.created_at),
  ).length

  // ===== Recent activity (ambil 6 terbaru) =====
  const recent = useMemo(() => {
    const list = [...permits]
    list.sort((a, b) => {
      const ta = new Date(a.updated_at || a.created_at || 0).getTime()
      const tb = new Date(b.updated_at || b.created_at || 0).getTime()
      return tb - ta
    })
    return list.slice(0, 6)
  }, [permits])

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Selamat datang di Portal Orang Tua Asrama</p>
        </div>
        <div className="hidden sm:flex gap-2">
          <Link href="/dashboard/registration">
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" /> Daftarkan Anak
            </Button>
          </Link>
          <Link href="/dashboard/permits">
            <Button size="sm">
              <FileText className="h-4 w-4 mr-1" /> Buat Izin
            </Button>
          </Link>
        </div>
      </div>

      {/* Error */}
      {error && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <StatCard title="Anak Terdaftar" icon={<Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />} value={loading ? "…" : totalStudents} subtitle="Anak Anda di asrama" />
        <StatCard title="Izin Diajukan" icon={<FileText className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />} value={loading ? "…" : totalPermits} subtitle="Semua waktu" />
        <StatCard title="Izin Menunggu" icon={<Clock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />} value={loading ? "…" : pendingCount} subtitle="Perlu persetujuan" />
        <StatCard title="Izin Disetujui" icon={<CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />} value={loading ? "…" : approvedThisMonth} subtitle="Bulan ini" />
      </div>

      {/* Content */}
      <div className="grid gap-4 grid-cols-1 xl:grid-cols-3">
        {/* Aktivitas Terbaru */}
        <Card className="xl:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Aktivitas Terbaru</CardTitle>
            <CardDescription>Aktivitas izin dari anak Anda</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <LoadingList />
            ) : recent.length === 0 ? (
              <EmptyState text="Belum ada aktivitas" />
            ) : (
              <div className="space-y-4">
                {recent.map((p) => {
                  const st = normalizeStatus(p.status)
                  const Icon =
                    st === "disetujui" ? CheckCircle : st === "ditolak" ? XCircle : Clock
                  const color =
                    st === "disetujui" ? "text-green-600" : st === "ditolak" ? "text-red-600" : "text-yellow-600"
                  const bg =
                    st === "disetujui" ? "bg-green-100" : st === "ditolak" ? "bg-red-100" : "bg-yellow-100"
                  const title =
                    st === "disetujui" ? "Izin keluar disetujui" : st === "ditolak" ? "Izin keluar ditolak" : "Izin keluar diajukan"

                  return (
                    <div key={p.id} className="flex items-start gap-4">
                      <div className={`${bg} p-2 rounded-full`}>
                        <Icon className={`h-4 w-4 ${color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{title}</p>
                        <p className="text-xs text-muted-foreground">
                          {(p.siswa?.nama_lengkap || "Siswa")} • {timeAgo(p.updated_at || p.created_at)}
                        </p>
                        {p.alasan && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{p.alasan}</p>}
                      </div>
                      <StatusBadge status={p.status} />
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pengumuman + Quick Actions */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Pengumuman</CardTitle>
              <CardDescription>Informasi penting untuk orang tua</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Announcement title="Jadwal Kunjungan" text="Kunjungan orang tua setiap hari Minggu pukul 09.00–16.00 WIB." />
              <Announcement title="Libur Semester" text="Libur semester dimulai 15 Desember 2025. Siapkan penjemputan." />
              <Announcement title="Pembayaran SPP" text="Jatuh tempo SPP bulan ini pada tanggal 10. Mohon diselesaikan tepat waktu." />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Tindakan Cepat</CardTitle>
              <CardDescription>Akses cepat halaman yang sering digunakan</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Link href="/dashboard/registration"><Button variant="outline" className="justify-start"><UserPlus className="h-4 w-4 mr-2" /> Daftarkan Anak</Button></Link>
              <Link href="/dashboard/students"><Button variant="outline" className="justify-start"><Users className="h-4 w-4 mr-2" /> Lihat Anak</Button></Link>
              <Link href="/dashboard/permits"><Button variant="outline" className="justify-start"><FileText className="h-4 w-4 mr-2" /> Buat Izin</Button></Link>
              <Link href="/dashboard/permits"><Button variant="outline" className="justify-start"><CheckCircle className="h-4 w-4 mr-2" /> Riwayat Izin</Button></Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

/** ===== Subcomponents ===== */

function StatCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
}) {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-x-0 -top-6 h-16 bg-gradient-to-b from-accent/20 to-transparent pointer-events-none" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs sm:text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-xl sm:text-2xl font-bold">{value}</div>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </CardContent>
    </Card>
  )
}

function Announcement({ title, text }: { title: string; text: string }) {
  return (
    <div className="border-l-4 border-accent pl-4">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-muted-foreground">{text}</p>
    </div>
  )
}

function LoadingList() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-start gap-4 animate-pulse">
          <div className="bg-muted h-8 w-8 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-muted rounded w-1/3" />
            <div className="h-2.5 bg-muted rounded w-2/3" />
            <div className="h-2 bg-muted rounded w-1/2" />
          </div>
          <div className="h-6 w-20 bg-muted rounded" />
        </div>
      ))}
    </div>
  )
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="text-center py-10">
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  )
}
