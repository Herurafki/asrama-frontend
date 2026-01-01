"use client"

import api from "@/lib/api" 
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Mail, Shield, Save, Edit, Key } from "lucide-react"
import { toast } from "sonner"

interface UserProfile {
  id: number
  name: string
  email: string
  role: "user"
  created_at: string
  updated_at: string
  profile_picture?: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [editForm, setEditForm] = useState({ name: "", email: "" })
  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  })

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true)
      const { data } = await api.get("/profile")
      setUser(data)
      setEditForm({ name: data.name, email: data.email })
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Gagal memuat data profil pengguna")
    } finally {
      setIsLoading(false)
    }
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setIsLoading(true)


    try {
      const { data } = await api.patch(`/profile/${user.id}`, editForm)
      setUser(data)
      toast.success("Profil berhasil diperbarui")
      setIsEditing(false)
    } catch (err: any)  {
      toast.error(err.response?.data?.message || "Gagal memperbarui profil")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setIsLoading(true)

    if (passwordForm.new_password !== passwordForm.new_password_confirmation) {
      toast.error("Password baru dan konfirmasi password baru tidak cocok")
      setIsLoading(false)
      return
    }

    try {
      await api.patch(`/profile/${user.id}/password`, passwordForm)
      toast.success("Password berhasil diperbarui")
      setPasswordForm({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      })
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Terjadi kesalahan saat mengubah password")
    } finally {
      setIsLoading(false)
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge variant="default" className="bg-accent text-accent-foreground">
            <Shield className="h-3 w-3 mr-1" />
            Administrator
          </Badge>
        )
      case "orang_tua":
        return (
          <Badge variant="secondary">
            <Shield className="h-3 w-3 mr-1" />
            Orang Tua
          </Badge>
        )
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  if (isLoading && !user) return <p className="text-center py-10">Memuat data...</p>

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-center text-3xl font-bold text-foreground">Profil Pengguna</h1>
        <p className="text-center text-muted-foreground">Lihat dan ubah informasi akun Anda</p>
      </div>

      {user && (
        <Card>
          <CardHeader>
            <CardTitle>Informasi Profil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/usericon.png" />
                <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{user.name}</h3>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{user.email}</span>
                </div>
                {getRoleBadge(user.role)}
              </div>
            </div>

            <Separator />

            {/* Form Update Profil */}
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Lengkap</Label>
                  <Input
                    id="name"
                    value={isEditing ? editForm.name : user.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={isEditing ? editForm.email : user.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                {isEditing ? (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false)
                        setEditForm({ name: user.name, email: user.email })
                      }}
                    >
                      Batal
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      <Save className="h-4 w-4 mr-2" />
                      {isLoading ? "Menyimpan..." : "Simpan"}
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profil
                  </Button>
                )}
              </div>
            </form>

            <Separator />

            {/* Form Ubah Password */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Key className="h-4 w-4" /> Ubah Password
              </h3>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current_password">Password Sekarang</Label>
                  <Input
                    id="current_password"
                    type="password"
                    value={passwordForm.current_password}
                    onChange={(e) => setPasswordForm({ ...passwordForm, current_password: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new_password">Password Baru</Label>
                  <Input
                    id="new_password"
                    type="password"
                    value={passwordForm.new_password}
                    onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })}
                    required
                    minLength={6}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm_password">Konfirmasi Password Baru</Label>
                  <Input
                    id="confirm_password"
                    type="password"
                    value={passwordForm.new_password_confirmation}
                    onChange={(e) => setPasswordForm({ ...passwordForm, new_password_confirmation: e.target.value })}
                    required
                    minLength={6}
                  />
                </div>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Mengubah..." : "Ubah Password"}
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
