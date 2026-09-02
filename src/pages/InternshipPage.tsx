import React from "react";
import { InternshipSection } from "../components/InternshipSection";
import { CertificateVerificationBanner } from "../components/certificate/CertificateVerificationBanner";

export function InternshipPage() {
  return (
    <div className="w-full min-h-screen bg-slate-950">
      <InternshipSection />
      <CertificateVerificationBanner />
    </div>
  );
}
