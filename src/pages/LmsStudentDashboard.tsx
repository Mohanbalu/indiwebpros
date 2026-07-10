import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  Award, 
  Sparkles, 
  Download, 
  Play, 
  Compass, 
  ExternalLink, 
  FileText, 
  Code, 
  CheckCircle, 
  HelpCircle,
  HelpCircle as QuestionMark,
  LogOut, 
  Flame, 
  Trophy, 
  Clock, 
  Lock,
  ChevronRight,
  ShieldAlert
} from "lucide-react";
import { getLoggedInUser, setLoggedInUser, User } from "../lib/lmsAuth";
import { getCourses, getReservations } from "../lib/lmsStore";

export function LmsStudentDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<"courses" | "quizzes" | "certificates" | "resources">("courses");
  const [courses, setCourses] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  
  // Login State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Quiz State
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Certificate State
  const [certifiedCourse, setCertifiedCourse] = useState<string | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  const quizQuestions = [
    {
      q: "Which hook should be used in React 18+ to perform side effects inside functional components?",
      options: ["useState", "useEffect", "useContext", "useReducer"],
      answer: 1
    },
    {
      q: "In PostgreSQL, which index type is preferred for full-text search vector indexing with pg_trgm?",
      options: ["B-Tree", "Hash", "GIST / GIN", "BRIN"],
      answer: 2
    },
    {
      q: "What is the primary architectural purpose of a reverse proxy like NGINX in full-stack deployment?",
      options: ["To execute Node processes", "To serve as load balancer & cache gateway", "To compile CSS assets", "To hold SQL sessions"],
      answer: 1
    },
    {
      q: "Which HTTP status code signifies that a server-side route is unauthorized due to bad credentials?",
      options: ["400 Bad Request", "401 Unauthorized", "403 Forbidden", "404 Not Found"],
      answer: 1
    },
    {
      q: "How does the Antigravity agent process prompt context within Google AI Studio?",
      options: ["Client-side WebGPU execution", "Server-side pipeline wrapping Gemini API", "Static file caching", "External REST proxies"],
      answer: 1
    }
  ];

  const resourceLibrary = [
    { title: "Ultimate MERN Stack Cheat Sheet", type: "PDF Guide", size: "2.4 MB", icon: FileText, download: "#" },
    { title: "PostgreSQL Database Architecture Blueprint", type: "Design SVG", size: "4.1 MB", icon: Code, download: "#" },
    { title: "React 19 & Tailwind v4 Custom Boilerplate", type: "ZIP Source", size: "1.2 MB", icon: Code, download: "#" },
    { title: "College Project IEEE Synopsis Outline", type: "Word Draft", size: "850 KB", icon: FileText, download: "#" }
  ];

  // Refresh user data & courses
  useEffect(() => {
    const loggedUser = getLoggedInUser();
    if (loggedUser) {
      setUser(loggedUser);
      // Fetch latest reservations directly
      getReservations()
        .then(resList => {
          const studentRes = resList.filter((r: any) => r.email.toLowerCase() === loggedUser.email.toLowerCase());
          setReservations(studentRes);
        })
        .catch(err => console.error("Error fetching student reservations:", err));
    }

    // Load available published courses directly
    getCourses()
      .then(courseList => {
        setCourses(courseList.filter((c: any) => c.status === "Publish"));
      })
      .catch(err => console.error("Error fetching courses:", err));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setLoginError("Email address is required.");
      return;
    }
    setLoginLoading(true);
    setLoginError("");

    try {
      // Admin check
      if (email.toLowerCase() === "admin@indiwebpros.com" && password === "Admin@123") {
        const adminUser = { email, role: "admin" as const, name: "IndiWebPros Admin" };
        setLoggedInUser(adminUser);
        setUser(adminUser);
        setReservations([]);
        setLoginLoading(false);
        return;
      }

      // Student check
      const allReservations = await getReservations();
      const studentRes = allReservations.find(r => r.email.toLowerCase() === email.toLowerCase());

      if (studentRes) {
        const studentUser = { 
          email: studentRes.email, 
          role: "student" as const, 
          name: studentRes.name,
          college: studentRes.college,
          discord: studentRes.discord,
          year: studentRes.year,
        };
        setLoggedInUser(studentUser);
        setUser(studentUser);
        setReservations(allReservations.filter(r => r.email.toLowerCase() === email.toLowerCase()));
      } else {
        setLoginError("No reservation found matching this email address.");
      }
    } catch (err) {
      setLoginError("Database failure. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setUser(null);
    setQuizStarted(false);
    setQuizFinished(false);
    setShowCertificate(false);
    setCertifiedCourse(null);
    navigate("/lms");
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
  };

  const handleAnswerSelection = (idx: number) => {
    setSelectedAnswer(idx);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;
    
    // Grade answer
    if (selectedAnswer === quizQuestions[currentQuestion].answer) {
      setScore(prev => prev + 1);
    }

    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
      // Pass score of 4 or 5 unlocks certificate
      if (score >= 3 || (selectedAnswer === quizQuestions[currentQuestion].answer && score + 1 >= 3)) {
        // Unlock first enrolled course certificate or generic developer certificate
        const courseTitle = reservations.length > 0 ? reservations[0].courseTitle : "Full Stack Web Developer (MERN)";
        setCertifiedCourse(courseTitle);
      }
    }
  };

  const generateCertificate = () => {
    setShowCertificate(true);
  };

  // Login Portal UI
  if (!user) {
    return (
      <div className="bg-slate-50 min-h-screen pt-32 pb-20 flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl max-w-md w-full overflow-hidden">
          
          <div className="bg-slate-900 text-white p-8 text-center space-y-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.15),transparent_50%)]" />
            <div className="relative z-10 space-y-1">
              <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full uppercase">
                Student & Admin Portal
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight">IndiWebPros Academy</h2>
              <p className="text-slate-400 text-xs">Enter your registered email to explore resources.</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-6">
            {loginError && (
              <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-xl text-rose-700 text-xs font-semibold flex items-start gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-500 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Registered Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. sandeep_g@indiwebpros.in"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all bg-slate-50/50"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Password (For Admin Only)</label>
                <span className="text-[10px] text-slate-400 font-mono">Not needed for reserved students</span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin password if applicable"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all bg-slate-50/50"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-2xl text-xs uppercase tracking-wider active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {loginLoading ? "Authenticating..." : "Login to Workspace"}
            </button>

            <div className="text-center space-y-2 border-t pt-5 border-slate-100">
              <p className="text-[10px] text-slate-400 leading-relaxed font-mono">
                💡 Quick Demo Login:
                <br />
                Student: <span className="text-slate-700 font-bold">student@indiwebpros.in</span> (no password needed)
              </p>
            </div>
          </form>

        </div>
      </div>
    );
  }

  // Admin routing fallback helper
  if (user.role === "admin") {
    return (
      <div className="pt-32 pb-20 text-center max-w-md mx-auto px-6 space-y-4">
        <div className="w-16 h-16 bg-amber-500/10 rounded-3xl flex items-center justify-center mx-auto text-amber-500">
          <Award className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold">Admin Credentials Detected</h3>
        <p className="text-xs text-slate-500 font-sans leading-relaxed">
          You have successfully authenticated as the Principal administrator. Click the button below to reach the specialized Admin Controls panel.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/lms/admin" className="px-5 py-2.5 bg-slate-900 text-white font-bold rounded-xl text-xs uppercase tracking-wider">
            Go to Admin Panel
          </Link>
          <button onClick={handleLogout} className="px-5 py-2.5 border border-slate-200 text-slate-700 font-bold rounded-xl text-xs uppercase tracking-wider">
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Welcome Header */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-8 md:p-10 border border-slate-800 relative overflow-hidden shadow-lg mb-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.1),transparent_50%)]" />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <span className="bg-amber-500 text-slate-950 text-[9px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded-full">
                {user.role === "student" ? "Verified Student Access" : "Guest Access"}
              </span>
              <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
                Welcome back, {user.name}!
              </h1>
              <p className="text-slate-300 text-xs md:text-sm font-sans flex items-center flex-wrap gap-x-3 gap-y-1">
                <span>🏫 College: <strong>{user.college || "N/A"}</strong></span>
                <span>&bull;</span>
                <span>🎓 Year: <strong>{user.year || "3rd Year"}</strong></span>
                <span>&bull;</span>
                <span>💬 Discord: <strong className="text-amber-400">{user.discord || "Not Configured"}</strong></span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a 
                href="https://discord.gg/indiwebpros" 
                target="_blank" 
                className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono font-extrabold rounded-2xl flex items-center gap-2 active:scale-95 transition-all shadow-md"
              >
                Join Private Discord
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={handleLogout}
                className="p-3 bg-slate-800/80 hover:bg-slate-800 text-white/80 hover:text-white rounded-2xl border border-slate-700/50 cursor-pointer active:scale-95 transition-all"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex border-b border-slate-200 mb-8 gap-4 overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => setActiveTab("courses")}
            className={`pb-4 px-2 font-bold text-sm tracking-wide border-b-2 transition-all cursor-pointer ${activeTab === "courses" ? "border-amber-500 text-slate-950" : "border-transparent text-slate-400 hover:text-slate-600"}`}
          >
            My Saved Seats ({reservations.length})
          </button>
          <button
            onClick={() => setActiveTab("quizzes")}
            className={`pb-4 px-2 font-bold text-sm tracking-wide border-b-2 transition-all cursor-pointer ${activeTab === "quizzes" ? "border-amber-500 text-slate-950" : "border-transparent text-slate-400 hover:text-slate-600"}`}
          >
            Interactive Quizzes
          </button>
          <button
            onClick={() => setActiveTab("certificates")}
            className={`pb-4 px-2 font-bold text-sm tracking-wide border-b-2 transition-all cursor-pointer ${activeTab === "certificates" ? "border-amber-500 text-slate-950" : "border-transparent text-slate-400 hover:text-slate-600"}`}
          >
            My Credentials
          </button>
          <button
            onClick={() => setActiveTab("resources")}
            className={`pb-4 px-2 font-bold text-sm tracking-wide border-b-2 transition-all cursor-pointer ${activeTab === "resources" ? "border-amber-500 text-slate-950" : "border-transparent text-slate-400 hover:text-slate-600"}`}
          >
            Resource Library
          </button>
        </div>

        {/* Tab Contents */}
        <div className="space-y-6">

          {/* Courses Tab */}
          {activeTab === "courses" && (
            <div className="space-y-6">
              {reservations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {reservations.map((res) => {
                    const matchedCourse = courses.find((c) => c.id === res.courseId);
                    return (
                      <div 
                        key={res.id} 
                        className="bg-white rounded-3xl border border-slate-200/85 overflow-hidden shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all"
                      >
                        <div className="p-6 space-y-4">
                          
                          {/* Top Meta info */}
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-mono font-bold tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full uppercase">
                              {res.plan || "Intermediate"} Tier
                            </span>
                            <span className={`text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full ${
                              res.status === "Enrolled" || res.status === "Paid" 
                                ? "text-emerald-700 bg-emerald-50 border border-emerald-100" 
                                : "text-amber-700 bg-amber-50 border border-amber-100"
                            }`}>
                              ● {res.status || "Pre-booked"}
                            </span>
                          </div>

                          <h3 className="font-extrabold text-lg text-slate-900 leading-snug">
                            {res.courseTitle}
                          </h3>

                          {matchedCourse && (
                            <p className="text-xs text-slate-500 line-clamp-2">
                              {matchedCourse.description}
                            </p>
                          )}

                          {/* Detail summary box */}
                          <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl grid grid-cols-2 gap-4 text-xs font-mono text-slate-600">
                            <div>
                              <span className="text-slate-400 block text-[9px] uppercase font-bold">Booking ID</span>
                              <span className="font-bold text-slate-800">{res.id}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[9px] uppercase font-bold">Launch Price</span>
                              <span className="font-bold text-emerald-600">₹{matchedCourse ? matchedCourse.earlyBirdPrice : "149"}</span>
                            </div>
                            <div className="col-span-2 border-t pt-2 mt-1">
                              <span className="text-slate-400 block text-[9px] uppercase font-bold">Status Remarks</span>
                              <span className="text-slate-600 text-[10px]">
                                {res.status === "Interested" || res.status === "Pre-booked"
                                  ? "Reserved for next launch batch. Discount coupon will trigger via Email."
                                  : "Payment verified. Ready to start player!"}
                              </span>
                            </div>
                          </div>

                        </div>

                        {/* Card bottom actions */}
                        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-4">
                          <Link 
                            to={`/lms/course/${res.courseId}`} 
                            className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
                          >
                            Explore Syllabus &rarr;
                          </Link>

                          {/* Quick access to player for exploration */}
                          <Link
                            to={`/lms/player/${res.courseId}`}
                            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 active:scale-95 transition-all"
                          >
                            <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            Explore Player
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white border rounded-3xl p-16 text-center space-y-4 max-w-xl mx-auto shadow-sm">
                  <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto text-amber-500">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">No Reserved Course Seats Found</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    You have not reserved any course seats under this email address yet. Jump to the course catalog, select your tier, and lock pre-launch benefits!
                  </p>
                  <Link
                    to="/lms/courses"
                    className="inline-block px-6 py-3 bg-slate-900 text-white font-bold rounded-xl text-xs uppercase tracking-wider"
                  >
                    View All Courses
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Quizzes Tab */}
          {activeTab === "quizzes" && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm space-y-6">
              
              {!quizStarted && !quizFinished ? (
                <div className="max-w-xl mx-auto text-center space-y-6 py-8">
                  <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto border border-indigo-100">
                    <Trophy className="w-8 h-8 text-amber-500" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-slate-950">Academic Evaluation Challenge</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">
                      Test your core full-stack development, PostgreSQL, and engineering architecture concepts. Score 60% or higher (3/5 answers) to instantly unlock and generate your verified course completion credential!
                    </p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-left text-xs text-slate-600 space-y-2 font-mono">
                    <div>📋 <strong>Format:</strong> 5 Multiple-Choice Questions (MCQs)</div>
                    <div>🎯 <strong>Pass Threshold:</strong> At least 3 Correct responses</div>
                    <div>🏅 <strong>Award:</strong> Interactive printable achievement scroll</div>
                  </div>
                  <button
                    onClick={startQuiz}
                    className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow"
                  >
                    Commence Challenge Now &rarr;
                  </button>
                </div>
              ) : quizFinished ? (
                <div className="max-w-xl mx-auto text-center space-y-6 py-8">
                  
                  {score >= 3 ? (
                    <>
                      <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto border border-emerald-100 animate-bounce">
                        <Award className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-extrabold text-slate-950">Congratulations, You Passed!</h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">
                        You scored <strong className="text-slate-800 font-mono text-base">{score}/5</strong>. This demonstrates excellent command over functional variables, React architecture, and PostgreSQL DB parameters!
                      </p>
                      <button
                        onClick={generateCertificate}
                        className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs uppercase tracking-wider shadow"
                      >
                        Generate & View Certificate
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto border border-rose-100">
                        <HelpCircle className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-950">Score {score}/5 - Evaluation Unsuccessful</h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">
                        Don't worry! Engineering is all about repeating and debugging. Go over resource cheat sheets and retry the challenge to unlock your credential.
                      </p>
                      <button
                        onClick={startQuiz}
                        className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs uppercase tracking-wider"
                      >
                        Try Challenge Again
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className="max-w-xl mx-auto space-y-6 py-6">
                  {/* Progress Header */}
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 border-b pb-3">
                    <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                    <span>Evaluation Score: {score}</span>
                  </div>

                  {/* Question */}
                  <div className="space-y-4">
                    <h4 className="font-extrabold text-slate-900 text-base leading-snug">
                      {quizQuestions[currentQuestion].q}
                    </h4>

                    {/* Options list */}
                    <div className="space-y-2.5">
                      {quizQuestions[currentQuestion].options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAnswerSelection(idx)}
                          className={`w-full text-left px-5 py-3.5 rounded-xl border text-xs font-bold font-sans transition-all flex items-center justify-between cursor-pointer ${
                            selectedAnswer === idx 
                              ? "border-amber-500 bg-amber-500/10 text-slate-950" 
                              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700"
                          }`}
                        >
                          <span>{opt}</span>
                          <span className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px]">
                            {idx + 1}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Answer */}
                  <div className="flex justify-end pt-4 border-t">
                    <button
                      onClick={handleNextQuestion}
                      disabled={selectedAnswer === null}
                      className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs uppercase tracking-wider disabled:opacity-40"
                    >
                      {currentQuestion + 1 === quizQuestions.length ? "Finish Test" : "Submit & Next Question"}
                    </button>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* Credentials Tab */}
          {activeTab === "certificates" && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm space-y-6">
              
              {showCertificate && certifiedCourse ? (
                <div className="space-y-8 text-center">
                  
                  {/* Premium Renders Certificate in Custom SVG Frame */}
                  <div className="max-w-2xl mx-auto bg-amber-50/20 border-8 border-amber-500 p-8 rounded-2xl relative shadow-lg text-slate-900 font-serif">
                    {/* Gold filigree borders */}
                    <div className="absolute inset-2 border-2 border-amber-500/30 border-dashed pointer-events-none" />
                    
                    <div className="space-y-6 py-4 relative z-10">
                      <div className="flex justify-center mb-2">
                        <Award className="w-14 h-14 text-amber-500" />
                      </div>
                      
                      <div className="space-y-1">
                        <span className="font-sans text-xs tracking-widest uppercase font-bold text-amber-600">Certificate of Completion</span>
                        <h4 className="text-[10px] font-sans text-slate-400 uppercase tracking-widest">IndiWebPros Advanced LMS Academy</h4>
                      </div>

                      <p className="font-serif italic text-sm text-slate-600">This is proudly presented to</p>

                      <h3 className="text-3xl font-extrabold text-slate-950 underline decoration-amber-500 decoration-2 font-sans tracking-tight">
                        {user.name}
                      </h3>

                      <p className="font-serif italic text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                        for successfully completing the coursework and demonstrating thorough technical competence in passing the academic evaluation challenge for:
                      </p>

                      <h4 className="font-sans font-extrabold text-slate-900 text-base md:text-lg tracking-tight px-4 py-1.5 bg-white border rounded-xl max-w-lg mx-auto shadow-sm">
                        {certifiedCourse}
                      </h4>

                      <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-200/80 max-w-md mx-auto font-sans">
                        <div className="text-center space-y-1">
                          <span className="block text-xs font-bold text-slate-800">Sandeep Gupta</span>
                          <span className="block text-[9px] text-slate-400 font-mono">Principal Architect, Faculty</span>
                        </div>
                        <div className="text-center space-y-1">
                          <span className="block text-xs font-bold text-slate-800">Verified Credentials</span>
                          <span className="block text-[9px] text-slate-400 font-mono">HASH: IW-LMS-2026-{Math.floor(Math.random() * 90000 + 10000)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => window.print()}
                      className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <Download className="w-4 h-4 text-amber-400" />
                      Print / Download PDF
                    </button>
                    <button
                      onClick={() => setShowCertificate(false)}
                      className="px-6 py-3 border text-slate-700 font-bold rounded-xl text-xs uppercase tracking-wider"
                    >
                      Back
                    </button>
                  </div>

                </div>
              ) : (
                <div className="max-w-xl mx-auto text-center space-y-6 py-8">
                  <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto text-slate-400">
                    <Award className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-950">Credential Unlocked via Passing Score</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    Completion certificates are dynamically unlocked when you score 60% or higher inside the Interactive Quizzes section. Take the evaluation challenge now to print your gold credential.
                  </p>
                  <button
                    onClick={() => setActiveTab("quizzes")}
                    className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl text-xs uppercase tracking-wider"
                  >
                    Go to Quizzes Panel
                  </button>
                </div>
              )}

            </div>
          )}

          {/* Resources Tab */}
          {activeTab === "resources" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resourceLibrary.map((res, idx) => {
                const Icon = res.icon;
                return (
                  <div key={idx} className="bg-white border rounded-2xl p-5 flex items-center justify-between gap-4 hover:border-slate-300 transition-all">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                        <Icon className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs md:text-sm text-slate-900">{res.title}</h4>
                        <div className="flex gap-2 text-[10px] font-mono text-slate-400">
                          <span>{res.type}</span>
                          <span>&bull;</span>
                          <span>{res.size}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Simulated download */}
                    <button 
                      onClick={() => alert(`Beginning download for: ${res.title}`)}
                      className="p-2 bg-slate-50 hover:bg-slate-100 rounded-xl border text-slate-500 hover:text-slate-900 transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
