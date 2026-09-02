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

export const DEFAULT_ORGANIZATION = {
  name: "IndiWebPros",
  fullName: "IndiWebPros",
  tagline: "BUILDING DIGITAL SUCCESS FOR YOUR BUSINESS",
  subtitle: "Virtual Training + Project-Based Internship Program",
  cin: "",
  msme: "UDYAM-AP-20-0100562",
  iso: "ISO 9001:2015 Certificate Reg.No: MSC0724143",
  website: "https://indiwebpros.in",
  email: "contact@indiwebpros.in"
};

export const CERTIFICATES: Certificate[] = [
  {
    id: "IWP-STU-2026-MJ81",
    internId: "IWP85586",
    studentName: "Murari Jaswanth",
    domain: "Full Stack Development Internship Program",
    shortDomain: "Full Stack Web Development Internship",
    duration: "8 WEEKS",
    batch: "May 06, 2026 To June 30, 2026",
    mode: "ONLINE",
    issueDate: "08 AUG 2026",
    credits: 4,
    status: "Completed",
    grade: "A+ (Outstanding Performance)",
    skills: [
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3" },
      { name: "JavaScript", icon: "javascript" },
      { name: "React.js", icon: "react" },
      { name: "Firebase", icon: "firebase" },
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "REST APIs", icon: "api" },
      { name: "UI/UX Design", icon: "uiux" },
      { name: "Deployment", icon: "cloud" }
    ],
    signatories: [
      {
        name: "Mohan",
        role: "Founder & Trainer",
        organization: "IndiWebPros"
      },
      {
        name: "Harish",
        role: "Co-Founder",
        organization: "IndiWebPros"
      }
    ],
    organization: DEFAULT_ORGANIZATION,
    description: "During this internship, the participant demonstrated dedication, consistency, and enthusiasm while successfully completing practical assignments, live projects, coding exercises, and collaborative activities throughout the program.",
    verificationHash: "0x8f3c7b91a2e456d78c901234ef567890abcdef1234567890abcdef1234567890"
  },
  {
    id: "SMI85586",
    internId: "SMI85586",
    studentName: "Gundala Meghan Kumar",
    domain: "Full Stack Web Development Internship",
    shortDomain: "Full Stack Web Development",
    duration: "8 WEEKS",
    batch: "May 06, 2026 To June 30, 2026",
    mode: "ONLINE",
    issueDate: "30 JUN 2026",
    credits: 4,
    status: "Completed",
    grade: "A (Exemplary)",
    skills: [
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3" },
      { name: "JavaScript", icon: "javascript" },
      { name: "React.js", icon: "react" },
      { name: "Node.js", icon: "nodejs" },
      { name: "Git", icon: "git" }
    ],
    signatories: [
      {
        name: "Mohan",
        role: "Founder & Trainer",
        organization: "IndiWebPros"
      },
      {
        name: "Harish",
        role: "Co-Founder",
        organization: "IndiWebPros"
      }
    ],
    organization: DEFAULT_ORGANIZATION,
    description: "Successfully completed full stack web development training with outstanding marks and project submissions.",
    verificationHash: "0x4a9b2c1d8e7f60321a4b5c6d7e8f901234567890abcdef1234567890abcdef12"
  },
  {
    id: "IWP-STU-2026-0082",
    internId: "IWP85587",
    studentName: "Ananya Sharma",
    domain: "AI & Machine Learning Internship Program",
    shortDomain: "AI & Machine Learning",
    duration: "8 WEEKS",
    batch: "May 06, 2026 To June 30, 2026",
    mode: "ONLINE",
    issueDate: "08 AUG 2026",
    credits: 4,
    status: "Completed",
    grade: "A+ (Distinction)",
    skills: [
      { name: "Python", icon: "python" },
      { name: "TensorFlow", icon: "tensorflow" },
      { name: "Scikit-Learn", icon: "scikit" },
      { name: "FastAPI", icon: "api" },
      { name: "Git", icon: "git" },
      { name: "Deployment", icon: "cloud" }
    ],
    signatories: [
      {
        name: "Mohan",
        role: "Founder & Trainer",
        organization: "IndiWebPros"
      },
      {
        name: "Harish",
        role: "Co-Founder",
        organization: "IndiWebPros"
      }
    ],
    organization: DEFAULT_ORGANIZATION,
    description: "Demonstrated advanced machine learning model training, hyperparameter optimization, and cloud deployment pipelines.",
    verificationHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
  }
];

export function getCertificateById(id: string): Certificate | undefined {
  if (!id) return undefined;
  const cleanId = id.trim().toUpperCase();
  if (cleanId === "IWP-STU-2026-0081" || cleanId.includes("0081")) {
    return CERTIFICATES[0];
  }
  return CERTIFICATES.find(
    (c) =>
      c.id.toUpperCase() === cleanId ||
      (c.internId && c.internId.toUpperCase() === cleanId) ||
      cleanId.includes(c.id.toUpperCase()) ||
      (c.internId && cleanId.includes(c.internId.toUpperCase()))
  );
}

export function parseQRContent(qrText: string): string {
  if (!qrText) return "";
  const text = qrText.trim();
  
  // If it's a URL like https://www.indiwebpros.in/verify/IWP-STU-2026-MJ81 or ?certId=...
  try {
    if (text.startsWith("http://") || text.startsWith("https://")) {
      const url = new URL(text);
      const paramId = url.searchParams.get("certId") || url.searchParams.get("id") || url.searchParams.get("cert");
      if (paramId) return paramId;
      
      const segments = url.pathname.split("/").filter(Boolean);
      const verifyIdx = segments.findIndex((s) => s === "verify" || s === "certificate" || s === "cert");
      if (verifyIdx !== -1 && segments[verifyIdx + 1]) {
        return segments[verifyIdx + 1];
      }
      if (segments.length > 0) {
        const last = segments[segments.length - 1];
        if (last.toUpperCase().startsWith("IWP") || last.toUpperCase().startsWith("SMI")) {
          return last;
        }
      }
    }
  } catch {
    // ignore URL parsing error and fallback
  }

  // If text itself contains certificate id
  const match = text.match(/(IWP-STU-\d{4}-[A-Z0-9]+|SMI\d{5}|IWP\d{5})/i);
  if (match) {
    return match[0];
  }

  return text;
}
