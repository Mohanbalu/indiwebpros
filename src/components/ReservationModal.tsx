import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, CheckCircle2, Lock, ArrowRight, Loader2, Compass } from "lucide-react";
import { getLoggedInUser, setLoggedInUser } from "../lib/lmsAuth";
import { getCourses, saveReservation } from "../lib/lmsStore";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCourseId?: string;
}

export function ReservationModal({ isOpen, onClose, initialCourseId = "" }: ReservationModalProps) {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState("");
  const [discord, setDiscord] = useState("");
  const [currentYear, setCurrentYear] = useState("3rd Year");
  const [courseSelected, setCourseSelected] = useState(initialCourseId);
  const [planSelected, setPlanSelected] = useState<"basic" | "intermediate" | "professional">("intermediate");
  const [referralCode, setReferralCode] = useState("");
  const [message, setMessage] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Pre-fill student info if logged in
  useEffect(() => {
    const user = getLoggedInUser();
    if (user) {
      setFullName(user.name || "");
      setEmail(user.email || "");
      if (user.college) setCollege(user.college);
      if (user.discord) setDiscord(user.discord);
    }
  }, [isOpen]);

  // Load courses
  useEffect(() => {
    if (isOpen) {
      getCourses()
        .then((courseList) => {
          const published = courseList.filter((c: any) => c.status === "Publish");
          setCourses(published);
          // If no initial course is selected, pick the first one
          if (!courseSelected && published.length > 0) {
            setCourseSelected(published[0].id);
          }
        })
        .catch((err) => console.error("Error loading courses:", err));
    }
  }, [isOpen, initialCourseId]);

  // Handle selected course prop changes
  useEffect(() => {
    if (initialCourseId) {
      setCourseSelected(initialCourseId);
    }
  }, [initialCourseId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !college || !courseSelected) {
      setError("Please fill out all mandatory fields.");
      return;
    }
    if (!agreeTerms) {
      setError("You must agree to the Terms of Service.");
      return;
    }

    setLoading(true);
    setError("");

    const selectedCourseObj = courses.find((c) => c.id === courseSelected);
    const payload = {
      name: fullName,
      email,
      phone,
      college,
      discord,
      year: currentYear,
      courseId: courseSelected,
      courseTitle: selectedCourseObj ? selectedCourseObj.title : courseSelected,
      plan: planSelected,
      status: "Interested" as const,
      paymentStatus: "N/A" as const,
      referralCode,
      message,
    };

    try {
      const result = await saveReservation(payload);
      if (result.success) {
        setSuccess(true);
        // Automatically simulate logged in student for exploration
        setLoggedInUser({
          email: payload.email,
          name: payload.name,
          role: "student",
          college: payload.college,
          discord: payload.discord,
          year: payload.year,
        });
      } else {
        setError("Reservation failed. Please try again.");
      }
    } catch (err: any) {
      setError("Network failure or database error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col relative max-h-[90vh]"
        >
          {/* Close button */}
          <button
            onClick={handleReset}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all z-10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Success / Thank You Screen */}
          {success ? (
            <div className="p-8 md:p-12 text-center space-y-6 flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-3xl flex items-center justify-center animate-bounce">
                <Sparkles className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-amber-600 bg-amber-500/10 px-3 py-1 rounded-full">
                  Reservation Successful
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
                  Congratulations!
                </h2>
                <p className="text-sm font-semibold text-emerald-600 flex items-center justify-center gap-1.5 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Your Early Bird Seat has been Reserved.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200/60 p-6 rounded-2xl max-w-md text-slate-600 text-xs md:text-sm leading-relaxed space-y-3 font-sans">
                <p>
                  <strong>No payment is required now.</strong> We will contact you via email and Discord as soon as the active modules commence.
                </p>
                <p className="text-slate-500 text-[11px] border-t border-slate-200/60 pt-3">
                  You are now temporarily logged in. You can access your <strong>Student Dashboard</strong> to explore course files, assignments, and curriculum maps!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <button
                  onClick={() => {
                    handleReset();
                    window.location.href = "/lms/dashboard";
                  }}
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs uppercase tracking-wider active:scale-95 transition-all cursor-pointer"
                >
                  Go to Student Dashboard
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs uppercase tracking-wider active:scale-95 transition-all"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Header Banner */}
              <div className="bg-slate-900 text-white p-6 md:p-8 border-b border-slate-800 relative overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.15),transparent_50%)]" />
                <div className="relative z-10 space-y-2">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full uppercase">
                    Early Bird Seat Pre-Booking
                  </span>
                  <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">
                    Secure Your Seat at 50% Off
                  </h2>
                  <p className="text-slate-400 text-xs font-sans leading-relaxed">
                    Reserve now. Zero payment required today. Pay only when active learning classes kick off!
                  </p>
                </div>
              </div>

              {/* Form Scrollable Body */}
              <form onSubmit={handleSubmit} className="p-6 md:p-8 overflow-y-auto space-y-6 flex-grow">
                {error && (
                  <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-rose-700 text-xs md:text-sm font-medium flex items-start gap-2.5">
                    <X className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Murali Krishna"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all bg-slate-50/50"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. murali@gmail.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all bg-slate-50/50"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 9876543210"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all bg-slate-50/50"
                    />
                  </div>

                  {/* College */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">College Name *</label>
                    <input
                      type="text"
                      required
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      placeholder="e.g. Andhra University"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all bg-slate-50/50"
                    />
                  </div>

                  {/* Discord */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">Discord Username</label>
                    <input
                      type="text"
                      value={discord}
                      onChange={(e) => setDiscord(e.target.value)}
                      placeholder="e.g. krishna#1234"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all bg-slate-50/50"
                    />
                  </div>

                  {/* Current Year */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">Current Academic Year</label>
                    <select
                      value={currentYear}
                      onChange={(e) => setCurrentYear(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all bg-slate-50/50 cursor-pointer"
                    >
                      <option value="1st Year">1st Year Student</option>
                      <option value="2nd Year">2nd Year Student</option>
                      <option value="3rd Year">3rd Year Student</option>
                      <option value="4th Year">4th Year Student</option>
                      <option value="Graduate">Postgraduate / Graduate</option>
                      <option value="Professional">Working Professional</option>
                    </select>
                  </div>

                  {/* Course Selected */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">Select Course *</label>
                    <select
                      value={courseSelected}
                      onChange={(e) => setCourseSelected(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all bg-slate-50/50 cursor-pointer"
                    >
                      {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Learning Plan Selected */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">Select Learning Plan</label>
                    <select
                      value={planSelected}
                      onChange={(e) => setPlanSelected(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all bg-slate-50/50 cursor-pointer"
                    >
                      <option value="basic">🟢 Basic Tier (₹149 - ₹299)</option>
                      <option value="intermediate">🟡 Intermediate Tier (₹499 - ₹699)</option>
                      <option value="professional">🔴 Professional Tier (₹999 - ₹1499)</option>
                    </select>
                  </div>

                </div>

                {/* Referral Code */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">Referral Code (Optional)</label>
                  <input
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    placeholder="e.g. COLLEGE_CAMPUS_LEAD"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all bg-slate-50/50"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">Message / Special Requirements</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Let us know your core objectives or standard university submission guidelines..."
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all bg-slate-50/50 resize-none"
                  />
                </div>

                {/* Agree Checkbox */}
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-amber-500 border-slate-300 rounded cursor-pointer"
                  />
                  <label htmlFor="agreeTerms" className="text-xs text-slate-500 leading-relaxed cursor-pointer selection:bg-transparent">
                    I agree to the <a href="/terms" target="_blank" className="text-indigo-600 font-semibold hover:underline">Terms of Service</a> and authorize IndiWebPros representatives to reach out regarding academic materials.
                  </label>
                </div>

                {/* Submit button footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    Secure connection. Data remains fully private.
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-2xl text-xs uppercase tracking-wider active:scale-95 transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                        Booking...
                      </>
                    ) : (
                      <>
                        Reserve My Seat
                        <ArrowRight className="w-4 h-4 text-amber-400" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
