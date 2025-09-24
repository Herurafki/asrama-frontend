"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Users } from "lucide-react"

/** --- Endpoint sederhana ---
 * Pastikan .env.local: NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
 * (JANGAN ada /api di belakang)
 */
const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000"
const ENDPOINT_PARENT = `${BASE}/api/orangtua` // GET (prefill) & POST (upsert)

type ParentData = {
  nama_ayah: string
  pendidikan_ayah: string
  pekerjaan_ayah: string
  nama_ibu: string
  pendidikan_ibu: string
  pekerjaan_ibu: string
  nama_wali: string
  pekerjaan_wali: string
  alamat_wali: string
  alamat: string
  no_hp: string
}

const sanitize = (raw: any): ParentData => ({
  nama_ayah: raw?.nama_ayah ?? "",
  pendidikan_ayah: raw?.pendidikan_ayah ?? "",
  pekerjaan_ayah: raw?.pekerjaan_ayah ?? "",
  nama_ibu: raw?.nama_ibu ?? "",
  pendidikan_ibu: raw?.pendidikan_ibu ?? "",
  pekerjaan_ibu: raw?.pekerjaan_ibu ?? "",
  nama_wali: raw?.nama_wali ?? "",
  pekerjaan_wali: raw?.pekerjaan_wali ?? "",
  alamat_wali: raw?.alamat_wali ?? "",
  alamat: raw?.alamat ?? "",
  no_hp: raw?.no_hp ?? "",
})

export default function ParentPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [data, setData] = useState<ParentData>({
    nama_ayah: "", pendidikan_ayah: "", pekerjaan_ayah: "",
    nama_ibu: "", pendidikan_ibu: "", pekerjaan_ibu: "",
    nama_wali: "", pekerjaan_wali: "", alamat_wali: "",
    alamat: "", no_hp: "",
  })

  // Prefill (GET /api/orangtua)
  useEffect(() => {
    let ignore = false
    ;(async () => {
      try {
        const token = localStorage.getItem("auth_token")
        const res = await axios.get(ENDPOINT_PARENT, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const existing = res?.data?.data ?? res?.data
        if (!ignore && existing) setData(sanitize(existing))
      } catch {/* belum ada → biarkan kosong */}
    })()
    return () => { ignore = true }
  }, [])

  // Simpan (POST /api/orangtua) — upsert
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true); setError(""); setSuccess("")
    try {
      const token = localStorage.getItem("auth_token")
      const fd = new FormData()
      // KIRIM SEMUA FIELD — supaya benar2 overwrite (termasuk jadi kosong)
      Object.entries(data).forEach(([k, v]) => fd.append(`orangtua[${k}]`, v ?? ""))

      await axios.post(ENDPOINT_PARENT, fd, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      })
      setSuccess("Data orang tua/wali tersimpan.")
    } catch (err: any) {
      setError(axios.isAxiosError(err) ? (err.response?.data?.message || "Gagal menyimpan") : "Unexpected error")
    } finally { setIsLoading(false) }
  }

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-4">
      <div className="text-center space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold">Data Orang Tua/Wali</h1>
        <p className="text-sm text-muted-foreground">Isi atau ubah profil orang tua/wali</p>
      </div>

      {error   && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
      {success && <Alert className="border-green-200 bg-green-50 text-green-800"><AlertDescription>{success}</AlertDescription></Alert>}

      <form
        onSubmit={onSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const el = e.target as HTMLElement
            const inSelect = el.closest("[data-radix-select-content],[data-radix-select-trigger]")
            if (!inSelect && el.tagName !== "TEXTAREA") e.preventDefault()
          }
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" /> Data Orang Tua/Wali
            </CardTitle>
            <CardDescription>Semua kolom opsional; isi yang kamu punya.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Ayah */}
            <section className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold">Data Ayah</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nama Ayah</Label>
                  <Input value={data.nama_ayah} onChange={e=>setData(p=>({...p, nama_ayah: e.target.value}))} />
                </div>
                <div className="space-y-2">
                  <Label>Pendidikan Ayah</Label>
                  <Select value={data.pendidikan_ayah || undefined} onValueChange={(v)=>setData(p=>({...p, pendidikan_ayah: v}))}>
                    <SelectTrigger><SelectValue placeholder="Pilih pendidikan" /></SelectTrigger>
                    <SelectContent>
                      {["SD","SMP","SMA","D3","S1","S2","S3"].map(x => <SelectItem key={x} value={x}>{x}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Pekerjaan Ayah</Label>
                  <Input value={data.pekerjaan_ayah} onChange={e=>setData(p=>({...p, pekerjaan_ayah: e.target.value}))} />
                </div>
              </div>
            </section>

            {/* Ibu */}
            <section className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold">Data Ibu</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nama Ibu</Label>
                  <Input value={data.nama_ibu} onChange={e=>setData(p=>({...p, nama_ibu: e.target.value}))} />
                </div>
                <div className="space-y-2">
                  <Label>Pendidikan Ibu</Label>
                  <Select value={data.pendidikan_ibu || undefined} onValueChange={(v)=>setData(p=>({...p, pendidikan_ibu: v}))}>
                    <SelectTrigger><SelectValue placeholder="Pilih pendidikan" /></SelectTrigger>
                    <SelectContent>
                      {["SD","SMP","SMA","D3","S1","S2","S3"].map(x => <SelectItem key={x} value={x}>{x}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Pekerjaan Ibu</Label>
                  <Input value={data.pekerjaan_ibu} onChange={e=>setData(p=>({...p, pekerjaan_ibu: e.target.value}))} />
                </div>
              </div>
            </section>

            {/* Wali & Kontak */}
            <section className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold">Wali (Opsional) & Kontak</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nama Wali</Label>
                  <Input value={data.nama_wali} onChange={e=>setData(p=>({...p, nama_wali: e.target.value}))} />
                </div>
                <div className="space-y-2">
                  <Label>Pekerjaan Wali</Label>
                  <Input value={data.pekerjaan_wali} onChange={e=>setData(p=>({...p, pekerjaan_wali: e.target.value}))} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Alamat Wali</Label>
                  <Textarea rows={2} value={data.alamat_wali} onChange={e=>setData(p=>({...p, alamat_wali: e.target.value}))} />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label>Alamat Rumah</Label>
                  <Textarea rows={3} value={data.alamat} onChange={e=>setData(p=>({...p, alamat: e.target.value}))} />
                </div>
                <div className="space-y-2">
                  <Label>No. HP/WhatsApp</Label>
                  <Input value={data.no_hp} onChange={e=>setData(p=>({...p, no_hp: e.target.value}))} />
                </div>
              </div>
            </section>
          </CardContent>
        </Card>

        <div className="mt-4 flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={()=>router.push("/dashboard/students")}>Ke Halaman Siswa</Button>
          <Button type="submit" disabled={isLoading}>{isLoading ? "Menyimpan..." : "Simpan"}</Button>
        </div>
      </form>
    </div>
  )
}
