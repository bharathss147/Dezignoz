import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Mail, User, Layers, Sparkles, Palette, PenTool } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import ProcessOrbit from "@/components/ProcessOrbit";
import ServicesOrbit from "@/components/ServicesOrbit";
import HolographicButton from "@/components/HolographicButton";

// Anti-gravity floating wrapper
const FloatingElement = ({ children, delay = 0, yRange = 20, rotationRange = 5 }) => {
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

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo === 'works') {
      const timer = setTimeout(() => {
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        // Total Z scroll = 14200. 'Grab Our Work' starts at Z = -2000 => camera moves to 2000 to see it clearly (or 2000 / 14200)
        window.scrollTo({ top: maxScroll * (2000 / 14200), behavior: 'smooth' });
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.state]);

  // Create continuous scroll progression
  const { scrollYProgress } = useScroll();

  // Smooth scroll inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  // Camera moves from 0 to 14200 in the Z axis
  const cameraZ = useTransform(smoothProgress, [0, 1], [0, 14200]);

  // Fade out Navbar on scroll start
  const navOpacity = useTransform(smoothProgress, [0, 0.05], [1, 0.5]);

  return (
    <div className="bg-background text-foreground overflow-hidden" ref={containerRef}>

      {/* Scroll Proxy - Gives user enough height to scroll through all spaced sections */}
      <div style={{ height: "1200vh" }} />

      {/* Main Persistent Viewport */}
      <div
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ perspective: "1200px" }}
      >

        {/* Deep space particle background */}
        <AnimatedBackground />

        {/* Global ambient lighting simulation removed */}

        {/* 3D Camera Container */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center transform-style-3d pointer-events-auto will-change-transform"
          style={{ z: cameraZ }}
        >

          {/* 1. HERO SECTION (Z = 0) */}
          <div className="absolute inset-x-0 mx-auto flex flex-col items-center justify-center transform-style-3d pointer-events-none" style={{ transform: 'translateZ(0px)', width: '100%', height: '100%' }}>

            <FloatingElement yRange={15} rotationRange={2}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-center relative z-20"
              >
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mix-blend-screen drop-shadow-2xl">
                  We Build The <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#3B82F6] drop-shadow-[0_0_20px_rgba(59,130,246,0.8)] filter">
                    Future
                  </span>
                </h1>

                <p className="mt-8 text-xl text-muted-foreground dark:text-blue-100/70 max-w-2xl mx-auto backdrop-blur-sm py-2 px-4 rounded-full border border-blue-500/10">
                  A high-end digital studio pushing the boundaries of spatial web design and cinematic experiences.
                </p>

                <div className="mt-12 flex gap-6 justify-center">
                  <Link to="/start-project" className="pointer-events-auto">
                    <button className="px-8 py-4 rounded-full bg-blue-600/20 border border-blue-500/50 hover:bg-blue-600/40 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300 backdrop-blur-md flex items-center gap-3">
                      <span>Enter the studio</span>
                      <ArrowRight size={18} />
                    </button>
                  </Link>
                </div>
              </motion.div>
            </FloatingElement>

            {/* Floating abstract decorative pieces removed */}
          </div>


          {/* 2. WORK SHOWCASE (Z = -2000) */}
          <div className="absolute inset-x-0 mx-auto flex flex-col items-center justify-center transform-style-3d pointer-events-none" style={{ transform: 'translateZ(-2000px)', width: '100%', height: '100%' }}>
            <div className="text-center mb-16" style={{ transform: 'translateZ(200px)' }}>
              <h2 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-blue-300/50 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                Grab Our Work
              </h2>
            </div>

            <div className="relative w-full h-[600px] max-w-7xl mx-auto flex items-center justify-center transform-style-3d">
              {[
                {
                  title: "Company / Business Requirement Designs",
                  category: "CORPORATE DESIGN",
                  description: "Professional designs for business needs including profiles, cards, and presentations.",
                  image: "/projects/business-requirements.png",
                  link: "/works/company-requirements",
                  color: "from-yellow-500/20 to-red-500/20",
                  initialX: -420,
                  initialY: -160,
                  initialRotate: -8,
                  scale: 0.9,
                  aspect: "aspect-[16/10]",
                },
                {
                  title: "Promotional Advertising Designs",
                  category: "MARKETING",
                  description: "Strategic promotional designs aimed at broadening reach and boosting brand visibility.",
                  image: "/projects/promotional-ads-v2.jpg",
                  link: "/works/promotional-designs",
                  color: "from-violet-500/20 to-indigo-500/20",
                  initialX: -380,
                  initialY: 130,
                  initialRotate: 6,
                  scale: 0.95,
                  aspect: "aspect-[16/10]",
                },
                {
                  title: "Banner / Website Banner",
                  category: "WEB GRAPHICS",
                  description: "Eye-catching banners for websites and social platforms that enhance engagement.",
                  image: "/projects/banner-design-main.jpg",
                  link: "/works/banner-designs",
                  color: "from-cyan-500/20 to-blue-500/20",
                  initialX: -120,
                  initialY: 200,
                  initialRotate: -12,
                  scale: 0.9,
                  aspect: "aspect-video",
                },
                {
                  title: "Poster (Digital Designs)",
                  category: "POSTER DESIGN",
                  description: "Creative digital posters that capture attention and convey your message effectively.",
                  image: "/projects/poster-design-cover.jpg",
                  link: "/works/poster-designs",
                  color: "from-blue-500/20 to-purple-500/20",
                  initialX: 20,
                  initialY: -20,
                  initialRotate: 0,
                  scale: 1.1,
                  aspect: "aspect-[4/5]",
                },
                {
                  title: "Festival Wishes & Thanking Creatives",
                  category: "SOCIAL MEDIA",
                  description: "Unique and festive creative designs to connect with your audience on special occasions.",
                  image: "/projects/Festival-thanking.png",
                  link: "/works/festival-wishes",
                  color: "from-pink-500/20 to-orange-500/20",
                  initialX: 330,
                  initialY: -130,
                  initialRotate: 10,
                  scale: 0.9,
                  aspect: "aspect-square",
                },
                {
                  title: "Product Advertising",
                  category: "ADVERTISEMENT",
                  description: "High-impact product posters designed to showcase features and drive sales.",
                  image: "/projects/product-advertisement.jpg",
                  link: "https://drive.google.com/drive/folders/1K3XTOWMhhk6zwkpG_p-LXK90esXE3ECj?usp=drive_link",
                  color: "from-green-500/20 to-emerald-500/20",
                  initialX: 360,
                  initialY: 180,
                  initialRotate: -6,
                  scale: 0.9,
                  aspect: "aspect-video",
                }
              ].map((work, i) => (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 transform-style-3d pointer-events-auto transition-transform duration-700 hover:z-50"
                  style={{
                    marginLeft: work.initialX,
                    marginTop: work.initialY,
                    transform: `translate(-50%, -50%) rotate(${work.initialRotate}deg) scale(${work.scale}) translateZ(${i % 2 === 0 ? '50px' : '-50px'})`
                  }}
                >
                  <FloatingElement delay={i * 0.2} yRange={25} rotationRange={8}>
                    <Link to={work.link} target={work.link.startsWith('http') ? '_blank' : '_self'} className="block group">
                      <div
                        className={`w-[280px] md:w-[320px] ${work.aspect} rounded-[2rem] overflow-hidden border border-white/5 relative transition-all duration-700 ease-out z-20 group-hover:scale-105 group-hover:-translate-y-4 group-hover:border-blue-500/30 group-hover:shadow-[0_0_60px_rgba(59,130,246,0.1)] bg-black/40 backdrop-blur-md`}
                      >
                        <div className="absolute inset-0 w-full h-full z-0">
                          <img src={work.image} alt={work.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className={`absolute inset-0 bg-gradient-to-br ${work.color} opacity-0 group-hover:opacity-60 transition-opacity duration-500 z-11 mix-blend-screen`} />

                          {/* Soft Shine Overlay on Hover */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay z-20" />
                        </div>
                        <div className="relative z-20 h-full flex flex-col justify-end p-6">
                          <div className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-bold mb-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">{work.category}</div>
                          <div className="text-xl font-bold mt-1 text-white group-hover:text-blue-300 transition-colors duration-300">{work.title}</div>
                          <div className="text-[12px] text-white/50 mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75">{work.description}</div>
                        </div>
                      </div>
                    </Link>
                  </FloatingElement>
                </div>
              ))}
            </div>
          </div>


          {/* 3. SERVICES SECTION (Z = -5000) */}
          <div className="absolute inset-x-0 mx-auto flex flex-col items-center justify-center transform-style-3d" style={{ transform: 'translateZ(-5000px)', width: '100%', height: '100%' }}>
            <h2 className="text-6xl font-bold mb-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]" style={{ transform: 'translateZ(300px)' }}>Services</h2>

            <ServicesOrbit />
          </div>


          {/* 4. ABOUT SECTION (Z = -8000) */}
          <div className="absolute inset-x-0 mx-auto flex flex-col md:flex-row items-center justify-center gap-16 transform-style-3d px-10" style={{ transform: 'translateZ(-8000px)', width: '100%', height: '100%' }}>

            <FloatingElement rotationRange={8} yRange={15}>
              <div className="relative pointer-events-auto group w-[340px] sm:w-[450px]">
                {/* Glowing orb behind profile */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/20 blur-[100px] rounded-full group-hover:bg-cyan-400/30 transition-colors duration-700" />

                {/* Horizontal Holographic Card */}
                <motion.div
                  initial={{ opacity: 0, filter: "brightness(2) blur(30px)", scale: 0.8, y: 30 }}
                  whileInView={{ opacity: 1, filter: "brightness(1) blur(0px)", scale: 1, y: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="w-full h-[220px] sm:h-[260px] rounded-2xl border border-white/10 overflow-hidden bg-[#041226]/80 backdrop-blur-md relative z-10 p-4 sm:p-6 shadow-[0_0_40px_rgba(0,0,0,0.5)] flex items-center gap-4 sm:gap-6 group-hover:border-white/20 transition-all duration-500 will-change-transform"
                >

                  {/* Particle assembly effect removed */}

                  {/* Soft Scanning Line removed */}

                  {/* Hologram Background Grid Removed */}

                  {/* Holographic Base & Projection */}
                  <div className="relative w-28 sm:w-36 h-full flex flex-col items-center justify-end">

                    {/* Glowing Beams */}
                    <motion.div
                      animate={{ opacity: [0.2, 0.6, 0.2] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute bottom-5 w-24 sm:w-32 h-32 sm:h-40 bg-gradient-to-t from-cyan-400/50 via-cyan-400/10 to-transparent blur-sm"
                      style={{ clipPath: 'polygon(20% 100%, 80% 100%, 100% 0, 0 0)' }}
                    />

                    {/* Hologram Avatar inside the beam */}
                    <motion.div
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                      className="relative z-10 bottom-8 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]"
                    >
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-cyan-400/60 shadow-[0_0_15px_rgba(34,211,238,0.5)] relative">
                        <img src="/bharath-designer.jpg" alt="Bharath" className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-cyan-700/20 mix-blend-overlay pointer-events-none"></div>
                      </div>

                      {/* Glitch Effect on Avatar */}
                      <motion.div
                        animate={{ opacity: [0, 0.6, 0], scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 0.15, repeatDelay: 3 }}
                        className="absolute inset-0 rounded-full border-2 border-cyan-300/40 pointer-events-none"
                      >
                        <div className="w-full h-full rounded-full overflow-hidden opacity-50 relative">
                          <img src="/bharath-designer.jpg" alt="" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-cyan-400 mix-blend-screen"></div>
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Projection Base Plates */}
                    <div className="absolute bottom-3 w-20 sm:w-28 h-6 rounded-[50%] border-2 border-cyan-400/80 bg-cyan-900/90 shadow-[0_0_20px_rgba(34,211,238,0.7)] z-0" style={{ transform: 'rotateX(70deg)' }} />
                    <div className="absolute bottom-4 w-12 sm:w-16 h-4 rounded-[50%] bg-cyan-200 shadow-[0_0_30px_rgba(103,232,249,1)] blur-[3px] z-10" style={{ transform: 'rotateX(70deg)' }} />
                    <div className="absolute bottom-3 w-28 sm:w-36 h-8 rounded-[50%] border border-cyan-500/30 z-[-1]" style={{ transform: 'rotateX(70deg)' }} />
                  </div>

                  {/* Text Data / Interface Elements */}
                  <div className="flex-1 text-left relative z-10 border-l border-cyan-500/40 pl-4 sm:pl-6 h-full flex flex-col justify-center">


                    <h3 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] leading-tight">
                      A GRAPHIC <br /> DESIGNER
                    </h3>
                  </div>

                </motion.div>
              </div>
            </FloatingElement>

            <FloatingElement delay={0.2} rotationRange={5} yRange={10}>
              <motion.div
                initial={{ opacity: 0, filter: "brightness(2) blur(30px)", scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, filter: "brightness(1) blur(0px)", scale: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative max-w-xl text-left bg-[#041226]/80 backdrop-blur-md p-10 rounded-3xl border border-white/10 pointer-events-auto hover:border-white/20 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden group will-change-transform"
              >
                {/* Background Grid Removed */}

                {/* Particle assembly effect removed */}

                {/* Soft Scanning Line removed */}

                <h2 className="text-4xl font-bold mb-6 flex items-center gap-4 relative z-10 text-white">
                  {/* Decorative line removed */}
                  Who I Am
                </h2>
                <p className="text-lg text-cyan-50/80 leading-relaxed mb-8 relative z-10">
                  I’m a freelance graphic and designer passionate about creating modern, minimal, and effective digital designs that help brands grow and stand out.
                </p>
                <Link to="/about" className="relative z-50 inline-block pointer-events-auto cursor-pointer">
                  <button className="text-sm font-semibold uppercase tracking-widest text-cyan-400 hover:text-white transition-all flex items-center gap-2 group hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] cursor-pointer">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </button>
                </Link>
              </motion.div>
            </FloatingElement>

          </div>


          {/* 5. PROCESS SECTION (Z = -11000) */}
          <div className="absolute inset-x-0 mx-auto flex flex-col items-center justify-center transform-style-3d" style={{ transform: 'translateZ(-11000px)', width: '100%', height: '100%' }}>
            <h2 className="text-5xl font-bold mb-10 text-center tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              How We <br />
              <span className="text-blue-400">Connect</span>
            </h2>

            <ProcessOrbit />
          </div>


          {/* 6. CONTACT SECTION (Z = -14000) */}
          <div className="absolute inset-x-0 mx-auto flex flex-col items-center justify-center transform-style-3d w-full" style={{ transform: 'translateZ(-14000px)', height: '100%' }}>
            <div className="relative pointer-events-auto">
              <HolographicButton />
            </div>
          </div>

        </motion.div>
      </div >

      {/* Global Navbar fixed on top */}
      <motion.div style={{ opacity: navOpacity }} className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-md bg-black/10 border-b border-white/5 pointer-events-auto">
        <Navbar />
      </motion.div>

    </div>
  );
};

export default Index;
