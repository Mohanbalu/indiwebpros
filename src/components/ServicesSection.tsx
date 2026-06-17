"use client";

import React from "react";
import { motion } from "motion/react";
import { 
  Globe, 
  Smartphone, 
  TrendingUp, 
  Zap, 
  Cpu, 
  Book,
  Building,
  GraduationCap,
  Sparkles,
  Users,
  Stethoscope,
  Briefcase
} from "lucide-react";
import { cn } from "@/src/lib/utils";

const services = [
  {
    title: "Website Development",
    description: "High-performance, custom-crafted landing pages, corporate websites, SaaS platforms, and enterprise web applications that are robust, secure, and blazing fast.",
    features: ["Custom Web Applications", "B2B & B2C Platforms", "High-Conversion Landing Pages"],
    icon: Globe,
    color: "bg-indigo-500/10 text-indigo-600 border border-indigo-200/20",
  },
  {
    title: "Mobile App Development",
    description: "Robust, state-of-the-art native and cross-platform mobile apps for iOS and Android that deliver absolute stellar performance and fluid user experiences.",
    features: ["iOS & Android Apps", "SaaS Native MVPs", "Custom APIs & Integrations"],
    icon: Smartphone,
    color: "bg-emerald-500/10 text-emerald-600 border border-emerald-200/20",
  },
  {
    title: "Digital Marketing",
    description: "Strategic brand scaling campaigns, search engine optimization (SEO), performance marketing, and high-impact Instagram with social media management.",
    features: ["Social Media Marketing", "Lead Generation", "Instagram & Reels Strategy"],
    icon: TrendingUp,
    color: "bg-sky-500/10 text-sky-600 border border-sky-200/20",
  },
  {
    title: "Business Automation",
    description: "Seamlessly integrate custom workflow engines, WhatsApp automation, CRM sync, smart lead captures, and automated email sequences to slash operational drag.",
    features: ["WhatsApp Automation", "CRM & Lead Automation", "Workflow & Process Systems"],
    icon: Zap,
    color: "bg-amber-500/10 text-amber-600 border border-amber-200/20",
  },
  {
    title: "AI Solutions",
    description: "Deploy expert conversational AI chatbots, smart automated agents, intelligent document analyzers, and custom AI API business pipelines.",
    features: ["AI Chatbots & Agents", "Document AI Processing", "Custom Models Integration"],
    icon: Cpu,
    color: "bg-purple-500/10 text-purple-600 border border-purple-200/20",
  },
  {
    title: "Student Projects",
    description: "Comprehensive technical guidance, complete custom source codes, detailed design reports, and professional presentation support for minor and major student projects.",
    features: ["Minor Semester Projects", "Major Final Year Projects", "Reports & PPT Guidance"],
    icon: Book,
    color: "bg-slate-500/10 text-slate-600 border border-slate-200/20",
  },
];

const workWithClients = [
  {
    category: "Startups",
    description: "Building fast, scalable products and highly functional MVPs to hit the market quickly and capture investors' attention.",
    icon: Sparkles,
    badge: "Scale Fast"
  },
  {
    category: "Local Businesses",
    description: "Optimizing retail shops, service providers, and local brands with modern designs and automated lead systems.",
    icon: Building,
    badge: "Go Digital"
  },
  {
    category: "Educational Institutions",
    description: "Developing robust e-learning tools, internal management systems, and academic partner project frameworks.",
    icon: GraduationCap,
    badge: "Modern Learning"
  },
  {
    category: "Clinics",
    description: "Polished healthcare websites, patient booking portals, and custom web visibility setups with zero hassle.",
    icon: Stethoscope,
    badge: "Patient First"
  },
  {
    category: "Agencies",
    description: "Acting as the ultra-reliable core technical extension for creative, marketing, and corporate strategy firms.",
    icon: Briefcase,
    badge: "Tech Extension"
  },
  {
    category: "Entrepreneurs",
    description: "Engineering custom-built automation loops, high-performance landing pages, and customized digital assets.",
    icon: Users,
    badge: "SaaS & Systems"
  }
];

export function ServicesSection() {
  return (
    <section id="services" className="w-full py-28 bg-white overflow-hidden selection:bg-indigo-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-indigo-50 border border-indigo-100 rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-600 uppercase">Trusted Technology Partner for Businesses & Startups</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight"
          >
            Capabilities & <br />
            <span className="text-indigo-600 font-display">Technology Ecosystem</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-slate-500 max-w-2xl leading-relaxed"
          >
            We deploy cutting-edge engineering pipelines, robust security foundations, and elegant visual architectures to elevate your brand.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group relative p-8 bg-slate-50 border border-slate-100 rounded-3xl hover:bg-white hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col h-full"
            >
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300", service.color)}>
                <service.icon className="w-5 h-5 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">{service.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">
                {service.description}
              </p>
              
              <div className="mt-auto pt-6 border-t border-slate-200/50">
                <div className="flex flex-wrap gap-1.5">
                  {service.features.map((feature) => (
                    <span 
                      key={feature} 
                      className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest px-2.5 py-1.5 bg-slate-200/20 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Subtle hover accent */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/3 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* WHO WE WORK WITH MODULE */}
        <div className="mt-32 pt-16 border-t border-slate-100">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-indigo-600 uppercase mb-4">Target Verticals</span>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Who We Work With</h3>
            <p className="mt-4 text-sm text-slate-500 max-w-lg leading-relaxed">
              We design, build, and support tailor-made experiences across a diverse range of business landscapes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {workWithClients.map((client, idx) => (
              <motion.div
                key={client.category}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="p-6 bg-slate-50/50 hover:bg-white border border-slate-200/60 hover:border-indigo-150 hover:shadow-lg hover:shadow-indigo-500/2 rounded-2xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white border border-slate-100 rounded-xl text-indigo-600 group-hover:scale-105 transition-transform">
                    <client.icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-indigo-700 bg-indigo-50/70 border border-indigo-100/50 px-2 py-0.5 rounded-full">
                    {client.badge}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{client.category}</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-light">{client.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
