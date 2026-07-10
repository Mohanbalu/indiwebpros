/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { InternshipPage } from "./pages/InternshipPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";
import ScrollToTop from "./components/ScrollToTop";

// LMS Pages
import { LmsLandingPage } from "./pages/LmsLandingPage";
import { LmsCoursesPage } from "./pages/LmsCoursesPage";
import { LmsCourseDetailsPage } from "./pages/LmsCourseDetailsPage";
import { LmsStudentDashboard } from "./pages/LmsStudentDashboard";
import { LmsCoursePlayer } from "./pages/LmsCoursePlayer";
import { LmsAdminDashboard } from "./pages/LmsAdminDashboard";

function MainAppLayout() {
  const location = useLocation();
  const isPlayer = location.pathname.startsWith("/lms/player");
  const isAdmin = location.pathname.startsWith("/lms/admin");

  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100 flex flex-col justify-between">
      <ScrollToTop />
      {!isPlayer && !isAdmin && <Navbar />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/internship" element={<InternshipPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          
          {/* LMS Routes */}
          <Route path="/lms" element={<LmsLandingPage />} />
          <Route path="/lms/courses" element={<LmsCoursesPage />} />
          <Route path="/lms/course/:id" element={<LmsCourseDetailsPage />} />
          <Route path="/lms/dashboard" element={<LmsStudentDashboard />} />
          <Route path="/lms/player/:courseId" element={<LmsCoursePlayer />} />
          <Route path="/lms/admin" element={<LmsAdminDashboard />} />
        </Routes>
      </main>

      {!isPlayer && !isAdmin && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <MainAppLayout />
    </Router>
  );
}

