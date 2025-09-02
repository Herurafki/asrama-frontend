"use client"

import { useState } from "react"
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
import { Search, Plus, Eye, Edit } from "lucide-react"
import Link from "next/link"

const mockStudents = [
  {
    id: 1,
    nama_lengkap: "Ahmad Rizki Pratama",
    nama_panggilan: "Rizki",
    no_induk_santri: "2024001",
    tempat_lahir: "Jakarta",
    tanggal_lahir: "2010-05-15",
    kelas_masuk: "VII A",
    kamar_id: "101",
    jenis_kelamin: "L",
    status_keluarga: "anak_kandung",
    kewarganegaraan: "Indonesia",
    tgl_masuk: "2024-07-01",
    foto: "/student-boy.png",
    orang_tua: {
      nama_ayah: "Budi Pratama",
      nama_ibu: "Siti Aminah",
      no_hp: "081234567890",
      alamat: "Jl. Merdeka No. 123, Jakarta",
    },
  },
  {
    id: 2,
    nama_lengkap: "Siti Nurhaliza",
    nama_panggilan: "Siti",
    no_induk_santri: "2024002",
    tempat_lahir: "Bandung",
    tanggal_lahir: "2010-08-20",
    kelas_masuk: "VII B",
    kamar_id: "201",
    jenis_kelamin: "P",
    status_keluarga: "anak_kandung",
    kewarganegaraan: "Indonesia",
    tgl_masuk: "2024-07-01",
    foto: "/diverse-student-girl.png",
    orang_tua: {
      nama_ayah: "Ahmad Nurdin",
      nama_ibu: "Fatimah",
      no_hp: "081234567891",
      alamat: "Jl. Sudirman No. 456, Bandung",
    },
  },
]

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [students] = useState(mockStudents) // Removed setStudents and admin functions
  const [selectedStudent, setSelectedStudent] = useState<(typeof mockStudents)[0] | null>(null)

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.no_induk_santri.includes(searchTerm) ||
      student.kelas_masuk.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
  })

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

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Cari berdasarkan nama atau NIS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <div className="grid gap-4">
        {filteredStudents.map((student) => (
          <Card key={student.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={student.foto || "/placeholder.svg"} alt={student.nama_lengkap} />
                    <AvatarFallback>
                      {student.nama_lengkap
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">{student.nama_lengkap}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>NIS: {student.no_induk_santri}</span>
                      <span>Kelas: {student.kelas_masuk}</span>
                      <span>Kamar: {student.kamar_id}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={student.jenis_kelamin === "L" ? "default" : "secondary"}>
                        {student.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}
                      </Badge>
                      <Badge variant="outline">
                        {student.status_keluarga.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedStudent(student)}>
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
                              <AvatarFallback>
                                {selectedStudent.nama_lengkap
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-xl font-semibold">{selectedStudent.nama_lengkap}</h3>
                              <p className="text-muted-foreground">NIS: {selectedStudent.no_induk_santri}</p>
                            </div>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <h4 className="font-semibold">Data Pribadi</h4>
                              <div className="space-y-1 text-sm">
                                <p>
                                  <span className="font-medium">Nama Panggilan:</span> {selectedStudent.nama_panggilan}
                                </p>
                                <p>
                                  <span className="font-medium">Tempat, Tanggal Lahir:</span>{" "}
                                  {selectedStudent.tempat_lahir},{" "}
                                  {new Date(selectedStudent.tanggal_lahir).toLocaleDateString("id-ID")}
                                </p>
                                <p>
                                  <span className="font-medium">Jenis Kelamin:</span>{" "}
                                  {selectedStudent.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}
                                </p>
                                <p>
                                  <span className="font-medium">Kewarganegaraan:</span>{" "}
                                  {selectedStudent.kewarganegaraan}
                                </p>
                                <p>
                                  <span className="font-medium">Status Keluarga:</span>{" "}
                                  {selectedStudent.status_keluarga.replace("_", " ")}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <h4 className="font-semibold">Data Asrama</h4>
                              <div className="space-y-1 text-sm">
                                <p>
                                  <span className="font-medium">Tanggal Masuk:</span>{" "}
                                  {new Date(selectedStudent.tgl_masuk).toLocaleDateString("id-ID")}
                                </p>
                                <p>
                                  <span className="font-medium">Kelas:</span> {selectedStudent.kelas_masuk}
                                </p>
                                <p>
                                  <span className="font-medium">Kamar:</span> {selectedStudent.kamar_id}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                              <h4 className="font-semibold">Data Orang Tua</h4>
                              <div className="space-y-1 text-sm">
                                <p>
                                  <span className="font-medium">Nama Ayah:</span> {selectedStudent.orang_tua.nama_ayah}
                                </p>
                                <p>
                                  <span className="font-medium">Nama Ibu:</span> {selectedStudent.orang_tua.nama_ibu}
                                </p>
                                <p>
                                  <span className="font-medium">No. HP:</span> {selectedStudent.orang_tua.no_hp}
                                </p>
                                <p>
                                  <span className="font-medium">Alamat:</span> {selectedStudent.orang_tua.alamat}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredStudents.length === 0 && (
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
              <div className="text-2xl font-bold text-foreground">
                {students.filter((s) => s.jenis_kelamin === "L").length}
              </div>
              <p className="text-sm text-muted-foreground">Laki-laki</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {students.filter((s) => s.jenis_kelamin === "P").length}
              </div>
              <p className="text-sm text-muted-foreground">Perempuan</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
