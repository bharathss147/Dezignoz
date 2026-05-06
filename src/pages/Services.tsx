import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Palette, Code, Megaphone, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import AnimatedSection from "@/components/AnimatedSection";

const services = [
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "We create intuitive, user-centered designs that deliver seamless experiences across all platforms. From wireframes to high-fidelity prototypes.",
    features: ["User Research", "Wireframing", "Prototyping", "Usability Testing"],
  },
  {
    icon: Layers,
    title: "Branding",
    description:
      "Develop distinctive brand identities that resonate with your audience and set you apart from competitors. From logos to complete brand systems.",
    features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy"],
  },
  {
    icon: Megaphone,
    title: "Advertisement",
    description:
      "Strategic advertising designs that capture attention and drive engagement. We create compelling visuals for both digital and print media.",
    features: ["Social Media Ads", "Print Campaigns", "Display Advertising", "Brand Promotion"],
  },
];

const Services = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.span
            className="text-primary text-sm font-medium tracking-wider uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Our Services
          </motion.span>
          <motion.h1
            className="font-display text-5xl md:text-7xl font-bold text-foreground mt-4 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Solutions That{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Deliver
            </span>
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            We offer a comprehensive suite of digital services designed to help your business grow
            and thrive in the modern landscape.
          </motion.p>
        </div>
      </section>

      {/* Premium Floating Services Section */}
      <section className="relative py-24 w-full overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Subtle slow floating particles removed */}
          {/* Main Glow Orbs removed */}
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-5xl">
          <div className="flex flex-col lg:flex-row gap-6 h-full lg:h-[600px]">

            {/* LEFT CARD - UI/UX DESIGN (TALL BENTO) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1 lg:max-w-[45%] group relative bg-[#0a0f1c] hover:bg-[#0c1322] rounded-[32px] p-10 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_60px_rgba(59,130,246,0.15)] transition-all duration-500 overflow-hidden"
            >
              {/* Card background fade removed */}

              {/* Graphic Element */}
              <div className="relative w-full flex-grow flex flex-col items-center justify-center mb-8 perspective-[1000px]">
                {/* Top Node */}
                <motion.div
                  className="w-16 h-6 rounded-full bg-[#0a1128] flex items-center justify-center z-10 shadow-[0_5px_15px_rgba(0,0,0,0.5)] mb-6 transition-colors duration-500"
                  animate={{ y: [-2, 2, -2] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                </motion.div>

                {/* Main Center Node */}
                <motion.div
                  className="w-36 h-24 rounded-2xl bg-[#0d1630] shadow-[inset_0_2px_15px_rgba(255,255,255,0.05),0_10px_30px_rgba(0,0,0,0.8)] flex items-center p-4 gap-3 z-10 transition-colors duration-500"
                  animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#111c3b] flex items-center justify-center">
                    {React.createElement(services[0].icon, { className: "w-4 h-4 text-blue-300 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]" })}
                  </div>
                  <div className="flex flex-col gap-2">
                    {/* Background lines removed */}
                  </div>
                </motion.div>

                {/* Bottom Node */}
                <motion.div
                  className="w-16 h-6 rounded-full bg-[#0a1128] flex items-center justify-center z-10 shadow-[0_5px_15px_rgba(0,0,0,0.5)] mt-6 relative transition-colors duration-500"
                  animate={{ y: [2, -2, 2] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                  <div className="absolute top-0 w-2 h-2 rounded-full bg-blue-400 blur-sm animate-ping" />
                </motion.div>
              </div>

              {/* Details Content */}
              <div className="relative z-20">
                <h3 className="font-display tracking-wide text-lg text-white font-semibold mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                  {services[0].title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed font-medium">
                  {services[0].description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                  {services[0].features.slice(0, 2).map((feat, i) => (
                    <span key={i} className="text-[10px] uppercase font-bold text-cyan-300 bg-cyan-900/30 px-2 py-1 rounded border border-cyan-500/20">{feat}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* RIGHT COLUMN */}
            <div className="flex-1 flex flex-col gap-6">

              {/* TOP RIGHT - BRANDING (SQUARE) */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex-1 group relative bg-[#0a0f1c] hover:bg-[#0c1322] rounded-[32px] p-10 flex flex-col items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_60px_rgba(59,130,246,0.15)] transition-all duration-500 overflow-hidden min-h-[280px]"
              >
                {/* 3D Indented Concentric Circles */}
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <div className="absolute w-full h-full rounded-full bg-[#0d1529] shadow-[inset_0_10px_20px_rgba(0,0,0,0.8),0_2px_5px_rgba(255,255,255,0.05)]" />
                  <div className="absolute w-28 h-28 rounded-full bg-[#080d1a] shadow-[inset_0_5px_15px_rgba(0,0,0,0.9),0_1px_2px_rgba(255,255,255,0.02)]" />

                  {/* Center Button */}
                  <motion.div
                    className="relative w-16 h-16 rounded-full bg-gradient-to-b from-[#111c3b] to-[#0a0f1c] shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_2px_2px_rgba(255,255,255,0.1)] flex items-center justify-center cursor-pointer group-hover:shadow-[0_10px_30px_rgba(34,211,238,0.2),inset_0_2px_2px_rgba(255,255,255,0.1)] transition-all duration-500"
                    whileHover={{ scale: 0.95 }}
                  >
                    {/* Internal Glow on Hover */}
                    <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {React.createElement(services[1].icon, { className: "w-7 h-7 text-white/50 group-hover:text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] transition-colors duration-300 relative z-10" })}
                  </motion.div>
                </div>

                <div className="absolute top-8 left-8">
                  <h3 className="font-display tracking-wide text-lg text-white font-semibold group-hover:text-cyan-300 transition-colors duration-300">
                    {services[1].title}
                  </h3>
                </div>
              </motion.div>

              {/* BOTTOM RIGHT - ADVERTISEMENT (RECTANGLE) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex-[0.8] group relative bg-[#0a0f1c] hover:bg-[#0c1322] rounded-[32px] p-8 flex items-center justify-between shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_60px_rgba(59,130,246,0.15)] transition-all duration-500 overflow-hidden min-h-[220px]"
              >
                {/* Abstract Number 1 Graphic */}
                <div className="relative flex items-center pl-4">
                  <div className="text-9xl font-black italic bg-clip-text text-transparent bg-gradient-to-b from-white/20 to-transparent absolute select-none pointer-events-none group-hover:from-cyan-500/20 transition-all duration-700">
                    1
                  </div>
                  <div className="relative z-10 ml-8 flex flex-col items-center">
                    <span className="text-[10px] tracking-widest text-white/30 uppercase font-bold group-hover:text-blue-400 transition-colors duration-300">Single</span>
                    <span className="text-[10px] tracking-widest text-white/30 uppercase font-bold group-hover:text-blue-400 transition-colors duration-300">Post</span>
                    <span className="text-[10px] tracking-widest text-white/30 uppercase font-bold group-hover:text-blue-400 transition-colors duration-300">Day</span>
                  </div>
                  {/* Subtle separator line removed */}
                </div>

                <div className="flex flex-col ml-12 lg:ml-auto w-1/2 relative z-20">
                  {React.createElement(services[2].icon, { className: "w-6 h-6 text-white/30 group-hover:text-cyan-300 mb-3 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-colors duration-300" })}
                  <h3 className="font-display tracking-wide text-lg text-white font-semibold mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                    {services[2].title}
                  </h3>
                  <p className="text-xs text-white/40 leading-relaxed font-medium line-clamp-2">
                    {services[2].description}
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* Circular Gauge Process Section */}
      <section className="relative py-32 w-full overflow-hidden flex flex-col items-center justify-center">
        <div className="container mx-auto px-6 relative z-10">



          {/* Circle Gauge Container */}
          <div className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center mt-4">

            {/* SVG Background Dial */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
              style={{ overflow: "visible" }}
            >
              <defs>
                <linearGradient id="liquid-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff1b6b" />
                  <stop offset="50%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
                <linearGradient id="ring-border" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
                </linearGradient>
                <filter id="gauge-blur" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <radialGradient id="glass-dark">
                  <stop offset="70%" stopColor="rgba(0,0,0,0.4)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
                </radialGradient>
              </defs>

              {/* Ticks around the circle removed */}

              {/* Outer Frosted Glass Plate Base */}
              <circle
                cx="50" cy="50" r="38"
                fill="url(#glass-dark)"
                stroke="url(#ring-border)"
                strokeWidth="0.3"
              />

              {/* Inner ambient glow */}
              <circle
                cx="50" cy="50" r="28"
                fill="url(#liquid-glow)"
                fillOpacity="0.05"
                filter="url(#gauge-blur)"
              />

              {/* Solid Liquid Energy Ring (Complete & Static) */}
              <circle
                cx="50" cy="50" r="30"
                fill="none"
                stroke="url(#liquid-glow)"
                strokeWidth="1.2"
                filter="url(#gauge-blur)"
              />
              <circle
                cx="50" cy="50" r="30"
                fill="none"
                stroke="url(#liquid-glow)"
                strokeWidth="0.5"
              />
            </svg>

            {/* Central Big Number */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-10 w-full flex flex-col items-center justify-center">
              <h2 className="font-sans text-6xl md:text-8xl font-thin text-[#ff1b6b] tracking-tighter drop-shadow-[0_0_15px_rgba(255,27,107,0.5)]">
                04
              </h2>
              <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase mt-1">Steps</span>
            </div>

            {/* Step 01: Top (12 o'clock) */}
            <div className="absolute top-[-8%] left-[50%] -translate-x-1/2 -translate-y-1/2 group text-center cursor-default p-6">
              <div className="absolute bottom-[70%] left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none pb-2">
                <span className="text-white/40 text-[10px] font-sans tracking-[0.3em] uppercase">Our Process</span>
              </div>
              <span className="font-sans text-3xl md:text-4xl font-light text-white/70 group-hover:text-white transition-colors block relative z-10">01</span>
              <div className="absolute top-[70%] left-1/2 -translate-x-1/2 w-48 opacity-0 group-hover:opacity-100 transition-opacity pt-4 pointer-events-none z-20">
                <span className="text-sm text-white/70 tracking-widest uppercase block mb-1">Discovery</span>
                <p className="text-xs text-white/50 font-light">Understanding your goals</p>
              </div>
            </div>

            {/* Step 02: Right (3 o'clock) */}
            <div className="absolute top-[50%] left-[108%] -translate-x-1/2 -translate-y-1/2 group text-left cursor-default p-6">
              <span className="font-sans text-3xl md:text-4xl font-light text-white/70 group-hover:text-white transition-colors">02</span>
              <div className="absolute left-[70%] top-1/2 -translate-y-1/2 w-48 opacity-0 group-hover:opacity-100 transition-opacity pl-4 pointer-events-none">
                <span className="text-sm text-white/70 tracking-widest uppercase block mb-1">Strategy</span>
                <p className="text-xs text-white/50 font-light">Planning the approach</p>
              </div>
            </div>

            {/* Step 03: Bottom (6 o'clock) */}
            <div className="absolute top-[108%] left-[50%] -translate-x-1/2 -translate-y-1/2 group text-center cursor-default p-6">
              <span className="font-sans text-3xl md:text-4xl font-light text-white/70 group-hover:text-white transition-colors">03</span>
              <div className="absolute top-[70%] left-1/2 -translate-x-1/2 w-48 opacity-0 group-hover:opacity-100 transition-opacity pt-2 flex flex-col items-center pointer-events-none">
                <span className="text-sm text-white/70 tracking-widest uppercase block mb-1">Execute</span>
                <p className="text-xs text-white/50 font-light text-center">Building with precision</p>
              </div>
            </div>

            {/* Step 04: Left (9 o'clock) */}
            <div className="absolute top-[50%] left-[-8%] -translate-x-1/2 -translate-y-1/2 group text-right cursor-default p-6">
              <span className="font-sans text-3xl md:text-4xl font-light text-white/70 group-hover:text-white transition-colors">04</span>
              <div className="absolute right-[70%] top-1/2 -translate-y-1/2 w-48 opacity-0 group-hover:opacity-100 transition-opacity pr-4 flex flex-col items-end pointer-events-none">
                <span className="text-sm text-white/70 tracking-widest uppercase block mb-1">Launch</span>
                <p className="text-xs text-white/50 font-light text-right">Delivering excellence</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <AnimatedSection className="container mx-auto">
        <GlassCard className="p-12 md:p-16 text-center" hover={false}>
          <motion.h2
            className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
          >
            Let's discuss how our services can help you achieve your goals.
          </motion.p>
          <Link to="/contact">
            <motion.button
              className="btn-glow text-white inline-flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Start a Conversation</span>
              <ArrowRight className="relative z-10 w-5 h-5" />
            </motion.button>
          </Link>
        </GlassCard>
      </AnimatedSection>

      <Footer />
    </div>
  );
};

export default Services;
