import React from "react";
import Link from "next/link";
import { Radio, HeartPulse, Activity, Eye, Scan, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

export default function SimulatorsHubPage() {
  const simulators = [
    {
      title: "Mô Phỏng Điện Tâm Đồ (ECG)",
      shortTitle: "Điện Tâm Đồ (ECG)",
      description: "Dải nhịp 60 FPS, 31 bệnh lý 9 hệ thống, thước Calipers đo PR/QRS/QTc, phác đồ cấp cứu.",
      specs: "60 FPS • 31 Bệnh Lý • Thước Calipers",
      icon: HeartPulse,
      href: "/simulators/ecg",
      color: "from-emerald-500/15 via-emerald-950/30 to-hospital-950 border-emerald-500/40 hover:border-emerald-400",
      iconColor: "text-emerald-400 bg-emerald-950/80 border-emerald-700/80",
      phase: "Ưu tiên",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700/60",
    },
    {
      title: "Mô Phỏng Siêu Âm Đầu Dò 3D Động",
      shortTitle: "Siêu Âm Đầu Dò 3D",
      description: "Đầu dò 3D thao tác tay (6 DoF), co bóp tim, trượt màng phổi, kho 1200+ ảnh thật từ CD.",
      specs: "3D 6 DoF • Kho 1200+ Ảnh Thật • POCUS",
      icon: Activity,
      href: "/simulators/ultrasound",
      color: "from-teal-500/15 via-teal-950/30 to-hospital-950 border-teal-500/40 hover:border-teal-400",
      iconColor: "text-teal-400 bg-teal-950/80 border-teal-700/80",
      phase: "Ưu tiên",
      badgeColor: "bg-teal-950 text-teal-300 border-teal-700/60",
    },
    {
      title: "Phòng Soi Phim X-Quang Tương Tác",
      shortTitle: "Soi Phim X-Quang",
      description: "Viewer chuẩn DICOM, chỉnh Window/Level, Zoom/Pan, bóc tách giải phẫu và đông đặc/tràn khí.",
      specs: "DICOM • Window/Level • Zoom/Pan",
      icon: Eye,
      href: "/simulators/xray",
      color: "from-blue-500/15 via-blue-950/30 to-hospital-950 border-blue-500/40 hover:border-blue-400",
      iconColor: "text-blue-400 bg-blue-950/80 border-blue-700/80",
      phase: "Đầy đủ",
      badgeColor: "bg-blue-950 text-blue-300 border-blue-700/60",
    },
    {
      title: "Bộ Cuộn Lát Cắt CT-Scanner Đa Tầng",
      shortTitle: "Cắt Lớp CT-Scan",
      description: "Cuộn lát cắt Axial sọ não, ngực, bụng; chuyển đổi cửa sổ Nhu mô/Xương/Phổi; đo đơn vị HU.",
      specs: "Axial Đa Tầng • Đo Số HU • 3 Cửa Sổ",
      icon: Scan,
      href: "/simulators/ct",
      color: "from-purple-500/15 via-purple-950/30 to-hospital-950 border-purple-500/40 hover:border-purple-400",
      iconColor: "text-purple-400 bg-purple-950/80 border-purple-700/80",
      phase: "Đầy đủ",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-700/60",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-3 sm:px-6 py-3 sm:py-5 space-y-3">
      {/* Compact Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hospital-800 pb-2.5">
        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-hospital-900 border border-hospital-800 text-slate-400 hover:text-white hover:bg-hospital-800 transition shrink-0"
            title="Quay lại Trang chủ"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-950/90 text-emerald-400 border border-emerald-800 shrink-0 shadow-sm">
            <Radio className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-xl font-extrabold text-white">
                Module 2: Bộ Mô Phỏng Cận Lâm Sàng
              </h1>
              <span className="rounded-full bg-emerald-950 px-2 py-0.2 text-[10px] font-bold text-emerald-400 border border-emerald-800">
                4 Thiết Bị Ảo
              </span>
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-1 hidden sm:block">
              Luyện tập độc lập kỹ năng đọc điện tâm đồ, siêu âm 3D tại giường, phim X-quang và lát cắt CT-Scan.
            </p>
          </div>
        </div>

        <div className="text-[11px] font-mono text-emerald-400 self-end sm:self-center">
          Chuẩn Y Khoa AHA/ESC 2026
        </div>
      </div>

      {/* Compact Cards Grid: Sleek responsive row cards on mobile, 4-column cards on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {simulators.map((sim) => {
          const Icon = sim.icon;
          return (
            <Link
              key={sim.href}
              href={sim.href}
              className={`group relative rounded-2xl border bg-gradient-to-br ${sim.color} p-3 sm:p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center sm:flex-col sm:items-start sm:justify-between gap-3`}
            >
              {/* Left on mobile / Top on desktop: Icon + Badging */}
              <div className="flex items-center sm:w-full sm:justify-between shrink-0">
                <div className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border shadow-sm ${sim.iconColor} group-hover:scale-105 transition-transform`}>
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <span className={`hidden sm:inline-flex text-[10px] font-bold px-2 py-0.5 rounded-full border ${sim.badgeColor}`}>
                  {sim.phase}
                </span>
              </div>

              {/* Center Content */}
              <div className="flex-1 min-w-0 space-y-0.5 sm:space-y-1 sm:my-2">
                <div className="flex items-center gap-1.5 justify-between">
                  <h2 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                    {sim.title}
                  </h2>
                  <span className={`sm:hidden text-[9px] font-bold px-1.5 py-0.2 rounded-full border shrink-0 ${sim.badgeColor}`}>
                    {sim.phase}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-tight line-clamp-1 sm:line-clamp-2">
                  {sim.description}
                </p>
                <div className="text-[10px] font-mono text-emerald-400/90 truncate pt-0.5">
                  {sim.specs}
                </div>
              </div>

              {/* Right CTA on mobile / Bottom on desktop */}
              <div className="shrink-0 sm:w-full sm:border-t sm:border-hospital-800/60 sm:pt-2 sm:mt-auto flex items-center sm:justify-between text-xs font-bold text-emerald-400">
                <span className="hidden sm:inline text-[11px] group-hover:translate-x-0.5 transition-transform">Khám phá thiết bị</span>
                <div className="flex h-7 w-7 sm:h-5 sm:w-5 items-center justify-center rounded-lg bg-hospital-800/80 border border-hospital-700 sm:border-none sm:bg-transparent text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white sm:group-hover:bg-transparent sm:group-hover:text-emerald-300 transition">
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
