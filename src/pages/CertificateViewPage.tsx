import React from "react";
import { useParams, Link } from "react-router-dom";
import { CertificateDocument } from "../components/certificate/CertificateDocument";
import { getCertificateById } from "../data/certificates";
import { ArrowLeft, CheckCircle, ShieldCheck } from "lucide-react";

export function CertificateViewPage() {
  const { certId } = useParams<{ certId?: string }>();
  const certificate = getCertificateById(certId || "IWP-STU-2026-0081");

  if (!certificate) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-xl font-bold text-slate-900 mb-2">Certificate Not Found</h1>
        <p className="text-sm text-slate-500 mb-4">No certificate found matching ID "{certId}".</p>
        <Link
          to="/verify"
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
        >
          Go to Verification Portal
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100/90 py-8 px-4 sm:px-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl flex items-center justify-between mb-4 no-print">
        <Link
          to={`/verify/${certificate.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white px-3.5 py-2 rounded-xl shadow-xs border border-slate-200 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          View Verification Details (Image 1)
        </Link>
      </div>

      <CertificateDocument certificate={certificate} />
    </div>
  );
}
