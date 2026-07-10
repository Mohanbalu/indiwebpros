import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  Award, 
  Users, 
  Briefcase, 
  Star, 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  HelpCircle, 
  ChevronDown, 
  Clock, 
  Flame, 
  Lock, 
  Play, 
  MessageSquare,
  Compass,
  AlertCircle
} from "lucide-react";
import { getLoggedInUser } from "../lib/lmsAuth";
import { getCourses } from "../lib/lmsStore";

// Import Reservation Modal
import { ReservationModal } from "../components/ReservationModal";

export function LmsLandingPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [courses, setCourses] = useState<any[]>([]);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 22, minutes: 2, seconds: 22 });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  // Countdown timer for early bird offer targeting July 13, 2026 10 PM
  useEffect(() => {
    const targetDate = new Date("2026-07-13T22:00:00");
    
    const updateTimer = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Fetch courses directly
    getCourses()
      .then(courseList => {
        setCourses(courseList.filter((c: any) => c.status === "Publish"));
      })
      .catch(err => console.error("Error fetching courses:", err));

    const user = getLoggedInUser();
    if (user) {
      setIsLoggedIn(true);
      setUserRole(user.role);
    }
  }, []);

  const openReservation = (courseId: string = "") => {
    setSelectedCourseId(courseId);
    setIsModalOpen(true);
  };

  const stats = [
    { label: "Students Enrolled", value: "3,500+", icon: Users, color: "text-blue-500 bg-blue-50" },
    { label: "Industry Courses", value: "10+", icon: BookOpen, color: "text-amber-500 bg-amber-50" },
    { label: "Certificates Issued", value: "1,200+", icon: Award, color: "text-emerald-500 bg-emerald-50" },
    { label: "Internship Openings", value: "150+", icon: Briefcase, color: "text-rose-500 bg-rose-50" }
  ];

  const testimonials = [
    {
      name: "Rohan Deshmukh",
      role: "B.Tech Final Year, Student",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      content: "The Early Bird seat reservation was the best decision. I locked in the lowest price and got amazing project support that helped me clear my major project with grade A!",
      rating: 5
    },
    {
      name: "Anjali Sharma",
      role: "Software Engineer, Capgemini",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      content: "I took the Professional tier. The live mock interviews and direct mentorship from Sandeep sir gave me the confidence to ace my transition from college to my first IT job.",
      rating: 5
    },
    {
      name: "Kiran Kumar",
      role: "M.Tech Graduate",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      content: "Excellent curriculum. Unlike standard tutorial hell, we built a real clinic SaaS platform. Designing PGVector search with Gemini API changed my perspective on engineering.",
      rating: 5
    }
  ];

  const faqs = [
    {
      q: "What is the Early Bird Seat Reservation?",
      a: "It's a risk-free pre-booking offer. You secure your seat for our upcoming live platform launch at a massive 50% discount (e.g., ₹149 instead of ₹299 for Basic tier). No credit card or upfront payment is required today."
    },
    {
      q: "When will I have to pay?",
      a: "No payment is required right now! Once the specific course launches, we will contact you via Email and Discord with your exclusive discount coupon to activate your enrollment."
    },
    {
      q: "What do the Basic, Intermediate, and Professional tiers include?",
      a: "Basic provides standard HD recorded lectures and certificates. Intermediate adds source files, major assignments, projects, and access to our Discord server. Professional unlocks direct mentorship, resume reviews, portfolio critiques, live doubt clearance, and placement guidelines."
    },
    {
      q: "Are these projects acceptable for college major/minor submissions?",
      a: "Absolutely. Our projects are designed by principal tech architects following industry-best guidelines. They include architectural diagrams, PostgreSQL DB configurations, and complete documentation perfect for B.Tech/M.Tech presentations."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      
      {/* Early Bird Ribbon */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white text-xs md:text-sm py-2.5 px-4 text-center border-b border-amber-500/20 flex flex-wrap items-center justify-center gap-2 font-mono">
        <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
        <span className="text-amber-400 font-bold">LIMITED OFFER:</span> Lock in Early Bird pricing up to 50% Off!
        <span className="bg-slate-800 text-amber-400 px-2 py-0.5 rounded-full text-[11px] font-bold">
          Ends in {timeLeft.days > 0 ? `${timeLeft.days}d ` : ""}{timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </span>
        <button 
          onClick={() => openReservation()}
          className="underline text-white font-bold hover:text-amber-300 ml-1 cursor-pointer"
        >
          Reserve Seat Now &rarr;
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32 bg-slate-900 text-white border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.1),transparent_50%)]" />
        <div className="absolute -bottom-10 inset-x-0 h-40 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 rounded-full px-3.5 py-1.5 text-xs text-amber-400 font-mono tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              IndiWebPros Academy Launch
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
              Learn Industry Skills. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
                Build Real Projects.
              </span> <br />
              Launch Your Career.
            </h1>
            
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed font-sans">
              Master Full Stack Development, Artificial Intelligence, Machine Learning, Cloud Systems, Programming and much more with professional-grade curriculum and direct mentor support.
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/lms/courses"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-2xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all text-sm uppercase tracking-wider"
              >
                Explore Courses
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => openReservation()}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-extrabold rounded-2xl active:scale-95 transition-all text-sm uppercase tracking-wider cursor-pointer"
              >
                Reserve Early Bird Seat
              </button>
            </div>

            {/* Quick Badges */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-400 pt-6 border-t border-slate-800/80">
              <span className="flex items-center gap-1.5 font-mono">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                No Payment Required Upfront
              </span>
              <span className="flex items-center gap-1.5 font-mono">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                Verified Certificate of Mastery
              </span>
              <span className="flex items-center gap-1.5 font-mono">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                Direct Discord Group Access
              </span>
            </div>
          </div>

          {/* Hero Visual Card Stack */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-3xl blur-2xl opacity-10 animate-pulse" />
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl space-y-6">
              
              {/* Feature Header */}
              <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                    <Flame className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Early Bird Reservation</h4>
                    <p className="text-[11px] text-slate-400 font-mono">Limited seats remaining</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                    94% Booked
                  </span>
                </div>
              </div>

              {/* Dynamic countdown visual */}
              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 text-center space-y-2">
                <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">Time Remaining to Lock Discount</p>
                <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
                  <div className="bg-slate-900 border border-slate-800 p-2 py-2.5 rounded-xl">
                    <span className="block text-xl md:text-2xl font-bold font-mono text-amber-400">{timeLeft.days}</span>
                    <span className="text-[9px] text-slate-500 font-mono uppercase">Days</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-2 py-2.5 rounded-xl">
                    <span className="block text-xl md:text-2xl font-bold font-mono text-amber-400">{timeLeft.hours.toString().padStart(2, '0')}</span>
                    <span className="text-[9px] text-slate-500 font-mono uppercase">Hrs</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-2 py-2.5 rounded-xl">
                    <span className="block text-xl md:text-2xl font-bold font-mono text-amber-400">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                    <span className="text-[9px] text-slate-500 font-mono uppercase">Min</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-2 py-2.5 rounded-xl">
                    <span className="block text-xl md:text-2xl font-bold font-mono text-amber-400">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                    <span className="text-[9px] text-slate-500 font-mono uppercase">Sec</span>
                  </div>
                </div>
              </div>

              {/* Pricing visual */}
              <div className="flex justify-between items-center bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                <div>
                  <span className="text-xs text-slate-400 block font-mono">Regular Pricing</span>
                  <span className="text-slate-500 line-through font-mono text-base font-semibold">₹299 onwards</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-amber-400 block font-mono font-bold uppercase">Early Bird Price</span>
                  <span className="text-2xl font-extrabold text-white font-mono">₹149 <span className="text-xs font-normal text-slate-400">onwards</span></span>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => openReservation()}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold rounded-2xl shadow-lg shadow-amber-500/10 active:scale-[0.98] transition-all text-xs uppercase tracking-wider cursor-pointer"
              >
                Secure My Seat Now &rarr;
              </button>

              <p className="text-center text-[11px] text-slate-400 font-mono flex items-center justify-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-500" />
                Risk-free. Pay only when active course starts.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${s.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-extrabold text-slate-900 font-mono tracking-tight">{s.value}</div>
                    <div className="text-xs md:text-sm text-slate-500 font-medium">{s.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-amber-600 bg-amber-500/10 px-3 py-1 rounded-full uppercase tracking-wider">
                Our Programs
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mt-3">
                Featured Industry Courses
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-2xl">
                Explore our curated list of student-focused courses loaded with enterprise capstone projects, fully compliant with college major and minor requirements.
              </p>
            </div>
            <Link 
              to="/lms/courses" 
              className="inline-flex items-center gap-1.5 text-amber-600 hover:text-amber-700 text-sm font-bold tracking-wide transition-colors group cursor-pointer"
            >
              View All Courses
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.slice(0, 3).map((course) => (
              <div 
                key={course.id} 
                className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col group"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden bg-slate-900">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-slate-700/50">
                    {course.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-amber-500 text-slate-950 text-xs font-mono font-extrabold px-2.5 py-1 rounded-lg">
                    ₹{course.earlyBirdPrice} Early Bird
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex-grow flex flex-col space-y-4">
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 mb-1.5">
                      <Star className="w-4 h-4 fill-amber-500" />
                      <span className="text-xs font-bold text-slate-800 font-mono">{course.rating}</span>
                      <span className="text-[11px] text-slate-400">({course.studentsCount} reserved)</span>
                    </div>
                    <h3 className="font-extrabold text-lg text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Badges */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <div>⏱ {course.duration}</div>
                    <div className="text-right">📊 {course.difficulty}</div>
                    <div className="col-span-2 text-slate-500 line-clamp-1 border-t border-slate-200/50 pt-1.5 mt-1.5">
                      👤 {course.instructor}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 mt-auto">
                    <Link
                      to={`/lms/course/${course.id}`}
                      className="w-1/2 text-center py-2.5 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 font-bold rounded-xl text-xs transition-all active:scale-95"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => openReservation(course.id)}
                      className="w-1/2 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-all active:scale-95 cursor-pointer"
                    >
                      Reserve Seat
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / Three Learning Plans Overview */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
              Transparent Learning Plans
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Three Flexible Learning Tiers
            </h2>
            <p className="text-slate-600 text-sm">
              Whether you want a quick self-paced learning path or complete masterclass guidance with placement assistance, choose the plan that suits you best.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* Basic Plan */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 flex flex-col hover:border-slate-300 transition-all shadow-sm">
              <div className="mb-6">
                <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Basic Tier
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-3">Recorded Access</h3>
                <p className="text-xs text-slate-500 mt-1">Excellent for self-paced learners.</p>
                <div className="mt-4 flex items-baseline gap-1.5 font-mono">
                  <span className="text-2xl font-extrabold text-slate-900">₹149</span>
                  <span className="text-xs text-slate-400 line-through">₹299</span>
                  <span className="text-xs text-slate-500 font-sans font-medium">/ course</span>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-slate-600 border-t border-slate-200/60 pt-6 flex-grow">
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>HD Recorded Videos</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Basic PDF Notes & Guides</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Interactive Exercises & QAs</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Course Completion Certificate</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Lifetime Access to Lectures</span>
                </div>
              </div>

              <button
                onClick={() => openReservation()}
                className="w-full mt-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs uppercase tracking-wider active:scale-95 transition-all cursor-pointer"
              >
                Reserve Seat
              </button>
            </div>

            {/* Intermediate Plan (Featured) */}
            <div className="bg-slate-900 border-2 border-amber-500 rounded-3xl p-8 flex flex-col relative shadow-md text-white transform md:-translate-y-2">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-amber-500 text-slate-950 text-[10px] font-mono font-bold uppercase tracking-widest px-3.5 py-1 rounded-full shadow-md">
                MOST POPULAR
              </div>
              
              <div className="mb-6">
                <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Intermediate Tier
                </span>
                <h3 className="text-xl font-extrabold text-white mt-3">Project Pro</h3>
                <p className="text-xs text-slate-400 mt-1">Perfect for college project submissions.</p>
                <div className="mt-4 flex items-baseline gap-1.5 font-mono">
                  <span className="text-3xl font-extrabold text-amber-400">₹499</span>
                  <span className="text-sm text-slate-500 line-through">₹699</span>
                  <span className="text-xs text-slate-400 font-sans font-medium">/ course</span>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-slate-300 border-t border-slate-800 pt-6 flex-grow">
                <p className="text-amber-400 font-mono font-bold text-[10px] uppercase tracking-wider mb-2">Everything in Basic Plus:</p>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Premium In-depth Study Notes</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Complete Source Code Downloads</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>GitHub Repositories for Submissions</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>1 Mini Project + 1 Major Capstone Project</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Quizzes & Live Interview QA Vaults</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Private Discord Community Lounge</span>
                </div>
              </div>

              <button
                onClick={() => openReservation()}
                className="w-full mt-8 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold rounded-xl text-xs uppercase tracking-wider active:scale-95 transition-all shadow-lg shadow-amber-500/10 cursor-pointer"
              >
                Reserve Seat (Intermediate)
              </button>
            </div>

            {/* Professional Plan */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 flex flex-col hover:border-slate-300 transition-all shadow-sm">
              <div className="mb-6">
                <span className="text-[10px] font-mono font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Professional Tier
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-3">Full Mentorship</h3>
                <p className="text-xs text-slate-500 mt-1">For those seeking high-paying job placements.</p>
                <div className="mt-4 flex items-baseline gap-1.5 font-mono">
                  <span className="text-2xl font-extrabold text-slate-900">₹999</span>
                  <span className="text-xs text-slate-400 line-through">₹1,499</span>
                  <span className="text-xs text-slate-500 font-sans font-medium">/ course</span>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-slate-600 border-t border-slate-200/60 pt-6 flex-grow">
                <p className="text-rose-600 font-mono font-bold text-[10px] uppercase tracking-wider mb-2">Everything in Intermediate Plus:</p>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  <span>Resume & LinkedIn Reviews</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  <span>Weekly Live Doubt-Clearing Sessions</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  <span>1-on-1 Placement Roadmap Planning</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  <span>Simulated Mock Technical Interviews</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  <span>Job Placement Guidance & Priority HR Refs</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  <span>Priority WhatsApp support with teachers</span>
                </div>
              </div>

              <button
                onClick={() => openReservation()}
                className="w-full mt-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs uppercase tracking-wider active:scale-95 transition-all cursor-pointer"
              >
                Reserve Seat (Professional)
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-bold text-amber-600 bg-amber-500/10 px-3 py-1 rounded-full uppercase tracking-wider">
              Success Stories
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Hear From Our Students
            </h2>
            <p className="text-slate-600 text-sm">
              Discover how hundreds of engineering students locked their career success early with our academic consulting and learning suites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed italic">
                    "{t.content}"
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-6 border-t border-slate-100 mt-6">
                  <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{t.name}</h4>
                    <p className="text-[11px] font-mono text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
              Common Queries
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              LMS Academy FAQ
            </h2>
            <p className="text-slate-600 text-sm">
              Everything you need to know about locking early-bird benefits and commencing your training.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((f, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className={`border rounded-2xl transition-all ${isOpen ? 'border-amber-500/50 bg-slate-50/50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-bold text-slate-900 text-sm md:text-base flex items-center gap-2">
                      <HelpCircle className={`w-5 h-5 flex-shrink-0 ${isOpen ? 'text-amber-500' : 'text-slate-400'}`} />
                      {f.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-amber-500' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-xs md:text-sm text-slate-600 leading-relaxed font-sans border-t border-slate-100 pt-4">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reservation Modal Integration */}
      <ReservationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialCourseId={selectedCourseId}
      />

    </div>
  );
}
