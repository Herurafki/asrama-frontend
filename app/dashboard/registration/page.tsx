"use client"

import type React from "react"
import { useRef, useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, User } from "lucide-react"

// ======= GANTI JIKA PERLU =======
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000"
const ENDPOINT_STUDENT = `${API_BASE}/api/students` // contoh: /api/students

interface StudentData {
  nama_lengkap: string
  nama_panggilan: string
  nis: string
  tempat_lahir: string
  tanggal_lahir: string
  jenis_kelamin: string
  kewarganegaraan: string
  status_keluarga: string
  status_orangtua: string
  anak_ke: string
  tgl_masuk: string
  kelas: string
  foto: File | null
}

export default function StudentPage() {
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [studentData, setStudentData] = useState<StudentData>({
    nama_lengkap: "", nama_panggilan: "", nis: "",
    tempat_lahir: "", tanggal_lahir: "", jenis_kelamin: "",
    kewarganegaraan: "WNI", status_keluarga: "", status_orangtua: "",
    anak_ke: "", tgl_masuk: "", kelas: "", foto: null,
  })

  const validate = () =>
    studentData.nama_lengkap && studentData.nama_panggilan && studentData.nis &&
    studentData.tempat_lahir && studentData.tanggal_lahir && studentData.jenis_kelamin &&
    studentData.tgl_masuk && studentData.kelas

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setStudentData((prev) => ({ ...prev, foto: file }))
  }

  const handleSubmitStudent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true); setError(""); setSuccess("")
    try {
      const token = localStorage.getItem("auth_token")
      const formData = new FormData()
      formData.append("siswa[nama_lengkap]", studentData.nama_lengkap)
      formData.append("siswa[nama_panggilan]", studentData.nama_panggilan)
      formData.append("siswa[nis]", studentData.nis)
      formData.append("siswa[tempat_lahir]", studentData.tempat_lahir)
      formData.append("siswa[tanggal_lahir]", studentData.tanggal_lahir)
      formData.append("siswa[jenis_kelamin]", studentData.jenis_kelamin)
      formData.append("siswa[kewarganegaraan]", studentData.kewarganegaraan)
      formData.append("siswa[status_keluarga]", studentData.status_keluarga)
      formData.append("siswa[status_orangtua]", studentData.status_orangtua)
      formData.append("siswa[anak_ke]", studentData.anak_ke)
      formData.append("siswa[tgl_masuk]", studentData.tgl_masuk)
      formData.append("siswa[kelas]", studentData.kelas)
      if (studentData.foto) formData.append("siswa[foto]", studentData.foto)

      await axios.post(ENDPOINT_STUDENT, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      })

      setSuccess("Pendaftaran siswa berhasil disimpan.")
      setStudentData({
        nama_lengkap: "", nama_panggilan: "", nis: "",
        tempat_lahir: "", tanggal_lahir: "", jenis_kelamin: "",
        kewarganegaraan: "WNI", status_keluarga: "", status_orangtua: "",
        anak_ke: "", tgl_masuk: "", kelas: "", foto: null,
      })
      if (fileRef.current) fileRef.current.value = ""
    } catch (err: any) {
      setError(axios.isAxiosError(err) ? (err.response?.data?.message || "Gagal menyimpan data siswa") : "Unexpected error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-4 sm:space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold">Pendaftaran Siswa Baru</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Lengkapi data siswa</p>
      </div>

      {error && <Alert variant="destructive"><AlertDescription className="text-sm">{error}</AlertDescription></Alert>}
      {success && <Alert className="border-green-200 bg-green-50 text-green-800"><AlertDescription className="text-sm">{success}</AlertDescription></Alert>}

      <form onSubmit={handleSubmitStudent} onKeyDown={(e) => { if (e.key === "Enter") e.preventDefault() }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" />Data Siswa</CardTitle>
            <CardDescription>Masukkan informasi lengkap siswa</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>Nama Lengkap *</Label>
                <Input value={studentData.nama_lengkap} onChange={e=>setStudentData(p=>({...p, nama_lengkap: e.target.value}))} required />
              </div>
              <div className="space-y-2"><Label>Nama Panggilan *</Label>
                <Input value={studentData.nama_panggilan} onChange={e=>setStudentData(p=>({...p, nama_panggilan: e.target.value}))} required />
              </div>
              <div className="space-y-2"><Label>No. Induk Santri *</Label>
                <Input value={studentData.nis} onChange={e=>setStudentData(p=>({...p, nis: e.target.value}))} required />
              </div>
              <div className="space-y-2"><Label>Tempat Lahir *</Label>
                <Input value={studentData.tempat_lahir} onChange={e=>setStudentData(p=>({...p, tempat_lahir: e.target.value}))} required />
              </div>
              <div className="space-y-2"><Label>Tanggal Lahir *</Label>
                <Input type="date" value={studentData.tanggal_lahir} onChange={e=>setStudentData(p=>({...p, tanggal_lahir: e.target.value}))} required />
              </div>
              <div className="space-y-2"><Label>Jenis Kelamin *</Label>
                <Select value={studentData.jenis_kelamin} onValueChange={v=>setStudentData(p=>({...p, jenis_kelamin: v}))}>
                  <SelectTrigger><SelectValue placeholder="Pilih jenis kelamin" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                    <SelectItem value="Perempuan">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Kewarganegaraan</Label>
                <Input value={studentData.kewarganegaraan} onChange={e=>setStudentData(p=>({...p, kewarganegaraan: e.target.value}))} placeholder="WNI/WNA" />
              </div>
              <div className="space-y-2"><Label>Status Keluarga</Label>
                <Select value={studentData.status_keluarga} onValueChange={v=>setStudentData(p=>({...p, status_keluarga: v}))}>
                  <SelectTrigger><SelectValue placeholder="Pilih status keluarga" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Kandung">Anak Kandung</SelectItem>
                    <SelectItem value="Angkat">Anak Angkat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Status Orang Tua</Label>
                <Select value={studentData.status_orangtua} onValueChange={v=>setStudentData(p=>({...p, status_orangtua: v}))}>
                  <SelectTrigger><SelectValue placeholder="Pilih status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yatim">Yatim</SelectItem>
                    <SelectItem value="Piatu">Piatu</SelectItem>
                    <SelectItem value="Yatim piatu">Yatim Piatu</SelectItem>
                    <SelectItem value="Dhuafa">Dhuafa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Anak Ke-</Label>
                <Input type="number" min={1} value={studentData.anak_ke} onChange={e=>setStudentData(p=>({...p, anak_ke: e.target.value}))} />
              </div>
              <div className="space-y-2"><Label>Tanggal Masuk *</Label>
                <Input type="date" value={studentData.tgl_masuk} onChange={e=>setStudentData(p=>({...p, tgl_masuk: e.target.value}))} required />
              </div>
              <div className="space-y-2"><Label>Kelas Masuk *</Label>
                <Input value={studentData.kelas} onChange={e=>setStudentData(p=>({...p, kelas: e.target.value}))} placeholder="Contoh: I A" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Foto Siswa</Label>
              <div className="flex items-center gap-2">
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                <Button type="button" variant="outline" onClick={()=>fileRef.current?.click()}>
                  <Upload className="h-4 w-4 mr-2" />
                  {studentData.foto ? studentData.foto.name : "Pilih Foto"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 flex justify-end">
          <Button type="submit" disabled={isLoading || !validate()}>
            {isLoading ? "Menyimpan..." : "Simpan Data"}
          </Button>
        </div>
      </form>
    </div>
  )
}
