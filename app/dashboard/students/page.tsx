"use client"

import { useEffect, useMemo, useState } from "react"
import axios from "axios"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, Plus, Eye, Edit } from "lucide-react"

/** =========== Endpoint builder (hindari /api dobel & URL relatif) =========== */
const RAW_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000"
const BASE = RAW_BASE.replace(/\/+$/,'')
const HAS_API = /\/api$/.test(BASE)
const API_PREFIX = HAS_API ? "" : "/api"
// SESUAIKAN: rute list siswa milik user login
const ENDPOINT_STUDENTS = `${BASE}${API_PREFIX}/students` // contoh: /api/siswa. Ganti jika rute kamu /api/students

/** ================== Types & helpers ================== */
type ParentInfo = {
  nama_ayah?: string
  nama_ibu?: string
  no_hp?: string
  alamat?: string
}

type Student = {
  id: number
  nama_lengkap: string
  nama_panggilan: string
  nis: string
  tempat_lahir: string
  tanggal_lahir: string
  kelas: string
  kamar_id?: string | number | null
  jenis_kelamin: string // "L" | "P" | "Laki-laki" | "Perempuan"
  status_keluarga?: string
  kewarganegaraan?: string
  tgl_masuk?: string
  foto?: string | null
  orang_tua: ParentInfo
}

// Normalisasi item dari backend → bentuk yang dipakai UI ini
const sanitizeStudent = (raw: any): Student => {
  const jkRaw = raw?.jenis_kelamin ?? ""
  const jk =
    jkRaw === "Laki-laki" || jkRaw === "L" ? "L"
    : jkRaw === "Perempuan" || jkRaw === "P" ? "P"
    : String(jkRaw)

  return {
    id: Number(raw?.id ?? 0),
    nama_lengkap: raw?.nama_lengkap ?? "",
    nama_panggilan: raw?.nama_panggilan ?? "",
    nis: raw?.nis ?? raw?.no_induk_santri ?? "",
    tempat_lahir: raw?.tempat_lahir ?? "",
    tanggal_lahir: raw?.tanggal_lahir ?? raw?.tgl_lahir ?? "",
    kelas: raw?.kelas ?? raw?.kelas_masuk ?? "",
    kamar_id: raw?.kamar_id ?? null,
    jenis_kelamin: jk,
    status_keluarga: raw?.status_keluarga ?? "",
    kewarganegaraan: raw?.kewarganegaraan ?? "",
    tgl_masuk: raw?.tgl_masuk ?? "",
    foto: raw?.foto_url ?? raw?.foto ?? null,
    orang_tua: {
      nama_ayah: raw?.orang_tua?.nama_ayah ?? raw?.parent?.nama_ayah ?? "",
      nama_ibu: raw?.orang_tua?.nama_ibu ?? raw?.parent?.nama_ibu ?? "",
      no_hp: raw?.orang_tua?.no_hp ?? raw?.parent?.no_hp ?? "",
      alamat: raw?.orang_tua?.alamat ?? raw?.parent?.alamat ?? "",
    },
  }
}

