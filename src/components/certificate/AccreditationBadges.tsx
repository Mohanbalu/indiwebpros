import React from "react";

export function AccreditationBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 py-2 px-2 select-none ${className}`}>
      {/* Startup India */}
      <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50/80 border border-amber-200/80 rounded-md">
        <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
        <span className="text-[11px] sm:text-xs font-bold text-slate-800 tracking-tight">
          <span className="text-orange-600">#startup</span>india
        </span>
      </div>

      {/* APSCHE / State Council */}
      <div className="flex items-center gap-1.5 px-2 py-1 bg-red-50/80 border border-red-200/80 rounded-md">
        <svg className="w-4 h-4 text-red-700 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zm0 8.2L4.5 7 12 3.3 19.5 7 12 10.2zM2 17l10 5 10-5v-3l-10 5-10-5v3z" />
        </svg>
        <span className="text-[10px] sm:text-[11px] font-bold text-red-900 tracking-wider">APSCHE</span>
      </div>

      {/* Govt / Ministry */}
      <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 border border-slate-200 rounded-md">
        <svg className="w-4 h-4 text-slate-700 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
        </svg>
        <span className="text-[10px] sm:text-[11px] font-semibold text-slate-700 leading-tight">Govt. of India</span>
      </div>

      {/* AICTE */}
      <div className="flex items-center gap-1.5 px-2 py-1 bg-orange-50 border border-orange-200 rounded-md">
        <div className="w-4 h-4 rounded-full border border-orange-600 flex items-center justify-center bg-orange-500 text-[8px] font-black text-white">
          ⚙
        </div>
        <span className="text-[10px] sm:text-[11px] font-extrabold text-orange-800">AICTE</span>
      </div>

      {/* IndiWebPros Logo */}
      <div className="flex items-center gap-1.5 px-2 py-1 bg-indigo-50 border border-indigo-200 rounded-md">
        <div className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[9px] font-black">
          🌲
        </div>
        <span className="text-[10px] sm:text-[11px] font-bold text-indigo-950">IndiWebPros</span>
      </div>

      {/* ISO 9001:2015 */}
      <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 border border-blue-200 rounded-md">
        <div className="w-4 h-4 rounded-full border border-blue-600 flex items-center justify-center text-blue-700 font-bold text-[8px]">
          ISO
        </div>
        <span className="text-[10px] sm:text-[11px] font-bold text-blue-900">ISO 9001:2015</span>
      </div>

      {/* MSME */}
      <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 border border-emerald-200 rounded-md">
        <div className="w-3.5 h-3.5 rounded bg-emerald-700 text-[8px] font-bold text-white flex items-center justify-center">
          M
        </div>
        <span className="text-[10px] sm:text-[11px] font-black tracking-tight text-emerald-950">MSME</span>
      </div>

      {/* AWS Startups */}
      <div className="flex items-center gap-1 px-2 py-1 bg-amber-50/60 border border-amber-200 rounded-md">
        <span className="text-[10px] sm:text-[11px] font-black text-amber-900">aws</span>
        <span className="text-[9px] sm:text-[10px] font-semibold text-amber-700">startups</span>
      </div>
    </div>
  );
}

export function TechSkillBadge({ name }: { name: string }) {
  const getSkillMeta = (skill: string) => {
    const s = skill.toLowerCase();
    if (s.includes("html")) return { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", icon: "5", tag: "HTML5" };
    if (s.includes("css")) return { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", icon: "3", tag: "CSS3" };
    if (s.includes("javascript") || s.includes("js")) return { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-800", icon: "JS", tag: "JavaScript" };
    if (s.includes("react")) return { bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-700", icon: "⚛", tag: "React.js" };
    if (s.includes("firebase")) return { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", icon: "🔥", tag: "Firebase" };
    if (s.includes("github")) return { bg: "bg-slate-100", border: "border-slate-300", text: "text-slate-800", icon: "🐙", tag: "GitHub" };
    if (s.includes("git")) return { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", icon: "⌥", tag: "Git" };
    if (s.includes("api")) return { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", icon: "API", tag: "REST APIs" };
    if (s.includes("ui") || s.includes("ux")) return { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-700", icon: "UX", tag: "UI/UX Design" };
    if (s.includes("deploy") || s.includes("cloud")) return { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", icon: "☁", tag: "Deployment" };
    return { bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-700", icon: "⚡", tag: skill };
  };

  const meta = getSkillMeta(name);

  return (
    <div className={`flex flex-col items-center justify-center p-2 rounded-lg border ${meta.bg} ${meta.border} min-w-[70px] shadow-xs hover:scale-105 transition-transform`}>
      <div className={`w-8 h-8 rounded-md flex items-center justify-center font-bold text-sm ${meta.text}`}>
        {meta.icon}
      </div>
      <span className="text-[10px] font-semibold text-slate-800 mt-1 text-center whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}
