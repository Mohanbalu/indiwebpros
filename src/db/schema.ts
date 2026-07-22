import { pgTable, serial, text, integer, real, jsonb, timestamp } from "drizzle-orm/pg-core";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  uid: text("uid").notNull().unique(), // Firebase Auth UID
  email: text("email").notNull(),
  name: text("name"),
  role: text("role").default("student"), // 'admin' | 'student'
  college: text("college"),
  discord: text("discord"),
  year: text("year"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Contacts / Leads table
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message"),
  source: text("source"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Internship Applications table
export const internshipApplications = pgTable("internship_applications", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  whatsapp: text("whatsapp"),
  college: text("college"),
  degree: text("degree"),
  year: text("year"),
  domain: text("domain"),
  skills: text("skills"),
  reason: text("reason"),
  referralCode: text("referral_code"),
  source: text("source"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Internship Batch 2 table
export const internshipbatch2 = pgTable("internshipbatch2", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  whatsapp: text("whatsapp"),
  college: text("college"),
  degree: text("degree"),
  year: text("year"),
  domain: text("domain"),
  skills: text("skills"),
  reason: text("reason"),
  referralCode: text("referral_code"),
  source: text("source"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Courses table
export const courses = pgTable("courses", {
  id: text("id").primaryKey(), // Course slug e.g. 'mern-stack-mastery'
  title: text("title").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  category: text("category"),
  difficulty: text("difficulty"),
  instructor: text("instructor"),
  instructorBio: text("instructor_bio"),
  duration: text("duration"),
  rating: real("rating"),
  studentsCount: integer("students_count"),
  thumbnail: text("thumbnail"),
  earlyBirdPrice: integer("early_bird_price"),
  regularPrice: integer("regular_price"),
  skillsLearned: text("skills_learned").array(),
  requirements: text("requirements").array(),
  projectsIncluded: text("projects_included").array(),
  status: text("status").default("Publish"), // 'Publish' | 'Draft'
  modules: jsonb("modules"), // Array of CourseModule
  quizzes: jsonb("quizzes"), // Array of CourseQuiz
  createdAt: timestamp("created_at").defaultNow(),
});

// Reservations table
export const reservations = pgTable("reservations", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  college: text("college"),
  discord: text("discord"),
  year: text("year"),
  courseId: text("course_id").notNull(),
  courseTitle: text("course_title").notNull(),
  plan: text("plan"), // 'basic' | 'intermediate' | 'professional'
  status: text("status").default("Interested"), // 'Interested', 'Contacted', 'Paid', 'Enrolled', etc.
  paymentStatus: text("payment_status").default("Pending"), // 'Pending', 'Paid', 'Refunded', 'N/A'
  referralCode: text("referral_code"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});
