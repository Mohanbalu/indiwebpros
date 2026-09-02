import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, Link, useNavigate } from "react-router-dom";
import { triggerConfetti } from "../lib/confetti";
import {
  CheckCircle,
  ShieldCheck,
  QrCode,
  Share2,
  Camera,
  Copy,
  Check,
  Info,
  Calendar,
  Layers,
  GraduationCap
} from "lucide-react";
import { AccreditationBadges, TechSkillBadge } from "../components/certificate/AccreditationBadges";
import { QrScannerModal } from "../components/certificate/QrScannerModal";
import { QrCodeView } from "../components/certificate/QrCodeView";
import { getCertificateById, DEFAULT_ORGANIZATION, Certificate } from "../lib/certificates";

export function CertificateVerificationPage() {
  const { certId: paramCertId } = useParams<{ certId?: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Query parameter support: ?id=... or ?certId=...
  const queryCertId = searchParams.get("id") || searchParams.get("certId") || searchParams.get("cert");
  
  // Default to Murari Jaswanth (IWP-STU-2026-0081) if no specific ID provided
  const activeId = paramCertId || queryCertId || "IWP-STU-2026-0081";

  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const found = getCertificateById(activeId);
    if (found) {
      setCertificate(found);

      // Trigger celebratory confetti burst
      try {
        triggerConfetti();
      } catch {
        // ignore in non-browser env
      }
    } else {
      setCertificate(null);
    }
  }, [activeId]);

  const handleScanSuccess = (scannedId: string) => {
    setScannerOpen(false);
    navigate(`/verify/${encodeURIComponent(scannedId)}`);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#38bdf8] via-[#e0f2fe] to-[#7dd3fc] py-6 sm:py-12 px-3 sm:px-6 flex flex-col items-center justify-center font-sans">
      {/* Top Floating Control Bar */}
      <div className="w-full max-w-xl mb-4 flex items-center justify-start gap-2 px-2">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-white/80 hover:bg-white backdrop-blur-md px-3 py-1.5 rounded-xl shadow-xs border border-white/60 transition-colors"
        >
          ← IndiWebPros Home
        </Link>
      </div>

      {/* Main Verification Card (Matches Image 1 layout strictly) */}
      <div className="w-full max-w-xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-8 md:p-10 border border-slate-100 flex flex-col items-center text-center relative overflow-hidden">
        
        {/* Top Organization Header */}
        <div className="w-full text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#06b6d4] flex items-center justify-center gap-1">
            <span>IndiWebPros</span>
            <span className="text-sky-600 text-sm font-semibold ml-1">IT Solutions</span>
          </h1>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mt-0.5">
            Official Credential Verification Portal
          </p>
        </div>

        {/* Accreditation Logos Row (Startup India, APSCHE, Govt, AICTE, ISO, MSME, AWS) */}
        <div className="w-full my-3">
          <AccreditationBadges />
        </div>

        {/* Company Registration Details Block */}
        <div className="w-full text-center space-y-1 my-1 select-none">
          <p className="text-xs sm:text-sm font-bold text-slate-800">
            {certificate?.organization.fullName || DEFAULT_ORGANIZATION.fullName}
          </p>
          <p className="text-[11px] sm:text-xs font-semibold text-slate-700">
            {certificate?.organization.subtitle || DEFAULT_ORGANIZATION.subtitle}
          </p>
          <div className="text-[9px] sm:text-[10px] font-mono text-slate-500 leading-tight flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span>MSME: {certificate?.organization.msme || DEFAULT_ORGANIZATION.msme}</span>
            <span>|</span>
            <span>{certificate?.organization.iso || DEFAULT_ORGANIZATION.iso}</span>
          </div>
          <p className="text-[10px] text-cyan-600 font-medium">
            <a
              href="https://indiwebpros.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              https://indiwebpros.in/
            </a>
          </p>
        </div>

        {/* Separator Line */}
        <div className="w-full h-px bg-slate-200 my-4" />

        {/* Verification Status Heading */}
        <div className="w-full my-1">
          {certificate ? (
            <div className="flex flex-col items-center">
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                Internship Completion Certificate Successfully Verified!
              </h2>

              {/* Verified Ribbon / Check Badge (Matches Image 1 with cyan scalloped checkmark) */}
              <div className="my-4 flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-cyan-400 text-white flex items-center justify-center shadow-lg shadow-cyan-400/30 animate-in zoom-in duration-300">
                    <svg
                      className="w-8 h-8 sm:w-9 sm:h-9 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-cyan-700 tracking-wider uppercase mt-1">
                  verified
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center my-4">
              <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-2">
                <Info className="w-7 h-7" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Certificate Record Not Found
              </h2>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                No certificate found with ID <span className="font-mono font-bold text-slate-700">"{activeId}"</span>.
                Please check the ID or scan the QR code again.
              </p>
            </div>
          )}
        </div>

        {/* ================= INTERN DETAILS BOX (Strictly matching Image 1) ================= */}
        {certificate ? (
          <div className="w-full bg-white rounded-xl border border-slate-300/80 p-4 sm:p-6 text-left shadow-2xs my-2">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-3 pb-1.5 border-b border-slate-100">
              Intern Details
            </h3>

            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row sm:items-baseline">
                <span className="font-bold text-slate-800 w-32 shrink-0">Name:</span>
                <span className="font-semibold text-slate-950 text-sm sm:text-base text-indigo-950">
                  {certificate.studentName}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline">
                <span className="font-bold text-slate-800 w-32 shrink-0">Certificate ID:</span>
                <span className="font-mono text-slate-700 font-semibold">{certificate.id}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline">
                <span className="font-bold text-slate-800 w-32 shrink-0">Domain:</span>
                <span className="text-slate-800 font-medium">
                  {certificate.domain}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline">
                <span className="font-bold text-slate-800 w-32 shrink-0">Batch:</span>
                <span className="text-slate-700">{certificate.batch}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline">
                <span className="font-bold text-slate-800 w-32 shrink-0">Duration:</span>
                <span className="text-slate-700">{certificate.duration} ({certificate.mode})</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline">
                <span className="font-bold text-slate-800 w-32 shrink-0">Issue Date:</span>
                <span className="text-slate-700">{certificate.issueDate}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline">
                <span className="font-bold text-slate-800 w-32 shrink-0">No. Of Credits:</span>
                <span className="text-slate-700 font-medium">{certificate.credits}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline">
                <span className="font-bold text-slate-800 w-32 shrink-0">Internship Status:</span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                  <CheckCircle className="w-3.5 h-3.5" />
                  {certificate.status}
                </span>
              </div>

              {certificate.grade && (
                <div className="flex flex-col sm:flex-row sm:items-baseline">
                  <span className="font-bold text-slate-800 w-32 shrink-0">Performance:</span>
                  <span className="text-amber-700 font-semibold">{certificate.grade}</span>
                </div>
              )}
            </div>

            {/* Verified Skills & Technologies */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Verified Skill Competencies:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {certificate.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-xs font-semibold rounded-md transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-600" />
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Signatories */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
              <div>
                <span className="font-bold text-slate-900">Authorized by: </span>
                <span>Mohan (Founder) & Harish (Co-Founder)</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">IndiWebPros</span>
            </div>
          </div>
        ) : null}

        {/* Action Buttons */}
        {certificate && (
          <div className="w-full mt-4">
            <button
              onClick={handleCopyLink}
              className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Link Copied!" : "Copy Verification Link"}
            </button>
          </div>
        )}

        {/* Footer (Strictly matching Image 1) */}
        <div className="w-full mt-8 pt-4 border-t border-slate-100 text-center select-none">
          <p className="text-xs font-medium text-slate-500">
            © 2026 IndiWebPros | All Rights Reserved
          </p>
        </div>
      </div>

      {/* QR Scanner Modal */}
      <QrScannerModal
        isOpen={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
      />
    </div>
  );
}
