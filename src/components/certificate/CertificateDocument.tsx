import React, { useRef } from "react";
import { Certificate } from "../../lib/certificates";
import { TechSkillBadge } from "./AccreditationBadges";
import { QrCodeView } from "./QrCodeView";
import { Printer, Download, Share2, CheckCircle2, ShieldCheck } from "lucide-react";

interface CertificateDocumentProps {
  certificate: Certificate;
  onVerifyClick?: () => void;
  verificationUrl?: string;
}

export function CertificateDocument({
  certificate,
  onVerifyClick,
  verificationUrl,
}: CertificateDocumentProps) {
  const printRef = useRef<HTMLDivElement>(null);
  const fullVerificationUrl =
    verificationUrl ||
    (typeof window !== "undefined"
      ? `${window.location.origin}/verify/${certificate.id}`
      : `https://indiwebpros.in/verify/${certificate.id}`);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top action toolbar */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-4 px-2 no-print">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            Official Verified Credential
          </span>
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">
            ID: {certificate.id}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / Save PDF
          </button>
        </div>
      </div>

      {/* Certificate Frame / Canvas (Matches Image 2 exactly) */}
      <div
        ref={printRef}
        id="printable-certificate"
        className="relative w-full max-w-4xl aspect-[1.414/1] bg-white text-slate-900 border-[10px] border-[#0A192F] shadow-2xl p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-hidden select-none"
        style={{
          boxShadow: "0 25px 50px -12px rgba(10, 25, 47, 0.25)",
        }}
      >
        {/* Inner Gold Inset Border */}
        <div className="absolute inset-2 sm:inset-3 border-2 border-[#D4AF37] pointer-events-none" />
        <div className="absolute inset-3 sm:inset-4 border border-[#D4AF37]/50 pointer-events-none" />

        {/* Top-Left Corner Geometric Accent */}
        <div className="absolute top-0 left-0 w-32 h-32 sm:w-44 sm:h-44 pointer-events-none overflow-hidden z-0 opacity-90">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path d="M0,0 L180,0 C120,60 60,120 0,180 Z" fill="#0A192F" />
            <path d="M0,0 L200,0 C130,70 70,130 0,200 Z" fill="none" stroke="#D4AF37" strokeWidth="3" />
            <path d="M0,0 L140,0 C90,50 50,90 0,140 Z" fill="#1E3A8A" opacity="0.6" />
          </svg>
        </div>

        {/* Ornate Corner Corners */}
        <div className="absolute top-5 right-5 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]" />
        <div className="absolute bottom-5 left-5 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]" />
        <div className="absolute bottom-5 right-5 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]" />

        {/* ================= HEADER ================= */}
        <div className="relative z-10 flex items-start justify-between">
          {/* AICTE Seal Badge */}
          <div className="flex flex-col items-center pl-4 sm:pl-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-orange-500 bg-white p-1 shadow-sm flex flex-col items-center justify-center text-center">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-orange-600 text-white flex items-center justify-center font-black text-xs sm:text-sm">
                ⚙
              </div>
              <span className="text-[7px] sm:text-[8px] font-black text-orange-900 uppercase tracking-tighter leading-none mt-0.5">
                AICTE
              </span>
              <span className="text-[5px] sm:text-[6px] text-slate-500 leading-none">Approved</span>
            </div>
          </div>

          {/* Center Brand Logo & Tagline */}
          <div className="flex flex-col items-center text-center flex-1 px-2">
            {/* Tree Crest */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-[#0A192F] p-0.5 mb-1 bg-white shadow-xs flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-900 to-[#0A192F] flex flex-col items-center justify-center text-white text-center p-1">
                <span className="text-sm sm:text-lg">🌲</span>
                <span className="text-[5px] font-extrabold uppercase tracking-widest text-amber-300">
                  INDIWEBPROS
                </span>
              </div>
            </div>
            
            <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0A192F]">
              INDIWEB<span className="text-[#C59B27]">PROS</span>
            </h1>
            <p className="text-[9px] sm:text-xs md:text-sm font-semibold text-slate-700 tracking-wider uppercase mt-0.5">
              {certificate.organization.tagline || "BUILDING DIGITAL SUCCESS FOR YOUR BUSINESS"}
            </p>
          </div>

          {/* MSME Emblem */}
          <div className="flex flex-col items-center pr-4 sm:pr-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex flex-col items-center justify-center text-center">
              {/* Ashoka Lion Emblem / MSME */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-50 rounded-full border border-amber-300 flex items-center justify-center text-amber-900 font-bold text-base shadow-xs">
                🏛️
              </div>
              <span className="text-[8px] sm:text-[10px] font-black text-slate-900 uppercase tracking-tight mt-0.5">
                MSME
              </span>
              <span className="text-[5px] sm:text-[6px] text-slate-600 uppercase tracking-tighter leading-none">
                Govt. of India
              </span>
            </div>
          </div>
        </div>

        {/* ================= TITLE ================= */}
        <div className="relative z-10 text-center my-2 sm:my-3">
          <h2
            className="text-2xl sm:text-4xl md:text-5xl font-black text-[#0A192F] tracking-widest uppercase font-serif"
            style={{ letterSpacing: "0.15em" }}
          >
            CERTIFICATE
          </h2>
          <div className="flex items-center justify-center gap-3 my-1">
            <div className="h-[1.5px] w-12 sm:w-24 bg-[#D4AF37]" />
            <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-widest uppercase text-[#0A192F]">
              OF SUCCESSFUL COMPLETION
            </span>
            <div className="h-[1.5px] w-12 sm:w-24 bg-[#D4AF37]" />
          </div>

          {/* Navy Pill Banner */}
          <div className="inline-flex items-center gap-2 px-4 sm:px-8 py-1 sm:py-1.5 bg-[#0A192F] text-white rounded-md shadow-md my-1">
            <span className="text-[#D4AF37] text-xs">★</span>
            <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-wider uppercase">
              {certificate.domain.toUpperCase()}
            </span>
            <span className="text-[#D4AF37] text-xs">★</span>
          </div>

          <p className="text-[10px] sm:text-xs text-slate-600 font-medium mt-1">
            This Certificate is Proudly Presented to
          </p>
        </div>

        {/* ================= STUDENT NAME ================= */}
        <div className="relative z-10 text-center my-1">
          <div
            className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#A66E2E] px-4 font-serif italic"
            style={{
              fontFamily: "'Great Vibes', 'Alex Brush', 'Dancing Script', cursive, serif",
              textShadow: "1px 1px 0px rgba(0,0,0,0.05)",
            }}
          >
            {certificate.studentName}
          </div>
          <div className="w-48 sm:w-80 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-1" />
        </div>

        {/* ================= PROGRAM DESCRIPTION ================= */}
        <div className="relative z-10 text-center max-w-2xl mx-auto px-4 my-1">
          <p className="text-[10px] sm:text-xs text-slate-700">
            for successfully completing the
          </p>
          <p className="text-[11px] sm:text-sm font-bold text-[#0A192F]">
            {certificate.domain}
          </p>
          <p className="text-[9px] sm:text-[11px] text-slate-600">
            conducted by <strong className="text-slate-900">IndiWebPros</strong>.
          </p>
          <p className="text-[8px] sm:text-[10px] text-slate-600 italic leading-relaxed mt-1 line-clamp-2">
            {certificate.description}
          </p>
        </div>

        {/* ================= TECH STACK BADGES ================= */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 my-1 px-4">
          {certificate.skills.map((skill) => (
            <div
              key={skill.name}
              className="flex items-center gap-1 px-2 py-0.5 sm:py-1 bg-slate-50 border border-slate-200 rounded text-[8px] sm:text-[10px] font-bold text-slate-800 shadow-2xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0A192F]" />
              {skill.name}
            </div>
          ))}
        </div>

        {/* ================= CONGRATULATIONS LINE ================= */}
        <p className="relative z-10 text-center text-[9px] sm:text-[11px] italic font-serif text-[#0A192F] my-0.5">
          "We congratulate you on successfully completing the internship and wish you continued success in your future career."
        </p>

        {/* ================= FOOTER / SIGNATURES / QR ================= */}
        <div className="relative z-10 flex items-end justify-between pt-2 border-t border-slate-200/80 mt-1">
          {/* Certificate Metadata */}
          <div className="text-[8px] sm:text-[10px] font-semibold text-slate-700 space-y-0.5 font-mono">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">CERTIFICATE ID:</span>
              <span className="font-bold text-[#0A192F]">{certificate.id}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">DURATION:</span>
              <span className="font-bold text-[#0A192F]">{certificate.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">MODE:</span>
              <span className="font-bold text-[#0A192F]">{certificate.mode}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">ISSUE DATE:</span>
              <span className="font-bold text-[#0A192F]">{certificate.issueDate}</span>
            </div>
          </div>

          {/* Scannable Real QR Code on the Certificate */}
          <div className="flex flex-col items-center">
            <div className="p-1 bg-white border border-slate-300 rounded shadow-xs">
              <QrCodeView value={fullVerificationUrl} size={60} includeMargin={false} />
            </div>
            <span className="text-[6px] sm:text-[7px] font-bold text-slate-500 uppercase mt-0.5 tracking-tighter">
              Scan to Verify
            </span>
          </div>

          {/* Signatories */}
          <div className="flex items-end gap-6 sm:gap-10">
            {certificate.signatories.map((sig) => (
              <div key={sig.name} className="flex flex-col items-center text-center">
                <div
                  className="text-lg sm:text-2xl font-serif italic text-slate-800"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  {sig.name}
                </div>
                <div className="w-20 sm:w-28 h-px bg-slate-400 mb-1" />
                <span className="text-[9px] sm:text-[11px] font-bold text-[#0A192F]">
                  {sig.name}
                </span>
                <span className="text-[7px] sm:text-[9px] text-slate-600 leading-tight">
                  {sig.role}
                </span>
                <span className="text-[6px] sm:text-[8px] font-medium text-slate-500">
                  {sig.organization}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Tagline */}
        <div className="relative z-10 text-center pt-2">
          <p className="text-[8px] sm:text-[10px] font-black tracking-widest text-[#C59B27] uppercase">
            LEARN • BUILD • GROW
          </p>
          <p className="text-[6px] sm:text-[8px] text-slate-400 uppercase tracking-wider">
            Building Future Developers
          </p>
        </div>
      </div>
    </div>
  );
}
