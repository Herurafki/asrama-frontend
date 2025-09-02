"use client"

import type React from "react"

import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Upload, User, Users } from "lucide-react"

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

interface ParentData {
  nama_ayah: string
  pend_ayah: string
  pekerjaan_ayah: string
  nama_ibu: string
  pend_ibu: string
  pekerjaan_ibu: string
  alamat: string
  nama_wali: string
  pekerjaan_wali: string
  alamat_wali: string
  no_hp: string
}

export default function RegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [studentData, setStudentData] = useState<StudentData>({
    nama_lengkap: "",
    nama_panggilan: "",
    nis: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    kewarganegaraan: "WNI",
    status_keluarga: "",
    status_orangtua: "",
    anak_ke: "",
    tgl_masuk: "",
    kelas: "",

    foto: null,
  })

  const [parentData, setParentData] = useState<ParentData>({
    nama_ayah: "",
    pend_ayah: "",
    pekerjaan_ayah: "",
    nama_ibu: "",
    pend_ibu: "",
    pekerjaan_ibu: "",
    nama_wali: "",
    pekerjaan_wali: "",
    alamat_wali: "",
    alamat: "",
    no_hp: "",
  })

  const totalSteps = 2
  const progress = (currentStep / totalSteps) * 100

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setStudentData((prev) => ({ ...prev, foto: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      // TODO: Implement actual registration logic
      const formData = new FormData()

    // siswa data
    formData.append("siswa[nama_lengkap]", studentData.nama_lengkap)
    formData.append("siswa[nama_panggilan]", studentData.nama_panggilan)
    formData.append("siswa[nis]", studentData.nis)
    formData.append("siswa[tempat_lahir]", studentData.tempat_lahir)
    formData.append("siswa[tanggal_lahir]", studentData.tanggal_lahir)
    formData.append("siswa[jenis_kelamin]", studentData.jenis_kelamin)
    formData.append("siswa[kewarganegaraan]", studentData.kewarganegaraan) // harus WNI/WNA
    formData.append("siswa[status_keluarga]", studentData.status_keluarga)
    formData.append("siswa[status_orangtua]", studentData.status_orangtua)
    formData.append("siswa[anak_ke]", studentData.anak_ke)
    formData.append("siswa[tgl_masuk]", studentData.tgl_masuk)
    formData.append("siswa[kelas]", studentData.kelas)

    if (studentData.foto) {
      formData.append("siswa[foto]", studentData.foto)
    }

    // orangtua data
    Object.entries(parentData).forEach(([key, value]) => {
      if (value) {
        formData.append(`orangtua[${key}]`, value)
      }
    })

    const token = localStorage.getItem("auth_token")

    await axios.post("http://127.0.0.1:8000/api/pendaftaran", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })

    setSuccess("Pendaftaran berhasil! Data siswa telah disimpan.")

    // Reset form
    setCurrentStep(1)
    setStudentData({
      nama_lengkap: "",
      nama_panggilan: "",
      nis: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      jenis_kelamin: "",
      kewarganegaraan: "WNI", // default valid
      status_keluarga: "",
      status_orangtua: "",
      anak_ke: "",
      tgl_masuk: "",
      kelas: "",
      foto: null,
    })
    setParentData({
      nama_ayah: "",
      pend_ayah: "",
      pekerjaan_ayah: "",
      nama_ibu: "",
      pend_ibu: "",
      pekerjaan_ibu: "",
      nama_wali: "",
      pekerjaan_wali: "",
      alamat_wali: "",
      alamat: "",
      no_hp: "",
    })
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      setError(err.response?.data?.message || "Terjadi kesalahan saat menyimpan data")
    } else {
      setError("Unexpected error")
    }
  } finally {
    setIsLoading(false)
  }
    
  }

  const validateStep1 = () => {
    return (
      studentData.nama_lengkap &&
      studentData.nama_panggilan &&
      studentData.nis &&
      studentData.tempat_lahir &&
      studentData.tanggal_lahir &&
      studentData.jenis_kelamin &&
      studentData.tgl_masuk &&
      studentData.kelas
    )
  }

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Pendaftaran Siswa Baru</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Lengkapi data siswa dan orang tua/wali</p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
          <span>
            Langkah {currentStep} dari {totalSteps}
          </span>
          <span>{Math.round(progress)}% selesai</span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      {/* Success/Error Messages */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription className="text-sm">{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50 text-green-800">
          <AlertDescription className="text-sm">{success}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        {/* Step 1: Student Data */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                <User className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Data Siswa</span>
              </CardTitle>
              <CardDescription className="text-sm">Masukkan informasi lengkap siswa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nama_lengkap" className="text-sm">
                    Nama Lengkap *
                  </Label>
                  <Input
                    id="nama_lengkap"
                    value={studentData.nama_lengkap}
                    onChange={(e) => setStudentData((prev) => ({ ...prev, nama_lengkap: e.target.value }))}
                    placeholder="Masukkan nama lengkap"
                    className="h-10 sm:h-9"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nama_panggilan" className="text-sm">
                    Nama Panggilan *
                  </Label>
                  <Input
                    id="nama_panggilan"
                    value={studentData.nama_panggilan}
                    onChange={(e) => setStudentData((prev) => ({ ...prev, nama_panggilan: e.target.value }))}
                    placeholder="Masukkan nama panggilan"
                    className="h-10 sm:h-9"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nis" className="text-sm">
                    No. Induk Santri *
                  </Label>
                  <Input
                    id="nis"
                    value={studentData.nis}
                    onChange={(e) => setStudentData((prev) => ({ ...prev, nis: e.target.value }))}
                    placeholder="Masukkan nomor induk"
                    className="h-10 sm:h-9"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tempat_lahir" className="text-sm">
                    Tempat Lahir *
                  </Label>
                  <Input
                    id="tempat_lahir"
                    value={studentData.tempat_lahir}
                    onChange={(e) => setStudentData((prev) => ({ ...prev, tempat_lahir: e.target.value }))}
                    placeholder="Masukkan tempat lahir"
                    className="h-10 sm:h-9"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tanggal_lahir" className="text-sm">
                    Tanggal Lahir *
                  </Label>
                  <Input
                    id="tanggal_lahir"
                    type="date"
                    value={studentData.tanggal_lahir}
                    onChange={(e) => setStudentData((prev) => ({ ...prev, tanggal_lahir:e.target.value }))}
                    className="h-10 sm:h-9"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jenis_kelamin" className="text-sm">
                    Jenis Kelamin *
                  </Label>
                  <Select
                    value={studentData.jenis_kelamin}
                    onValueChange={(value) => setStudentData((prev) => ({ ...prev, jenis_kelamin: value }))}
                  >
                    <SelectTrigger className="h-10 sm:h-9">
                      <SelectValue placeholder="Pilih jenis kelamin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                      <SelectItem value="Perempuan">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="kewarganegaraan" className="text-sm">
                    Kewarganegaraan
                  </Label>
                  <Input
                    id="kewarganegaraan"
                    value={studentData.kewarganegaraan}
                    onChange={(e) => setStudentData((prev) => ({ ...prev, kewarganegaraan: e.target.value }))}
                    placeholder="Indonesia"
                    className="h-10 sm:h-9"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status_keluarga" className="text-sm">
                    Status Keluarga
                  </Label>
                  <Select
                    value={studentData.status_keluarga}
                    onValueChange={(value) => setStudentData((prev) => ({ ...prev, status_keluarga: value }))}
                  >
                    <SelectTrigger className="h-10 sm:h-9">
                      <SelectValue placeholder="Pilih status keluarga" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kandung">Anak Kandung</SelectItem>
                      <SelectItem value="Angkat">Anak Angkat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status_orangtua" className="text-sm">
                    Status Orang Tua
                  </Label>
                  <Select
                    value={studentData.status_orangtua}
                    onValueChange={(value) => setStudentData((prev) => ({ ...prev, status_orangtua: value }))}
                  >
                    <SelectTrigger className="h-10 sm:h-9">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yatim">Yatim</SelectItem>
                      <SelectItem value="Piatu">Piatu</SelectItem>
                      <SelectItem value="Yatim piatu">Yatim Piatu</SelectItem>
                      <SelectItem value="Dhuafa">Dhuafa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="anak_ke" className="text-sm">
                    Anak Ke-
                  </Label>
                  <Input
                    id="anak_ke"
                    type="number"
                    value={studentData.anak_ke}
                    onChange={(e) => setStudentData((prev) => ({ ...prev, anak_ke: e.target.value }))}
                    placeholder="1"
                    className="h-10 sm:h-9"
                    min="1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tgl_masuk" className="text-sm">
                    Tanggal Masuk *
                  </Label>
                  <Input
                    id="tgl_masuk"
                    type="date"
                    value={studentData.tgl_masuk}
                    onChange={(e) => setStudentData((prev) => ({ ...prev, tgl_masuk:e.target.value }))}
                    className="h-10 sm:h-9"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="kelas_masuk" className="text-sm">
                    Kelas Masuk *
                  </Label>
                  <Input
                    id="kelas"
                    value={studentData.kelas}
                    onChange={(e) => setStudentData((prev) => ({ ...prev, kelas: e.target.value }))}
                    placeholder="Contoh: I A"
                    className="h-10 sm:h-9"
                    required
                  />
                </div>

                {/* <div className="space-y-2">
                  <Label htmlFor="kamar_id" className="text-sm">
                    Kamar
                  </Label>
                  <Input
                    id="kamar_id"
                    value={studentData.kamar_id}
                    onChange={(e) => setStudentData((prev) => ({ ...prev, kamar_id: e.target.value }))}
                    placeholder="Nomor kamar"
                    className="h-10 sm:h-9"
                  />
                </div> */}
              </div>

              <div className="space-y-2">
                <Label htmlFor="foto" className="text-sm">
                  Foto Siswa
                </Label>
                <div className="flex items-center space-x-2">
                  <Input id="foto" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("foto")?.click()}
                    className="h-10 sm:h-9 w-full sm:w-auto"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {studentData.foto ? studentData.foto.name : "Pilih Foto"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Parent Data */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Data Orang Tua/Wali</span>
              </CardTitle>
              <CardDescription className="text-sm">Masukkan informasi orang tua dan wali siswa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Father's Data */}
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-foreground">Data Ayah</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nama_ayah" className="text-sm">
                      Nama Ayah
                    </Label>
                    <Input
                      id="nama_ayah"
                      value={parentData.nama_ayah}
                      onChange={(e) => setParentData((prev) => ({ ...prev, nama_ayah: e.target.value }))}
                      placeholder="Masukkan nama ayah"
                      className="h-10 sm:h-9"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pend_ayah" className="text-sm">
                      Pendidikan Ayah
                    </Label>
                    <Select
                      value={parentData.pend_ayah}
                      onValueChange={(value) => setParentData((prev) => ({ ...prev, pend_ayah: value }))}
                    >
                      <SelectTrigger className="h-10 sm:h-9">
                        <SelectValue placeholder="Pilih pendidikan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SD">SD</SelectItem>
                        <SelectItem value="SMP">SMP</SelectItem>
                        <SelectItem value="SMA">SMA</SelectItem>
                        <SelectItem value="D3">D3</SelectItem>
                        <SelectItem value="S1">S1</SelectItem>
                        <SelectItem value="S2">S2</SelectItem>
                        <SelectItem value="S3">S3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="pekerjaan_ayah" className="text-sm">
                      Pekerjaan Ayah
                    </Label>
                    <Input
                      id="pekerjaan_ayah"
                      value={parentData.pekerjaan_ayah}
                      onChange={(e) => setParentData((prev) => ({ ...prev, pekerjaan_ayah: e.target.value }))}
                      placeholder="Masukkan pekerjaan ayah"
                      className="h-10 sm:h-9"
                    />
                  </div>
                </div>
              </div>

              {/* Mother's Data */}
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-foreground">Data Ibu</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nama_ibu" className="text-sm">
                      Nama Ibu
                    </Label>
                    <Input
                      id="nama_ibu"
                      value={parentData.nama_ibu}
                      onChange={(e) => setParentData((prev) => ({ ...prev, nama_ibu: e.target.value }))}
                      placeholder="Masukkan nama ibu"
                      className="h-10 sm:h-9"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pend_ibu" className="text-sm">
                      Pendidikan Ibu
                    </Label>
                    <Select
                      value={parentData.pend_ibu}
                      onValueChange={(value) => setParentData((prev) => ({ ...prev, pend_ibu: value }))}
                    >
                      <SelectTrigger className="h-10 sm:h-9">
                        <SelectValue placeholder="Pilih pendidikan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SD">SD</SelectItem>
                        <SelectItem value="SMP">SMP</SelectItem>
                        <SelectItem value="SMA">SMA</SelectItem>
                        <SelectItem value="D3">D3</SelectItem>
                        <SelectItem value="S1">S1</SelectItem>
                        <SelectItem value="S2">S2</SelectItem>
                        <SelectItem value="S3">S3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="pekerjaan_ibu" className="text-sm">
                      Pekerjaan Ibu
                    </Label>
                    <Input
                      id="pekerjaan_ibu"
                      value={parentData.pekerjaan_ibu}
                      onChange={(e) => setParentData((prev) => ({ ...prev, pekerjaan_ibu: e.target.value }))}
                      placeholder="Masukkan pekerjaan ibu"
                      className="h-10 sm:h-9"
                    />
                  </div>
                </div>
              </div>

              {/* Guardian Data */}
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-foreground">Data Wali (Opsional)</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nama_wali" className="text-sm">
                      Nama Wali
                    </Label>
                    <Input
                      id="nama_wali"
                      value={parentData.nama_wali}
                      onChange={(e) => setParentData((prev) => ({ ...prev, nama_wali: e.target.value }))}
                      placeholder="Masukkan nama wali"
                      className="h-10 sm:h-9"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pekerjaan_wali" className="text-sm">
                      Pekerjaan Wali
                    </Label>
                    <Input
                      id="pekerjaan_wali"
                      value={parentData.pekerjaan_wali}
                      onChange={(e) => setParentData((prev) => ({ ...prev, pekerjaan_wali: e.target.value }))}
                      placeholder="Masukkan pekerjaan wali"
                      className="h-10 sm:h-9"
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="alamat_wali" className="text-sm">
                      Alamat Wali
                    </Label>
                    <Textarea
                      id="alamat_wali"
                      value={parentData.alamat_wali}
                      onChange={(e) => setParentData((prev) => ({ ...prev, alamat_wali: e.target.value }))}
                      placeholder="Masukkan alamat wali"
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-foreground">Informasi Kontak</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="alamat" className="text-sm">
                      Alamat Rumah
                    </Label>
                    <Textarea
                      id="alamat"
                      value={parentData.alamat}
                      onChange={(e) => setParentData((prev) => ({ ...prev, alamat: e.target.value }))}
                      placeholder="Masukkan alamat lengkap"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="no_hp" className="text-sm">
                      No. HP/WhatsApp
                    </Label>
                    <Input
                      id="no_hp"
                      value={parentData.no_hp}
                      onChange={(e) => setParentData((prev) => ({ ...prev, no_hp: e.target.value }))}
                      placeholder="08xxxxxxxxxx"
                      className="h-10 sm:h-9"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="h-11 sm:h-10 order-2 sm:order-1 bg-transparent"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Sebelumnya
          </Button>

          {currentStep < totalSteps ? (
            <Button
              type="button"
              onClick={handleNext}
              disabled={!validateStep1()}
              className="h-11 sm:h-10 order-1 sm:order-2"
            >
              Selanjutnya
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button type="submit" disabled={isLoading} className="h-11 sm:h-10 order-1 sm:order-2">
              {isLoading ? "Menyimpan..." : "Simpan Data"}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
