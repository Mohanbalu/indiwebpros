import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, Star, Award, BookOpen, Compass, ChevronRight } from "lucide-react";
import { ReservationModal } from "../components/ReservationModal";
import { getCourses } from "../lib/lmsStore";

export function LmsCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reserveCourseId, setReserveCourseId] = useState("");

  useEffect(() => {
    getCourses()
      .then((courseList) => {
        setCourses(courseList);
        setFilteredCourses(courseList.filter((c: any) => c.status === "Publish"));
        
        // Get unique categories from courses
        const cats = ["All", ...Array.from(new Set(courseList.map((c: any) => c.category)))];
        setCategories(cats as string[]);
      })
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  // Filter application
  useEffect(() => {
    let result = courses.filter((c: any) => c.status === "Publish");

    if (selectedCategory !== "All") {
      result = result.filter((c) => c.category === selectedCategory);
    }

    if (selectedDifficulty !== "All") {
      result = result.filter((c) => c.difficulty === selectedDifficulty);
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query) ||
          c.instructor.toLowerCase().includes(query)
      );
    }

    setFilteredCourses(result);
  }, [selectedCategory, selectedDifficulty, searchQuery, courses]);

  const openReservation = (courseId: string) => {
    setReserveCourseId(courseId);
    setIsModalOpen(true);
  };

  const difficultyLevels = ["All", "Beginner", "Intermediate", "Advanced"];

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center md:text-left py-10 space-y-3 border-b border-slate-200 mb-12">
          <div className="flex items-center justify-center md:justify-start gap-2 text-indigo-600 font-mono text-xs font-bold uppercase tracking-widest">
            <Compass className="w-4 h-4 text-amber-500" />
            Course Catalog
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Unlock Elite Tech Programs
          </h1>
          <p className="text-slate-600 text-sm md:text-base max-w-3xl leading-relaxed">
            Acquire actual industry-ready skills with hands-on labs and project files designed by top-tier technical architects. Lock in your seat today at pre-launch pricing.
          </p>
        </div>

        {/* Filters Grid */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm mb-10 flex flex-col lg:flex-row gap-6 justify-between items-stretch lg:items-center">
          
          {/* Search bar */}
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses, skills, or instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-slate-50/50"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            
            {/* Category selection */}
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
              >
                {/* Standard LMS Categories */}
                <option value="All">All Categories</option>
                <option value="Full Stack">Full Stack</option>
                <option value="AI & ML">AI & ML</option>
                <option value="Programming">Programming</option>
                <option value="Cloud">Cloud</option>
                <option value="Data Science">Data Science</option>
                <option value="Career">Career & Placement</option>
                <option value="Cyber Security">Cyber Security</option>
              </select>
            </div>

            {/* Difficulty selection */}
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
              >
                {difficultyLevels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl === "All" ? "All Difficulties" : lvl}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters Button */}
            {(selectedCategory !== "All" || selectedDifficulty !== "All" || searchQuery !== "") && (
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedDifficulty("All");
                  setSearchQuery("");
                }}
                className="mt-4 px-3 py-2 text-xs font-mono font-bold text-rose-500 hover:text-rose-600 bg-rose-50 rounded-lg border border-rose-100 transition-colors"
              >
                Clear All
              </button>
            )}

          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-8 text-xs font-mono text-slate-500">
          <div>
            Showing <strong className="text-slate-800">{filteredCourses.length}</strong> available programs
          </div>
          <div>
            Filter State: <span className="text-amber-600 font-bold">{selectedCategory}</span> &bull; <span className="text-indigo-600 font-bold">{selectedDifficulty}</span>
          </div>
        </div>

        {/* Course Cards Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div 
                key={course.id} 
                className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col group"
              >
                {/* Thumbnail */}
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

                {/* Card Body */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  
                  {/* Info Header */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                        <span className="text-xs font-bold text-slate-800 font-mono">{course.rating}</span>
                        <span className="text-[10px] text-slate-400">({course.studentsCount} Students)</span>
                      </div>
                      <span className="text-[10px] font-bold font-mono text-slate-400">
                        {course.difficulty}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {course.title}
                    </h3>
                    
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Skills Tag Cloud */}
                  <div className="flex flex-wrap gap-1.5 pt-3 pb-4">
                    {course.skillsLearned?.slice(0, 3).map((skill: string, idx: number) => (
                      <span 
                        key={idx} 
                        className="bg-slate-100 text-slate-700 text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Meta details footer */}
                  <div className="pt-4 border-t border-slate-100 space-y-4">
                    
                    {/* Instructor & Hours */}
                    <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                      <div className="truncate max-w-[150px]">👤 {course.instructor}</div>
                      <div>⏱ {course.duration}</div>
                    </div>

                    {/* Price visualizer */}
                    <div className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-mono">Regular Price</span>
                        <span className="text-slate-400 line-through text-xs font-mono">₹{course.regularPrice}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-amber-600 block font-mono font-bold">Early Bird Price</span>
                        <span className="text-base font-extrabold text-slate-900 font-mono">₹{course.earlyBirdPrice}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/lms/course/${course.id}`}
                        className="w-1/2 text-center py-2.5 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs transition-all active:scale-95"
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
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border rounded-3xl p-16 text-center space-y-4 max-w-xl mx-auto shadow-sm">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto">
              <SlidersHorizontal className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No Courses Match Your Filter</h3>
            <p className="text-xs text-slate-500 font-sans leading-relaxed">
              We couldn't find any courses matching your search or filters. Try choosing a different category or resetting your filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedDifficulty("All");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 bg-slate-900 text-white font-bold rounded-xl text-xs uppercase tracking-wider active:scale-95 transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Reservation Modal Integration */}
      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialCourseId={reserveCourseId}
      />
    </div>
  );
}