function initials(name: string) {
  return (name || "")
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

function genderLabel(jk: string) {
  if (jk === "L" || jk === "Laki-laki") return "Laki-laki"
  if (jk === "P" || jk === "Perempuan") return "Perempuan"
  return jk || "-"  
}

/** ================== Component ================== */
export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [students, setStudents] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Fetch dari DB saat mount
  useEffect(() => {
    let ignore = false
    ;(async () => {
      try {
        const token = localStorage.getItem("auth_token")
        const res = await axios.get(ENDPOINT_STUDENTS, {
          headers: { Authorization: `Bearer ${token}` },
        })
        // Laravel paginator: { data: [...] } — non-paginator: langsung [...]
        const list = res?.data?.data ?? res?.data ?? []
        const clean: Student[] = Array.isArray(list) ? list.map(sanitizeStudent) : []
        if (!ignore) setStudents(clean)
      } catch (e: any) {
        const msg = axios.isAxiosError?.(e) ? (e.response?.data?.message || e.message) : "Gagal memuat data"
        if (!ignore) setError(msg)
      } finally {
        if (!ignore) setLoading(false)
      }
    })()
    return () => { ignore = true }
  }, [])

  const filteredStudents = useMemo(() => {
    const q = searchTerm.toLowerCase().trim()
    if (!q) return students
    return students.filter((s) =>
      s.nama_lengkap.toLowerCase().includes(q) ||
      s.nis.includes(searchTerm) ||
      (s.kelas || "").toLowerCase().includes(q)
    )
  }, [students, searchTerm])

  const maleCount = useMemo(
    () => students.filter((s) => s.jenis_kelamin === "L" || s.jenis_kelamin === "Laki-laki").length,
    [students]
  )
  const femaleCount = useMemo(
    () => students.filter((s) => s.jenis_kelamin === "P" || s.jenis_kelamin === "Perempuan").length,
    [students]
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Anak Saya</h1>
          <p className="text-muted-foreground">Informasi anak-anak Anda di asrama</p>
        </div>
        <div className="flex space-x-2">
          <Link href="/dashboard/registration">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Daftar Anak Baru
            </Button>
          </Link>
        </div>
      </div>

      {/* Error / Loading */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription className="text-sm">{error}</AlertDescription>
        </Alert>
      )}
      {!error && loading && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">Memuat data…</div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      {!error && (
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Cari berdasarkan nama, NIS, atau kelas…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Students List */}
      <div className="grid gap-4">
        {!loading && !error && filteredStudents.map((student) => (
          <Card key={student.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={student.foto || "/placeholder.svg"} alt={student.nama_lengkap} />
                    <AvatarFallback>{initials(student.nama_lengkap)}</AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">{student.nama_lengkap}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>NIS: {student.nis}</span>
                      <span>Kelas: {student.kelas || "-"}</span>
                      <span>Kamar: {student.kamar_id ?? "-"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={student.jenis_kelamin === "L" ? "default" : "secondary"}>
                        {genderLabel(student.jenis_kelamin)}
                      </Badge>
                      {!!student.status_keluarga && (
                        <Badge variant="outline">
                          {String(student.status_keluarga).replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedStudent(student)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Detail Anak</DialogTitle>
                        <DialogDescription>Informasi lengkap {student.nama_lengkap}</DialogDescription>
                      </DialogHeader>

                      {selectedStudent && (
                        <div className="grid gap-6">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-16 w-16">
                              <AvatarImage
                                src={selectedStudent.foto || "/placeholder.svg"}
                                alt={selectedStudent.nama_lengkap}
                              />
                              <AvatarFallback>{initials(selectedStudent.nama_lengkap)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-xl font-semibold">{selectedStudent.nama_lengkap}</h3>
                              <p className="text-muted-foreground">NIS: {selectedStudent.nis}</p>
                            </div>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <h4 className="font-semibold">Data Pribadi</h4>
                              <div className="space-y-1 text-sm">
                                <p><span className="font-medium">Nama Panggilan:</span> {selectedStudent.nama_panggilan || "-"}</p>
                                <p>
                                  <span className="font-medium">Tempat, Tanggal Lahir:</span>{" "}
                                  {selectedStudent.tempat_lahir || "-"},{" "}
                                  {selectedStudent.tanggal_lahir ? new Date(selectedStudent.tanggal_lahir).toLocaleDateString("id-ID") : "-"}
                                </p>
                                <p><span className="font-medium">Jenis Kelamin:</span> {genderLabel(selectedStudent.jenis_kelamin)}</p>
                                <p><span className="font-medium">Kewarganegaraan:</span> {selectedStudent.kewarganegaraan || "-"}</p>
                                <p><span className="font-medium">Status Keluarga:</span> {selectedStudent.status_keluarga?.replace(/_/g, " ") || "-"}</p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <h4 className="font-semibold">Data Asrama</h4>
                              <div className="space-y-1 text-sm">
                                <p>
                                  <span className="font-medium">Tanggal Masuk:</span>{" "}
                                  {selectedStudent.tgl_masuk ? new Date(selectedStudent.tgl_masuk).toLocaleDateString("id-ID") : "-"}
                                </p>
                                <p><span className="font-medium">Kelas:</span> {selectedStudent.kelas || "-"}</p>
                                <p><span className="font-medium">Kamar:</span> {selectedStudent.kamar_id ?? "-"}</p>
                              </div>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                              <h4 className="font-semibold">Data Orang Tua</h4>
                              <div className="space-y-1 text-sm">
                                <p><span className="font-medium">Nama Ayah:</span> {selectedStudent.orang_tua?.nama_ayah || "-"}</p>
                                <p><span className="font-medium">Nama Ibu:</span> {selectedStudent.orang_tua?.nama_ibu || "-"}</p>
                                <p><span className="font-medium">No. HP:</span> {selectedStudent.orang_tua?.no_hp || "-"}</p>
                                <p><span className="font-medium">Alamat:</span> {selectedStudent.orang_tua?.alamat || "-"}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  {/* <Button variant="outline" size="sm" >
                    <Edit className="h-4 w-4" />
                  </Button> */}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {!loading && !error && filteredStudents.length === 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <p className="text-muted-foreground">Tidak ada anak yang ditemukan</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Summary */}
      {!loading && !error && (
        <Card>
          <CardHeader>
            <CardTitle>Ringkasan</CardTitle>
            <CardDescription>Informasi anak-anak Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{students.length}</div>
                <p className="text-sm text-muted-foreground">Total Anak</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{maleCount}</div>
                <p className="text-sm text-muted-foreground">Laki-laki</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{femaleCount}</div>
                <p className="text-sm text-muted-foreground">Perempuan</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
