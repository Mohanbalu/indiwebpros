import React from "react";
import { Shield, Eye, Lock, FileText, ArrowLeft, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export function PrivacyPage() {
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
            Privacy Policy
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
                <Shield className="w-4 h-4 text-indigo-500" />
                Privacy Commitments
              </h3>
              <ul className="space-y-4 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                  <span>We do not sell your personal data to third parties.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                  <span>Standard encryption is used for all communications and transactions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                  <span>You maintain full rights to access, update, or request deletion of your information.</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800">
              <h3 className="font-bold text-sm uppercase tracking-wider mb-2">Have Questions?</h3>
              <p className="text-xs text-indigo-200/80 mb-6 leading-relaxed">
                If you have any questions or concerns regarding this policy, please reach out directly to our privacy officer.
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
              At <strong>Indiwebpros</strong>, accessible from <a href="https://indiwebpros.in" className="text-indigo-600 hover:underline">https://indiwebpros.in</a>, one of our main priorities is the privacy of our visitors and customers. This Privacy Policy document contains types of information that is collected and recorded by Indiwebpros and how we use it.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
              <span className="text-indigo-500 font-mono text-base">01.</span> Information We Collect
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm mb-4">
              We collect information that is necessary to provide you with our specialized web development services, major and minor student projects guidance, and AI/ML solutions:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600 mb-6">
              <li><strong>Contact details:</strong> Name, email address, phone number, and mailing address when you contact us or request a project quotation.</li>
              <li><strong>Academic Details:</strong> Degree level, college/university name, and branch/discipline (for student major or minor project consulting).</li>
              <li><strong>Project Requirements:</strong> Technical guidelines, project specifications, source files, and documents you share with us.</li>
              <li><strong>Log Files & Analytics:</strong> IP address, browser type, ISP, referring/exit pages, date/time stamps, and click statistics.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
              <span className="text-indigo-500 font-mono text-base">02.</span> How We Use Your Information
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm mb-4">
              We use the collected information to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600 mb-6">
              <li>Deliver, operate, and maintain our digital services and academic consultation.</li>
              <li>Improve, personalize, and expand our project offerings and website experience.</li>
              <li>Understand and analyze how visitors navigate and utilize our platform.</li>
              <li>Communicate directly with you regarding project updates, system operations, and support queries.</li>
              <li>Send newsletters, marketing offers, or internship notices (if you have opted-in).</li>
              <li>Prevent fraudulent activities, spam, and cyber threats.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
              <span className="text-indigo-500 font-mono text-base">03.</span> Cookies and Tracking
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm mb-6">
              Like any other website, Indiwebpros uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
              <span className="text-indigo-500 font-mono text-base">04.</span> Data Security & Retention
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm mb-6">
              We employ standard technical and organizational measures to safeguard your personal data. Your academic project materials, source codes, and communications are securely hosted and only accessible to authorized engineers. We retain your personal data only for as long as necessary to fulfill our business commitments or comply with legal requirements.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
              <span className="text-indigo-500 font-mono text-base">05.</span> GDPR & CCPA Data Protection Rights
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm mb-4">
              We want to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600 mb-6">
              <li><strong>The right to access:</strong> You have the right to request copies of your personal data.</li>
              <li><strong>The right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate.</li>
              <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data, under certain conditions.</li>
              <li><strong>The right to restrict processing:</strong> You have the right to request that we restrict the processing of your personal data.</li>
              <li><strong>The right to object:</strong> You have the right to object to our processing of your personal data.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
              <span className="text-indigo-500 font-mono text-base">06.</span> Consent
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm mb-6">
              By using our website, you hereby consent to our Privacy Policy and agree to its terms.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
