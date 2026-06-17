import React, { useState } from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";
import { 
  Check, 
  Sparkles, 
  Chrome, 
  Smartphone, 
  TrendingUp, 
  Cpu, 
  Workflow, 
  GraduationCap, 
  ArrowRight,
  HelpCircle
} from "lucide-react";

export function PricingSection() {
  const categories = [
    { id: "web", name: "Website Dev", icon: Chrome, color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
    { id: "mobile", name: "Mobile Apps", icon: Smartphone, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    { id: "marketing", name: "Marketing", icon: TrendingUp, color: "text-sky-600 bg-sky-50 border-sky-100" },
    { id: "automation", name: "Automation", icon: Workflow, color: "text-amber-600 bg-amber-50 border-amber-100" },
    { id: "ai", name: "AI Solutions", icon: Cpu, color: "text-purple-600 bg-purple-50 border-purple-100" },
    { id: "student", name: "Student Projects", icon: GraduationCap, color: "text-slate-600 bg-slate-50 border-slate-100" },
  ];

  const [activeTab, setActiveTab] = useState("web");

  return (
    <div id="pricing" className="flex flex-col overflow-hidden bg-white selection:bg-indigo-100 py-12">
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 bg-indigo-50 border border-indigo-100 rounded-full">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-600 uppercase">Transparent Pricing Plan</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-extrabold text-slate-900 leading-[1.05] tracking-tight">
              Invest in Scalable <br />
              <span className="text-indigo-600 font-display">Technology Assets</span>
            </h1>
          </div>
        }
      >
        <div className="h-full w-full bg-slate-50/50 p-4 md:p-8 flex flex-col rounded-[32px] overflow-hidden">
          {/* Categories Tab Selector */}
          <div className="flex gap-2 items-center overflow-x-auto min-h-[48px] pb-3 mb-6 no-scrollbar border-b border-slate-200/50">
            {categories.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-102" 
                      : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-indigo-400" : "text-slate-500"}`} />
                  {tab.name}
                </button>
              );
            })}
          </div>

          {/* Active Tab Content Area containing pricing tiers */}
          <div className="flex-1 overflow-y-auto pr-0 md:pr-1 no-scrollbar pb-8">
            {/* WEBSITE TAB */}
            {activeTab === "web" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4">
                {/* Tier 1 */}
                <div className="flex flex-col p-6 rounded-2xl border border-slate-200 bg-white hover:border-indigo-100 hover:shadow-lg transition-all duration-300">
                  <div className="text-[9px] font-mono font-extrabold text-indigo-600 uppercase tracking-widest mb-3 bg-indigo-50/55 px-2 py-1 rounded w-fit">
                    Landing Page
                  </div>
                  <div className="mb-4">
                    <span className="text-2xl font-black text-slate-900">₹7,000+</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Best For:</div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {["Small Businesses", "Personal Brands", "Local Businesses", "Campaign Pages"].map((bf) => (
                      <span key={bf} className="text-[9px] px-1.5 py-0.5 bg-slate-100 rounded text-slate-600 font-medium">{bf}</span>
                    ))}
                  </div>
                  <div className="border-t border-slate-100 my-3" />
                  <div className="space-y-2 flex-grow text-xs text-slate-600 font-light">
                    {["Modern Responsive Design", "Contact Forms", "WhatsApp Integration", "SEO Ready Structure", "Fast Loading", "Professional UI/UX"].map((feat) => (
                      <div key={feat} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="mt-6 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all">Start Project</button>
                </div>

                {/* Tier 2 */}
                <div className="flex flex-col p-6 rounded-2xl border-2 border-indigo-500 bg-white shadow-md shadow-indigo-500/5 hover:shadow-lg relative transition-all duration-300">
                  <div className="absolute -top-3 right-4 px-2.5 py-0.5 bg-indigo-600 text-white text-[8px] font-mono font-bold uppercase tracking-wider rounded-full shadow-xs">
                    Popular
                  </div>
                  <div className="text-[9px] font-mono font-extrabold text-indigo-650 uppercase tracking-widest mb-3 bg-indigo-50 px-2 py-1 rounded w-fit">
                    Business Website
                  </div>
                  <div className="mb-4">
                    <span className="text-2xl font-black text-slate-900">₹25,000+</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Best For:</div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {["Startups", "Clinics", "Educational", "Growing Businesses"].map((bf) => (
                      <span key={bf} className="text-[9px] px-1.5 py-0.5 bg-slate-150 rounded text-indigo-950 font-medium">{bf}</span>
                    ))}
                  </div>
                  <div className="text-[9px] font-bold text-indigo-600 mb-2">⚡ Suitable for: Up to 100 Active Users</div>
                  <div className="border-t border-slate-100 my-3" />
                  <div className="space-y-2 flex-grow text-xs text-slate-600 font-light">
                    {["Multi Page Website", "Admin Panel", "Lead Generation Forms", "SEO Optimization", "Analytics Setup", "User Management"].map((feat) => (
                      <div key={feat} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-indigo-550 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="mt-6 w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all">Start Project</button>
                </div>

                {/* Tier 3 */}
                <div className="flex flex-col p-6 rounded-2xl border border-slate-200 bg-white hover:border-indigo-100 hover:shadow-lg transition-all duration-300">
                  <div className="text-[9px] font-mono font-extrabold text-indigo-605 uppercase tracking-widest mb-3 bg-indigo-50/55 px-2 py-1 rounded w-fit">
                    Web Application
                  </div>
                  <div className="mb-4">
                    <span className="text-2xl font-black text-slate-900">₹50,000+</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Best For:</div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {["SaaS Products", "Startups", "Online Platforms"].map((bf) => (
                      <span key={bf} className="text-[9px] px-1.5 py-0.5 bg-slate-100 rounded text-slate-600 font-medium">{bf}</span>
                    ))}
                  </div>
                  <div className="text-[9px] font-bold text-indigo-600 mb-2">👥 Suitable for: 100 – 500+ Users</div>
                  <div className="border-t border-slate-100 my-3" />
                  <div className="space-y-2 flex-grow text-xs text-slate-600 font-light">
                    {["Authentication", "Database", "Admin Dashboard", "APIs", "Cloud Deployment"].map((feat) => (
                      <div key={feat} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="mt-6 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all">Start Project</button>
                </div>

                {/* Tier 4 */}
                <div className="flex flex-col p-6 rounded-2xl border border-slate-200 bg-white hover:border-indigo-100 hover:shadow-lg transition-all duration-300">
                  <div className="text-[9px] font-mono font-extrabold text-indigo-605 uppercase tracking-widest mb-3 bg-indigo-50/55 px-2 py-1 rounded w-fit">
                    Enterprise Solution
                  </div>
                  <div className="mb-4">
                    <span className="text-2xl font-black text-slate-900">₹1,00,000+</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Best For:</div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {["Large Scale Apps", "Custom Platforms", "Business Systems"].map((bf) => (
                      <span key={bf} className="text-[9px] px-1.5 py-0.5 bg-slate-100 rounded text-slate-600 font-medium">{bf}</span>
                    ))}
                  </div>
                  <div className="text-[9px] font-bold text-indigo-605 mb-2">📈 Suitable for: 1000+ Users</div>
                  <div className="border-t border-slate-100 my-3" />
                  <div className="space-y-2 flex-grow text-xs text-slate-600 font-light">
                    {["Advanced Architecture", "High Scalability", "Performance Tuning", "Security Features", "Dedicated Support"].map((feat) => (
                      <div key={feat} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="mt-6 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all">Start Project</button>
                </div>
              </div>
            )}

            {/* MOBILE APP TAB */}
            {activeTab === "mobile" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Tier 1 */}
                <div className="flex flex-col p-8 rounded-2xl border border-slate-200 bg-white hover:border-emerald-100 hover:shadow-lg transition-all duration-300">
                  <div className="text-[9px] font-mono font-extrabold text-emerald-600 uppercase tracking-widest mb-3 bg-emerald-50 px-2.5 py-1 rounded w-fit">
                    Basic App
                  </div>
                  <div className="mb-4">
                    <span className="text-3xl font-black text-slate-900">₹25,000+</span>
                  </div>
                  <div className="border-t border-slate-100 my-4" />
                  <div className="space-y-3 flex-grow text-xs text-slate-600 font-light">
                    {["Android App", "Modern UI", "Basic Features", "Play Store Ready"].map((feat) => (
                      <div key={feat} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="mt-8 w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all">Start Project</button>
                </div>

                {/* Tier 2 */}
                <div className="flex flex-col p-8 rounded-2xl border-2 border-emerald-500 bg-white shadow-md shadow-emerald-500/5 hover:shadow-lg relative transition-all duration-300 animate-fade-in">
                  <div className="absolute -top-3 right-6 px-3 py-0.5 bg-emerald-600 text-white text-[8px] font-mono font-bold uppercase tracking-wider rounded-full shadow-xs">
                    Popular
                  </div>
                  <div className="text-[9px] font-mono font-extrabold text-emerald-650 uppercase tracking-widest mb-3 bg-emerald-50 px-2.5 py-1 rounded w-fit">
                    Business App
                  </div>
                  <div className="mb-4">
                    <span className="text-3xl font-black text-slate-900">₹50,000+</span>
                  </div>
                  <div className="text-[9.5px] font-bold text-emerald-600 mb-2">Suitable for: Growing Businesses</div>
                  <div className="border-t border-slate-100 my-4" />
                  <div className="space-y-3 flex-grow text-xs text-slate-600 font-light">
                    {["Authentication", "Database Integration", "Admin Panel", "Notifications"].map((feat) => (
                      <div key={feat} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="mt-8 w-full py-3 bg-emerald-600 hover:bg-emerald-550 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all">Start Project</button>
                </div>

                {/* Tier 3 */}
                <div className="flex flex-col p-8 rounded-2xl border border-slate-200 bg-white hover:border-emerald-100 hover:shadow-lg transition-all duration-300">
                  <div className="text-[9px] font-mono font-extrabold text-emerald-600 uppercase tracking-widest mb-3 bg-emerald-50 px-2.5 py-1 rounded w-fit">
                    Enterprise App
                  </div>
                  <div className="mb-4">
                    <span className="text-3xl font-black text-slate-900">₹1,00,000+</span>
                  </div>
                  <div className="border-t border-slate-100 my-4" />
                  <div className="space-y-3 flex-grow text-xs text-slate-600 font-light">
                    {["Advanced Features", "High Scalability", "Payment Integration", "Custom Workflows", "Long-Term Support"].map((feat) => (
                      <div key={feat} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="mt-8 w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all">Start Project</button>
                </div>
              </div>
            )}

            {/* DIGITAL MARKETING TAB */}
            {activeTab === "marketing" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {/* Instagram Management */}
                <div className="flex flex-col p-8 rounded-2xl border border-slate-200 bg-white hover:border-sky-100 hover:shadow-lg transition-all duration-300">
                  <div className="text-[9px] font-mono font-extrabold text-sky-600 uppercase tracking-widest mb-3 bg-sky-50 px-2.5 py-1 rounded w-fit">
                    Instagram Management
                  </div>
                  <div className="mb-3">
                    <span className="text-xl text-slate-400 font-bold block">Starting from</span>
                    <span className="text-3xl font-black text-slate-900">₹10,000<span className="text-xs text-slate-500 font-light">/month</span></span>
                  </div>
                  <div className="border-t border-slate-100 my-4" />
                  <div className="space-y-3 flex-grow text-xs text-slate-600 font-light">
                    {["Content Planning", "Post Design", "Reels Strategy", "Growth Guidance", "Analytics Reports"].map((feat) => (
                      <div key={feat} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-sky-550 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="mt-8 w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all">Retain Agency</button>
                </div>

                {/* Digital Marketing Campaigns */}
                <div className="flex flex-col p-8 rounded-2xl border border-slate-200 bg-white hover:border-sky-100 hover:shadow-lg transition-all duration-300">
                  <div className="text-[9px] font-mono font-extrabold text-sky-605 uppercase tracking-widest mb-3 bg-sky-50 px-2.5 py-1 rounded w-fit">
                    Digital Marketing
                  </div>
                  <div className="mb-3">
                    <span className="text-xl text-slate-400 font-bold block">Starting from</span>
                    <span className="text-3xl font-black text-slate-900">₹15,000<span className="text-xs text-slate-500 font-light">/month</span></span>
                  </div>
                  <div className="border-t border-slate-100 my-4" />
                  <div className="space-y-3 flex-grow text-xs text-slate-600 font-light">
                    {["Social Media Marketing", "Lead Generation", "Campaign Planning", "Performance Tracking"].map((feat) => (
                      <div key={feat} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-sky-550 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="mt-8 w-full py-3 bg-sky-600 hover:bg-sky-550 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all">Retain Agency</button>
                </div>
              </div>
            )}

            {/* BUSINESS AUTOMATION TAB */}
            {activeTab === "automation" && (
              <div className="max-w-xl mx-auto">
                <div className="flex flex-col p-8 rounded-2xl border-2 border-amber-500 bg-white shadow-xl shadow-amber-500/5 hover:shadow-2xl transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-[9px] font-mono font-extrabold text-amber-600 uppercase tracking-widest bg-amber-50 px-2.5 py-1 rounded">
                      Business Automation
                    </div>
                    <span className="text-amber-500"><Sparkles className="w-5 h-5 animate-pulse" /></span>
                  </div>
                  <div className="mb-4">
                    <span className="text-xl text-slate-400 font-bold block">Starting from</span>
                    <span className="text-4xl font-extrabold text-slate-900">₹15,000+</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-6 leading-relaxed font-light">
                    Re-engineer your repetitive, manual tasks with customized, automated software sequences that integrate into your existing toolkits.
                  </p>
                  <div className="border-t border-slate-100 my-4" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-xs text-slate-600 font-light">
                    {["WhatsApp Automation", "Lead Automation", "CRM Automation", "Workflow Automation", "Email Automation", "Business Process Automation"].map((feat) => (
                      <div key={feat} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all">Automate Operations</button>
                </div>
              </div>
            )}

            {/* AI SOLUTIONS TAB */}
            {activeTab === "ai" && (
              <div className="max-w-xl mx-auto animate-fade-in">
                <div className="flex flex-col p-8 rounded-2xl border-2 border-purple-500 bg-white shadow-xl shadow-purple-500/5 hover:shadow-2xl transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-[9px] font-mono font-extrabold text-purple-650 uppercase tracking-widest bg-purple-50 px-2.5 py-1 rounded">
                      AI Solutions Suite
                    </div>
                    <span className="text-purple-500"><Cpu className="w-5 h-5 animate-pulse" /></span>
                  </div>
                  <div className="mb-4">
                    <span className="text-xl text-slate-400 font-bold block">Starting from</span>
                    <span className="text-4xl font-extrabold text-slate-900">₹20,000+</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-6 leading-relaxed font-light">
                    Inject conversational neural logic, machine intelligence, high-efficiency data models, and custom agents directly into your software workflow.
                  </p>
                  <div className="border-t border-slate-100 my-4" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-xs text-slate-600 font-light">
                    {["AI Chatbots", "AI Agents", "AI Integrations", "Document Processing", "Custom AI Solutions"].map((feat) => (
                      <div key={feat} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="w-full py-3 bg-purple-600 hover:bg-purple-750 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all">Deploy AI Systems</button>
                </div>
              </div>
            )}

            {/* STUDENT PROJECTS TAB */}
            {activeTab === "student" && (
              <div className="max-w-xl mx-auto">
                <div className="flex flex-col p-8 rounded-2xl border border-slate-300 border-dashed bg-white/70 hover:shadow-lg transition-all duration-300 text-center items-center">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 mb-4">
                    <GraduationCap className="w-6 h-6 text-slate-700" />
                  </div>
                  <div className="text-[9px] font-mono font-extrabold text-slate-500 uppercase tracking-widest mb-3 bg-slate-100 px-2 py-0.5 rounded">
                    Secondary Service
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Student Projects</h3>
                  <div className="text-lg font-bold text-indigo-600 mb-4 bg-indigo-50/70 border border-indigo-100/50 px-3 py-1 rounded">Available on Request</div>
                  <p className="text-xs text-slate-500 mb-8 max-w-sm leading-relaxed font-light">
                    Comprehensive, high-grade university-ready implementations, code, reports, slide decks, and elite guidance for Computer Science, IT, and related final year modules.
                  </p>
                  <div className="border-t border-slate-100 w-full my-4" />
                  <div className="flex flex-wrap gap-2 justify-center mb-8 max-w-sm">
                    {["Minor Projects", "Major Projects", "Reports Assistance", "PPT Presentations", "Technical Guidance"].map((feat) => (
                      <span key={feat} className="text-[10px] px-3 py-1 bg-slate-200/50 rounded-md font-semibold text-slate-600">{feat}</span>
                    ))}
                  </div>
                  <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2">
                    Submit Request <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Custom Requirement Prompt */}
          <div className="mt-auto pt-4 border-t border-slate-200/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span className="text-[10.5px] text-slate-500">Need an enterprise-grade custom stack, rapid SLA, or dedicated engineers?</span>
            </div>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-widest hover:text-indigo-800 transition-colors cursor-pointer"
            >
              Get Custom Consultation &rarr;
            </button>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}
