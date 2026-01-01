"use client"

import { useEffect, useMemo, useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Plus, Eye, Check, X, Clock, Calendar } from "lucide-react"

const RAW_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://asramamiqu.site"
const BASE = RAW_BASE.replace(/\/+$/,"")
const API = (p: string) => `${BASE}${p.startsWith("/") ? "" : "/"}${p}`

const absUrl = (p?: string | null) => {
  if (!p) return ""
  return p.startsWith("http://") || p.startsWith("https://") ? p : `${BASE}${p.startsWith("/") ? "" : "/"}${p}`
}

type PermitStatus = "pending" | "disetujui" | "ditolak"

type Permit = {
  id: number
  siswa_id: number
  siswa: { nama_lengkap: string; no_induk_santri: string; kelas_masuk: string; foto: string | null }
  alasan: string
  tanggal_keluar: string
  jam_keluar: string
  status: PermitStatus
  keterangan: string | null
  dibuat_oleh: number
  created_at: string
  updated_at: string
}

type StudentPick = { id: number; nama_lengkap: string; no_induk_santri: string; kelas_masuk: string }

export default function PermitsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | PermitStatus>("all")
  const [permits, setPermits] = useState<Permit[]>([])
  const [selectedPermit, setSelectedPermit] = useState<Permit | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [students, setStudents] = useState<StudentPick[]>([])

  const [newPermit, setNewPermit] = useState({
    siswa_id: "",
    alasan: "",
    tanggal_keluar: "",
    jam_keluar: "",
  })

  // fetch
  useEffect(() => {
    let ignore = false
    const token = localStorage.getItem("auth_token")
    ;(async () => {
      try {
        setError("")
        const [perizinanRes, siswaRes] = await Promise.all([
          axios.get(API("/api/perizinan"), { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(API("/api/students"), { headers: { Authorization: `Bearer ${token}` } }),
        ])
        const list = perizinanRes?.data?.data ?? perizinanRes?.data ?? []
        const siswaList = (siswaRes?.data?.data ?? siswaRes?.data ?? []).map((s: any) => ({
          id: Number(s.id),
          nama_lengkap: s.nama_lengkap ?? "",
          no_induk_santri: s.nis ?? s.no_induk_santri ?? "",
          kelas_masuk: s.kelas ?? s.kelas_masuk ?? "",
        }))
        const normalized: Permit[] = (Array.isArray(list) ? list : []).map((p: any) => ({
          id: Number(p.id),
          siswa_id: Number(p.siswa_id),
          siswa: { 
            nama_lengkap: p?.siswa?.nama_lengkap ?? "",
            no_induk_santri: p?.siswa?.no_induk_santri ?? p?.siswa?.nis ?? "",
            kelas_masuk: p?.siswa?.kelas_masuk ?? p?.siswa?.kelas ?? "",
            foto: absUrl(p?.siswa?.foto ?? null),
          },
          alasan: p.alasan ?? "",
          tanggal_keluar: p.tanggal_keluar ?? "",
          jam_keluar: p.jam_keluar ?? "",
          status: (p.status as PermitStatus) ?? "pending",
          keterangan: p.keterangan ?? null,
          dibuat_oleh: Number(p.dibuat_oleh ?? 0),
          created_at: p.created_at ?? "",
          updated_at: p.updated_at ?? "",
        }))
        if (!ignore) { setPermits(normalized); setStudents(siswaList) }
      } catch (e: any) {
        if (!ignore) setError(axios.isAxiosError(e) ? (e.response?.data?.message || e.message) : "Gagal memuat data")
      }
    })()
    return () => { ignore = true }
  }, [])

  const filteredPermits = useMemo(() => {
    const q = searchTerm.toLowerCase().trim()
    return permits.filter((p) => {
      const matchesSearch =
        (p.siswa?.nama_lengkap || "").toLowerCase().includes(q) ||
        (p.siswa?.no_induk_santri || "").includes(searchTerm) ||
        (p.alasan || "").toLowerCase().includes(q) ||
        (p.keterangan || "").toLowerCase().includes(q)
      const matchesStatus = filterStatus === "all" || p.status === filterStatus
      return matchesSearch && matchesStatus
    })
  }, [permits, searchTerm, filterStatus])

  async function handleCreatePermit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    try {
      const token = localStorage.getItem("auth_token")
      const payload = {
        siswa_id: Number(newPermit.siswa_id),
        alasan: newPermit.alasan,
        tanggal_keluar: newPermit.tanggal_keluar,
        jam_keluar: newPermit.jam_keluar,
      }
      const res = await axios.post(API("/api/perizinan"), payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const created: Permit = (res.data?.data ?? res.data) as Permit
      
      created.siswa = { ...created.siswa, foto: absUrl(created?.siswa?.foto ?? null) }
      setPermits((prev) => [created, ...prev])
      setNewPermit({ siswa_id: "", alasan: "", tanggal_keluar: "", jam_keluar: "" })
      setShowCreateForm(false)
    } catch (e) {
      console.error(e)
      alert("Gagal membuat izin")
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600"><Clock className="h-3 w-3 mr-1" />Menunggu</Badge>
      case "disetujui":
        return <Badge variant="outline" className="text-green-600 border-green-600"><Check className="h-3 w-3 mr-1" />Disetujui</Badge>
      case "ditolak":
        return <Badge variant="outline" className="text-red-600 border-red-600"><X className="h-3 w-3 mr-1" />Ditolak</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const initials = (name: string) =>
    (name || "").split(" ").filter(Boolean).map((n) => n[0]).join("").slice(0, 2).toUpperCase()

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Izin Keluar</h1>
          <p className="text-muted-foreground">Kelola permohonan izin keluar siswa</p>
        </div>

        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Buat Izin Baru</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Buat Izin Keluar Baru</DialogTitle>
              <DialogDescription>Lengkapi form untuk membuat permohonan izin keluar</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreatePermit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siswa_id">Pilih Siswa</Label>
                <Select value={newPermit.siswa_id} onValueChange={(value) => setNewPermit((p) => ({ ...p, siswa_id: value }))}>
                  <SelectTrigger><SelectValue placeholder="Pilih siswa" /></SelectTrigger>
                  <SelectContent>
                    {students.map((s) => (
                      <SelectItem key={s.id} value={String(s.id)}>
                        {s.nama_lengkap} - {s.no_induk_santri}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="alasan">Alasan Izin</Label>
                <Textarea id="alasan" placeholder="Jelaskan alasan izin keluar..." value={newPermit.alasan}
                  onChange={(e) => setNewPermit((p) => ({ ...p, alasan: e.target.value }))} required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tanggal_keluar">Tanggal Keluar</Label>
                  <Input id="tanggal_keluar" type="date" value={newPermit.tanggal_keluar}
                    onChange={(e) => setNewPermit((p) => ({ ...p, tanggal_keluar: e.target.value }))} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jam_keluar">Jam Keluar</Label>
                  <Input id="jam_keluar" type="time" value={newPermit.jam_keluar}
                    onChange={(e) => setNewPermit((p) => ({ ...p, jam_keluar: e.target.value }))} required />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>Batal</Button>
                <Button type="submit" disabled={isLoading}>{isLoading ? "Menyimpan..." : "Buat Izin"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Error */}
      {error && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Search & Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Cari berdasarkan nama siswa, NIS, alasan, atau keterangan..." value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
            </div>
            <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as any)}>
              <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="pending">Menunggu</SelectItem>
                <SelectItem value="disetujui">Disetujui</SelectItem>
                <SelectItem value="ditolak">Ditolak</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* List */}
      <div className="grid gap-4">
        {filteredPermits.map((permit) => (
          <Card key={permit.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={permit.siswa.foto || "/placeholder.svg"} alt={permit.siswa.nama_lengkap || "Siswa"} />
                    <AvatarFallback>{initials(permit.siswa.nama_lengkap)}</AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">{permit.siswa.nama_lengkap}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>NIS: {permit.siswa.no_induk_santri}</span>
                      <span>Kelas: {permit.siswa.kelas_masuk}</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {permit.tanggal_keluar ? new Date(permit.tanggal_keluar).toLocaleDateString("id-ID") : "-"}
                      </span>
                      <span>{permit.jam_keluar || "-"}</span>
                    </div>

                    <p className="text-sm text-muted-foreground max-w-md">{permit.alasan}</p>

                    {/* keterangan penolakan */}
                    {/* {permit.status === "ditolak" && (permit.keterangan?.trim()?.length ?? 0) > 0 && (
                      <p className="text-sm text-red-600/90 italic">Alasan ditolak: {permit.keterangan}</p>
                    )} */}

                    <div className="flex items-center space-x-2">{getStatusBadge(permit.status)}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedPermit(permit)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Detail Izin Keluar</DialogTitle>
                        <DialogDescription>Informasi lengkap permohonan izin keluar</DialogDescription>
                      </DialogHeader>

                      {selectedPermit && (
                        <div className="space-y-6">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={selectedPermit.siswa.foto || "/placeholder.svg"} alt={selectedPermit.siswa.nama_lengkap} />
                              <AvatarFallback>{initials(selectedPermit.siswa.nama_lengkap)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-xl font-semibold">{selectedPermit.siswa.nama_lengkap}</h3>
                              <p className="text-muted-foreground">
                                NIS: {selectedPermit.siswa.no_induk_santri} • Kelas: {selectedPermit.siswa.kelas_masuk}
                              </p>
                              {getStatusBadge(selectedPermit.status)}
                            </div>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <h4 className="font-semibold">Waktu Keluar</h4>
                              <div className="space-y-1 text-sm">
                                <p><span className="font-medium">Tanggal Keluar:</span>{" "}
                                  {selectedPermit.tanggal_keluar ? new Date(selectedPermit.tanggal_keluar).toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "-"}</p>
                                <p><span className="font-medium">Jam Keluar:</span> {selectedPermit.jam_keluar || "-"}</p>
                              </div>
                            </div>

                            {}
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-semibold">Alasan Izin</h4>
                            <p className="text-sm bg-muted p-3 rounded-lg">{selectedPermit.alasan}</p>
                          </div>

                          {selectedPermit.status === "ditolak" && (selectedPermit.keterangan?.trim()?.length ?? 0) > 0 && (
                            <div className="space-y-2">
                              <h4 className="font-semibold text-red-600">Keterangan Penolakan</h4>
                              <p className="text-sm bg-red-50 dark:bg-red-950/30 p-3 rounded-lg text-red-700 dark:text-red-300">
                                {selectedPermit.keterangan}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredPermits.length === 0 && !error && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <p className="text-muted-foreground">Tidak ada izin keluar yang ditemukan</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Izin Keluar</CardTitle>
          <CardDescription>Statistik permohonan izin keluar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{permits.length}</div>
              <p className="text-sm text-muted-foreground">Total Permohonan</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{permits.filter((p) => p.status === "pending").length}</div>
              <p className="text-sm text-muted-foreground">Menunggu</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{permits.filter((p) => p.status === "disetujui").length}</div>
              <p className="text-sm text-muted-foreground">Disetujui</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{permits.filter((p) => p.status === "ditolak").length}</div>
              <p className="text-sm text-muted-foreground">Ditolak</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
