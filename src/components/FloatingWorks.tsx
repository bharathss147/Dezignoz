/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import GlassCard from "./GlassCard";
import { useNavigate } from "react-router-dom";

const works = [
    {
        id: 1,
        title: "Brand Identity",
        category: "Branding",
        description: "Modern branding solutions that define your unique market presence.",
        link: "/works",
        image: "/projects/brand-identity.jpg",
        color: "from-blue-500/20 to-purple-500/20",
        initialX: -380,
        initialY: -120,
        initialRotate: -12,
        scale: 0.9,
        zIndex: 10
    },
    {
        id: 2,
        title: "Web Interface",
        category: "UI/UX Design",
        description: "Clean and intuitive digital interfaces for seamless user paths.",
        link: "/works",
        image: "/projects/web-interface.jpg",
        color: "from-cyan-500/20 to-blue-500/20",
        initialX: 380,
        initialY: -150,
        initialRotate: 12,
        scale: 0.9,
        zIndex: 10
    },
    {
        id: 3,
        title: "Poster (Digital Designs)",
        category: "POSTER DESIGN",
        description: "Creative digital posters that capture attention and convey your message effectively.",
        link: "/works/poster-designs",
        image: "/projects/poster-design-cover.jpg",
        color: "from-indigo-500/20 to-pink-500/20",
        initialX: 0,
        initialY: 0,
        initialRotate: 0,
        scale: 1.05,
        zIndex: 30
    },
    {
        id: 4,
        title: "Mobile App",
        category: "App Design",
        description: "Powerful mobile experiences built for the modern digital era.",
        link: "/works",
        image: "/projects/mobile-app.jpg",
        color: "from-green-500/20 to-emerald-500/20",
        initialX: -320,
        initialY: 220,
        initialRotate: 8,
        scale: 0.9,
        zIndex: 20
    },
    {
        id: 5,
        title: "Product Advertisement Poster",
        category: "ADVERTISEMENT",
        description: "High-impact product posters designed to showcase features and drive sales.",
        link: "https://drive.google.com/drive/folders/1K3XTOWMhhk6zwkpG_p-LXK90esXE3ECj?usp=drive_link",
        image: "/projects/product-advertisement.jpg",
        color: "from-orange-500/20 to-red-500/20",
        initialX: 320,
        initialY: 200,
        initialRotate: -8,
        scale: 0.9,
        zIndex: 20
    },
];

const FloatingWorks = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
    const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX - innerWidth / 2) / innerWidth;
        const y = (clientY - innerHeight / 2) / innerHeight;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleCardClick = (link: string) => {
        if (link.startsWith('http')) {
            window.open(link, '_blank');
        } else {
            navigate(link);
        }
    };

    return (
        <section
            ref={containerRef}
            className="relative min-h-[120vh] flex items-center justify-center overflow-hidden py-20 bg-gradient-to-b from-transparent via-black/20 to-transparent"
            onMouseMove={handleMouseMove}
        >
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10 h-full flex flex-col items-center justify-center perspective-[1200px]">

                <div className="absolute top-20 text-center z-40 translate-y-[-50px]">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="font-display text-4xl md:text-6xl font-bold mb-4 tracking-tight"
                    >
                        Grab to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">View the Works</span>
                    </motion.h2>
                </div>

                <div className="relative w-full h-[800px] flex items-center justify-center [transform-style:preserve-3d]">
                    {works.map((work, index) => {
                        const parallaxX = useTransform(smoothX, [-0.5, 0.5], [40 * (index + 1), -40 * (index + 1)]);
                        const parallaxY = useTransform(smoothY, [-0.5, 0.5], [40 * (index + 1), -40 * (index + 1)]);
                        const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
                        const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);

                        return (
                            <motion.div
                                key={work.id}
                                style={{
                                    x: parallaxX,
                                    y: parallaxY,
                                    rotateX: rotateX,
                                    rotateY: rotateY,
                                    zIndex: work.zIndex,
                                    position: 'absolute',
                                    left: '50%',
                                    top: '50%',
                                    marginTop: work.initialY,
                                    marginLeft: work.initialX,
                                }}
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: work.scale }}
                                animate={{
                                    y: [0, -15, 0, 10, 0],
                                    rotate: [work.initialRotate, work.initialRotate + 1, work.initialRotate - 1, work.initialRotate],
                                }}
                                transition={{
                                    opacity: { duration: 1 },
                                    scale: { type: "spring", stiffness: 100, damping: 20 },
                                    y: { duration: 8 + index, repeat: Infinity, ease: "easeInOut" },
                                    rotate: { duration: 10 + index, repeat: Infinity, ease: "easeInOut" }
                                }}
                                className={`transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group`}
                                onClick={() => handleCardClick(work.link || '/works')}
                            >
                                <GlassCard
                                    className={`
                                            w-[300px] md:w-[360px] aspect-[4/5]
                                            opacity-100 shadow-[0_20px_60px_rgba(0,0,0,0.5)]
                                            transition-all duration-300
                                            !bg-white/[0.03] !border-white/10 backdrop-blur-xl
                                            relative overflow-hidden
                                        `}
                                    hover={false}
                                >
                                    {/* Full Bleed Image Container */}
                                    <div className="absolute inset-0 w-full h-full z-0">
                                        {work.image && (
                                            <img
                                                src={work.image}
                                                alt={work.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        )}
                                        {/* Permanent Gradient Protection */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-transparent z-10" />

                                        {/* Selection / Brand Glow */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${work.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500 z-11`} />
                                    </div>

                                    {/* Content Overlay */}
                                    <div className="relative z-20 h-full flex flex-col justify-end p-8">
                                        <motion.span className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-bold mb-2 block opacity-80">
                                            {work.category}
                                        </motion.span>
                                        <h3 className="text-2xl font-display font-bold text-white mb-2 leading-tight group-hover:text-blue-300 transition-colors">
                                            {work.title}
                                        </h3>
                                        <p className="text-[12px] text-white/50 leading-relaxed line-clamp-2 group-hover:text-white/80 transition-colors">
                                            {work.description}
                                        </p>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        );
                    })}
                </div>



            </div>
        </section>
    );
};

export default FloatingWorks;
