import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Image as ImageIcon, Video, Eraser, ShieldCheck, Zap, Wand2, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const FloatingElement = ({ children, delay = 0, yRange = 20, rotationRange = 5 }: any) => {
  return (
    <motion.div
      animate={{
        y: [0, -yRange, 0],
        rotateX: [0, rotationRange, 0],
        rotateY: [0, -rotationRange, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay,
      }}
      className="transform-style-3d will-change-transform"
    >
      {children}
    </motion.div>
  );
};

const Magic = () => {
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });
  const cameraZ = useTransform(smoothProgress, [0, 1], [0, 5000]);
  const navOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

  const tools = [
    {
      id: "background-remover",
      title: "Background Remover",
      desc: "Perfect isolation for images instantly. Click to open upload tool.",
      icon: ImageIcon,
      color: "from-cyan-500/30 to-blue-600/10",
      accent: "cyan",
      initialX: -360,
      initialY: 40,
      rotate: -8,
      scale: 0.95
    },
    {
      id: "watermark-remover",
      title: "Watermark Remover",
      desc: "Clean text & logos using smart AI.",
      icon: Eraser,
      color: "from-blue-600/30 to-indigo-600/10",
      accent: "blue",
      initialX: 0,
      initialY: -120,
      rotate: 0,
      scale: 1.05
    },
    {
      id: "image-search",
      title: "Inspo Search",
      desc: "Live Pinterest-style HD image search.",
      icon: Wand2,
      color: "from-pink-500/30 to-purple-600/10",
      accent: "pink",
      initialX: 380,
      initialY: 60,
      rotate: 6,
      scale: 0.95
    }
  ];



  return (
    <div className="bg-background text-foreground overflow-hidden w-full relative">
      <div style={{ height: "400vh" }} />

      <div className="fixed inset-0 w-full h-full pointer-events-none" style={{ perspective: "1200px" }}>
        <AnimatedBackground />

        <motion.div
          className="absolute inset-0 flex items-center justify-center transform-style-3d pointer-events-auto will-change-transform"
          style={{ z: cameraZ }}
        >
          {/* HERO TEXT (Z = 0) */}
          <div className="absolute inset-x-0 mx-auto flex flex-col items-center justify-center transform-style-3d" style={{ transform: 'translateZ(0px)', width: '100%', height: '100%' }}>
            <FloatingElement yRange={10} rotationRange={2}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-center relative z-20 pointer-events-none"
              >
                <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-4 text-white mix-blend-screen drop-shadow-2xl">
                  Magic <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.8)] filter">Studio</span>
                </h1>
              </motion.div>
            </FloatingElement>
          </div>

          {/* FLOATING TOOLS CLUSTER (Z = -2000) */}
          <div className="absolute inset-x-0 mx-auto flex flex-col items-center justify-center transform-style-3d" style={{ transform: 'translateZ(-2000px)', width: '100%', height: '100%' }}>
            <div className="relative w-full h-[600px] max-w-7xl mx-auto flex items-center justify-center transform-style-3d">
              {tools.map((tool, i) => (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 transform-style-3d pointer-events-auto transition-transform duration-700 hover:z-50"
                  style={{
                    marginLeft: tool.initialX,
                    marginTop: tool.initialY,
                    transform: `translate(-50%, -50%) rotate(${tool.rotate}deg) scale(${tool.scale}) translateZ(${i % 2 === 0 ? '50px' : '-50px'})`
                  }}
                >
                  <FloatingElement delay={i * 0.3} yRange={25} rotationRange={8}>
                    <div 
                      onPointerUp={() => navigate(`/magic/${tool.id}`)}
                      onClick={() => navigate(`/magic/${tool.id}`)}
                      className={`w-[320px] md:w-[400px] h-[220px] md:h-[240px] bg-[#020617]/90 border ${
                        tool.id === 'background-remover' ? 'border-cyan-500/50 shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)]' : 
                        tool.id === 'watermark-remover' ? 'border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:shadow-[0_0_50px_rgba(59,130,246,0.5)]' : 
                        'border-pink-500/50 shadow-[0_0_30px_rgba(236,72,153,0.2)] hover:shadow-[0_0_50px_rgba(236,72,153,0.5)]'
                      } backdrop-blur-md relative transition-all duration-500 z-20 hover:scale-[1.05] group cursor-pointer flex flex-col p-6 overflow-hidden`}
                    >
                      {/* HUD Corner Accents */}
                      {['top-0 left-0 border-t-2 border-l-2', 'top-0 right-0 border-t-2 border-r-2', 'bottom-0 left-0 border-b-2 border-l-2', 'bottom-0 right-0 border-b-2 border-r-2'].map((pos, idx) => (
                        <div key={idx} className={`absolute w-8 h-8 ${pos} opacity-80 group-hover:opacity-100 transition-opacity ${
                          tool.id === 'background-remover' ? 'border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 
                          tool.id === 'watermark-remover' ? 'border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 
                          'border-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.5)]'
                        }`} />
                      ))}

                      {/* HUD Grid Background */}
                      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                      


                      {/* Main Center Content */}
                      <div className="flex flex-1 items-center gap-6 relative z-10 w-full mb-4">
                        <div className={`shrink-0 w-20 h-20 flex items-center justify-center border bg-[#020617] ${
                          tool.id === 'background-remover' ? 'border-cyan-500/50 text-cyan-400 shadow-[inset_0_0_20px_rgba(34,211,238,0.2)]' : 
                          tool.id === 'watermark-remover' ? 'border-blue-500/50 text-blue-400 shadow-[inset_0_0_20px_rgba(59,130,246,0.2)]' : 
                          'border-pink-500/50 text-pink-400 shadow-[inset_0_0_20px_rgba(236,72,153,0.2)]'
                        } relative`}>
                          {/* Inner corners inside icon box */}
                          <div className={`absolute inset-1 border border-transparent ${
                            tool.id === 'background-remover' ? 'group-hover:border-cyan-500/50' : 
                            tool.id === 'watermark-remover' ? 'group-hover:border-blue-500/50' : 
                            'group-hover:border-pink-500/50'
                          } transition-colors bg-white/[0.02]`} />
                          <tool.icon size={32} className="drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] relative z-10" />
                        </div>
                        
                        <div className="flex flex-col flex-1 text-left min-w-0">
                          <h3 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-2 uppercase tracking-widest truncate">
                            {tool.title}
                          </h3>
                          <p className={`text-[10px] md:text-xs font-mono uppercase tracking-widest line-clamp-2 ${
                            tool.id === 'background-remover' ? 'text-cyan-200/70' : 
                            tool.id === 'watermark-remover' ? 'text-blue-200/70' : 
                            'text-pink-200/70'
                          }`}>
                            {tool.desc}
                          </p>
                        </div>
                      </div>

                      {/* Bottom Data Row */}
                      <div className={`mt-auto flex justify-between items-end border-t ${
                        tool.id === 'background-remover' ? 'border-cyan-500/30' : 
                        tool.id === 'watermark-remover' ? 'border-blue-500/30' : 
                        'border-pink-500/30'
                      } pt-3 relative z-10`}>
                        <div className="flex flex-col gap-1">
                          <div className={`h-[2px] w-16 ${
                            tool.id === 'background-remover' ? 'bg-cyan-500/50' : 
                            tool.id === 'watermark-remover' ? 'bg-blue-500/50' : 
                            'bg-pink-500/50'
                          }`} />
                          <div className={`h-[2px] w-8 ${
                            tool.id === 'background-remover' ? 'bg-cyan-500/30' : 
                            tool.id === 'watermark-remover' ? 'bg-blue-500/30' : 
                            'bg-pink-500/30'
                          }`} />
                        </div>
                        <div className={`text-[9px] md:text-[10px] font-mono tracking-[0.3em] font-bold group-hover:animate-pulse ${
                          tool.id === 'background-remover' ? 'text-cyan-400' : 
                          tool.id === 'watermark-remover' ? 'text-blue-400' : 
                          'text-pink-400'
                        }`}>
                          [CLICK CARD TO LAUNCH]
                        </div>
                      </div>

                      {/* Hover interactive glow */}
                      <div className={`absolute inset-0 bg-gradient-to-tr from-transparent opacity-0 group-hover:opacity-[0.15] transition-opacity duration-1000 -z-10 ${
                        tool.id === 'background-remover' ? 'via-cyan-400 to-transparent' : 
                        tool.id === 'watermark-remover' ? 'via-blue-400 to-transparent' : 
                        'via-pink-400 to-transparent'
                      }`} />
                    </div>
                  </FloatingElement>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div style={{ opacity: navOpacity }} className="fixed top-0 left-0 right-0 z-[100] pointer-events-auto transition-opacity duration-300">
        <Navbar />
      </motion.div>
    </div>
  );
};

export default Magic;
