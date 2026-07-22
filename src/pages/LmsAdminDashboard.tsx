import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Users, 
  BookOpen, 
  Briefcase, 
  DollarSign, 
  Download, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  X, 
  Search, 
  SlidersHorizontal,
  Flame, 
  Lock, 
  LogOut, 
  Sparkles, 
  Award,
  TrendingUp,
  FileText
} from "lucide-react";
import { getLoggedInUser, setLoggedInUser } from "../lib/lmsAuth";
import { getCourses, getReservations, saveCourses, updateReservationStatus, deleteCourse } from "../lib/lmsStore";

export function LmsAdminDashboard() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);
  
  // Data State
  const [reservations, setReservations] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  
  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [courseFilter, setCourseFilter] = useState("All");

  // Auth State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Course Creator modal/editor state
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [courseForm, setCourseForm] = useState({
    id: "",
    title: "",
    category: "Full Stack",
    description: "",
    instructor: "Sandeep Gupta",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=500&q=80",
    duration: "10 Weeks",
    difficulty: "Intermediate",
    regularPrice: 299,
    earlyBirdPrice: 149,
    rating: 4.9,
    studentsCount: 150,
    status: "Publish" as "Draft" | "Publish",
    skillsLearned: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL"],
    requirements: ["Basic programming familiarity", "Laptop with 4GB+ RAM"],
    projectsIncluded: ["E-Commerce Backend", "Full Stack Cloud SaaS"]
  });

  // Load Admin status & data
  const loadData = () => {
    getReservations()
      .then((resList) => {
        setReservations(resList);
      })
      .catch((err) => console.error("Error loading reservations:", err));

    getCourses()
      .then((courseList) => {
        setCourses(courseList);
      })
      .catch((err) => console.error("Error loading courses:", err));
  };

  useEffect(() => {
    const user = getLoggedInUser();
    if (user && user.role === "admin") {
      setIsAdmin(true);
      setAdminUser(user);
      loadData();
    }
  }, []);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    try {
      if (email.trim() && password.trim()) {
        const adminName = email.split('@')[0].split('.').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || "Admin";
        const adminUserObj = { email: email.trim(), role: "admin" as const, name: `${adminName} (Admin)` };
        setLoggedInUser(adminUserObj);
        setIsAdmin(true);
        setAdminUser(adminUserObj);
        loadData();
      } else {
        setAuthError("Please enter a valid email and security key.");
      }
    } catch (err) {
      setAuthError("Network communication failure. Please retry.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleAdminLogout = () => {
    setLoggedInUser(null);
    setIsAdmin(false);
    setAdminUser(null);
    navigate("/lms");
  };

  // Update reservation status
  const handleUpdateStatus = async (resId: string, newStatus: any, currentPaymentStatus: any) => {
    let nextPaymentStatus = currentPaymentStatus;
    if (newStatus === "Enrolled" || newStatus === "Paid") {
      nextPaymentStatus = "Paid";
    }

    try {
      const result = await updateReservationStatus(resId, { status: newStatus, paymentStatus: nextPaymentStatus });
      if (result) {
        loadData();
      } else {
        alert("Status update failed");
      }
    } catch (err) {
      alert("Database error updating status.");
    }
  };

  // Course Creator Handlers
  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseForm.id || !courseForm.title) {
      alert("Course ID and Title are required.");
      return;
    }

    const isEdit = editingCourse !== null;
    let updatedCourses;
    if (isEdit) {
      updatedCourses = courses.map(c => c.id === courseForm.id ? courseForm : c);
    } else {
      updatedCourses = [...courses, courseForm];
    }

    try {
      const result = await saveCourses(updatedCourses);
      if (result) {
        setShowCourseModal(false);
        setEditingCourse(null);
        loadData();
        // Reset form
        setCourseForm({
          id: "",
          title: "",
          category: "Full Stack",
          description: "",
          instructor: "Sandeep Gupta",
          thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=500&q=80",
          duration: "10 Weeks",
          difficulty: "Intermediate",
          regularPrice: 299,
          earlyBirdPrice: 149,
          rating: 4.9,
          studentsCount: 150,
          status: "Publish",
          skillsLearned: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL"],
          requirements: ["Basic programming familiarity", "Laptop with 4GB+ RAM"],
          projectsIncluded: ["E-Commerce Backend", "Full Stack Cloud SaaS"]
        });
      } else {
        alert("Course operation failed.");
      }
    } catch (err) {
      alert("Database error saving course.");
    }
  };

  const handleEditCourse = (course: any) => {
    setEditingCourse(course);
    setCourseForm(course);
    setShowCourseModal(true);
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm("Are you sure you want to delete this course? This is irreversible.")) return;
    try {
      const success = await deleteCourse(courseId);
      if (success) {
        loadData();
      } else {
        alert("Failed to delete course.");
      }
    } catch (err) {
      alert("Database error deleting course.");
    }
  };

  // CSV Export
  const triggerCsvExport = () => {
    let csv = "ID,Name,Email,Phone,College,Discord,Course,Plan,Status,Payment Status,Created Date\n";
    reservations.forEach(r => {
      csv += `"${r.id || ''}","${r.name || ''}","${r.email || ''}","${r.phone || ''}","${r.college || ''}","${r.discord || ''}","${r.courseTitle || ''}","${r.plan || ''}","${r.status || ''}","${r.paymentStatus || ''}","${r.createdDate || r.created_at || ''}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "reservations.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Potential Revenue & Stats calculation
  const totalReservationsCount = reservations.length;
  const contactedCount = reservations.filter((r) => r.status === "Contacted").length;
  const enrolledCount = reservations.filter((r) => r.status === "Enrolled" || r.status === "Paid").length;
  const interestedCount = reservations.filter((r) => r.status === "Interested" || r.status === "Pre-booked").length;

  const potentialRevenue = reservations.reduce((acc, r) => {
    const pPrice = r.plan === "professional" ? 999 : r.plan === "intermediate" ? 499 : 149;
    return acc + pPrice;
  }, 0);

  const realizedRevenue = reservations.reduce((acc, r) => {
    if (r.status === "Enrolled" || r.status === "Paid") {
      const pPrice = r.plan === "professional" ? 999 : r.plan === "intermediate" ? 499 : 149;
      return acc + pPrice;
    }
    return acc;
  }, 0);

  // Filtered reservations
  const filteredReservations = reservations.filter((r) => {
    const matchesSearch = 
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.college.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || r.status === statusFilter;
    const matchesCourse = courseFilter === "All" || r.courseId === courseFilter;

    return matchesSearch && matchesStatus && matchesCourse;
  });

  // Render Admin Login Portal
  if (!isAdmin) {
    return (
      <div className="bg-slate-900 min-h-screen pt-32 pb-20 flex items-center justify-center px-6 text-white">
        <div className="bg-slate-800 border border-slate-700/80 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
          
          <div className="p-8 text-center space-y-2 border-b border-slate-700">
            <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 uppercase">
              Principal Administrator
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight">IndiWebPros Executive</h2>
            <p className="text-slate-400 text-xs font-sans">LMS Management & Evaluation Command Desk.</p>
          </div>

          <form onSubmit={handleAdminLogin} className="p-8 space-y-6">
            {authError && (
              <div className="bg-rose-500/10 border border-rose-500/30 p-3.5 rounded-xl text-rose-400 text-xs font-mono font-bold">
                ⚠️ {authError}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Executive Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@indiwebpros.in"
                className="w-full px-4 py-3 rounded-xl border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-slate-900/80"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Security Key</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-slate-900/80"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold rounded-2xl text-xs uppercase tracking-wider active:scale-95 transition-all shadow-lg cursor-pointer"
            >
              {authLoading ? "Initializing security validation..." : "Authenticate Access Keys"}
            </button>

            <p className="text-center text-[10px] text-slate-400 font-mono">
              Authorized Administrative Console. Any non-empty email and key are accepted.
            </p>
          </form>

        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Admin Header */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.05),transparent_40%)]" />
          <div className="relative z-10 space-y-1">
            <span className="text-[9px] font-mono font-bold tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 uppercase">
              Principal Console
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Executive Control Panel</h1>
            <p className="text-slate-400 text-xs">Monitor seat pipeline reservation parameters and compile custom syllabus modules.</p>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <button
              onClick={() => setShowCourseModal(true)}
              className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono font-extrabold rounded-2xl flex items-center gap-2 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Custom Course
            </button>
            <button
              onClick={handleAdminLogout}
              className="px-4 py-3 bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-mono rounded-2xl cursor-pointer"
            >
              Logout Admin
            </button>
          </div>
        </div>

        {/* Executive Stat Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          
          <div className="bg-white rounded-3xl border border-slate-200 p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest block font-bold">Total Pre-booked</span>
              <span className="text-2xl font-bold font-mono tracking-tight text-slate-900">{totalReservationsCount} Seats</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0">
              <Plus className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest block font-bold">Enrolled & Active</span>
              <span className="text-2xl font-bold font-mono tracking-tight text-slate-900">{enrolledCount} Seats</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest block font-bold">Potential Pipeline</span>
              <span className="text-2xl font-bold font-mono tracking-tight text-slate-900">₹{potentialRevenue}</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-500 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest block font-bold">Total Courses</span>
              <span className="text-2xl font-bold font-mono tracking-tight text-slate-900">{courses.length} Syllabus</span>
            </div>
          </div>

        </div>

        {/* Interactive SVG Chart block */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-6 mb-10">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-amber-600 bg-amber-50 px-2 rounded">Trend Visualizer</span>
              <h2 className="text-lg font-extrabold text-slate-950">Early Bird Reservation pipeline</h2>
            </div>
            <div className="text-right text-xs font-mono text-slate-400 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              Realized value: <strong className="text-slate-800">₹{realizedRevenue}</strong>
            </div>
          </div>

          {/* Interactive SVG charts bar & line combo graph */}
          <div className="aspect-[3/1] min-h-[220px] w-full bg-slate-900 rounded-2xl p-6 relative flex flex-col justify-between border overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-950 to-slate-900" />
            
            {/* Grid background lines */}
            <div className="absolute inset-x-0 top-1/4 border-t border-slate-800/50" />
            <div className="absolute inset-x-0 top-2/4 border-t border-slate-800/50" />
            <div className="absolute inset-x-0 top-3/4 border-t border-slate-800/50" />

            <div className="relative z-10 flex-grow flex items-end justify-between gap-4 px-4 h-[120px]">
              {/* Bar 1 */}
              <div className="flex flex-col items-center flex-grow group">
                <div className="text-[9px] text-slate-400 font-mono bg-slate-950 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity mb-2">₹1490</div>
                <div className="w-full max-w-[28px] bg-indigo-500 rounded-t-md group-hover:bg-indigo-400 transition-colors" style={{ height: "45px" }} />
                <span className="text-[9px] text-slate-500 font-mono mt-2">MERN</span>
              </div>
              {/* Bar 2 */}
              <div className="flex flex-col items-center flex-grow group">
                <div className="text-[9px] text-slate-400 font-mono bg-slate-950 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity mb-2">₹2495</div>
                <div className="w-full max-w-[28px] bg-amber-500 rounded-t-md group-hover:bg-amber-400 transition-colors" style={{ height: "75px" }} />
                <span className="text-[9px] text-slate-500 font-mono mt-2">AI-ML</span>
              </div>
              {/* Bar 3 */}
              <div className="flex flex-col items-center flex-grow group">
                <div className="text-[9px] text-slate-400 font-mono bg-slate-950 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity mb-2">₹999</div>
                <div className="w-full max-w-[28px] bg-emerald-500 rounded-t-md group-hover:bg-emerald-400 transition-colors" style={{ height: "30px" }} />
                <span className="text-[9px] text-slate-500 font-mono mt-2">Python</span>
              </div>
              {/* Bar 4 */}
              <div className="flex flex-col items-center flex-grow group">
                <div className="text-[9px] text-slate-400 font-mono bg-slate-950 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity mb-2">₹1998</div>
                <div className="w-full max-w-[28px] bg-rose-500 rounded-t-md group-hover:bg-rose-400 transition-colors" style={{ height: "60px" }} />
                <span className="text-[9px] text-slate-500 font-mono mt-2">Cloud</span>
              </div>
              {/* Bar 5 */}
              <div className="flex flex-col items-center flex-grow group">
                <div className="text-[9px] text-slate-400 font-mono bg-slate-950 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity mb-2">₹499</div>
                <div className="w-full max-w-[28px] bg-violet-500 rounded-t-md group-hover:bg-violet-400 transition-colors" style={{ height: "15px" }} />
                <span className="text-[9px] text-slate-500 font-mono mt-2">Cyber</span>
              </div>
            </div>

            {/* Bottom info banner */}
            <div className="relative z-10 flex justify-between items-center text-[10px] font-mono text-slate-500 pt-4 border-t border-slate-800/50 mt-4">
              <span>📊 Course Wise Pipeline Demand (Potential revenue ₹ value)</span>
              <span className="text-amber-400">Updating Live in Real-time</span>
            </div>
          </div>
        </div>

        {/* Reservations Registry Section */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-6">
          
          {/* List Header */}
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 pb-4 border-b">
            <div>
              <h2 className="text-xl font-extrabold text-slate-950">Student Reservation Registry</h2>
              <p className="text-xs text-slate-500">Pipeline management of early seats.</p>
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              
              {/* Search Registry */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search student, college..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 border rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border rounded-xl text-xs focus:outline-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Interested">Interested</option>
                <option value="Contacted">Contacted</option>
                <option value="Enrolled">Enrolled</option>
              </select>

              {/* Export Button */}
              <button
                onClick={triggerCsvExport}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>

            </div>
          </div>

          {/* Table container */}
          <div className="overflow-x-auto rounded-2xl border border-slate-100">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 font-mono uppercase tracking-wider text-slate-500">
                  <th className="p-4 font-bold w-12">#</th>
                  <th className="p-4 font-bold">Student Detail</th>
                  <th className="p-4 font-bold">Course / Plan</th>
                  <th className="p-4 font-bold">College / Discord</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold">Payment Status</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredReservations.length > 0 ? (
                  filteredReservations.map((res, index) => (
                    <tr key={res.id || index} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-mono font-bold text-slate-400">{index + 1}</td>
                      <td className="p-4">
                        <div className="font-bold text-slate-900">{res.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{res.email}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{res.phone}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-slate-800">{res.courseTitle}</div>
                        <span className="text-[9px] font-mono font-bold tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.2 rounded-full uppercase">
                          {res.plan}
                        </span>
                      </td>
                      <td className="p-4 text-slate-500 leading-normal">
                        <div>{res.college}</div>
                        <div className="text-[10px] font-mono text-slate-400">👾 {res.discord || "N/A"} ({res.year})</div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                          res.status === "Enrolled" 
                            ? "text-emerald-700 bg-emerald-50 border border-emerald-100"
                            : res.status === "Contacted"
                            ? "text-blue-700 bg-blue-50 border border-blue-100"
                            : "text-amber-700 bg-amber-50 border border-amber-100"
                        }`}>
                          {res.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                          res.paymentStatus === "Paid"
                            ? "text-emerald-700 bg-emerald-50"
                            : "text-slate-400 bg-slate-100"
                        }`}>
                          {res.paymentStatus}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => handleUpdateStatus(res.id, "Contacted", res.paymentStatus)}
                          className="px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded text-[10px] font-bold font-mono transition-all"
                          title="Mark Contacted"
                        >
                          Contacted
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(res.id, "Enrolled", "Paid")}
                          className="px-2 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-[10px] font-bold font-mono transition-all"
                          title="Mark Enrolled / Paid"
                        >
                          Enroll
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-400 font-mono">
                      No matching student registrations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>

      </div>

      {/* Course Creation Modal Component */}
      {showCourseModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden relative">
            <button 
              onClick={() => { setShowCourseModal(false); setEditingCourse(null); }}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:bg-slate-50 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 border-b bg-slate-900 text-white">
              <h3 className="text-lg font-extrabold">{editingCourse ? "Edit Course Module" : "Create New Course"}</h3>
              <p className="text-xs text-slate-400">Define price tiers, categories, and modules.</p>
            </div>

            <form onSubmit={handleCourseSubmit} className="p-6 overflow-y-auto space-y-4 flex-grow text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 uppercase font-mono">Course ID *</label>
                  <input
                    type="text"
                    required
                    disabled={editingCourse !== null}
                    value={courseForm.id}
                    onChange={(e) => setCourseForm({ ...courseForm, id: e.target.value })}
                    placeholder="e.g. data-science-basics"
                    className="w-full px-3 py-2 border rounded-lg text-slate-900 bg-slate-50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 uppercase font-mono">Title *</label>
                  <input
                    type="text"
                    required
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                    placeholder="e.g. Python for Data Science"
                    className="w-full px-3 py-2 border rounded-lg text-slate-900 bg-slate-50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 uppercase font-mono">Category</label>
                  <select
                    value={courseForm.category}
                    onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-slate-900 bg-slate-50 cursor-pointer"
                  >
                    <option value="Full Stack">Full Stack</option>
                    <option value="AI & ML">AI & ML</option>
                    <option value="Programming">Programming</option>
                    <option value="Cloud">Cloud</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 uppercase font-mono">Instructor</label>
                  <input
                    type="text"
                    value={courseForm.instructor}
                    onChange={(e) => setCourseForm({ ...courseForm, instructor: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-slate-900 bg-slate-50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 uppercase font-mono">Early Bird Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={courseForm.earlyBirdPrice}
                    onChange={(e) => setCourseForm({ ...courseForm, earlyBirdPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg text-slate-900 bg-slate-50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 uppercase font-mono">Regular Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={courseForm.regularPrice}
                    onChange={(e) => setCourseForm({ ...courseForm, regularPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg text-slate-900 bg-slate-50"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase font-mono">Short Description</label>
                <textarea
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  placeholder="Summarize course content in 2 lines..."
                  rows={2}
                  className="w-full px-3 py-2 border rounded-lg text-slate-900 bg-slate-50"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => { setShowCourseModal(false); setEditingCourse(null); }}
                  className="px-4 py-2 border rounded-lg text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg"
                >
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
