import express from "express";
import "dotenv/config";
import path from "path";
import fs from "fs";
import cors from "cors";
import { fileURLToPath } from "url";
import { saveToDatabase } from "./src/lib/database";
import { getCourses, saveCourses, getReservations, saveReservation, updateReservationStatus } from "./src/lib/lmsStore";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();
const PORT = 3000;

// Standard Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Router
const apiRouter = express.Router();

// Health Check
apiRouter.get("/health", (req, res) => {
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
    hasSupabase: !!(process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL)
  });
});

// API: Save Contact Form
apiRouter.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const date = new Date().toISOString();
    const result = await saveToDatabase({ 
      Date: date, 
      Source: 'Contact Form', 
      Name: name || 'Anonymous', 
      Email: email, 
      Message: message || '' 
    });
    
    if (!result.success) {
      console.error("Local sync failed:", result.error);
      return res.status(500).json({ 
        success: false, 
        sync: false,
        error: result.error 
      });
    }

    res.json({ 
      success: true, 
      sync: true
    });
  } catch (error: any) {
    console.error("Critical error in /api/contact:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
});

// API: Internship Application
apiRouter.post("/internship-apply", async (req, res) => {
  try {
    const data = req.body;
    if (!data.email) return res.status(400).json({ error: "Email is required" });

    const date = new Date().toISOString();
    
    console.log("Processing internship application for:", data.email);
    
    // Attempt saving to database or fallback gracefully
    const dbPayload = {
      Date: date, 
      Source: 'Internship Application', 
      Name: data.fullName || 'Anonymous', 
      Email: data.email, 
      Phone: data.phone || '',
      WhatsApp: data.phone || '',
      College: data.college || '', 
      Degree: data.degree || '', 
      Year: data.yearOfStudy || data.year || '', 
      Domain: data.course || data.domain || '',
      Skills: `${data.internshipType || ''} | ${data.branch || ''} | ${data.city || ''}`, 
      Reason: data.reason || '',
      ReferralCode: 'BATCH-2'
    };

    let result: { success: boolean; error?: any } = { success: true, error: null };
    try {
      result = await saveToDatabase(dbPayload);
    } catch (err: any) {
      console.warn("Database operation warning (falling back to success response):", err.message);
    }

    res.json({ 
      success: true, 
      sync: result.success,
      message: "Application received successfully!"
    });
  } catch (error: any) {
    console.error("Critical error in /api/internship-apply:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
});

// API: Export CSV (Only local)
apiRouter.get("/export", (req, res) => {
  const CSV_FILE = path.join(process.cwd(), 'leads.csv');
  if (fs.existsSync(CSV_FILE)) {
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
    res.sendFile(CSV_FILE);
  } else {
    res.status(404).send("No leads found yet.");
  }
});

// ==========================================
// LEARNING MANAGEMENT SYSTEM (LMS) ENDPOINTS
// ==========================================

// LMS API: Get all courses
apiRouter.get("/lms/courses", async (req, res) => {
  try {
    const courses = await getCourses();
    res.json({ success: true, courses });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// LMS API: Create course (Admin)
apiRouter.post("/lms/courses", async (req, res) => {
  try {
    const courses = await getCourses();
    const newCourse = req.body;
    courses.push(newCourse);
    await saveCourses(courses);
    res.json({ success: true, course: newCourse });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// LMS API: Update course (Admin)
apiRouter.put("/lms/courses/:id", async (req, res) => {
  try {
    const courses = await getCourses();
    const index = courses.findIndex(c => c.id === req.params.id);
    if (index === -1) return res.status(404).json({ success: false, error: "Course not found" });
    
    courses[index] = { ...courses[index], ...req.body };
    await saveCourses(courses);
    res.json({ success: true, course: courses[index] });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// LMS API: Delete course (Admin)
apiRouter.delete("/lms/courses/:id", async (req, res) => {
  try {
    const courses = await getCourses();
    const filtered = courses.filter(c => c.id !== req.params.id);
    await saveCourses(filtered);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// LMS API: Create Reservation (Students)
apiRouter.post("/lms/reserve", async (req, res) => {
  try {
    const data = req.body;
    if (!data.email || !data.courseId) {
      return res.status(400).json({ success: false, error: "Email and Course Selected are required" });
    }
    const result = await saveReservation(data);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// LMS API: Get all reservations (Admin)
apiRouter.get("/lms/reservations", async (req, res) => {
  try {
    const reservations = await getReservations();
    res.json({ success: true, reservations });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// LMS API: Update Reservation Status (Admin)
apiRouter.put("/lms/reservations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const success = await updateReservationStatus(id, req.body);
    if (success) {
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, error: "Reservation not found" });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// LMS API: Simple Authentication
apiRouter.post("/lms/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ success: false, error: "Email is required" });

    // Admin login check
    if (email.toLowerCase() === "admin@indiwebpros.in" && password === "admin123") {
      return res.json({
        success: true,
        user: {
          email,
          name: "IndiWebPros Admin",
          role: "admin"
        }
      });
    }

    // Student login check - see if they have any reservation
    const reservations = await getReservations();
    const studentRes = reservations.find(r => r.email.toLowerCase() === email.toLowerCase());

    if (studentRes) {
      return res.json({
        success: true,
        user: {
          email: studentRes.email,
          name: studentRes.name,
          role: "student",
          college: studentRes.college,
          discord: studentRes.discord,
          reservations: reservations.filter(r => r.email.toLowerCase() === email.toLowerCase())
        }
      });
    }

    // Default student check for student@indiwebpros.in (for testing before reservation)
    if (email.toLowerCase() === "student@indiwebpros.in" && password === "student123") {
      return res.json({
        success: true,
        user: {
          email,
          name: "Sandeep Gupta",
          role: "student",
          college: "IIT Madras",
          discord: "sandeep_g#1234",
          reservations: [
            {
              id: "res_demo",
              name: "Sandeep Gupta",
              email: "student@indiwebpros.in",
              phone: "+91 9876543210",
              college: "IIT Madras",
              discord: "sandeep_g#1234",
              year: "3rd Year",
              courseId: "mern-stack-mastery",
              courseTitle: "Full Stack Web Development (MERN & Cloud)",
              plan: "intermediate",
              status: "Enrolled",
              paymentStatus: "Paid",
              createdDate: new Date().toISOString()
            }
          ]
        }
      });
    }

    res.status(401).json({ success: false, error: "Invalid credentials or email not registered" });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// LMS API: Export reservations as CSV
apiRouter.get("/lms/export-reservations", async (req, res) => {
  try {
    const reservations = await getReservations();
    let csv = "ID,Name,Email,Phone,College,Discord,Course,Plan,Status,Payment Status,Created Date\n";
    reservations.forEach(r => {
      csv += `"${r.id}","${r.name}","${r.email}","${r.phone}","${r.college}","${r.discord}","${r.courseTitle}","${r.plan}","${r.status}","${r.paymentStatus}","${r.createdDate}"\n`;
    });
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=lms_reservations.csv");
    res.send(csv);
  } catch (err: any) {
    res.status(500).send("Error exporting CSV: " + err.message);
  }
});

// Mount API router
app.use("/api", apiRouter);

// Global Error Handler for API
app.use((err: any, req: any, res: any, next: any) => {
  console.error("Global Error:", err);
  res.status(500).json({ error: "Critical Server Error", message: err.message });
});

// For local/non-serverless environments
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server starting on port ${PORT}...`);
    console.log(`Current Working Directory: ${process.cwd()}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    
    const envKeys = Object.keys(process.env);
    const supabaseKeys = envKeys.filter(k => k.includes('SUPABASE'));
    console.log(`Available Supabase-related Env Vars: ${supabaseKeys.join(', ') || 'NONE'}`);
    
    if (process.env.SUPABASE_URL) console.log('SUPABASE_URL is set in process.env');
    if (process.env.SUPABASE_ANON_KEY) console.log('SUPABASE_ANON_KEY is set in process.env');
  });
}

startServer();
