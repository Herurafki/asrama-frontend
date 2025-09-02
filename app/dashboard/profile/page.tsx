"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { User, Mail, Shield, Camera, Key, Settings, Save, Edit } from "lucide-react"

interface UserProfile {
  id: number
  nama: string
  email: string
  role: "admin" | "orang_tua"
  created_at: string
  updated_at: string
  profile_picture?: string
}

// Mock user data
const mockUser: UserProfile = {
  id: 1,
  nama: "Ahmad Suryadi",
  email: "ahmad.suryadi@asrama.com",
  role: "admin",
  created_at: "2024-01-15T08:00:00Z",
  updated_at: "2025-08-23T10:00:00Z",
  profile_picture: "/professional-admin-avatar.png",
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile>(mockUser)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const [editForm, setEditForm] = useState({
    nama: user.nama,
    email: user.email,
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [showPasswordDialog, setShowPasswordDialog] = useState(false)

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      // TODO: Implement actual profile update logic
      console.log("Updating profile:", editForm)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setUser((prev) => ({
        ...prev,
        nama: editForm.nama,
        email: editForm.email,
        updated_at: new Date().toISOString(),
      }))

      setSuccess("Profile berhasil diperbarui")
      setIsEditing(false)
    } catch (err) {
      setError("Terjadi kesalahan saat memperbarui profile")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("Password baru dan konfirmasi password tidak cocok")
      setIsLoading(false)
      return
    }

    if (passwordForm.newPassword.length < 6) {
      setError("Password baru minimal 6 karakter")
      setIsLoading(false)
      return
    }

    try {
      // TODO: Implement actual password change logic
      console.log("Changing password")

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess("Password berhasil diubah")
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      setShowPasswordDialog(false)
    } catch (err) {
      setError("Terjadi kesalahan saat mengubah password")
    } finally {
      setIsLoading(false)
    }
  }

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // TODO: Implement actual file upload logic
      const reader = new FileReader()
      reader.onload = (event) => {
        setUser((prev) => ({
          ...prev,
          profile_picture: event.target?.result as string,
          updated_at: new Date().toISOString(),
        }))
        setSuccess("Foto profile berhasil diperbarui")
      }
      reader.readAsDataURL(file)
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
            <User className="h-3 w-3 mr-1" />
            Orang Tua
          </Badge>
        )
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Profile Pengguna</h1>
        <p className="text-muted-foreground">Kelola informasi akun dan pengaturan Anda</p>
      </div>

      {/* Success/Error Messages */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50 text-green-800">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Keamanan</TabsTrigger>
          <TabsTrigger value="settings">Pengaturan</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Profile</CardTitle>
              <CardDescription>Kelola informasi dasar akun Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture Section */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.profile_picture || "/placeholder.svg"} alt={user.nama} />
                    <AvatarFallback className="text-lg">
                      {user.nama
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full h-8 w-8 p-0 bg-transparent"
                      onClick={() => document.getElementById("profile-picture")?.click()}
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                    <input
                      id="profile-picture"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfilePictureChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{user.nama}</h3>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{user.email}</span>
                  </div>
                  {getRoleBadge(user.role)}
                </div>
              </div>

              <Separator />

              {/* Profile Form */}
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nama">Nama Lengkap</Label>
                    <Input
                      id="nama"
                      value={isEditing ? editForm.nama : user.nama}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, nama: e.target.value }))}
                      disabled={!isEditing}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={isEditing ? editForm.email : user.email}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" value={user.role === "admin" ? "Administrator" : "Orang Tua"} disabled />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="created_at">Bergabung Sejak</Label>
                    <Input id="created_at" value={new Date(user.created_at).toLocaleDateString("id-ID")} disabled />
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
                          setEditForm({ nama: user.nama, email: user.email })
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
                    <Button type="button" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Keamanan Akun</CardTitle>
              <CardDescription>Kelola password dan pengaturan keamanan akun</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">Password</h4>
                    <p className="text-sm text-muted-foreground">
                      Terakhir diubah: {new Date(user.updated_at).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                  <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Key className="h-4 w-4 mr-2" />
                        Ubah Password
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Ubah Password</DialogTitle>
                        <DialogDescription>Masukkan password lama dan password baru Anda</DialogDescription>
                      </DialogHeader>

                      <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Password Saat Ini</Label>
                          <Input
                            id="currentPassword"
                            type="password"
                            value={passwordForm.currentPassword}
                            onChange={(e) => setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="newPassword">Password Baru</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            value={passwordForm.newPassword}
                            onChange={(e) => setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                            required
                            minLength={6}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={passwordForm.confirmPassword}
                            onChange={(e) => setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                            required
                            minLength={6}
                          />
                        </div>

                        <div className="flex justify-end space-x-2">
                          <Button type="button" variant="outline" onClick={() => setShowPasswordDialog(false)}>
                            Batal
                          </Button>
                          <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Mengubah..." : "Ubah Password"}
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">Aktivitas Login</h4>
                    <p className="text-sm text-muted-foreground">Login terakhir: Hari ini, 10:30 WIB</p>
                  </div>
                  <Button variant="outline" disabled>
                    Lihat Riwayat
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Aplikasi</CardTitle>
              <CardDescription>Kustomisasi pengalaman penggunaan aplikasi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">Notifikasi Email</h4>
                    <p className="text-sm text-muted-foreground">Terima notifikasi melalui email</p>
                  </div>
                  <Button variant="outline" disabled>
                    <Settings className="h-4 w-4 mr-2" />
                    Atur
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">Bahasa</h4>
                    <p className="text-sm text-muted-foreground">Bahasa Indonesia</p>
                  </div>
                  <Button variant="outline" disabled>
                    Ubah
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">Zona Waktu</h4>
                    <p className="text-sm text-muted-foreground">WIB (UTC+7)</p>
                  </div>
                  <Button variant="outline" disabled>
                    Ubah
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium text-destructive">Zona Bahaya</h4>
                <div className="flex items-center justify-between p-4 border border-destructive rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">Hapus Akun</h4>
                    <p className="text-sm text-muted-foreground">
                      Hapus akun dan semua data yang terkait secara permanen
                    </p>
                  </div>
                  <Button variant="destructive" disabled>
                    Hapus Akun
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
