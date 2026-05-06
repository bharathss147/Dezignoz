import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Eye, Zap, Users, Search, PenTool, RefreshCw, Send, Sparkles, MessageCircle, Fingerprint, Star } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import AnimatedSection from "@/components/AnimatedSection";

const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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
            About Us
          </motion.span>
          <motion.h1
            className="font-display text-5xl md:text-7xl font-bold text-foreground mt-4 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            We Build the{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Future
            </span>
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            We're a team of passionate designers, developers, and strategists dedicated to
            crafting exceptional digital experiences that make a lasting impact.
          </motion.p>
        </div>
      </section>

      {/* Vision & Mission - Ultra-Advanced HUD Interface */}
      <section className="relative w-full overflow-hidden py-48 bg-[#010409]">
        {/* Cinematic Lighting Overlays */}
        <div className="absolute top-0 left-1/4 w-1/2 h-[500px] bg-cyan-500/10 blur-[120px] rounded-full opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-1/2 h-[500px] bg-blue-600/10 blur-[120px] rounded-full opacity-50" />

        {/* Global HUD Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/10 via-transparent to-blue-950/10" />

        <div className="container mx-auto relative z-10 px-6 max-w-7xl">
          {/* Content Boards */}
          <div className="w-full flex flex-col space-y-24">
            {/* Board 01: VISION PROTOCOL */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Vision Visual Side - Advanced Holographic Scanner */}
              <div className="lg:col-span-12 xl:col-span-5 flex flex-col items-center lg:items-end order-2 lg:order-1">
                <div className="relative w-full max-w-md h-[400px] border border-cyan-500/20 rounded-2xl bg-[#020816]/30 backdrop-blur-sm p-6 flex flex-col justify-between group overflow-hidden">
                  {/* Local Scanning Elements Removed */}
                  


                  {/* Top Status Bar */}
                  <div className="flex justify-between items-start z-10">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex gap-0.5 justify-end mt-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.div 
                            key={i}
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                            className="w-1.5 h-3 bg-cyan-500/50" 
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Central Holographic Terminal */}
                  <div className="relative flex-grow flex items-center justify-center">
                    {/* Floating Vision Design Posters */}
                    {[
                      { icon: Sparkles, label: "FUTURE_VISUALS", x: -120, y: -80, delay: 0 },
                      { icon: PenTool, label: "CORE_DESIGN", x: 130, y: -60, delay: 1 },
                      { icon: Target, label: "STRATEGIC_POSTER", x: -110, y: 90, delay: 0.5 },
                      { icon: Fingerprint, label: "BRAND_IDENTITY", x: 120, y: 80, delay: 1.5 }
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        className="absolute hidden xl:flex flex-col items-center gap-2 p-3 rounded-lg bg-cyan-950/20 border border-cyan-500/20 backdrop-blur-md z-20"
                        style={{ x: item.x, y: item.y }}
                        animate={{ 
                          y: [item.y - 10, item.y + 10, item.y - 10],
                          opacity: [0.4, 0.8, 0.4]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity, 
                          ease: "easeInOut",
                          delay: item.delay 
                        }}
                      >
                        <item.icon className="w-5 h-5 text-cyan-400" />
                        <span className="font-mono text-[6px] text-cyan-500/80 tracking-widest">{item.label}</span>
                      </motion.div>
                    ))}

                    {/* Integrated Particle System for Vision */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      {[...Array(15)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-0.5 h-0.5 bg-cyan-400/40 rounded-full"
                          initial={{ 
                            x: "50%", 
                            y: "50%", 
                            opacity: 0,
                            scale: 0 
                          }}
                          animate={{ 
                            x: [`${50 + (Math.random() - 0.5) * 40}%`, `${50 + (Math.random() - 0.5) * 100}%`],
                            y: [`${50 + (Math.random() - 0.5) * 40}%`, `${50 + (Math.random() - 0.5) * 100}%`],
                            opacity: [0, 0.8, 0],
                            scale: [0, 1.5, 0]
                          }}
                          transition={{ 
                            duration: 3 + Math.random() * 4, 
                            repeat: Infinity, 
                            ease: "easeOut",
                            delay: Math.random() * 5 
                          }}
                        />
                      ))}
                    </div>

                    {/* Multi-layered Radar Rings */}
                    <div className="relative w-48 h-48 flex items-center justify-center">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-cyan-500/10 rounded-full"
                      />
                      <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-4 border border-cyan-500/20 rounded-full border-dashed"
                      />
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute inset-0 bg-cyan-500/5 rounded-full"
                      />

                      {/* Radar Beam */}
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full bg-gradient-to-t from-cyan-400/20 to-transparent origin-center z-0"
                      />

                      {/* Central Icon & Scanner */}
                      <div className="relative z-10 w-20 h-20 rounded-full bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                        <Eye className="w-10 h-10 text-cyan-400" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Metrics */}
                  <div className="space-y-4 z-10">
                    <div className="flex justify-between items-end">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[8px] text-cyan-400 uppercase tracking-widest font-bold">Processing</span>
                          <motion.div 
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="flex gap-0.5"
                          >
                            <div className="w-0.5 h-0.5 rounded-full bg-cyan-400" />
                            <div className="w-0.5 h-0.5 rounded-full bg-cyan-400" />
                            <div className="w-0.5 h-0.5 rounded-full bg-cyan-400" />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="h-1 w-full bg-cyan-950/50 rounded-full overflow-hidden">
                      <motion.div 
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="h-full w-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Vision Text Side */}
              <div className="lg:col-span-12 xl:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-1 lg:order-2">
                <span className="text-cyan-400 font-mono text-xs tracking-widest mb-4 opacity-70 animate-pulse">// PROCESSING...</span>
                <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-8 tracking-tighter drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                  OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">VISION</span>
                </h2>
                <div className="relative">
                  <p className="text-xl md:text-2xl text-blue-100/60 font-light leading-relaxed max-w-2xl border-l-4 border-cyan-500/30 pl-8">
                    To be the leading force in digital innovation, empowering brands to thrive in an ever-evolving digital landscape.
                    <span className="text-white opacity-90 block mt-4">We envision a world where technology and creativity converge to create meaningful, high-performance digital experiences.</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Board 02: OUR MISSION */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center p-8 rounded-3xl"
            >
              {/* Mission Text Side */}
              <div className="lg:col-span-12 xl:col-span-7 flex flex-col items-center lg:items-end text-center lg:text-right">
                <span className="text-blue-400 font-mono text-xs tracking-widest mb-4 opacity-70">// CORE_DIRECTIVE v1.5</span>
                <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-8 tracking-tighter drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  OUR <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-400 to-cyan-500">MISSION</span>
                </h2>
                <p className="text-xl md:text-2xl text-blue-100/60 font-light leading-relaxed max-w-2xl border-r-4 border-blue-500/30 pr-8">
                  To deliver transformative digital solutions that drive growth, engage audiences, and create lasting value.
                  <span className="text-white opacity-90 block mt-4">We combine strategic thinking with creative excellence to help our clients succeed in the fast-paced global market.</span>
                </p>
              </div>

              {/* Mission Visual Side - Processing Ideas */}
              <div className="lg:col-span-12 xl:col-span-5 flex flex-col items-center lg:items-start">
                <div className="relative w-full max-w-md h-[340px] border border-blue-500/20 rounded-2xl bg-[#020816]/40 backdrop-blur-md p-6 flex flex-col group overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-[10px] font-mono text-blue-400 uppercase tracking-[0.2em] font-bold">Idea_Processing</span>
                      </div>
                      <div className="text-[8px] font-mono text-blue-500/40">NODE: DESIGN_CORE_V2</div>
                    </div>
                    <div className="w-10 h-10 rounded-lg border border-blue-500/20 flex items-center justify-center bg-blue-950/20">
                      <Target className="w-5 h-5 text-blue-300 transform group-hover:scale-110 transition-transform" />
                    </div>
                  </div>

                  {/* Image Display Area */}
                  <div className="relative flex-grow rounded-xl overflow-hidden border border-blue-500/20 bg-black/60 shadow-inner group-hover:border-blue-400/40 transition-colors duration-500">
                    <div className="absolute inset-0 bg-[#020816]/50 z-10" />
                    
                    {/* Background grid instead of waves */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none z-10" 
                         style={{ backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        src={[
                          "/process/design1.png",
                          "/process/design2.png",
                          "/process/design3.png"
                        ][currentImageIndex % 3]}
                        initial={{ opacity: 0, scale: 1.1, filter: "blur(10px) brightness(1.5)" }}
                        animate={{ opacity: 0.6, scale: 1, filter: "blur(0px) brightness(1)" }}
                        exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </AnimatePresence>

                    {/* Scanning Line Overlay */}
                    <motion.div 
                      animate={{ top: ['-10%', '110%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-[2px] bg-blue-400/50 shadow-[0_0_15px_#3b82f6] z-20 pointer-events-none"
                    />


                    {/* HUD Data Overlays */}
                    <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none z-20">
                      <div className="flex justify-between items-start opacity-70">
                        <div className="font-mono text-[7px] text-blue-300 space-y-0.5">
                          <p>SCAN_MODE: DEPTH</p>
                          <p>BUFFER: 1024KB</p>
                        </div>
                        <div className="font-mono text-[7px] text-blue-300 text-right">
                          <p>LATENCY: 12ms</p>
                          <p>FPS: 60.0</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-1 bottom-4">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[6px] text-blue-400">STRUCTURAL_ANALYSIS</span>
                          <span className="font-mono text-[6px] text-blue-400">92%</span>
                        </div>
                        <div className="h-0.5 w-full bg-blue-900/30 rounded-full overflow-hidden">
                          <motion.div 
                            animate={{ width: ['0%', '92%'] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                            className="h-full bg-blue-500 shadow-[0_0_5px_#3b82f6]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Controls/Status */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            scale: i === currentImageIndex % 3 ? [1, 1.2, 1] : 1,
                            backgroundColor: i === currentImageIndex % 3 ? "#3b82f6" : "rgba(30, 58, 138, 0.4)"
                          }}
                          className="w-2 h-2 rounded-full cursor-pointer"
                        />
                      ))}
                    </div>
                    <div className="font-mono text-[9px] text-blue-400/60 tracking-wider">
                      VER: 2.0.4.ALPHA
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

  {/* Values - Premium Glassmorphism Cards */}
  <section className="relative py-24 w-full overflow-hidden">
    {/* Decorative background elements removed */}

    <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <div className="text-center mb-20 text-white">
            <motion.h2
              className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4 drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              What Drives Us
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] relative">
            {[
              {
                icon: Zap,
                title: "Creative Design",
                description:
                  "We craft visually striking and meaningful designs that communicate your brand message clearly and effectively.",
              },
              {
                icon: Users,
                title: "Collaboration",
                description:
                  "We work closely with our clients, treating every project as a true partnership.",
              },
              {
                icon: Target,
                title: "Excellence",
                description:
                  "We are committed to delivering the highest quality in everything we create.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative h-full flex flex-col"
              >
                {/* Main Glass Card */}
                <div className="relative flex-grow flex flex-col items-center text-center p-10 rounded-[22px] bg-[#0A1024]/40 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] group-hover:shadow-[0_0_35px_rgba(34,211,238,0.2)] group-hover:border-cyan-500/30 group-hover:-translate-y-3 transition-all duration-300 overflow-hidden z-20 will-change-transform">
                  
                  {/* Subtle Inner Highlight */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />

                  {/* Icon Container - Glassmorphism */}
                  <div className="relative w-16 h-16 rounded-[18px] bg-white/[0.03] backdrop-blur-md border border-white/10 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(34,211,238,0.1)] group-hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all duration-300">
                    <value.icon className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-colors duration-300" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-2xl font-bold text-white mb-4">
                    {value.title}
                  </h3>

                  <p className="text-[#9aa4b2] text-sm md:text-base leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

  {/* Meet the Designer & Journey */}
  <AnimatedSection className="container mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <GlassCard className="p-8 text-center" delay={0.1}>
        <div className="relative w-48 h-48 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent opacity-5 blur-2xl animate-pulse" />
          <img
            src="/bharath-designer.jpg"
            alt="Bharath"
            className="w-full h-full object-cover rounded-full border-4 border-white/10 relative z-10"
          />
        </div>
        <h3 className="font-display text-3xl font-bold text-foreground">BHARATH S</h3>
        <p className="text-primary font-medium mt-2">Graphic Designer & Creative Lead</p>
      </GlassCard>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
        >
          <h2 className="font-display text-4xl font-bold text-foreground mb-6">My Design Journey</h2>
          <GlassCard className="p-8">
            <p className="text-lg text-muted-foreground leading-relaxed">
              "I started as a self-taught graphic designer, driven by a passion for visual storytelling. Today, I help brands communicate clearly through creative and thoughtful design."
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </div>
      </AnimatedSection>

  {/* Process & USP - Antigravity Icon Grid */}
  <section className="relative py-20 w-full overflow-hidden">
    {/* Decorative background effects removed */}

    <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="text-center mb-16">
            <motion.h2
              className="font-display text-4xl md:text-5xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">Dezigno</span> Approach
            </motion.h2>
            <motion.p
              className="text-lg text-blue-200/60 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Our workflow and principles that make us stand out in the digital galaxy.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 perspective-[1000px]">
            {[
              { title: "Discover", desc: "Understanding your brand & goals", icon: Search },
              { title: "Design", desc: "Creating strong visual concepts", icon: PenTool },
              { title: "Refine", desc: "Polishing details with feedback", icon: RefreshCw },
              { title: "Deliver", desc: "Final high-quality designs", icon: Send },
              { title: "Custom-made", desc: "No templates, unique to you", icon: Sparkles },
              { title: "Responsive", desc: "Fast & friendly communication", icon: MessageCircle },
              { title: "Brand Focus", desc: "Identity over just visuals", icon: Fingerprint },
              { title: "Affordable", desc: "Professional value & accessible", icon: Star },
            ].map((item, index) => {
              // Create pseudo-random movement ranges based on index to simulate space drift
              const xRange = (index % 3 === 0) ? [-8, 8, -8] : (index % 2 === 0) ? [12, -12, 12] : [-10, 10, -10];
              const yRange = (index % 2 === 0) ? [-12, 12, -12] : [8, -8, 8];
              const rotateRange = (index % 3 === 0) ? [-3, 3, -3] : [2, -2, 2];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="h-full transform-style-3d relative z-10"
                >
                  <motion.div
                    className="h-full group"
                    animate={{ x: xRange, y: yRange, rotateZ: rotateRange }}
                    transition={{
                      duration: 8 + (index % 5),
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Glowing highlight strictly behind card */}
                    {/* Glow removed */}

                    {/* Main Glassmorphism Card */}
                    <div className="relative h-full flex flex-col p-6 rounded-2xl bg-[#0a0f1c]/80 backdrop-blur-md border border-white/5 hover:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-500 overflow-hidden transform group-hover:-translate-y-2 relative z-20 will-change-transform">

                      {/* Top Soft Specular Light edge */}
                      {/* Top Soft Specular Light edge removed */}

                      {/* Subtly glowing inner background gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      {/* 3D Isometric Icon Server/Platform */}
                      <div className="relative w-full h-40 mb-8 flex items-center justify-center perspective-[1000px]">
                        {/* Dramatic Background Glow inside card */}
                        {/* Background glow removed */}

                        <motion.div
                          className="relative transform-style-3d w-full h-full flex items-center justify-center p-4"
                          animate={{
                            rotateX: [60, 65, 60],
                            rotateZ: [-35, -40, -35]
                          }}
                          transition={{
                            duration: 6 + (index % 3),
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          {/* Floor reflection / Shadow */}
                          {/* Shadow removed */}

                          {/* Main Isometric Plate/Layer 1 */}
                          <div className="relative w-28 h-28 bg-[#0b1227]/90 border border-white/10 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_2px_1px_rgba(255,255,255,0.1)] flex items-center justify-center transform-style-3d group-hover:border-white/20 transition-colors duration-500">

                            {/* Layer 2 Plate */}
                            <motion.div
                              className="absolute inset-0 m-2 bg-[#101a35]/90 border border-cyan-400/30 rounded-2xl flex items-center justify-center transform-style-3d shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                              animate={{ translateZ: [5, 15, 5] }}
                              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.1 }}
                            >
                              {/* Central Icon */}
                              <motion.div
                                className="transform-style-3d text-cyan-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] flex items-center justify-center"
                                animate={{ translateZ: [10, 30, 10] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                              >
                                {/* The icon will appear flat on the 3D isometric plane, completing the illusion! */}
                                <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full" />
                                <item.icon className="w-10 h-10 relative z-10" />
                              </motion.div>
                            </motion.div>

                          </div>
                        </motion.div>
                      </div>

                      {/* Text Content */}
                      <div className="relative z-10 text-left mt-auto">
                        <h4 className="font-display font-bold text-lg text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                          {item.title}
                        </h4>
                        <p className="text-sm text-blue-200/50 leading-relaxed font-medium">
                          {item.desc}
                        </p>
                      </div>

                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

  {/* Testimonials */}
  <AnimatedSection className="container mx-auto">
    <div className="text-center mb-16 relative z-20">
      <motion.h2
        className="font-display text-4xl md:text-5xl font-bold text-foreground"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
      >
        Client Testimonials
      </motion.h2>
    </div>

{/* Desktop 3D Vortex View */ }
<div className="hidden md:flex relative h-[800px] w-full max-w-6xl mx-auto items-center justify-center transform-style-3d perspective-[2000px] will-change-transform">
  {/* Central Vortex Core */}
  <div className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-[80px] animate-pulse z-0" />
  <div className="absolute w-[400px] h-[400px] rounded-full border border-primary/20 animate-[spin_10s_linear_infinite] z-0 opacity-50" style={{ transform: 'rotateX(70deg)' }} />
  <div className="absolute w-[600px] h-[600px] rounded-full border border-accent/20 animate-[spin_15s_linear_infinite_reverse] z-0 opacity-30" style={{ transform: 'rotateX(70deg)' }} />
  <div className="absolute w-3 h-3 bg-white rounded-full shadow-[0_0_20px_#fff] z-0" />

  {/* Wrapper that rotates clockwise like a ferris wheel */}
  <motion.div
    className="absolute inset-0 flex items-center justify-center transform-style-3d z-10"
    animate={{ rotateZ: 360 }}
    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
  >
    {[
      {
        name: "Mohammed Aushim",
        feedback: "Exceptional design quality with great attention to detail.",
        image: "/testimonials/mohammed.jpg"
      },
      {
        name: "Devesh",
        feedback: "Professional, creative, and delivered exactly as promised.",
        image: "/testimonials/devesh.jpg"
      },
      {
        name: "Judes Rogan",
        feedback: "Strong visual sense and excellent communication.",
        image: "/testimonials/judes.jpg"
      },
      {
        name: "Vetri",
        feedback: "High-quality designs that truly elevate our brand.",
        image: "/testimonials/vetri.jpg"
      }
    ].map((client, index) => {
      const total = 4;
      // Spread evenly around the circle
      const angle = (index / total) * Math.PI * 2;
      const radius = 330;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      return (
        <motion.div
          key={index}
          className="absolute transform-style-3d"
          style={{ x, y }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, type: "spring", bounce: 0.3, delay: index * 0.2 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Counter-rotate so cards stay perfectly upright (vertical) */}
          <motion.div
            className="transform-style-3d"
            animate={{ rotateZ: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {/* Floating animation */}
            <motion.div
              animate={{
                y: [-10, 10, -10],
                rotateX: [0, 5, 0],
                rotateY: [0, -5, 0]
              }}
              transition={{
                duration: 6 + (index % 2),
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: index * 0.5
              }}
            >
              <GlassCard className="w-[300px] p-8 text-center bg-[#041226]/80 backdrop-blur-md border border-white/10 hover:border-primary/50 shadow-[0_15px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-all duration-500 group will-change-transform" hover={false}>
                <div className="w-24 h-24 mx-auto mb-6 relative">
                  <div className="absolute inset-0 rounded-full bg-primary blur-[20px] opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                  <img
                    src={client.image}
                    alt={client.name}
                    className="w-full h-full object-cover rounded-full border-2 border-primary/30 relative z-10"
                  />
                </div>
                <div className="relative z-10">
                  <p className="text-muted-foreground italic mb-6 text-sm leading-relaxed">"{client.feedback}"</p>
                  <h4 className="font-display text-lg font-bold text-white group-hover:text-primary transition-colors">{client.name}</h4>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </motion.div>
      );
    })}
  </motion.div>
</div>

{/* Mobile View */ }
<div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-20">
  {[
    {
      name: "Mohammed Aushim",
      feedback: "Exceptional design quality with great attention to detail.",
      image: "/testimonials/mohammed.jpg"
    },
    {
      name: "Devesh",
      feedback: "Professional, creative, and delivered exactly as promised.",
      image: "/testimonials/devesh.jpg"
    },
    {
      name: "Judes Rogan",
      feedback: "Strong visual sense and excellent communication.",
      image: "/testimonials/judes.jpg"
    },
    {
      name: "Vetri",
      feedback: "High-quality designs that truly elevate our brand.",
      image: "/testimonials/vetri.jpg"
    }
  ].map((client, index) => (
    <GlassCard key={index} className="p-6 text-center h-full" delay={index * 0.1}>
      <div className="w-20 h-20 mx-auto mb-4">
        <img
          src={client.image}
          alt={client.name}
          className="w-full h-full object-cover rounded-full border-2 border-primary/30"
        />
      </div>
      <p className="text-muted-foreground italic mb-4">"{client.feedback}"</p>
      <h4 className="font-display text-lg font-bold text-foreground">{client.name}</h4>
            </GlassCard>
          ))}
        </div>
      </AnimatedSection>

      <Footer />
    </div>
  );
};

export default About;
