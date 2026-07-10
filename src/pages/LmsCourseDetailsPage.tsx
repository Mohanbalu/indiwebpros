import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  Star, 
  Award, 
  Globe, 
  BookOpen, 
  FileText, 
  Code, 
  ShieldCheck, 
  MessageCircle, 
  Share2, 
  ChevronDown, 
  Play, 
  Flame, 
  CheckCircle2, 
  HelpCircle,
  HelpCircle as QuestionMark
} from "lucide-react";
import { ReservationModal } from "../components/ReservationModal";
import { getCourses } from "../lib/lmsStore";

export function LmsCourseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // FAQs list for course
  const courseFaqs = [
    { q: "Are the recorded videos available in high definition?", a: "Yes, all lessons are captured in 1085p high-definition studio streams, ensuring crystal-clear readability of the editor and codebases." },
    { q: "Will I get university credentials/marks for these projects?", a: "Our projects conform to standard guidelines of IEEE/ACM. However, we advise reviewing the architectural blueprints and customizing the source codes to align perfectly with your internal university guidelines and evaluations." },
    { q: "Can I upgrade my tier later?", a: "Certainly! You can upgrade from Basic to Intermediate or Professional at any time by paying the relative difference in tier pricing once the dashboard launches." }
  ];

  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  useEffect(() => {
    getCourses()
      .then((courseList) => {
        const found = courseList.find((c: any) => c.id === id);
        if (found) {
          setCourse(found);
          if (found.modules && found.modules.length > 0) {
            setActiveModuleId(found.modules[0].id);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching course details:", err);
        setLoading(false);
      });
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-slate-500 text-sm font-mono">Loading course details...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="pt-32 pb-20 text-center space-y-6 max-w-md mx-auto px-6">
        <div className="text-red-500 text-5xl">⚠️</div>
        <h2 className="text-xl font-bold text-slate-900">Course Not Found</h2>
        <p className="text-slate-500 text-xs">The course you are looking for might have been draft-saved or deleted by the admin panel.</p>
        <Link to="/lms/courses" className="inline-block px-5 py-2.5 bg-slate-900 text-white font-bold rounded-xl text-xs uppercase tracking-wider">
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-20 pb-20">
      
      {/* Course Banner */}
      <div className="bg-slate-900 text-white py-16 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.1),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-6">
          
          <Link 
            to="/lms/courses" 
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-xs font-mono font-bold uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>

          <div className="flex flex-wrap gap-3">
            <span className="bg-slate-800 text-amber-400 border border-slate-700 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
              {course.category}
            </span>
            <span className="bg-slate-850 text-slate-300 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
              {course.difficulty}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight max-w-4xl leading-tight">
            {course.title}
          </h1>

          <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
            {course.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 pt-4 border-t border-slate-800/80 max-w-2xl">
            <div className="flex items-center gap-1.5 text-amber-500 font-bold">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span className="text-slate-200">{course.rating} Rating</span>
            </div>
            <div>👤 Instructor: <strong className="text-slate-200">{course.instructor}</strong></div>
            <div>⏱ Duration: <strong className="text-slate-200">{course.duration}</strong></div>
            <div>🎓 Certificate of Excellence</div>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column (Content Details) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Overview Section */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-500" />
                Course Overview
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line font-sans">
                {course.longDescription || course.description}
              </p>

              {/* Skills Learned */}
              <div className="pt-4 space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">Skills You'll Master</h4>
                <div className="flex flex-wrap gap-2">
                  {course.skillsLearned?.map((skill: string, idx: number) => (
                    <span 
                      key={idx} 
                      className="bg-indigo-50 text-indigo-700 border border-indigo-100/50 text-xs font-mono font-bold px-3.5 py-1.5 rounded-xl"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Curriculum Modules Accordion */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-500" />
                  Learning Curriculum
                </h2>
                <p className="text-xs text-slate-500 mt-1.5 font-mono">
                  Contains {course.modules?.length || 0} modules &bull; {course.modules?.reduce((acc: number, m: any) => acc + (m.lessons?.length || 0), 0) || 0} full video lessons
                </p>
              </div>

              <div className="space-y-4">
                {course.modules?.map((mod: any, modIdx: number) => {
                  const isOpen = activeModuleId === mod.id;
                  return (
                    <div 
                      key={mod.id} 
                      className={`border rounded-2xl overflow-hidden transition-all ${isOpen ? 'border-indigo-500/30 bg-slate-50/50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                    >
                      <button
                        onClick={() => setActiveModuleId(isOpen ? null : mod.id)}
                        className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 cursor-pointer"
                      >
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-mono font-bold text-indigo-500 uppercase">Module {modIdx + 1}</span>
                          <h4 className="font-extrabold text-sm md:text-base text-slate-900">{mod.title}</h4>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-indigo-500' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="border-t border-slate-200/50 divide-y divide-slate-100 bg-white">
                          {mod.lessons?.map((lesson: any, lesIdx: number) => (
                            <div key={lesson.id} className="px-6 py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                              <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100/50 flex items-center justify-center text-indigo-600 font-mono text-[11px] font-bold">
                                  {lesIdx + 1}
                                </div>
                                <div className="space-y-0.5">
                                  <span className="font-bold text-xs md:text-sm text-slate-800 line-clamp-1">{lesson.title}</span>
                                  <div className="flex gap-2 text-[10px] font-mono text-slate-400">
                                    <span>⏱ {lesson.duration}</span>
                                    {lesson.pdfUrl && <span className="text-indigo-500 font-bold">&bull; PDF Notes Available</span>}
                                    {lesson.sourceCodeUrl && <span className="text-amber-500 font-bold">&bull; Code Included</span>}
                                  </div>
                                </div>
                              </div>
                              <div className="text-slate-400">
                                <Play className="w-3.5 h-3.5 hover:text-indigo-600 transition-colors" />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Three Learning Tiers Detailed Comparison Bento */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm space-y-6">
              <div className="text-center md:text-left space-y-1">
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-500" />
                  Select Your Tier of Learning Plan
                </h2>
                <p className="text-xs text-slate-500">Pick the level of guidance, certification, and project assistance you require.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Basic Plan Info */}
                <div className="border border-slate-200 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">Basic Plan</span>
                    <h4 className="font-bold text-sm text-slate-950 mt-2">Recorded Access</h4>
                    <p className="text-[11px] text-slate-500">Master self-paced concept modules.</p>
                    <div className="text-lg font-mono font-bold text-slate-950 mt-3">₹{course.earlyBirdPrice} <span className="text-slate-400 line-through text-xs font-normal">₹{course.regularPrice}</span></div>
                  </div>
                  <ul className="space-y-2 text-[11px] text-slate-600 border-t pt-3.5 flex-grow">
                    <li className="flex items-center gap-1.5">✓ HD Recorded Videos</li>
                    <li className="flex items-center gap-1.5">✓ Basic PDF Notes</li>
                    <li className="flex items-center gap-1.5">✓ Coding Exercises</li>
                    <li className="flex items-center gap-1.5">✓ Digital Certificate</li>
                  </ul>
                  <button onClick={() => setIsModalOpen(true)} className="w-full py-2 bg-slate-100 hover:bg-amber-500 hover:text-slate-950 text-slate-700 font-bold rounded-lg text-xs uppercase tracking-wider transition-all">
                    Choose Basic
                  </button>
                </div>

                {/* Intermediate Plan Info */}
                <div className="border-2 border-amber-500 bg-slate-900 text-white rounded-2xl p-6 space-y-4 flex flex-col justify-between relative shadow-md">
                  <div className="absolute top-0 right-6 -translate-y-1/2 bg-amber-500 text-slate-950 text-[8px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                    Popular
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">Intermediate Plan</span>
                    <h4 className="font-bold text-sm text-white mt-2">Project Submission Suite</h4>
                    <p className="text-[11px] text-slate-300">Perfect for university major/minor requirements.</p>
                    <div className="text-lg font-mono font-bold text-amber-400 mt-3">₹{course.earlyBirdPrice * 2} <span className="text-slate-500 line-through text-xs font-normal">₹{course.regularPrice * 2}</span></div>
                  </div>
                  <ul className="space-y-2 text-[11px] text-slate-300 border-t border-slate-800 pt-3.5 flex-grow">
                    <li className="flex items-center gap-1.5 text-amber-400 font-bold">✓ Everything in Basic</li>
                    <li className="flex items-center gap-1.5">✓ Premium High-yield Notes</li>
                    <li className="flex items-center gap-1.5">✓ Source Codes & GitHub Repo</li>
                    <li className="flex items-center gap-1.5">✓ 1 Mini + 1 Major Capstone</li>
                    <li className="flex items-center gap-1.5">✓ Private Discord Access</li>
                  </ul>
                  <button onClick={() => setIsModalOpen(true)} className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs uppercase tracking-wider transition-all">
                    Choose Project
                  </button>
                </div>

                {/* Professional Plan Info */}
                <div className="border border-slate-200 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100">Professional Plan</span>
                    <h4 className="font-bold text-sm text-slate-950 mt-2">Elite Career Mentorship</h4>
                    <p className="text-[11px] text-slate-500">1-on-1 grooming for placements.</p>
                    <div className="text-lg font-mono font-bold text-slate-950 mt-3">₹{course.earlyBirdPrice * 4} <span className="text-slate-400 line-through text-xs font-normal">₹{course.regularPrice * 4}</span></div>
                  </div>
                  <ul className="space-y-2 text-[11px] text-slate-600 border-t pt-3.5 flex-grow">
                    <li className="flex items-center gap-1.5 text-rose-600 font-bold">✓ Everything in Project</li>
                    <li className="flex items-center gap-1.5">✓ Live Doubt clearance</li>
                    <li className="flex items-center gap-1.5">✓ Resume & LinkedIn Audit</li>
                    <li className="flex items-center gap-1.5">✓ Mock tech interviews</li>
                    <li className="flex items-center gap-1.5">✓ Priority Placement Leads</li>
                  </ul>
                  <button onClick={() => setIsModalOpen(true)} className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-all">
                    Choose Career
                  </button>
                </div>

              </div>
            </div>

            {/* Requirements & Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Requirements */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm space-y-4">
                <h4 className="text-sm font-extrabold text-slate-950 font-mono uppercase tracking-wider border-b pb-2">Requirements</h4>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  {course.requirements?.map((req: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-indigo-500 mt-0.5">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Projects Included */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm space-y-4">
                <h4 className="text-sm font-extrabold text-slate-950 font-mono uppercase tracking-wider border-b pb-2">Projects Included</h4>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  {course.projectsIncluded?.map((proj: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-amber-500 font-bold mt-0.5 font-mono">P{idx + 1}.</span>
                      <span>{proj}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Course FAQ Accordion */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm space-y-6">
              <h3 className="text-lg font-extrabold text-slate-950 border-b pb-3">Course Frequently Asked Questions</h3>
              <div className="space-y-4">
                {courseFaqs.map((faq, idx) => {
                  const isOpen = faqOpen === idx;
                  return (
                    <div key={idx} className="border-b border-slate-100 pb-4">
                      <button 
                        onClick={() => setFaqOpen(isOpen ? null : idx)}
                        className="w-full text-left flex items-center justify-between text-sm font-bold text-slate-800 py-2 cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <QuestionMark className="w-4 h-4 text-slate-400" />
                          {faq.q}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-amber-500' : ''}`} />
                      </button>
                      {isOpen && (
                        <p className="text-xs text-slate-500 leading-relaxed pl-6 pt-2 font-sans">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column Sticky Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-md">
              
              {/* Image Thumbnail */}
              <div className="aspect-video w-full bg-slate-900 relative">
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/20 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-slate-950 flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-slate-900 ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Pricing & Seat Reservation */}
              <div className="p-6 md:p-8 space-y-6">
                
                {/* Price display */}
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono uppercase font-bold">Regular Seat</span>
                    <span className="text-slate-400 line-through font-mono text-sm">₹{course.regularPrice}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-amber-600 block font-mono font-bold uppercase">Early Bird Pricing</span>
                    <span className="text-3xl font-extrabold text-slate-950 font-mono">₹{course.earlyBirdPrice}</span>
                  </div>
                </div>

                {/* Offer notice */}
                <div className="bg-amber-500/10 border border-amber-500/25 p-3.5 rounded-2xl flex items-start gap-3 text-xs text-slate-700">
                  <Flame className="w-5 h-5 text-amber-500 flex-shrink-0 animate-pulse" />
                  <div className="space-y-0.5">
                    <strong>Pre-Booking Active!</strong>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-sans">Lock your early bird seats at 50% discount. No charge is processed today.</p>
                  </div>
                </div>

                {/* Primary CTA Buttons */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-2xl text-xs uppercase tracking-wider active:scale-95 transition-all shadow-md cursor-pointer"
                  >
                    Reserve Early Bird Seat
                  </button>
                  
                  <button
                    onClick={handleShare}
                    className="w-full py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-2xl text-xs uppercase tracking-wider active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    {copied ? "Copied Link!" : "Share Course"}
                  </button>
                </div>

                {/* Included Features List */}
                <div className="pt-6 border-t border-slate-100 space-y-3">
                  <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">This Course Includes</h5>
                  <div className="space-y-2.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{course.modules?.length || 0} Modules & Quizzes</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>Completable on your Mobile/Desktop</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>Lifetime Access to Streams</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>Shareable Verified Certificate</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Quick trust banner */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-3 border border-slate-800 shadow">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                IndiWebPros Commitment
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Every code repository, schematic draft, and presentation synopsis supplied by our faculty is meticulously curated by working IT developers to satisfy academic and industrial excellence standards.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* Reservation Modal Integration */}
      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialCourseId={course.id}
      />
    </div>
  );
}
