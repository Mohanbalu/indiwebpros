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

      {/* AICTE */}
      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 border border-orange-200 rounded-md">
        <img
          src="https://i.ibb.co/202zbbyc/aicte.png"
          alt="AICTE"
          className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0 drop-shadow-xs"
          referrerPolicy="no-referrer"
        />
        <span className="text-[11px] sm:text-[12px] font-extrabold text-orange-900 whitespace-nowrap">AICTE</span>
      </div>

      {/* ISO 9001:2015 */}
      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 border border-blue-200 rounded-md">
        <img
          src="https://i.ibb.co/4BtJNxc/iso.png"
          alt="ISO 9001:2015"
          className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0 drop-shadow-xs"
          referrerPolicy="no-referrer"
        />
        <span className="text-[11px] sm:text-[12px] font-bold text-blue-900 whitespace-nowrap">ISO 9001:2015</span>
      </div>

      {/* MSME */}
      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-md">
        <img
          src="https://i.ibb.co/xt1C6xxh/msme.png"
          alt="MSME"
          className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0 drop-shadow-xs"
          referrerPolicy="no-referrer"
        />
        <span className="text-[11px] sm:text-[12px] font-black tracking-tight text-emerald-950 whitespace-nowrap">MSME</span>
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
