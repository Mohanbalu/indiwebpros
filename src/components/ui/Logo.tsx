import React from "react";
import { cn } from "@/src/lib/utils";

interface LogoProps {
  className?: string;
  iconClassName?: string;
}

export function Logo({ className, iconClassName }: LogoProps) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* Main Logo Container */}
      <div className={cn(
        "relative w-full h-full bg-slate-950/40 rounded-2xl flex items-center justify-center overflow-hidden border border-white/10 shadow-2xl shadow-indigo-500/5 backdrop-blur-xs",
        iconClassName
      )}>
        {/* Brand Logo Image */}
        <img 
          src="https://i.ibb.co/RpYY1vn1/logo.jpg" 
          alt="Indiwebpros Logo" 
          referrerPolicy="no-referrer"
          className="w-4/5 h-4/5 object-contain rounded-full"
        />
        
        {/* Ambient Light Effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-indigo-500/10 blur-2xl rounded-full pointer-events-none" />
      </div>
    </div>
  );
}
