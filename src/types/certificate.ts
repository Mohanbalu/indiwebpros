export interface Certificate {
  id: string; // e.g. "IWP-STU-2026-0081"
  internId?: string; // e.g. "IWP85586"
  studentName: string; // e.g. "Jaswanth Murari"
  domain: string; // e.g. "Full Stack Development Internship Program"
  shortDomain?: string; // e.g. "Full Stack Web Development"
  duration: string; // e.g. "8 WEEKS"
  batch: string; // e.g. "May 06, 2026 To June 30, 2026"
  mode: "ONLINE" | "OFFLINE" | "HYBRID";
  issueDate: string; // e.g. "08 AUG 2026"
  credits: number; // e.g. 4
  status: "Completed" | "In Progress" | "Revoked";
  grade?: string; // e.g. "A+ (Distinction)"
  skills: {
    name: string;
    icon?: string;
    category?: string;
  }[];
  signatories: {
    name: string;
    role: string;
    organization: string;
    signatureUrl?: string;
  }[];
  organization: {
    name: string;
    fullName: string;
    tagline: string;
    subtitle: string;
    cin: string;
    msme: string;
    iso: string;
    website: string;
    email: string;
  };
  description: string;
  verificationHash?: string;
}
