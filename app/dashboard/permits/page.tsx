"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Plus, Eye, Check, X, Clock, Calendar } from "lucide-react"

interface ExitPermit {
  id: number
  siswa_id: number
  siswa: {
    nama_lengkap: string
    no_induk_santri: string
    kelas_masuk: string
    foto: string
  }
  alasan: string
  tanggal_keluar: string
  jam_keluar: string
  jam_datang: string
  status: "pending" | "disetujui" | "ditolak"
  dibuat_oleh: number
  created_at: string
  updated_at: string
}

// Mock data for exit permits
const mockPermits: ExitPermit[] = [
  {
    id: 1,
    siswa_id: 1,
    siswa: {
      nama_lengkap: "Ahmad Rizki Pratama",
      no_induk_santri: "2024001",
      kelas_masuk: "VII A",
      foto: "/student-boy.png",
    },
    alasan: "Keperluan keluarga - menghadiri acara pernikahan saudara",
    tanggal_keluar: "2025-08-25",
    jam_keluar: "08:00",
    jam_datang: "20:00",
    status: "pending",
    dibuat_oleh: 1,
    created_at: "2025-08-23T10:00:00Z",
    updated_at: "2025-08-23T10:00:00Z",
  },
  {
    id: 2,
    siswa_id: 2,
    siswa: {
      nama_lengkap: "Siti Nurhaliza",
      no_induk_santri: "2024002",
      kelas_masuk: "VII B",
      foto: "/diverse-student-girl.png",
    },
    alasan: "Kontrol kesehatan rutin di rumah sakit",
    tanggal_keluar: "2025-08-24",
    jam_keluar: "09:00",
    jam_datang: "15:00",
    status: "disetujui",
    dibuat_oleh: 1,
    created_at: "2025-08-22T14:00:00Z",
    updated_at: "2025-08-23T08:00:00Z",
  },
  {
    id: 3,
    siswa_id: 3,
    siswa: {
      nama_lengkap: "Budi Santoso",
      no_induk_santri: "2024003",
      kelas_masuk: "VIII A",
      foto: "/student-boy.png",
    },
    alasan: "Mengambil dokumen penting di rumah",
    tanggal_keluar: "2025-08-23",
    jam_keluar: "10:00",
    jam_datang: "16:00",
    status: "ditolak",
    dibuat_oleh: 1,
    created_at: "2025-08-22T16:00:00Z",
    updated_at: "2025-08-23T09:00:00Z",
  },
]

const mockStudents = [
  { id: 1, nama_lengkap: "Ahmad Rizki Pratama", no_induk_santri: "2024001", kelas_masuk: "VII A" },
  { id: 2, nama_lengkap: "Siti Nurhaliza", no_induk_santri: "2024002", kelas_masuk: "VII B" },
  { id: 3, nama_lengkap: "Budi Santoso", no_induk_santri: "2024003", kelas_masuk: "VIII A" },
]

