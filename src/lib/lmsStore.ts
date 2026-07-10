import { getSupabase } from "./supabase.ts";

// Define Course Interface
export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  pdfUrl?: string;
  sourceCodeUrl?: string;
  isCompleted?: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option
}

export interface CourseQuiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  instructor: string;
  instructorBio?: string;
  duration: string;
  rating: number;
  studentsCount: number;
  thumbnail: string;
  earlyBirdPrice: number;
  regularPrice: number;
  skillsLearned: string[];
  requirements: string[];
  projectsIncluded: string[];
  status: "Publish" | "Draft";
  modules: CourseModule[];
  quizzes?: CourseQuiz[];
}

// Define Reservation Interface
export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  discord: string;
  year: string;
  courseId: string;
  courseTitle: string;
  plan: "basic" | "intermediate" | "professional";
  status: "Interested" | "Contacted" | "Payment Pending" | "Paid" | "Enrolled" | "Completed" | "Certified";
  paymentStatus: "Pending" | "Paid" | "Refunded" | "N/A";
  createdDate: string;
  referralCode?: string;
  message?: string;
}

// Initial Mock Courses for seeding
const INITIAL_COURSES: Course[] = [
  {
    id: "mern-stack-mastery",
    title: "Full Stack Web Development (MERN & Cloud)",
    description: "Master modern web engineering. Build production-ready SaaS platforms with React, Node.js, PostgreSQL, Docker, and AWS.",
    longDescription: "Learn from scratch how to design, write, deploy, and scale enterprise-grade web applications. This course bridges the gap between simple client-only apps and complex, distributed systems with secure JWT authentication, real-time database sync, background workers, and containerized deployments.",
    category: "Full Stack",
    difficulty: "Intermediate",
    instructor: "Murali Krishna, Principal Architect",
    instructorBio: "Former Senior Software Engineer at top tech firms, specializing in high-load cloud architectures and responsive user interfaces.",
    duration: "12 Weeks",
    rating: 4.9,
    studentsCount: 1420,
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    earlyBirdPrice: 249,
    regularPrice: 499,
    skillsLearned: [
      "React 19 & TypeScript",
      "Tailwind CSS Layouts",
      "Node.js & Express REST APIs",
      "SQL with PostgreSQL & Supabase",
      "Docker Containerization",
      "AWS Deployments (EC2 & S3)"
    ],
    requirements: [
      "Basic understanding of HTML, CSS, and fundamental JavaScript variables.",
      "A computer with at least 8GB RAM and an internet connection."
    ],
    projectsIncluded: [
      "Project 1: Real-time Multi-user Task Board (Intermediate)",
      "Project 2: Complete Clinic SaaS Portal with Prescription Engine (Professional Capstone)"
    ],
    status: "Publish",
    modules: [
      {
        id: "m1",
        title: "Module 1: Advanced Frontend Engineering",
        lessons: [
          { id: "l1", title: "React 19 State Architecture & Custom Hooks", duration: "18 mins", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", pdfUrl: "https://pdfobject.com/pdf/sample.pdf", sourceCodeUrl: "https://github.com" },
          { id: "l2", title: "TypeScript Integration and Type Safety", duration: "24 mins", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", pdfUrl: "https://pdfobject.com/pdf/sample.pdf" },
          { id: "l3", title: "Fluid Layouts with Tailwind CSS & Framer Motion", duration: "20 mins", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", pdfUrl: "https://pdfobject.com/pdf/sample.pdf" }
        ]
      },
      {
        id: "m2",
        title: "Module 2: Enterprise Backend & REST APIs",
        lessons: [
          { id: "l4", title: "Express.js Architecture & Global Middlewares", duration: "22 mins", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { id: "l5", title: "PostgreSQL Schema Design and Database Queries", duration: "30 mins", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { id: "l6", title: "JWT-based Secure Role Authentication", duration: "25 mins", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
        ]
      },
      {
        id: "m3",
        title: "Module 3: DevOps, Containers & Deployment",
        lessons: [
          { id: "l7", title: "Dockerizing Full Stack Node-React Services", duration: "15 mins", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { id: "l8", title: "Automated Deployments to Cloud Run and AWS EC2", duration: "28 mins", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
        ]
      }
    ],
    quizzes: [
      {
        id: "q1",
        title: "Full Stack Basics Quiz",
        questions: [
          { id: "q1_1", question: "Which hook is used to perform side effects in React?", options: ["useState", "useEffect", "useMemo", "useContext"], correctAnswer: 1 },
          { id: "q1_2", question: "What does JWT stand for?", options: ["Java Web Token", "JSON Web Token", "Joint Web Technology", "Just Web Transfer"], correctAnswer: 1 },
          { id: "q1_3", question: "Which command builds a docker image from a Dockerfile?", options: ["docker run", "docker create", "docker build", "docker push"], correctAnswer: 2 }
        ]
      }
    ]
  },
  {
    id: "applied-ai-ml",
    title: "Applied AI & Large Language Models (LLMs)",
    description: "Learn to deploy real-world machine learning models. Master RAG pipelines, fine-tuning, and prompt engineering using the Gemini API.",
    longDescription: "Machine learning is changing how applications operate. In this course, we skip the raw mathematical proofs and focus 100% on software application development with AI models. You will learn how to set up LLM API gateways, leverage RAG (Retrieval-Augmented Generation) with vector databases, fine-tune models, and integrate prompt logging.",
    category: "AI & ML",
    difficulty: "Advanced",
    instructor: "Dr. Anand Kumar, AI Researcher",
    instructorBio: "Ph.D. in Computer Vision with over 10 years of research and application development experience in machine learning.",
    duration: "10 Weeks",
    rating: 4.8,
    studentsCount: 980,
    thumbnail: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80",
    earlyBirdPrice: 299,
    regularPrice: 599,
    skillsLearned: [
      "Gemini API & OpenAI SDKs",
      "Retrieval-Augmented Generation (RAG)",
      "Vector Databases (Pinecone/PGVector)",
      "Fine-Tuning Techniques",
      "Python AI Agent Frameworks"
    ],
    requirements: [
      "Solid intermediate programming knowledge in Python or JavaScript.",
      "Basic understanding of JSON files and API structures."
    ],
    projectsIncluded: [
      "Project 1: RAG Customer Support Agent (Intermediate)",
      "Project 2: Self-improving Prompt Optimizer (Professional Capstone)"
    ],
    status: "Publish",
    modules: [
      {
        id: "aim1",
        title: "Module 1: Introduction to LLM Integration",
        lessons: [
          { id: "ail1", title: "The Gemini API & GoogleGenAI SDK Essentials", duration: "15 mins", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { id: "ail2", title: "Structuring Prompts & JSON Structured Outputs", duration: "21 mins", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
        ]
      },
      {
        id: "aim2",
        title: "Module 2: RAG & Vector Searching",
        lessons: [
          { id: "ail3", title: "Generating Vector Embeddings and Indexing", duration: "25 mins", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { id: "ail4", title: "Semantic Retrieval using PGVector Database", duration: "32 mins", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
        ]
      }
    ],
    quizzes: [
      {
        id: "ai_q1",
        title: "AI & RAG Concepts Quiz",
        questions: [
          { id: "ai_q1_1", question: "What does RAG stand for in AI?", options: ["Random Access Generation", "Retrieval-Augmented Generation", "Recursive Agent Graph", "Rating Action Group"], correctAnswer: 1 },
          { id: "ai_q1_2", question: "Which database feature is critical for semantic search?", options: ["B-Tree Indexes", "Vector Embeddings", "Foreign Keys", "Transaction Logs"], correctAnswer: 1 }
        ]
      }
    ]
  },
  {
    id: "programming-go-ts",
    title: "High-Performance Programming (TypeScript & Go)",
    description: "Master modern concurrency, design patterns, and clean architecture with TypeScript on the web, and Go on the backend.",
    longDescription: "Designed for developers looking to move from junior scriptwriters to elite backend engineers. Learn Go's concurrency model (goroutines, channels) paired with TypeScript's powerful type safety features. You will master architectural styles like Domain Driven Design, CQRS, and Event-Driven development.",
    category: "Programming",
    difficulty: "Advanced",
    instructor: "Sandeep Varma, Principal Architect",
    instructorBio: "Leads engineering teams at global logistics SaaS. Go contributor and TS enthusiast.",
    duration: "8 Weeks",
    rating: 4.7,
    studentsCount: 720,
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    earlyBirdPrice: 199,
    regularPrice: 399,
    skillsLearned: [
      "Go Concurrency (Goroutines & Channels)",
      "Clean Code & DDD in TypeScript",
      "gRPC & WebSockets",
      "High Performance SQL Query Tuning"
    ],
    requirements: [
      "Familiarity with loops, basic functions, and any programming language syntax."
    ],
    projectsIncluded: [
      "Project 1: Multi-threaded In-Memory Task Scheduler (Go)",
      "Project 2: Real-time Collaboration Engine with WebSockets (TS & Go)"
    ],
    status: "Publish",
    modules: [
      {
        id: "pm1",
        title: "Module 1: Concurrency and Performance in Go",
        lessons: [
          { id: "pl1", title: "Goroutines, Channels and Mutex Synchronization", duration: "25 mins", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { id: "pl2", title: "Building High-Throughput REST Servers in Go", duration: "18 mins", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
        ]
      }
    ],
    quizzes: [
      {
        id: "prog_q1",
        title: "Concurrency Basics",
        questions: [
          { id: "pq1_1", question: "How do you start a goroutine in Go?", options: ["go start()", "run start()", "thread start()", "go funcName()"], correctAnswer: 3 }
        ]
      }
    ]
  }
];

// Helper to seed courses if empty
export async function seedCoursesIfNeeded() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.from("courses").select("id");
    if (error) {
      console.warn("Could not check if courses are seeded:", error.message);
      return;
    }
    
    if (!data || data.length === 0) {
      console.log("Seeding initial courses into Supabase database...");
      for (const course of INITIAL_COURSES) {
        await supabase.from("courses").insert({
          id: course.id,
          title: course.title,
          description: course.description,
          long_description: course.longDescription,
          category: course.category,
          difficulty: course.difficulty,
          instructor: course.instructor,
          instructor_bio: course.instructorBio,
          duration: course.duration,
          rating: course.rating,
          students_count: course.studentsCount,
          thumbnail: course.thumbnail,
          early_bird_price: course.earlyBirdPrice,
          regular_price: course.regularPrice,
          skills_learned: course.skillsLearned,
          requirements: course.requirements,
          projects_included: course.projectsIncluded,
          status: course.status,
          modules: course.modules,
          quizzes: course.quizzes,
        });
      }
      console.log("Courses seeded to Supabase successfully!");
    }
  } catch (error) {
    console.error("Failed to seed courses to Supabase:", error);
  }
}

// Local storage helpers
function getLocalCourses(): Course[] {
  try {
    const val = localStorage.getItem("indiwebpros_courses");
    if (val) {
      return JSON.parse(val);
    }
  } catch (e) {
    console.error("Failed to parse local courses:", e);
  }
  // Initialize local storage if empty
  try {
    localStorage.setItem("indiwebpros_courses", JSON.stringify(INITIAL_COURSES));
  } catch (e) {}
  return INITIAL_COURSES;
}

function saveLocalCourses(courses: Course[]) {
  try {
    localStorage.setItem("indiwebpros_courses", JSON.stringify(courses));
  } catch (e) {
    console.error("Failed to save local courses:", e);
  }
}

function getLocalReservations(): Reservation[] {
  try {
    const val = localStorage.getItem("indiwebpros_reservations");
    if (val) {
      return JSON.parse(val);
    }
  } catch (e) {
    console.error("Failed to parse local reservations:", e);
  }
  return [];
}

function saveLocalReservations(reservations: Reservation[]) {
  try {
    localStorage.setItem("indiwebpros_reservations", JSON.stringify(reservations));
  } catch (e) {
    console.error("Failed to save local reservations:", e);
  }
}

// Fetch all courses from DB
export async function getCourses(): Promise<Course[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.from("courses").select("*");
    
    if (error) {
      console.warn("Database query failed in getCourses, falling back to local storage list:", error.message);
      return getLocalCourses();
    }

    if (!data || data.length === 0) {
      await seedCoursesIfNeeded();
      return getLocalCourses();
    }

    const courses = data.map((r: any) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      longDescription: r.long_description || undefined,
      category: r.category || "General",
      difficulty: (r.difficulty || "Beginner") as "Beginner" | "Intermediate" | "Advanced",
      instructor: r.instructor || "Instructor",
      instructorBio: r.instructor_bio || undefined,
      duration: r.duration || "Self-Paced",
      rating: r.rating || 5.0,
      studentsCount: r.students_count || 0,
      thumbnail: r.thumbnail || "",
      earlyBirdPrice: r.early_bird_price || 0,
      regularPrice: r.regular_price || 0,
      skillsLearned: r.skills_learned || [],
      requirements: r.requirements || [],
      projectsIncluded: r.projects_included || [],
      status: (r.status || "Publish") as "Publish" | "Draft",
      modules: (r.modules as any) || [],
      quizzes: (r.quizzes as any) || undefined,
    }));
    // Sync with local storage
    saveLocalCourses(courses);
    return courses;
  } catch (error) {
    console.warn("Supabase is missing or connection failed in getCourses, using local storage fallback:", error);
    return getLocalCourses();
  }
}

// Save courses (or update list)
export async function saveCourses(courses: Course[]): Promise<boolean> {
  // Always update local storage first
  saveLocalCourses(courses);
  try {
    const supabase = getSupabase();
    for (const course of courses) {
      const { error } = await supabase.from("courses").upsert({
        id: course.id,
        title: course.title,
        description: course.description,
        long_description: course.longDescription,
        category: course.category,
        difficulty: course.difficulty,
        instructor: course.instructor,
        instructor_bio: course.instructorBio,
        duration: course.duration,
        rating: course.rating,
        students_count: course.studentsCount,
        thumbnail: course.thumbnail,
        early_bird_price: course.earlyBirdPrice,
        regular_price: course.regularPrice,
        skills_learned: course.skillsLearned,
        requirements: course.requirements,
        projects_included: course.projectsIncluded,
        status: course.status,
        modules: course.modules,
        quizzes: course.quizzes,
      });
      if (error) throw error;
    }
    return true;
  } catch (error) {
    console.warn("Database upsert failed in saveCourses, using local storage only:", error);
    return true; // Return true because it succeeded in local storage
  }
}

// Delete a course
export async function deleteCourse(courseId: string): Promise<boolean> {
  // Update local storage
  const localCourses = getLocalCourses();
  const updated = localCourses.filter(c => c.id !== courseId);
  saveLocalCourses(updated);
  try {
    const supabase = getSupabase();
    const { error } = await supabase.from("courses").delete().eq("id", courseId);
    if (error) throw error;
    return true;
  } catch (error) {
    console.warn("Database delete failed in deleteCourse, using local storage only:", error);
    return true; // Return true because it succeeded in local storage
  }
}

// Get all reservations from DB
export async function getReservations(): Promise<Reservation[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.from("reservations").select("*");
    
    if (error) {
      console.warn("Database query failed in getReservations, falling back to local storage:", error.message);
      return getLocalReservations();
    }

    const reservations = (data || []).map((r: any) => ({
      id: r.id,
      name: r.name,
      email: r.email,
      phone: r.phone || "",
      college: r.college || "",
      discord: r.discord || "",
      year: r.year || "",
      courseId: r.course_id,
      courseTitle: r.course_title,
      plan: (r.plan || "basic") as "basic" | "intermediate" | "professional",
      status: (r.status || "Interested") as any,
      paymentStatus: (r.payment_status || "Pending") as any,
      createdDate: r.created_at || new Date().toISOString(),
      referralCode: r.referral_code || undefined,
      message: r.message || undefined,
    }));
    // Sync with local storage
    saveLocalReservations(reservations);
    return reservations;
  } catch (error) {
    console.warn("Supabase is missing or connection failed in getReservations, using local storage fallback:", error);
    return getLocalReservations();
  }
}

// Save reservation to DB
export async function saveReservation(reservation: Omit<Reservation, "id" | "createdDate">): Promise<{ success: boolean; data: Reservation }> {
  const id = "res_" + Math.random().toString(36).substring(2, 11);
  const newReservation: Reservation = {
    ...reservation,
    id,
    createdDate: new Date().toISOString(),
  };

  // Always save to local storage first
  const reservations = getLocalReservations();
  reservations.push(newReservation);
  saveLocalReservations(reservations);

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from("reservations").insert({
      id: newReservation.id,
      name: newReservation.name,
      email: newReservation.email,
      phone: newReservation.phone,
      college: newReservation.college,
      discord: newReservation.discord,
      year: newReservation.year,
      course_id: newReservation.courseId,
      course_title: newReservation.courseTitle,
      plan: newReservation.plan,
      status: newReservation.status,
      payment_status: newReservation.paymentStatus,
      referral_code: newReservation.referralCode,
      message: newReservation.message,
    });

    if (error) throw error;
  } catch (error) {
    console.warn("Database insert failed in saveReservation, saved to local storage only:", error);
  }

  return { success: true, data: newReservation };
}

// Update reservation status in DB
export async function updateReservationStatus(id: string, updates: Partial<Reservation>): Promise<boolean> {
  // Update local storage
  const reservations = getLocalReservations();
  const updated = reservations.map(r => {
    if (r.id === id) {
      return { ...r, ...updates };
    }
    return r;
  });
  saveLocalReservations(updated);

  try {
    const supabase = getSupabase();
    const payload: any = {};
    if (updates.name !== undefined) payload.name = updates.name;
    if (updates.email !== undefined) payload.email = updates.email;
    if (updates.phone !== undefined) payload.phone = updates.phone;
    if (updates.college !== undefined) payload.college = updates.college;
    if (updates.discord !== undefined) payload.discord = updates.discord;
    if (updates.year !== undefined) payload.year = updates.year;
    if (updates.status !== undefined) payload.status = updates.status;
    if (updates.paymentStatus !== undefined) payload.payment_status = updates.paymentStatus;
    if (updates.message !== undefined) payload.message = updates.message;

    const { error } = await supabase
      .from("reservations")
      .update(payload)
      .eq("id", id);
      
    if (error) throw error;
    return true;
  } catch (error) {
    console.warn("Database update failed in updateReservationStatus, updated local storage only:", error);
    return true; // Return true because it succeeded in local storage
  }
}
