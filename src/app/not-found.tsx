import React from "react";
import Link from "next/link";
import { AlertTriangle, Home, Activity } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800/80 border border-slate-700 rounded-2xl p-8 text-center shadow-2xl backdrop-blur">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
          <AlertTriangle className="w-8 h-8" />
        </div>
        
        <h1 className="text-3xl font-black tracking-tight text-white mb-2">
          404 - Không Tìm Thấy
        </h1>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          Hồ sơ bệnh án, phòng mô phỏng hoặc đường dẫn cận lâm sàng bạn yêu cầu không tồn tại trong hệ thống MedSim.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition text-sm shadow-lg shadow-blue-600/30"
          >
            <Home className="w-4 h-4" />
            Về Trang Chủ
          </Link>
          <Link
            href="/simulators/ecg"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium transition text-sm"
          >
            <Activity className="w-4 h-4" />
            Phòng Điện Tim
          </Link>
        </div>
      </div>
    </div>
  );
}
