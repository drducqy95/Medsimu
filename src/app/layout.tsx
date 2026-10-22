import type { Metadata, Viewport } from "next";
import "./globals.css";
import { HospitalNavbar } from "@/components/layout/HospitalNavbar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export const metadata: Metadata = {
  title: "MedSim: Bác Sĩ Thực Tập - Game Học Tập & Mô Phỏng Y Khoa",
  description: "Web App học tập y khoa dưới dạng chơi game mô phỏng quá trình khám chữa bệnh, chạy điện tâm đồ, siêu âm đầu dò 3D, đọc X-quang, CT và điều trị cấp cứu.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark">
      <body className="min-h-screen bg-hospital-950 text-slate-100 antialiased flex flex-col selection:bg-cyan-500 selection:text-white touch-manipulation">
        <HospitalNavbar />
        <main className="flex-1 w-full pb-16 md:pb-0">{children}</main>
        <footer className="border-t border-hospital-800/80 bg-hospital-950 py-6 mb-14 md:mb-0 text-center text-xs text-slate-500">
          <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-400">MEDSIM RPG v2.0</span>
              <span>— Nền tảng Mô Phỏng Lâm Sàng Chuẩn Y Khoa</span>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span>Chuẩn Bộ Y Tế & AHA Guidelines</span>
              <span>•</span>
              <span className="text-cyan-400">Deterministic Simulation Engine</span>
            </div>
          </div>
        </footer>
        <MobileBottomNav />
      </body>
    </html>
  );
}