export default function PermitsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [permits, setPermits] = useState(mockPermits)
  const [selectedPermit, setSelectedPermit] = useState<ExitPermit | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [newPermit, setNewPermit] = useState({
    siswa_id: "",
    alasan: "",
    tanggal_keluar: "",
    jam_keluar: "",
    jam_datang: "",
  })

  const filteredPermits = permits.filter((permit) => {
    const matchesSearch =
      permit.siswa.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permit.siswa.no_induk_santri.includes(searchTerm) ||
      permit.alasan.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || permit.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const handleStatusChange = (permitId: number, newStatus: "disetujui" | "ditolak") => {
    setPermits(
      permits.map((permit) =>
        permit.id === permitId ? { ...permit, status: newStatus, updated_at: new Date().toISOString() } : permit,
      ),
    )
  }

  const handleCreatePermit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const selectedStudent = mockStudents.find((s) => s.id === Number.parseInt(newPermit.siswa_id))
      if (!selectedStudent) return

      const newPermitData: ExitPermit = {
        id: permits.length + 1,
        siswa_id: Number.parseInt(newPermit.siswa_id),
        siswa: {
          nama_lengkap: selectedStudent.nama_lengkap,
          no_induk_santri: selectedStudent.no_induk_santri,
          kelas_masuk: selectedStudent.kelas_masuk,
          foto: "/student-boy.png",
        },
        alasan: newPermit.alasan,
        tanggal_keluar: newPermit.tanggal_keluar,
        jam_keluar: newPermit.jam_keluar,
        jam_datang: newPermit.jam_datang,
        status: "pending",
        dibuat_oleh: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      setPermits([newPermitData, ...permits])
      setNewPermit({
        siswa_id: "",
        alasan: "",
        tanggal_keluar: "",
        jam_keluar: "",
        jam_datang: "",
      })
      setShowCreateForm(false)
    } catch (error) {
      console.error("Error creating permit:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            <Clock className="h-3 w-3 mr-1" />
            Menunggu
          </Badge>
        )
      case "disetujui":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            <Check className="h-3 w-3 mr-1" />
            Disetujui
          </Badge>
        )
      case "ditolak":
        return (
          <Badge variant="outline" className="text-red-600 border-red-600">
            <X className="h-3 w-3 mr-1" />
            Ditolak
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

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
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Buat Izin Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Buat Izin Keluar Baru</DialogTitle>
              <DialogDescription>Lengkapi form untuk membuat permohonan izin keluar</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreatePermit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siswa_id">Pilih Siswa</Label>
                <Select
                  value={newPermit.siswa_id}
                  onValueChange={(value) => setNewPermit((prev) => ({ ...prev, siswa_id: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih siswa" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockStudents.map((student) => (
                      <SelectItem key={student.id} value={student.id.toString()}>
                        {student.nama_lengkap} - {student.no_induk_santri}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="alasan">Alasan Izin</Label>
                <Textarea
                  id="alasan"
                  placeholder="Jelaskan alasan izin keluar..."
                  value={newPermit.alasan}
                  onChange={(e) => setNewPermit((prev) => ({ ...prev, alasan: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tanggal_keluar">Tanggal Keluar</Label>
                <Input
                  id="tanggal_keluar"
                  type="date"
                  value={newPermit.tanggal_keluar}
                  onChange={(e) => setNewPermit((prev) => ({ ...prev, tanggal_keluar: e.target.value }))}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jam_keluar">Jam Keluar</Label>
                  <Input
                    id="jam_keluar"
                    type="time"
                    value={newPermit.jam_keluar}
                    onChange={(e) => setNewPermit((prev) => ({ ...prev, jam_keluar: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jam_datang">Jam Kembali</Label>
                  <Input
                    id="jam_datang"
                    type="time"
                    value={newPermit.jam_datang}
                    onChange={(e) => setNewPermit((prev) => ({ ...prev, jam_datang: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                  Batal
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Menyimpan..." : "Buat Izin"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Cari berdasarkan nama siswa, NIS, atau alasan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
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

      {/* Permits List */}
      <div className="grid gap-4">
        {filteredPermits.map((permit) => (
          <Card key={permit.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={permit.siswa.foto || "/placeholder.svg"} alt={permit.siswa.nama_lengkap} />
                    <AvatarFallback>
                      {permit.siswa.nama_lengkap
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">{permit.siswa.nama_lengkap}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>NIS: {permit.siswa.no_induk_santri}</span>
                      <span>Kelas: {permit.siswa.kelas_masuk}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(permit.tanggal_keluar).toLocaleDateString("id-ID")}
                      </span>
                      <span>
                        {permit.jam_keluar} - {permit.jam_datang}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground max-w-md truncate">{permit.alasan}</p>
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
                              <AvatarImage
                                src={selectedPermit.siswa.foto || "/placeholder.svg"}
                                alt={selectedPermit.siswa.nama_lengkap}
                              />
                              <AvatarFallback>
                                {selectedPermit.siswa.nama_lengkap
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .slice(0, 2)}
                              </AvatarFallback>
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
                                <p>
                                  <span className="font-medium">Tanggal:</span>{" "}
                                  {new Date(selectedPermit.tanggal_keluar).toLocaleDateString("id-ID", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </p>
                                <p>
                                  <span className="font-medium">Jam Keluar:</span> {selectedPermit.jam_keluar}
                                </p>
                                <p>
                                  <span className="font-medium">Jam Kembali:</span> {selectedPermit.jam_datang}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <h4 className="font-semibold">Informasi Permohonan</h4>
                              <div className="space-y-1 text-sm">
                                <p>
                                  <span className="font-medium">Dibuat:</span>{" "}
                                  {new Date(selectedPermit.created_at).toLocaleDateString("id-ID")}
                                </p>
                                <p>
                                  <span className="font-medium">Diperbarui:</span>{" "}
                                  {new Date(selectedPermit.updated_at).toLocaleDateString("id-ID")}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-semibold">Alasan Izin</h4>
                            <p className="text-sm bg-muted p-3 rounded-lg">{selectedPermit.alasan}</p>
                          </div>

                          {selectedPermit.status === "pending" && (
                            <div className="flex justify-end space-x-2">
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                                  >
                                    <X className="h-4 w-4 mr-2" />
                                    Tolak
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Tolak Izin Keluar</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Apakah Anda yakin ingin menolak permohonan izin keluar dari{" "}
                                      {selectedPermit.siswa.nama_lengkap}?
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleStatusChange(selectedPermit.id, "ditolak")}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Tolak Izin
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>

                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    className="text-green-600 border-green-600 hover:bg-green-50 bg-transparent"
                                    variant="outline"
                                  >
                                    <Check className="h-4 w-4 mr-2" />
                                    Setujui
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Setujui Izin Keluar</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Apakah Anda yakin ingin menyetujui permohonan izin keluar dari{" "}
                                      {selectedPermit.siswa.nama_lengkap}?
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleStatusChange(selectedPermit.id, "disetujui")}
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      Setujui Izin
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          )}
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  {permit.status === "pending" && (
                    <>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 border-green-600 bg-transparent"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Setujui Izin Keluar</AlertDialogTitle>
                            <AlertDialogDescription>
                              Apakah Anda yakin ingin menyetujui permohonan izin keluar dari {permit.siswa.nama_lengkap}
                              ?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleStatusChange(permit.id, "disetujui")}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Setujui
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-600 bg-transparent">
                            <X className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Tolak Izin Keluar</AlertDialogTitle>
                            <AlertDialogDescription>
                              Apakah Anda yakin ingin menolak permohonan izin keluar dari {permit.siswa.nama_lengkap}?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleStatusChange(permit.id, "ditolak")}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Tolak
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredPermits.length === 0 && (
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
              <div className="text-2xl font-bold text-yellow-600">
                {permits.filter((p) => p.status === "pending").length}
              </div>
              <p className="text-sm text-muted-foreground">Menunggu</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {permits.filter((p) => p.status === "disetujui").length}
              </div>
              <p className="text-sm text-muted-foreground">Disetujui</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {permits.filter((p) => p.status === "ditolak").length}
              </div>
              <p className="text-sm text-muted-foreground">Ditolak</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
