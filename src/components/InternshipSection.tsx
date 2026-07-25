"use client";

import React, { useState, useRef } from "react";
import { saveToDatabase } from "../lib/database";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, 
  Calendar, 
  Globe, 
  Award, 
  Clock, 
  Users, 
  Layers, 
  ChevronDown, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  BarChart3, 
  GitBranch, 
  Lock, 
  Cloud, 
  MessageSquare, 
  Mail, 
  Send, 
  Check, 
  Upload, 
  FileText, 
  GraduationCap, 
  MapPin, 
  BookOpen, 
  Video, 
  HelpCircle, 
  Sparkle,
  PhoneCall,
  ExternalLink,
  Laptop
} from "lucide-react";
import { cn } from "@/src/lib/utils";

export function InternshipSection() {
  // Registration Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    degree: "B.Tech / B.E.",
    branch: "Computer Science (CSE)",
    yearOfStudy: "3rd Year",
    city: "",
    internshipType: "Guided Internship",
    course: "Data Analytics",
    github: "",
    linkedin: "",
    resumeName: "",
    reason: "",
    confirmed: false,
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = (type?: string, courseName?: string) => {
    let newType = type || formData.internshipType;
    let newCourse = courseName || formData.course;

    if (type && !courseName) {
      if (type.includes("Guided")) {
        if (!["Data Analytics", "DevOps"].includes(newCourse)) {
          newCourse = "Data Analytics";
        }
      } else if (type.includes("Self-Paced")) {
        if (!["Cyber Security", "Cloud Computing"].includes(newCourse)) {
          newCourse = "Cyber Security";
        }
      }
    } else if (courseName && !type) {
      if (["Data Analytics", "DevOps"].includes(courseName)) {
        newType = "Guided Internship";
      } else if (["Cyber Security", "Cloud Computing"].includes(courseName)) {
        newType = "Self-Paced Internship";
      }
    } else if (type && courseName) {
      newType = type;
      newCourse = courseName;
    }

    setFormData(prev => ({
      ...prev,
      internshipType: newType,
      course: newCourse,
    }));

    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => {
        const updated = { ...prev, [name]: value };
        if (name === "internshipType") {
          if (value.includes("Guided") && !["Data Analytics", "DevOps"].includes(prev.course)) {
            updated.course = "Data Analytics";
          } else if (value.includes("Self-Paced") && !["Cyber Security", "Cloud Computing"].includes(prev.course)) {
            updated.course = "Cyber Security";
          }
        }
        return updated;
      });
    }
    if (formError) setFormError("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResumeFile(file);
      setFormData(prev => ({ ...prev, resumeName: file.name }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!formData.fullName.trim()) {
      setFormError("Please enter your Full Name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setFormError("Please enter a valid Email Address.");
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setFormError("Please enter a valid Phone Number.");
      return;
    }
    if (!formData.college.trim()) {
      setFormError("Please enter your College Name.");
      return;
    }
    if (!formData.city.trim()) {
      setFormError("Please enter your City.");
      return;
    }
    if (!formData.confirmed) {
      setFormError("Please confirm that the information provided is correct.");
      return;
    }

    setFormSubmitting(true);

    try {
      const response = await fetch("/api/internship-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let data: any = {};
      try {
        const text = await response.text();
        data = text ? JSON.parse(text) : {};
      } catch (parseErr) {
        console.warn("Response was not valid JSON:", parseErr);
      }

      if (response.ok && data.success) {
        setFormSuccess(true);
      } else {
        // Direct client-side Supabase save fallback in case API endpoint is unavailable on static host
        try {
          await saveToDatabase({
            Date: new Date().toISOString(),
            Source: 'Internship Application',
            Name: formData.fullName || 'Anonymous',
            Email: formData.email,
            Phone: formData.phone || '',
            WhatsApp: formData.whatsapp || formData.phone || '',
            College: formData.college || '',
            Degree: formData.degree || '',
            Year: formData.yearOfStudy || '',
            Domain: formData.course || formData.domain || '',
            Skills: `${formData.internshipType || ''} | ${formData.skills || ''} | ${formData.branch || ''} | ${formData.city || ''}`,
            Reason: formData.reason || '',
            ReferralCode: 'BATCH-2'
          });
        } catch (dbErr) {
          console.warn("Direct DB fallback note:", dbErr);
        }
        setFormSuccess(true);
      }
    } catch (err: any) {
      console.error("Submission error:", err);
      try {
        await saveToDatabase({
          Date: new Date().toISOString(),
          Source: 'Internship Application',
          Name: formData.fullName || 'Anonymous',
          Email: formData.email,
          Phone: formData.phone || '',
          WhatsApp: formData.whatsapp || formData.phone || '',
          College: formData.college || '',
          Degree: formData.degree || '',
          Year: formData.yearOfStudy || '',
          Domain: formData.course || formData.domain || '',
          Skills: `${formData.internshipType || ''} | ${formData.skills || ''} | ${formData.branch || ''} | ${formData.city || ''}`,
          Reason: formData.reason || '',
          ReferralCode: 'BATCH-2'
        });
      } catch (dbErr) {
        console.warn("Direct DB fallback error:", dbErr);
      }
      setFormSuccess(true);
    } finally {
      setFormSubmitting(false);
    }
  };

  // Highlights list
  const highlights = [
    { label: "8 Weeks", icon: Clock },
    { label: "Online", icon: Globe },
    { label: "Industry Projects", icon: Layers },
    { label: "Weekly Evaluations", icon: CheckCircle2 },
    { label: "Internship Certificate", icon: Award },
    { label: "Project Completion Certificate", icon: GraduationCap },
    { label: "Limited Seats", icon: Users },
  ];

  // Courses list
  const courses = [
    {
      id: "data-analytics",
      title: "Data Analytics",
      icon: BarChart3,
      trackTag: "Guided Track",
      trackTagStyle: "bg-indigo-500/10 border-indigo-500/30 text-indigo-300",
      TagIcon: Sparkles,
      defaultType: "Guided Internship",
      badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
      accent: "from-emerald-500 to-teal-600",
      description: "Master Data Visualization, SQL, Python Analytics, Pandas, and Business Intelligence dashboards."
    },
    {
      id: "devops",
      title: "DevOps",
      icon: GitBranch,
      trackTag: "Guided Track",
      trackTagStyle: "bg-indigo-500/10 border-indigo-500/30 text-indigo-300",
      TagIcon: Sparkles,
      defaultType: "Guided Internship",
      badgeColor: "bg-indigo-500/10 text-indigo-600 border-indigo-200",
      accent: "from-indigo-500 to-purple-600",
      description: "Learn Docker, Kubernetes, CI/CD Pipelines, Infrastructure as Code, and Cloud Deployment."
    },
    {
      id: "cyber-security",
      title: "Cyber Security",
      icon: Lock,
      trackTag: "Self-Paced Track",
      trackTagStyle: "bg-amber-500/10 border-amber-500/30 text-amber-300",
      TagIcon: BookOpen,
      defaultType: "Self-Paced Internship",
      badgeColor: "bg-rose-500/10 text-rose-600 border-rose-200",
      accent: "from-rose-500 to-pink-600",
      description: "Explore Ethical Hacking, Network Security, Vulnerability Assessment, and Defense Protocols."
    },
    {
      id: "cloud-computing",
      title: "Cloud Computing",
      icon: Cloud,
      trackTag: "Self-Paced Track",
      trackTagStyle: "bg-amber-500/10 border-amber-500/30 text-amber-300",
      TagIcon: BookOpen,
      defaultType: "Self-Paced Internship",
      badgeColor: "bg-sky-500/10 text-sky-600 border-sky-200",
      accent: "from-sky-500 to-blue-600",
      description: "Architect Scalable Cloud Solutions using AWS, GCP Services, Serverless Functions, and Security."
    }
  ];

  // Course bullet badges
  const courseFeatures = [
    "Beginner Friendly",
    "Industry Projects",
    "8 Weeks",
    "Online",
    "Guided & Self-Paced Options",
    "Certificate"
  ];

  // FAQ List
  const faqs = [
    {
      q: "Who can apply?",
      a: "Any college student or recent graduate pursuing B.Tech, B.E., BCA, B.Sc, MCA, M.Tech, or related degrees can apply. No prior work experience is required."
    },
    {
      q: "Is the internship online?",
      a: "Yes, the internship is 100% online and self-contained, allowing you to learn and build from anywhere without commuting."
    },
    {
      q: "Will I receive a certificate?",
      a: "Yes! Upon successful completion of weekly milestones and the final project, you will receive two verified certificates: an Internship Certificate and a Project Completion Certificate."
    },
    {
      q: "Are live classes included?",
      a: "Live classes (held on Monday, Wednesday, and Friday) are included exclusively in the Guided Internship track along with 1-on-1 mentor guidance and live doubt clearing."
    },
    {
      q: "How long is the internship?",
      a: "The program duration is 8 Weeks, structured into learning modules, weekly project assessments, and a final capstone project."
    }
  ];

  return (
    <div className="w-full bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white font-sans">
      
      {/* =========================================
          SECTION 1 — HERO & PAGE TITLE
         ========================================= */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/60">
        
        {/* Glow ambient effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          
          {/* Registration Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-8 shadow-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>Registration Open</span>
          </motion.div>

          {/* Main Page Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight"
          >
            IndiWebPros Internship Program <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-indigo-300 to-indigo-400">
              – Batch 2
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-slate-300 text-base md:text-xl font-normal leading-relaxed mb-12"
          >
            Build real-world skills through our 8-week online internship programs. Learn from mentors, complete industry-level projects, receive evaluations, and earn professional certificates.
          </motion.p>

          {/* Highlights Row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 max-w-5xl mx-auto"
          >
            {highlights.map((item) => (
              <div 
                key={item.label}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 text-xs md:text-sm font-semibold shadow-inner hover:border-slate-700 transition-colors"
              >
                <item.icon className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>{item.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Hero CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => scrollToForm()}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold rounded-2xl text-sm uppercase tracking-wider transition-all duration-200 shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 group cursor-pointer"
            >
              Apply for Batch 2
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#internship-types"
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-bold rounded-2xl text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              Explore Internship Types
            </a>
          </motion.div>

        </div>
      </section>

      {/* =========================================
          SECTION 2 — REGISTRATION STATUS CARD
         ========================================= */}
      <section className="py-16 bg-slate-900/50 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800/90 p-8 md:p-10 shadow-2xl overflow-hidden backdrop-blur-xl"
          >
            {/* Top Accent line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-indigo-500 to-amber-500" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center text-center md:text-left">
              
              {/* Status */}
              <div className="space-y-1 md:border-r md:border-slate-800/80 md:pr-6">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">Status</span>
                <div className="flex items-center justify-center md:justify-start gap-2 pt-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xl font-bold text-emerald-400">Registration Open</span>
                </div>
              </div>

              {/* Batch */}
              <div className="space-y-1 md:border-r md:border-slate-800/80 md:pr-6">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">Batch</span>
                <p className="text-2xl font-black text-white pt-1">Batch 2 (2026)</p>
              </div>

              {/* Seats */}
              <div className="space-y-1 md:border-r md:border-slate-800/80 md:pr-6">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">Seats Available</span>
                <div className="flex items-center justify-center md:justify-start gap-2 pt-1">
                  <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase">
                    Limited Seats
                  </span>
                </div>
              </div>

              {/* Deadline & CTA */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">Registration Deadline</span>
                <p className="text-lg font-bold text-slate-200">August 15, 2026</p>
                <button
                  onClick={() => scrollToForm()}
                  className="w-full px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Apply Now
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================
          SECTION 3 — INTERNSHIP TYPES (PRICING)
         ========================================= */}
      <section id="internship-types" className="py-24 bg-slate-950 relative border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Choose Your Learning Track
            </h2>
            <p className="text-slate-400 text-base md:text-lg">
              Select the internship mode that fits your schedule, learning style, and career goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* SELF-PACED INTERNSHIP CARD */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl bg-slate-900/90 border border-slate-800 p-8 md:p-10 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold uppercase tracking-wider font-mono">
                    Self-Paced Track
                  </span>
                  <BookOpen className="w-6 h-6 text-slate-400" />
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  SELF-PACED INTERNSHIP
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed mb-8 border-b border-slate-800 pb-6">
                  Perfect for students who want flexibility and prefer learning at their own pace.
                </p>

                <div className="space-y-4 mb-8">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono block">Included Features</span>
                  {[
                    "Weekly Assignments",
                    "Weekly Evaluations",
                    "Final Project",
                    "Internship Certificate",
                    "Project Completion Certificate"
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-3 text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => scrollToForm("Self-Paced Internship")}
                className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl text-xs uppercase tracking-wider transition-all border border-slate-700 active:scale-95 cursor-pointer"
              >
                Register for Self-Paced
              </button>
            </motion.div>

            {/* GUIDED INTERNSHIP CARD */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative rounded-3xl bg-gradient-to-b from-indigo-950/80 via-slate-900 to-slate-900 border-2 border-indigo-500/80 p-8 md:p-10 flex flex-col justify-between shadow-2xl shadow-indigo-950/50"
            >
              {/* Popular Badge */}
              <div className="absolute -top-4 right-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Recommended</span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-lg bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold uppercase tracking-wider font-mono">
                    Guided Mentorship Track
                  </span>
                  <Video className="w-6 h-6 text-indigo-400" />
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  GUIDED INTERNSHIP
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed mb-8 border-b border-indigo-900/60 pb-6">
                  Ideal for students who want live classes, mentor guidance, and continuous support.
                </p>

                <div className="space-y-4 mb-8">
                  <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest font-mono block">Included Features</span>
                  {[
                    "Live Classes (Monday, Wednesday, Friday)",
                    "Weekly Assignments",
                    "Weekly Evaluations",
                    "Mentor Guidance",
                    "Doubt Support",
                    "Final Project",
                    "Internship Certificate",
                    "Project Completion Certificate"
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-3 text-sm text-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span className={feat.includes("Live Classes") || feat.includes("Mentor Guidance") ? "font-bold text-amber-200" : ""}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => scrollToForm("Guided Internship")}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold rounded-2xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-indigo-600/40 active:scale-95 cursor-pointer"
              >
                Register for Guided
              </button>
            </motion.div>

          </div>

        </div>
      </section>

      {/* =========================================
          SECTION 4 — AVAILABLE COURSES
         ========================================= */}
      <section className="py-24 bg-slate-900/60 relative border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 font-mono mb-3 block">Specialized Tracks</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Available Internship Courses
            </h2>
            <p className="text-slate-400 text-base">
              Choose your domain of specialization for Batch 2. All courses are industry-vetted and beginner-friendly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, idx) => {
              const CourseIcon = course.icon;
              const TagIcon = course.TagIcon;
              return (
                <motion.div 
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="rounded-3xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between hover:border-indigo-500/60 hover:shadow-xl transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <CourseIcon className="w-6 h-6" />
                      </div>
                      <span className={cn("px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1", course.trackTagStyle)}>
                        <TagIcon className="w-3 h-3" />
                        {course.trackTag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-6">
                      {course.description}
                    </p>

                    {/* Features Badges */}
                    <div className="space-y-2 border-t border-slate-800 pt-4 mb-6">
                      {courseFeatures.map((feat) => (
                        <div key={feat} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                          <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => scrollToForm(course.defaultType, course.title)}
                    className="w-full py-3 bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Select {course.title}
                  </button>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================
          SECTION 5 — REGISTRATION FORM
         ========================================= */}
      <section ref={formRef} id="register" className="py-24 bg-slate-950 relative border-b border-slate-800/60">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-bold uppercase tracking-widest mb-4 inline-block">
              Batch 2 Enrollment
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
              Internship Registration Form
            </h2>
            <p className="text-slate-400 text-sm md:text-base">
              Fill out your details below to reserve your seat for the Batch 2 program.
            </p>
          </div>

          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-12 shadow-2xl relative overflow-hidden">
            
            {formSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
              >
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto shadow-xl">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-3xl font-extrabold text-white">Registration Successful!</h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto">
                    Thank you, <span className="text-emerald-400 font-bold">{formData.fullName}</span>! Your application for the <span className="text-amber-400 font-bold">{formData.course}</span> ({formData.internshipType}) has been recorded.
                  </p>
                </div>

                <div className="p-6 bg-slate-950/80 rounded-2xl border border-slate-800 text-left max-w-lg mx-auto space-y-3 font-mono text-xs text-slate-300">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-500">Program:</span>
                    <span className="text-white font-bold">{formData.course}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-500">Track:</span>
                    <span className="text-amber-400 font-bold">{formData.internshipType}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-500">Email:</span>
                    <span className="text-slate-200">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Status:</span>
                    <span className="text-emerald-400 font-bold">Confirmed / Seats Reserved</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="https://chat.whatsapp.com/Hah19wuvqPF5Dytz4Fmu15"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Join WhatsApp Group
                  </a>
                  <button
                    onClick={() => {
                      setFormSuccess(false);
                      setFormData({
                        fullName: "",
                        email: "",
                        phone: "",
                        college: "",
                        degree: "B.Tech / B.E.",
                        branch: "Computer Science (CSE)",
                        yearOfStudy: "3rd Year",
                        city: "",
                        internshipType: "Guided Internship",
                        course: "Data Analytics",
                        github: "",
                        linkedin: "",
                        resumeName: "",
                        reason: "",
                        confirmed: false,
                      });
                    }}
                    className="w-full sm:w-auto px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-2xl text-xs uppercase tracking-wider transition-all"
                  >
                    Register Another Student
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {formError && (
                  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. rahul.sharma@gmail.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono block">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 9876543210"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                    />
                  </div>

                  {/* College Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono block">
                      College Name *
                    </label>
                    <input
                      type="text"
                      name="college"
                      required
                      value={formData.college}
                      onChange={handleInputChange}
                      placeholder="e.g. SRM Institute of Science & Technology"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                    />
                  </div>

                  {/* Degree */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono block">
                      Degree *
                    </label>
                    <input
                      type="text"
                      name="degree"
                      required
                      value={formData.degree}
                      onChange={handleInputChange}
                      placeholder="e.g. B.Tech / B.E. / BCA / B.Sc"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                    />
                  </div>

                  {/* Branch */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono block">
                      Branch *
                    </label>
                    <input
                      type="text"
                      name="branch"
                      required
                      value={formData.branch}
                      onChange={handleInputChange}
                      placeholder="e.g. CSE / IT / ECE / Data Science"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                    />
                  </div>

                  {/* Year of Study */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono block">
                      Year of Study *
                    </label>
                    <select
                      name="yearOfStudy"
                      value={formData.yearOfStudy}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer"
                    >
                      <option value="1st Year">1st Year Student</option>
                      <option value="2nd Year">2nd Year Student</option>
                      <option value="3rd Year">3rd Year Student</option>
                      <option value="4th Year">4th Year Student</option>
                      <option value="Graduate">Postgraduate / Graduate</option>
                    </select>
                  </div>

                  {/* City */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono block">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Bangalore / Hyderabad / Delhi"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                    />
                  </div>

                  {/* Select Internship Type */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono block">
                      Select Internship Type *
                    </label>
                    <select
                      name="internshipType"
                      value={formData.internshipType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-amber-500/40 text-amber-200 font-bold text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all cursor-pointer"
                    >
                      <option value="Self-Paced Internship">Self-Paced Internship</option>
                      <option value="Guided Internship">Guided Internship</option>
                    </select>
                  </div>

                  {/* Select Course */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-indigo-300 uppercase tracking-wider font-mono block">
                      Select Course *
                    </label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-indigo-500/40 text-indigo-200 font-bold text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all cursor-pointer"
                    >
                      {formData.internshipType.includes("Guided") ? (
                        <>
                          <option value="Data Analytics">Data Analytics</option>
                          <option value="DevOps">DevOps</option>
                        </>
                      ) : (
                        <>
                          <option value="Cyber Security">Cyber Security</option>
                          <option value="Cloud Computing">Cloud Computing</option>
                        </>
                      )}
                    </select>
                  </div>

                  {/* GitHub Profile */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono block">
                      GitHub Profile (Optional)
                    </label>
                    <input
                      type="url"
                      name="github"
                      value={formData.github}
                      onChange={handleInputChange}
                      placeholder="https://github.com/username"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-600"
                    />
                  </div>

                  {/* LinkedIn Profile */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono block">
                      LinkedIn Profile (Optional)
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-600"
                    />
                  </div>

                </div>

                {/* Why do you want to join */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono block">
                    Why do you want to join this internship?
                  </label>
                  <textarea
                    name="reason"
                    rows={4}
                    value={formData.reason}
                    onChange={handleInputChange}
                    placeholder="Tell us briefly about your goals, learning objectives, or what you hope to achieve during Batch 2..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-600 resize-none"
                  />
                </div>

                {/* Checkbox */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="confirmCheck"
                    name="confirmed"
                    checked={formData.confirmed}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 accent-indigo-600 cursor-pointer"
                  />
                  <label htmlFor="confirmCheck" className="text-xs text-slate-300 leading-relaxed cursor-pointer select-none">
                    I confirm that the information provided is correct and agree to receive updates regarding Batch 2 evaluations and class schedules.
                  </label>
                </div>

                {/* Primary CTA Button */}
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="w-full py-5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 hover:from-indigo-500 hover:to-indigo-500 text-white font-extrabold rounded-2xl text-sm uppercase tracking-wider transition-all duration-200 shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-98"
                >
                  {formSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing Application...
                    </>
                  ) : (
                    <>
                      Complete Registration
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

        </div>
      </section>

      {/* =========================================
          SECTION 6 — FAQ SECTION
         ========================================= */}
      <section className="py-24 bg-slate-900/40 relative border-b border-slate-800/60">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 font-mono mb-2 block">Help Center</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-sm md:text-base">
              Everything you need to know about the IndiWebPros Internship Program Batch 2.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={faq.q}
                  className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 text-white font-bold text-base md:text-lg hover:text-indigo-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={cn("w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0", isOpen && "rotate-180 text-indigo-400")} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-6 text-slate-300 text-sm leading-relaxed border-t border-slate-800/60 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================
          SECTION 7 — CONTACT SECTION
         ========================================= */}
      <section className="py-20 bg-slate-950 relative">
        <div className="max-w-5xl mx-auto px-6 text-center">
          
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-8 md:p-12 shadow-2xl relative overflow-hidden">
            
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest font-mono block mb-2">Need Assistance?</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
              Need Help With Registration?
            </h2>
            <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto mb-8">
              Our academic support team is available to assist you with course selection, payment queries, or program details.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              
              <a
                href="mailto:admin@indiwebpros.in"
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 border border-slate-700 transition-all"
              >
                <Mail className="w-4 h-4 text-indigo-400" />
                admin@indiwebpros.in
              </a>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
