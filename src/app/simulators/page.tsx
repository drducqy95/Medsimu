import React from "react";
import Link from "next/link";
import { Radio, HeartPulse, Activity, Eye, Scan, ArrowLeft, ArrowRight } from "lucide-react";

export default function SimulatorsHubPage() {
  const simulators = [
    {
      title: "Mô Phỏng Điện Tâm Đồ (ECG)",
      description: "Chạy dải nhịp ECG thời gian thực 60 FPS, 15+ nhịp bệnh lý, thước Calipers đo PR, QRS, tính QTc Bazett.",
      icon: HeartPulse,
      href: "/simulators/ecg",
      color: "from-emerald-500/20 to-emerald-950/40 border-emerald-500/50 hover:border-emerald-400",
      iconColor: "text-emerald-400 bg-emerald-950 border-emerald-800",
      phase: "Phase 03 (Ưu tiên)",
    },
    {
      title: "Mô Phỏng Siêu Âm Đầu Dò 3D Động",
      description: "Đầu dò 3D thao tác tay (6 DoF), màn hình siêu âm động co bóp tim, trượt màng phổi, FAST & Lung POCUS.",
      icon: Activity,
      href: "/simulators/ultrasound",
      color: "from-teal-500/20 to-teal-950/40 border-teal-500/50 hover:border-teal-400",
      iconColor: "text-teal-400 bg-teal-950 border-teal-800",
      phase: "Phase 04 (Ưu tiên)",
    },
    {
      title: "Phòng Soi Phim X-Quang Tương Tác",
      description: "Viewer X-quang chuẩn DICOM, chỉnh Window/Level, Zoom/Pan, bật tắt lớp giải phẫu và tổn thương đông đặc/tràn khí.",
      icon: Eye,
      href: "/simulators/xray",
      color: "from-blue-500/20 to-blue-950/40 border-blue-500/50 hover:border-blue-400",
      iconColor: "text-blue-400 bg-blue-950 border-blue-800",
      phase: "Phase 03",
    },
    {
      title: "Bộ Cuộn Lát Cắt CT-Scanner Đa Tầng",
      description: "Cuộn lát cắt Axial sọ não, ngực, bụng; chuyển đổi cửa sổ Nhu mô / Xương / Phổi; đo đơn vị Hounsfield (HU).",
      icon: Scan,
      href: "/simulators/ct",
      color: "from-purple-500/20 to-purple-950/40 border-purple-500/50 hover:border-purple-400",
      iconColor: "text-purple-400 bg-purple-950 border-purple-800",
      phase: "Phase 04",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-6">
        <ArrowLeft className="h-4 w-4" />
        <span>Quay lại Trang chủ</span>
      </Link>

      <div className="flex items-center gap-4 mb-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-800 shadow-md">
          <Radio className="h-6 w-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold text-white">Module 2: Phòng Mô Phỏng Cận Lâm Sàng</h1>
            <span className="rounded-full bg-emerald-950 px-3 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-800">
              4 THIẾT BỊ ẢO
            </span>
          </div>
          <p className="text-sm text-slate-400">
            Luyện tập độc lập kỹ năng đọc điện tâm đồ, cầm đầu dò siêu âm 3D, đọc X-quang và CT trước khi vào ca bệnh thực chiến.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {simulators.map((sim) => {
          const Icon = sim.icon;
          return (
            <Link
              key={sim.href}
              href={sim.href}
              className={`group relative rounded-3xl border bg-gradient-to-br ${sim.color} p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border shadow-md ${sim.iconColor}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-hospital-900/80 px-3 py-1 rounded-full border border-hospital-800">
                    {sim.phase}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {sim.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  {sim.description}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
                <span>Khám phá thiết bị</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
