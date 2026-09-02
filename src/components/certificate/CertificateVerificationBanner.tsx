import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, QrCode, Search, Camera, ArrowRight, CheckCircle2, Award } from "lucide-react";
import { QrScannerModal } from "./QrScannerModal";

export function CertificateVerificationBanner() {
  const [certInput, setCertInput] = useState("");
  const [scannerOpen, setScannerOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (certInput.trim()) {
      navigate(`/verify/${encodeURIComponent(certInput.trim())}`);
    }
  };

  return (
    <section className="w-full py-12 px-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Text */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-cyan-300 text-xs font-bold mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              Official Verification Portal
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mb-3">
              Verify Internship Certificates & Credentials
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Scan the QR code printed on any IndiWebPros internship certificate or enter the unique Certificate ID to instantly verify completion status, verified skills, and academic credits.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setScannerOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
              >
                <Camera className="w-4 h-4" />
                Scan QR Code
              </button>

              <Link
                to="/verify/IWP-STU-2026-0081"
                className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm rounded-xl backdrop-blur-xs transition-all"
              >
                <Award className="w-4 h-4 text-amber-300" />
                View Jaswanth Murari's Verified Certificate
              </Link>
            </div>
          </div>

          {/* Right ID Search Box */}
          <div className="w-full lg:w-auto lg:min-w-[360px] bg-white/10 border border-white/15 p-6 rounded-2xl backdrop-blur-md">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Search className="w-4 h-4 text-cyan-400" />
              Verify by Certificate ID
            </h3>
            <p className="text-xs text-slate-300 mb-4">
              Enter Certificate ID formatted like <span className="font-mono text-cyan-300">IWP-STU-2026-0081</span>
            </p>

            <form onSubmit={handleSearch} className="space-y-3">
              <input
                type="text"
                value={certInput}
                onChange={(e) => setCertInput(e.target.value)}
                placeholder="e.g. IWP-STU-2026-0081"
                className="w-full px-4 py-2.5 bg-slate-900/80 border border-slate-700 text-white text-sm rounded-xl focus:outline-hidden focus:ring-2 focus:ring-cyan-400 placeholder:text-slate-500 font-mono"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-white text-slate-950 hover:bg-slate-100 font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                Verify Certificate
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span>Govt. MSME & AICTE Approved</span>
              <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3 h-3" /> 100% Tamper Proof
              </span>
            </div>
          </div>
        </div>
      </div>

      <QrScannerModal
        isOpen={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onScanSuccess={(id) => {
          setScannerOpen(false);
          navigate(`/verify/${encodeURIComponent(id)}`);
        }}
      />
    </section>
  );
}
