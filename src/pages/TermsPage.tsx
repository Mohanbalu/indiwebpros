import React from "react";
import { Shield, Lock, FileText, ArrowLeft, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export function TermsPage() {
  const lastUpdated = "July 09, 2026";

  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <div className="w-full bg-slate-900 py-16 text-white border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_50%)]" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-xs font-mono font-bold uppercase tracking-widest mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-slate-400 text-sm font-mono">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Quick Info Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6 h-fit">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
              <h3 className="text-slate-900 font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-500" />
                Key Terms Summary
              </h3>
              <ul className="space-y-4 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                  <span>By accessing our platform, you agree to comply with all relevant local, state, and international laws.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                  <span>Project deliverables for students are intended strictly for educational, research, and learning purposes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                  <span>Any commercial source files we build are subject to specific licensing terms outlined in our service contract.</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800">
              <h3 className="font-bold text-sm uppercase tracking-wider mb-2">Legal Questions?</h3>
              <p className="text-xs text-indigo-200/80 mb-6 leading-relaxed">
                If you seek clarification on licensing, code ownership, or terms enforcement, please contact our support desk.
              </p>
              <div className="space-y-4 text-xs">
                <a href="mailto:admin@indiwebpros.in" className="flex items-center gap-3 text-white hover:text-indigo-300 transition-colors">
                  <Mail className="w-4 h-4 text-indigo-400" />
                  admin@indiwebpros.in
                </a>
                <div className="flex items-start gap-3 text-indigo-200">
                  <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span>Andhra Pradesh, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Document Content */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-8 md:p-12 shadow-sm prose prose-slate max-w-none">
            <p className="text-slate-600 leading-relaxed text-sm mb-8">
              Welcome to <strong>Indiwebpros</strong>. These terms and conditions outline the rules and regulations for the use of Indiwebpros's Website, located at <a href="https://indiwebpros.in" className="text-indigo-600 hover:underline">https://indiwebpros.in</a>. By accessing this website we assume you accept these terms and conditions. Do not continue to use Indiwebpros if you do not agree to take all of the terms and conditions stated on this page.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
              <span className="text-indigo-500 font-mono text-base">01.</span> Intellectual Property Rights
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm mb-4">
              Other than the content you own, under these Terms, Indiwebpros and/or its licensors own all the intellectual property rights and materials contained in this Website.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm mb-6">
              You are granted a limited license only for purposes of viewing the material contained on this Website, inquiring about services, or accessing purchased educational modules and guides.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
              <span className="text-indigo-500 font-mono text-base">02.</span> Restrictions
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm mb-4">
              You are specifically restricted from all of the following:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600 mb-6">
              <li>Publishing any Website material in any other media without prior written consent.</li>
              <li>Selling, sublicensing, and/or otherwise commercializing any Website material.</li>
              <li>Publicly performing and/or showing any Website material.</li>
              <li>Using this Website in any way that is or may be damaging to this Website.</li>
              <li>Using this Website in any way that impacts user access to this Website.</li>
              <li>Engaging in any data mining, data harvesting, data extracting, or any other similar activity.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
              <span className="text-indigo-500 font-mono text-base">03.</span> Student Project Services & Academic Integrity
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm mb-4">
              Indiwebpros provides consulting, architecture support, software code, and research assistance for student major and minor projects (B.Tech, MS, PhD).
            </p>
            <p className="text-slate-600 leading-relaxed text-sm mb-6">
              All codes, diagrams, synopses, and document drafts supplied by our agency are intended strictly as **academic aids, reference architectures, or educational guides**. Students are expected to understand, review, test, and adapt the materials to fulfill their university requirements and adhere to their respective institutions' Academic Integrity policies. Indiwebpros does not accept liability for misuse of these resources.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
              <span className="text-indigo-500 font-mono text-base">04.</span> Your Content
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm mb-6">
              In these Website Standard Terms and Conditions, "Your Content" shall mean any audio, video text, images, or other material you choose to display, submit, or transfer to us via this Website or other inquiry channels. By submitting Your Content, you grant Indiwebpros a non-exclusive, worldwide, irrevocable, sub-licensable license to use, reproduce, adapt, publish, translate, and distribute it for the sole purpose of rendering services to you.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
              <span className="text-indigo-500 font-mono text-base">05.</span> No Warranties
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm mb-6">
              This Website is provided "as is," with all faults, and Indiwebpros expresses no representations or warranties of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
              <span className="text-indigo-500 font-mono text-base">06.</span> Limitation of Liability
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm mb-6">
              In no event shall Indiwebpros, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. Indiwebpros, including its officers, directors, and employees, shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this Website or service deliverables.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
              <span className="text-indigo-500 font-mono text-base">07.</span> Governing Law & Jurisdiction
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm mb-6">
              These Terms will be governed by and interpreted in accordance with the laws of the State of Andhra Pradesh, India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in India for the resolution of any disputes.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
