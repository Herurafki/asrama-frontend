import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserPlus, FileText, CheckCircle } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Selamat datang di Portal Orang Tua Asrama</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Anak Terdaftar</CardTitle>
            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Anak Anda di asrama</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Izin Diajukan</CardTitle>
            <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Izin yang diajukan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Izin Menunggu</CardTitle>
            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Menunggu persetujuan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Izin Disetujui</CardTitle>
            <UserPlus className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Bulan ini</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
            <CardDescription>Aktivitas terkait anak Anda dalam 7 hari terakhir</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="bg-accent/10 p-2 rounded-full">
                  <CheckCircle className="h-4 w-4 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Izin keluar disetujui</p>
                  <p className="text-xs text-muted-foreground">Ahmad Rizki - 2 hari lalu</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-accent/10 p-2 rounded-full">
                  <FileText className="h-4 w-4 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Izin keluar diajukan</p>
                  <p className="text-xs text-muted-foreground">Siti Nurhaliza - 1 hari lalu</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-accent/10 p-2 rounded-full">
                  <Users className="h-4 w-4 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Data anak diperbarui</p>
                  <p className="text-xs text-muted-foreground">Ahmad Rizki - 3 hari lalu</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pengumuman</CardTitle>
            <CardDescription>Informasi penting untuk orang tua</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-accent pl-4">
                <p className="text-sm font-medium">Jadwal Kunjungan</p>
                <p className="text-xs text-muted-foreground">
                  Jadwal kunjungan orang tua setiap hari Minggu pukul 09.00-16.00 WIB
                </p>
              </div>
              <div className="border-l-4 border-accent pl-4">
                <p className="text-sm font-medium">Libur Semester</p>
                <p className="text-xs text-muted-foreground">
                  Libur semester akan dimulai tanggal 15 Desember 2025. Harap siapkan penjemputan anak.
                </p>
              </div>
              <div className="border-l-4 border-accent pl-4">
                <p className="text-sm font-medium">Pembayaran SPP</p>
                <p className="text-xs text-muted-foreground">
                  Reminder: Pembayaran SPP bulan September jatuh tempo tanggal 10 September 2025
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
