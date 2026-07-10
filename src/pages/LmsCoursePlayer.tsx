import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Play, 
  CheckCircle, 
  ChevronRight, 
  ChevronLeft, 
  FileText, 
  Code, 
  MessageSquare, 
  Download, 
  Award, 
  CheckCircle2, 
  Circle, 
  Settings, 
  Maximize, 
  Volume2, 
  Sparkles,
  Compass,
  ArrowRight
} from "lucide-react";
import { getLoggedInUser } from "../lib/lmsAuth";
import { getCourses } from "../lib/lmsStore";

export function LmsCoursePlayer() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Player state
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressVal, setProgressVal] = useState(12);

  // Discussion forum state
  const [comments, setComments] = useState<any[]>([
    { name: "Suresh Babu", role: "Student", text: "Is the repository updated to Tailwind v4?", date: "2 hours ago" },
    { name: "Sandeep Gupta", role: "Instructor", text: "Yes Suresh, all configuration parameters conform to the new v4 guidelines.", date: "1 hour ago" }
  ]);
  const [newComment, setNewComment] = useState("");

  // Tabs under player
  const [playerTab, setPlayerTab] = useState<"overview" | "code" | "pdf" | "forum">("overview");

  useEffect(() => {
    // Force student login check
    const user = getLoggedInUser();
    if (!user) {
      navigate("/lms/dashboard");
      return;
    }

    getCourses()
      .then((courseList) => {
        const found = courseList.find((c: any) => c.id === courseId);
        if (found) {
          setCourse(found);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading course for player:", err);
        setLoading(false);
      });
  }, [courseId]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-slate-500 text-sm font-mono">Launching stream connection...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="pt-32 pb-20 text-center space-y-4 max-w-md mx-auto px-6">
        <h3 className="text-lg font-bold">Course stream not found</h3>
        <Link to="/lms/dashboard" className="inline-block px-5 py-2.5 bg-slate-900 text-white font-bold rounded-xl text-xs uppercase tracking-wider">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const activeModule = course.modules?.[activeModuleIdx];
  const activeLesson = activeModule?.lessons?.[activeLessonIdx];

  // Mark lesson complete
  const toggleLessonCompleted = (lessonId: string) => {
    setCompletedLessons(prev => {
      const updated = { ...prev, [lessonId]: !prev[lessonId] };
      // Recalculate total progress percentage
      const totalLessons = course.modules?.reduce((acc: number, m: any) => acc + (m.lessons?.length || 0), 0) || 1;
      const completedCount = Object.values(updated).filter(Boolean).length;
      setProgressVal(Math.round((completedCount / totalLessons) * 100));
      return updated;
    });
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const user = getLoggedInUser();
    setComments(prev => [
      ...prev,
      {
        name: user ? user.name : "Anonymous Student",
        role: "Student",
        text: newComment,
        date: "Just now"
      }
    ]);
    setNewComment("");
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 pt-16 flex flex-col">
      
      {/* Distraction-Free Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link 
            to="/lms/dashboard" 
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl border border-slate-700 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-[10px] text-amber-400 font-mono font-bold tracking-widest uppercase">IndiWebPros Player</span>
            <h1 className="text-sm md:text-base font-extrabold text-white tracking-tight leading-none truncate max-w-[250px] md:max-w-[400px]">
              {course.title}
            </h1>
          </div>
        </div>

        {/* Progress indicators */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <span className="text-[10px] text-slate-400 font-mono">Course Progress</span>
            <span className="block text-xs font-bold text-emerald-400 font-mono">{progressVal}% Completed</span>
          </div>
          <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden hidden sm:block">
            <div 
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{ width: `${progressVal}%` }}
            />
          </div>
        </div>
      </div>

      {/* Workspace Grid */}
      <div className="flex-grow flex flex-col lg:flex-row items-stretch overflow-hidden">
        
        {/* Left Side: Video & Details */}
        <div className="flex-grow lg:w-3/4 p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
          
          {/* Animated Video Stream Frame */}
          <div className="aspect-video w-full bg-slate-900 rounded-3xl border border-slate-800 relative overflow-hidden flex flex-col justify-between group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30" />
            
            {/* Visual Stream Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 z-10 text-center p-6 select-none">
              <div 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center cursor-pointer shadow-xl hover:scale-110 active:scale-95 transition-all animate-pulse"
              >
                <Play className="w-6 h-6 fill-slate-950 ml-0.5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                  {isPlaying ? "Streaming Active" : "Stream Suspended"}
                </span>
                <h2 className="text-xl font-bold font-sans text-white max-w-md mx-auto line-clamp-1">
                  {activeLesson ? activeLesson.title : "Introduction lesson"}
                </h2>
                <p className="text-[10px] text-slate-500 font-mono">1085p HD Studio Stream &bull; {activeLesson ? activeLesson.duration : "00:00"}</p>
              </div>
            </div>

            {/* Top Bar inside player */}
            <div className="p-4 flex justify-between items-center relative z-20">
              <span className="text-[10px] font-mono font-bold bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800">
                Lesson {activeLessonIdx + 1}
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                AUTO SPEED 1.0X
              </span>
            </div>

            {/* Controller interface */}
            <div className="p-4 bg-slate-900/90 border-t border-slate-800/80 flex items-center justify-between relative z-20">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:text-amber-400 transition-colors cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                </button>
                <div className="w-24 md:w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-1/3" />
                </div>
                <span className="text-[10px] text-slate-400 font-mono">03:45 / {activeLesson ? activeLesson.duration : "10:00"}</span>
              </div>

              <div className="flex items-center gap-4 text-slate-400">
                <Volume2 className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
                <Settings className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
                <Maximize className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
              </div>
            </div>

          </div>

          {/* Details & Interactive Lesson Materials Tabs */}
          <div className="space-y-6">
            
            {/* Tabs Row */}
            <div className="flex border-b border-slate-800 gap-6">
              <button
                onClick={() => setPlayerTab("overview")}
                className={`pb-3 font-mono font-bold text-xs tracking-wider uppercase border-b-2 transition-all cursor-pointer ${playerTab === "overview" ? "border-amber-500 text-white" : "border-transparent text-slate-500 hover:text-slate-300"}`}
              >
                Overview
              </button>
              <button
                onClick={() => setPlayerTab("code")}
                className={`pb-3 font-mono font-bold text-xs tracking-wider uppercase border-b-2 transition-all cursor-pointer ${playerTab === "code" ? "border-amber-500 text-white" : "border-transparent text-slate-500 hover:text-slate-300"}`}
              >
                Source Code
              </button>
              <button
                onClick={() => setPlayerTab("pdf")}
                className={`pb-3 font-mono font-bold text-xs tracking-wider uppercase border-b-2 transition-all cursor-pointer ${playerTab === "pdf" ? "border-amber-500 text-white" : "border-transparent text-slate-500 hover:text-slate-300"}`}
              >
                Syllabus Guide
              </button>
              <button
                onClick={() => setPlayerTab("forum")}
                className={`pb-3 font-mono font-bold text-xs tracking-wider uppercase border-b-2 transition-all cursor-pointer ${playerTab === "forum" ? "border-amber-500 text-white" : "border-transparent text-slate-500 hover:text-slate-300"}`}
              >
                Discussion Board ({comments.length})
              </button>
            </div>

            {/* Tab Panels */}
            <div className="min-h-[200px]">
              
              {/* Overview */}
              {playerTab === "overview" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-lg text-white">
                      {activeLesson ? activeLesson.title : "Lesson Details"}
                    </h3>
                    {activeLesson && (
                      <button
                        onClick={() => toggleLessonCompleted(activeLesson.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                          completedLessons[activeLesson.id]
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        {completedLessons[activeLesson.id] ? "Completed!" : "Mark Lesson Complete"}
                      </button>
                    )}
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed font-sans">
                    Welcome to this module block. In this session, our faculty guides you through direct variables, architectural parameters, error boundaries, and integration mechanics. Download files inside the relative resource drawers to lock in hands-on gains.
                  </p>
                </div>
              )}

              {/* Source Code */}
              {playerTab === "code" && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div className="flex justify-between items-center text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
                    <span>File: index.tsx</span>
                    <button 
                      onClick={() => alert("Copied Code Block to Clipboard")}
                      className="text-indigo-400 hover:text-indigo-300 font-bold"
                    >
                      Copy Snippet
                    </button>
                  </div>
                  <pre className="text-xs font-mono text-emerald-400 overflow-x-auto select-all leading-relaxed whitespace-pre p-2">
{`import React from "react";
import { GoogleGenAI } from "@google/genai";

// Initialize Lazy Secure Server-side API Client
export async function handleRequest() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Analyze college draft presentation files.",
  });
  console.log(response.text);
}`}
                  </pre>
                </div>
              )}

              {/* PDF Guide */}
              {playerTab === "pdf" && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4 max-w-md">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 mx-auto">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-white">Academic Study Blueprint</h4>
                    <p className="text-xs text-slate-400">Download syllabus index, synopsis outlines and presentation drafts for college submission.</p>
                  </div>
                  <button 
                    onClick={() => alert("Study blueprint download started.")}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors"
                  >
                    <Download className="w-4 h-4 text-amber-400" />
                    Download PDF Guide (1.8 MB)
                  </button>
                </div>
              )}

              {/* Forum Board */}
              {playerTab === "forum" && (
                <div className="space-y-6">
                  <form onSubmit={handlePostComment} className="flex gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Post a query or review regarding this module..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-grow px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    <button
                      type="submit"
                      className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all"
                    >
                      Post
                    </button>
                  </form>

                  <div className="space-y-4">
                    {comments.map((cmt, idx) => (
                      <div key={idx} className="bg-slate-900/50 border border-slate-900 p-4 rounded-xl space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-xs text-white">{cmt.name}</span>
                            <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${cmt.role === 'Instructor' ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20' : 'text-slate-400 bg-slate-800'}`}>
                              {cmt.role}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">{cmt.date}</span>
                        </div>
                        <p className="text-slate-400 text-xs font-sans">{cmt.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* Right Side: Sidebar Navigation */}
        <div className="lg:w-1/4 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-900 overflow-y-auto flex-shrink-0">
          <div className="p-4 border-b border-slate-800">
            <h3 className="font-extrabold text-sm text-white">Course Outline</h3>
            <p className="text-[10px] text-slate-500 font-mono">Select a module to steam lessons</p>
          </div>

          <div className="divide-y divide-slate-800">
            {course.modules?.map((mod: any, mIdx: number) => (
              <div key={mod.id} className="p-4 space-y-2.5 bg-slate-900/50">
                <span className="text-[9px] text-amber-400 font-mono font-bold uppercase tracking-widest">
                  MODULE {mIdx + 1}: {mod.title}
                </span>

                <div className="space-y-1.5">
                  {mod.lessons?.map((les: any, lIdx: number) => {
                    const isActive = activeModuleIdx === mIdx && activeLessonIdx === lIdx;
                    const isDone = completedLessons[les.id];
                    return (
                      <button
                        key={les.id}
                        onClick={() => {
                          setActiveModuleIdx(mIdx);
                          setActiveLessonIdx(lIdx);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-start gap-2.5 cursor-pointer ${
                          isActive 
                            ? "bg-slate-800 text-white border border-slate-700 shadow" 
                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="space-y-0.5">
                          <span className="font-bold block leading-snug line-clamp-1">{les.title}</span>
                          <span className="text-[9px] text-slate-500 font-mono uppercase">{les.duration}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
